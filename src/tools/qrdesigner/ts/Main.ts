import {UrlVarsParser} from "./UrlVarsParser";
import {Settings} from "./Settings";


class Main{
    constructor(){
        $(document).ready(this.run);
    }
    private run=()=>{
        const parser=new UrlVarsParser();
        if(!parser.has('company') || !parser.has('urls'))
            location.href = '?company='+encodeURIComponent('A good company')
                +'&urls='+encodeURIComponent(JSON.stringify(
                    [
                        'https://waiter.live#q23432',
                        'https://waiter.live#q76543',
                        'https://waiter.live#q09846',
                    ]));
        new Settings();
    };
    company:string;
    urls:string[];
}

new Main();


