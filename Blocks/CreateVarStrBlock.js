const defaultValue = 0;

class CreateVarStrBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.varStrNames = "";
    }

    /** @param {string} str */
    setNames(str) {
        let varStrNamesSet = Convert.convertToVarNames(this.varStrNames);
        Block.potentialVariablesString = Block.potentialVariablesString.filter(item => !varStrNamesSet.has(item));

        this.varStrNames = str;
        if (!Convert.canConvertToVarNames(str, Block.potentialVariablesString, false, Block.potentialVariables)) {
            updateBlockInputError(this, 0, "");
        }

        varStrNamesSet = Convert.convertToVarNames(this.varStrNames);
        varStrNamesSet.forEach(name => Block.potentialVariablesString.push(name));
    }

    _perform() {
        if (!Convert.canConvertToVarNames(this.varStrNames, Block.variablesString, false, Block.variables)) {
            Console.output("Ошибка");
            return;
        }
        let varStrNamesSet = Convert.convertToVarNames(this.varStrNames);
        varStrNamesSet.forEach(name => Block.variablesString.set(name, defaultValue));
    }

    delete() {
        if (Convert.canConvertToVarNames(this.varStrNames, Block.variablesString, true)) {
            let varStrNamesSet = Convert.convertToVarNames(this.varStrNames);
            Block.potentialVariablesString = Block.potentialVariablesString.filter(item => !varStrNamesSet.has(item));
        }
        super.delete();
    }
}