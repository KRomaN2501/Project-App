class CreateArrBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.arrNames = "";
        this.size = null;
    }

    /** @param {string} str */
    setNames(str) {
        let arrNamesSet = Convert.convertToArrNames(this.arrNames);
        Block.potentialArrays = Block.potentialArrays.filter(item => !arrNamesSet.has(item));

        this.arrNames = str;
        if (!Convert.canConvertToArrNames(str, Block.potentialArrays, false)) {
            updateBlockInputError(this, 0, "");
        }

        arrNamesSet = Convert.convertToArrNames(this.arrNames);
        arrNamesSet.forEach(name => Block.potentialArrays.push(name));
    }

    /** @param {string} size */
    setSize(size) {
        this.size = size;
        if (!Convert.canConvertToNumber(size, Block.potentialVariables, Block.potentialArrays, 1)) {
            updateBlockInputError(this, 1, "");
        }
    }

    _perform() {
        if (!Convert.canConvertToArrNames(this.arrNames, [...Block.arrays.keys()], false)) {
            Console.output("Ошибка 4");
            return;
        }
        if (!Convert.canConvertToNumber(this.size, Block.variables, Block.arrays, 1)) {
            Console.output("Ошибка 5");
            return;
        }
        let arrNamesSet = Convert.convertToArrNames(this.arrNames);
        arrNamesSet.forEach(name => Block.arrays.set(name, new Array(Convert.convertToNumber(this.size, Block.variables, Block.arrays)).fill(0)));
    }

    delete() {
        if (Convert.canConvertToArrNames(this.arrNames, [...Block.arrays.keys()], false)) {
            let arrNamesSet = Convert.convertToArrNames(this.arrNames);
            Block.potentialArrays = Block.potentialArrays.filter(item => !arrNamesSet.has(item));
        }
        super.delete();
    }
}