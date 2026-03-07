const startButton = document.getElementById('startButton');

startButton.addEventListener('click', () => {
    Block.variables = new Map();
    Block.arrays = new Map();
    clearOutput();
    if (Block.startBlock != null) {
        Block.startBlock.activate();
    }
});