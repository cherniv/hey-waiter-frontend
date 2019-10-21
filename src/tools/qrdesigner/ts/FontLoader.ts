export class FontLoader {
    static get richFont(){
        return (<any>window).richFont;
    }

    static get globalFontFaceName(){
        return (<any>window).globalFontFaceName;
    }

    static makeText = (s: string, fontSz: number, blur: number, dist: number) =>
        FontLoader.makeTextClr(` ${s} `, fontSz, '#ffffff', '#cccccc', blur, dist);


    static makeTextClr(s: string, fontSz: number, clrA: string, clrB: string, blur: number, dist: number){
        //return cast new FakeText();
        return new PIXI.Text(s,
            ({
                fontFamily:(!FontLoader.richFont) ? '_sans' : FontLoader.globalFontFaceName, /// also seen in "index.html"!
                fontSize:fontSz,
                //fontStyle: 'italic',
                // fontWeight:'bold',
                fill:[clrA, clrB], // gradient
                stroke:'#000000',
                //letterSpacing:3,
                strokeThickness:Math.round(blur * .4),
                dropShadow:true,
                dropShadowColor:'#000000',
                dropShadowBlur:blur,
                dropShadowAngle:Math.PI * .5,
                dropShadowDistance:dist,
                dropShadowAlpha:.5
            }));
    }

    private wasAlreadyInit = false;

    init(onDone
             :
             () => void
    ){
        if (!FontLoader.richFont || this.wasAlreadyInit)
            onDone();
        this.wasAlreadyInit = true;
        /// meanwhile let's keep it just empty
        onDone();
    }
}