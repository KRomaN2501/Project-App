function Input(logic /* тут будет тип данных по типу ¬арЅлок и тд*/, domElement) {
    const inputs = domElement.querySelectorAll('.block-input');

    inputs.forEach((input, index) => {
        input.addEventListener('change', () => {
            const text = input.value;

            if (logic instanceof CreateVarBlock) {
                //вызов ваших крутых функций 
                //setNames();
            }
            else if (logic instanceof AssignmentVarBlock) {
                if (index === 0)
                    //setNames();
                if (index === 1)
                   //setValues();
            }
            else if (logic.setCondition) {
                //setConditions();
            }

            if (logic instanceof PrintVarBlock) {
                logic.setVarName(text);
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

Input(blockLogic, newBlock);