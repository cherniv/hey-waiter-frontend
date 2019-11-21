export class UrlVarsParser {
    constructor(){
        this.vars = {};
        const l = location.href;
        if (l.indexOf('?') >= 0){
            const search = l.split('?').pop();
            const definitions = search.split('&');

            definitions.forEach((val, key) => {
                const parts = val.split('=', 2);
                this.vars[parts[0]] = parts[1];
            });
        }
        if (!this.has('company') || !this.has('urls')){
            let arr = [];
            for (let i = 0; i < 35; ++i)
                arr.push('https://waiter.live/#q' + ('' + Math.random()).substr(2, 16));
            location.href = '?company=' + encodeURIComponent('A good company')
                + '&urls=' + encodeURIComponent(JSON.stringify(
                    arr
                ));
        } else {
            this.company = this.get('company');
            this.urls = JSON.parse(this.get('urls'));
        }
    }

    private has = (name: string) => typeof this.vars[name] != 'undefined';
    private get = (name: string) => decodeURIComponent(this.vars[name]);
    private vars: MapStrStr;
    company: string;
    urls: string[];

}