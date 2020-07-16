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
import { a as getElementProp, h as hasLabel, g as getElementDir } from './dom-084e3cc4.js';
import { g as getKey } from './key-3b974aad.js';
var calciteRadioGroupCss = ":host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;margin-top:0.25rem}:host([layout=vertical]){-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:start;-ms-flex-item-align:start;align-self:flex-start}:host([width=auto]){width:auto}:host([width=full]){width:100%;display:-ms-flexbox;display:flex}:host([width=full]) ::slotted(calcite-radio-group-item){-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-pack:center;justify-content:center}:host([width=full][layout=vertical]) ::slotted(calcite-radio-group-item){-ms-flex-pack:start;justify-content:start}::slotted(calcite-radio-group-item[checked]),::slotted(calcite-radio-group-item:focus){z-index:0}";
var CalciteRadioGroup = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.calciteRadioGroupChange = createEvent(this, "calciteRadioGroupChange", 7);
        /** specify the appearance style of the radio group, defaults to solid. */
        this.appearance = "solid";
        /** specify the layout of the radio group, defaults to horizontal */
        this.layout = "horizontal";
        /** specify the width of the group, defaults to auto */
        this.width = "auto";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        this.hiddenInput = (function () {
            var input = document.createElement("input");
            input.type = "hidden";
            _this.el.appendChild(input);
            return input;
        })();
    }
    class_1.prototype.handleNameChange = function (value) {
        this.hiddenInput.name = value;
    };
    class_1.prototype.handleSelectedItemChange = function (newItem, oldItem) {
        if (newItem === oldItem) {
            return;
        }
        var items = this.getItems();
        var match = Array.from(items)
            .filter(function (item) { return item === newItem; })
            .pop();
        if (match) {
            this.selectItem(match);
            this.calciteRadioGroupChange.emit();
        }
        else if (items[0]) {
            items[0].tabIndex = 0;
        }
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_1.prototype.connectedCallback = function () {
        // prop validations
        var scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = getElementProp(this.el.parentElement, "scale", "m");
        var appearance = ["solid", "outline"];
        if (!appearance.includes(this.appearance))
            this.appearance = "solid";
        var layout = ["horizontal", "vertical"];
        if (!layout.includes(this.layout))
            this.layout = "horizontal";
        var width = ["auto", "full"];
        if (!width.includes(this.width))
            this.width = "auto";
        var items = this.getItems();
        var lastChecked = Array.from(items)
            .filter(function (item) { return item.checked; })
            .pop();
        if (lastChecked) {
            this.selectItem(lastChecked);
        }
        else if (items[0]) {
            items[0].tabIndex = 0;
        }
        var _b = this, hiddenInput = _b.hiddenInput, name = _b.name;
        if (name) {
            hiddenInput.name = name;
        }
        if (lastChecked) {
            hiddenInput.value = lastChecked.value;
        }
    };
    class_1.prototype.componentDidLoad = function () {
        this.hasLoaded = true;
    };
    class_1.prototype.render = function () {
        return (h(Host, { role: "radiogroup" }, h("slot", null)));
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    class_1.prototype.handleLabelFocus = function (e) {
        if (hasLabel(e.detail.labelEl, this.el)) {
            this.setFocus();
        }
    };
    class_1.prototype.handleClick = function (event) {
        if (event.target.localName === "calcite-radio-group-item") {
            this.selectItem(event.target);
        }
    };
    class_1.prototype.handleSelected = function (event) {
        // only fire after initial setup to prevent semi-infinite loops
        if (this.hasLoaded) {
            event.stopPropagation();
            event.preventDefault();
            this.selectItem(event.target);
        }
    };
    class_1.prototype.handleKeyDown = function (event) {
        var keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];
        var key = getKey(event.key);
        var _b = this, el = _b.el, selectedItem = _b.selectedItem;
        if (keys.indexOf(key) === -1) {
            return;
        }
        var adjustedKey = key;
        if (getElementDir(el) === "rtl") {
            if (key === "ArrowRight") {
                adjustedKey = "ArrowLeft";
            }
            if (key === "ArrowLeft") {
                adjustedKey = "ArrowRight";
            }
        }
        var items = this.getItems();
        var selectedIndex = -1;
        items.forEach(function (item, index) {
            if (item === selectedItem) {
                selectedIndex = index;
            }
        });
        switch (adjustedKey) {
            case "ArrowLeft":
            case "ArrowUp":
                event.preventDefault();
                var previous = selectedIndex < 1
                    ? items.item(items.length - 1)
                    : items.item(selectedIndex - 1);
                this.selectItem(previous);
                return;
            case "ArrowRight":
            case "ArrowDown":
                event.preventDefault();
                var next = selectedIndex === -1
                    ? items.item(1)
                    : items.item(selectedIndex + 1) || items.item(0);
                this.selectItem(next);
                return;
            case " ":
                event.preventDefault();
                this.selectItem(event.target);
                return;
            default:
                return;
        }
    };
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /** Focuses the selected item. If there is no selection, it focuses the first item. */
    class_1.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                (_a = (this.selectedItem || this.getItems()[0])) === null || _a === void 0 ? void 0 : _a.focus();
                return [2 /*return*/];
            });
        });
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    class_1.prototype.getItems = function () {
        return this.el.querySelectorAll("calcite-radio-group-item");
    };
    class_1.prototype.selectItem = function (selected) {
        if (selected === this.selectedItem) {
            return;
        }
        var items = this.getItems();
        var match = null;
        items.forEach(function (item) {
            var matches = item.value === selected.value;
            if ((matches && !item.checked) || (!matches && item.checked)) {
                item.checked = matches;
            }
            item.tabIndex = matches ? 0 : -1;
            if (matches) {
                match = item;
            }
        });
        this.selectedItem = match;
        this.syncWithInputProxy(match);
        if (match) {
            match.focus();
        }
    };
    class_1.prototype.syncWithInputProxy = function (item) {
        this.hiddenInput.value = item ? item.value : "";
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "name": ["handleNameChange"],
                "selectedItem": ["handleSelectedItemChange"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
CalciteRadioGroup.style = calciteRadioGroupCss;
var calciteRadioGroupItemCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:-ms-flexbox;display:flex;-ms-flex-item-align:stretch;align-self:stretch;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-3);cursor:pointer;line-height:1.25;margin:0 -1px 0 0;border:1px solid var(--calcite-ui-border-1);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent;-webkit-box-sizing:border-box;box-sizing:border-box;font-weight:400;-webkit-transition:background 0.1s ease-in-out, border-color 0.1s ease-in-out;transition:background 0.1s ease-in-out, border-color 0.1s ease-in-out;cursor:pointer}:host([layout=vertical]){margin:0 0 -1px 0}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}:host([scale=s]){font-size:0.8125rem;line-height:1.5;padding:0.25rem 0.75rem}:host([scale=m]){font-size:0.9375rem;line-height:1.5;padding:0.4rem 1rem}:host([scale=l]){font-size:1rem;line-height:1.5;padding:0.5rem 1.5rem}:host(:hover){background-color:var(--calcite-ui-foreground-2)}:host(:active){background-color:var(--calcite-ui-foreground-3)}:host([checked]){background-color:var(--calcite-ui-blue-1);border-color:var(--calcite-ui-blue-1);color:var(--calcite-ui-background);cursor:default}:host([appearance=outline][checked]){background-color:var(--calcite-ui-foreground-1);border-color:var(--calcite-ui-blue-1);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1);color:var(--calcite-ui-blue-1)}label{pointer-events:none;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}::slotted(input){display:none}.radio-group-item-icon{display:-ms-inline-flexbox;display:inline-flex;position:relative;margin:0;line-height:inherit;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([icon-position=start]) .radio-group-item-icon{margin-right:0.5rem}:host([icon-position=start][dir=rtl]) .radio-group-item-icon{margin-right:0;margin-left:0.5rem}:host([icon-position=end]) .radio-group-item-icon{margin-left:0.5rem}:host([icon-position=end][dir=rtl]) .radio-group-item-icon{margin-left:0;margin-right:0.5rem}";
var CalciteRadioGroupItem = /** @class */ (function () {
    function CalciteRadioGroupItem(hostRef) {
        registerInstance(this, hostRef);
        this.calciteRadioGroupItemChange = createEvent(this, "calciteRadioGroupItemChange", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Indicates whether the control is checked. */
        this.checked = false;
        /** optionally used with icon, select where to position the icon */
        this.iconPosition = "start";
        this.mutationObserver = this.getMutationObserver();
    }
    CalciteRadioGroupItem.prototype.handleCheckedChange = function () {
        this.calciteRadioGroupItemChange.emit();
        this.syncToExternalInput();
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteRadioGroupItem.prototype.connectedCallback = function () {
        var inputProxy = this.el.querySelector("input[slot=\"input\"]");
        if (inputProxy) {
            this.value = inputProxy.value;
            this.checked = inputProxy.checked;
            {
                this.mutationObserver.observe(inputProxy, { attributes: true });
            }
        }
        this.inputProxy = inputProxy;
        // prop validations
        var iconPosition = ["start", "end"];
        if (this.icon !== null && !iconPosition.includes(this.iconPosition))
            this.iconPosition = "start";
    };
    CalciteRadioGroupItem.prototype.disconnectedCallback = function () {
        this.mutationObserver.disconnect();
    };
    CalciteRadioGroupItem.prototype.componentWillLoad = function () {
        // only use default slot content in browsers that support shadow dom
        // or if ie11 has no label provided (#374)
        var label = this.el.querySelector("label");
        this.useFallback = !label || label.textContent === "";
    };
    CalciteRadioGroupItem.prototype.render = function () {
        var _b = this, checked = _b.checked, useFallback = _b.useFallback, value = _b.value;
        var scale = getElementProp(this.el, "scale", "m");
        var appearance = getElementProp(this.el, "appearance", "m");
        var layout = getElementProp(this.el, "layout", "m");
        var iconEl = (h("calcite-icon", { class: "radio-group-item-icon", icon: this.icon, scale: "s" }));
        return (h(Host, { role: "radio", "aria-checked": checked.toString(), scale: scale, appearance: appearance, layout: layout }, h("label", null, this.icon && this.iconPosition === "start" ? iconEl : null, h("slot", null, useFallback ? value : ""), h("slot", { name: "input" }), this.icon && this.iconPosition === "end" ? iconEl : null)));
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    CalciteRadioGroupItem.prototype.getMutationObserver = function () {
        var _this = this;
        return (new MutationObserver(function () { return _this.syncFromExternalInput(); }));
    };
    CalciteRadioGroupItem.prototype.syncFromExternalInput = function () {
        if (this.inputProxy) {
            this.value = this.inputProxy.value;
            this.checked = this.inputProxy.checked;
        }
    };
    CalciteRadioGroupItem.prototype.syncToExternalInput = function () {
        if (!this.inputProxy) {
            return;
        }
        this.inputProxy.value = this.value;
        if (this.checked) {
            this.inputProxy.setAttribute("checked", "true");
        }
        else {
            this.inputProxy.removeAttribute("checked");
        }
    };
    Object.defineProperty(CalciteRadioGroupItem.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalciteRadioGroupItem, "watchers", {
        get: function () {
            return {
                "checked": ["handleCheckedChange"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return CalciteRadioGroupItem;
}());
CalciteRadioGroupItem.style = calciteRadioGroupItemCss;
export { CalciteRadioGroup as calcite_radio_group, CalciteRadioGroupItem as calcite_radio_group_item };
