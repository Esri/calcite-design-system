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
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './core-30c05663.js';
import { g as getElementDir } from './dom-0361c8d2.js';
var CalciteNotice = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //---------------------------------------------------------------------------
        /** Is the notice currently active or not */
        this.active = false;
        /** Color for the notice (will apply to top border and icon) */
        this.color = "blue";
        /** Select theme (light or dark) */
        this.theme = "light";
        /** specify the scale of the notice, defaults to m */
        this.scale = "m";
        /** specify the scale of the button, defaults to m */
        this.width = "auto";
        /** Select theme (light or dark) */
        this.dismissible = false;
        /** If false, no icon will be shown in the notice */
        this.icon = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** Unique ID for this notice */
        this.noticeId = this.el.id;
        this.iconDefaults = {
            green: "checkCircle",
            yellow: "exclamationMarkTriangle",
            red: "exclamationMarkTriangle",
            blue: "lightbulb"
        };
        this.calciteNoticeClose = createEvent(this, "calciteNoticeClose", 7);
        this.calciteNoticeOpen = createEvent(this, "calciteNoticeOpen", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_1.prototype.connectedCallback = function () {
        // prop validations
        var colors = ["blue", "red", "green", "yellow"];
        if (!colors.includes(this.color))
            this.color = "blue";
        var themes = ["dark", "light"];
        if (!themes.includes(this.theme))
            this.theme = "light";
        var scales = ["s", "m", "l"];
        if (!scales.includes(this.scale))
            this.scale = "m";
        var widths = ["auto", "half", "full"];
        if (!widths.includes(this.width))
            this.width = "auto";
    };
    class_1.prototype.componentDidLoad = function () {
        this.noticeLinkEl = this.el.querySelectorAll("calcite-button")[0];
    };
    class_1.prototype.render = function () {
        var _this = this;
        var dir = getElementDir(this.el);
        var closeButton = (h("button", { class: "notice-close", "aria-label": "close", onClick: function () { return _this.close(); }, ref: function (el) { return (_this.closeButton = el); } }, h("calcite-icon", { icon: "x", scale: "s" })));
        return (h(Host, { active: this.active, dir: dir }, this.icon ? this.setIcon() : null, h("div", { class: "notice-content" }, h("slot", { name: "notice-title" }), h("slot", { name: "notice-message" }), h("slot", { name: "notice-link" })), this.dismissible ? closeButton : null));
    };
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** close the notice emit the `calciteNoticeClose` event - <calcite-notice> listens for this */
    class_1.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.active = false;
                this.calciteNoticeClose.emit({ requestedNotice: this.noticeId });
                return [2 /*return*/];
            });
        });
    };
    /** open the notice and emit the `calciteNoticeOpen` event - <calcite-notice> listens for this  */
    class_1.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.active = true;
                this.calciteNoticeOpen.emit({ requestedNotice: this.noticeId });
                return [2 /*return*/];
            });
        });
    };
    /** focus the close button, if present and requested */
    class_1.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.closeButton && !this.noticeLinkEl) {
                    return [2 /*return*/];
                }
                if (this.noticeLinkEl)
                    this.noticeLinkEl.setFocus();
                else if (this.closeButton) {
                    this.closeButton.focus();
                }
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.setIcon = function () {
        var path = this.iconDefaults[this.color];
        return (h("div", { class: "notice-icon" }, h("calcite-icon", { icon: path, filled: true, scale: "s" })));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host([scale=s]){--calcite-notice-spacing-token-small:0.75rem;--calcite-notice-spacing-token-large:1rem}:host([scale=s]) div::slotted([slot=notice-title]),:host([scale=s]) slot[name=notice-title]::slotted(div){font-size:.875rem;line-height:1.5}:host([scale=s]) ::slotted(calcite-button),:host([scale=s]) div::slotted([slot=notice-message]),:host([scale=s]) slot[name=notice-message]::slotted(div){font-size:.8125rem;line-height:1.5}:host([scale=m]){--calcite-notice-spacing-token-small:1rem;--calcite-notice-spacing-token-large:1.5rem}:host([scale=m]) div::slotted([slot=notice-title]),:host([scale=m]) slot[name=notice-title]::slotted(div){font-size:.9375rem;line-height:1.5}:host([scale=m]) ::slotted(calcite-button),:host([scale=m]) div::slotted([slot=notice-message]),:host([scale=m]) slot[name=notice-message]::slotted(div){font-size:.875rem;line-height:1.5}:host([scale=l]){--calcite-notice-spacing-token-small:1.2rem;--calcite-notice-spacing-token-large:1.875rem}:host([scale=l]) div::slotted([slot=notice-title]),:host([scale=l]) slot[name=notice-title]::slotted(div){font-size:1rem;line-height:1.5}:host([scale=l]) ::slotted(calcite-button),:host([scale=l]) div::slotted([slot=notice-message]),:host([scale=l]) slot[name=notice-message]::slotted(div){font-size:.9375rem;line-height:1.5}:host([width=auto]){--calcite-notice-width:auto}:host([width=half]){--calcite-notice-width:50%}:host([width=full]){--calcite-notice-width:100%}:host{display:none;text-align:left;margin:0 auto;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--calcite-notice-width);max-height:0;background-color:var(--calcite-ui-foreground);opacity:0;pointer-events:none;-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out;border-left:0 solid;-webkit-box-shadow:0 0 0 0 transparent;box-shadow:0 0 0 0 transparent}:host([dir=rtl]){text-align:right;border-left:none;border-right:0 solid}:host([active]){display:-ms-inline-flexbox;display:inline-flex;opacity:1;max-height:100%;pointer-events:auto;border-width:3px;-webkit-box-shadow:0 0 8px 0 rgba(0,0,0,.08);box-shadow:0 0 8px 0 rgba(0,0,0,.08)}div::slotted([slot=notice-title]),slot[name=notice-title]::slotted(div){color:var(--calcite-ui-text-1);font-weight:500}div::slotted([slot=notice-message]),slot[name=notice-message]::slotted(div){display:inline;margin-right:var(--calcite-notice-spacing-token-small);color:var(--calcite-ui-text-2)}:host([dir=rtl]) div::slotted([slot=notice-message]),:host([dir=rtl]) slot[name=notice-message]::slotted(div){margin-right:unset;margin-left:var(--calcite-notice-spacing-token-small)}.notice-content{-webkit-box-sizing:border-box;box-sizing:border-box;padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;word-wrap:break-word;padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-small) 0}.notice-content:first-of-type:not(:only-child){padding-left:var(--calcite-notice-spacing-token-large)}.notice-content:only-child{padding:var(--calcite-notice-spacing-token-small)}:host([dir=rtl]) .notice-content{padding:var(--calcite-notice-spacing-token-small) 0 var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-small)}:host([dir=rtl]) .notice-content:first-of-type:not(:only-child){padding-right:var(--calcite-notice-spacing-token-large)}.notice-icon{-ms-flex:0 0 auto;flex:0 0 auto;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.notice-close,.notice-icon{-webkit-box-sizing:border-box;box-sizing:border-box;padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-large);-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}.notice-close{-ms-flex:0 0 auto;flex:0 0 auto;background-color:transparent;-webkit-appearance:none;border:none;outline:none;cursor:pointer;color:var(--calcite-ui-text-3)}.notice-close:focus,.notice-close:hover{background-color:var(--calcite-ui-foreground-hover)}.notice-close:active{background-color:var(--calcite-ui-foreground-press)}:host([color=blue]){border-color:var(--calcite-ui-blue)}:host([color=blue]) .notice-icon{color:var(--calcite-ui-blue)}:host([color=red]){border-color:var(--calcite-ui-red)}:host([color=red]) .notice-icon{color:var(--calcite-ui-red)}:host([color=yellow]){border-color:var(--calcite-ui-yellow)}:host([color=yellow]) .notice-icon{color:var(--calcite-ui-yellow)}:host([color=green]){border-color:var(--calcite-ui-green)}:host([color=green]) .notice-icon{color:var(--calcite-ui-green)}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { CalciteNotice as calcite_notice };
