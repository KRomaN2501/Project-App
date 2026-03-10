class AssignmentArrBlock extends Block {
    constructor(domElement) {
        super(domElement);
        this.arrNames = null;
        this.arrIndex = null;
        this.arrValue = null;
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

    /** @param {string} value */
    setValue(value) {
        this.arrValue = value;
        if (Convert.canConvertToNumber(value, Block.variables, Block.arrays)) {
            updateBlockInputError(this, 2, "");
        }
    }

    _perform() {
        let maxIndex = 1e8;
        for (const name of arrNamesSet) {
            maxIndex = Math.min(maxIndex, Block.arrays.get(name).length - 1);
        }
        let arrIndexNumber = Convert.convertToNumber(this.arrIndex, Block.variables, Block.arrays, 0, maxIndex);

        let arrNamesSet = Convert.convertToArrNames(this.arrNames, Block.arrays, true)
        let arrValueNumber = Convert.convertToNumber(this.arrValue, Block.variables, Block.arrays);

        for (const name of arrNamesSet) {
            Block.arrays.get(name)[arrIndexNumber] = arrValueNumber;
        }
    }
}