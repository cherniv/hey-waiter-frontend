define("UrlVarsParser", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UrlVarsParser = (function () {
        function UrlVarsParser() {
            var _this = this;
            this.has = function (name) { return typeof _this.vars[name] != 'undefined'; };
            this.get = function (name) { return decodeURIComponent(_this.vars[name]); };
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
            if (!this.has('company') || !this.has('urls'))
                location.href = '?company=' + encodeURIComponent('A good company')
                    + '&urls=' + encodeURIComponent(JSON.stringify([
                    'https://waiter.live#q23432',
                    'https://waiter.live#q76543',
                    'https://waiter.live#q09846',
                ]));
            else {
                this.company = this.get('company');
                this.urls = JSON.parse(this.get('urls'));
            }
        }
        return UrlVarsParser;
    }());
    exports.UrlVarsParser = UrlVarsParser;
});
define("Stor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Stor = (function () {
        function Stor() {
        }
        Stor.can = function () { return (typeof (Storage) !== "undefined"); };
        Stor.has = function (key) { return Stor.get(key) != null; };
        Stor.get = function (key) {
            var ret = JSON.parse(localStorage.getItem(key));
            return ret;
        };
        Stor.set = function (key, val) {
            var ret = localStorage.setItem(key, JSON.stringify(typeof val != 'undefined' ? val : 'null'));
            return ret;
        };
        return Stor;
    }());
    exports.Stor = Stor;
});
define("ConfKeeper", ["require", "exports", "Stor"], function (require, exports, Stor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfKeeper = (function () {
        function ConfKeeper() {
        }
        ConfKeeper.dataType = [
            { name: 'blur', title: 'Blur Background', type: 'boolean', def: true },
            { name: 'darken', title: 'Darken Background', type: 'boolean', def: true },
            { name: 'distort', title: 'Perspective distortion', type: 'boolean', def: true },
            { name: 'bgPath', type: 'string', def: 'assets/bg/1.jpg', outer: true },
        ];
        ConfKeeper.keyExists = function (keyName) { return ConfKeeper.getDataTypeEntryByKey(keyName) != null; };
        ConfKeeper.typeOf = function (keyName) {
            var entry = ConfKeeper.getDataTypeEntryByKey(keyName);
            if (!entry)
                return null;
            return entry.type;
        };
        ConfKeeper.getDataTypeEntryByKey = function (keyName) {
            var d = ConfKeeper.dataType;
            for (var i = 0; i < d.length; ++i)
                if (d[i].name == keyName)
                    return d[i];
            return null;
        };
        ConfKeeper.conf = null;
        ConfKeeper.init = function () {
            if (ConfKeeper.conf == null) {
                var d = ConfKeeper.dataType;
                var conf = ConfKeeper.conf = [];
                for (var i = 0; i < d.length; ++i) {
                    var t = d[i];
                    conf[t.name] = Stor_1.Stor.has(t.name) ? Stor_1.Stor.get(t.name) : t.def;
                }
            }
        };
        ConfKeeper.setConf = function (settingsKey, value) {
            if (!ConfKeeper.keyExists(settingsKey))
                throw 'Unknown key for setting!';
            if (ConfKeeper.typeOf(settingsKey) != typeof value)
                throw "Wrong type for setting " + settingsKey;
            ConfKeeper.conf[settingsKey] = value;
            Stor_1.Stor.set(settingsKey, value);
            console.log(ConfKeeper.conf);
        };
        return ConfKeeper;
    }());
    exports.ConfKeeper = ConfKeeper;
});
define("Settings", ["require", "exports", "ConfKeeper"], function (require, exports, ConfKeeper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Settings = (function () {
        function Settings() {
            var elements = [];
            var i = 0;
            ConfKeeper_1.ConfKeeper.dataType.forEach(function (t) {
                if (!t.outer) {
                    var id = 'chbx' + (i++);
                    var on = ConfKeeper_1.ConfKeeper.conf[t.name];
                    elements.push("<input onclick=\"qrGenUpdate('" + t.name + "', this.checked)\" type=\"checkbox\" id=\"" + id + "\" " + (on ? 'checked' : '') + ">&nbsp;&nbsp;<label for=\"" + id + "\">" + t.title + "</label>");
                }
            });
            $('#settings').html('<h1>QR SETTINGS:</h1>' + elements.join('<br>'));
        }
        return Settings;
    }());
    exports.Settings = Settings;
});
define("BgImage", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BgImage = (function () {
        function BgImage() {
            var elements = [];
            var total = 70;
            for (var i = 1; i < total + 1; ++i) {
                var path = "assets/bg/" + i + ".jpg";
                elements.push("<img onclick=\"qrGenUpdate('bgPath', '" + path + "')\" src=\"" + path + "\" width=\"100%\"/><br>");
            }
            $('#bg-image').html('BG Image:<br>' +
                '<div class="bg-scroll-pane">' + elements.join('<br>') + '</div>');
        }
        return BgImage;
    }());
    exports.BgImage = BgImage;
});
define("QRGen", ["require", "exports", "ConfKeeper"], function (require, exports, ConfKeeper_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var QRGen = (function () {
        function QRGen(vars) {
            var _this = this;
            this.vars = vars;
            this.doUpdate = function (settingsKey, value) {
                ConfKeeper_2.ConfKeeper.setConf(settingsKey, value);
                _this.generate();
            };
            this.generate = function () {
                console.log('generating!');
                console.log(ConfKeeper_2.ConfKeeper.conf);
            };
            window.qrGenUpdate = this.doUpdate;
        }
        return QRGen;
    }());
    exports.QRGen = QRGen;
});
define("Main", ["require", "exports", "UrlVarsParser", "Settings", "BgImage", "QRGen", "ConfKeeper"], function (require, exports, UrlVarsParser_1, Settings_1, BgImage_1, QRGen_1, ConfKeeper_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Main = (function () {
        function Main() {
            var _this = this;
            this.run = function () {
                _this.vars = new UrlVarsParser_1.UrlVarsParser();
                ConfKeeper_3.ConfKeeper.init();
                new Settings_1.Settings();
                new BgImage_1.BgImage();
                var gen = new QRGen_1.QRGen(_this.vars);
                setTimeout(function () { return gen.generate(); }, 300);
            };
            $(document).ready(this.run);
        }
        return Main;
    }());
    new Main();
});
//# sourceMappingURL=bin.js.map