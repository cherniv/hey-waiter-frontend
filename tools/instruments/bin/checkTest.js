var test = function () {
    var examples = [
        '12345',
        '5678',
        '43665464'
    ];
    for (var i = 0; i < 3; ++i)
        examples.push(Checksum.gen(('' + Math.random()).split('.').pop().substr(0, 7)));
    examples.forEach(function (v) { return console.log("Is " + v + " valid? " + Checksum.check(v)); });
};
test();
//# sourceMappingURL=checkTest.js.map