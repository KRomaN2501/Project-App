class AssignmentVarBlock extends Block {
    constructor() {
        super();
        this.varNames = null;
        this.varValue = null;
    }

    /** @param {string} str */
    setNames(str) {
        let names = new Set(str.split(',').map(s => s.trim()).filter(name => name !== ''));
        if (names.size != 0) {
            if ([...names].every(name => Block.variables.has(name))) {
                this.varNames = names;
            }
            else {
                //ОШИБКА: Переменная не существует
            }
        }
    }

    /** @param {string} value */
    setValue(value) {
        this.varValue = Convert.convertToNumber(value);
    }

    _perform() {
        if (this.varNames == null) {
            this.setNames(Console.input());
        }
        if (this.varValue == null) {
            this.setValue(Console.input());
        }

        if (this.varNames != null && this.varValue != null) {
            this.varNames.forEach(name => Block.variables.set(name, this.varValue));
        }
    }
}