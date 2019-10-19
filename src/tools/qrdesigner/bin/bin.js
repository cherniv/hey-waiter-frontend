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
    var pfx = 'qr_';
    var Stor = (function () {
        function Stor() {
        }
        Stor.can = function () { return (typeof (Storage) !== "undefined"); };
        Stor.has = function (key) {
            var ret = Stor.get(key) != null;
            return ret;
        };
        Stor.get = function (key) {
            var ret = JSON.parse(localStorage.getItem(pfx + key));
            return ret;
        };
        Stor.set = function (key, val) {
            var ret = localStorage.setItem(pfx + key, JSON.stringify(typeof val != 'undefined' ? val : 'null'));
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
            { name: 'distort', title: 'Perspective distortion', type: 'boolean', def: true },
            { name: 'bgPath', type: 'string', def: 'assets/bg/1.jpg', outer: true, mul: 0 },
            { name: 'blur', title: 'Blur Background', type: 'boolean', def: true },
            { name: 'blur2', title: 'Blur More', type: 'boolean', def: false },
            { name: 'darken', title: 'Darken Background', type: 'boolean', def: true },
            { name: 'darken2', title: 'Darken more', type: 'boolean', def: false },
        ];
        ConfKeeper.addCoolFilters = function () {
            var list = [
                'blackAndWhite',
                'sepia',
                'technicolor',
                'polaroid',
                'vintage',
                'kodachrome',
                'browni',
                'lsd',
                '',
                '',
                '',
                '',
                '',
            ];
            var d = ConfKeeper.dataType;
            var capitalize = function (s) {
                var a = s.substr(0, 1).toUpperCase() + s.substr(1);
                var r = '';
                for (var i = 0; i < a.length; ++i) {
                    var c = a.charAt(i);
                    if (c == c.toUpperCase())
                        r += ' ';
                    r += c;
                }
                return r;
            };
            for (var i = 0; i < list.length; ++i) {
                var n = list[i];
                if (n != '')
                    d.push({ name: n, title: capitalize(n), type: 'boolean', filter: n, mul: 1, def: false });
            }
        };
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
        ConfKeeper.get = function (settingName) {
            if (!ConfKeeper.keyExists(settingName))
                throw "Unknown key " + settingName + " for setting!";
            return ConfKeeper.conf[settingName];
        };
        ConfKeeper.init = function () {
            if (ConfKeeper.conf == null) {
                ConfKeeper.addCoolFilters();
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
                throw "Unknown key " + settingsKey + " for setting!";
            if (ConfKeeper.typeOf(settingsKey) != typeof value)
                throw "Wrong type for setting " + settingsKey;
            ConfKeeper.conf[settingsKey] = value;
            Stor_1.Stor.set(settingsKey, value);
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
            var win = window;
            win.settingsChUpd = function (name, value) {
                var entry = ConfKeeper_1.ConfKeeper.getDataTypeEntryByKey(name);
                if (typeof entry.filter != 'undefined')
                    ConfKeeper_1.ConfKeeper.dataType.forEach(function (t) {
                        if (t.name != name && typeof t.filter != 'undefined') {
                            $('#st_chb' + t.name).attr('checked', false);
                            win.qrGenUpdate(t.name, false);
                        }
                    });
                win.qrGenUpdate(name, value);
            };
            ConfKeeper_1.ConfKeeper.dataType.forEach(function (t) {
                if (!t.outer) {
                    var id = 'st_chb' + t.name;
                    var on = ConfKeeper_1.ConfKeeper.conf[t.name];
                    elements.push((t.title.toLowerCase().indexOf('more') != -1 ? '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' : '')
                        + ("<input onclick=\"settingsChUpd('" + t.name + "', this.checked)\" type=\"checkbox\" id=\"" + id + "\" " + (on ? 'checked' : '') + ">&nbsp;&nbsp;<label for=\"" + id + "\">" + t.title + "</label>"));
                }
            });
            $('#settings').html('<b>QR SETTINGS</b><br>' + elements.join('<br>'));
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
            $('#bg-image').html('<b>BG Image</b><br>' +
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
            this.size = { w: 0, h: 0 };
            this.doUpdate = function (settingsKey, value) {
                ConfKeeper_2.ConfKeeper.setConf(settingsKey, value);
                _this.generate();
            };
            this.generate = function () {
                var scaleSprite = function (sprite, sc) {
                    var ow = sprite.width;
                    sprite.width *= sc;
                    sprite.x = (ow - sprite.width) / 2;
                    var oh = sprite.height;
                    sprite.height *= sc;
                    sprite.y = (oh - sprite.height) / 2;
                };
                console.log('generating!');
                console.log(ConfKeeper_2.ConfKeeper.conf);
                var all = _this.all;
                var setting = ConfKeeper_2.ConfKeeper.get;
                all.removeChildren();
                var bg = new PIXI.Sprite(PIXI.Texture.from(setting('bgPath')));
                var sz = _this.size;
                bg.width = sz.w;
                bg.height = sz.h;
                all.addChild(bg);
                var filters = [];
                var addMatrixFn = function (proc) {
                    var f = new PIXI.filters.ColorMatrixFilter();
                    proc(f);
                    filters.push(f);
                };
                var brightness = function (val) { return addMatrixFn(function (f) { return f.brightness(val); }); };
                var dark = .6;
                if (setting('blur')) {
                    var x2 = setting('blur2');
                    filters.push(new PIXI.filters.BlurFilter(4 * (x2 ? 2 : 1)));
                    scaleSprite(bg, x2 ? 1.1 : 1.05);
                }
                if (setting('darken')) {
                    brightness(dark);
                    if (setting('darken2'))
                        brightness(dark);
                }
                var d = ConfKeeper_2.ConfKeeper.dataType;
                var _loop_1 = function (i) {
                    var t = d[i];
                    if (typeof t.filter != 'undefined' && setting(t.name))
                        addMatrixFn(function (f) { return f[t.filter](t.mul ? t.mul : null); });
                };
                for (var i = 0; i < d.length; ++i) {
                    _loop_1(i);
                }
                bg.filters = filters;
                setTimeout(function () { return $(_this.app.view).show(); }, 800);
            };
            window.qrGenUpdate = this.doUpdate;
            var height = document.body.clientHeight * .85, width = height / Math.pow(2, .5);
            this.size = { w: width, h: height };
            this.app = new PIXI.Application({
                width: width, height: height,
                backgroundColor: 0xffffff,
                resolution: 1,
            });
            $(this.app.view).hide();
            document.getElementById('preview').appendChild(this.app.view);
            this.all = new PIXI.Container();
            this.app.stage.addChild(this.all);
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
                gen.generate();
            };
            $(document).ready(this.run);
        }
        return Main;
    }());
    new Main();
});
//# sourceMappingURL=bin.js.map