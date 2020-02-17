import {Stor} from "./Stor";



interface Table {
    url:string,
    name:string,
}



export class UrlVarsParser {
    constructor(){
        this.vars = {};
        const l = location.href;
        if(l.indexOf('?') >= 0){
            const search = l.split('?').pop();
            const definitions = search.split('&');

            definitions.forEach((val, key) => {
                const parts = val.split('=', 2);
                this.vars[parts[0]] = parts[1];
            });
        }
        const notFound = () => !this.has('company') || !this.has('tables');
        if(notFound()){
            const key = `designer_query`;
            Stor.set(key, {
                "company":"Zanzi Bar",
                "tables":[{
                    "url":"https://waiter.live/#qWkaNL4Y1rQkuMdE3Fh8y",
                    "name":"Table #4"
                }, {
                    "url":"https://waiter.live/#qYHt0lpq6kKq3T3zOvZqh",
                    "name":"Table #5"
                }, {
                    "url":"https://waiter.live/#qYdOSoQvNthgIXNKTUP1K",
                    "name":"Table #3"
                }, {
                    "url":"https://waiter.live/#qcavnuJ4hl7GwMV5ycAfP",
                    "name":"Table #1"
                }, {
                    "url":"https://waiter.live/#qfNSL7jAZdTbkLTPe36Lq",
                    "name":"Table #2"
                }, {
                    "url":"https://waiter.live/#qTTK6fW5tyweoDXuKar2T",
                    "name":"Table #3"
                }, {
                    "url":"https://waiter.live/#qWJWABj4yPjrh7MSTkCrt",
                    "name":"Table #4"
                }, {
                    "url":"https://waiter.live/#q471fyodqdMQ2sVsc0hGN",
                    "name":"Table #5"
                }, {"url":"https://waiter.live/#qBw29Ero1BF1PWkrcw9ZD", "name":"Table #6"}]
            });
            if(Stor.has(key)){
                const a = Stor.get(key);
                this.vars[`company`] = a.company;
                this.vars[`tables`] = JSON.stringify(a.tables);
            }
        }
        if(notFound()){
            alert(
                `Query String variables were not consistent:\n` +
                (this.has('company') ? `` : `No "company" query variable found\n`)
                +
                (this.has('tables') ? `` : `No "tables" query variable found\n`)
                + `Hence redirecting to default, sample variables`
            );
            let arr:Table[] = [];
            for(let i = 0; i < 5; ++i) {
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

    private has = (name:string) => typeof this.vars[name] != 'undefined';
    private get = (name:string) => this.has(name) ? decodeURIComponent(this.vars[name].split('+').join('%20')) : null;
    private vars:MapStrStr;
    company:string;
    tables:Table[];

}