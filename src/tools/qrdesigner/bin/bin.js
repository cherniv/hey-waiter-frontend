define("BgImage", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BgImage = (function () {
        function BgImage(onInit) {
            var elements = [];
            var total = 70;
            for (var i = 1; i < total + 1; ++i) {
                var path = "assets/bg/" + i + ".jpg";
                elements.push("<img onclick=\"qrGenUpdate('bgPath', '" + path + "')\" src=\"" + path + "\" width=\"100%\"/><br>");
            }
            $('#bg-image').html('<b>BG Image</b><br>' +
                '<div class="bg-scroll-pane">' + elements.join('<br>') + '</div>');
            var pane = $('.bg-scroll-pane');
            BgImage.height = $(window).height() - 4 - pane.offset().top;
            pane.css('height', Math.round(BgImage.height) + 'px');
            setTimeout(onInit, 200);
        }
        BgImage.height = 0;
        return BgImage;
    }());
    exports.BgImage = BgImage;
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
                    'https://waiter.live/#q23432',
                    'https://waiter.live/#q76543',
                    'https://waiter.live/#q09846',
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
define("FontLoader", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FontLoader = (function () {
        function FontLoader() {
            this.wasAlreadyInit = false;
        }
        Object.defineProperty(FontLoader.prototype, "richFont", {
            get: function () {
                return window.richFont;
            },
            enumerable: true,
            configurable: true
        });
        FontLoader.prototype.init = function (onDone) {
            if (!this.richFont || this.wasAlreadyInit) {
                onDone();
            }
            this.wasAlreadyInit = true;
        };
        return FontLoader;
    }());
    exports.FontLoader = FontLoader;
});
define("QRGen", ["require", "exports", "ConfKeeper", "BgImage", "FontLoader"], function (require, exports, ConfKeeper_2, BgImage_1, FontLoader_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Point = PIXI.Point;
    var Texture = PIXI.Texture;
    var Sprite = PIXI.Sprite;
    var Sprite2d = PIXI.projection.Sprite2d;
    var GlowFilter = PIXI.filters.GlowFilter;
    var QRGen = (function () {
        function QRGen(vars, previewImageId, initialHeight) {
            var _this = this;
            this.vars = vars;
            this.previewImageId = previewImageId;
            this.initialHeight = initialHeight;
            this.size = { w: 0, h: 0 };
            this.getWidthByHeight = function (height) { return height / Math.pow(2, .5); };
            this.doUpdate = function (settingsKey, value) {
                ConfKeeper_2.ConfKeeper.setConf(settingsKey, value);
                _this.preview();
            };
            this.preview = function () {
                _this.generate(0, function (data) {
                    var img = $('#' + _this.previewImageId);
                    img.attr("src", data);
                    img.height(BgImage_1.BgImage.height);
                    img.width(_this.getWidthByHeight(BgImage_1.BgImage.height));
                });
            };
            this.generate = function (urlIndex, onDone) {
                var blurByFactor = function (v) { return _this.initialHeight / (nominalHeight / v); };
                var all = _this.app.stage;
                all.removeChildren();
                var url = _this.vars.urls[urlIndex], round = Math.round, sz = _this.size, setting = ConfKeeper_2.ConfKeeper.get;
                var nominalHeight = 1024;
                var BG = function () {
                    var scaleSprite = function (sprite, sc) {
                        var ow = sprite.width;
                        sprite.width *= sc;
                        sprite.x = (ow - sprite.width) / 2;
                        var oh = sprite.height;
                        sprite.height *= sc;
                        sprite.y = (oh - sprite.height) / 2;
                    };
                    var bg = new Sprite(Texture.from(setting('bgPath')));
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
                    if (setting('blur')) {
                        var x2 = setting('blur2');
                        filters.push(new PIXI.filters.BlurFilter(blurByFactor(8) * (x2 ? 3 : 1), 6));
                        scaleSprite(bg, x2 ? 1.1 : 1.05);
                    }
                    if (setting('darken')) {
                        brightness(.5);
                        if (setting('darken2'))
                            brightness(.7);
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
                };
                BG();
                var qrSprite, qrPos;
                var qrSizeRatio = .5, qrSize = round(sz.w * qrSizeRatio), qrSzHalf = qrSize / 2;
                var QR = function () {
                    var qrCanvas = document.getElementById('qr');
                    var qrious = new QRious({
                        element: qrCanvas,
                        value: url,
                        level: 'H',
                        size: 512,
                    });
                    var dataURL = qrCanvas.toDataURL();
                    var qr = qrSprite = new Sprite2d(PIXI.Texture.from(dataURL));
                    qr.anchor.set(.5);
                    qr.visible = false;
                    var pos = qrPos = new Point(sz.w * .5, sz.h * .6);
                    all.addChild(qr);
                    var Q = .2;
                    var D = 1 + (setting('distort') ? Q * 2 : 0);
                    var E = 1 - (setting('distort') ? Q / 2 : 0);
                    var points = [
                        new Point(-E, -1),
                        new Point(E, -1),
                        new Point(D, 1),
                        new Point(-D, 1),
                    ].map(function (p) { return new Point(pos.x + qrSzHalf * p.x, pos.y + qrSzHalf * p.y); });
                    var delay = round(1 / 60), times = 3;
                    for (var i = 0; i < times; ++i)
                        setTimeout(function () {
                            qr.proj.mapSprite(qr, points);
                            qr.visible = true;
                        }, delay);
                    setTimeout(function () {
                        var canv = _this.app.view;
                        onDone(canv.toDataURL('image/jpeg', _this.initialHeight < 1300 ? .75 : .85));
                    }, (delay * (times + 2)) + (_this.firstToDataURL ? 800 : 200));
                    _this.firstToDataURL = false;
                };
                QR();
                var buttonQRCover = function () {
                    var button = new Sprite(Texture.from('assets/pics/physical_button.png'));
                    var bSize = sz.w * .51;
                    button.width = button.height = bSize;
                    button.anchor.set(.5);
                    button.position.set(qrPos.x + qrSize * .0, qrPos.y + qrSize * .6);
                    button.filters = [new GlowFilter(blurByFactor(16), 1, 0, 0x000000, .5)];
                    all.addChild(button);
                };
                buttonQRCover();
                var allTexts = function () {
                };
                if (_this.fontLoader == null)
                    _this.fontLoader = new FontLoader_1.FontLoader();
                _this.fontLoader.init(allTexts);
            };
            this.fontLoader = null;
            this.firstToDataURL = true;
            window.qrGenUpdate = this.doUpdate;
            var height = initialHeight, width = this.getWidthByHeight(initialHeight);
            this.size = { w: width, h: height };
            this.app = new PIXI.Application({
                width: width, height: height,
                backgroundColor: 0xffffff,
                resolution: 1,
                antialias: true,
                preserveDrawingBuffer: true,
                view: document.getElementById('preview-temp')
            });
            $(this.app.view).hide();
            window.previewCanvas = this.app.view;
        }
        return QRGen;
    }());
    exports.QRGen = QRGen;
});
define("Main", ["require", "exports", "UrlVarsParser", "Settings", "BgImage", "QRGen", "ConfKeeper"], function (require, exports, UrlVarsParser_1, Settings_1, BgImage_2, QRGen_1, ConfKeeper_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Main = (function () {
        function Main() {
            var _this = this;
            this.run = function () {
                _this.vars = new UrlVarsParser_1.UrlVarsParser();
                ConfKeeper_3.ConfKeeper.init();
                new Settings_1.Settings();
                new BgImage_2.BgImage(function () {
                    var gen = new QRGen_1.QRGen(_this.vars, 'preview-image', 1024);
                    gen.preview();
                });
            };
            $(document).ready(this.run);
        }
        return Main;
    }());
    new Main();
});
//# sourceMappingURL=bin.js.map