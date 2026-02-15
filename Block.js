class Block {
    static allBlocks = [];

    static variables = {
        number: {},
        string: {},
        boolean: {}
    };

    constructor() {
        this.nextIndex = -1;
    }

    /**
     * @param {typeof Block} BlockClass
     * @param {...any} args
     * @returns {Block}
     */
    static create(BlockClass, ...args) {
        const block = new BlockClass(...args);
        block.index = Block.allBlocks.length;
        Block.allBlocks.push(block);
        return block;
    }

    delete() {
        const index = this.index;

        Block.allBlocks.splice(index, 1);

        for (let i = index; i < Block.allBlocks.length; i++) {
            Block.allBlocks[i].index = i;
        }

        Block.allBlocks.forEach(block => {
            if (block.nextIndex > index) {
                block.nextIndex -= 1;
            } else if (block.nextIndex === index) {
                block.nextIndex = -1;
            }
        });
    }

    activate() {
        throw new Error('Метод activate должен быть переопределён в дочернем классе');
    }

    runNext() {
        if (this.nextIndex !== -1 && Block.allBlocks[this.nextIndex]) {
            Block.allBlocks[this.nextIndex].activate();
        }
    }
}