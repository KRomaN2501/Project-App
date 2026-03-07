class Console {
    /** @returns {string} */
    static input() {
        return InputAreaInConsole();
    }

    /** @param {string} str*/
    static output(str) {
        console.log(str);
        printToConsole(str);
    }


}