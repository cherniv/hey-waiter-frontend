declare class QRious{
    constructor(
        props:{
            element?:any,
            value:string,
            level?:string,
            size?:number,
            background?: string,
            backgroundAlpha?: number,
            foreground?: string,
            foregroundAlpha?: number,
            padding?: number,
        }
    );
    toDataURL(mime?:string):string;/// defaults to image/png
}
