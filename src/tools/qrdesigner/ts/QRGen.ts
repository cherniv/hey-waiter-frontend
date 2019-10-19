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
        this.generate();
    };
    generate = () => {
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
        const dark = .6;
        if (setting('blur')){
            const x2=setting('blur2');
            filters.push(new PIXI.filters.BlurFilter(4 * (x2 ? 2 : 1)));
            scaleSprite(bg, x2?1.1:1.05);
        }


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

        // let n=0;
        // function anim(){
        //     n+=.002;
        //     const wave = Math.sin(n*Math.PI*2);
        //     const scale = 1 + wave*.1;
        //
        //     bg.width = sz.w; bg.height = sz.h;
        //
        //     scaleSprite(bg, scale);
        //     console.log(scale);
        //     setTimeout(anim, 1/60);
        // }anim();
    }
}