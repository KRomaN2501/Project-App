let blocksInStack = [];
let activeBlock = null;
let offsetX, offsetY;
let isDragging = false;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.classList.add('dragging');
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);



    const newBlock = draggedElement.cloneNode(true);
    const uniqueId = 'block-inst-' + Date.now();
    newBlock.id = uniqueId;

    newBlock.setAttribute('data-block-type', draggedElement.id);
    newBlock.classList.remove('dragging');
    newBlock.setAttribute('draggable', 'false');

    if (!draggedElement) return;

    if (draggedElement.id === 'block-5' || draggedElement.id === 'block-6' ||
        draggedElement.id === 'block-7' || draggedElement.id === 'block-10' ||
        draggedElement.id === 'block-11' || draggedElement.id === 'block-12' ||
        draggedElement.id === 'block-20') {

        newBlock.classList.add('block-if');
        const inner = document.createElement('div');
        inner.className = 'inner-container';
        newBlock.appendChild(inner);
    }

    const codeArea = document.getElementById('code-area');
    codeArea.appendChild(newBlock);

    const rect = codeArea.getBoundingClientRect();
    let left = ev.clientX - rect.left - (newBlock.offsetWidth / 2);
    let top = ev.clientY - rect.top - (newBlock.offsetHeight / 2);

    newBlock.style.left = Math.max(0, left) + 'px';
    newBlock.style.top = Math.max(0, top) + 'px';
    newBlock.style.position = 'absolute';

    switch (draggedElement.id) {
        // начало конец
        case 'block-0': case 'block-1000':
            blockLogic = new Block(newBlock);
            break;

        // переменные и массивы
        case 'block-1':
            blockLogic = new CreateVarBlock(newBlock);
            break;
        case 'block-2':
            blockLogic = new AssignmentVarBlock(newBlock);
            break;
        case 'block-3': 
            blockLogic = new CreateArrBlock(newBlock);
            break;
        case 'block-4': 
            blockLogic = new AssignmentArrBlock(newBlock);
            break;

        // услов€и циклы 
        case 'block-5':
            blockLogic = new ConditionalBlock(newBlock);
            break;
        case 'block-7':
            blockLogic = new ConditionalBlock_Else(newBlock);
            break;
        case 'block-6': case 'block-10':
            blockLogic = new CyclicBlock(newBlock);
            break;
        // выводы
        case 'block-8':
            blockLogic = new PrintVarBlock(newBlock);
            break;
        case 'block-9':
            blockLogic = new PrintArrBlock(newBlock);
            break;

        default:
            blockLogic = new Block(newBlock); 
    }

    blockLogic.type = draggedElement.id;

    draggedElement.classList.remove('dragging');
}

document.querySelectorAll('.sidebar .block').forEach(block => {
    block.addEventListener('dragstart', drag);
});


