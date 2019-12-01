interface Table {
    url: string,
    name: string,
}

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
        if (!this.has('company') || !this.has('tables')){
            let arr: Table[] = [];
            for (let i = 0; i < 5; ++i) {
                const name = ('' + Math.random()).substr(2, 16);
                arr.push({
                    url:'https://waiter.live/#q' + name,
                    name:'Table #' + name.substr(0, 5)
                });
            }
            location.href = '?company=' + encodeURIComponent('A good company')
                + '&tables=' + encodeURIComponent(JSON.stringify(
                    arr
                ));
        } else {
            this.company = this.get('company');
            this.tables = JSON.parse(this.get('tables'));
        }
    }

    private has = (name: string) => typeof this.vars[name] != 'undefined';
    private get = (name: string) => decodeURIComponent(this.vars[name].split('+').join('%20'));
    private vars: MapStrStr;
    company: string;
    tables: Table[];

}