class FunctionBlock extends BlockContainer {

    /** @param {HTMLElement} domElement */
    constructor(domElement) {
        super(domElement);
        this.funcName = "";
    }

    /** @param {string} name */
    setNames(name) {
        this.funcName = name;
        if (!Convert.isVariable(name)) {
            updateBlockInputError(this, 0); 
        }
    }

    _perform() {
    }
    
    call() {
        if (this.innerBlock) {
            this.innerBlock.activate(); 
        }
    }
}