'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8fc102d1.js');
const dom = require('./dom-cfd6221a.js');

const calciteLabelCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=s]) label{font-size:var(--calcite-label-font-size, 12px);--calcite-label-spacing-value:8px}:host([scale=m]) label{font-size:var(--calcite-label-font-size, 16px);--calcite-label-spacing-value:12px}:host([scale=l]) label{font-size:var(--calcite-label-font-size, 20px);--calcite-label-spacing-value:16px}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;position:relative;text-align:left}:host([dir=rtl]){text-align:right}:host label{width:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;cursor:pointer;margin:0 0 var(--calcite-label-margin-bottom, 1.5rem) 0}:host([layout=inline]) label{-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center}:host([layout=inline-space-between]) label{-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center}:host([layout=inline]) .calcite-label-text:first-child,:host([layout=inline-space-between]) .calcite-label-text:first-child{margin-right:0.75rem}:host([layout=inline]) .calcite-label-text:last-child,:host([layout=inline-space-between]) .calcite-label-text:last-child{margin-left:0.75rem}:host([status=invalid]) label{color:var(--calcite-ui-red-1)}:host([status=valid]) label{color:var(--calcite-ui-text-2)}:host([status=idle]) label{color:var(--calcite-ui-text-2)}";

const CalciteLabel = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** specify the status of the label and any child input / input messages */
        this.status = "idle";
        /** specify the scale of the input, defaults to m */
        this.scale = "m";
        /** is the wrapped element positioned inline with the label slotted text */
        this.layout = "default";
        this.calciteLabelSelectedEvent = index.createEvent(this, "calciteLabelSelectedEvent", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        let status = ["invalid", "valid", "idle"];
        if (!status.includes(this.status))
            this.status = "idle";
        let layout = ["inline", "inline-space-between", "default"];
        if (!layout.includes(this.layout))
            this.layout = "default";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    componentDidLoad() {
        this.requestedInputId = this.el.getAttribute("for");
        if (this.layout === "inline" || this.layout === "inline-space-between") {
            this.displayedSlottedContent = this.handleSlottedContent();
            this.slottedContent.innerHTML = "";
            this.slottedContent.append(...this.displayedSlottedContent);
        }
    }
    render() {
        const attributes = this.getAttributes();
        const dir = dom.getElementDir(this.el);
        return (index.h(index.Host, { dir: dir }, index.h("label", Object.assign({}, attributes, { ref: (el) => (this.slottedContent = el) }), index.h("slot", null))));
    }
    handleClick(e) {
        var _a;
        // don't refocus the input if the click occurs on a slotted input action
        // defer to slider click events if the click occurs on a calcite-slider
        if (((_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.className) !== "calcite-input-action-wrapper" &&
            e.target.nodeName !== "CALCITE-SLIDER" &&
            e.target.nodeName !== "CALCITE-RADIO-GROUP-ITEM")
            this.focusChildEl();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    // take unique action on calcite child controls if present
    focusChildEl() {
        if (this.requestedInputId) {
            this.emitSelectedItem();
            document.getElementById(this.requestedInputId).focus();
        }
        else if (this.el.querySelector("calcite-radio-group")) {
            this.el.querySelectorAll("calcite-radio-group-item[checked]")[0].focus();
        }
        else if (this.el.querySelector("calcite-switch")) {
            this.el.querySelector("calcite-switch").focus();
            this.el.querySelector("calcite-switch").toggleAttribute("switched");
        }
        else if (this.el.querySelector("calcite-checkbox")) {
            this.el.querySelector("calcite-checkbox").focus();
            this.el.querySelector("calcite-checkbox").toggleAttribute("checked");
        }
        else if (this.el.querySelector("calcite-slider")) {
            this.el.querySelector("calcite-slider").setFocus();
        }
        else if (this.el.querySelector("textarea")) {
            this.el.querySelector("textarea").focus();
        }
        else if (this.el.querySelector("input")) {
            this.el.querySelector("input").focus();
        }
    }
    // wrap slotted text nodes in span to handle spacing of inline and inline space between layout
    handleSlottedContent() {
        let nodeList = [];
        let requestedSlottedContent = this.el.childNodes;
        // iterate over slotted nodes and wrap text nodes in span
        if (requestedSlottedContent) {
            requestedSlottedContent.forEach(function (item) {
                if (item.nodeName === "#text" && item.textContent.trim().length > 0) {
                    const node = document.createElement("span");
                    node.classList.add("calcite-label-text");
                    node.classList.add("sc-calcite-label");
                    node.innerHTML = item.textContent.trim();
                    nodeList.push(node);
                }
                else if (item.nodeName !== "#text") {
                    nodeList.push(item);
                }
            });
        }
        return nodeList;
    }
    emitSelectedItem() {
        this.calciteLabelSelectedEvent.emit({
            requestedInput: this.requestedInputId,
        });
    }
    getAttributes() {
        // spread attributes from the component to rendered child, filtering out props
        let props = ["layout", "theme", "scale", "status"];
        return Array.from(this.el.attributes)
            .filter((a) => a && !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
    }
    get el() { return index.getElement(this); }
};
CalciteLabel.style = calciteLabelCss;

exports.calcite_label = CalciteLabel;
