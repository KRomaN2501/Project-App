const defaultValue = 0;

class CreateVarBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.varNames = new Set();
    }

    /** @param {string} str */
    setNames(str) {
        //Удалить из potentialVariables то, что есть в varNames
        let names = Convert.convertVarNames(str, false);  //Вернуть пустое множество, если невозможно
        this.varNames = names;
        this.varNames.forEach(name => Block.potentialVariables.push(name))
    }

    _perform() {
        this.varNames.forEach(name => Block.variables.set(name, defaultValue));
    }
}