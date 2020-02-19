import {Stor} from "./Stor";


type DataEntry =
    {name:string, title?:string, type:string, filter?:string, mul?:number, def?:any, outer?:boolean};

type FontEntry = {family:string, scale:number,};



export class ConfKeeper {
    private static fntKey = `qr_font`;
    static getCurrentFont(){
        if(Stor.has(this.fntKey)){
            this.___currFont = this.name2font(Stor.get(this.fntKey));
        }
        return this.___currFont || this.fonts[0];
    }
    private static name2font(name:string){
        const res = this.fonts.filter(f => f.family == name);
        return res.length ? res[0] : null;
    }
    static setCurrentFont(name:string){
        const font = this.name2font(name);
        this.___currFont = font || this.fonts[0];
        if(font) Stor.set(this.fntKey, name);
    }
    private static ___currFont:FontEntry;
    static fonts:FontEntry[] = [
        {family:`Lilita One`, scale:1},
        {family:`Odibee Sans`, scale:1.4},
        {family:`Lacquer`, scale:.9},
        {family:`Oswald`, scale:1.05},
        {family:`Raleway`, scale:.9},
        {family:`Squada One`, scale:1.2},
        {family:`Lora`, scale:.9},
        {family:`Nunito`, scale:.95},
        {family:`Krona One`, scale:.65},
        {family:`Lobster`, scale:1},
        {family:`Lobster Two`, scale:1},
        {family:`Comfortaa`, scale:.84},
        {family:`Righteous`, scale:.92},
        {family:`Knewave`, scale:.93},
        {family:`Alfa Slab One`, scale:.76},
        {family:`Fredoka One`, scale:.9},
        {family:`Special Elite`, scale:.88},
        {family:`Luckiest Guy`, scale:.85},
        {family:`Monoton`, scale:.67},
        {family:`Sigmar One`, scale:.68},
        {family:`Press Start 2P`, scale:.45},
        {family:`Girassol`, scale:1.07},
        {family:`Audiowide`, scale:.75},
        {family:`Modak`, scale:.93},
        {family:`Playball`, scale:1},
        {family:`Black Ops One`, scale:.8},
        {family:``, scale:1},
        {family:``, scale:1},
        {family:``, scale:1},
    ].map(f => {
        f.family = f.family.trim();
        return f;
    }).filter(f => !!f.family);
    static dataType:DataEntry[] = [

        // {name:'distort', title:'Perspective distortion', type:'boolean', def:true},
        {name:'bgPath', type:'string', def:'assets/bg/big/16.jpg', outer:true, mul:0},

        {name:'blur', title:'Blur Background', type:'boolean', def:false},
        {name:'blur2', title:'Blur More', type:'boolean', def:false},

        {name:'darken', title:'Darken Background', type:'boolean', def:true},
        {name:'darken2', title:'Darken more', type:'boolean', def:false},

        // {name:'bw', title:'B/W', type:'boolean', filter:'blackAndWhite', def:false},


    ];
    private static addCoolFilters = () => {
        const list = [
            'blackAndWhite',
            // 'negative',
            'sepia',
            'technicolor',
            'polaroid',
            'vintage',
            'kodachrome',
            // 'browni',
            // 'lsd',
            '',
            '',
            '',
            '',
            '',
        ];
        const d = ConfKeeper.dataType;
        const capitalize = (s:string) => {
            const a = s.substr(0, 1).toUpperCase() + s.substr(1);
            let r = '';
            for(let i = 0; i < a.length; ++i) {
                const c = a.charAt(i);
                if(c == c.toUpperCase()) r += ' ';
                r += c;
            }
            return r;
        };
        for(let i = 0; i < list.length; ++i) {
            const n = list[i];
            if(n != '') d.push({name:n, title:capitalize(n), type:'boolean', filter:n, mul:1, def:false})
        }

    };

    private static keyExists = (keyName:string) => ConfKeeper.getDataTypeEntryByKey(keyName) != null;

    private static typeOf = (keyName:string) => {
        const entry = ConfKeeper.getDataTypeEntryByKey(keyName);
        if(!entry) return null;
        return entry.type;
    };
    static getDataTypeEntryByKey = (keyName:string) => {
        const d = ConfKeeper.dataType;
        for(let i = 0; i < d.length; ++i)
            if(d[i].name == keyName) return d[i];
        return null;
    };
    static conf:MapStrAny = null;
    static get = (settingName:string) => {
        if(!ConfKeeper.keyExists(settingName)) throw `Unknown key ${settingName} for setting!`;
        return ConfKeeper.conf[settingName];
    };
    static init = () => {
        if(ConfKeeper.conf == null){
            ConfKeeper.addCoolFilters();
            const d = ConfKeeper.dataType;
            const conf:MapStrAny = ConfKeeper.conf = [];
            for(let i = 0; i < d.length; ++i) {
                const t = d[i];
                conf[t.name] = Stor.has(t.name) ? Stor.get(t.name) : t.def;
            }
        }
    };
    static setConf = (settingsKey:string, value:any) => {
        if(!ConfKeeper.keyExists(settingsKey)) throw `Unknown key ${settingsKey} for setting!`;
        if(ConfKeeper.typeOf(settingsKey) != typeof value) throw `Wrong type for setting ${settingsKey}`;
        ConfKeeper.conf[settingsKey] = value;
        Stor.set(settingsKey, value);
    };


}