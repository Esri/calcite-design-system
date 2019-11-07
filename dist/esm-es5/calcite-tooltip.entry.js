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
import { r as registerInstance, h, H as Host, g as getElement } from './core-2154eb68.js';
import './dom-e9ddd61f.js';
import { P as Popper, g as getPlacement } from './popper-3a1c87c6.js';
import { g as guid } from './guid-cb609d41.js';
var CSS = {
    container: "tooltip-container",
    containerOpen: "tooltip-container--open",
    contentContainer: "tooltip-content-container"
};
var CalciteTooltip = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Display and position the component.
         */
        this.open = false;
        /**
         * Determines where the component will be positioned relative to the referenceElement.
         */
        this.placement = "auto";
        /** Select theme (light or dark) */
        this.theme = "light";
        this._referenceElement = this.getReferenceElement();
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getId = function () {
            return _this.el.id || "calcite-tooltip-" + guid();
        };
        this.addReferenceAria = function () {
            var _referenceElement = _this._referenceElement;
            if (_referenceElement &&
                !_referenceElement.hasAttribute("aria-describedby")) {
                _referenceElement.setAttribute("aria-describedby", _this.getId());
            }
        };
        this.addReferenceListeners = function () {
            var _referenceElement = _this._referenceElement;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.addEventListener("mouseenter", _this.show);
            _referenceElement.addEventListener("mouseleave", _this.hide);
            _referenceElement.addEventListener("focus", _this.show);
            _referenceElement.addEventListener("blur", _this.hide);
        };
        this.removeReferenceListeners = function () {
            var _referenceElement = _this._referenceElement;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.removeEventListener("mouseenter", _this.show);
            _referenceElement.removeEventListener("mouseleave", _this.hide);
            _referenceElement.removeEventListener("focus", _this.show);
            _referenceElement.removeEventListener("blur", _this.hide);
        };
        this.show = function () {
            _this.open = true;
        };
        this.hide = function () {
            _this.open = false;
        };
    }
    class_1.prototype.openHandler = function (open) {
        if (open) {
            this.reposition();
        }
        else {
            this.destroyPopper();
        }
    };
    class_1.prototype.placementHandler = function () {
        this.reposition();
    };
    class_1.prototype.referenceElementHandler = function () {
        this.removeReferenceListeners();
        this._referenceElement = this.getReferenceElement();
        this.addReferenceListeners();
        this.addReferenceAria();
        this.destroyPopper();
        this.reposition();
    };
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    class_1.prototype.componentDidLoad = function () {
        this.addReferenceListeners();
        this.addReferenceAria();
        this.reposition();
    };
    class_1.prototype.componentDidUnload = function () {
        this.removeReferenceListeners();
        this.destroyPopper();
    };
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.reposition = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popper;
            return __generator(this, function (_a) {
                popper = this.popper;
                popper ? this.updatePopper(popper) : this.createPopper();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.getReferenceElement = function () {
        var referenceElement = this.referenceElement;
        return ((typeof referenceElement === "string"
            ? document.getElementById(referenceElement)
            : referenceElement) || null);
    };
    class_1.prototype.getModifiers = function () {
        return {
            preventOverflow: {
                enabled: false
            },
            hide: {
                enabled: false
            }
        };
    };
    class_1.prototype.createPopper = function () {
        var _a = this, _referenceElement = _a._referenceElement, el = _a.el, open = _a.open, placement = _a.placement;
        if (!_referenceElement || !open) {
            return;
        }
        var newPopper = new Popper(_referenceElement, el, {
            eventsEnabled: false,
            placement: getPlacement(el, placement),
            modifiers: this.getModifiers()
        });
        window.addEventListener("resize", newPopper.scheduleUpdate, {
            passive: true
        });
        this.popper = newPopper;
    };
    class_1.prototype.updatePopper = function (popper) {
        popper.options.placement = getPlacement(this.el, this.placement);
        popper.options.modifiers = Object.assign(Object.assign({}, popper.options.modifiers), this.getModifiers());
        popper.scheduleUpdate();
    };
    class_1.prototype.destroyPopper = function () {
        var popper = this.popper;
        if (popper) {
            window.removeEventListener("resize", popper.scheduleUpdate);
            popper.destroy();
        }
        this.popper = null;
    };
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.render = function () {
        var _a;
        var _b = this, _referenceElement = _b._referenceElement, open = _b.open;
        var displayed = _referenceElement && open;
        return (h(Host, { role: "tooltip", "aria-hidden": !displayed ? "true" : "false", id: this.getId() }, h("div", { class: (_a = {},
                _a[CSS.container] = true,
                _a[CSS.containerOpen] = displayed,
                _a) }, h("div", { class: CSS.contentContainer }, h("slot", null)))));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "open": ["openHandler"],
                "placement": ["placementHandler"],
                "referenceElement": ["referenceElementHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ":root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}:host([theme=dark]){--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{--calcite-tooltip-primary-text:#151515;--calcite-tooltip-background:#fff;display:block;position:absolute;z-index:999;top:-999999px;left:-999999px}:host([theme=dark]){--calcite-tooltip-primary-text:#fff;--calcite-tooltip-background:#2b2b2b}.tooltip-container{visibility:hidden;position:relative;-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15)}.tooltip-container--open{visibility:visible}.tooltip-content-container{background:var(--calcite-tooltip-background);max-width:300px;max-height:300px;display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-direction:column;flex-direction:column;font-weight:500;color:var(--calcite-tooltip-primary-text);padding:12px 16px;font-size:.8125rem;line-height:1.5}:host{--calcite-popper-background:#fff}:host([theme=dark]){--calcite-popper-background:#2b2b2b}.tooltip-content-container:after{position:absolute;content:\"\";font-size:0;line-height:0}:host([x-placement=top-start]) .tooltip-content-container:after{left:5px}:host([x-placement=top-start]) .tooltip-content-container:after,:host([x-placement=top]) .tooltip-content-container:after{top:100%;width:0;border-top:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=top]) .tooltip-content-container:after{left:50%;margin-left:-5px}:host([x-placement=top-end]) .tooltip-content-container:after{top:100%;right:5px;width:0;border-top:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=right-start]) .tooltip-content-container:after{top:5px}:host([x-placement=right-start]) .tooltip-content-container:after,:host([x-placement=right]) .tooltip-content-container:after{right:100%;width:0;border-right:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=right]) .tooltip-content-container:after{top:50%;margin-top:-5px}:host([x-placement=right-end]) .tooltip-content-container:after{right:100%;bottom:5px;width:0;border-right:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=bottom-start]) .tooltip-content-container:after{left:5px}:host([x-placement=bottom-start]) .tooltip-content-container:after,:host([x-placement=bottom]) .tooltip-content-container:after{bottom:100%;width:0;border-bottom:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=bottom]) .tooltip-content-container:after{left:50%;margin-left:-5px}:host([x-placement=bottom-end]) .tooltip-content-container:after{bottom:100%;right:5px;width:0;border-bottom:5px solid var(--calcite-popper-background);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=left-start]) .tooltip-content-container:after{top:5px}:host([x-placement=left-start]) .tooltip-content-container:after,:host([x-placement=left]) .tooltip-content-container:after{left:100%;width:0;border-left:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=left]) .tooltip-content-container:after{top:50%;margin-top:-5px}:host([x-placement=left-end]) .tooltip-content-container:after{left:100%;bottom:5px;width:0;border-left:5px solid var(--calcite-popper-background);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement*=bottom]) .tooltip-container,:host([x-placement*=top]) .tooltip-container{margin:5px 0}:host([x-placement*=left]) .tooltip-container,:host([x-placement*=right]) .tooltip-container{margin:0 5px}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { CalciteTooltip as calcite_tooltip };
