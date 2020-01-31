import {Stor} from "./Stor";

type DataEntry =
    { name: string, title?: string, type: string, filter?: string, mul?: number, def?: any, outer?: boolean };

export class ConfKeeper {
    static dataType: DataEntry[] = [

        // {name:'distort', title:'Perspective distortion', type:'boolean', def:true},
        {name:'bgPath', type:'string', def:'assets/bg/16.jpg', outer:true, mul:0},

        {name:'blur', title:'Blur Background', type:'boolean', def:true},
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
        const capitalize = (s: string) => {
            const a = s.substr(0, 1).toUpperCase() + s.substr(1);
            let r = '';
            for (let i = 0; i < a.length; ++i) {
                const c = a.charAt(i);
                if (c == c.toUpperCase()) r += ' ';
                r += c;
            }
            return r;
        };
        for (let i = 0; i < list.length; ++i) {
            const n = list[i];
            if (n != '') d.push({name:n, title:capitalize(n), type:'boolean', filter:n, mul:1, def:false})
        }

    };

    private static keyExists = (keyName: string) => ConfKeeper.getDataTypeEntryByKey(keyName) != null;

    private static typeOf = (keyName: string) => {
        const entry = ConfKeeper.getDataTypeEntryByKey(keyName);
        if (!entry) return null;
        return entry.type;
    };
    static getDataTypeEntryByKey = (keyName: string) => {
        const d = ConfKeeper.dataType;
        for (let i = 0; i < d.length; ++i)
            if (d[i].name == keyName) return d[i];
        return null;
    };
    static conf: MapStrAny = null;
    static get = (settingName: string) => {
        if (!ConfKeeper.keyExists(settingName)) throw `Unknown key ${settingName} for setting!`;
        return ConfKeeper.conf[settingName];
    };
    static init = () => {
        if (ConfKeeper.conf == null){
            ConfKeeper.addCoolFilters();
            const d = ConfKeeper.dataType;
            const conf: MapStrAny = ConfKeeper.conf = [];
            for (let i = 0; i < d.length; ++i) {
                const t = d[i];
                conf[t.name] = Stor.has(t.name) ? Stor.get(t.name) : t.def;
            }
        }
    };
    static setConf = (settingsKey: string, value: any) => {
        if (!ConfKeeper.keyExists(settingsKey)) throw `Unknown key ${settingsKey} for setting!`;
        if (ConfKeeper.typeOf(settingsKey) != typeof value) throw `Wrong type for setting ${settingsKey}`;
        ConfKeeper.conf[settingsKey] = value;
        Stor.set(settingsKey, value);
    };


}