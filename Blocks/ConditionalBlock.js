class ConditionalBlock extends BlockContainer {

    constructor(domElement) {
        super(domElement);
        this.condition = null;
    }

    /** @param {string} condition */
    setCondition(condition) {
        this.condition = condition;
        if (!Convert.canConvertToBool(condition, Block.potentialVariables, Block.potentialArrays)) {
            updateBlockInputError(this, 0, "");
        }
    }

    _perform() {
        if (!Convert.canConvertToBool(this.condition, [...Block.variables.keys()], [...Block.arrays.keys()])) {
            Console.output("Ошибка");
            return;
        }
        let conditionBool = Convert.convertToBool(this.condition, Block.variables, Block.arrays);
        if (conditionBool) {
            if (this.innerBlock) this.innerBlock.activate();
        }
        if (this.nextBlock instanceof ConditionalBlock_Else) this.nextBlock.setIsActivate(!conditionBool);
    }
}