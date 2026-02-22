const defaultValue = 0;

class AssignmentVarBlock extends Block {
    /** @param {string} BlockID */
    constructor(BlockID) {
        super(BlockID);
        this.varNames = new Set;
        this.varValue = null;
    }

    /** @param {string} str */
    setNames(str) {
        let names = Convert.convertVarNames(str); //Вернуть пустое множество, если невозможно
        this.varNames = names;
    }

    /** @param {string} value */
    setValue(value) {
        this.varValue = Convert.convertToNumber(value); //вернуть null, если невозможно
    }

    _perform() {
        if (this.varValue == null) {
            this.setValue(Console.input());
        }
        this.varNames.forEach(name => Block.variables.set(name, this.varValue ? this.varValue : 0));
    }
}