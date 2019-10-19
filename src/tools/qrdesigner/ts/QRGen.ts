import {UrlVarsParser} from "./UrlVarsParser";
import {ConfKeeper} from "./ConfKeeper";
import Widget = JQueryUI.Widget;
import {Stor} from "./Stor";

export class QRGen {
    private app: PIXI.Application;
    private all: PIXI.Container;
    private size = {w:0, h:0};

    constructor(public vars: UrlVarsParser){
        (<any>window).qrGenUpdate = this.doUpdate;
        // alert(window.devicePixelRatio);
        const height = document.body.clientHeight * .85, width = height / Math.pow(2, .5);
        this.size = {w:width, h:height};
        this.app = new PIXI.Application({
            width:width, height:height,
            backgroundColor:0xffffff,
            resolution:1,
        });
        $(this.app.view).hide();
        document.getElementById('preview').appendChild(this.app.view);

        this.all = new PIXI.Container();

        this.app.stage.addChild(this.all);

    }

    doUpdate = (settingsKey: string, value: string) => {
        ConfKeeper.setConf(settingsKey, value);
        this.generate();
    };
    generate = () => {
        console.log('generating!');
        console.log(ConfKeeper.conf);
        const all = this.all;
        const setting = ConfKeeper.get;
        all.removeChildren();
        const bg = new PIXI.Sprite(PIXI.Texture.from(setting('bgPath')));
        bg.width = this.size.w;
        bg.height = this.size.h;
        all.addChild(bg);
        const filters: any[] = [];
        const addMatrixFn = (proc: (mtx: PIXI.filters.ColorMatrixFilter) => void) => {
            const f = new PIXI.filters.ColorMatrixFilter();
            proc(f);
            filters.push(f);
        };
        const brightness = (val: number) => addMatrixFn(f => f.brightness(val));
        const dark = .6;
        if (setting('blur'))
            filters.push(new PIXI.filters.BlurFilter(4 * (setting('blur2') ? 2 : 1)));

        if (setting('darken')){
            brightness(dark);
            if (setting('darken2')) brightness(dark);
        }
        // if(setting('bw')) addMatrixFn(f=>f.desaturate());
        const d = ConfKeeper.dataType;
        for (let i = 0; i < d.length; ++i) {
            const t = d[i];
            if (typeof t.filter != 'undefined' && setting(t.name))
                addMatrixFn(f => (<any>f)[t.filter](t.mul ? t.mul : null));
        }


        bg.filters = filters;
        setTimeout(() => $(this.app.view).show(), 800);
    }
}