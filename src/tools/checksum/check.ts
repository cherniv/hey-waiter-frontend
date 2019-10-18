/**
 * Implementing Damm algorithm - the most robust one
 * https://en.wikipedia.org/wiki/Damm_algorithm
 */
class Checksum {
    private static t= [
        [0, 3, 1, 7, 5, 9, 8, 6, 4, 2],
        [7, 0, 9, 2, 1, 5, 4, 8, 6, 3],
        [4, 2, 0, 6, 8, 7, 1, 3, 5, 9],
        [1, 7, 5, 0, 9, 8, 3, 4, 2, 6],
        [6, 1, 2, 3, 0, 4, 5, 9, 7, 8],
        [3, 6, 7, 4, 2, 0, 9, 5, 8, 1],
        [5, 8, 6, 9, 7, 2, 0, 1, 3, 4],
        [8, 9, 4, 5, 3, 6, 2, 0, 1, 7],
        [9, 4, 3, 8, 6, 1, 7, 2, 0, 5],
        [2, 5, 8, 1, 4, 3, 6, 7, 9, 0],
    ];
    static gen(id:string):string{
        return id+this.last(id);
    }
    static last(id:string):number{
        let o=0;
        const zero='0'.charCodeAt(0);
        for(let i=0; i<id.length;++i){
            const char = id.charCodeAt(i);
            o = this.t[o][char - zero];
        }
        return o;
    }
    static check(idWithChecksum:string):boolean{
        return this.last(idWithChecksum)==0;
    }
}
