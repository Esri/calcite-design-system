import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-610ae5e8.js';
import { h as hasLabel, g as getElementDir } from './dom-084e3cc4.js';
import { g as getKey } from './key-14bcc91c.js';
var calciteCheckboxCss = ":host([hidden]){display:none}:host-context([theme=light]){--calcite-ui-border-4:$blk-100}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=s]){--calcite-checkbox-size:12px}:host([scale=m]){--calcite-checkbox-size:16px}:host([scale=l]){--calcite-checkbox-size:20px}::slotted(input){opacity:0;position:absolute;z-index:-1}:host{display:-ms-inline-flexbox;display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}:host .check-svg{width:var(--calcite-checkbox-size);height:var(--calcite-checkbox-size);overflow:hidden;display:inline-block;background-color:var(--calcite-ui-foreground-1);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-border-4);box-shadow:inset 0 0 0 1px var(--calcite-ui-border-4);fill:var(--calcite-ui-background);pointer-events:none;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out}:host .hasLabel{display:grid;grid-gap:12px;-ms-flex-align:center;align-items:center;--calcite-label-margin-bottom:0}:host(:hover) .check-svg,:host([hovered]) .check-svg{-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-1)}:host([checked]) .check-svg,:host([indeterminate]) .check-svg{background-color:var(--calcite-ui-blue-1);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1)}:host(:focus) .check-svg,:host([focused]) .check-svg{-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([disabled]){cursor:default;opacity:0.4;pointer-events:none}:host([scale=s]) .hasLabel{grid-template-columns:12px 1fr 4px;grid-template-rows:16px 1fr}:host([scale=m]) .hasLabel{grid-template-columns:16px 1fr 4px;grid-template-rows:20px 1fr}:host([scale=l]) .hasLabel{grid-template-columns:20px 1fr 4px;grid-template-rows:24px 1fr}";
var CalciteCheckbox = /** @class */ (function () {
    function CalciteCheckbox(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.calciteCheckboxChange = createEvent(this, "calciteCheckboxChange", 7);
        this.calciteCheckboxFocusedChange = createEvent(this, "calciteCheckboxFocusedChange", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** The checked state of the checkbox. */
        this.checked = false;
        /** The hovered state of the checkbox. */
        this.hovered = false;
        /** The focused state of the checkbox. */
        this.focused = false;
        /**
         * True if the checkbox is initially indeterminate,
         * which is independent from its checked state
         * https://css-tricks.com/indeterminate-checkboxes/
         * */
        this.indeterminate = false;
        /** The name of the checkbox input */
        this.name = "";
        /** specify the scale of the checkbox, defaults to m */
        this.scale = "m";
        /** True if the checkbox is disabled */
        this.disabled = false;
        //--------------------------------------------------------------------------
        //
        //  Private Properties
        //
        //--------------------------------------------------------------------------
        this.checkedPath = "M12.753 3l-7.319 7.497L3.252 8.31 2 9.373l3.434 3.434L14 4.24z";
        this.indeterminatePath = "M4 7h8v2H4z";
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.getPath = function () { return _this.indeterminate ? _this.indeterminatePath : _this.checked ? _this.checkedPath : ""; };
        this.toggle = function () {
            if (!_this.disabled) {
                _this.checked = !_this.checked;
                _this.focused = true;
                _this.indeterminate = false;
            }
        };
    }
    CalciteCheckbox.prototype.checkedWatcher = function (newChecked) {
        newChecked ? this.input.setAttribute("checked", "") : this.input.removeAttribute("checked");
        this.calciteCheckboxChange.emit();
    };
    CalciteCheckbox.prototype.focusedChanged = function (focused) {
        if (focused && !this.el.hasAttribute("hidden")) {
            this.input.focus();
        }
        else {
            this.input.blur();
        }
        this.calciteCheckboxFocusedChange.emit();
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    CalciteCheckbox.prototype.handleLabelFocus = function (e) {
        if (!this.el.contains(e.detail.interactedEl) && hasLabel(e.detail.labelEl, this.el)) {
            this.toggle();
            this.el.focus();
        }
    };
    CalciteCheckbox.prototype.onClick = function (_a) {
        var currentTarget = _a.currentTarget, target = _a.target;
        // prevent duplicate click events that occur
        // when the component is wrapped in a label and checkbox is clicked
        if ((this.el.closest("label") && target === this.input) ||
            (!this.el.closest("label") && currentTarget === this.el)) {
            this.toggle();
        }
    };
    CalciteCheckbox.prototype.keyDownHandler = function (e) {
        var key = getKey(e.key);
        if (key === " ") {
            e.preventDefault();
            this.toggle();
        }
    };
    CalciteCheckbox.prototype.mouseenter = function () {
        this.hovered = true;
    };
    CalciteCheckbox.prototype.mouseleave = function () {
        this.hovered = false;
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteCheckbox.prototype.connectedCallback = function () {
        this.renderHiddenCheckboxInput();
        var scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    };
    CalciteCheckbox.prototype.disconnectedCallback = function () {
        this.input.parentNode.removeChild(this.input);
    };
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    CalciteCheckbox.prototype.renderHiddenCheckboxInput = function () {
        var _this = this;
        this.input = document.createElement("input");
        this.checked && this.input.setAttribute("checked", "");
        this.input.disabled = this.disabled;
        this.input.name = this.name;
        this.input.onblur = function () { return (_this.focused = false); };
        this.input.onfocus = function () { return (_this.focused = true); };
        this.input.type = "checkbox";
        if (this.value) {
            this.input.value = this.value;
        }
        this.el.appendChild(this.input);
    };
    CalciteCheckbox.prototype.render = function () {
        if (this.el.textContent) {
            return (h(Host, { role: "checkbox", "aria-checked": this.checked.toString() }, h("div", { class: "hasLabel" }, h("svg", { class: "check-svg", viewBox: "0 0 16 16" }, h("path", { d: this.getPath() })), h("calcite-label", { dir: getElementDir(this.el), scale: this.scale }, h("slot", null)))));
        }
        return (h(Host, { role: "checkbox", "aria-checked": this.checked.toString() }, h("svg", { class: "check-svg", viewBox: "0 0 16 16" }, h("path", { d: this.getPath() })), h("slot", null)));
    };
    Object.defineProperty(CalciteCheckbox.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalciteCheckbox, "watchers", {
        get: function () {
            return {
                "checked": ["checkedWatcher"],
                "focused": ["focusedChanged"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return CalciteCheckbox;
}());
CalciteCheckbox.style = calciteCheckboxCss;
export { CalciteCheckbox as calcite_checkbox };
