class Console {
    /** @returns {string} */
    static input() {
        return InputAreaOnConsole();
    }

    /** @param {string} str*/
    static output(str) {
        printToConsole(str);
    }


}