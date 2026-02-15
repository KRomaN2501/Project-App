class AssignmentBlock extends Block {
    constructor() {
        super();
        this.varType = null;   //number, string, boolean
        this.varName = null;
        this.varValue = null;
    }

    /** @param {string} type - 'number', 'string' или 'boolean' */
    setType(type) {
        this.varType = type;
    }

    /** @param {string} name */
    setName(name) {
        this.varName = name;
    }

    /** @param {number|string|boolean} value */
    setValue(value) {
        this.varValue = value;
    }

    _perform() {
        if (this.varType && this.varName && this.varValue !== undefined && this.varValue !== null) {
            Block.variables[this.varType][this.varName] = this.varValue;
        }
    }
}