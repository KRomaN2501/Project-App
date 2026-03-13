class Convert {
  /**
   * @param {string} str
   * @param {Map<string, number>} [dictVars]
   * @param {Map<string, any[]>} [arrays]
   * @returns {number|null}
   */
  static convertToNumber(str, dictVars, arrays, min = null, max = null) { // min и max включительно
    dictVars = Convert.normalizeVariables(dictVars);
    arrays = Convert.normalizeArrays(arrays);

    const rpnArr = Convert.transformationToRpnAndBool(str);
    const result = Convert.countRpnAndBool(rpnArr, dictVars, arrays);

    if (min === null && max === null) return result;
    if (result >= min && result <= max) return result;
    return null;
  }

  /**
   * @param {string} str
   * @param {Map<string, number>} [dictVars]
   * @param {Map<string, any[]>} [arrays]
   * @returns {boolean}
   */
  static convertToBool(str, dictVars, arrays, strVars) {
    dictVars = Convert.normalizeVariables(dictVars);
    arrays = Convert.normalizeArrays(arrays);

    const rpnArr = Convert.transformationToRpnAndBool(str);
    const result = Convert.countRpnAndBool(rpnArr, dictVars, arrays, strVars);

    if (result !== 0 && result !== 1) return false;
    return result === 1;
  }

  static transformation(str) {
    const tokens = [];
    let i = 0;

    function isDigit(a) {
        return (a >= "0" && a <= "9");
    }

    function isLetter(a) {
        return ((a >= "a" && a <= "z") || (a >= "A" && a <= "Z") || a === "_");
    }

    function isIdentifierChar(a) {
        return (isLetter(a) || isDigit(a));
    }

    while (i < str.length) {
      const c = str[i];

      if (c === " " || c === "\n" || c === "\t" || c === "\r") {
        i++;
        continue;
      }

      if (isDigit(c)) {
        let j = i;
        while (j < str.length && isDigit(str[j])) j++;
        tokens.push(str.slice(i, j));
        i = j;
        continue;
      }

      if (isLetter(c)) {
        let j = i;
        while (j < str.length && isIdentifierChar(str[j])) j++;
        tokens.push(str.slice(i, j));
        i = j;
        continue;
      }

      if ("+-*/%()[]".includes(c)) {
        tokens.push(c);
        i++;
        continue;
      }

      if (c === "&" && i + 1 < str.length && str[i + 1] === "&") {
        tokens.push("&&");
        i += 2;
        continue;
      }

      if (c === "|" && i + 1 < str.length && str[i + 1] === "|") {
        tokens.push("||");
        i += 2;
        continue;
      }

      if (c === "=" && i + 2 < str.length && str[i + 1] === "=" && str[i + 2] === "=") {
        tokens.push("===");
        i += 3;
        continue;
      }

      if (c === "!" && i + 2 < str.length && str[i + 1] === "=" && str[i + 2] === "=") {
        tokens.push("!==");
        i += 3;
        continue;
      }

      if ((c === ">" || c === "<") && i + 1 < str.length && str[i + 1] === "=") {
        tokens.push(c + "=");
        i += 2;
        continue;
      }

      if (c === ">" || c === "<" || c === "!") {
        tokens.push(c);
        i++;
        continue;
      }

      return null;
    }

    return tokens;
  }

  static transformationToRpnAndBool(str) {
    const tokens = Convert.transformation(str);
    const out = [];
    const opStack = [];

    const priority = { "||": 1, "&&": 2, "!==": 3, "===": 3, ">=": 4, ">": 4, "<=": 4, "<": 4, "+": 5, "-": 5, "*": 6, "/": 6, "%": 6, "!": 7 };

    for (const t of tokens) {
      if (Convert.isNumberToken(t) || Convert.isVariable(t) || t === "true" || t === "false") {
        out.push(t);
        continue;
      }

      if (Convert.isOperatorToken(t)) {
        while (opStack.length > 0 && Convert.isOperatorToken(opStack[opStack.length - 1]) && priority[opStack[opStack.length - 1]] >= priority[t]) {
          out.push(opStack.pop());
        }
        opStack.push(t);
        continue;
      }

      if (t === "(") {
        opStack.push(t);
        continue;
      }

      if (t === ")") {
        while (opStack.length > 0 && opStack[opStack.length - 1] !== "(") {
          out.push(opStack.pop());
        }
        opStack.pop();
        continue;
      }

      if (t === "[") {
        opStack.push(t);
        continue;
      }

      if (t === "]") {
        while (opStack.length > 0 && opStack[opStack.length - 1] !== "[") {
          out.push(opStack.pop());
        }
        opStack.pop();
        out.push("[]");
        continue;
      }
    }

    while (opStack.length > 0) out.push(opStack.pop());
    return out;
  }

  static countRpnAndBool(rpnArr, dictVars, arrays, strVars) {
    const stack = [];

    for (const token of rpnArr) {
      if (token === "[]") {
        if (stack.length < 2) return null;

        const index = Number(stack.pop());
        const arrName = stack.pop();
        const arr = arrays.get(arrName);

        if (!Array.isArray(arr)) return null;
        if (index < 0 || arr.length <= index) return null;

        stack.push(arr[index]);
        continue;
      }

      if (Convert.isNumberToken(token)) {
        stack.push(parseInt(token, 10));
        continue;
      }

      if (token === "true") {
        stack.push(1);
        continue;
      }

      if (token === "false") {
        stack.push(0);
        continue;
      }

      if (token === "!") {
        const v = stack.pop();
        if (v !== 0 && v !== 1) return null;

        if (v) stack.push(0);
        else stack.push(1);

        continue;
      }

      if (!Convert.isOperatorToken(token)) {
        if (arrays.has(token)) {
          stack.push(token);
          continue;
        }
        if (dictVars.has(token)) {
          stack.push(dictVars.get(token));
          continue;
        }
        if (strVars.has(token)) {         
            stack.push(strVars.get(token));
            continue;
        }
        stack.push(token);
        continue;
      }

      const second = stack.pop();
      const first = stack.pop();

        if (token === "+" || token === "-" || token === "*" || token === "/" || token === "%") {
        if (typeof first !== "number" || typeof second !== "number") return null;
      }

        if (token === "+") stack.push(first + second);
        else if (token === "-") stack.push(first - second);
        else if (token === "*") stack.push(first * second);
        else if (token === "/") {
            if (second === 0) return null;
            stack.push(Math.trunc(first / second));
        } 
        else if (token === "%") {
            if (second === 0) return null;
            stack.push(first % second);
        } 
        else if (token === ">") stack.push(first > second ? 1 : 0);
        else if (token === ">=") stack.push(first >= second ? 1 : 0);
        else if (token === "<") stack.push(first < second ? 1 : 0);
        else if (token === "<=") stack.push(first <= second ? 1 : 0);
        else if (token === "===") stack.push(first === second ? 1 : 0);
        else if (token === "!==") stack.push(first !== second ? 1 : 0);
        else if (token === "&&") stack.push(first === 1 && second === 1 ? 1 : 0);
        else if (token === "||") stack.push(first === 1 || second === 1 ? 1 : 0);
    }

    if (stack.length !== 1) return null;
    return stack[0];
  }

  static isOperatorToken(a) {
    return (
      a === "+" || a === "-" || a === "/" || a === "%" || a === "*" ||
      a === ">" || a === "<" || a === ">=" || a === "<=" ||
      a === "===" || a === "!==" || a === "!" ||
      a === "&&" || a === "||"
    );
  }

  static isNumberToken(a) {
    if (a.length === 0) return false;
    for (let i = 0; i < a.length; i++) {
      if (!(a[i] >= "0" && a[i] <= "9")) return false;
    }
    return true;
  }

  static isVariable(a) {
    if (a.length === 0) return false;
    const c0 = a[0];
    if (!((c0 >= "a" && c0 <= "z") || (c0 >= "A" && c0 <= "Z") || c0 === "_")) return false;

    for (let i = 1; i < a.length; i++) {
      const c = a[i];
      if (!((c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_" || (c >= "0" && c <= "9"))) {
        return false;
      }
    }
    return true;
  }

  static convertToVarNames(str) {
    const names = new Set(str.split(",").map((s) => s.trim()).filter((name) => name !== ""));
    if (names.size === 0) return new Set();

    for (const name of names) {
      if (!Convert.isVariable(name)) return new Set();
    }
    return names;
  }

  static convertToArrNames(str) {
    const names = new Set(str.split(",").map((s) => s.trim()).filter((name) => name !== ""));
    if (names.size === 0) return new Set();

    for (const name of names) {
      if (!Convert.isVariable(name)) return new Set();
    }
    return names;
  }

  static canConvertToArrNames(str, arrays, included) {
    if (!str || typeof str !== "string") return false;

    arrays = Convert.normalizeArrays(arrays);
    const names = str.split(",").map((s) => s.trim()).filter((n) => n !== "");
    if (names.length === 0) return false;

    for (const name of names) {
      if (!Convert.isVariable(name)) return false;

      if (arrays instanceof Map) {
        const exists = arrays.has(name);
        if (included && !exists) return false;
        if (!included && exists) return false;
      } else if (Array.isArray(arrays)) {
        const exists = arrays.includes(name);
        if (included && !exists) return false;
        if (!included && exists) return false;
      }
    }
    return true;
  }

  static canConvertToVarNames(str, dictVars, included, strVars = null) {
    if (!str || typeof str !== "string") return false;

    dictVars = Convert.normalizeVariables(dictVars);
    const names = str.split(",").map((s) => s.trim()).filter((n) => n !== "");
    if (names.length === 0) return false;

    for (const name of names) {
      if (!Convert.isVariable(name)) return false;

      if (dictVars instanceof Map) {
        const exists = dictVars.has(name);
        if (included && !exists) return false;
        if (!included){
            const strExisrs = strVars.has(name);
            if(exists && strExisrs) return false;
        }
      } else if (Array.isArray(dictVars)) {
        const exists = dictVars.includes(name);
        if (included && !exists) return false;
        if (!included && exists) return false;
      }
    }
    return true;
  }

  static canConvertToNumber(str, dictVars, arrays) {
    if (!str || typeof str !== "string") return false;

    dictVars = Convert.normalizeVariables(dictVars);
    arrays = Convert.normalizeArrays(arrays);

    try {
      const tokens = Convert.transformation(str);
      if (!tokens || tokens.length === 0) return false;

      if (!Convert.checkVariables(tokens, dictVars, arrays)) return false;

      let balance = 0;
      for (const t of tokens) {
        if (t === "(") balance++;
        if (t === ")") balance--;
        if (balance < 0) return false;
      }
      if (balance !== 0) return false;

      const rpn = Convert.transformationToRpnAndBool(str);
      if (!rpn || rpn.length === 0) return false;

      const result = Convert.countRpnAndBool(rpn, dictVars, arrays, strVars);
      if (result === null || result === undefined || typeof result !== "number" || Number.isNaN(result)) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  static canConvertToBool(str, dictVars, arrays, strVars) {
    if (!str || typeof str !== "string") return false;

    dictVars = Convert.normalizeVariables(dictVars);
    arrays = Convert.normalizeArrays(arrays);
    strVars = Convert.normalizeStringVars(strVars);

    try {
      const tokens = Convert.transformation(str);
      if (!tokens || tokens.length === 0) return false;
      //if (!Convert.checkVariables(tokens, dictVars, arrays)) return false;

      let balance = 0;
      for (const t of tokens) {
        if (t === "(") balance++;
        if (t === ")") balance--;
        if (balance < 0) return false; 
      }
      if (balance !== 0) return false; 

      const rpn = Convert.transformationToRpnAndBool(str);
      if (!rpn || rpn.length === 0) return false;

      const result = Convert.countRpnAndBool(rpn, dictVars, arrays, strVars);
      if (result !== 0 && result !== 1) return false;

      return true;
    } catch {
      return false;
    }
  }

static checkVariables(tokens, dictVars, arrays) {
    let dictSet;
    let arrSet;

    if (dictVars instanceof Map) dictSet = new Set(dictVars.keys());
    else dictSet = new Set(Object.keys(dictVars || {}));

    if (arrays instanceof Map) arrSet = new Set(arrays.keys());
    else arrSet = new Set(Object.keys(arrays || {}));

    for (const t of tokens) {
      if (Convert.isVariable(t)) {
        if (!dictSet.has(t) && !arrSet.has(t)) return false;
      }
    }
    return true;
}

static normalizeVariables(obj) {
    if (!obj) return new Map();
    if (obj instanceof Map) return obj;

    const map = new Map();
    if (Array.isArray(obj)) {
      for (const v of obj) map.set(v, 1);
    }
    return map;
}

static normalizeArrays(obj) {
    if (!obj) return new Map();
    if (obj instanceof Map) return obj;

    const map = new Map();
    if (Array.isArray(obj)) {
      for (const v of obj) {
        const arr = new Array(1e5).fill(1);
        map.set(v, arr);
      }
    }
    return map;
}

static normalizeStringVars(obj) {
    if (!obj) return new Map();
    if (obj instanceof Map) return obj;
    return new Map(); 
}

}