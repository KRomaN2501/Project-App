/**
 * @param {Object} logic 
 * @param {HTMLElement} domElement
 */
function InputAreaInBlocks(logic, domElement) {
    const inputs = domElement.querySelectorAll('.block-input');

    inputs.forEach((input, index) => {

        input.addEventListener('focus', () => {
            input.classList.remove('error');
        });

        input.addEventListener('change', () => {
            const text = input.value;

       
            if (logic instanceof CreateVarBlock) {
                logic.setNames(text);
            }
            else if (logic instanceof AssignmentVarBlock) {
                if (index === 0)
                    logic.setNames(text);
                else if (index === 1)
                    logic.setValue(text);
            }
            else if (logic instanceof CreateArrBlock) {
                if (index === 0)
                    logic.setNames(text);
                else if (index === 1)
                    logic.setSize(text);
            }
            else if (logic instanceof AssignmentArrBlock) {
                if (index === 0)
                    logic.setNames(text);
                else if (index === 1)
                    logic.setIndex(text);
                else if (index === 2)
                    logic.setValue(text);
            }
            else if (logic instanceof CyclicWithCounterBlock){
                if (index === 0)
                    logic.setNames(text);
                else if (index === 1)
                    logic.setCondition(text);
                else if (index === 2)
                    logic.setValue(text);
            }
            else if (logic.setCondition) {
                logic.setCondition(text);
            }
            
            else if (logic instanceof PrintVarBlock) {
                logic.setNames(text);
            }
            else if (logic instanceof PrintNumberBlock) {
                logic.setNumber(text);
            }
            else if (logic instanceof PrintArrBlock) {
                if (index === 0)
                    logic.setNames(text);
                else if (index === 1)
                    logic.setIndex(text);
            }
            else if (logic instanceof FunctionBlock) 
            {
                if (index === 0) 
                    logic.setName(text);
                else if (index === 1) 
                    logic.setArgs(text);
            }
            else if (logic instanceof CallFuncBlock) 
            {
                if (index === 0) 
                    logic.setTargetName(text); 
                else if (index === 1) 
                    logic.setParams(text); 
            }
        });
    });
}


function InputAreaInConsole() {
    const inputField = document.getElementById('input-field');

    if (!inputField) return;

    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (!e.shiftKey) {
                e.preventDefault();
                const currentText = inputField.value;
                return currentText;
            }
        }
    });
}

/**
 * @param {string} txt 
 */
function printToConsole(txt) {
    const outputField = document.getElementById('output-field');

    if (outputField) {
        outputField.value += txt + "\n";
        outputField.scrollTop = outputField.scrollHeight;
    }
}


function clearOutput() {
    const outputField = document.getElementById('output-field');

    if (outputField) {
        outputField.value = "";
    }
}

/**
 * @param {Object} logic 
 * @param {number} index 
 */
function updateBlockInputError(logic, index) {
    const blockVisual = logic.domElement;
    const inputs = blockVisual.querySelectorAll('.block-input');

    if (inputs[index]) {
        inputs[index].classList.add('error');
        Console.output("Ошибка updateBlockInputError");
    }
}