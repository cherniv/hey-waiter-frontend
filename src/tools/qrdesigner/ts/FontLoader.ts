export class FontLoader {
    get richFont(){
        return (<any>window).richFont;
    }

    constructor(){
    }

    private wasAlreadyInit = false;

    init(onDone: () => void){
        if (!this.richFont || this.wasAlreadyInit){
            onDone();
        }
        this.wasAlreadyInit = true;
    }
}