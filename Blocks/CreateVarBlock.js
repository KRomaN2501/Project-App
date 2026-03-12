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
        if (!Convert.canConvertToVarNames(str, Block.potentialVariables, false)) {
            updateBlockInputError(this, 0, "");
        }

        varNamesSet = Convert.convertToVarNames(this.varNames);
        varNamesSet.forEach(name => Block.potentialVariables.push(name));
    }

    _perform() {
        if (!Convert.canConvertToVarNames(this.varNames, [...Block.variables.keys()], false)) {
            Console.output("Ошибка");
            return;
        }
        let varNamesSet = Convert.convertToVarNames(this.varNames);
        varNamesSet.forEach(name => Block.variables.set(name, defaultValue));
    }

    delete() {
        if (Convert.canConvertToVarNames(this.varNames, [...Block.variables.keys()], false)) {
            let varNamesSet = Convert.convertToVarNames(this.varNames);
            Block.potentialVariables = Block.potentialVariables.filter(item => !varNamesSet.has(item));
        }
        super.delete();
    }
}