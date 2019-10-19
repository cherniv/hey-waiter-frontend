import {UrlVarsParser} from "./UrlVarsParser";
import {ConfKeeper} from "./ConfKeeper";
import Widget = JQueryUI.Widget;
import {Stor} from "./Stor";
import Point = PIXI.Point;

export class QRGen {
    private app: PIXI.Application;
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
            antialias:true,
        });
        $(this.app.view).hide();
        document.getElementById('preview').appendChild(this.app.view);


    }

    doUpdate = (settingsKey: string, value: string) => {
        ConfKeeper.setConf(settingsKey, value);
        this.generate(0);
    };
    generate = (urlIndex = 0) => {

        const all=this.app.stage;
        all.removeChildren();
        const
            url = this.vars.urls[urlIndex],
            round = Math.round,
            sz = this.size,
            setting = ConfKeeper.get;


        const BG = () => {
            const scaleSprite = (sprite: PIXI.Sprite, sc: number) => {
                const ow = sprite.width;
                sprite.width *= sc;
                sprite.x = (ow - sprite.width) / 2;

                const oh = sprite.height;
                sprite.height *= sc;
                sprite.y = (oh - sprite.height) / 2;
            };
            const bg = new PIXI.Sprite(PIXI.Texture.from(setting('bgPath')));
            bg.width = sz.w;
            bg.height = sz.h;
            all.addChild(bg);
            const filters: any[] = [];
            const addMatrixFn = (proc: (mtx: PIXI.filters.ColorMatrixFilter) => void) => {
                const f = new PIXI.filters.ColorMatrixFilter();
                proc(f);
                filters.push(f);
            };
            const brightness = (val: number) => addMatrixFn(f => f.brightness(val));
            if (setting('blur')){
                const x2 = setting('blur2');
                filters.push(new PIXI.filters.BlurFilter(4 * (x2 ? 2 : 1)));
                scaleSprite(bg, x2 ? 1.1 : 1.05);
            }


            if (setting('darken')){
                brightness(.5);
                if (setting('darken2')) brightness(.7);
            }
            const d = ConfKeeper.dataType;
            for (let i = 0; i < d.length; ++i) {
                const t = d[i];
                if (typeof t.filter != 'undefined' && setting(t.name))
                    addMatrixFn(f => (<any>f)[t.filter](t.mul ? t.mul : null));
            }

            bg.filters = filters;
        };BG();


        const QR = () => {
            const qrCanvas = document.getElementById('qr'), qrSizeRatio = .5;
            const qrSize = round(sz.w * qrSizeRatio);
            const qrSzHalf = qrSize/2;
            const qrious = new QRious({
                element:qrCanvas,
                value:url,
                level:'M',
                size:qrSize,
                padding:round(sz.w * .03),
            });

            const qr = new PIXI.projection.Sprite2d(PIXI.Texture.from(qrious.toDataURL()));
            qr.anchor.set(.5);
            qr.visible=false;
            const pos = {x:sz.w*.5, y:sz.h*.6};
            all.addChild(qr);

            /// make points
            const Q=.2;
            const D=1+(setting('distort')?Q*2:0);
            const E=1-(setting('distort')?Q/2:0);
            const points:Point[] = [
                new Point(-E, -1),
                new Point(E, -1),
                new Point( D,  1),
                new Point(-D,  1),
            ].map(p=>new Point(
                pos.x + qrSzHalf*p.x,
                pos.y + qrSzHalf*p.y,
            ));

            // this.app.ticker.add(d=>qr.proj.mapSprite(qr, points));
            for(let i=0;i<2;++i)
                setTimeout(()=>{
                    qr.proj.mapSprite(qr, points);
                    qr.visible=true;
                }, 1/60
                );
        };
        QR();







        setTimeout(() => $(this.app.view).show(), 800);
    }
}