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
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { g as getElementDir } from './dom-084e3cc4.js';
var TEXT = {
    close: "Close"
};
var calciteNoticeCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=s]){--calcite-notice-spacing-token-small:0.75rem;--calcite-notice-spacing-token-large:1rem}:host([scale=s]) slot[name=notice-title]::slotted(*),:host([scale=s]) *::slotted([slot=notice-title]){font-size:0.875rem;line-height:1.5}:host([scale=s]) slot[name=notice-message]::slotted(*),:host([scale=s]) *::slotted([slot=notice-message]){font-size:0.8125rem;line-height:1.5}:host([scale=s]) ::slotted(calcite-link){font-size:0.8125rem;line-height:1.5}:host([scale=m]){--calcite-notice-spacing-token-small:1rem;--calcite-notice-spacing-token-large:1.5rem}:host([scale=m]) slot[name=notice-title]::slotted(*),:host([scale=m]) *::slotted([slot=notice-title]){font-size:0.9375rem;line-height:1.5}:host([scale=m]) slot[name=notice-message]::slotted(*),:host([scale=m]) *::slotted([slot=notice-message]){font-size:0.875rem;line-height:1.5}:host([scale=m]) ::slotted(calcite-link){font-size:0.875rem;line-height:1.5}:host([scale=l]){--calcite-notice-spacing-token-small:1.2rem;--calcite-notice-spacing-token-large:1.875rem}:host([scale=l]) slot[name=notice-title]::slotted(*),:host([scale=l]) *::slotted([slot=notice-title]){font-size:1rem;line-height:1.5}:host([scale=l]) slot[name=notice-message]::slotted(*),:host([scale=l]) *::slotted([slot=notice-message]){font-size:0.9375rem;line-height:1.5}:host([scale=l]) ::slotted(calcite-link){font-size:0.9375rem;line-height:1.5}:host([width=auto]){--calcite-notice-width:auto}:host([width=half]){--calcite-notice-width:50%}:host([width=full]){--calcite-notice-width:100%}:host{display:none;text-align:left;margin:0 auto;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--calcite-notice-width);max-height:0;background-color:var(--calcite-ui-foreground-1);opacity:0;pointer-events:none;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;border-left:0px solid;-webkit-box-shadow:0 0 0 0 transparent;box-shadow:0 0 0 0 transparent}.notice-close{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.notice-close:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host([dir=rtl]){text-align:right;border-left:none;border-right:0px solid}:host([active]){display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;opacity:1;max-height:100%;pointer-events:initial;border-width:3px;-webkit-box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.08);box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.08)}slot[name=notice-title]::slotted(*),*::slotted([slot=notice-title]){color:var(--calcite-ui-text-1);margin:0;font-weight:500}slot[name=notice-message]::slotted(*),*::slotted([slot=notice-message]){display:inline;margin:0;font-weight:400;margin-right:var(--calcite-notice-spacing-token-small);color:var(--calcite-ui-text-2)}:host([dir=rtl]) slot[name=notice-message]::slotted(*),:host([dir=rtl]) *::slotted([slot=notice-message]){margin-right:0;margin-left:var(--calcite-notice-spacing-token-small)}.notice-content{-webkit-box-sizing:border-box;box-sizing:border-box;padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;word-wrap:break-word;padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-small) 0}.notice-content:first-of-type:not(:only-child){padding-left:var(--calcite-notice-spacing-token-large)}.notice-content:only-of-type{padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-large)}:host([dir=rtl]) .notice-content{padding:var(--calcite-notice-spacing-token-small) 0 var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-small)}:host([dir=rtl]) .notice-content:first-of-type:not(:only-child){padding-right:var(--calcite-notice-spacing-token-large)}:host([dir=rtl]) .notice-content:only-of-type{padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-large)}.notice-icon{-webkit-box-sizing:border-box;box-sizing:border-box;padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.notice-close{-webkit-box-sizing:border-box;box-sizing:border-box;padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;-ms-flex-item-align:stretch;align-self:stretch;background-color:transparent;-webkit-appearance:none;border:none;outline:none;cursor:pointer;color:var(--calcite-ui-text-3)}.notice-close:hover,.notice-close:focus{background-color:var(--calcite-ui-foreground-2)}.notice-close:active{background-color:var(--calcite-ui-foreground-3)}:host([color=blue]){border-color:var(--calcite-ui-blue-1)}:host([color=blue]) .notice-icon{color:var(--calcite-ui-blue-1)}:host([color=red]){border-color:var(--calcite-ui-red-1)}:host([color=red]) .notice-icon{color:var(--calcite-ui-red-1)}:host([color=yellow]){border-color:var(--calcite-ui-yellow-1)}:host([color=yellow]) .notice-icon{color:var(--calcite-ui-yellow-1)}:host([color=green]){border-color:var(--calcite-ui-green-1)}:host([color=green]) .notice-icon{color:var(--calcite-ui-green-1)}";
var CalciteNotice = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.calciteNoticeClose = createEvent(this, "calciteNoticeClose", 7);
        this.calciteNoticeOpen = createEvent(this, "calciteNoticeOpen", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //---------------------------------------------------------------------------
        /** Is the notice currently active or not */
        this.active = false;
        /** Color for the notice (will apply to top border and icon) */
        this.color = "blue";
        /** String for the close button. */
        this.intlClose = TEXT.close;
        /** specify the scale of the notice, defaults to m */
        this.scale = "m";
        /** specify the width of the notice, defaults to m */
        this.width = "auto";
        /** Optionally show a button the user can click to dismiss the notice */
        this.dismissible = false;
        /** If false, no icon will be shown in the notice */
        this.icon = false;
        this.iconDefaults = {
            green: "checkCircle",
            yellow: "exclamationMarkTriangle",
            red: "exclamationMarkTriangle",
            blue: "lightbulb",
        };
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
        var scales = ["s", "m", "l"];
        if (!scales.includes(this.scale))
            this.scale = "m";
        var widths = ["auto", "half", "full"];
        if (!widths.includes(this.width))
            this.width = "auto";
    };
    class_1.prototype.componentDidLoad = function () {
        this.noticeLinkEl = this.el.querySelectorAll("calcite-link")[0];
    };
    class_1.prototype.render = function () {
        var _this = this;
        var dir = getElementDir(this.el);
        var closeButton = (h("button", { class: "notice-close", "aria-label": this.intlClose, onClick: function () { return _this.close(); }, ref: function () { return (_this.closeButton); } }, h("calcite-icon", { icon: "x", scale: "m" })));
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
                this.calciteNoticeClose.emit();
                return [2 /*return*/];
            });
        });
    };
    /** open the notice and emit the `calciteNoticeOpen` event - <calcite-notice> listens for this  */
    class_1.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.active = true;
                this.calciteNoticeOpen.emit();
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
        return (h("div", { class: "notice-icon" }, h("calcite-icon", { icon: path, scale: "m" })));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
CalciteNotice.style = calciteNoticeCss;
export { CalciteNotice as calcite_notice };
