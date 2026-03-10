class PrintArrBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.arrNames = new Set();
        this.arrIndex = null;
    }

    /** @param {string} str */
    setNames(str) {
        this.arrNames = str;
        if (!Convert.canConvertToArrNames(str, Block.arrays, true)) {
            updateBlockInputError(this, 0, "");
        }
    }

    /** @param {string} index */
    setIndex(index) {
        this.arrIndex = index;
        if (!Convert.canConvertToNumber(index, Block.arrays, 0)) {
            updateBlockInputError(this, 1, "");
        }
    }

    _perform() {
        let maxIndex = 1e8;
        for (const name of arrNamesSet) {
            maxIndex = Math.min(maxIndex, Block.arrays.get(name).length - 1);
        }
        let arrIndexNumber = Convert.convertToNumber(this.arrIndex, Block.variables, Block.arrays, 0, maxIndex);

        let arrNamesSet = Convert.convertToArrNames(this.arrNames, Block.arrays, true)
        arrNamesSet.forEach(name => Console.output(Block.arrays.get(name)[arrIndexNumber]));
    }
}