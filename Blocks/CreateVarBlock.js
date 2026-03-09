const defaultValue = 0;

class CreateVarBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.varNames = new Set();
    }

    /** @param {string} str */
    setNames(str) {
        Block.potentialVariables = Block.potentialVariables.filter(item => !this.varNames.has(item))
        //let names = Convert.convertVarNames(str, false);  //Вернуть пустое множество, если невозможно
        let names = new Set(); //временно
        names.add(str); // временно
        this.varNames = names;
        this.varNames.forEach(name => Block.potentialVariables.push(name));
    }

    _perform() {
        this.varNames.forEach(name => Block.variables.set(name, defaultValue));
    }

    delete() {
        Block.potentialVariables = Block.potentialVariables.filter(item => !this.varNames.has(item));
        super.delete();
    }
}