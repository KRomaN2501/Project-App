const defaultCondition = false;

class ConditionalBlock extends Block {
    /** @param {string} BlockID */
    constructor(BlockID) {
        super(BlockID);
        this.condition = null;
        this.trueNextBlock = null;
        this.falseNextBlock = null;
    }

    /**
     * @param {Block} block
     * @param {bool} conditionalNextBlock
     */
    setNext(block, conditionalNextBlock) {
        if (conditionalNextBlock) this.trueNextBlock = block;
        else this.falseNextBlock = block;
    }

    /** @param {bool} conditionalNextBlock */
    removeNext(conditionalNextBlock) {
        if (conditionalNextBlock) this.trueNextBlock = null;
        else this.falseNextBlock = null;
    }

    /** @param {string} condition */
    setCondition(condition) {
        this.condition = Convert.convertCondition(condition); //вернуть null если невозможно, иначе это же условие
    }

    _perform() {
        if (Convert.convertToBool(this.condition) != null ? Convert.convertToBool(this.condition) : defaultCondition) this.nextBlock = this.trueNextBlock;
        else this.nextBlock = this.falseNextBlock;
    }
}