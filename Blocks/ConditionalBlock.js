class ConditionalBlock extends BlockContainer {

    constructor(domElement) {
        super(domElement);
        this.condition = null;
    }

    /** @param {string} condition */
    setCondition(condition) {
        this.condition = Convert.convertCondition(condition); //вернуть null если невозможно, иначе это же условие
    }

    _perform() {
        let truthCondition = Convert.convertToBool(this.condition);
        if (truthCondition == null) truthCondition = false;
        if (truthCondition) {
            this.innerBlock.activate();
        }
        if (this.nextBlock instanceof ConditionalBlock_Else) this.nextBlock.setIsActivate(!truthCondition);
    }
}