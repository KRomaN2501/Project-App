class CreateArrBlock extends Block {

    constructor(domElement) {
        super(domElement);
        this.arrNames = new Set();
    }

    /** @param {string} str */
    setNames(str) {
        Block.potentialArrays = Block.potentialArrays.filter(item => !this.arrNames.has(item))
        let names = Convert.convertArrNames(str, false);  //Вернуть пустое множество, если невозможно
        this.arrNames = names;
        this.arrNames.forEach(name => Block.potentialArrays.push(name))
    }

    _perform() {
        this.arrNames.forEach(name => Block.arrays.set(name, []));
    }
}