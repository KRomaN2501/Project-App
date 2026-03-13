class AssignmentVarStrBlock extends Block {
    constructor(domElement) {
        super(domElement);
        this.varStrNames = "";
        this.varStrValue = "";
    }

    /** @param {string} str */
    setNames(str) {
        this.varStrNames = str;
        if (!Convert.canConvertToVarNames(str, Block.potentialVariables, true)) {
            updateBlockInputError(this, 0, "");
        }
    }

    /** @param {string} value */
    setValue(value) {
        this.varStrValue = value;
    }



    async _perform() {
        let entered = false;
        if (this.varStrValue == "") {
            entered = true;
            Console.output("Введите значение");
            let userInput = await Console.input();
            this.varStrValue = userInput;
        }
        if (!Convert.canConvertToVarNames(this.varStrNames, Block.variablesString, true)) {
            Console.output("Ошибка");
            return;
        }

        let varStrNamesSet = Convert.convertToVarNames(this.varStrNames);
        varStrNamesSet.forEach(name => Block.variablesString.set(name, this.varStrValue));

        if (entered) this.varStrValue = "";
    }
}