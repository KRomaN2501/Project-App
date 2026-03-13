class CallFunctionBlock extends Block {
    constructor(domElement) {
        super(domElement);
        this.targetFuncName = "";
        this.params = ""; 
    }

    /** @param {string} name */
    setTargetName(name) {
        this.targetFuncName = name.trim();
    }

    /** @param {string} str */
    setParams(str) {
        this.params = str;
    }

    _perform() {
        const funcBlock = FunctionBlock.allFunctions.get(this.targetFuncName);
        
        if (funcBlock) {
            const paramExpressions = this.params.split(',').map(p => p.trim()).filter(p => p !== "");
            const evaluatedValues = paramExpressions.map(expr => 
                Convert.convertToNumber(expr, Block.variables, Block.arrays)
            );

            funcBlock.runInternal(evaluatedValues);
        } else {
            Console.output("Функция не найдена");
            updateBlockInputError(this, 0);
        }
    }
}