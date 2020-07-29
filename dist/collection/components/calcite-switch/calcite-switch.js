import { Component, h, Prop, Event, Element, Host, Listen, Watch, Build, } from "@stencil/core";
import { getElementDir, hasLabel } from "../../utils/dom";
import { getKey } from "../../utils/key";
export class CalciteSwitch {
    constructor() {
        /** True if the switch is initially on */
        this.switched = false;
        /** The name of the checkbox input */
        this.name = "";
        /** The value of the checkbox input */
        this.value = "";
        /** What color the switch should be */
        this.color = "blue";
        /** The scale of the switch */
        this.scale = "m";
        this.syncThisToProxyInput = () => {
            this.switched = this.inputProxy.hasAttribute("checked");
            this.name = this.inputProxy.name;
            this.value = this.inputProxy.value;
        };
        this.syncProxyInputToThis = () => {
            this.switched
                ? this.inputProxy.setAttribute("checked", "")
                : this.inputProxy.removeAttribute("checked");
            this.inputProxy.setAttribute("name", this.name);
            this.inputProxy.setAttribute("value", this.value);
        };
    }
    handleLabelFocus(e) {
        if (!this.el.contains(e.detail.interactedEl) &&
            hasLabel(e.detail.labelEl, this.el)) {
            this.updateSwitch(event);
            this.el.focus();
        }
        else
            return;
    }
    onClick(e) {
        // prevent duplicate click events that occur
        // when the component is wrapped in a label and checkbox is clicked
        if ((this.el.closest("label") && e.target === this.inputProxy) ||
            (!this.el.closest("label") && e.target === this.el)) {
            this.updateSwitch(e);
        }
    }
    keyDownHandler(e) {
        const key = getKey(e.key);
        if (key === " " || key === "Enter") {
            this.updateSwitch(e);
        }
    }
    switchWatcher() {
        this.switched
            ? this.inputProxy.setAttribute("checked", "")
            : this.inputProxy.removeAttribute("checked");
    }
    connectedCallback() {
        // prop validations
        let color = ["blue", "red"];
        if (!color.includes(this.color))
            this.color = "blue";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        this.setupProxyInput();
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    componentWillRender() {
        this.syncProxyInputToThis();
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, role: "checkbox", "aria-checked": this.switched.toString(), tabIndex: this.tabIndex },
            h("div", { class: "track" },
                h("div", { class: "handle" }))));
    }
    get tabIndex() {
        const hasTabIndex = this.el.hasAttribute("tabindex");
        if (hasTabIndex) {
            return Number(this.el.getAttribute("tabindex"));
        }
        return 0;
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
        if (Build.isBrowser) {
            this.observer = new MutationObserver(this.syncThisToProxyInput);
            this.observer.observe(this.inputProxy, { attributes: true });
        }
    }
    updateSwitch(e) {
        e.preventDefault();
        this.switched = !this.switched;
        this.calciteSwitchChange.emit({
            switched: this.switched,
        });
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
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "True if the switch is initially on"
            },
            "attribute": "switched",
            "reflect": true,
            "defaultValue": "false"
        },
        "name": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The name of the checkbox input"
            },
            "attribute": "name",
            "reflect": true,
            "defaultValue": "\"\""
        },
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The value of the checkbox input"
            },
            "attribute": "value",
            "reflect": true,
            "defaultValue": "\"\""
        },
        "color": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"red\" | \"blue\"",
                "resolved": "\"blue\" | \"red\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "What color the switch should be"
            },
            "attribute": "color",
            "reflect": true,
            "defaultValue": "\"blue\""
        },
        "scale": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"s\" | \"m\" | \"l\"",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The scale of the switch"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "theme": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"light\" | \"dark\"",
                "resolved": "\"dark\" | \"light\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The component's theme."
            },
            "attribute": "theme",
            "reflect": true
        }
    }; }
    static get events() { return [{
            "method": "calciteSwitchChange",
            "name": "calciteSwitchChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
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
            "name": "calciteLabelFocus",
            "method": "handleLabelFocus",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
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
