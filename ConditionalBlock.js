const defaultCondition = false;

class ConditionalBlock extends Block {
    /** @param {string} BlockID */
    constructor(BlockID) {
        super(BlockID);
        this.condition = null;
        this.trueNextBlock = null;
    }

    /** @param {string} condition */
    setCondition(condition) {
        this.condition = Convert.convertCondition(condition); //вернуть null если невозможно, иначе это же условие
    }

    /** @param {Block} block */
    setTrueNext(block) {
        this.trueNextBlock = block;
    }

    removeTrueNext() {
        this.trueNextBlock = null;
    }

    _perform() {
        let truthCondition = Convert.convertToBool(this.condition);
        if (truthCondition == null) truthCondition = defaultCondition;
        if (truthCondition) {
            this.trueNextBlock.activate();
        }
        if (this.nextBlock instanceof ConditionalBlock_Else) this.nextBlock.setIsActivate(!truthCondition);
    }
}