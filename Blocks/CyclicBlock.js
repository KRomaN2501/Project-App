class CyclicBlock extends BlockContainer {

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
        while ((Convert.convertToBool(this.condition, Block.variables, Block.arrays) != null) ? Convert.convertToBool(this.condition, Block.variables, Block.arrays) : false) {
            this.innerBlock.activate();
        }
    }
}