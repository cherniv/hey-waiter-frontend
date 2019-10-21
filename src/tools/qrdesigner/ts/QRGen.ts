import {UrlVarsParser} from "./UrlVarsParser";
import {ConfKeeper} from "./ConfKeeper";
import Widget = JQueryUI.Widget;
import {Stor} from "./Stor";
import Point = PIXI.Point;
import Texture = PIXI.Texture;
import Sprite = PIXI.Sprite;
import Sprite2d = PIXI.projection.Sprite2d;
import GlowFilter = PIXI.filters.GlowFilter;
import {BgImage} from "./BgImage";
import {FontLoader} from "./FontLoader";
import Loader = PIXI.loaders.Loader;


export class QRGen {
    private app: PIXI.Application;
    private size = {w:0, h:0};

    private getWidthByHeight = (height: number) => height / Math.pow(2, .5);

    constructor(public vars: UrlVarsParser, public previewImageId: string, public initialHeight: number){
        (<any>window).qrGenUpdate = this.doUpdate;
        // alert(window.devicePixelRatio);
        const height = initialHeight, width = this.getWidthByHeight(initialHeight);
        this.size = {w:width, h:height};
        this.app = new PIXI.Application({
            autoStart:false,
            width:width, height:height,
            backgroundColor:0xffffff,
            resolution:1,
            antialias:true,
            preserveDrawingBuffer:true,
            // forceCanvas:true,
            view:<HTMLCanvasElement>document.getElementById('preview-temp')
        });
        // $(this.app.view).hide();
        // document.getElementById('preview').appendChild(this.app.view);
        (<any>window).previewCanvas = this.app.view;


    }

    doUpdate = (settingsKey: string, value: string) => {
        ConfKeeper.setConf(settingsKey, value);
        this.preview();
    };
    preview = () => {
        this.generate(0, data => {
            // console.log(data);
            const img = $('#' + this.previewImageId);
            img.attr("src", data);
            img.height(BgImage.height);
            img.width(this.getWidthByHeight(BgImage.height));
        })
    };
    generate = (urlIndex: number, onDone: (dataURL: string) => void) => {

        const loader = new Loader(), setting = ConfKeeper.get;
        const doItAll = () => {
            const blurByFactor = (v: number) => this.initialHeight / (nominalHeight / v);
            const all = this.app.stage;
            all.removeChildren();
            const
                url = this.vars.urls[urlIndex],
                round = Math.round,
                sz = this.size;
            const nominalHeight = 1024;/// the one I prewiev on

            const BG = () => {
                const scaleSprite = (sprite: Sprite, sc: number) => {
                    const ow = sprite.width;
                    sprite.width *= sc;
                    // sprite.x = sprite.width / 2;

                    const oh = sprite.height;
                    sprite.height *= sc;
                    // sprite.y = sprite.height / 2;
                };
                const bg = new Sprite(loader.resources['bg'].texture);
                bg.anchor.set(.5);
                const ratio = bg.width / bg.height;
                bg.height = sz.h;
                bg.width = sz.h * ratio;
                bg.position.set(sz.w / 2, sz.h / 2);
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
                    filters.push(new PIXI.filters.BlurFilter(
                        blurByFactor(8) * (x2 ? 3 : 1),
                        6));
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
            };
            BG();

            let qrSprite: Sprite2d, qrPos: Point;
            const qrSizeRatio = .5, qrSize = round(sz.w * qrSizeRatio), qrSzHalf = qrSize / 2;
            const QR = () => {
                const qrCanvas = <HTMLCanvasElement>document.getElementById('qr');
                const qrious = new QRious({
                    element:qrCanvas,
                    value:url,
                    level:'H',
                    size:512,
                    // padding:round(sz.w * .03),
                });


                const dataURL = qrCanvas.toDataURL();
                // console.log(dataURL);
                const qr = qrSprite = new Sprite2d(PIXI.Texture.from(dataURL));
                qr.anchor.set(.5);
                qr.visible = false;
                const pos = qrPos = new Point(sz.w * .5, sz.h * .6);
                all.addChild(qr);

                /// make points
                const Q = .2;
                const D = 1 + (setting('distort') ? Q * 2 : 0);
                const E = 1 - (setting('distort') ? Q / 2 : 0);
                const points: Point[] = [
                    new Point(-E, -1),
                    new Point(E, -1),
                    new Point(D, 1),
                    new Point(-D, 1),
                ].map(p => new Point(
                    pos.x + qrSzHalf * p.x,
                    pos.y + qrSzHalf * p.y,
                ));

                // this.app.ticker.add(d=>qr.proj.mapSprite(qr, points));
                const delay = round(1 / 60), times = 3;
                for (let i = 0; i < times; ++i)
                    setTimeout(() => {
                            this.app.render();
                            qr.proj.mapSprite(qr, points);
                            qr.visible = true;
                        }, delay
                    );
                setTimeout(() => {
                        // const renderer = this.app.renderer;
                        // const renderTexture = PIXI.RenderTexture.create(renderer.width, renderer.height);
                        // renderer.render(qrSprite, renderTexture);
                        // window.open(renderer.extract.base64());
                        // onDone(renderer.extract.base64());
                        // onDone(this.app.renderer.extract.base64());
                        const canv = this.app.view;
                        // const cont = canv.getContext('webgl', {preserveDrawingBuffer:true});

                        onDone(canv.toDataURL('image/jpeg', this.initialHeight < 1300 ? .75 : .85));
                        // onDone(canv.toDataURL('image/png'));
                    },
                    (delay * (times + 2)) + (this.firstToDataURL ? 100 : 100)
                );
                this.firstToDataURL = false;

            };
            QR();

            const buttonQRCover = () => {
                const button = new Sprite(loader.resources['button'].texture);
                const bSize = sz.w * .51;
                button.width = button.height = bSize;
                button.anchor.set(.5);
                button.position.set(qrPos.x + qrSize * .0, qrPos.y + qrSize * .6);
                button.filters = [new GlowFilter(blurByFactor(16), 1, 0, 0x000000, .5)];
                all.addChild(button);
            };
            buttonQRCover();


            const allTexts = () => {
                const txt = FontLoader.makeText('hello!', sz.w * .1, blurByFactor(16), blurByFactor(4));
                // txt.anchor.set(.5);
                // txt.position.set(sz.w / 2, sz.h / 2);
                txt.x = txt.y = 0;
                all.addChild(txt);
            };
            if (this.fontLoader == null) this.fontLoader = new FontLoader();
            this.fontLoader.init(allTexts);


            // setTimeout(() => $(this.app.view).show(), 800);
        };
        loader.add('bg', setting('bgPath'));
        loader.add('button', 'assets/pics/physical_button.png');
        loader.load(() => doItAll());
    };

    private fontLoader: FontLoader = null;
    private firstToDataURL = true;
}