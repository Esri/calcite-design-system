import { Component, Element, h, Host, Method, Prop, Build, State, } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
/** @slot default text slot for button text */
/** Any attributes placed on <calcite-button> component will propagate to the rendered child */
/** Passing a 'href' will render an anchor link, instead of a button. Role will be set to link, or button, depending on this. */
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
        /** specify the appearance style of the button, defaults to solid. */
        this.appearance = "solid";
        /** specify the scale of the button, defaults to m */
        this.scale = "m";
        /** specify the width of the button, defaults to auto */
        this.width = "auto";
        /** optionally add a calcite-loader component to the button, disabling interaction.  */
        this.loading = false;
        /** optionally add a round style to the button  */
        this.round = false;
        /** optionally add a floating style to the button - this should be positioned fixed or sticky */
        this.floating = false;
        /** the node type of the rendered child element */
        this.childElType = "button";
        /** determine if there is slotted text for styling purposes */
        this.hasText = false;
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        // act on a requested or nearby form based on type
        this.handleClick = (e) => {
            // this.type refers to type attribute, not child element type
            if (this.childElType === "button" && this.type !== "button") {
                const requestedForm = this.el.getAttribute("form");
                const targetForm = requestedForm
                    ? document.getElementsByName(`${requestedForm}`)[0]
                    : this.el.closest("form");
                if (targetForm) {
                    const targetFormSubmitFunction = targetForm.onsubmit;
                    switch (this.type) {
                        case "submit":
                            if (targetFormSubmitFunction)
                                targetFormSubmitFunction();
                            else if (targetForm.checkValidity())
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
        let appearance = ["solid", "outline", "clear", "transparent"];
        if (!appearance.includes(this.appearance))
            this.appearance = "solid";
        let color = ["blue", "red", "dark", "light"];
        if (!color.includes(this.color))
            this.color = "blue";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let width = ["auto", "half", "full"];
        if (!width.includes(this.width))
            this.width = "auto";
        this.childElType = this.href ? "a" : "button";
        this.setupTextContentObserver();
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    componentWillLoad() {
        if (Build.isBrowser) {
            this.updateHasText();
            const elType = this.el.getAttribute("type");
            this.type = this.childElType === "button" && elType ? elType : "submit";
        }
    }
    render() {
        const dir = getElementDir(this.el);
        const attributes = this.getAttributes();
        const Tag = this.childElType;
        const loader = (h("div", { class: "calcite-button--loader" },
            h("calcite-loader", { active: true, inline: true })));
        const iconScale = this.scale === "l" ? "m" : "s";
        const iconStartEl = (h("calcite-icon", { class: "calcite-button--icon icon-start", icon: this.iconStart, scale: iconScale }));
        const iconEndEl = (h("calcite-icon", { class: "calcite-button--icon icon-end", icon: this.iconEnd, scale: iconScale }));
        return (h(Host, { hasText: this.hasText, dir: dir },
            h(Tag, Object.assign({}, attributes, { onClick: (e) => this.handleClick(e), disabled: this.disabled, tabIndex: this.disabled ? -1 : null, ref: (el) => (this.childEl = el) }),
                this.loading ? loader : null,
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
    updateHasText() {
        this.hasText = this.el.textContent.trim().length > 0;
    }
    setupTextContentObserver() {
        if (Build.isBrowser) {
            this.observer = new MutationObserver(() => {
                this.updateHasText();
            });
            this.observer.observe(this.el, { childList: true, subtree: true });
        }
    }
    getAttributes() {
        // spread attributes from the component to rendered child, filtering out props
        let props = [
            "appearance",
            "color",
            "dir",
            "hasText",
            "icon-start",
            "icon-end",
            "id",
            "loading",
            "scale",
            "slot",
            "width",
            "theme",
        ];
        return Array.from(this.el.attributes)
            .filter((a) => a && !props.includes(a.name))
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
                "original": "| \"solid\"\n    | \"outline\"\n    | \"clear\"\n    | \"transparent\"",
                "resolved": "\"clear\" | \"outline\" | \"solid\" | \"transparent\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the appearance style of the button, defaults to solid."
            },
            "attribute": "appearance",
            "reflect": true,
            "defaultValue": "\"solid\""
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
        "round": {
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
                "text": "optionally add a round style to the button"
            },
            "attribute": "round",
            "reflect": true,
            "defaultValue": "false"
        },
        "floating": {
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
                "text": "optionally add a floating style to the button - this should be positioned fixed or sticky"
            },
            "attribute": "floating",
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
                "text": "is the button disabled"
            },
            "attribute": "disabled",
            "reflect": true
        }
    }; }
    static get states() { return {
        "hasText": {}
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
