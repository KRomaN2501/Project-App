class AssignmentVarBlock extends Block {
    constructor(domElement) {
        super(domElement);
        this.varNames = "";
        this.varValue = "";
    }

    /** @param {string} str */
    setNames(str) {
        this.varNames = str;
        if (!Convert.canConvertToVarNames(str, Block.potentialVariables, true)) {
            updateBlockInputError(this, 0, "");
        }
    }

    /** @param {string} value */
    setValue(value) {
        this.varValue = value;
        if (!Convert.canConvertToNumber(value, Block.potentialVariables, Block.potentialArrays)) {
            updateBlockInputError(this, 1, "");
        }
    }



    async _perform() {
        let entered = false;
        if (this.varValue == "") {
            entered = true;
            Console.output("Введите значение");
            let userInput = await Console.input();
            this.varValue = userInput;
        }
        if (!Convert.canConvertToVarNames(this.varNames, Block.variables, true)) {
            Console.output("Ошибка");
            return;
        }
        if (!Convert.canConvertToNumber(this.varValue, Block.variables, Block.arrays)) {
            Console.output("Ошибка");
            return;
        }
        let varNamesSet = Convert.convertToVarNames(this.varNames);
        varNamesSet.forEach(name => Block.variables.set(name, Convert.convertToNumber(this.varValue, Block.variables, Block.arrays)));

        if (entered) this.varValue = "";
    }
}