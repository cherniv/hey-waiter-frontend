export class UrlVarsParser{
    constructor(){
        this.vars={};
        const l=location.href;
        if(l.indexOf('?')>=0){
            const search = l.split('?').pop();
            const definitions = search.split( '&' );

            definitions.forEach( ( val, key ) =>{
                const parts = val.split( '=', 2 );
                this.vars[ parts[ 0 ] ] = parts[ 1 ];
            } );
        }
    }
    has=(name:string)=>typeof this.vars[name]!='undefined';
    get=(name:string)=>this.vars[name];
    vars:MapStrStr;
}