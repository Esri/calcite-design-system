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
import { r as registerInstance, h, H as Host, g as getElement } from './index-d518aa55.js';
import { H as HOST_CSS, b as getDescribedByElement } from './dom-5f44ff8d.js';
import { g as guid } from './guid-ef96c8c4.js';
import { d as defaultOffsetDistance, u as updatePopper, c as createPopper } from './popper-23f7dedb.js';
var CSS = {
    container: "container",
    arrow: "arrow"
};
var TOOLTIP_REFERENCE = "data-calcite-tooltip-reference";
var ARIA_DESCRIBED_BY = "aria-describedby";
var calciteTooltipCss = ":host([hidden]){display:none}:host{display:block;position:absolute;z-index:999;top:-999999px;left:-999999px}:host([aria-hidden=true]){pointer-events:none}:host([aria-hidden=false]){-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16)}.arrow,.arrow::before{position:absolute;width:8px;height:8px;z-index:-1}.arrow::before{content:\"\";-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--calcite-ui-foreground-1)}:host([data-popper-placement^=top])>.arrow{bottom:-4px}:host([data-popper-placement^=bottom])>.arrow{top:-4px}:host([data-popper-placement^=left])>.arrow{right:-4px}:host([data-popper-placement^=right])>.arrow{left:-4px}.container{position:relative;border-radius:var(--calcite-border-radius);background:var(--calcite-ui-foreground-1);max-width:300px;max-height:300px;display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-direction:column;flex-direction:column;font-weight:500;color:var(--calcite-ui-text-1);padding:12px 16px;overflow:hidden;font-size:0.8125rem;line-height:1.5}:host([theme=dark]) .container{background:var(--calcite-ui-foreground-2)}";
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
         * Offset the position of the popover away from the reference element.
         */
        this.offsetDistance = defaultOffsetDistance;
        /**
         * Offset the position of the popover along the reference element.
         */
        this.offsetSkidding = 0;
        /**
         * Display and position the component.
         */
        this.open = false;
        /**
         * Determines where the component will be positioned relative to the referenceElement.
         */
        this.placement = "auto";
        this._referenceElement = this.getReferenceElement();
        this.guid = "calcite-tooltip-" + guid();
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getId = function () {
            return _this.el.id || _this.guid;
        };
        this.addReferences = function () {
            var _referenceElement = _this._referenceElement;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.setAttribute(TOOLTIP_REFERENCE, "");
            if (!_referenceElement.hasAttribute(ARIA_DESCRIBED_BY)) {
                _referenceElement.setAttribute(ARIA_DESCRIBED_BY, _this.getId());
            }
        };
        this.removeReferences = function () {
            var _referenceElement = _this._referenceElement;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.removeAttribute(ARIA_DESCRIBED_BY);
            _referenceElement.removeAttribute(TOOLTIP_REFERENCE);
        };
        this.show = function () {
            _this.open = true;
        };
        this.hide = function () {
            _this.open = false;
        };
    }
    class_1.prototype.offsetDistanceOffsetHandler = function () {
        this.reposition();
    };
    class_1.prototype.offsetSkiddingHandler = function () {
        this.reposition();
    };
    class_1.prototype.openHandler = function (open) {
        if (open) {
            this.createPopper();
        }
        else {
            this.destroyPopper();
        }
    };
    class_1.prototype.placementHandler = function () {
        this.reposition();
    };
    class_1.prototype.referenceElementHandler = function () {
        this.removeReferences();
        this._referenceElement = this.getReferenceElement();
        this.addReferences();
        this.createPopper();
    };
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    class_1.prototype.componentDidLoad = function () {
        this.addReferences();
        this.createPopper();
    };
    class_1.prototype.componentDidUnload = function () {
        this.removeReferences();
        this.destroyPopper();
    };
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.reposition = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, popper, el, placement, modifiers;
            return __generator(this, function (_b) {
                _a = this, popper = _a.popper, el = _a.el, placement = _a.placement;
                modifiers = this.getModifiers();
                popper
                    ? updatePopper({
                        el: el,
                        modifiers: modifiers,
                        placement: placement,
                        popper: popper,
                    })
                    : this.createPopper();
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
        var _a = this, arrowEl = _a.arrowEl, offsetDistance = _a.offsetDistance, offsetSkidding = _a.offsetSkidding;
        var arrowModifier = {
            name: "arrow",
            enabled: true,
            options: {
                element: arrowEl,
            },
        };
        var offsetModifier = {
            name: "offset",
            enabled: true,
            options: {
                offset: [offsetSkidding, offsetDistance],
            },
        };
        return [arrowModifier, offsetModifier];
    };
    class_1.prototype.createPopper = function () {
        this.destroyPopper();
        var _a = this, el = _a.el, open = _a.open, placement = _a.placement, referenceEl = _a._referenceElement;
        var modifiers = this.getModifiers();
        this.popper = createPopper({
            el: el,
            modifiers: modifiers,
            open: open,
            placement: placement,
            referenceEl: referenceEl,
        });
    };
    class_1.prototype.destroyPopper = function () {
        var popper = this.popper;
        if (popper) {
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
        var _this = this;
        var _b = this, _referenceElement = _b._referenceElement, open = _b.open;
        var displayed = _referenceElement && open;
        return (h(Host, { role: "tooltip", class: (_a = {},
                _a[HOST_CSS.hydratedInvisible] = !displayed,
                _a), "aria-hidden": !displayed ? "true" : "false", id: this.getId() }, h("div", { class: CSS.arrow, ref: function (arrowEl) { return (_this.arrowEl = arrowEl); } }), h("div", { class: CSS.container }, h("slot", null))));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "offsetDistance": ["offsetDistanceOffsetHandler"],
                "offsetSkidding": ["offsetSkiddingHandler"],
                "open": ["openHandler"],
                "placement": ["placementHandler"],
                "referenceElement": ["referenceElementHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
CalciteTooltip.style = calciteTooltipCss;
var CalciteTooltipManager = /** @class */ (function () {
    function CalciteTooltipManager(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * CSS Selector to match reference elements for tooltips.
         */
        this.selector = "[" + TOOLTIP_REFERENCE + "]";
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.toggle = function (event, value) {
            if (value === void 0) { value = true; }
            var target = event.target;
            var describedByElement = target && target.matches(_this.selector) && getDescribedByElement(target);
            if (describedByElement) {
                describedByElement.open = value;
            }
        };
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    CalciteTooltipManager.prototype.render = function () {
        return h(Host, null);
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    CalciteTooltipManager.prototype.mouseEnterShow = function (event) {
        this.toggle(event, true);
    };
    CalciteTooltipManager.prototype.mouseLeaveHide = function (event) {
        this.toggle(event, false);
    };
    CalciteTooltipManager.prototype.focusShow = function (event) {
        this.toggle(event, true);
    };
    CalciteTooltipManager.prototype.blurHide = function (event) {
        this.toggle(event, false);
    };
    return CalciteTooltipManager;
}());
export { CalciteTooltip as calcite_tooltip, CalciteTooltipManager as calcite_tooltip_manager };
