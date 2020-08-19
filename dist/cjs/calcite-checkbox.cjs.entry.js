'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-562d2854.js');
const dom = require('./dom-eb444cd9.js');
const key = require('./key-a4707640.js');

const calciteCheckboxCss = ":host([hidden]){display:none}:host-context([theme=light]){--calcite-ui-border-4:$blk-100}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=s]){--calcite-checkbox-size:12px}:host([scale=m]){--calcite-checkbox-size:16px}:host([scale=l]){--calcite-checkbox-size:20px}::slotted(input){opacity:0;position:absolute;z-index:-1}:host{display:-ms-inline-flexbox;display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}:host .check-svg{width:var(--calcite-checkbox-size);height:var(--calcite-checkbox-size);overflow:hidden;display:inline-block;background-color:var(--calcite-ui-foreground-1);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-border-4);box-shadow:inset 0 0 0 1px var(--calcite-ui-border-4);fill:var(--calcite-ui-background);pointer-events:none;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out}:host .hasLabel{display:grid;grid-gap:12px;-ms-flex-align:center;align-items:center;--calcite-label-margin-bottom:0}:host(:hover) .check-svg,:host([hovered]) .check-svg{-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-1)}:host([checked]) .check-svg,:host([indeterminate]) .check-svg{background-color:var(--calcite-ui-blue-1);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1)}:host(:focus) .check-svg,:host([focused]) .check-svg{-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([disabled]){cursor:default;opacity:0.4;pointer-events:none}:host([scale=s]) .hasLabel{grid-template-columns:12px 1fr 4px;grid-template-rows:16px 1fr}:host([scale=m]) .hasLabel{grid-template-columns:16px 1fr 4px;grid-template-rows:20px 1fr}:host([scale=l]) .hasLabel{grid-template-columns:20px 1fr 4px;grid-template-rows:24px 1fr}";

const CalciteCheckbox = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteCheckboxChange = index.createEvent(this, "calciteCheckboxChange", 7);
        this.calciteCheckboxFocusedChange = index.createEvent(this, "calciteCheckboxFocusedChange", 7);
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
        this.getPath = () => this.indeterminate ? this.indeterminatePath : this.checked ? this.checkedPath : "";
        this.toggle = () => {
            if (!this.disabled) {
                this.checked = !this.checked;
                this.focused = true;
                this.indeterminate = false;
            }
        };
    }
    checkedWatcher(newChecked) {
        newChecked ? this.input.setAttribute("checked", "") : this.input.removeAttribute("checked");
        this.calciteCheckboxChange.emit();
    }
    focusedChanged(focused) {
        if (focused && !this.el.hasAttribute("hidden")) {
            this.input.focus();
        }
        else {
            this.input.blur();
        }
        this.calciteCheckboxFocusedChange.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleLabelFocus(e) {
        if (!this.el.contains(e.detail.interactedEl) && dom.hasLabel(e.detail.labelEl, this.el)) {
            this.toggle();
            this.el.focus();
        }
    }
    onClick({ currentTarget, target }) {
        // prevent duplicate click events that occur
        // when the component is wrapped in a label and checkbox is clicked
        if ((this.el.closest("label") && target === this.input) ||
            (!this.el.closest("label") && currentTarget === this.el)) {
            this.toggle();
        }
    }
    keyDownHandler(e) {
        const key$1 = key.getKey(e.key);
        if (key$1 === " ") {
            e.preventDefault();
            this.toggle();
        }
    }
    mouseenter() {
        this.hovered = true;
    }
    mouseleave() {
        this.hovered = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.renderHiddenCheckboxInput();
        const scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    disconnectedCallback() {
        this.input.parentNode.removeChild(this.input);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHiddenCheckboxInput() {
        this.input = document.createElement("input");
        this.checked && this.input.setAttribute("checked", "");
        this.input.disabled = this.disabled;
        this.input.name = this.name;
        this.input.onblur = () => (this.focused = false);
        this.input.onfocus = () => (this.focused = true);
        this.input.type = "checkbox";
        if (this.value) {
            this.input.value = this.value;
        }
        this.el.appendChild(this.input);
    }
    render() {
        if (this.el.textContent) {
            return (index.h(index.Host, { role: "checkbox", "aria-checked": this.checked.toString() }, index.h("div", { class: "hasLabel" }, index.h("svg", { class: "check-svg", viewBox: "0 0 16 16" }, index.h("path", { d: this.getPath() })), index.h("calcite-label", { dir: dom.getElementDir(this.el), scale: this.scale }, index.h("slot", null)))));
        }
        return (index.h(index.Host, { role: "checkbox", "aria-checked": this.checked.toString() }, index.h("svg", { class: "check-svg", viewBox: "0 0 16 16" }, index.h("path", { d: this.getPath() })), index.h("slot", null)));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "checked": ["checkedWatcher"],
        "focused": ["focusedChanged"]
    }; }
};
CalciteCheckbox.style = calciteCheckboxCss;

exports.calcite_checkbox = CalciteCheckbox;
