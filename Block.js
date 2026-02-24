class Block {
    static allBlocks = [];
    static variables = new Map();

    constructor() {
        this.nextBlock = null;
        this.domElement = null;
    }

    static create(BlockClass, ...args) {
        const block = new BlockClass(...args);
        block.index = Block.allBlocks.length;
        Block.allBlocks.push(block);
        return block;
    }

    setNext(block) { this.nextBlock = block; }
    removeNext() { this.nextBlock = null; }

    delete() {
        const index = Block.allBlocks.indexOf(this);
        if (index > -1) {
            Block.allBlocks.splice(index, 1);
            Block.allBlocks.forEach((b, i) => b.index = i);
        }
        Block.allBlocks.forEach(b => {
            if (b.nextBlock === this) b.nextBlock = null;
            if (b.innerBlock === this) b.innerBlock = null;
        });
    }

    _perform() { }

    activate() {
        this._perform();
        this.runNext();
    }

    runNext() {
        if (this.nextBlock) this.nextBlock.activate();
    }
}

class IfBlock extends Block {
    constructor() {
        super();
        this.innerBlock = null;
    }

    setInner(block) { this.innerBlock = block; }
    removeInner() { this.innerBlock = null; }

    _perform() {
        const input = this.domElement.querySelector('input');
        const condition = input ? input.value : "false";
        try {
            this.conditionResult = (condition === "1" || eval(condition));
        } catch (e) {
            this.conditionResult = false;
        }
    }

    runNext() {
        if (this.conditionResult && this.innerBlock) {
            this.innerBlock.activate();
        }
        if (this.nextBlock) this.nextBlock.activate();
    }
}