const blocks = document.querySelectorAll('.block');
const workspace = document.getElementById('workspace');

blocks.forEach(block => {
    let isDragging = false;
    let startMouseX, startMouseY;
    let startBlockLeft, startBlockTop;

    block.addEventListener('mousedown', (e) => {
        startMouseX = e.clientX;
        startMouseY = e.clientY;

        const workspaceRect = workspace.getBoundingClientRect();
        const blockRect = block.getBoundingClientRect();
        startBlockLeft = blockRect.left - workspaceRect.left;
        startBlockTop = blockRect.top - workspaceRect.top;

        isDragging = true;

        block.style.opacity = '0.8';
        block.style.boxShadow = '4px 4px 10px rgba(0,0,0,0.3)';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startMouseX;
        const deltaY = e.clientY - startMouseY;

        let newLeft = startBlockLeft + deltaX;
        let newTop = startBlockTop + deltaY;

        const workspaceRect = workspace.getBoundingClientRect();
        const maxLeft = workspaceRect.width - block.offsetWidth;
        const maxTop = workspaceRect.height - block.offsetHeight;
        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));

        block.style.left = newLeft + 'px';
        block.style.top = newTop + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            block.style.opacity = '1';
            block.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.2)';
        }
    });
});