import {UrlVarsParser} from "./UrlVarsParser";
import {Settings} from "./Settings";
import {BgImage} from "./BgImage";
import {QRGen} from "./QRGen";
import {ConfKeeper} from "./ConfKeeper";
import {QrPrint} from "./QrPrint";



class Main {
    constructor(){
        $(document).ready(this.run);
    }

    private run = () => {
        this.vars = new UrlVarsParser();
        ConfKeeper.init();
        const settings = new Settings();
        const bgi = new BgImage(() => {
            const gen = new QRGen(bgi, this.vars, 'preview-image');
            // alert(ConfKeeper.getCurrentFont().family);
            settings.applyCurrentFontAndReloadThePreview();
            // gen.preview(() => {});

            new QrPrint(this.vars, gen);
        });
    };

    vars:UrlVarsParser;
}



new Main();


