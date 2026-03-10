const defaultValue = 0;

class CreateVarBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.varNames = null;
    }

    /** @param {string} str */
    setNames(str) {
        let varNamesSet = Convert.convertToVarNames(this.varNames, Block.variables, true);
        Block.potentialVariables = Block.potentialVariables.filter(item => !varNamesSet.has(item));

        this.varNames = str;
        if (!Convert.canConvertToVarNames(str, Block.variables, false)) {
            updateBlockInputError(this, 0, "");
        }

        varNamesSet = Convert.convertToVarNames(this.arrNames, Block.variables, false);
        this.varNames.forEach(name => Block.potentialVariables.push(name));
    }

    _perform() {
        let varNamesSet = Convert.convertToVarNames(this.varNames, Block.variables, true);
        varNamesSet.forEach(name => Block.variables.set(name, defaultValue));
    }

    delete() {
        Block.potentialVariables = Block.potentialVariables.filter(item => !this.varNames.has(item));
        super.delete();
    }
}