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

    if (!draggedElement) return;

    const newBlock = draggedElement.cloneNode(true);
    const uniqueId = 'block-inst-' + Date.now();
    newBlock.id = uniqueId;
    newBlock.setAttribute('data-block-type', draggedElement.id);
    newBlock.classList.remove('dragging');
    newBlock.setAttribute('draggable', 'false');

    if (draggedElement.id === 'block-5') {
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

    const blockLogic = Block.create(Block);

    blockLogic.domElement = newBlock;

    blockLogic.type = draggedElement.id;

    draggedElement.classList.remove('dragging');
}

document.querySelectorAll('.sidebar .block').forEach(block => {
    block.addEventListener('dragstart', drag);
});


document.addEventListener('mousedown', (e) => {
    const targetBlock = e.target.closest('#code-area .block');

    if (!targetBlock || e.target.tagName === 'INPUT') return;

    if (targetBlock.parentElement.classList.contains('inner-container')) {
        const codeArea = document.getElementById('code-area');
        const rect = targetBlock.getBoundingClientRect();
        const areaRect = codeArea.getBoundingClientRect();

        const currentTop = rect.top - areaRect.top + codeArea.scrollTop;
        const currentLeft = rect.left - areaRect.left + codeArea.scrollLeft;

        codeArea.appendChild(targetBlock);

        targetBlock.style.position = 'absolute';
        targetBlock.style.left = currentLeft + 'px';
        targetBlock.style.top = currentTop + 'px';

        const parentIf = targetBlock.closest('.block-if');
        if (parentIf) {
            const ifObj = Block.allBlocks.find(obj => obj.domElement === parentIf);
            if (ifObj && typeof ifObj.removeInner === 'function') {
                ifObj.removeInner();
            }
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

            console.log("Цепочка блоков удалена");
        } else {
            blocksInStack.forEach(b => {
                b.classList.remove('dragging');
                b.style.zIndex = "100";
            });
            snapToBlock(activeBlock);
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

            if (blockRect.top > innerRect.top - 20 && blockRect.top < innerRect.bottom + 10 &&
                blockRect.left > targetRect.left && blockRect.left < targetRect.right) {

                inner.appendChild(block);

                block.style.position = 'relative';
                block.style.left = '0px';
                block.style.top = '0px';

                const targetObj = Block.allBlocks.find(obj => obj.domElement === target);
                const currentObj = Block.allBlocks.find(obj => obj.domElement === block);

                if (targetObj && currentObj && typeof targetObj.setInner === 'function') {
                    targetObj.setInner(currentObj);
                    console.log("Блок вставлен внутрь контейнера");
                }

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
                console.log("Связь установлена: " + target.id + " -> " + block.id);
            }

            snapped = true;
        }
    });
}