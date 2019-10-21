import {UrlVarsParser} from "./UrlVarsParser";
import {Settings} from "./Settings";
import {BgImage} from "./BgImage";
import {QRGen} from "./QRGen";
import {ConfKeeper} from "./ConfKeeper";


class Main {
    constructor(){
        $(document).ready(this.run);
    }

    private run = () => {
        this.vars = new UrlVarsParser();
        ConfKeeper.init();
        new Settings();
        new BgImage(() => {
            const gen = new QRGen(this.vars, 'preview-image', 1024);
            gen.preview();
        });
    };

    vars: UrlVarsParser;
}

new Main();


