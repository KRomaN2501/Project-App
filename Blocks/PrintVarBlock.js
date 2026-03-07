class PrintVarBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.varNames = new Set();
    }

    /** @param {string} str */
    setNames(str) {
        this.varNames = Convert.convertVarNames(str, false);  //Вернуть пустое множество, если невозможно
        console.log(this.varNames);
    }

    _perform() {
        for (const name of this.varNames) {
            console.log("ВЫВЕСТИ ЗНАЧЕНИЕ");
            Console.output(Block.variables.get(name));
        }
    }
}