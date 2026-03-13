class PrintVarStrBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.varStrNames = "";
    }

    /** @param {string} str */
    setNames(str) {
        this.varStrNames = str;
        if (!Convert.canConvertToVarNames(str, Block.potentialVariablesString, true)) {
            updateBlockInputError(this, 0, "");
        }
    }

    _perform() {
        if (!Convert.canConvertToVarNames(this.varStrNames, Block.variablesString, true)) {
            Console.output("Ошибка");
            return;
        }
        let varStrNamesSet = Convert.convertToVarNames(this.varStrNames);
        varStrNamesSet.forEach(name => Console.output(Block.variablesString.get(name)));
    }
}