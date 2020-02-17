import Graphics = PIXI.Graphics;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import Point = PIXI.Point;
import {Calc} from "./Calc";


type Canvas = HTMLCanvasElement;


const tsz = {
    target:128,
    margin:8,
    box:3,
    sideNum:-1
};
tsz.sideNum = (tsz.target - tsz.margin * 2) / tsz.box;



export class DrawQR extends Sprite {
    cont:Graphics;
    data:ImageData;
    whiteAt = (x:number, y:number) => {
        const val = this.src.getContext(`2d`).getImageData(x, y, 1, 1).data[0];
        // console.log(`at ${x} and ${y} = ${val}`);
        return val > 127;
    };

    constructor(public val:string, public src:Canvas, public size:number){
        super();
        this.addChild(this.cont = new Graphics());
        const G = this.cont, S = tsz, N = S.sideNum, tg2 = S.target / 2;
        // for(let i = 0; i < 50; i += 7)      console.log(i, this.whiteAt(i, i));

        G.beginFill(0xffffff);

        G.lineStyle(0);

        const rect = (x:number, y:number, w:number, h:number) => {
            const P = (x:number, y:number) => new Point(x, y);
            const a = P(x, y), b = P(x + w, y), c = P(x + w, y + h), d = P(x, y + h);
            // G.drawRect(x, y, w, h);
            const proj = (p:Point) => {
                p.x -= tg2;
                p.y -= tg2;
                const szFixMul = {x:1.4, y:1.2}, mulG = .94;
                const yRange = (from:number, to:number) => Calc.remix(-tg2, tg2, p.y, from, to);
                const depth = 1.4, z = yRange(depth, 1) * depth - .5;
                const scale = 1 / z;
                p.x *= scale * szFixMul.x * mulG;
                p.y *= scale * szFixMul.y * mulG;
                // p.x *= Calc.remix(-tg2, tg2, p.y, distort.top, distort.bottom);
                return p;
            };
            G.drawPolygon([a, b, c, d].map(proj));
        };
        const inPad = S.margin * .5, szInPad = S.target - inPad * 2;
        rect(inPad, inPad, szInPad, szInPad);
        G.beginFill(0x000000);
        // console.log(`N is ${N}`);
        for(let x = 0; x < N; ++x) {
            for(let y = 0; y < N; ++y) {
                const p = {x:S.margin + S.box * x, y:S.margin + S.box * y};
                if(!this.whiteAt(p.x + 2, p.y + 2))
                    rect(p.x, p.y, S.box, S.box);
            }
        }
        // G.x = G.y = -S.target / 2;
        // this.calculateBounds();

        //this.addChild(new Sprite(Texture.from(this.src)));
    }
}