const clearWorkspaceButton = document.getElementById('clearWorkspaceButton');

clearWorkspaceButton.addEventListener('click', () => {
    if (confirm("Вы уверены, что хотите очистить поле?")) {
        const codeArea = document.getElementById('code-area');
        codeArea.innerHTML = '';

        Block.allBlocks = [];
        Block.variables = new Map();
        Block.potentialVariables = [];
        Block.arrays = new Map();
        Block.potentialArrays = [];
        Block.startBlock = null;

        clearOutput();
        clearInput();
        
        console.log("Очищено");
    }
});