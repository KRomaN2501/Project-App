class PrintArrBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.arrNames = "";
        this.arrIndex = null;
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
        if (!Convert.canConvertToNumber(index, Block.potentialVariables, Block.potentialArrays)) {
            updateBlockInputError(this, 1, "");
        }
        let indexNumber = Convert.convertToNumber(index);
        if (indexNumber != null && indexNumber < 0) {
            updateBlockInputError(this, 1, "");
        }
    }

    _perform() {
        if (!Convert.canConvertToArrNames(this.arrNames, Block.arrays, true)) {
            Console.output("Ошибка 6");
            return;
        }

        let arrNamesSet = Convert.convertToArrNames(this.arrNames);

        let maxIndex = 1e8;
        for (const name of arrNamesSet) {
            maxIndex = Math.min(maxIndex, Block.arrays.get(name).length - 1);
        }

        if (!Convert.canConvertToNumber(this.arrIndex, Block.variables, Block.arrays, 0, maxIndex)) {
            Console.output("Ошибка 7");
            return;
        }

        let arrIndexNumber = Convert.convertToNumber(this.arrIndex, Block.variables, Block.arrays);

        arrNamesSet.forEach(name => Console.output(Block.arrays.get(name)[arrIndexNumber]));
    }
}