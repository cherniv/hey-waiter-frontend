define("UrlVarsParser", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UrlVarsParser = (function () {
        function UrlVarsParser() {
            var _this = this;
            this.has = function (name) { return typeof _this.vars[name] != 'undefined'; };
            this.get = function (name) { return _this.vars[name]; };
            this.vars = {};
            var l = location.href;
            if (l.indexOf('?') >= 0) {
                var search = l.split('?').pop();
                var definitions = search.split('&');
                definitions.forEach(function (val, key) {
                    var parts = val.split('=', 2);
                    _this.vars[parts[0]] = parts[1];
                });
            }
        }
        return UrlVarsParser;
    }());
    exports.UrlVarsParser = UrlVarsParser;
});
define("Settings", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Settings = (function () {
        function Settings() {
            var elements = [];
            var box = function (id, label) {
                return elements.push("<input type=\"checkbox\" id=\"" + id + "\"><label for=\"" + id + "\">" + label + "</label>");
            };
            box('blur-bg', 'blur background');
            box('darken-bg', 'darken background');
            $('#settings').html('<h1>QR SETTINGS:</h1>' + elements.join('<br>'));
        }
        return Settings;
    }());
    exports.Settings = Settings;
});
define("Main", ["require", "exports", "UrlVarsParser", "Settings"], function (require, exports, UrlVarsParser_1, Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Main = (function () {
        function Main() {
            this.run = function () {
                var parser = new UrlVarsParser_1.UrlVarsParser();
                if (!parser.has('company') || !parser.has('urls'))
                    location.href = '?company=' + encodeURIComponent('A good company')
                        + '&urls=' + encodeURIComponent(JSON.stringify([
                        'https://waiter.live#q23432',
                        'https://waiter.live#q76543',
                        'https://waiter.live#q09846',
                    ]));
                new Settings_1.Settings();
            };
            $(document).ready(this.run);
        }
        return Main;
    }());
    new Main();
});
//# sourceMappingURL=bin.js.map