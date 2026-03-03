class BlockContainer extends Block {

    constructor(domElement) {
        super(domElement);
        this.innerBlock = null;
    }

    /** @param {Block} block */
    setInner(block) {
        this.innerBlock = block;
    }

    removeInner() {
        this.innerBlock = null;
    }
}