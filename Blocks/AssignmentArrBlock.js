class AssignmentArrBlock extends Block {
    constructor(domElement) {
        super(domElement);
        this.arrNames = new Set;
        this.arrIndex = null;
        this.arrValue = null;
    }

    /** @param {string} str */
    setNames(str) {
        let names = Convert.convertArrNames(str, true); //Вернуть пустое множество, если невозможно
        this.arrNames = names;
    }

    /** @param {string} index */
    setIndex(index) {
        this.arrIndex = Convert.canConvertToNumber(index, Block.variables, Block.arrays);
    }

    /** @param {string} value */
    setValue(value) {
        this.arrValue = Convert.canConvertToNumber(value, Block.variables, Block.arrays);
    }

    _perform() {
        if (this.arrIndex == null) {
            this.setIndex(Console.input());
        }
        if (this.arrValue == null) {
            this.setValue(Console.input());
        }

        let maxIndex = 1e8;
        for (const name of this.arrNames) {
            maxIndex = Math.min(maxIndex, Block.arrays.get(name).length - 1);
        }

        let arrIndexNumber = this.arrIndex ? Convert.convertToNumber(this.arrIndex, Block.variables, Block.arrays, 0, maxIndex) : 0;
        let arrValueNumber = this.arrValue ? Convert.convertToNumber(this.arrValue, Block.variables, Block.arrays) : 0;

        for (const name of this.arrNames) {
            Block.arrays.get(name)[arrIndexNumber] = arrValueNumber;
        }
    }
}