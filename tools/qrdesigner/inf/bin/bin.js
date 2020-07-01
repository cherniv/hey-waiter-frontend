define("Stor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Stor = (function () {
        function Stor() {
        }
        Stor.can = function () { return (typeof (Storage) !== "undefined"); };
        Stor.has = function (key) { return Stor.get(key) != null; };
        Stor.get = function (key, def) {
            if (def === void 0) { def = null; }
            var v = localStorage.getItem(key);
            if (!v)
                return def;
            return JSON.parse(v);
        };
        Stor.set = function (key, val) {
            return localStorage.setItem(key, JSON.stringify(val || 'null'));
        };
        return Stor;
    }());
    exports.Stor = Stor;
});
define("Buttons", ["require", "exports", "Stor"], function (require, exports, Stor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Buttons = (function () {
        function Buttons(htmlId) {
            var _this = this;
            this.htmlId = htmlId;
            this.onAddEntry = function (n) {
            };
            this.onReset = function () {
            };
            this.reset = function () {
                var line = prompt("Enter activity names, separated by comma:", "chicken, reject, ok, vibe, close");
                Stor_1.Stor.set("infButtons", line);
                _this.render(line);
                _this.onReset();
            };
            this.colours = [
                "#5f5759",
                "#6f1d1c",
                "#772e61",
                "#00826a",
                "#037700",
                "#775300",
                "#62773b",
            ];
            window.sessAddEntry = function (n) { return _this.onAddEntry(n); };
            window.sessReset = this.reset;
        }
        Buttons.prototype.render = function (namesCommaSep) {
            var _this = this;
            var names = namesCommaSep.split(",").map(function (s) { return s.trim(); });
            var i = 0;
            var html = "<button onclick=\"sessReset();\" style=\"color:#F00\">\u274C &nbsp;RESET</button><br>" +
                "<button onclick=\"sessUndo();\" style=\"color:#aa0\">\u21AA UNDO</button><br><br>" +
                names.filter(function (n) { return !!n; }).map(function (n) {
                    return "<button onclick=\"sessAddEntry('" + _this.colours[i] + "::" + n + "')\">\n                  <i class=\"fa fa-plus-square\"></i><span style=\"color:" + _this.colours[i++] + " \">&nbsp;" + n + "</span></button>\n            ";
                }).join("");
            $("#" + this.htmlId).html(html);
        };
        return Buttons;
    }());
    exports.Buttons = Buttons;
});
define("Counter", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Counter = (function () {
        function Counter() {
        }
        Counter.count = 0;
        Counter.next = function () { return Counter.count++; };
        return Counter;
    }());
    exports.Counter = Counter;
});
define("GeoPos", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GeoPos = (function () {
        function GeoPos() {
            this.roll = function (done) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    var crd = pos.coords;
                    codeLatLng(44.037915, 43.077107, function (loc) {
                        var point = crd.latitude + ", " + crd.longitude;
                        var place = loc.countryCode + ", " + loc.city + ", " + loc.locality;
                        var link = "https://www.google.com/maps/search/" + point + "?hl=en&source=opensearch";
                        console.log(loc);
                        var href = "<a href=\"" + link + "\" onclick=\"return confirm('" + place + "\\nOpen map?')\" target=\"_blank\">" + loc.locality + "</a>";
                        $("#geo-div").html(href);
                        if (done != null)
                            done(href);
                    });
                }, function (err) {
                    alert("ERROR(" + err.code + "):    " + err.message);
                }, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });
            };
            this.roll(null);
        }
        return GeoPos;
    }());
    exports.GeoPos = GeoPos;
    function codeLatLng(lat, lng, done) {
        var link = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + lat + "&longitude=" + lng + "&localityLanguage=en";
        $.ajax({
            url: link,
            success: function (location) {
                done(location);
            }
        });
    }
});
define("Journal", ["require", "exports", "Stor", "GeoPos"], function (require, exports, Stor_2, GeoPos_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Journal = (function () {
        function Journal(htmlId) {
            var _this = this;
            this.htmlId = htmlId;
            this.geo = new GeoPos_1.GeoPos();
            this.applyCont = function (ents) {
                _this.entries = ents;
                _this.renderAll();
                _this.updateCount();
                setTimeout(_this.scrollDown, 100);
                setTimeout(_this.scrollDown, 500);
            };
            this.startSession = function () {
                _this.entries = [];
                _this.addEntry("#000::<b style=\"font-size: 1.2em;\">SESSION START</b><hr>");
            };
            this.undo = function () {
                if (_this.entries.length <= 1) {
                    alert("Nothing to undo");
                    return;
                }
                if (!confirm("Sure?"))
                    return;
                _this.entries.pop();
                _this.renderAll();
                _this.scrollDown();
                _this.save();
            };
            this.now = function () {
                var d = new Date().toString().split(" GMT").shift();
                var a = d.split(' ');
                a.shift();
                var t = a[3].split(':');
                t.pop();
                a[3] = t.join(':');
                return (a.join(' '));
            };
            this.addEntry = function (data) {
                var _a = data.split("::"), color = _a[0], name = _a[1];
                _this.geo.roll(function (geo) {
                    _this.entries.push({
                        name: name,
                        color: color,
                        moment: _this.now(),
                        geo: geo,
                    });
                    _this.renderAll();
                    _this.save();
                });
            };
            this.renderAll = function () {
                _this.obj.html("&nbsp;<br>".repeat(10)
                    + "<b style=\"font-size: 1.4em\">INFIELD&nbsp;JOURNAL</b>&nbsp;v0.9<hr><hr>"
                    + _this.entries.map(function (e) {
                        return "<span style=\"color: " + e.color + "\" class=\"jo\">" + e.geo + " - " + e.moment + " - " + e.name + "</span>";
                    }).join("<br>"));
                _this.updateCount();
            };
            this.save = function () {
                Stor_2.Stor.set("infJourn", _this.entries);
                _this.scrollDown();
            };
            this.scrollDown = function () { return window.scrollTo(0, document.body.scrollHeight); };
            this.updateCount = function () {
                var buttons = Stor_2.Stor.get("infButtons", "").split(",").map(function (s) { return s.trim(); });
                var list = _this.entries.map(function (e) { return e.name; });
                var count = {};
                buttons.forEach(function (n) { return count[n] = 0; });
                list.forEach(function (n) { return count[n]++; });
                var lines = buttons.map(function (n) { return n + ": " + count[n] + " (" + Math.round(count[n] / Math.max(1, list.length - 1) * 100) + "%)"; });
                $("#count-div").html(lines.join("<br>")
                    + ("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total: " + (list.length - 1)));
            };
            var list = Stor_2.Stor.get("infJourn", []);
            this.applyCont(list);
            window.sessUndo = this.undo;
        }
        Object.defineProperty(Journal.prototype, "obj", {
            get: function () {
                return $("#" + this.htmlId);
            },
            enumerable: true,
            configurable: true
        });
        return Journal;
    }());
    exports.Journal = Journal;
});
define("Main", ["require", "exports", "Buttons", "Journal", "Stor"], function (require, exports, Buttons_1, Journal_1, Stor_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Main = (function () {
        function Main() {
            $(document).ready(this.run);
        }
        Main.prototype.run = function () {
            if (!Stor_3.Stor.can())
                alert("Storage is turned off - once the page is refreshed - all data will be lost");
            var jo = this.journal = new Journal_1.Journal("journal-div");
            var b = this.buttons = new Buttons_1.Buttons("buttons-div");
            b.render(Stor_3.Stor.get("infButtons", ""));
            b.onAddEntry = jo.addEntry;
            b.onReset = jo.startSession;
        };
        return Main;
    }());
    new Main();
});
//# sourceMappingURL=bin.js.map