import { Component, Element, h, Host, Method, Prop } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
/** @slot default text slot for link text */
/** Any attributes placed on <calcite-link> component will propagate to the rendered child */
/** Passing a 'href' will render an anchor link, instead of a span. Role will be set to link, or link, depending on this. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any link attributes for form submission */
export class CalciteLink {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** specify the color of the link, defaults to blue */
        this.color = "blue";
        /** the node type of the rendered child element */
        this.childElType = "span";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let color = ["blue", "red", "dark", "light"];
        if (!color.includes(this.color))
            this.color = "blue";
        this.childElType = this.href ? "a" : "span";
    }
    render() {
        const dir = getElementDir(this.el);
        const attributes = this.getAttributes();
        const Tag = this.childElType;
        const role = this.childElType === "span" ? "link" : null;
        const tabIndex = this.disabled
            ? -1
            : this.childElType === "span"
                ? 0
                : null;
        const iconStartEl = (h("calcite-icon", { class: "calcite-link--icon icon-start", icon: this.iconStart, scale: "s" }));
        const iconEndEl = (h("calcite-icon", { class: "calcite-link--icon icon-end", icon: this.iconEnd, scale: "s" }));
        return (h(Host, { dir: dir },
            h(Tag, Object.assign({}, attributes, { role: role, tabIndex: tabIndex, ref: (el) => (this.childEl = el) }),
                this.iconStart ? iconStartEl : null,
                h("slot", null),
                this.iconEnd ? iconEndEl : null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    async setFocus() {
        this.childEl.focus();
    }
    getAttributes() {
        // spread attributes from the component to rendered child, filtering out props
        let props = ["color", "dir", "icon", "iconPosition", "id", "theme"];
        return Array.from(this.el.attributes)
            .filter((a) => a && !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
    }
    static get is() { return "calcite-link"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-link.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-link.css"]
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
                "text": "specify the color of the link, defaults to blue"
            },
            "attribute": "color",
            "reflect": true,
            "defaultValue": "\"blue\""
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
                "text": "Select theme (light or dark)"
            },
            "attribute": "theme",
            "reflect": true
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
                "text": "optionally pass a href - used to determine if the component should render as a link or an anchor"
            },
            "attribute": "href",
            "reflect": true
        },
        "iconStart": {
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
                "text": "optionally pass an icon to display at the start of a button - accepts calcite ui icon names"
            },
            "attribute": "icon-start",
            "reflect": true
        },
        "iconEnd": {
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
                "text": "optionally pass an icon to display at the end of a button - accepts calcite ui icon names"
            },
            "attribute": "icon-end",
            "reflect": true
        },
        "disabled": {
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
                "text": "is the link disabled"
            },
            "attribute": "disabled",
            "reflect": true
        }
    }; }
    static get methods() { return {
        "setFocus": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
}
