class Block {
    static allBlocks = [];

    static variables = new Map();
    static potentialVariables = [];
    static arrays = new Map();
    static potentialArrays = [];
    static variablesString = new Map();

    static startBlock = null;

    constructor(domElement, start) {
        if (!Block.startBlock && start) {
            Block.startBlock = this;
        }
        this.nextBlock = null;
        this.domElement = domElement;
        this.index = Block.allBlocks.length;
        Block.allBlocks.push(this);
    }

    /** @param {Block} block */
    setNext(block) {
        this.nextBlock = block;
    }

    removeNext() {
        this.nextBlock = null;
    }

    delete() {
        if (Block.startBlock == this) {
            Block.startBlock = null;
        }

        const index = this.index;

        Block.allBlocks.splice(index, 1);

        for (let i = index; i < Block.allBlocks.length; i++) {
            Block.allBlocks[i].index = i;
        }

        Block.allBlocks.forEach(block => {
            if (block.nextBlock === this) {
                block.removeNext();
            }
        });
    }

    _perform() {
        // переопределяется в дочерних классах
    }

    async activate() {
        await this._perform();
        this.runNext();
    }

    runNext() {
        if (this.nextBlock) {
            this.nextBlock.activate();
        }
    }
}