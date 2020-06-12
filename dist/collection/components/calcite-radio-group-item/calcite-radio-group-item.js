import { Component, Event, h, Prop, Element, Host, Watch, Build, State, } from "@stencil/core";
import { getElementProp } from "../../utils/dom";
export class CalciteRadioGroupItem {
    constructor() {
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
    handleCheckedChange() {
        this.calciteRadioGroupItemChange.emit();
        this.syncToExternalInput();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        let inputProxy = this.el.querySelector(`input[slot="input"]`);
        if (inputProxy) {
            this.value = inputProxy.value;
            this.checked = inputProxy.checked;
            if (Build.isBrowser) {
                this.mutationObserver.observe(inputProxy, { attributes: true });
            }
        }
        this.inputProxy = inputProxy;
        // prop validations
        let iconPosition = ["start", "end"];
        if (this.icon !== null && !iconPosition.includes(this.iconPosition))
            this.iconPosition = "start";
    }
    disconnectedCallback() {
        this.mutationObserver.disconnect();
    }
    componentDidLoad() {
        // only use default slot content in browsers that support shadow dom
        // or if ie11 has no label provided (#374)
        const label = this.el.querySelector("label");
        this.useFallback = !label || label.textContent === "";
    }
    render() {
        const { checked, useFallback, value } = this;
        const scale = getElementProp(this.el, "scale", "m");
        const appearance = getElementProp(this.el, "appearance", "m");
        const layout = getElementProp(this.el, "layout", "m");
        const iconEl = (h("calcite-icon", { class: "radio-group-item-icon", icon: this.icon, scale: "s" }));
        return (h(Host, { role: "radio", "aria-checked": checked.toString(), scale: scale, appearance: appearance, layout: layout },
            h("label", null,
                this.icon && this.iconPosition === "start" ? iconEl : null,
                h("slot", null, useFallback ? value : ""),
                h("slot", { name: "input" }),
                this.icon && this.iconPosition === "end" ? iconEl : null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getMutationObserver() {
        return (Build.isBrowser &&
            new MutationObserver(() => this.syncFromExternalInput()));
    }
    syncFromExternalInput() {
        if (this.inputProxy) {
            this.value = this.inputProxy.value;
            this.checked = this.inputProxy.checked;
        }
    }
    syncToExternalInput() {
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
    }
    static get is() { return "calcite-radio-group-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-radio-group-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-radio-group-item.css"]
    }; }
    static get properties() { return {
        "checked": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Indicates whether the control is checked."
            },
            "attribute": "checked",
            "reflect": true,
            "defaultValue": "false"
        },
        "icon": {
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
                "text": "optionally pass an icon to display - accepts Calcite UI icon names"
            },
            "attribute": "icon",
            "reflect": true
        },
        "iconPosition": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"start\" | \"end\"",
                "resolved": "\"end\" | \"start\"",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "optionally used with icon, select where to position the icon"
            },
            "attribute": "icon-position",
            "reflect": true,
            "defaultValue": "\"start\""
        },
        "value": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any | null",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The control's value."
            },
            "attribute": "value",
            "reflect": false
        }
    }; }
    static get states() { return {
        "useFallback": {}
    }; }
    static get events() { return [{
            "method": "calciteRadioGroupItemChange",
            "name": "calciteRadioGroupItemChange",
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
            "propName": "checked",
            "methodName": "handleCheckedChange"
        }]; }
}
