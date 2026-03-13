class CyclicWithCounterBlock extends BlockContainer {

    constructor(domElement) {
        super(domElement);
        this.varNames = "";
        this.condition = null;
        this.varValue = null;
    }

    /** @param {string} str */
    setNames(str) {
        this.varNames = str;
        if (!Convert.canConvertToVarNames(str, Block.potentialVariables, true)) {
            updateBlockInputError(this, 0, "");
        }
    }

    /** @param {string} condition */
    setCondition(condition) {
        this.condition = condition;
        if (!Convert.canConvertToBool(condition, Block.potentialVariables, Block.potentialArrays)) {
            updateBlockInputError(this, 1, "");
        }
    }

    /** @param {string} value */
    setValue(value) {
        this.varValue = value;
        if (!Convert.canConvertToNumber(value, Block.potentialVariables, Block.potentialArrays)) {
            updateBlockInputError(this, 2, "");
        }
    }

    _perform() {
    if (!Convert.canConvertToVarNames(this.varNames, Block.variables, true)) {
        Console.output("Ошибка в именах переменных");
        return;
    }
    
    // Выполняем цикл, пока условие истинно
    while (Convert.convertToBool(this.condition, Block.variables, Block.arrays)) {
        // Выполняем вложенные блоки
        if (this.innerBlock) {
            this.innerBlock.activate();
        }
        
        // Обновляем значение переменной (шаг цикла)
        let newValue = Convert.convertToNumber(this.varValue, Block.variables, Block.arrays);
        let varNamesSet = Convert.convertToVarNames(this.varNames);
        
        varNamesSet.forEach(name => {
            Block.variables.set(name, newValue);
        });
    }
}
}