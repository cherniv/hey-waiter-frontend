import {UrlVarsParser} from "./UrlVarsParser";
import {Settings} from "./Settings";
import {BgImage} from "./BgImage";
import {QRGen} from "./QRGen";
import {ConfKeeper} from "./ConfKeeper";


class Main{
    constructor(){
        $(document).ready(this.run);
    }
    private run=()=>{
        this.vars=new UrlVarsParser();
        ConfKeeper.init();
        new Settings();
        new BgImage();
        const gen=new QRGen(this.vars);
        setTimeout(()=>gen.generate(), 300);
    };
    vars:UrlVarsParser;
}

new Main();


