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
        if(!this.has('company') || !this.has('urls'))
            location.href = '?company='+encodeURIComponent('A good company')
                +'&urls='+encodeURIComponent(JSON.stringify(
                    [
                        'https://waiter.live#q23432',
                        'https://waiter.live#q76543',
                        'https://waiter.live#q09846',
                    ]));
        else{
            this.company=this.get('company');
            this.urls=JSON.parse(this.get('urls'));
        }
    }
    private has=(name:string)=>typeof this.vars[name]!='undefined';
    private get=(name:string)=>decodeURIComponent(this.vars[name]);
    private vars:MapStrStr;
    company:string;
    urls:string[];

}