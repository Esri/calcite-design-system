import { h, Host } from "@stencil/core";
import { SPACE, ENTER } from "../../utils/keys";
export class CalciteSwitch {
    constructor() {
        /**
         * True if the control should be switched on
         */
        this.switched = false;
        /**
         * Name of the form control (useful for specifying input/label relationship)
         */
        this.name = "";
        /**
         * Value of the form control
         */
        this.value = "";
        /**
         * Color of the switch. Use red to denote destructive settings/actions.
         */
        this.color = "blue";
        this.syncThisToProxyInput = () => {
            this.switched = this.inputProxy.checked;
            this.name = this.inputProxy.name;
            this.value = this.inputProxy.value;
        };
        this.syncProxyInputToThis = () => {
            this.inputProxy.checked = this.switched;
            this.inputProxy.name = this.name;
            this.inputProxy.value = this.value;
        };
    }
    onClick(e) {
        // If this is contained by a label only toggle if the target is our input
        // proxy to prevent duplicate toggles when <calcite-switch> is contained by
        // a <label> and the switch is clicked causing a click from BOTH the switch
        // and input.
        // If this is NOT contained by a label only switch if the target
        // is the switch.
        if ((this.el.closest("label") && e.target === this.inputProxy) ||
            (!this.el.closest("label") && e.target === this.el)) {
            this.switched = !this.switched;
        }
    }
    keyDownHandler(e) {
        if (e.keyCode === SPACE || e.keyCode === ENTER) {
            this.switched = !this.switched;
        }
    }
    switchWatcher() {
        this.calciteSwitchChange.emit();
        if (this.switched) {
            this.inputProxy.setAttribute("checked", "");
        }
        else {
            this.inputProxy.removeAttribute("checked");
        }
    }
    connectedCallback() {
        this.setupProxyInput();
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    componentWillRender() {
        this.syncProxyInputToThis();
    }
    render() {
        return (h(Host, { role: "checkbox", "aria-checked": this.switched, tabindex: "0" },
            h("div", { class: "track" },
                h("div", { class: "handle" })),
            h("slot", null)));
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
        this.observer = new MutationObserver(this.syncThisToProxyInput);
        this.observer.observe(this.inputProxy, { attributes: true });
    }
    static get is() { return "calcite-switch"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-switch.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-switch.css"]
    }; }
    static get properties() { return {
        "switched": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "True if the control should be switched on"
            },
            "attribute": "switched",
            "reflect": true,
            "defaultValue": "false"
        },
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Name of the form control (useful for specifying input/label relationship)"
            },
            "attribute": "name",
            "reflect": true,
            "defaultValue": "\"\""
        },
        "value": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Value of the form control"
            },
            "attribute": "value",
            "reflect": true,
            "defaultValue": "\"\""
        },
        "color": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"red\" | \"blue\"",
                "resolved": "\"blue\" | \"red\"",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Color of the switch. Use red to denote destructive settings/actions."
            },
            "attribute": "color",
            "reflect": false,
            "defaultValue": "\"blue\""
        }
    }; }
    static get events() { return [{
            "method": "calciteSwitchChange",
            "name": "calciteSwitchChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "document what gets passed to the handler for these events",
                        "name": "todo"
                    }],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "switched",
            "methodName": "switchWatcher"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
