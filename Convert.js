class Convert {

    /**
     * @param {string} str
     * @param {Map<string, number>} [dict_vars]
     * @param {Map<string, any[]>} [arrays]
     * @returns {number}
     */

    static convertToNumber(str, dict_vars, arrays, min = null, max = null) { //min и max включительно
        const rpn_arr = Convert.transformation_to_RPN_and_bool(str);
        const result = Convert.count_RPN_and_bool(rpn_arr, dict_vars, arrays);
        if (min === null && max === null) return result;
        else if (result >= min && result <= max) return result;
        else return null;
    }

    /**
     * @param {string} str
     * @param {Map<string, number>} [dict_vars]
     * @param {Map<string, any[]>} [arrays]
     * @returns {boolean}
     */
    static convertToBool(str, dict_vars, arrays) {

        const rpn_arr = Convert.transformation_to_RPN_and_bool(str);
        const result = Convert.count_RPN_and_bool(rpn_arr, dict_vars, arrays);

        return result === 1;
    }

    // Сама реализация convertToNumber и converToBool

    static transformation(str_) {
        const correct_cout = [];
        let i = 0;

        function isDigit(a) {
            return (a >= "0" && a <= "9");
        }

        function isLetter(a) {
            return ((a >= "a" && a <= "z") || (a >= "A" && a <= "Z") || a === "_");
        }

        function isRight(a) {
            return (isLetter(a) || isDigit(a));
        }

        while (i < str_.length) {
            const c = str_[i];

            if (c === " " || c === "\n" || c === "\t" || c === "\r") {
                i++;
                continue;
            }

            if (isDigit(c)) {
                let j = i;
                while (j < str_.length && isDigit(str_[j])) j++;
                correct_cout.push(str_.slice(i, j));
                i = j;
                continue;
            }

            if (isLetter(c)) {
                let j = i;
                while (j < str_.length && isRight(str_[j])) j++;
                correct_cout.push(str_.slice(i, j));
                i = j;
                continue;
            }

            if (c === "+" || c === "-" || c === "*" || c === "/" || c === "%" || c === "(" || c === ")" || c === "[" || c === "]") {
                correct_cout.push(c);
                i++;
                continue;
            }

            if (c === "&" && i + 1 < str_.length && str_[i + 1] === "&") {
                correct_cout.push("&&");
                i += 2;
                continue;
            }

            if (c === "|" && i + 1 < str_.length && str_[i + 1] === "|") {
                correct_cout.push("||");
                i += 2;
                continue;
            }

            if ((c === ">" || c === "<" || c === "!" || c === "=") && i + 1 < str_.length && str_[i + 1] === "=") {
                correct_cout.push(c + "=");
                i += 2;
                continue
            }

            if (c === ">" || c === "<" || c === "!") {
                correct_cout.push(c);
                i++;
                continue;
            }

            i++;
        }

        return correct_cout;
    }
    static transformation_to_RPN_and_bool(str_) {
        const rigth_str = Convert.transformation(str_);
        const out = [];
        const stack_op = [];
        const priority = { "||": 1, "&&": 2, "!=": 3, "==": 3, ">=": 4, ">": 4, "<=": 4, "<": 4, "+": 5, "-": 5, "*": 6, "/": 6, "%": 6, "!": 7 };

        function isOperator(a) {
            return (a === "+" || a === "-" || a === "/" || a === "%" || a === "*" ||
                a === ">" || a === "<" || a === ">=" || a === "<=" ||
                a === "==" || a === "!=" || a === "!" ||
                a === "&&" || a === "||");
        }

        function isDenial(a) {
            return a === "!";
        }

        function isNumber(a) {
            if (a.length === 0) return false;
            for (let i = 0; i < a.length; i++) {
                if (!(a[i] >= "0" && a[i] <= "9")) return false;
            }
            return true;
        }

        function isVariable(a) {
            if (a.length === 0) return false;
            const symbol0 = a[0];
            if (!((symbol0 >= "a" && symbol0 <= "z") || (symbol0 >= "A" && symbol0 <= "Z") || symbol0 === "_")) return false;
            for (let i = 1; i < a.length; i++) {
                const symbol = a[i];
                if (!((symbol >= "a" && symbol <= "z") || (symbol >= "A" && symbol <= "Z") || symbol === "_" || (symbol >= "0" && symbol <= "9"))) return false;
            }
            return true;
        }

        for (const c of rigth_str) {
            if (isNumber(c) || isVariable(c) || c === "true" || c === "false") {
                out.push(c);
                continue;
            }

            if (isOperator(c)) {
                while (
                    stack_op.length > 0 &&
                    isOperator(stack_op[stack_op.length - 1]) &&
                    (priority[stack_op[stack_op.length - 1]] >= priority[c] || (c != "!" && priority[stack_op[stack_op.length - 1]] == priority[c]))
                ) {
                    out.push(stack_op.pop());
                }
                stack_op.push(c);
                continue;
            }

            if (c === "(") {
                stack_op.push(c);
                continue;
            }

            if (c === ")") {
                while (stack_op.length > 0 && stack_op[stack_op.length - 1] !== "(") {
                    out.push(stack_op.pop());
                }
                stack_op.pop();
                continue;
            }

            if (c === "[") {
                stack_op.push(c);
                continue;
            }

            if (c === "]") {
                while (stack_op.length > 0 && stack_op[stack_op.length - 1] !== "[") {
                    out.push(stack_op.pop());
                }
                stack_op.pop();
                out.push("[]");
                continue;
            }

        }

        while (stack_op.length > 0) out.push(stack_op.pop());

        return out;
    }

    static count_RPN_and_bool(rpn_arr, dict_vars, arrays) {
        const stack_num = [];

        function isOperator(a) {
            return (a === "+" || a === "-" || a === "/" || a === "%" || a === "*" ||
                a === ">" || a === "<" || a === ">=" || a === "<=" ||
                a === "==" || a === "!=" || a === "!" ||
                a === "&&" || a === "||");
        }

        function isNumber(a) {
            if (a.length === 0) return false;
            for (let i = 0; i < a.length; i++) {
                if (!(a[i] >= "0" && a[i] <= "9")) return false;
            }
            return true;
        }

        for (const value of rpn_arr) {

            if (value === "[]") {
                if (stack_num.length < 2) {
                    return null;
                }
                const index = Number(stack_num.pop());
                const arr_name = stack_num.pop();
                const arr = arrays.get(arr_name);
                if (!Array.isArray(arr)) return null;
                else if (index < 0 || arr.length <= index) return null;
                stack_num.push(arr[index]);
                continue;
            }

            if (isNumber(value)) {
                stack_num.push(parseInt(value, 10));
                continue;
            }

            if (value === "true") {
                stack_num.push(1);
                continue;
            }

            if (value === "false") {
                stack_num.push(0);
                continue;
            }

            if (value === "!") {
                const v = stack_num.pop();
                if (v) {
                    stack_num.push(0);
                    continue;
                }
                else {
                    stack_num.push(1);
                    continue;
                }
            }

            if (!isOperator(value)) {
                if (arrays && arrays.has && arrays.has(value)) {
                    stack_num.push(value);
                    continue;
                }
                if (dict_vars && dict_vars.has && dict_vars.has(value)) {
                    stack_num.push(dict_vars.get(value));
                    continue;
                }
                continue;
            }

            const second_number = stack_num.pop();
            const first_number = stack_num.pop();

            if (value === "+") stack_num.push(first_number + second_number);
            else if (value === "-") stack_num.push(first_number - second_number);
            else if (value === "*") stack_num.push(first_number * second_number);
            else if (value === "/") {
                if (second_number === 0) return null;
                stack_num.push(Math.trunc(first_number / second_number));
            }
            else if (value === "%") {
                if (second_number === 0) return null;
                stack_num.push(first_number % second_number);
            }
            else if (value === ">") stack_num.push(first_number > second_number ? 1 : 0);
            else if (value === ">=") stack_num.push(first_number >= second_number ? 1 : 0);
            else if (value === "<") stack_num.push(first_number < second_number ? 1 : 0);
            else if (value === "<=") stack_num.push(first_number <= second_number ? 1 : 0);
            else if (value === "==") stack_num.push(first_number === second_number ? 1 : 0);
            else if (value === "!=") stack_num.push(first_number !== second_number ? 1 : 0);
            else if (value === "&&") stack_num.push((first_number === 1 && second_number === 1) ? 1 : 0);
            else if (value === "||") stack_num.push((first_number === 1 || second_number === 1) ? 1 : 0);
        }

        return stack_num[0];
    }

    //Реализация проверок


    static isVariable(a) {
        if (a.length === 0) return false;
        const symbol0 = a[0];
        if (!((symbol0 >= "a" && symbol0 <= "z") || (symbol0 >= "A" && symbol0 <= "Z") || symbol0 === "_")) return false;
        for (let i = 1; i < a.length; i++) {
            const symbol = a[i];
            if (!((symbol >= "a" && symbol <= "z") || (symbol >= "A" && symbol <= "Z") || symbol === "_" || (symbol >= "0" && symbol <= "9"))) return false;
        }
        return true;
    }

    static convertToVarNames(str) {
        let names = new Set(str.split(',').map(s => s.trim()).filter(name => name !== ''));
        if (names.size === 0) return new Set();

        for (const name of names) {
            if (!Convert.isVariable(name)) {
                return new Set();
            }
            // const boool = dict_vars.includes(name);
            // if (included) {
            //     if (!boool) return new Set();
            // }
            // else {
            //     if (boool) return new Set();
            // }

        }
        return names;
    }
    static convertToArrNames(str) {
        let names = new Set(str.split(',').map(s => s.trim()).filter(name => name !== ''));
        if (names.size === 0) return new Set();

        for (const name of names) {
            if (!Convert.isVariable(name)) {
                return new Set();
            }
            // const boool = arrays.includes(name);
            // if (included) {
            //     if (!boool) return new Set();
            // }
            // else {
            //     if (boool) return new Set();
            // }

        }
        return names;
    }
    static canConvertToArrNames(str, arrays, included) {
        if (!str || typeof str !== "string") return false;
        arrays = this.normalizeObj(arrays);
        const names = str.split(',').map(s => s.trim()).filter(n => n !== '');

        if (names.length === 0) return false;

        for (const name of names) {
            if (!Convert.isVariable(name)) return false;
            if (arrays instanceof Map) {
                const B_exists = arrays.has(name);
                if (included && !B_exists) return false;
                if (!included && B_exists) return false;
            } else if (Array.isArray(arrays)) {
                const B_exists = arrays.includes(name);
                if (included && !B_exists) return false;
                if (!included && B_exists) return false;
            }
        }
        return true;
    }

    static canConvertToVarNames(str, dict_vars, included) {
        if (!str || typeof str !== "string") return false;
        dict_vars = this.normalizeObj(dict_vars);
        const names = str.split(',').map(s => s.trim()).filter(n => n !== '');

        if (names.length === 0) return false;

        for (const name of names) {
            if (!Convert.isVariable(name)) return false;

            if (dict_vars instanceof Map) {
                const B_exists = dict_vars.has(name);
                if (included && !B_exists) return false;
                if (!included && B_exists) return false;
            } else if (Array.isArray(dict_vars)) {
                const B_exists = dict_vars.includes(name);
                if (included && !B_exists) return false;
                if (!included && B_exists) return false;
            }
        }
        return true;
    }

    static canConvertToNumber(str, dict_vars, arrays, min, max) {
        if (!str || typeof str !== "string") return false;

        dict_vars = Convert.normalizeObj(dict_vars);
        console.log(dict_vars);
        arrays = Convert.normalizeObj(arrays);
        console.log(arrays);

        try {
            const tokens = Convert.transformation(str);
            console.log(tokens)
            if (!tokens || tokens.length === 0) {
                console.log("ошибка there"); 
                return false;
            }
            if (!Convert.checkVariables(tokens, dict_vars, arrays)) {
                console.log("ошибка тут");
                return false; 
                }
            let balance = 0;
            for (const t of tokens) {
                if (t === "(") balance++;
                if (t === ")") balance--;
                if (balance < 0) return false;
            }
            if (balance !== 0) return false;

            const rpn = Convert.transformation_to_RPN_and_bool(str);
            if (!rpn || rpn.length === 0) return false;

            const result = Convert.count_RPN_and_bool(rpn, dict_vars, arrays);
            if (result === null || result === undefined || typeof result !== "number" || Number.isNaN(result)) return false;

            if (min !== null && result < min) return false;
            if (max !== null && result > max) return false;

            return true;
        }
        catch {
            return false;
        }
    }
    static canConvertToBool(str, dict_vars, arrays) {
        if (!str || typeof str !== "string") return false;

        dict_vars = Convert.normalizeObj(dict_vars);
        arrays = Convert.normalizeObj(arrays);

        try {
            const tokens = Convert.transformation(str);
            if (!tokens || tokens.length === 0) return false;
            if (!Convert.checkVariables(tokens, dict_vars, arrays)) return false;

            let balance = 0;
            for (const t of tokens) {
                if (t === "(") balance++;
                if (t === ")") balance--;
                if (balance < 0) return null;
            }
            if (balance !== 0) return null;

            const rpn = Convert.transformation_to_RPN_and_bool(str);
            if (!rpn || rpn.length === 0) return false;

            const result = Convert.count_RPN_and_bool(rpn, dict_vars, arrays);
            if (result !== 0 && result !== 1) return false;

            return true;
        }
        catch {
            return false;
        }
    }

    static checkVariables(tokens, dict_vars, arrays) {
        let dictSet;
        let arrSet;

        if (dict_vars instanceof Map) {
            dictSet = new Set(dict_vars.keys());
        } else {
            dictSet = new Set(Object.keys(dict_vars || {}));
        }

        if (arrays instanceof Map) {
            arrSet = new Set(arrays.keys());
        } else {
            arrSet = new Set(Object.keys(arrays || {}));
        }

        for (const t of tokens) {
            if (Convert.isVariable(t)) {
                if (!dictSet.has(t) && !arrSet.has(t)) {
                    return false;
                }
            }
        }
        return true;
    }

static normalizeObj(Obj) {
    if (!Obj) return new Map();

    if (Array.isArray(Obj)) {
        const map = new Map();
        for (const v of Obj) {
            map.set(v, 0);
        }
        return map;
    }

    if (Obj instanceof Map) {
        return Obj;
    }

    if (typeof Obj === "object") {
        const map = new Map();
        for (const key of Object.keys(Obj)) {
            map.set(key, Obj[key]);
        }
        return map;
    }
    return new Map();
}

}