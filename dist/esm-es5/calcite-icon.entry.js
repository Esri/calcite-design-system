var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { e as getAssetPath, r as registerInstance, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { g as getElementDir } from './dom-084e3cc4.js';
var CSS = {
    icon: "icon",
    mirrored: "mirrored"
};
/**
 * Icon data cache.
 * Exported for testing purposes.
 * @private
 */
var iconCache = {};
/**
 * Icon request cache.
 * Exported for testing purposes.
 * @private
 */
var requestCache = {};
var scaleToPx = {
    s: 16,
    m: 24,
    l: 32,
};
function fetchIcon(_a) {
    var icon = _a.icon, scale = _a.scale;
    return __awaiter(this, void 0, void 0, function () {
        var size, name, filled, iconName, id, path;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    size = scaleToPx[scale];
                    name = normalizeIconName(icon);
                    filled = name.charAt(name.length - 1) === "F";
                    iconName = filled ? name.substring(0, name.length - 1) : name;
                    id = "" + iconName + size + (filled ? "F" : "");
                    if (iconCache[id]) {
                        return [2 /*return*/, iconCache[id]];
                    }
                    if (!requestCache[id]) {
                        requestCache[id] = fetch(getAssetPath("./assets/" + id + ".json"))
                            .then(function (resp) { return resp.json(); })
                            .catch(function () {
                            console.error("\"" + id + "\" is not a valid calcite-ui-icon name");
                            return "";
                        });
                    }
                    return [4 /*yield*/, requestCache[id]];
                case 1:
                    path = _b.sent();
                    iconCache[id] = path;
                    return [2 /*return*/, path];
            }
        });
    });
}
/**
 * Normalize the icon name to match the path data module exports.
 * Exported for testing purposes.
 * @private
 */
function normalizeIconName(name) {
    var numberLeadingName = !isNaN(Number(name.charAt(0)));
    var parts = name.split("-");
    if (parts.length === 1) {
        return numberLeadingName ? "i" + name : name;
    }
    return parts
        .map(function (part, index) {
        if (index === 0) {
            return numberLeadingName ? "i" + part.toUpperCase() : part;
        }
        return part.charAt(0).toUpperCase() + part.slice(1);
    })
        .join("");
}
var calciteIconCss = ":host([hidden]){display:none}:host{display:-ms-inline-flexbox;display:inline-flex}.mirrored{-webkit-transform:scaleX(-1);transform:scaleX(-1)}.svg{display:block}";
var CalciteIcon = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * The name of the icon to display. The value of this property must match the icon name from https://esri.github.io/calcite-ui-icons/.
         */
        this.icon = null;
        /**
         * When true, the icon will be mirrored when the element direction is 'rtl'.
         */
        this.mirrored = false;
        /**
         * Icon scale. Can be "s" | "m" | "l".
         */
        this.scale = "m";
        this.visible = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_1.prototype.connectedCallback = function () {
        var _this = this;
        this.waitUntilVisible(function () {
            _this.visible = true;
            _this.loadIconPathData();
        });
    };
    class_1.prototype.disconnectedCallback = function () {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
        }
    };
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.loadIconPathData();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.render = function () {
        var _a;
        var _b = this, el = _b.el, mirrored = _b.mirrored, pathData = _b.pathData, scale = _b.scale, textLabel = _b.textLabel;
        var dir = getElementDir(el);
        var size = scaleToPx[scale];
        var semantic = !!textLabel;
        var paths = [].concat(pathData || "");
        return (h(Host, { "aria-label": semantic ? textLabel : null, role: semantic ? "img" : null }, h("svg", { class: (_a = {},
                _a[CSS.mirrored] = dir === "rtl" && mirrored,
                _a.svg = true,
                _a), xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", height: size, width: size, viewBox: "0 0 " + size + " " + size }, paths.map(function (path) { return typeof path === "string" ? (h("path", { d: path })) : (h("path", { d: path.d, opacity: "opacity" in path ? path.opacity : 1 })); }))));
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    class_1.prototype.loadIconPathData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, icon, scale, visible, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this, icon = _a.icon, scale = _a.scale, visible = _a.visible;
                        if (!icon || !visible) {
                            return [2 /*return*/];
                        }
                        _b = this;
                        return [4 /*yield*/, fetchIcon({ icon: icon, scale: scale })];
                    case 1:
                        _b.pathData = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.waitUntilVisible = function (callback) {
        var _this = this;
        if (typeof window === "undefined" ||
            !window.IntersectionObserver) {
            callback();
            return;
        }
        this.intersectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    _this.intersectionObserver.disconnect();
                    _this.intersectionObserver = null;
                    callback();
                }
            });
        }, { rootMargin: "50px" });
        this.intersectionObserver.observe(this.el);
    };
    Object.defineProperty(class_1, "assetsDirs", {
        get: function () { return ["assets"]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "icon": ["loadIconPathData"],
                "scale": ["loadIconPathData"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
CalciteIcon.style = calciteIconCss;
export { CalciteIcon as calcite_icon };
