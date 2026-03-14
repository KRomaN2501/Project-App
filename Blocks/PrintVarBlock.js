class PrintVarBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.varNames = "";
    }

    /** @param {string} str */
    setNames(str) {
        this.varNames = str;
        if (!Convert.canConvertToVarNames(str, Block.potentialVariables, true)) {
            updateBlockInputError(this, 0, "");
        }
    }

    async _perform() {
        if (!Convert.canConvertToVarNames(this.varNames, Block.variables, true)) {
            Console.output("Ошибка");
            return;
        }
        let varNamesSet = Convert.convertToVarNames(this.varNames);
        varNamesSet.forEach(name => Console.output(Block.variables.get(name)));
    }
}