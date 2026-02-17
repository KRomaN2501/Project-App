
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
    newBlock.id = data + '-' + Date.now(); 
    newBlock.classList.remove('dragging');
    newBlock.setAttribute('draggable', 'false');
    newBlock.addEventListener('mousedown', startDrag);
    document.getElementById('code-area').appendChild(newBlock);

    const codeArea = document.getElementById('code-area');
    const rect = codeArea.getBoundingClientRect();

    let left = ev.clientX - rect.left - (newBlock.offsetWidth / 2);
    let top = ev.clientY - rect.top - (newBlock.offsetHeight / 2);

    left = Math.max(0, Math.min(left, rect.width - newBlock.offsetWidth));
    top = Math.max(0, Math.min(top, rect.height - newBlock.offsetHeight));

    newBlock.style.left = left + 'px';
    newBlock.style.top = top + 'px';

    draggedElement.classList.remove('dragging');
}

document.querySelectorAll('.sidebar .block').forEach(block => {
    block.addEventListener('dragstart', drag);
    block.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
    });
});


let activeBlock = null;
let offsetX, offsetY;
let isDragging = false;

function startDrag(e) {
    if (!e.target.closest('.workspace')) return;
    e.preventDefault();

    activeBlock = e.target.closest('.block');
    if (!activeBlock) return;

    isDragging = true;

    const rect = activeBlock.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    activeBlock.classList.add('dragging');
    activeBlock.style.cursor = 'grabbing';

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(e) {
    if (!isDragging || !activeBlock) return;

    e.preventDefault();

    const codeArea = document.getElementById('code-area');
    const rect = codeArea.getBoundingClientRect();

    let left = e.clientX - rect.left - offsetX;
    let top = e.clientY - rect.top - offsetY;

    left = Math.max(0, Math.min(left, rect.width - activeBlock.offsetWidth));
    top = Math.max(0, Math.min(top, rect.height - activeBlock.offsetHeight));

    activeBlock.style.left = left + 'px';
    activeBlock.style.top = top + 'px';
}

function onMouseUp() {
    if (activeBlock) {
        activeBlock.classList.remove('dragging');
        activeBlock.style.cursor = 'grab';
    }

    isDragging = false;
    activeBlock = null;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());