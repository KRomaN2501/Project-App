class CyclicBlock extends BlockContainer {

    constructor(domElement) {
        super(domElement);
        this.condition = null;
    }

    /** @param {string} condition */
    setCondition(condition) {
        this.condition = Convert.convertCondition(condition); //вернуть null если невозможно, иначе это же условие
    }

    _perform() {
        while (Convert.convertToBool(this.condition) != null ? Convert.convertToBool(this.condition) : false) {
            this.innerBlock.activate();
        }
    }
}