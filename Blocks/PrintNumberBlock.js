class PrintNumberBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.number = null;
    }

    /** @param {string} num */
    setNumber(num) {
        this.number = Convert.canConvertToNumber(num, Block.variables, Block.arrays);
    }

    _perform() {
        if (this.number) Console.output(Convert.convertToNumber(this.number));
    }
}