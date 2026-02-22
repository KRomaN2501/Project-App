const defaultValue = 0;

class CreateVarBlock extends Block {
    /** @param {string} BlockID */
    constructor(BlockID) {
        super(BlockID);
        this.varNames = new Set();
    }

    /** @param {string} str */
    setNames(str) {
        let names = Convert.convertNewVarNames(str);  //Вернуть пустое множество, если невозможно
        this.varNames = names;
        this.varNames.forEach(name => Block.potentialVariables.push(name))
    }

    _perform() {
        this.varNames.forEach(name => Block.variables.set(name, defaultValue));
    }
}