class EndBlock extends Block {
    constructor(domElement) {
        super(domElement);
    }

    async _perform() {
        console.log("Программа завершена.");
    }

    activate() {
        this._perform();
    }
}