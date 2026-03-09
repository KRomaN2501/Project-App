class AssignmentVarBlock extends Block {
    constructor(domElement) {
        super(domElement);
        this.varNames = new Set;
        this.varValue = null;
    }

    /** @param {string} str */
    setNames(str) {
        let names = Convert.convertVarNames(str, true); //Вернуть пустое множество, если невозможно
        if (names.size == 0) {
            updateBlockInputError(this, 0, "");
        }
        this.varNames = names;
    }

    /** @param {string} value */
    setValue(value) {
        this.varValue = Convert.canConvertToNumber(value, Block.variables, Block.arrays); //вернуть null, если невозможно, иначе ту же строку
        if (this.varValue == null) {
            updateBlockInputError(this, 0, "");
        }
    }

    _perform() {
        if (this.varValue == null) {
            this.setValue(Console.input());
        }
        this.varNames.forEach(name => Block.variables.set(name, this.varValue ? Convert.convertToNumber(this.varValue, Block.variables, Block.arrays) : 0));
    }
}