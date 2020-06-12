'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8fc102d1.js');
const key = require('./key-822806f8.js');

const calciteCheckboxCss = ":host([hidden]){display:none}:host([scale=s]){--calcite-checkbox-size:12px;top:0.1em}:host([scale=m]){--calcite-checkbox-size:16px;top:0.15em}:host([scale=l]){--calcite-checkbox-size:20px;top:0.25em}::slotted(input){display:none}:host{display:-ms-inline-flexbox;display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;width:var(--calcite-checkbox-size);height:var(--calcite-checkbox-size)}:host .check-svg{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus) .check-svg{outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}:host .check-svg{width:var(--calcite-checkbox-size);height:var(--calcite-checkbox-size);overflow:hidden;display:inline-block;background-color:var(--calcite-ui-background);border:1px solid var(--calcite-ui-border-1);fill:var(--calcite-ui-background);pointer-events:none;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;-webkit-box-sizing:border-box;box-sizing:border-box}:host([disabled]){pointer-events:none;cursor:default}:host([disabled]) .check-svg{background-color:var(--calcite-ui-foreground-2)}:host([disabled][checked]) .check-svg,:host([disabled][indeterminate]) .check-svg{background-color:#84c1e8;border-color:#84c1e8}:host([checked]) .check-svg,:host([indeterminate]) .check-svg{background-color:var(--calcite-ui-blue-1);border-color:var(--calcite-ui-blue-1)}:host(:hover),:host(:focus){outline:none}:host(:hover) .check-svg,:host(:focus) .check-svg{border-color:var(--calcite-ui-blue-1);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1)}";

const CalciteCheckbox = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /** True if the checkbox is initially checked */
        this.checked = false;
        /**
         * True if the checkbox is initially indeterminate,
         * which is independent from its checked state
         * https://css-tricks.com/indeterminate-checkboxes/
         * */
        this.indeterminate = false;
        /** The name of the checkbox input */
        this.name = "";
        /** The value of the checkbox input */
        this.value = "";
        /** specify the scale of the checkbox, defaults to m */
        this.scale = "m";
        /** True if the checkbox is disabled */
        this.disabled = false;
        this.toggle = () => {
            if (!this.disabled) {
                this.checked = !this.checked;
                this.indeterminate = false;
            }
        };
        this.indeterminatePath = "M4 7h8v2H4z";
        this.checkedPath = "M12.753 3l-7.319 7.497L3.252 8.31 2 9.373l3.434 3.434L14 4.24z";
        this.getPath = () => this.indeterminate
            ? this.indeterminatePath
            : this.checked
                ? this.checkedPath
                : "";
        this.syncThisToProxyInput = () => {
            this.checked = this.inputProxy.hasAttribute("checked");
            this.name = this.inputProxy.name;
            this.value = this.inputProxy.value;
        };
        this.syncProxyInputToThis = () => {
            this.checked
                ? this.inputProxy.setAttribute("checked", "")
                : this.inputProxy.removeAttribute("checked");
            this.inputProxy.name = this.name;
            this.inputProxy.value = this.value;
        };
        this.calciteCheckboxChange = index.createEvent(this, "calciteCheckboxChange", 7);
    }
    onClick({ target }) {
        // prevent duplicate click events that occur
        // when the component is wrapped in a label and checkbox is clicked
        if ((this.el.closest("label") && target === this.inputProxy) ||
            (!this.el.closest("label") && target === this.el)) {
            this.toggle();
        }
    }
    keyDownHandler(e) {
        const key$1 = key.getKey(e.key);
        if (key$1 === " " || key$1 === "Enter") {
            e.preventDefault();
            this.toggle();
        }
    }
    checkedWatcher() {
        this.calciteCheckboxChange.emit();
        this.checked
            ? this.inputProxy.setAttribute("checked", "")
            : this.inputProxy.removeAttribute("checked");
    }
    connectedCallback() {
        this.setupProxyInput();
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    componentWillRender() {
        this.syncProxyInputToThis();
    }
    render() {
        return (index.h(index.Host, { role: "checkbox", "aria-checked": this.checked.toString(), tabindex: this.disabled ? "-1" : "0" }, index.h("svg", { class: "check-svg", viewBox: "0 0 16 16" }, index.h("path", { d: this.getPath() })), index.h("slot", null)));
    }
    setupProxyInput() {
        // check for a proxy input
        this.inputProxy = this.el.querySelector("input");
        // if the user didn't pass a proxy input create one for them
        if (!this.inputProxy) {
            this.inputProxy = document.createElement("input");
            this.inputProxy.type = "checkbox";
            this.syncProxyInputToThis();
            this.el.appendChild(this.inputProxy);
        }
        this.syncThisToProxyInput();
        {
            this.observer = new MutationObserver(this.syncThisToProxyInput);
            this.observer.observe(this.inputProxy, { attributes: true });
        }
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "checked": ["checkedWatcher"]
    }; }
};
CalciteCheckbox.style = calciteCheckboxCss;

exports.calcite_checkbox = CalciteCheckbox;
