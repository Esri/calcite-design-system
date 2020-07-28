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
import { r as registerInstance, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { g as getElementDir } from './dom-084e3cc4.js';
var calciteLinkCss = ":host([hidden]){display:none}:host{display:inline;--calcite-blue-accessible:#00619b;--calcite-red-accessible:#a82b1e;--calcite-link-blue-underline:rgba(0, 97, 155, 0.4);--calcite-link-red-underline:rgba(168, 43, 30, 0.4)}:host([theme=dark]){--calcite-blue-accessible:#00A0FF;--calcite-red-accessible:#FE583E;--calcite-link-blue-underline:rgba(0, 160, 255, 0.4);--calcite-link-red-underline:rgba(254, 88, 62, 0.4)}:host a,:host span{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;text-decoration:none;border-radius:0;border:none;line-height:inherit;font-size:inherit;font-family:inherit;-webkit-appearance:none;cursor:pointer;text-align:center;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host a:hover,:host span:hover{text-decoration:none}:host a,:host span{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host a:focus,:host span:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.calcite-link--icon{-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([disabled]){pointer-events:none}:host([disabled]) span,:host([disabled]) a{pointer-events:none;opacity:0.4}:host .calcite-link--icon.icon-start{margin-right:0.5rem}:host([dir=rtl]) .calcite-link--icon.icon-start{margin-right:0;margin-left:0.5rem}:host .calcite-link--icon.icon-end{margin-left:0.5rem}:host([dir=rtl]) .calcite-link--icon.icon-end{margin-left:0;margin-right:0.5rem}:host([color=blue]) span,:host([color=blue]) a{display:inline;padding:0;border:none;color:var(--calcite-blue-accessible);line-height:inherit;white-space:initial;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear, left top, left bottom, from(currentColor), to(currentColor)), -webkit-gradient(linear, left top, left bottom, from(var(--calcite-link-blue-underline)), to(var(--calcite-link-blue-underline)));background-image:linear-gradient(currentColor, currentColor), linear-gradient(var(--calcite-link-blue-underline), var(--calcite-link-blue-underline));background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;-webkit-transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host([color=blue]) span:hover,:host([color=blue]) span:focus,:host([color=blue]) a:hover,:host([color=blue]) a:focus{color:var(--calcite-ui-blue-1);background-size:100% 1px, 100% 1px}:host([color=blue]) span:hover .calcite-link--icon,:host([color=blue]) span:focus .calcite-link--icon,:host([color=blue]) a:hover .calcite-link--icon,:host([color=blue]) a:focus .calcite-link--icon{fill:var(--calcite-ui-blue-1)}:host([color=blue]) span:active,:host([color=blue]) a:active{color:var(--calcite-blue-accessible);background-size:100% 2px, 100% 2px}:host([color=red]) span,:host([color=red]) a{display:inline;padding:0;border:none;color:var(--calcite-red-accessible);line-height:inherit;white-space:initial;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear, left top, left bottom, from(currentColor), to(currentColor)), -webkit-gradient(linear, left top, left bottom, from(var(--calcite-link-red-underline)), to(var(--calcite-link-red-underline)));background-image:linear-gradient(currentColor, currentColor), linear-gradient(var(--calcite-link-red-underline), var(--calcite-link-red-underline));background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;-webkit-transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host([color=red]) span:hover,:host([color=red]) span:focus,:host([color=red]) a:hover,:host([color=red]) a:focus{color:var(--calcite-ui-red-1);background-size:100% 1px, 100% 1px}:host([color=red]) span:hover .calcite-link--icon,:host([color=red]) span:focus .calcite-link--icon,:host([color=red]) a:hover .calcite-link--icon,:host([color=red]) a:focus .calcite-link--icon{fill:var(--calcite-ui-red-1)}:host([color=red]) span:active,:host([color=red]) a:active{color:var(--calcite-red-accessible);background-size:100% 2px, 100% 2px}:host([color=light]) span,:host([color=light]) a{display:inline;padding:0;border:none;color:#f3f3f3;line-height:inherit;white-space:initial;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear, left top, left bottom, from(currentColor), to(currentColor)), -webkit-gradient(linear, left top, left bottom, from(#aaaaaa), to(#aaaaaa));background-image:linear-gradient(currentColor, currentColor), linear-gradient(#aaaaaa, #aaaaaa);background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;-webkit-transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host([color=light]) span:hover,:host([color=light]) span:focus,:host([color=light]) a:hover,:host([color=light]) a:focus{color:#ffffff;background-size:100% 1px, 100% 1px}:host([color=light]) span:hover .calcite-link--icon,:host([color=light]) span:focus .calcite-link--icon,:host([color=light]) a:hover .calcite-link--icon,:host([color=light]) a:focus .calcite-link--icon{fill:#ffffff}:host([color=light]) span:active,:host([color=light]) a:active{color:#f3f3f3;background-size:100% 2px, 100% 2px}:host([color=dark]) span,:host([color=dark]) a{display:inline;padding:0;border:none;color:#2b2b2b;line-height:inherit;white-space:initial;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear, left top, left bottom, from(currentColor), to(currentColor)), -webkit-gradient(linear, left top, left bottom, from(#808080), to(#808080));background-image:linear-gradient(currentColor, currentColor), linear-gradient(#808080, #808080);background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;-webkit-transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host([color=dark]) span:hover,:host([color=dark]) span:focus,:host([color=dark]) a:hover,:host([color=dark]) a:focus{color:#404040;background-size:100% 1px, 100% 1px}:host([color=dark]) span:hover .calcite-link--icon,:host([color=dark]) span:focus .calcite-link--icon,:host([color=dark]) a:hover .calcite-link--icon,:host([color=dark]) a:focus .calcite-link--icon{fill:#404040}:host([color=dark]) span:active,:host([color=dark]) a:active{color:#2b2b2b;background-size:100% 2px, 100% 2px}:host([dir=rtl]) span,:host([dir=rtl]) a{background-position:100% 100%, 100% 100%}";
var CalciteLink = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** specify the color of the link, defaults to blue */
        this.color = "blue";
        /** the node type of the rendered child element */
        this.childElType = "span";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_1.prototype.connectedCallback = function () {
        // prop validations
        var color = ["blue", "red", "dark", "light"];
        if (!color.includes(this.color))
            this.color = "blue";
        this.childElType = this.href ? "a" : "span";
    };
    class_1.prototype.render = function () {
        var _this = this;
        var dir = getElementDir(this.el);
        var attributes = this.getAttributes();
        var Tag = this.childElType;
        var role = this.childElType === "span" ? "link" : null;
        var tabIndex = this.disabled
            ? -1
            : this.childElType === "span"
                ? 0
                : null;
        var iconStartEl = (h("calcite-icon", { class: "calcite-link--icon icon-start", icon: this.iconStart, scale: "s" }));
        var iconEndEl = (h("calcite-icon", { class: "calcite-link--icon icon-end", icon: this.iconEnd, scale: "s" }));
        return (h(Host, { dir: dir }, h(Tag, Object.assign({}, attributes, { role: role, tabIndex: tabIndex, ref: function (el) { return (_this.childEl = el); } }), this.iconStart ? iconStartEl : null, h("slot", null), this.iconEnd ? iconEndEl : null)));
    };
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    class_1.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.childEl.focus();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.getAttributes = function () {
        // spread attributes from the component to rendered child, filtering out props
        var props = ["color", "dir", "icon", "iconPosition", "id", "theme"];
        return Array.from(this.el.attributes)
            .filter(function (a) { return a && !props.includes(a.name); })
            .reduce(function (acc, _a) {
            var _b;
            var name = _a.name, value = _a.value;
            return (Object.assign(Object.assign({}, acc), (_b = {}, _b[name] = value, _b)));
        }, {});
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
CalciteLink.style = calciteLinkCss;
export { CalciteLink as calcite_link };
