class PrintNumberBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.number = null;
    }

    /** @param {string} num */
    setNumber(num) {
        this.number = num;
        if (!Convert.canConvertToNumber(num, Block.potentialVariables, Block.potentialArrays)) {
            updateBlockInputError(this, 0, "");
        }
    }

    _perform() {
        if (!Convert.canConvertToNumber(this.number, Block.variables, Block.arrays)) {
            Console.output("Ошибка");
            return;
        }
        Console.output(Convert.convertToNumber(this.number, Block.variables, Block.arrays));
    }
}