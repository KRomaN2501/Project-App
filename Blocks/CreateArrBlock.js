class CreateArrBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.arrNames = new Set();
        this.size = null;
    }

    /** @param {string} str */
    setNames(str) {
        Block.potentialArrays = Block.potentialArrays.filter(item => !this.arrNames.has(item))
        let names = Convert.convertArrNames(str, false);  //Вернуть пустое множество, если невозможно
        if (names.size == 0) {
            updateBlockInputError(this, 0, "");
        }
        this.arrNames = names;
        this.arrNames.forEach(name => Block.potentialArrays.push(name))
    }

    /** @param {string} num */
    setSize(num) {
        this.size = Convert.canConvertToNumber(num, Block.variables, Block.arrays);
        if (this.size == null) {
            updateBlockInputError(this, 0, "");
        }
    }

    _perform() {
        if (this.size) this.arrNames.forEach(name => Block.arrays.set(name, new Array(Convert.convertToNumber(this.size, Block.variables, Block.arrays, 1, 100)).fill(0)));
    }

    delete() {
        Block.potentialArrays = Block.potentialArrays.filter(item => !this.arrNames.has(item));
        super.delete();
    }
}