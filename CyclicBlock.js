const defaultCondition = false;

class CyclicBlock extends Block {
    /**
     * @param {string} BlockID
     * @param {string} endBlockID
    */
    constructor(BlockID, endBlockID) {
        super(BlockID);
        this.endCyclicBlock = new EndCyclicBlock(endBlockID, this);
        this.condition = null;
    }

    /** @param {string} condition */
    setCondition(condition) {
        this.condition = Convert.convertCondition(condition); //вернуть null если невозможно, иначе это же условие
    }

    _perform() {
        if (!(Convert.convertToBool(this.condition) != null ? Convert.convertToBool(this.condition) : defaultCondition)) this.nextBlock = this.endCyclicBlock.nextBlock;;
    }
}