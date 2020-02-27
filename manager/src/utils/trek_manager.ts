type AsKind = 'guest' | 'wtr' | 'mng';

type FirebaseId = string;

type TrekParam = {
    act:string,
    as:AsKind,
    tbl?:FirebaseId,
    wtr?:FirebaseId,
    mng?:FirebaseId,
}
type TrekParamExt = TrekParam & {
    m:number,
    loc:{
        ip:number[],
        cntr:string,//country
    },
    who:{
        ua:string,
        muff:string,/// muffin, i.e. cookie, but stored in LocalStorage
    }
};
let cloudf:any = null;
const K = `trek`, win = (window as any), stack:TrekParam[] = [], ajax = (url:string, done:(txt:string) => void) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(null);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4)
            if(xhr.status === 200)
                done(xhr.responseText);
            else console.log('Error: ' + xhr.status);
    };
}, TR = (_:TrekParam) => {
    const N = Date.now();
    if(!localStorage.getItem(K))
        localStorage.setItem(K, N.toString(36) + `_` + Math.random().toString(36).slice(-7));
    const p:TrekParamExt = {
        ..._, ...{
            m:Math.round(N / 1000),
            loc:{
                ip:(cloudf.ip as string).split(`.`).map(a => parseInt(a)),
                cntr:cloudf.loc,//country
            },
            who:{
                ua:cloudf.uag,
                muff:localStorage.getItem(K),
            }
        }
    };
    ajax(`https://us-central1-hey-waiter-9d976.`
        + `cloudfunctions.net/trek/trek/add?info=`
        + encodeURIComponent(JSON.stringify(p)),
        txt => {
//            console.log(`trek for ${JSON.stringify(p)} said ${txt}`)
        });
};
export const trek = (p:TrekParam) => stack.push(p);
ajax(`https://www.cloudflare.com/cdn-cgi/trace`, data => {
    cloudf = ('' + data).split('\n')
    .map(v => v.split('='))
    .map(a => ({k:a[0], v:a[1]}))
    .filter(o => o.k)
    .reduce((map, obj) => {
        (map as any)[obj.k] = obj.v;
        return map;
    }, {});
    // alert(JSON.stringify(cloudf));
    const tick = () => {
        if(stack.length)
            TR(stack.shift());
        setTimeout(tick, 250);
    };
    tick();
});
win.trek = trek;

