class CreateArrBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.arrNames = new Set();
        this.size = null;
    }

    /** @param {string} str */
    setNames(str) {
        Block.potentialArrays = Block.potentialArrays.filter(item => !this.arrNames.has(item))
        //let names = Convert.convertArrNames(str, false);  //Вернуть пустое множество, если невозможно
        let names = new Set(); //временно
        names.add(str); // временно
        this.arrNames = names;
        this.arrNames.forEach(name => Block.potentialArrays.push(name))
    }

    /** @param {string} num */
    setSize(num) {
        this.size = Convert.canConvertToNumber(num, Block.variables, Block.arrays);
    }

    _perform() {
        if (this.size) this.arrNames.forEach(name => Block.arrays.set(name, new Array(Convert.convertToNumber(this.size, Block.variables, Block.arrays, 1)).fill(0)));
    }

    delete() {
        Block.potentialArrays = Block.potentialArrays.filter(item => !this.arrNames.has(item));
        super.delete();
    }
}