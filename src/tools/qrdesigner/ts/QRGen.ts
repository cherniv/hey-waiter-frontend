import {UrlVarsParser} from "./UrlVarsParser";
import {ConfKeeper} from "./ConfKeeper";
import Widget = JQueryUI.Widget;
import {Stor} from "./Stor";
import hex2rgb = PIXI.utils.hex2rgb;

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
        this.generate(0);
    };
    generate = (urlIndex=0) => {
        const scaleSprite = (sprite:PIXI.Sprite, sc:number)=>{
            const ow =sprite.width;
            sprite.width *= sc;
            sprite.x = (ow - sprite.width)/2;

            const oh =sprite.height;
            sprite.height *= sc;
            sprite.y = (oh - sprite.height)/2;
        };
        console.log('generating!');
        console.log(ConfKeeper.conf);
        const all = this.all;
        const setting = ConfKeeper.get;
        all.removeChildren();
        const bg = new PIXI.Sprite(PIXI.Texture.from(setting('bgPath')));
        const sz=this.size;
        bg.width = sz.w; bg.height = sz.h;
        all.addChild(bg);
        const filters: any[] = [];
        const addMatrixFn = (proc: (mtx: PIXI.filters.ColorMatrixFilter) => void) => {
            const f = new PIXI.filters.ColorMatrixFilter();
            proc(f);
            filters.push(f);
        };
        const brightness = (val: number) => addMatrixFn(f => f.brightness(val));
        if (setting('blur')){
            const x2=setting('blur2');
            filters.push(new PIXI.filters.BlurFilter(4 * (x2 ? 2 : 1)));
            scaleSprite(bg, x2?1.1:1.05);
        }


        if (setting('darken')){
            brightness(.5);
            if (setting('darken2')) brightness(.7);
        }
        // if(setting('bw')) addMatrixFn(f=>f.desaturate());
        const d = ConfKeeper.dataType;
        for (let i = 0; i < d.length; ++i) {
            const t = d[i];
            if (typeof t.filter != 'undefined' && setting(t.name))
                addMatrixFn(f => (<any>f)[t.filter](t.mul ? t.mul : null));
        }


        bg.filters = filters;









        const url = this.vars.urls[urlIndex], round=Math.round;




        const qrCanvas = document.getElementById('qr'),  qrSizeRatio = .5;
        const qrious = new QRious({
            element: qrCanvas,
            value: url,
            level:'M',
            size:round(sz.w*qrSizeRatio),
            padding:round(sz.w*.03),
        });
        const qr = new PIXI.Sprite(PIXI.Texture.from(qrious.toDataURL()));
        qr.anchor.x = .5; qr.anchor.y = .5;
        qr.x = sz.w * .5;
        qr.y = sz.h * .6;
        all.addChild(qr);













        setTimeout(() => $(this.app.view).show(), 800);














    }
}