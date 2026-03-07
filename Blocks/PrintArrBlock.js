class PrintArrBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.arrNames = new Set();
        this.arrIndex = null;
    }

    /** @param {string} str */
    setNames(str) {
        this.arrNames = Convert.convertVarNames(str, false);  //Вернуть пустое множество, если невозможно
    }

    /** @param {string} index */
    setIndex(index) {
        this.arrIndex = Convert.convertToNumber(index); //вернуть null, если невозможно
    }

    _perform() {
        for (const name of this.arrNames) {
            if (index >= 1 && index < Block.arrays.get(name).length) Console.output(Block.arrays.get(name)[index]);
        }
    }
}