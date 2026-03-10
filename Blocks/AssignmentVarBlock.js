class AssignmentVarBlock extends Block {
    constructor(domElement) {
        super(domElement);
        this.varNames = null;
        this.varValue = null;
    }

    /** @param {string} str */
    setNames(str) {
        this.varNames = str;
        if (!Convert.canConvertToVarNames(str, Block.variables, true)) {
            updateBlockInputError(this, 0, "");
        }
    }

    /** @param {string} value */
    setValue(value) {
        this.arrValue = value;
        if (Convert.canConvertToNumber(value, Block.variables, Block.arrays)) {
            updateBlockInputError(this, 1, "");
        }
    }

    _perform() {
        let varNamesSet = Convert.convertToVarNames(this.varNames, Block.variables, true)
        varNamesSet.forEach(name => Block.variables.set(name, Convert.convertToNumber(this.varValue, Block.variables, Block.arrays)));
    }
}