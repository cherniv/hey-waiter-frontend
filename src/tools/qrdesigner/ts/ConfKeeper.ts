import {Stor} from "./Stor";

export class ConfKeeper{
    static dataType = [
        {name:'blur', title:'Blur Background', type:'boolean', def:true},
        {name:'darken', title:'Darken Background', type:'boolean', def:true},
        {name:'distort', title:'Perspective distortion', type:'boolean', def:true},
        {name:'bgPath', type:'string', def:'assets/bg/1.jpg', outer:true},

    ];

    private static keyExists = (keyName:string)=>ConfKeeper.getDataTypeEntryByKey(keyName)!=null;

    private static typeOf = (keyName:string)=>{
        const entry = ConfKeeper.getDataTypeEntryByKey(keyName);
        if(!entry)return null;
        return entry.type;
    };
    private static getDataTypeEntryByKey = (keyName:string)=>{
        const d=ConfKeeper.dataType;
        for(let i=0; i<d.length;++i)
            if(d[i].name==keyName) return d[i];
        return null;
    };
    static conf:MapStrAny=null;
    static init=()=>{
        if(ConfKeeper.conf==null){
            const d=ConfKeeper.dataType;
            const conf:MapStrAny = ConfKeeper.conf = [];
            for(let i=0; i<d.length;++i){
                const t=d[i];
                conf[t.name] = Stor.has(t.name)?Stor.get(t.name):t.def;
            }
        }
    };
    static setConf=(settingsKey:string, value:any)=>{
        if(!ConfKeeper.keyExists(settingsKey))throw 'Unknown key for setting!';
        if(ConfKeeper.typeOf(settingsKey)!=typeof value) throw `Wrong type for setting ${settingsKey}`;
        ConfKeeper.conf[settingsKey] = value;
        Stor.set(settingsKey, value);
        console.log(ConfKeeper.conf)
    };


}