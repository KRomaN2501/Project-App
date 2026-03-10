class PrintVarBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.varNames = new Set();
    }

    /** @param {string} str */
    setNames(str) {
        this.varNames = str;
        if (!Convert.canConvertToVarNames(str, Block.variables, true)) {
            updateBlockInputError(this, 0, "");
        }
    }

    _perform() {
        let varNamesSet = Convert.convertToVarNames(this.varNames, Block.variables, true)
        varNamesSet.forEach(name => Console.output(Block.variables.get(name)));
    }
}