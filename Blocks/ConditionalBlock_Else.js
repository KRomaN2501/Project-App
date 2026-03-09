class ConditionalBlock_Else extends BlockContainer {

    constructor(domElement) {
        super(domElement);
        this.isActivate = null;
    }

    /** @param {bool} isActivate */
    setIsActivate(isActivate) {
        this.isActivate = isActivate;
    }

    _perform() {
        if (this.isActivate ? this.isActivate : false) this.innerBlock.activate();
    }
}