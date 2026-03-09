class ConditionalBlock extends BlockContainer {

    constructor(domElement) {
        super(domElement);
        this.condition = null;
    }

    /** @param {string} condition */
    setCondition(condition) {
        this.condition = Convert.convertCondition(condition, Block.variables, Block.arrays); //вернуть null если невозможно, иначе это же условие
        if (this.condition == null) {
            updateBlockInputError(this, 0, "");
        }
    }

    _perform() {
        let truthCondition = Convert.convertToBool(this.condition, Block.variables, Block.arrays);
        if (truthCondition == null) truthCondition = false;
        if (truthCondition) {
            if (this.innerBlock) this.innerBlock.activate();
        }
        if (this.nextBlock instanceof ConditionalBlock_Else) this.nextBlock.setIsActivate(!truthCondition);
    }
}