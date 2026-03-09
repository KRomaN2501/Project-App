class PrintVarBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.varNames = new Set();
    }

    /** @param {string} str */
    setNames(str) {
        this.varNames = Convert.convertVarNames(str, true);  //Вернуть пустое множество, если невозможно
        if (this.varNames.size == 0) {
            updateBlockInputError(this, 0, "");
        }
    }

    _perform() {
        for (const name of this.varNames) {
            Console.output(Block.variables.get(name));
        }
    }
}