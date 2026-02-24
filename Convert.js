class Convert {

    /**
     * @param {string} str
     * @param {Map<string, number>} [dict_vars]
     * @returns {number}
     */

    static convertToNumber(str, dict_vars) { 
        const rpn_arr = Convert.transformation_to_RPN_and_bool(str);
        return Convert.count_RPN_and_bool(rpn_arr, dict_vars);
    }

    /**
     * @param {string} str
     * @param {Map<string, number>} [dict_vars]
     * @returns {boolean}
     */
    static convertToBool(str) { //ЗАГЛУШКА
        const rpn_arr = Convert.transformation_to_RPN_and_bool(str);
        return Convert.count_RPN_and_bool(rpn_arr, dict_vars) === 1;
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

            if (c === "+" || c === "-" || c === "*" || c === "/" || c === "(" || c === ")") {
                correct_cout.push(c);
                i++;
                continue;
            }
            
            if(c === "&" && i+1 < str_.length() && str_[i+1] === "&"){
                correct_cout.push("&&");
                i+=2;
                continue;
            }
            
            if(c === "|" && i+1 < str_.length() && str_[i+1] === "|"){
                correct_cout.push("||");
                i+=2;
                continue;
            }

            if((c === ">" || c === "<" || c === "!" || c === "=") && i+1 < str_.length() && str_[i+1] === "="){
                correct_cout.push(c + "=");
                i+=2;
                continue
            }
            
            if(c === ">" || c === "<" || c === "!"){
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
        const priority = { "||" : 1, "&&" : 2, "!=": 3, "==": 3, ">=": 4, ">": 4, "<=": 4, "<": 4, "+":5, "-": 5, "*": 6, "/": 7, "!": 8  };

        function isOperator(a) {
            return (a === "+" || a === "-" || a === "/" || a === "*" ||
                    a === ">" || a === "<" || a === ">=" || a === "<=" ||
                    a === "==" || a === "!=" || a === "!" ||
                    a === "&&" || a === "||");
        }
        
        function isDenial(a){
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
                    (priority[stack_op[stack_op.length - 1]] >= priority[c] || (c!= "!" && priority[stack_op[stack_op.length() - 1]] == priority[c]))
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
        }

        while (stack_op.length > 0) out.push(stack_op.pop());

        return out;
    }

    static count_RPN_and_bool(rpn_arr, dict_vars) {
        const stack_num = [];

        function isOperator(a) {
            return (a === "+" || a === "-" || a === "/" || a === "*" ||
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

            if (isNumber(value)) {
                stack_num.push(parseInt(value, 10));
                continue;
            }

            if(value === "true"){
                stack_num.push(1);
                continue;
            }

            if(value === "false"){
                stack_num.push(0);
                continue;
            }

            if (!isOperator(value)) {
                let v = 0;
                if (dict_vars && dict_vars.has && dict_vars.has(value)) v = dict_vars.get(value);
                stack_num.push(v);
                continue;
            }

            if(value === "!"){
                const v = stack_num.pop();
                if(v){
                    stack_num.push(0);
                    continue;
                }
                else{
                    stack_num.push(1);
                    continue;
                }
            }

            const second_number = stack_num.pop();
            const first_number = stack_num.pop();

            if (value === "+") stack_num.push(first_number + second_number);
            else if (value === "-") stack_num.push(first_number - second_number);
            else if (value === "*") stack_num.push(first_number * second_number);
            else if (value === "/") stack_num.push(Math.trunc(first_number / second_number));

            else if(value === ">") stack_num.push(first_number > second_number ? 1 : 0);
            else if(value === ">=") stack_num.push(first_number >= second_number ? 1 : 0);
            else if(value === "<") stack_num.push(first_number < second_number ? 1 : 0);
            else if(value === "<=") stack_num.push(first_number <= second_number ? 1 : 0);
            else if(value === "==") stack_num.push(first_number === second_number ? 1 : 0);
            else if(value === "!=") stack_num.push(first_number !== second_number ? 1 : 0);
            else if(value === "&&") stack_num.push((first_number === 1 && second_number === 1) ? 1 : 0);
            else if(value === "||") stack_num.push((first_number === 1  || second_number === 1) ? 1 : 0);
        }

        return stack_num[0];
    }

    /**
     * @param {string} str
     * @returns {Set}
     */
    static convertNewVarNames(str) {
        let names = neSetw (str.split(',').map(s => s.trim()).filter(name => name !== ''));
        if ([...names].some(name => Block.potentialVariables.includes(name))) {
            //ОШИБКА: Переменная уже объявлена
            return new Set();
        }
        return names;
    }


    /**
     * @param {string} str
     * @returns {Set}
     */
    static convertVarNames(str) {
        let names = new Set(str.split(',').map(s => s.trim()).filter(name => name !== ''));
        if (![...names].every(name => Block.potentialVariables.includes(name))) {
            //ОШИБКА: Переменная не существует
            return new Set();
        }
        return names;
    }

    /**
     * @param {string} str
     * @returns {string}
     */
    static convertCondition(str) {
        let condition = str;
        if (false) {
            //ОШИБКА: Невозможно перевести в условие
            return null;
        }
        return condition;
    }
}