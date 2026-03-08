class PrintArrBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.arrNames = new Set();
        this.arrIndex = null;
    }

    /** @param {string} str */
    setNames(str) {
        this.arrNames = Convert.convertVarNames(str, true);  //Вернуть пустое множество, если невозможно
    }

    /** @param {string} index */
    setIndex(index) {
        this.arrIndex = Convert.canConvertToNumber(index, Block.variables, Block.arrays, 0); //вернуть null, если невозможно
    }

    _perform() {
        for (const name of this.arrNames) {
            if (this.arrIndex && this.arrIndex < Block.arrays.get(name).length) Console.output(Block.arrays.get(name)[this.arrIndex]);
        }
    }
}