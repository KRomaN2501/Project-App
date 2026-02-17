const defaultValue = 0;

class CreateVarBlock extends Block {
    constructor() {
        super();
        this.varNames = null;
    }

    /** @param {string} str */
    setNames(str) {
        let names = new Set(str.split(',').map(s => s.trim()).filter(name => name !== ''));
        if (names.size != 0) {
            if (![...names].some(name => Block.variables.has(name))) {
                this.varNames = names;
            }
            else {
                //ОШИБКА: Переменная уже существует
            }
        }
    }

    _perform() {
        if (this.varNames == null) {
            this.setNames(Console.input());
        }

        if (this.varNames != null) {
            this.varNames.forEach(name => Block.variables.set(name, defaultValue));
        }
    }
}