const defaultValue = 0;
const defaultIndex = 0;

class AssignmentArrBlock extends Block {
    constructor(domElement) {
        super(domElement);
        this.arrNames = new Set;
        this.arrIndex = null;
        this.arrValue = null;
    }

    /** @param {string} str */
    setNames(str) {
        let names = Convert.convertArrNames(str, true); //Вернуть пустое множество, если невозможно
        this.arrNames = names;
    }

    /** @param {string} index */
    setIndex(index) {
        this.arrIndex = Convert.convertToNumber(index); //вернуть null, если невозможно
    }

    /** @param {string} value */
    setValue(value) {
        this.arrValue = Convert.convertToNumber(value); //вернуть null, если невозможно
    }

    _perform() {
        if (this.arrIndex == null) {
            this.setIndex(Console.input());
        }
        if (this.arrValue == null) {
            this.setValue(Console.input());
        }

        let arrIndex = this.arrIndex ? this.arrIndex : defaultIndex;
        let arrValue = this.arrValue ? this.arrValue : defaultValue;

        for (const name of this.arrNames) {
            let arr = Block.arrays.get(name);

            if (arrIndex < 1 || arrIndex >= arr.length) {
                arr.push(arrValue);
            } else {
                arr[arrIndex] = arrValue;
            }
        }
    }
}