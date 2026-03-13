class Console {
    static input() {
        return new Promise((resolve) => {
            clearInput();
            const inputField = document.getElementById('input-field');
            const onKeyDown = (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    const value = inputField.value;
                    inputField.removeEventListener('keydown', onKeyDown);
                    resolve(value);
                }
            };
            inputField.addEventListener('keydown', onKeyDown);
        });
    }

    /** @param {string} str*/
    static output(str) {
        console.log(str);
        printToConsole(str);
    }


}