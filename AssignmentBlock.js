class AssignmentBlock extends Block {
    constructor() {
        super();
        this.varName = null;
        this.varValue = null;
    }

    /** @param {string} name */
    setName(name) {
        this.varName = name;
    }

    /** @param {number} value */
    setValue(value) {
        this.varValue = value;
    }

    _perform() {
        if (this.varName && this.varValue !== undefined && this.varValue !== null) {
            Block.variables.set(this.varName, this.varValue);
        }
    }
}