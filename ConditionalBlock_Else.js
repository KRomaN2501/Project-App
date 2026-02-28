class ConditionalBlock_Else extends Block {
    /** @param {string} BlockID */
    constructor(BlockID) {
        super(BlockID);
        this.isActivate = null;
        this.falseNextBlock = null;
    }

    /** @param {bool} isActivate */
    setIsActivate(isActivate) {
        this.isActivate = isActivate;
    }

    /** @param {Block} block */
    setFalseNext(block) {
        this.trueNextBlock = block;
    }

    removeFalseNext() {
        this.trueNextBlock = null;
    }

    _perform() {
        if (this.isActivate) this.trueNextBlock.activate();
    }
}