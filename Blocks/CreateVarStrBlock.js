const defaultValue = 0;

class CreateVarStrBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.varStrNames = "";
    }

    /** @param {string} str */
    setNames(str) {
        let varStrNamesSet = Convert.convertToVarNames(this.varStrNames);
        Block.potentialVariables = Block.potentialVariables.filter(item => !varStrNamesSet.has(item));

        this.varStrNames = str;
        if (!Convert.canConvertToVarNames(str, Block.potentialVariables, false)) {
            updateBlockInputError(this, 0, "");
        }

        varStrNamesSet = Convert.convertToVarNames(this.varStrNames);
        varStrNamesSet.forEach(name => Block.potentialVariables.push(name));
    }

    _perform() {
        if (!Convert.canConvertToVarNames(this.varStrNames, Block.variablesString, false)) {
            Console.output("Ошибка");
            return;
        }
        let varStrNamesSet = Convert.convertToVarNames(this.varStrNames);
        varStrNamesSet.forEach(name => Block.variablesString.set(name, defaultValue));
    }

    delete() {
        if (Convert.canConvertToVarNames(this.varStrNames, Block.variablesString, true)) {
            let varStrNamesSet = Convert.convertToVarNames(this.varStrNames);
            Block.potentialVariables = Block.potentialVariables.filter(item => !varStrNamesSet.has(item));
        }
        super.delete();
    }
}