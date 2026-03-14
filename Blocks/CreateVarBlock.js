const defaultValue = 0;

class CreateVarBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.varNames = "";
    }

    /** @param {string} str */
    setNames(str) {
        let varNamesSet = Convert.convertToVarNames(this.varNames);
        Block.potentialVariables = Block.potentialVariables.filter(item => !varNamesSet.has(item));

        this.varNames = str;
        if (!Convert.canConvertToVarNames(str, Block.potentialVariables, false, Block.potentialVariablesString)) {
            updateBlockInputError(this, 0, "");
        }

        varNamesSet = Convert.convertToVarNames(this.varNames);
        varNamesSet.forEach(name => Block.potentialVariables.push(name));
    }

    async _perform() {
        if (!Convert.canConvertToVarNames(this.varNames, Block.variables, false, Block.variablesString)) {
            Console.output("Ошибка");
            return;
        }
        let varNamesSet = Convert.convertToVarNames(this.varNames);
        varNamesSet.forEach(name => Block.variables.set(name, defaultValue));
    }

    delete() {
        if (Convert.canConvertToVarNames(this.varNames, Block.variables, true)) {
            let varNamesSet = Convert.convertToVarNames(this.varNames);
            Block.potentialVariables = Block.potentialVariables.filter(item => !varNamesSet.has(item));
        }
        super.delete();
    }
}