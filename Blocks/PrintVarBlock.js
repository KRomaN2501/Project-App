class PrintVarBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.varNames = new Set();
    }

    /** @param {string} str */
    setNames(str) {
        this.varNames = Convert.convertVarNames(str, false);  //Вернуть пустое множество, если невозможно
    }

    _perform() {
        for (const name of this.varNames) {
            Console.output(Block.variables[name])
        }
    }
}