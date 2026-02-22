class EndCyclicBlock extends Block {
    /** 
     * @param {string} BlockID
     * @param {Block} cyclicBlock
    */
    constructor(BlockID, cyclicBlock) {
        super(BlockID);
        this.cyclicBlock = cyclicBlock;
    }

    runNext() {
        this.cyclicBlock.activate();
    }
}