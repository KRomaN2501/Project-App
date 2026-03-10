class ConditionalBlock extends BlockContainer {

    constructor(domElement) {
        super(domElement);
        this.condition = null;
    }

    /** @param {string} condition */
    setCondition(condition) {
        this.condition = condition;
        if (!Convert.canConvertToBool(condition, Block.variables, Block.arrays)) {
            updateBlockInputError(this, 0, "");
        }
    }

    _perform() {
        let conditionBool = Convert.convertToBool(this.condition, Block.variables, Block.arrays);
        if (conditionBool) {
            if (this.innerBlock) this.innerBlock.activate();
        }
        if (this.nextBlock instanceof ConditionalBlock_Else) this.nextBlock.setIsActivate(!conditionBool);
    }
}