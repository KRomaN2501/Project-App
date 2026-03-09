class PrintArrBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.arrNames = new Set();
        this.arrIndex = null;
    }

    /** @param {string} str */
    setNames(str) {
        this.arrNames = Convert.convertArrNames(str, true);  //Вернуть пустое множество, если невозможно
        if (this.arrNames.size == 0) {
            updateBlockInputError(this, 0, "");
        }
    }

    /** @param {string} index */
    setIndex(index) {
        this.arrIndex = Convert.canConvertToNumber(index, Block.variables, Block.arrays, 0); //вернуть null, если невозможно
        if (this.arrIndex == null) {
            updateBlockInputError(this, 0, "");
        }
    }

    _perform() {
        for (const name of this.arrNames) {
            let maxIndex = 1e8;
            for (const name of this.arrNames) {
                maxIndex = Math.min(maxIndex, Block.arrays.get(name).length - 1);
            }
            let arrIndexNumber = this.arrIndex ? Convert.convertToNumber(this.arrIndex, Block.variables, Block.arrays, 0, maxIndex) : 0;
            Console.output(Block.arrays.get(name)[arrIndexNumber]);
        }
    }
}