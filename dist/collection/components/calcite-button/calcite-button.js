import { h, Host, Build } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
/** @slot default text slot for button text */
/** Any attributes placed on <calcite-button> component will propagate to the rendered child */
/** Passing a 'href' will render an anchor link, instead of a button. Role will be set to link, or button, depending on this. */
/** Using appearance=inline will also render as an anchor link. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any button attributes for form submission */
export class CalciteButton {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
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
        /** optionally add a calcite-loader component to the button, disabling interaction.  */
        this.loading = false;
        /** optionally used with icon, select where to position the icon */
        this.iconposition = "start";
        /** @internal */
        /** hastext prop for spacing icon when text is present in slot */
        this.hasText = false;
        /** @internal */
        /** keep track of the rendered child type -  */
        this.childEl = "button";
        // act on a requested or nearby form based on type
        this.handleClick = (e) => {
            // this.type refers to type attribute, not child element type
            if (this.childEl === "button" && this.type !== "button") {
                const requestedForm = this.el.getAttribute("form");
                const targetForm = requestedForm
                    ? document.getElementsByName(`${requestedForm}`)[0]
                    : this.el.closest("form");
                if (targetForm) {
                    switch (this.type) {
                        case "submit":
                            if (targetForm.checkValidity())
                                targetForm.submit();
                            else
                                targetForm.reportValidity();
                            break;
                        case "reset":
                            targetForm.reset();
                            break;
                    }
                }
                e.preventDefault();
            }
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let appearance = ["solid", "outline", "clear", "inline", "transparent"];
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
        let iconposition = ["start", "end"];
        if (this.icon !== null && !iconposition.includes(this.iconposition))
            this.iconposition = "start";
        this.childEl = this.href
            ? "a"
            : this.appearance === "inline"
                ? "span"
                : "button";
    }
    componentWillLoad() {
        if (Build.isBrowser) {
            this.hasText = this.el.textContent.length > 0;
            const elType = this.el.getAttribute("type");
            this.type = this.childEl === "button" && elType ? elType : "submit";
        }
    }
    render() {
        const dir = getElementDir(this.el);
        const attributes = this.getAttributes();
        const Tag = this.childEl;
        const role = this.childEl === "span" ? "button" : null;
        const tabIndex = this.childEl === "span" ? 0 : null;
        const loader = (h("div", { class: "calcite-button--loader" },
            h("calcite-loader", { "is-active": true, inline: true })));
        const icon = (h("svg", { class: "calcite-button--icon", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
            h("path", { d: this.icon })));
        return (h(Host, { dir: dir, hasText: this.hasText },
            h(Tag, Object.assign({}, attributes, { role: role, tabindex: tabIndex, onClick: e => this.handleClick(e), disabled: this.disabled }),
                this.icon && this.iconposition === "start" ? icon : null,
                this.loading ? loader : null,
                h("slot", null),
                this.icon && this.iconposition === "end" ? icon : null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getAttributes() {
        // spread attributes from the component to rendered child, filtering out props
        let props = [
            "appearance",
            "color",
            "dir",
            "hasText",
            "icon",
            "iconposition",
            "id",
            "loading",
            "scale",
            "width",
            "theme"
        ];
        return Array.from(this.el.attributes)
            .filter(a => a && !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
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
                "text": "optionally add a calcite-loader component to the button, disabling interaction."
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
                "text": "optionally pass icon path data - pass only raw path data from calcite ui helper"
            },
            "attribute": "icon",
            "reflect": true
        },
        "iconposition": {
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
            "attribute": "iconposition",
            "reflect": true,
            "defaultValue": "\"start\""
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
                "text": "is the button disabled"
            },
            "attribute": "disabled",
            "reflect": true
        },
        "hasText": {
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
                "text": "hastext prop for spacing icon when text is present in slot"
            },
            "attribute": "has-text",
            "reflect": false,
            "defaultValue": "false"
        },
        "childEl": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"a\" | \"span\" | \"button\"",
                "resolved": "\"a\" | \"button\" | \"span\"",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "keep track of the rendered child type -"
            },
            "attribute": "child-el",
            "reflect": false,
            "defaultValue": "\"button\""
        }
    }; }
    static get elementRef() { return "el"; }
}
