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
            alert(
                `Query String variables were not consistent:\n` +
                (this.has('company') ? `` : `No "company" query variable found\n`)
                +
                (this.has('tables') ? `` : `No "tables" query variable found\n`)
                + `Hence redirecting to default, sample variables`
            );
            let arr: Table[] = [];
            for (let i = 0; i < 5; ++i) {
                const name = ('' + Math.random()).substr(2, 16);
                arr.push({
                    url:'https://waiter.live/#q' + name,
                    name:'Table #' + name.substr(0, 5)
                });
            }
            console.log(JSON.stringify(arr));
            location.href = '?company=' + encodeURIComponent(this.get('company') || 'A good company')
                + '&tables=' + (encodeURIComponent(this.get('tables') || JSON.stringify(arr)));
        } else {
            this.company = this.get('company');
            this.tables = JSON.parse(this.get('tables'));
        }
    }

    private has = (name: string) => typeof this.vars[name] != 'undefined';
    private get = (name: string) => this.has(name) ? decodeURIComponent(this.vars[name].split('+').join('%20')) : null;
    private vars: MapStrStr;
    company: string;
    tables: Table[];

}