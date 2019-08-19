import { h, Host, Build } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
/** @slot default text slot for button text */
/** Any attributes placed on <calcite-button> component will propagate to the rendered child */
/** Passing a 'href' will render an anchor link, instead of a button. Role will be set to link, or button, depending on this. */
/** Using appearance=inline will also render as an anchor link. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any button attributes for form submission */
export class CalciteButton {
    constructor() {
        /** specify the color of the button, defaults to blue */
        this.color = "blue";
        /** specify the appearance style of the button, defaults to solid. Specifying "inline" will render the component as an anchor */
        this.appearance = "solid";
        /** Select theme (light or dark) */
        this.theme = "light";
        /** specify the scale of the button, defaults to m */
        this.scale = "m";
        /** specify the width of the button, defaults to auto */
        this.width = "auto";
        /** optionally add a calcite-loader component inline to indicate loading is occuring. You can add and remove this prop depending on status  */
        this.loading = false;
        /** optionally pass icon path data to be positioned within the button - pass only raw path data from calcite ui helper  */
        this.icon = null;
        /**
         * @internal
         */
        // hastext prop for spacing graphic when text is present in slot
        this.hastext = false;
    }
    connectedCallback() {
        // prop validations
        let appearance = ["solid", "outline", "clear", "inline"];
        if (!appearance.includes(this.appearance))
            this.appearance = "solid";
        let color = ["blue", "red", "dark", "light"];
        if (!color.includes(this.color))
            this.color = "blue";
        let scale = ["xs", "s", "m", "l", "xl"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let width = ["auto", "half", "full"];
        if (!width.includes(this.width))
            this.width = "auto";
        let theme = ["dark", "light"];
        if (!theme.includes(this.theme))
            this.theme = "light";
    }
    componentDidLoad() {
        if (Build.isBrowser) {
            let textSlot = this.el.shadowRoot.querySelector("slot");
            let textNode = textSlot ? textSlot.assignedNodes() : null;
            if (textNode && (textNode[0] !== undefined && textNode[0] !== null))
                this.hastext = true;
        }
    }
    getAttributes() {
        // spreadable attributes to pass to component child, if they aren't props
        let props = [
            "appearance",
            "color",
            "loading",
            "scale",
            "width",
            "icon",
            "dir"
        ];
        return Array.from(this.el.attributes)
            .filter(a => a && !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign({}, acc, { [name]: value })), {});
    }
    render() {
        const dir = getElementDir(this.el);
        const attributes = this.getAttributes();
        const Type = this.href || this.appearance === "inline" ? "a" : "button";
        const role = Type === "a" ? "link" : "button";
        const loader = this.loading ? (h("div", { class: "calcite-button--loader" },
            h("calcite-loader", { "is-active": true, inline: true }))) : null;
        const icon = this.icon ? (h("svg", { class: "calcite-button--icon", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
            h("path", { d: this.icon }))) : null;
        if (this.appearance === "inline") {
            return (h(Host, { dir: dir, hastext: this.hastext },
                h(Type, Object.assign({}, attributes, { role: role }),
                    loader,
                    h("slot", null),
                    icon)));
        }
        else {
            return (h(Host, { dir: dir, hastext: this.hastext },
                h(Type, Object.assign({}, attributes, { role: role }),
                    loader,
                    icon,
                    h("slot", null))));
        }
    }
    static get is() { return "calcite-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-button.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-button.css"]
    }; }
    static get properties() { return {
        "color": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"blue\"\n    | \"dark\"\n    | \"light\"\n    | \"red\"",
                "resolved": "\"blue\" | \"dark\" | \"light\" | \"red\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the color of the button, defaults to blue"
            },
            "attribute": "color",
            "reflect": true,
            "defaultValue": "\"blue\""
        },
        "appearance": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"solid\"\n    | \"outline\"\n    | \"clear\"\n    | \"inline\"",
                "resolved": "\"clear\" | \"inline\" | \"outline\" | \"solid\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the appearance style of the button, defaults to solid. Specifying \"inline\" will render the component as an anchor"
            },
            "attribute": "appearance",
            "reflect": true,
            "defaultValue": "\"solid\""
        },
        "theme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"light\" | \"dark\"",
                "resolved": "\"dark\" | \"light\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Select theme (light or dark)"
            },
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "\"light\""
        },
        "scale": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"xs\" | \"s\" | \"m\" | \"l\" | \"xl\"",
                "resolved": "\"l\" | \"m\" | \"s\" | \"xl\" | \"xs\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the scale of the button, defaults to m"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "width": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"auto\" | \"half\" | \"full\"",
                "resolved": "\"auto\" | \"full\" | \"half\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the width of the button, defaults to auto"
            },
            "attribute": "width",
            "reflect": true,
            "defaultValue": "\"auto\""
        },
        "loading": {
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
                "text": "optionally add a calcite-loader component inline to indicate loading is occuring. You can add and remove this prop depending on status"
            },
            "attribute": "loading",
            "reflect": true,
            "defaultValue": "false"
        },
        "href": {
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
                "text": "optionally pass a href - used to determine if the component should render as a button or an anchor"
            },
            "attribute": "href",
            "reflect": true
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
                "text": "optionally pass icon path data to be positioned within the button - pass only raw path data from calcite ui helper"
            },
            "attribute": "icon",
            "reflect": true,
            "defaultValue": "null"
        },
        "hastext": {
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
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "hastext",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get elementRef() { return "el"; }
}
