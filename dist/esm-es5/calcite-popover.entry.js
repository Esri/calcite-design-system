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
import { h, r as registerInstance, c as createEvent, H as Host, g as getElement } from './core-b5a9209a.js';
import './dom-e9ddd61f.js';
import { P as Popper, g as getPlacement } from './popper-4e0f0ab3.js';
import { x as x16 } from './index-9e37440d.js';
import { g as guid } from './guid-cb609d41.js';
var CSS = {
    container: "container",
    containerOpen: "container--open",
    containerPointer: "container--pointer",
    contentContainer: "content-container",
    imageContainer: "image-container",
    closeButton: "close-button",
    content: "content"
};
var CalciteIcon = function (_a) {
    var path = _a.path, size = _a.size, svgAttributes = _a.svgAttributes, title = _a.title;
    return (h("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: size, width: size, fill: "currentColor", viewBox: "0 0 " + size + " " + size }, svgAttributes), title ? h("title", null, title) : null, h("path", { d: path })));
};
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
         * Adds a click handler to the referenceElement to toggle open the Popover.
         */
        this.addClickHandle = false;
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
         * Makes the popover flow toward the inner of the reference element.
         */
        this.flowInner = false;
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
        /** Select theme (light or dark) */
        this.theme = "light";
        /**
         * Offset the position of the popover in the horizontal direction.
         */
        this.xOffset = 0;
        /**
         * Offset the position of the popover in the vertical direction.
         */
        this.yOffset = 0;
        this._referenceElement = this.getReferenceElement();
        this._boundariesElement = this.getBoundariesElement();
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getId = function () {
            return _this.el.id || "calcite-popover-" + guid();
        };
        this.addReferenceAria = function () {
            var _referenceElement = _this._referenceElement;
            if (_referenceElement &&
                !_referenceElement.hasAttribute("aria-describedby")) {
                _referenceElement.setAttribute("aria-describedby", _this.getId());
            }
        };
        this.clickHandler = function () {
            _this.toggle();
        };
        this.addReferenceListener = function () {
            var _a = _this, _referenceElement = _a._referenceElement, addClickHandle = _a.addClickHandle;
            if (!_referenceElement || !addClickHandle) {
                return;
            }
            _referenceElement.addEventListener("click", _this.clickHandler);
        };
        this.removeReferenceListener = function () {
            var _referenceElement = _this._referenceElement;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.removeEventListener("click", _this.clickHandler);
        };
        this.hide = function () {
            _this.open = false;
        };
        this.calcitePopoverClose = createEvent(this, "calcitePopoverClose", 7);
        this.calcitePopoverOpen = createEvent(this, "calcitePopoverOpen", 7);
    }
    class_1.prototype.interactionElementHandler = function () {
        this.removeReferenceListener();
        this.addReferenceListener();
    };
    class_1.prototype.boundariesElementHandler = function () {
        this._boundariesElement = this.getBoundariesElement();
        this.destroyPopper();
        this.reposition();
    };
    class_1.prototype.openHandler = function (open) {
        if (open) {
            this.reposition();
            this.calcitePopoverOpen.emit();
        }
        else {
            this.destroyPopper();
            this.calcitePopoverClose.emit();
        }
    };
    class_1.prototype.placementHandler = function () {
        this.destroyPopper();
        this.reposition();
    };
    class_1.prototype.referenceElementHandler = function () {
        this.removeReferenceListener();
        this._referenceElement = this.getReferenceElement();
        this.addReferenceListener();
        this.addReferenceAria();
        this.destroyPopper();
        this.reposition();
    };
    class_1.prototype.xOffsetHandler = function () {
        this.destroyPopper();
        this.reposition();
    };
    class_1.prototype.yOffsetHandler = function () {
        this.destroyPopper();
        this.reposition();
    };
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    class_1.prototype.componentDidLoad = function () {
        this.reposition();
        this.addReferenceListener();
        this.addReferenceAria();
    };
    class_1.prototype.componentDidUnload = function () {
        this.removeReferenceListener();
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
    class_1.prototype.toggle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.open = !this.open;
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
    class_1.prototype.getBoundariesElement = function () {
        var boundariesElement = this.boundariesElement;
        return ((typeof boundariesElement === "string"
            ? document.getElementById(boundariesElement)
            : boundariesElement) || null);
    };
    class_1.prototype.getModifiers = function () {
        var verticalRE = /top|bottom/gi;
        var autoRE = /auto/gi;
        var _a = this, _boundariesElement = _a._boundariesElement, disableFlip = _a.disableFlip, flipPlacements = _a.flipPlacements, flowInner = _a.flowInner, placement = _a.placement, xOffset = _a.xOffset, yOffset = _a.yOffset;
        var offsetEnabled = !!(yOffset || xOffset) && !autoRE.test(placement);
        var offsets = [yOffset, xOffset];
        if (verticalRE.test(placement)) {
            offsets.reverse();
        }
        return {
            preventOverflow: {
                enabled: true,
                boundariesElement: _boundariesElement || "viewport",
                escapeWithReference: true
            },
            flip: {
                enabled: !disableFlip,
                boundariesElement: _boundariesElement || "viewport",
                flipVariationsByContent: true,
                behavior: flipPlacements || "flip"
            },
            inner: {
                enabled: flowInner
            },
            offset: {
                enabled: !!offsetEnabled,
                offset: offsets.join(",")
            }
        };
    };
    class_1.prototype.createPopper = function () {
        var _a = this, el = _a.el, open = _a.open, placement = _a.placement, _referenceElement = _a._referenceElement;
        if (!_referenceElement || !open) {
            return;
        }
        var newPopper = new Popper(_referenceElement, el, {
            placement: getPlacement(el, placement),
            modifiers: this.getModifiers()
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
        var _a;
        var _b = this, closeButton = _b.closeButton, textClose = _b.textClose;
        return closeButton ? (h("button", { "aria-label": textClose, title: textClose, class: (_a = {}, _a[CSS.closeButton] = true, _a), onClick: this.hide }, h(CalciteIcon, { size: "16", path: x16 }))) : null;
    };
    class_1.prototype.render = function () {
        var _a;
        var _b = this, _referenceElement = _b._referenceElement, open = _b.open, disablePointer = _b.disablePointer;
        var displayed = _referenceElement && open;
        return (h(Host, { role: "dialog", "aria-hidden": !displayed ? "true" : "false", id: this.getId() }, h("div", { class: (_a = {},
                _a[CSS.container] = true,
                _a[CSS.containerOpen] = displayed,
                _a[CSS.containerPointer] = !disablePointer,
                _a) }, h("div", { class: CSS.contentContainer }, this.renderImage(), h("div", { class: CSS.content }, h("slot", null), this.renderCloseButton())))));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "addClickHandle": ["interactionElementHandler"],
                "boundariesElement": ["boundariesElementHandler"],
                "open": ["openHandler"],
                "placement": ["placementHandler"],
                "referenceElement": ["referenceElementHandler"],
                "xOffset": ["xOffsetHandler"],
                "yOffset": ["yOffsetHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{display:block;position:absolute;z-index:999;top:-999999px;left:-999999px}.container{border-radius:var(--calcite-border-radius);background:var(--calcite-ui-foreground);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.16);box-shadow:0 0 16px 0 rgba(0,0,0,.16);position:relative;visibility:hidden;overflow:hidden}.container--open{visibility:visible}:host([x-out-of-boundaries]) .container{visibility:hidden}.content-container{max-width:350px;overflow:hidden;-ms-flex-direction:column;flex-direction:column;color:var(--calcite-ui-text-1)}.content,.content-container{display:-ms-flexbox;display:flex}.content{-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between;line-height:24px}.close-button{display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;width:40px;height:50px;z-index:1;color:var(--calcite-ui-text-1);padding:16px 12px;border:none;border-radius:0 var(--calcite-border-radius) 0 0;display:block;cursor:pointer}.close-button:hover{background:var(--calcite-ui-foreground-hover)}.close-button:active{background:var(--calcite-ui-foreground-press)}:host([dir=rtl]) .close-button{border-radius:var(--calcite-border-radius) 0 0 0}.image-container{overflow:hidden;max-height:200px;margin:5px}slot[name=image]::slotted(img){height:auto;width:100%;max-height:200px;-o-object-position:50% 50%;object-position:50% 50%;-o-object-fit:cover;object-fit:cover}.container--pointer .content-container:after{position:absolute;content:\"\";font-size:0;line-height:0}:host([x-placement=top-start]) .container--pointer .content-container:after{top:100%;left:5px;width:0;border-top:5px solid var(--calcite-ui-foreground);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=top]) .container--pointer .content-container:after{top:100%;left:50%;margin-left:-5px;width:0;border-top:5px solid var(--calcite-ui-foreground);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=top-end]) .container--pointer .content-container:after{top:100%;right:5px;width:0;border-top:5px solid var(--calcite-ui-foreground);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=right-start]) .container--pointer .content-container:after{right:100%;top:5px;width:0;border-right:5px solid var(--calcite-ui-foreground);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=right]) .container--pointer .content-container:after{right:100%;top:50%;margin-top:-5px;width:0;border-right:5px solid var(--calcite-ui-foreground);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=right-end]) .container--pointer .content-container:after{right:100%;bottom:5px;width:0;border-right:5px solid var(--calcite-ui-foreground);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=bottom-start]) .container--pointer .content-container:after{bottom:100%;left:5px;width:0;border-bottom:5px solid var(--calcite-ui-foreground);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=bottom]) .container--pointer .content-container:after{bottom:100%;left:50%;margin-left:-5px;width:0;border-bottom:5px solid var(--calcite-ui-foreground);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=bottom-end]) .container--pointer .content-container:after{bottom:100%;right:5px;width:0;border-bottom:5px solid var(--calcite-ui-foreground);border-right:5px solid transparent;border-left:5px solid transparent}:host([x-placement=left-start]) .container--pointer .content-container:after{left:100%;top:5px;width:0;border-left:5px solid var(--calcite-ui-foreground);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=left]) .container--pointer .content-container:after{left:100%;top:50%;margin-top:-5px;width:0;border-left:5px solid var(--calcite-ui-foreground);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement=left-end]) .container--pointer .content-container:after{left:100%;bottom:5px;width:0;border-left:5px solid var(--calcite-ui-foreground);border-top:5px solid transparent;border-bottom:5px solid transparent}:host([x-placement*=bottom]) .container--pointer,:host([x-placement*=top]) .container--pointer{margin:5px 0}:host([x-placement*=left]) .container--pointer,:host([x-placement*=right]) .container--pointer{margin:0 5px}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { CalcitePopover as calcite_popover };
