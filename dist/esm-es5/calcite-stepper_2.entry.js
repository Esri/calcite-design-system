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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { g as getElementDir, a as getElementProp } from './dom-084e3cc4.js';
import { g as getKey } from './key-3b974aad.js';
var calciteStepperCss = ":host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:stretch;align-items:stretch;width:100%;min-width:100%}:host([layout=vertical]){-ms-flex-direction:column;flex-direction:column;-ms-flex:1 auto auto;flex:1 auto auto}:host .stepper-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:wrap;flex-wrap:wrap;width:100%;min-width:100%}";
var CalciteStepper = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.calciteStepperItemChange = createEvent(this, "calciteStepperItemChange", 7);
        /** specify the scale of stepper, defaults to m */
        this.scale = "m";
        /** optionally display the number next to the step title */
        this.numbered = false;
        /** optionally display a status icon next to the step title */
        this.icon = false;
        /** specify the layout of stepper, defaults to horizontal */
        this.layout = "horizontal";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of Stepper items */
        this.items = [];
        /** sorted list of Stepper items */
        this.sortedItems = [];
    }
    // watch for removal of disabled to register step
    class_1.prototype.contentWatcher = function () {
        this.updateContent(this.requestedContent);
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_1.prototype.connectedCallback = function () {
        // validate props
        var layout = ["horizontal", "vertical"];
        if (!layout.includes(this.layout))
            this.layout = "horizontal";
        var scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        var numbered = [true, false];
        if (!numbered.includes(this.numbered))
            this.numbered = false;
        var icon = [true, false];
        if (!icon.includes(this.icon))
            this.icon = false;
    };
    class_1.prototype.componentDidLoad = function () {
        // if no stepper items are set as active, default to the first one
        if (!this.currentPosition) {
            this.calciteStepperItemChange.emit({
                position: 0,
            });
        }
    };
    class_1.prototype.render = function () {
        var _this = this;
        var dir = getElementDir(this.el);
        return (h(Host, { dir: dir }, h("slot", null), this.layout === "horizontal" ? (h("div", { class: "stepper-content", ref: function (el) { return (_this.stepperContentContainer = el); } })) : null));
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    class_1.prototype.calciteStepperItemKeyEvent = function (e) {
        var item = e.detail.item;
        var itemToFocus = e.target;
        var isFirstItem = this.itemIndex(itemToFocus) === 0;
        var isLastItem = this.itemIndex(itemToFocus) === this.sortedItems.length - 1;
        switch (getKey(item.key)) {
            case "ArrowDown":
            case "ArrowRight":
                if (isLastItem)
                    this.focusFirstItem();
                else
                    this.focusNextItem(itemToFocus);
                break;
            case "ArrowUp":
            case "ArrowLeft":
                if (isFirstItem)
                    this.focusLastItem();
                else
                    this.focusPrevItem(itemToFocus);
                break;
            case "Home":
                this.focusFirstItem();
                break;
            case "End":
                this.focusLastItem();
                break;
        }
    };
    class_1.prototype.registerItem = function (event) {
        var item = {
            item: event.target,
            position: event.detail.position,
            content: event.detail.content,
        };
        if (item.content !== null && item.item.active)
            this.requestedContent = [item.content];
        if (!this.items.includes(item))
            this.items.push(item);
        this.sortedItems = this.sortItems();
    };
    class_1.prototype.updateItem = function (event) {
        if (event.detail.content)
            this.requestedContent =
                event.detail.content.length > 0
                    ? event.detail.content
                    : [event.detail.content];
        this.currentPosition = event.detail.position;
        this.calciteStepperItemChange.emit({
            position: this.currentPosition,
        });
    };
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** set the next step as active */
    class_1.prototype.nextStep = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.currentPosition =
                    this.currentPosition + 1 < this.items.length
                        ? this.currentPosition + 1
                        : this.currentPosition;
                this.emitChangedItem();
                return [2 /*return*/];
            });
        });
    };
    /** set the previous step as active */
    class_1.prototype.prevStep = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.currentPosition =
                    this.currentPosition - 1 >= 0
                        ? this.currentPosition - 1
                        : this.currentPosition;
                this.emitChangedItem();
                return [2 /*return*/];
            });
        });
    };
    /** set the requested step as active */
    class_1.prototype.goToStep = function (num) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.currentPosition = num - 1;
                this.emitChangedItem();
                return [2 /*return*/];
            });
        });
    };
    /** set the first step as active */
    class_1.prototype.startStep = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.currentPosition = 0;
                this.emitChangedItem();
                return [2 /*return*/];
            });
        });
    };
    /** set the last step as active */
    class_1.prototype.endStep = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.currentPosition = this.items.length - 1;
                this.emitChangedItem();
                return [2 /*return*/];
            });
        });
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    class_1.prototype.emitChangedItem = function () {
        this.calciteStepperItemChange.emit({
            position: this.currentPosition,
        });
    };
    class_1.prototype.focusFirstItem = function () {
        var firstItem = this.sortedItems[0];
        this.focusElement(firstItem);
    };
    class_1.prototype.focusLastItem = function () {
        var lastItem = this.sortedItems[this.sortedItems.length - 1];
        this.focusElement(lastItem);
    };
    class_1.prototype.focusNextItem = function (e) {
        var index = this.itemIndex(e);
        var nextItem = this.sortedItems[index + 1] || this.sortedItems[0];
        this.focusElement(nextItem);
    };
    class_1.prototype.focusPrevItem = function (e) {
        var index = this.itemIndex(e);
        var prevItem = this.sortedItems[index - 1] ||
            this.sortedItems[this.sortedItems.length - 1];
        this.focusElement(prevItem);
    };
    class_1.prototype.itemIndex = function (e) {
        return this.sortedItems.indexOf(e);
    };
    class_1.prototype.focusElement = function (item) {
        var target = item;
        target.focus();
    };
    class_1.prototype.sortItems = function () {
        var items = Array.from(this.items)
            .filter(function (a) { return !a.item.disabled; })
            .sort(function (a, b) { return a.position - b.position; })
            .map(function (a) { return a.item; });
        return __spreadArrays(Array.from(new Set(items)));
    };
    class_1.prototype.updateContent = function (content) {
        var _b;
        if (this.stepperContentContainer) {
            this.stepperContentContainer.innerHTML = "";
            (_b = this.stepperContentContainer).append.apply(_b, content);
        }
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "requestedContent": ["contentWatcher"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
CalciteStepper.style = calciteStepperCss;
var calciteStepperItemCss = ":host([hidden]){display:none}:host([scale=s]){--calcite-stepper-item-spacing-unit-s:0.1875rem;--calcite-stepper-item-spacing-unit-m:0.375rem;--calcite-stepper-item-spacing-unit-l:0.75rem;font-size:0.875rem;line-height:1.5}:host([scale=m]){--calcite-stepper-item-spacing-unit-s:0.25rem;--calcite-stepper-item-spacing-unit-m:0.5rem;--calcite-stepper-item-spacing-unit-l:1rem;font-size:0.9375rem;line-height:1.5}:host([scale=l]){--calcite-stepper-item-spacing-unit-s:0.375rem;--calcite-stepper-item-spacing-unit-m:0.75rem;--calcite-stepper-item-spacing-unit-l:1.5rem;font-size:1rem;line-height:1.5}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;color:var(--calcite-ui-text-3);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;text-decoration:none;outline:none;position:relative;border-top:3px solid var(--calcite-ui-border-3);cursor:pointer;margin-right:var(--calcite-stepper-item-spacing-unit-l)}:host([dir=rtl]){margin-left:var(--calcite-stepper-item-spacing-unit-l);margin-right:0}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}:host .stepper-item-header{display:-ms-flexbox;display:flex;-ms-flex-direction:var(--calcite-stepper-item-flex-direction);flex-direction:var(--calcite-stepper-item-flex-direction);-ms-flex-align:start;align-items:flex-start;cursor:pointer}:host .stepper-item-content,:host .stepper-item-header{padding:var(--calcite-stepper-item-spacing-unit-l) var(--calcite-stepper-item-spacing-unit-m);padding-left:0;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;text-align:left}:host([dir=rtl]) .stepper-item-content,:host([dir=rtl]) .stepper-item-header{padding-left:initial;padding-right:0;text-align:right}:host .stepper-item-header *{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host .stepper-item-content{-ms-flex-direction:column;flex-direction:column;width:100%;display:none}:host .stepper-item-icon{margin-right:var(--calcite-stepper-item-spacing-unit-l);margin-top:var(--calcite-stepper-item-spacing-unit-s);color:var(--calcite-ui-text-3);opacity:0.5;height:12px;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-negative:0;flex-shrink:0;-ms-flex-item-align:start;align-self:flex-start;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([dir=rtl]) .stepper-item-icon{margin-left:var(--calcite-stepper-item-spacing-unit-l);margin-right:0}:host .stepper-item-header-text{margin-right:auto;-ms-flex-direction:column;flex-direction:column;text-align:initial}:host([dir=rtl]) .stepper-item-header-text{margin-left:auto;margin-right:0}:host .stepper-item-title,:host .stepper-item-subtitle{display:-ms-flexbox;display:flex;width:100%}:host .stepper-item-title{color:var(--calcite-ui-text-2);font-weight:500}:host .stepper-item-subtitle{color:var(--calcite-ui-text-3)}:host([dir=rtl]) .stepper-item-title{margin-right:0;margin-left:auto}:host .stepper-item-number{font-weight:bold;color:var(--calcite-ui-text-3);margin-right:var(--calcite-stepper-item-spacing-unit-l);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([dir=rtl]) .stepper-item-number{margin-left:var(--calcite-stepper-item-spacing-unit-l);margin-right:initial}:host([disabled]){opacity:0.4}:host([disabled]),:host([disabled]) *{cursor:not-allowed;pointer-events:none}:host([complete]){border-top-color:rgba(0, 122, 194, 0.5)}:host([complete]) .stepper-item-icon{color:var(--calcite-ui-blue-1)}:host([error]){border-top-color:var(--calcite-ui-red-1)}:host([error]) .stepper-item-number{color:var(--calcite-ui-red-1)}:host([error]) .stepper-item-icon{color:var(--calcite-ui-red-1);opacity:1}:host(:hover:not([disabled]):not([active])),:host(:focus:not([disabled]):not([active])){border-top-color:rgba(0, 122, 194, 0.75)}:host(:hover:not([disabled]):not([active])) .stepper-item-title,:host(:focus:not([disabled]):not([active])) .stepper-item-title{color:var(--calcite-ui-text-1)}:host(:hover:not([disabled]):not([active])) .stepper-item-subtitle,:host(:focus:not([disabled]):not([active])) .stepper-item-subtitle{color:var(--calcite-ui-text-2)}:host([error]:hover:not([disabled]):not([active])),:host([error]:focus:not([disabled]):not([active])){border-top-color:rgba(216, 48, 32, 0.75)}:host([active]){border-top-color:var(--calcite-ui-blue-1)}:host([active]) .stepper-item-title{color:var(--calcite-ui-text-1)}:host([active]) .stepper-item-subtitle{color:var(--calcite-ui-text-2)}:host([active]) .stepper-item-number{color:var(--calcite-ui-blue-1)}:host([active]) .stepper-item-icon{color:var(--calcite-ui-blue-1);opacity:1}:host([layout=vertical]){-ms-flex:1 1 auto;flex:1 1 auto;border-top:0;border-left:3px solid var(--calcite-ui-border-3);padding:0 0 0 var(--calcite-stepper-item-spacing-unit-l);margin:0 0 var(--calcite-stepper-item-spacing-unit-m) 0}:host([layout=vertical]) .stepper-item-icon{margin:var(--calcite-stepper-item-spacing-unit-m) 0 0 auto;padding-left:var(--calcite-stepper-item-spacing-unit-l);-ms-flex-order:3;order:3}:host([layout=vertical]) .stepper-item-header{padding-right:0}:host([layout=vertical]) .stepper-item-content{padding:0}:host([layout=vertical][active]) .stepper-item-content{display:-ms-flexbox;display:flex}:host([layout=vertical][active]) .stepper-item-content ::slotted(:last-child){margin-bottom:var(--calcite-stepper-item-spacing-unit-l)}:host([layout=vertical][dir=rtl]){border-left:0;border-right:3px solid var(--calcite-ui-border-3);padding:0 var(--calcite-stepper-item-spacing-unit-l) 0 0}:host([layout=vertical][dir=rtl]) .stepper-item-icon{margin:var(--calcite-stepper-item-spacing-unit-m) auto 0 0;padding-left:0;padding-right:var(--calcite-stepper-item-spacing-unit-l)}:host([layout=vertical][dir=rtl]) .stepper-item-header{padding-left:0;padding-right:intial}:host([layout=vertical][complete]){border-color:rgba(0, 122, 194, 0.5)}:host([layout=vertical][error]){border-color:var(--calcite-ui-red-1)}:host([layout=vertical][active]){border-color:var(--calcite-ui-blue-1)}:host([layout=vertical]:hover:not([disabled]):not([active])),:host([layout=vertical]:focus:not([disabled]):not([active])){border-color:rgba(0, 122, 194, 0.75)}:host([layout=vertical][error]:hover:not([disabled]):not([active])),:host([layout=vertical][error]:focus:not([disabled]):not([active])){border-color:rgba(216, 48, 32, 0.75)}";
var CalciteStepperItem = /** @class */ (function () {
    function CalciteStepperItem(hostRef) {
        registerInstance(this, hostRef);
        this.calciteStepperItemKeyEvent = createEvent(this, "calciteStepperItemKeyEvent", 7);
        this.calciteStepperItemSelect = createEvent(this, "calciteStepperItemSelect", 7);
        this.calciteStepperItemRegister = createEvent(this, "calciteStepperItemRegister", 7);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /** is the step active */
        this.active = false;
        /** has the step been completed */
        this.complete = false;
        /** does the step contain an error that needs to be resolved by the user */
        this.error = false;
        /** is the step disabled and not navigable to by a user */
        this.disabled = false;
        /** should the items display an icon based on status */
        /** @internal */
        this.icon = false;
        /** optionally display the step number next to the title and subtitle */
        /** @internal */
        this.numbered = false;
        /** the scale of the item */
        /** @internal */
        this.scale = "m";
    }
    // watch for removal of disabled to register step
    CalciteStepperItem.prototype.disabledWatcher = function () {
        this.registerStepperItem();
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteStepperItem.prototype.componentWillLoad = function () {
        this.icon = getElementProp(this.el, "icon", false);
        this.numbered = getElementProp(this.el, "numbered", false);
        this.layout = getElementProp(this.el, "layout", false);
        this.scale = getElementProp(this.el, "scale", "m");
    };
    CalciteStepperItem.prototype.componentDidLoad = function () {
        this.itemPosition = this.getItemPosition();
        this.itemContent = this.getItemContent();
        this.registerStepperItem();
        if (this.active)
            this.emitRequestedItem();
    };
    CalciteStepperItem.prototype.componentDidUpdate = function () {
        if (this.active)
            this.emitRequestedItem();
    };
    CalciteStepperItem.prototype.render = function () {
        var _this = this;
        var dir = getElementDir(this.el);
        return (h(Host, { dir: dir, tabindex: this.disabled ? null : 0, "aria-expanded": this.active.toString(), onClick: function () { return _this.emitRequestedItem(); } }, h("div", { class: "stepper-item-header" }, this.icon ? this.setIcon() : null, this.numbered ? (h("div", { class: "stepper-item-number" }, this.getItemPosition() + 1, ".")) : null, h("div", { class: "stepper-item-header-text" }, h("span", { class: "stepper-item-title" }, this.itemTitle), h("span", { class: "stepper-item-subtitle" }, this.itemSubtitle))), h("div", { class: "stepper-item-content" }, h("slot", null))));
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    CalciteStepperItem.prototype.keyDownHandler = function (e) {
        if (!this.disabled && e.target === this.el) {
            switch (getKey(e.key)) {
                case " ":
                case "Enter":
                    this.emitRequestedItem();
                    e.preventDefault();
                    break;
                case "ArrowUp":
                case "ArrowDown":
                case "ArrowLeft":
                case "ArrowRight":
                case "Home":
                case "End":
                    this.calciteStepperItemKeyEvent.emit({ item: e });
                    e.preventDefault();
                    break;
            }
        }
    };
    CalciteStepperItem.prototype.updateActiveItemOnChange = function (event) {
        this.activePosition = event.detail.position;
        this.determineActiveItem();
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    CalciteStepperItem.prototype.setIcon = function () {
        var path = this.active
            ? "circleF"
            : this.error
                ? "exclamationMarkCircleF"
                : this.complete
                    ? "checkCircleF"
                    : "circle";
        return h("calcite-icon", { icon: path, scale: "s", class: "stepper-item-icon" });
    };
    CalciteStepperItem.prototype.determineActiveItem = function () {
        this.active = !this.disabled && this.itemPosition === this.activePosition;
    };
    CalciteStepperItem.prototype.registerStepperItem = function () {
        this.calciteStepperItemRegister.emit({
            position: this.itemPosition,
            content: this.itemContent,
        });
    };
    CalciteStepperItem.prototype.emitRequestedItem = function () {
        if (!this.disabled) {
            this.calciteStepperItemSelect.emit({
                position: this.itemPosition,
                content: this.itemContent,
            });
        }
    };
    CalciteStepperItem.prototype.getItemContent = function () {
        var _a;
        // handle ie and edge
        return ((_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("slot")) ? this.el.shadowRoot
            .querySelector("slot")
            .assignedNodes({ flatten: true })
            : this.el.querySelector(".stepper-item-content")
                ? this.el.querySelector(".stepper-item-content")
                : null;
    };
    CalciteStepperItem.prototype.getItemPosition = function () {
        var parent = this.el.parentElement;
        return Array.prototype.indexOf.call(parent.querySelectorAll("calcite-stepper-item"), this.el);
    };
    Object.defineProperty(CalciteStepperItem.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalciteStepperItem, "watchers", {
        get: function () {
            return {
                "disabled": ["disabledWatcher"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return CalciteStepperItem;
}());
CalciteStepperItem.style = calciteStepperItemCss;
export { CalciteStepper as calcite_stepper, CalciteStepperItem as calcite_stepper_item };
