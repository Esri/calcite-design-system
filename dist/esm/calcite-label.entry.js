import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { f as focusElement, g as getElementDir } from './dom-084e3cc4.js';

const calciteLabelCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=s]) label{font-size:var(--calcite-label-font-size, 12px);--calcite-label-spacing-value:8px}:host([scale=m]) label{font-size:var(--calcite-label-font-size, 16px);--calcite-label-spacing-value:12px}:host([scale=l]) label{font-size:var(--calcite-label-font-size, 20px);--calcite-label-spacing-value:16px}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;position:relative;text-align:left}:host([dir=rtl]){text-align:right}:host label{width:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;cursor:pointer;margin:0 0 1.5rem 0}:host([layout=inline]) label{-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center}:host([layout=inline-space-between]) label{-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center}:host([layout=default]) label .calcite-label-text{margin-bottom:8px}:host([layout=inline]) .calcite-label-text:first-child,:host([layout=inline-space-between]) .calcite-label-text:first-child{margin-right:0.75rem}:host([layout=inline]) .calcite-label-text:last-child,:host([layout=inline-space-between]) .calcite-label-text:last-child{margin-left:0.75rem}:host([status=invalid]) label{color:var(--calcite-ui-red-1)}:host([status=valid]) label{color:var(--calcite-ui-text-2)}:host([status=idle]) label{color:var(--calcite-ui-text-2)}";

const CalciteLabel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteLabelFocus = createEvent(this, "calciteLabelFocus", 7);
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
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        // emit focus event and focus the requested input if available
        this.handleClick = (event) => {
            this.emitSelectedItem(event.target);
            if (this.requestedFor) {
                focusElement(document.getElementById(this.requestedFor));
            }
            else if (this.el.querySelector("textarea")) {
                this.el.querySelector("textarea").focus();
            }
            else if (this.el.querySelector("input")) {
                this.el.querySelector("input").focus();
            }
        };
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
        this.requestedFor = this.el.getAttribute("for");
        if (this.layout === "inline" || this.layout === "inline-space-between") {
            this.displayedSlottedContent = this.handleSlottedContent();
            this.slottedContent.innerHTML = "";
            this.displayedSlottedContent.map((item) => {
                this.slottedContent.append(item);
            });
        }
    }
    render() {
        const attributes = this.getAttributes();
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, onClick: this.handleClick }, h("label", Object.assign({}, attributes, { ref: (el) => (this.slottedContent = el) }), h("slot", null))));
    }
    // wrap slotted text nodes in span to handle spacing of inline and inline space between layouts
    handleSlottedContent() {
        let nodeList = [];
        let requestedSlottedContent = this.el.childNodes;
        // iterate over slotted nodes and wrap text nodes in span
        if (requestedSlottedContent) {
            requestedSlottedContent.forEach(function (item) {
                if (item.nodeName === "#text" && item.textContent.trim().length > 0) {
                    const node = document.createElement("span");
                    node.classList.add("calcite-label-text");
                    node.innerHTML = item.textContent.trim();
                    nodeList.push(node);
                }
                else if (item.nodeName !== "#text") {
                    nodeList.push(item);
                }
            });
        }
        return [...Array.from(new Set(nodeList))];
    }
    emitSelectedItem(target) {
        this.calciteLabelFocus.emit({
            labelEl: this.el,
            interactedEl: target,
            requestedInput: this.requestedFor,
        });
    }
    getAttributes() {
        // spread attributes from the component to rendered child, filtering out props
        let props = ["layout", "theme", "scale", "status"];
        return Array.from(this.el.attributes)
            .filter((a) => a && !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
    }
    get el() { return getElement(this); }
};
CalciteLabel.style = calciteLabelCss;

export { CalciteLabel as calcite_label };
