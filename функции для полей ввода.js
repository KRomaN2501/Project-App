function InputAreaOnBlocks(logic /* тут будет тип данных по типу ¬арЅлок и тд*/, domElement) {
    const inputs = domElement.querySelectorAll('.block-input');

    inputs.forEach((input, index) => {
        input.addEventListener('change', () => {
            const text = input.value;

            if (logic instanceof CreateVarBlock) {
                //setNames();
            }
            else if (logic instanceof AssignmentVarBlock) {
                if (index === 0)
                    //setNames();
                if (index === 1)
                   //setValues();
            }

            else if (logic instanceof CreateArrBlock) {
                //setNames();
            }
            else if (logic instanceof AssignmentVarBlock) {
                if (index === 0)
                    //setNames();
                if (index === 1)
                    //setIndex();
                if (index === 2)
                    //setValues();

            }
            else if (logic.setCondition) {
                //setConditions(); - это и дл€ циклов и дл€ условиц
            }

            if (logic instanceof PrintVarBlock) {
                logic.setNames(text);
            }

            else if (logic instanceof PrintArrBlock) {
                if (index === 0)
                    //setNames();
                if (index === 1)
                    //setIndex();
            }
        });
    });
}
//вызов функции: 
Input(blockLogic, newBlock);



function InputAreaOnConsole() {
    const inputField = document.getElementById('input-field');

    if (!inputField) return;

    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (!e.shiftKey) {
                e.preventDefault();
                const currentText = inputField.value;

                //тут должна быть передача данных дальше куда-нибудь 
                return currentText;

            }
        }
    });
}

//вызов (мб сразу при запуске или потом где-то вызвать)
document.addEventListener('ConsoleContent', InputAreaOnSidebar);


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