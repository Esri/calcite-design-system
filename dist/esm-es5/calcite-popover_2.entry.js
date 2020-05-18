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
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-d518aa55.js';
import { H as HOST_CSS, b as getDescribedByElement } from './dom-5f44ff8d.js';
import { g as guid } from './guid-ef96c8c4.js';
import { d as defaultOffsetDistance, u as updatePopper, c as createPopper } from './popper-23f7dedb.js';
var CSS = {
    container: "container",
    arrow: "arrow",
    imageContainer: "image-container",
    closeButton: "close-button",
    content: "content"
};
var POPOVER_REFERENCE = "data-calcite-tooltip-reference";
var ARIA_DESCRIBED_BY = "aria-describedby";
var calcitePopoverCss = ":host([hidden]){display:none}:host{display:block;position:absolute;z-index:999;top:-999999px;left:-999999px}:host([aria-hidden=true]){pointer-events:none}:host([aria-hidden=false]){-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16)}.arrow,.arrow::before{position:absolute;width:8px;height:8px;z-index:-1}.arrow::before{content:\"\";-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--calcite-ui-foreground-1)}:host([data-popper-placement^=top])>.arrow{bottom:-4px}:host([data-popper-placement^=bottom])>.arrow{top:-4px}:host([data-popper-placement^=left])>.arrow{right:-4px}:host([data-popper-placement^=right])>.arrow{left:-4px}.container{border-radius:var(--calcite-border-radius);background:var(--calcite-ui-foreground-1);position:relative;display:-ms-flexbox;display:flex;max-width:350px;overflow:hidden;-ms-flex-direction:column;flex-direction:column;color:var(--calcite-ui-text-1)}.content{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:start;align-items:flex-start;line-height:24px}.close-button{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.close-button:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.close-button{display:block;-ms-flex:0 0 auto;flex:0 0 auto;padding:12px;border:none;border-radius:0 var(--calcite-border-radius) 0 0;color:var(--calcite-ui-text-1);cursor:pointer;background:var(--calcite-ui-foreground-1);z-index:1}.close-button:hover{background:var(--calcite-ui-foreground-2)}.close-button:active{background:var(--calcite-ui-foreground-3)}:host-context([dir=rtl]) .close-button{border-radius:var(--calcite-border-radius) 0 0 0}.image-container{overflow:hidden;max-height:200px;margin:5px}slot[name=image]::slotted(img){height:auto;width:100%;max-height:200px;-o-object-position:50% 50%;object-position:50% 50%;-o-object-fit:cover;object-fit:cover}";
var CalcitePopover = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Display a close button within the Popover.
         */
        this.closeButton = false;
        /**
         * Prevents flipping the popover's placement when it starts to overlap its reference element.
         */
        this.disableFlip = false;
        /**
         * Removes the caret pointer.
         */
        this.disablePointer = false;
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
        /** Text for close button. */
        this.textClose = "Close";
        this._referenceElement = this.getReferenceElement();
        this.guid = "calcite-popover-" + guid();
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
            _referenceElement.setAttribute(POPOVER_REFERENCE, "");
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
            _referenceElement.removeAttribute(POPOVER_REFERENCE);
        };
        this.hide = function () {
            _this.open = false;
        };
        this.calcitePopoverClose = createEvent(this, "calcitePopoverClose", 7);
        this.calcitePopoverOpen = createEvent(this, "calcitePopoverOpen", 7);
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
            this.calcitePopoverOpen.emit();
        }
        else {
            this.destroyPopper();
            this.calcitePopoverClose.emit();
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
        this.createPopper();
        this.addReferences();
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
            var _c, popper, el, placement, modifiers;
            return __generator(this, function (_d) {
                _c = this, popper = _c.popper, el = _c.el, placement = _c.placement;
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
    class_1.prototype.setFocus = function (focusId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                if (focusId === "close-button") {
                    (_a = this.closeButtonEl) === null || _a === void 0 ? void 0 : _a.focus();
                    return [2 /*return*/];
                }
                (_b = this.el) === null || _b === void 0 ? void 0 : _b.focus();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.toggle = function (value) {
        if (value === void 0) { value = !this.open; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                this.open = value;
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
        var _c = this, arrowEl = _c.arrowEl, flipPlacements = _c.flipPlacements, disableFlip = _c.disableFlip, disablePointer = _c.disablePointer, offsetDistance = _c.offsetDistance, offsetSkidding = _c.offsetSkidding;
        var flipModifier = {
            name: "flip",
            enabled: !disableFlip,
        };
        if (flipPlacements) {
            flipModifier.options = {
                fallbackPlacements: flipPlacements,
            };
        }
        var arrowModifier = {
            name: "arrow",
            enabled: !disablePointer,
        };
        if (arrowEl) {
            arrowModifier.options = {
                element: arrowEl,
            };
        }
        var offsetModifier = {
            name: "offset",
            enabled: true,
            options: {
                offset: [offsetSkidding, offsetDistance],
            },
        };
        return [arrowModifier, flipModifier, offsetModifier];
    };
    class_1.prototype.createPopper = function () {
        this.destroyPopper();
        var _c = this, el = _c.el, open = _c.open, placement = _c.placement, referenceEl = _c._referenceElement;
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
    class_1.prototype.renderImage = function () {
        return this.el.querySelector("[slot=image]") ? (h("div", { class: CSS.imageContainer }, h("slot", { name: "image" }))) : null;
    };
    class_1.prototype.renderCloseButton = function () {
        var _c;
        var _this = this;
        var _d = this, closeButton = _d.closeButton, textClose = _d.textClose;
        return closeButton ? (h("button", { ref: function (closeButtonEl) { return (_this.closeButtonEl = closeButtonEl); }, "aria-label": textClose, title: textClose, class: (_c = {}, _c[CSS.closeButton] = true, _c), onClick: this.hide }, h("calcite-icon", { icon: "x", scale: "m" }))) : null;
    };
    class_1.prototype.render = function () {
        var _c;
        var _this = this;
        var _d = this, _referenceElement = _d._referenceElement, open = _d.open, disablePointer = _d.disablePointer;
        var displayed = _referenceElement && open;
        var arrowNode = !disablePointer ? (h("div", { class: CSS.arrow, ref: function (arrowEl) { return (_this.arrowEl = arrowEl); } })) : null;
        return (h(Host, { role: "dialog", class: (_c = {},
                _c[HOST_CSS.hydratedInvisible] = !displayed,
                _c), "aria-hidden": !displayed ? "true" : "false", id: this.getId() }, arrowNode, h("div", { class: CSS.container }, this.renderImage(), h("div", { class: CSS.content }, h("slot", null), this.renderCloseButton()))));
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
CalcitePopover.style = calcitePopoverCss;
var CalcitePopoverManager = /** @class */ (function () {
    function CalcitePopoverManager(hostRef) {
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * CSS Selector to match reference elements for popovers.
         */
        this.selector = "[" + POPOVER_REFERENCE + "]";
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    CalcitePopoverManager.prototype.render = function () {
        return h(Host, null);
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    CalcitePopoverManager.prototype.closeOpenPopovers = function (event) {
        var target = event.target;
        var _c = this, autoClose = _c.autoClose, el = _c.el, selector = _c.selector;
        var popoverSelector = "calcite-popover";
        var isTargetInsidePopover = target.closest(popoverSelector);
        var describedByElement = target && target.matches(selector) && getDescribedByElement(target);
        if (autoClose && !isTargetInsidePopover) {
            Array.from(document.body.querySelectorAll(popoverSelector))
                .filter(function (popover) { return popover.open && popover !== describedByElement; })
                .forEach(function (popover) { return popover.toggle(false); });
        }
        if (!el.contains(target)) {
            return;
        }
        if (describedByElement) {
            describedByElement.toggle();
        }
    };
    Object.defineProperty(CalcitePopoverManager.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return CalcitePopoverManager;
}());
export { CalcitePopover as calcite_popover, CalcitePopoverManager as calcite_popover_manager };
