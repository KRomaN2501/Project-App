function InputAreaInBlocks(logic, domElement) {
    const inputs = domElement.querySelectorAll('.block-input');

    inputs.forEach((input, index) => {
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
            else if (logic.setCondition) {
                logic.setCondition(text);
            }

            if (logic instanceof PrintVarBlock) {
                logic.setNames(text);
            }

            else if (logic instanceof PrintArrBlock) {
                if (index === 0)
                    logic.setNames(text);
                else if (index === 1)
                    logic.setIndex(text);
            }
        });
    });
}
//�����



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
//����� 



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