class PrintNumberBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.number = null;
    }

    /** @param {string} num */
    setNumber(num) {
        this.number = str;
        if (!Convert.canConvertToNumber(num, Block.variables, Block.arrays)) {
            updateBlockInputError(this, 0, "");
        }
    }

    _perform() {
        Console.output(Convert.convertToNumber(this.number, Block.variables, Block.arrays));
    }
}