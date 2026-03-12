class EndBlock extends Block {
    constructor(domElement) {
        super(domElement);
    }

    _perform() {
        console.log("Программа завершена.");
    }

    activate() {
        this._perform();
    }
}