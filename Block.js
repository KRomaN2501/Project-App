class Block {
    static allBlocks = [];

    static variables = new Map();
    static potentialVariables = [];

    /** @param {string} domElement */
    constructor(domElement) {
        this.nextBlock = null
        this.domElement = domElement;
        block.index = Block.allBlocks.length;
        Block.allBlocks.push(block);
    }

    /** @param {Block} block */
    setNext(block) {
        this.nextBlock = block;
    }

    removeNext() {
        this.nextBlock = null;
    }

    delete() {
        const index = this.index;

        Block.allBlocks.splice(index, 1);

        for (let i = index; i < Block.allBlocks.length; i++) {
            Block.allBlocks[i].index = i;
        }

        Block.allBlocks.forEach(block => {
            if (block.nextBlock === this) {
                block.nextBlock = null;
            }
        });
    }

    _perform() {
        // переопределяется в дочерних классах
    }

    activate() {
        this._perform();
        this.runNext();
    }

    runNext() {
        if (this.nextBlock) {
            this.nextBlock.activate();
        }
    }
}