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
import { a as getElementProp, g as getElementDir } from './dom-084e3cc4.js';
import { g as getKey } from './key-3b974aad.js';
var CSS = {
    icon: "combobox-item-icon",
    label: "combobox-item-label",
    nested: "combobox-item-nested",
    parent: "combobox-item-parent",
    selected: "selected",
    title: "title",
    textContainer: "text-container"
};
var calciteComboboxItemCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=xs]){font-size:10px;--calcite-combobox-item-spacing-unit-l:8px;--calcite-combobox-item-spacing-unit-s:4px}:host([scale=s]){font-size:12px;--calcite-combobox-item-spacing-unit-l:12px;--calcite-combobox-item-spacing-unit-s:8px}:host([scale=m]){font-size:14px;--calcite-combobox-item-spacing-unit-l:16px;--calcite-combobox-item-spacing-unit-s:12px}:host([scale=l]){font-size:16px;--calcite-combobox-item-spacing-unit-l:20px;--calcite-combobox-item-spacing-unit-s:16px}:host([scale=xl]){font-size:18px;--calcite-combobox-item-spacing-unit-l:24px;--calcite-combobox-item-spacing-unit-s:20px}:host,:host ul{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin:0;padding:0;outline:none}:host .combobox-item-label{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus) .combobox-item-label{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host .combobox-item-label{display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;min-width:100%;-ms-flex-align:center;align-items:center;color:var(--calcite-ui-text-3);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;padding:var(--calcite-combobox-item-spacing-unit-s);cursor:pointer;text-decoration:none;position:relative}:host .combobox-item-label .combobox-item-icon{display:-ms-inline-flexbox;display:inline-flex;opacity:0;margin-right:var(--calcite-combobox-item-spacing-unit-s);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;color:var(--calcite-ui-border-1)}:host([dir=rtl]) .combobox-item-label .combobox-item-icon{margin-left:var(--calcite-combobox-item-spacing-unit-l);margin-right:unset}:host .combobox-item-label.combobox-item-nested{padding-left:var(--calcite-combobox-item-spacing-unit-s)}:host .combobox-item-label.combobox-item-nested .combobox-item-icon{padding-left:var(--calcite-combobox-item-spacing-unit-l)}:host([dir=rtl]) .combobox-item-label.combobox-item-nested{padding-right:var(--calcite-combobox-item-spacing-unit-s);padding-left:unset}:host([dir=rtl]) .combobox-item-label.combobox-item-nested .combobox-item-icon{padding-right:var(--calcite-combobox-item-spacing-unit-l);padding-left:unset}:host(:not([disabled])) .combobox-item-label:hover,:host(:not([disabled])) .combobox-item-label:active{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);text-decoration:none;-webkit-box-shadow:none;box-shadow:none}:host(:not([disabled])) .combobox-item-label:hover .combobox-item-icon,:host(:not([disabled])) .combobox-item-label:active .combobox-item-icon{opacity:1}:host(:focus:not([disabled])) .combobox-item-label{color:var(--calcite-ui-text-1);text-decoration:none;-webkit-box-shadow:none;box-shadow:none}:host(:focus:not([disabled])) .combobox-item-label .combobox-item-icon{opacity:1}:host([disabled]) .combobox-item-label:hover .combobox-item-icon{opacity:1}:host([disabled]) .combobox-item-label:hover{cursor:default}:host(:focus){-webkit-box-shadow:none;box-shadow:none}:host .combobox-item-label.selected{color:var(--calcite-ui-text-1);font-weight:500}:host .combobox-item-label.selected .combobox-item-icon{color:var(--calcite-ui-blue-1);opacity:1}";
var CalciteComboboxItem = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.calciteComboboxItemChange = createEvent(this, "calciteComboboxItemChange", 7);
        this.calciteComboboxItemKeyEvent = createEvent(this, "calciteComboboxItemKeyEvent", 7);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /* When true, the item cannot be clicked and is visually muted. */
        this.disabled = false;
        /* Set this to true to pre-select an item. Toggles when an item is checked/unchecked. */
        this.selected = false;
        this.isSelected = this.selected;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.itemClickHandler = function (event) {
            event.preventDefault();
            if (_this.disabled) {
                return;
            }
            _this.isSelected = !_this.isSelected;
            _this.calciteComboboxItemChange.emit(_this.el);
        };
    }
    class_1.prototype.selectedWatchHandler = function (newValue) {
        this.isSelected = newValue;
    };
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    class_1.prototype.componentWillLoad = function () {
        this.isNested = this.getDepth();
        this.hasDefaultSlot = this.el.querySelector(":not([slot])") !== null;
    };
    // --------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    // --------------------------------------------------------------------------
    class_1.prototype.keyDownHandler = function (event) {
        event.stopPropagation();
        switch (getKey(event.key)) {
            case " ":
            case "Enter":
                this.isSelected = !this.isSelected;
                this.calciteComboboxItemChange.emit(this.el);
                event.preventDefault();
                break;
            case "ArrowUp":
            case "ArrowDown":
            case "Home":
            case "End":
            case "Tab":
            case "Escape":
                this.calciteComboboxItemKeyEvent.emit({
                    event: event,
                    item: this.el,
                });
                event.preventDefault();
                break;
        }
    };
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Used to toggle the selection state. By default this won't trigger an event.
     * The first argument allows the value to be coerced, rather than swapping values.
     */
    class_1.prototype.toggleSelected = function (coerce) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (this.disabled) {
                    return [2 /*return*/];
                }
                this.isSelected = typeof coerce === "boolean" ? coerce : !this.isSelected;
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.getDepth = function () {
        var _a;
        return !!((_a = this.el.parentElement) === null || _a === void 0 ? void 0 : _a.closest("calcite-combobox-item"));
    };
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.renderIcon = function (scale) {
        var iconScale = scale !== "l" ? "s" : "m";
        var iconPath = this.disabled ? "circle-disallowed" : "check";
        return h("calcite-icon", { class: CSS.icon, scale: iconScale, icon: iconPath });
    };
    class_1.prototype.renderChildren = function () {
        if (!this.hasDefaultSlot) {
            return null;
        }
        return (h("ul", null, h("slot", null)));
    };
    class_1.prototype.render = function () {
        var _b;
        var _this = this;
        var classes = (_b = {},
            _b[CSS.label] = true,
            _b[CSS.selected] = this.isSelected,
            _b[CSS.nested] = this.isNested,
            _b[CSS.parent] = !this.isNested,
            _b);
        var scale = getElementProp(this.el, "scale", "m");
        var dir = getElementDir(this.el);
        return (h(Host, { dir: dir, scale: scale, role: "option", "aria-selected": this.isSelected, disabled: this.disabled, tabIndex: this.disabled ? null : 0 }, h("div", { class: classes, onClick: this.itemClickHandler, ref: function (el) { return (_this.comboboxItemEl = el); } }, this.renderIcon(scale), h("span", { class: CSS.title }, this.textLabel)), this.renderChildren()));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "selected": ["selectedWatchHandler"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
CalciteComboboxItem.style = calciteComboboxItemCss;
export { CalciteComboboxItem as calcite_combobox_item };
