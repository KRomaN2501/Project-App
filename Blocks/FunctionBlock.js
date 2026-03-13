class FunctionBlock extends BlockContainer {
    static allFunctions = new Map();

    constructor(domElement) {
        super(domElement);
        this.funcName = "";
        this.args = [];
    }

    /** @param {string} name */
    setName(name) {
        if (this.funcName && FunctionBlock.allFunctions.get(this.funcName) === this) {
            FunctionBlock.allFunctions.delete(this.funcName);
        }
        this.funcName = name.trim();
        if (this.funcName !== "") {
            FunctionBlock.allFunctions.set(this.funcName, this);
        } else {
            updateBlockInputError(this, 0); 
        }
    }

    /** @param {string} str */
    setArgs(str) {
        this.args = str.split(',').map(s => s.trim()).filter(s => s !== "");
    }

    _perform() {
    }

    runInternal(passedValues) {
        const localScope = new Map();

        this.args.forEach((argName, index) => {
            localScope.set(argName, passedValues[index] !== undefined ? passedValues[index] : 0);
        });

        const previousScope = Block.currentScope;
        Block.currentScope = localScope;
        
        if (this.innerBlock) {
            this.innerBlock.activate();
        }

        Block.currentScope = previousScope;
    }

    delete() {
        if (this.funcName) {
            FunctionBlock.allFunctions.delete(this.funcName);
        }
        super.delete();
    }
}