class CallFuncBlock extends Block {

    /** @param {HTMLElement} domElement */
    constructor(domElement) {
        super(domElement);
        this.targetFuncName = "";
    }

    /** @param {string} name */
    setNames(name) {
        this.targetFuncName = name;
        
        if (!Convert.isVariable(name)) {
            updateBlockInputError(this, 0);
        }
    }

    _perform() {
        const funcBlock = Block.allBlocks.find(b => 
            b instanceof FunctionBlock && b.funcName === this.targetFuncName
        );

        if (funcBlock) {
            funcBlock.call();
        } else {
            Console.output("Ошибка: функция  не найдена");
        }
    }
}