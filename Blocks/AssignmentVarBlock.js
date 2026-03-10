class AssignmentVarBlock extends Block {
    constructor(domElement) {
        super(domElement);
        this.varNames = "";
        this.varValue = null;
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

    _perform() {
        if (!Convert.canConvertToVarNames(this.varNames, [...Block.variables.values()], true)) {
            Console.output("Ошибка");
            return;
        }
        let varNamesSet = Convert.convertToVarNames(this.varNames);
        varNamesSet.forEach(name => Block.variables.set(name, Convert.convertToNumber(this.varValue, Block.variables, Block.arrays)));
    }
}