document.addEventListener('mousedown', (e) => {
    const targetBlock = e.target.closest('#code-area .block');

    if (!targetBlock || e.target.tagName === 'INPUT') return;

    const parentInner = targetBlock.closest('.inner-container');
    if (parentInner) {
        const codeArea = document.getElementById('code-area');
        const rect = targetBlock.getBoundingClientRect();
        const areaRect = codeArea.getBoundingClientRect();

        const currentTop = rect.top - areaRect.top + codeArea.scrollTop;
        const currentLeft = rect.left - areaRect.left + codeArea.scrollLeft;

        codeArea.appendChild(targetBlock);

        targetBlock.style.position = 'absolute';
        targetBlock.style.left = currentLeft + 'px';
        targetBlock.style.top = currentTop + 'px';

        const parentBlock = parentInner.closest('.block-if');
        if (parentBlock) {
            const parentObj = Block.allBlocks.find(obj => obj.domElement === parentBlock);
            const childObj = Block.allBlocks.find(obj => obj.domElement === targetBlock);

            if (parentObj && parentObj.innerBlock === childObj) {
                parentObj.removeInner();
            } else {
                rebuildInnerConnections(parentBlock);
            }
        }
        if (parentBlock) {
            updateContainerSize(parentBlock);
        }
    }

    activeBlock = targetBlock;
    isDragging = true;

    blocksInStack = findStack(activeBlock);

    const rect = activeBlock.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    blocksInStack.forEach(b => {
        b.classList.add('dragging');
        b.style.zIndex = "1000";
    });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(e) {
    if (!isDragging || !activeBlock) return;

    const codeArea = document.getElementById('code-area');
    const rect = codeArea.getBoundingClientRect();
    const sidebar = document.querySelector('.sidebar');
    const sRect = sidebar.getBoundingClientRect();

    if (e.clientX >= sRect.left && e.clientX <= sRect.right &&
        e.clientY >= sRect.top && e.clientY <= sRect.bottom) {
        sidebar.classList.add('drag-over');
    } else {
        sidebar.classList.remove('drag-over');
    }

    let newLeft = e.clientX - rect.left - offsetX + codeArea.scrollLeft;
    let newTop = e.clientY - rect.top - offsetY + codeArea.scrollTop;

    const deltaX = newLeft - activeBlock.offsetLeft;
    const deltaY = newTop - activeBlock.offsetTop;

    blocksInStack.forEach(b => {
        b.style.left = (b.offsetLeft + deltaX) + 'px';
        b.style.top = (b.offsetTop + deltaY) + 'px';
    });
}

function onMouseUp(e) {
    if (activeBlock) {
        const sidebar = document.querySelector('.sidebar');
        const sRect = sidebar.getBoundingClientRect();

        sidebar.classList.remove('drag-over');

        if (e.clientX >= sRect.left && e.clientX <= sRect.right &&
            e.clientY >= sRect.top && e.clientY <= sRect.bottom) {

            blocksInStack.forEach(b => {
                const obj = Block.allBlocks.find(o => o.domElement === b);
                if (obj) {
                    obj.delete();
                }
                b.remove();
            });

            console.log("÷епочка блоков удалена");
        } else {
            blocksInStack.forEach(b => {
                b.classList.remove('dragging');
                b.style.zIndex = "100";
            });

            const oldParentInner = activeBlock.closest('.inner-container');
            const oldParentBlock = oldParentInner ? oldParentInner.closest('.block-if') : null;

            snapToBlock(activeBlock);
            const newParentInner = activeBlock.closest('.inner-container');
            const newParentBlock = newParentInner ? newParentInner.closest('.block-if') : null;

            if (newParentBlock) {
                updateContainerSize(newParentBlock);
                rebuildInnerConnections(newParentBlock);
            }

            if (oldParentBlock && oldParentBlock !== newParentBlock) {
                updateContainerSize(oldParentBlock);
                rebuildInnerConnections(oldParentBlock);
            }
        }
    }

    isDragging = false;
    activeBlock = null;
    blocksInStack = [];

    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
}

function findStack(startBlock) {
    const stack = [startBlock];
    let current = startBlock;
    const allBlocks = Array.from(document.querySelectorAll('#code-area .block'));

    let foundNext;
    do {
        foundNext = false;
        const currentBottom = current.offsetTop + current.offsetHeight;
        const currentLeft = current.offsetLeft;

        for (let b of allBlocks) {
            if (stack.includes(b)) continue;
            if (Math.abs(b.offsetTop - currentBottom) < 10 &&
                Math.abs(b.offsetLeft - currentLeft) < 10) {
                stack.push(b);
                current = b;
                foundNext = true;
                break;
            }
        }
    } while (foundNext);

    return stack;
}

function rebuildInnerConnections(containerBlock) {
    if (!containerBlock) return;

    const inner = containerBlock.querySelector('.inner-container');
    if (!inner) return;

    const blocks = Array.from(inner.querySelectorAll('.block'));
    const containerObj = Block.allBlocks.find(obj => obj.domElement === containerBlock);

    if (!containerObj) return;

    containerObj.innerBlock = null;
    blocks.forEach(block => {
        const blockObj = Block.allBlocks.find(obj => obj.domElement === block);
        if (blockObj) {
            blockObj.nextBlock = null;
        }
    });

    if (blocks.length > 0) {
        const firstBlockObj = Block.allBlocks.find(obj => obj.domElement === blocks[0]);
        containerObj.setInner(firstBlockObj);
        for (let i = 0; i < blocks.length - 1; i++) {
            const currentBlockObj = Block.allBlocks.find(obj => obj.domElement === blocks[i]);
            const nextBlockObj = Block.allBlocks.find(obj => obj.domElement === blocks[i + 1]);
            if (currentBlockObj && nextBlockObj) {
                currentBlockObj.setNext(nextBlockObj);
            }
        }
    }
}

function updateContainerSize(containerBlock) {
    if (!containerBlock) return;

    const inner = containerBlock.querySelector('.inner-container');
    if (!inner) return;

    const blocks = Array.from(inner.querySelectorAll('.block'));

    if (blocks.length === 0) {
        inner.style.height = '40px';
        inner.style.padding = '0';
        return;
    }
    let totalHeight = 0;
    blocks.forEach((block, index) => {
        block.style.position = 'relative';
        block.style.left = '0';
        block.style.margin = '0 0 5px 0';
        block.style.width = 'calc(100% - 10px)';
        block.style.top = totalHeight + 'px';

        totalHeight += block.offsetHeight;
        if (index < blocks.length - 1) {
            totalHeight += 5;
        }
    });

    inner.style.height = totalHeight + 'px';
    inner.style.padding = '5px';
}

function snapToBlock(block) {
    const allBlocks = document.querySelectorAll('#code-area .block');
    const threshold = 50;
    const areaRect = document.getElementById('code-area').getBoundingClientRect();

    let snapped = false;

    allBlocks.forEach(target => {
        if (target === block || blocksInStack.includes(target)) return;
        if (snapped) return;

        const targetRect = target.getBoundingClientRect();
        const blockRect = block.getBoundingClientRect();

        if (target.classList.contains('block-if') || target.querySelector('.inner-container')) {
            const inner = target.querySelector('.inner-container');
            const innerRect = inner.getBoundingClientRect();

            if (blockRect.top > innerRect.top - 30 && blockRect.top < innerRect.bottom + 30 &&
                blockRect.left > targetRect.left && blockRect.left < targetRect.right) {

                inner.appendChild(block);

                block.style.position = 'relative';
                block.style.left = '0';
                block.style.margin = '0 0 5px 0';
                block.style.width = 'calc(100% - 10px)';

                updateContainerSize(target);
                rebuildInnerConnections(target);

                console.log("Ѕлок вставлен внутрь контейнера");
                snapped = true;
                return;
            }
        }

        const distY = Math.abs(blockRect.top - targetRect.bottom);
        const distX = Math.abs(blockRect.left - targetRect.left);

        if (distY < threshold && distX < threshold) {
            const finalLeft = targetRect.left - areaRect.left;
            const finalTop = targetRect.bottom - areaRect.top;

            const deltaX = finalLeft - (blockRect.left - areaRect.left);
            const deltaY = finalTop - (blockRect.top - areaRect.top);

            blocksInStack.forEach(b => {
                let currentLeft = parseFloat(b.style.left) || 0;
                let currentTop = parseFloat(b.style.top) || 0;
                b.style.left = (currentLeft + deltaX) + 'px';
                b.style.top = (currentTop + deltaY) + 'px';
            });

            const targetObj = Block.allBlocks.find(obj => obj.domElement === target);
            const currentObj = Block.allBlocks.find(obj => obj.domElement === block);

            if (targetObj && currentObj) {
                targetObj.setNext(currentObj);
                console.log("—в€зь установлена: " + target.id + " -> " + block.id);
            }

            snapped = true;
        }
    });

    const parentInner = block.closest('.inner-container');
    if (parentInner) {
        const parentBlock = parentInner.closest('.block-if');
        updateContainerSize(parentBlock);
        rebuildInnerConnections(parentBlock);
    }
}