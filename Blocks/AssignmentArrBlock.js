class AssignmentArrBlock extends Block {
    constructor(domElement) {
        super(domElement);
        this.arrNames = "";
        this.arrIndex = null;
        this.arrValue = null;
    }

    /** @param {string} str */
    setNames(str) {
        this.arrNames = str;
        if (!Convert.canConvertToArrNames(str, Block.potentialArrays, true)) {
            updateBlockInputError(this, 0, "");
        }
    }

    /** @param {string} index */
    setIndex(index) {
        this.arrIndex = index;
        if (!Convert.canConvertToNumber(index, Block.potentialVariables, Block.potentialArrays, 0)) {
            updateBlockInputError(this, 1, "");
        }
    }

    /** @param {string} value */
    setValue(value) {
        this.arrValue = value;
        if (!Convert.canConvertToNumber(value, Block.potentialVariables, Block.potentialArrays)) {
            updateBlockInputError(this, 2, "");
        }
    }

    _perform() {
        if (!Convert.canConvertToArrNames(this.arrNames, Block.arrays, true)) {
            Console.output("Ошибка 1");
            return;
        }

        let arrNamesSet = Convert.convertToArrNames(this.arrNames);

        let maxIndex = 1e8;
        for (const name of arrNamesSet) {
            maxIndex = Math.min(maxIndex, Block.arrays.get(name).length - 1);
        }

        if (!Convert.canConvertToNumber(this.arrIndex, Block.variables, Block.arrays, 0, maxIndex)) {
            Console.output("Ошибка 2");
            return;
        }

        if (!Convert.canConvertToNumber(this.arrValue, Block.variables, Block.arrays)) {
            Console.output("Ошибка 3");
            return;
        }

        let arrIndexNumber = Convert.convertToNumber(this.arrIndex, Block.variables, Block.arrays);

        let arrValueNumber = Convert.convertToNumber(this.arrValue, Block.variables, Block.arrays);

        for (const name of arrNamesSet) {
            Block.arrays.get(name)[arrIndexNumber] = arrValueNumber;
        }
    }
}