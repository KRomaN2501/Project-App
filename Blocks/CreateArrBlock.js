class CreateArrBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.arrNames = null;
        this.size = null;
    }

    /** @param {string} str */
    setNames(str) {
        let arrNamesSet = Convert.convertToArrNames(this.arrNames, Block.arrays, false);
        Block.potentialArrays = Block.potentialArrays.filter(item => !arrNamesSet.has(item));

        this.arrNames = str;
        if (!Convert.canConvertToArrNames(str, Block.arrays, false)) {
            updateBlockInputError(this, 0, "");
        }

        arrNamesSet = Convert.convertToArrNames(this.arrNames, Block.arrays, false);
        this.arrNames.forEach(name => Block.potentialArrays.push(name));
    }

    /** @param {string} size */
    setSize(size) {
        this.size = size;
        if (!Convert.canConvertToNumber(size, Block.variables, Block.arrays, 1)) {
            updateBlockInputError(this, 1, "");
        }
    }

    _perform() {
        let arrNamesSet = Convert.convertToArrNames(this.arrNames, Block.arrays, false);
        arrNamesSet.forEach(name => Block.arrays.set(name, new Array(Convert.convertToNumber(this.size, Block.variables, Block.arrays, 1, 1e8)).fill(0)));
    }

    delete() {
        let arrNamesSet = Convert.convertToArrNames(this.arrNames, Block.arrays, false);
        Block.potentialArrays = Block.potentialArrays.filter(item => !arrNamesSet.has(item));
        super.delete();
    }
}