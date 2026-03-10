class CyclicBlock extends BlockContainer {

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
        while (Convert.convertToBool(this.condition, Block.variables, Block.arrays)) {
            if (this.innerBlock) this.innerBlock.activate();
        }
    }
}