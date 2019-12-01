/**
 * Implementing Damm algorithm - the most robust one
 * https://en.wikipedia.org/wiki/Damm_algorithm
 */
var Checksum = /** @class */ (function () {
    function Checksum() {
    }
    Checksum.gen = function (id) {
        return id + this.last(id);
    };
    Checksum.last = function (id) {
        var o = 0;
        var zero = '0'.charCodeAt(0);
        for (var i = 0; i < id.length; ++i) {
            var char = id.charCodeAt(i);
            o = this.t[o][char - zero];
        }
        return o;
    };
    Checksum.check = function (idWithChecksum) {
        return this.last(idWithChecksum) == 0;
    };
    Checksum.t = [
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
    return Checksum;
}());
//# sourceMappingURL=check.js.map