import { Component, Element, Prop, Host, Event, Listen, h, Method, State, Watch } from "@stencil/core";
import { queryShadowRoot, isHidden, isFocusable } from "@a11y/focus-trap";
import { getElementDir } from "../../utils/dom";
import { getKey } from "../../utils/key";
export class CalciteModal {
    constructor() {
        /** Optionally pass a function to run before close */
        this.beforeClose = () => Promise.resolve();
        /** Aria label for the close button */
        this.intlClose = "Close";
        /** specify the scale of modal, defaults to m */
        this.scale = "m";
        /** Set the width of the modal. Can use stock sizes or pass a number (in pixels) */
        this.width = "m";
        /** Background color of modal content */
        this.backgroundColor = "white";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        // when modal initially renders, if active was set we need to open as watcher doesn't fire
        if (this.active) {
            this.open();
        }
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, role: "dialog", "aria-modal": "true", "is-active": this.isActive },
            h("calcite-scrim", { class: "scrim", theme: "dark" }),
            this.renderStyle(),
            h("div", { class: "modal" },
                h("div", { "data-focus-fence": "true", tabindex: "0", onFocus: this.focusLastElement.bind(this) }),
                h("div", { class: "modal__header" },
                    this.renderCloseButton(),
                    h("header", { class: "modal__title" },
                        h("slot", { name: "header" }))),
                h("div", { class: {
                        modal__content: true,
                        "modal__content--spaced": !this.noPadding
                    }, ref: (el) => (this.modalContent = el) },
                    h("slot", { name: "content" })),
                h("div", { class: "modal__footer" },
                    h("span", { class: "modal__back" },
                        h("slot", { name: "back" })),
                    h("span", { class: "modal__secondary" },
                        h("slot", { name: "secondary" })),
                    h("span", { class: "modal__primary" },
                        h("slot", { name: "primary" }))),
                h("div", { "data-focus-fence": "true", tabindex: "0", onFocus: this.focusFirstElement.bind(this) }))));
    }
    renderCloseButton() {
        return !this.disableCloseButton ? (h("button", { class: "modal__close", "aria-label": this.intlClose, title: this.intlClose, ref: (el) => (this.closeButtonEl = el), onClick: () => this.close() },
            h("calcite-icon", { icon: "x", scale: "l" }))) : null;
    }
    renderStyle() {
        const hasCustomWidth = !isNaN(parseInt(`${this.width}`));
        return hasCustomWidth ? (h("style", null, `
        .modal {
          max-width: ${this.width}px;
        }
        @media screen and (max-width: ${this.width}px) {
          .modal {
            height: 100%;
            max-height: 100%;
            width: 100%;
            max-width: 100%;
            margin: 0;
            border-radius: 0;
          }
          .modal__content {
            flex: 1 1 auto;
            max-height: unset;
          }
          .modal__header,
          .modal__footer {
            flex: inherit;
          }
        }
      `)) : null;
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleEscape(e) {
        if (this.active && !this.disableEscape && getKey(e.key) === "Escape") {
            this.beforeClose(this.el).then(() => {
                this.active = false;
            });
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Focus first interactive element */
    async focusElement(el) {
        var _a;
        if (el) {
            el.focus();
            return;
        }
        const focusableElements = queryShadowRoot(this.el, isHidden, isFocusable);
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
        else {
            (_a = this.closeButtonEl) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }
    /** Set the scroll top of the modal content */
    async scrollContent(top = 0, left = 0) {
        if (this.modalContent) {
            if (this.modalContent.scrollTo) {
                this.modalContent.scrollTo({ top, left, behavior: "smooth" });
            }
            else {
                this.modalContent.scrollTop = top;
                this.modalContent.scrollLeft = left;
            }
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    async toggleModal(value, oldValue) {
        if (value !== oldValue) {
            if (value) {
                this.open();
            }
            else if (!value) {
                this.close();
            }
        }
    }
    /** Open the modal */
    open() {
        this.previousActiveElement = document.activeElement;
        this.isActive = true;
        // wait for the modal to open, then handle focus.
        setTimeout(() => {
            this.focusElement(this.firstFocus);
            this.calciteModalOpen.emit();
        }, 300);
        document.documentElement.classList.add("overflow-hidden");
    }
    /** Close the modal, first running the `beforeClose` method */
    close() {
        return this.beforeClose(this.el).then(() => {
            var _a;
            this.isActive = false;
            (_a = this.previousActiveElement) === null || _a === void 0 ? void 0 : _a.focus();
            document.documentElement.classList.remove("overflow-hidden");
            setTimeout(() => this.calciteModalClose.emit(), 300);
        });
    }
    focusFirstElement() {
        var _a;
        (_a = this.closeButtonEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
    focusLastElement() {
        var _a;
        const focusableElements = queryShadowRoot(this.el, isHidden, isFocusable).filter((el) => !el.getAttribute("data-focus-fence"));
        if (focusableElements.length > 0) {
            focusableElements[focusableElements.length - 1].focus();
        }
        else {
            (_a = this.closeButtonEl) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }
    static get is() { return "calcite-modal"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-modal.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-modal.css"]
    }; }
    static get properties() { return {
        "active": {
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
                "text": "Add the active attribute to open the modal"
            },
            "attribute": "active",
            "reflect": false
        },
        "beforeClose": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "(el: HTMLElement) => Promise<void>",
                "resolved": "(el: HTMLElement) => Promise<void>",
                "references": {
                    "HTMLElement": {
                        "location": "global"
                    },
                    "Promise": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Optionally pass a function to run before close"
            },
            "defaultValue": "() => Promise.resolve()"
        },
        "disableCloseButton": {
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
                "text": "Disables the display a close button within the Modal"
            },
            "attribute": "disable-close-button",
            "reflect": false
        },
        "intlClose": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Aria label for the close button"
            },
            "attribute": "intl-close",
            "reflect": false,
            "defaultValue": "\"Close\""
        },
        "docked": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Prevent the modal from taking up the entire screen on mobile"
            },
            "attribute": "docked",
            "reflect": true
        },
        "firstFocus": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLElement",
                "resolved": "HTMLElement",
                "references": {
                    "HTMLElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Specify an element to focus when the modal is first opened"
            }
        },
        "disableEscape": {
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
                "text": "Flag to disable the default close on escape behavior"
            },
            "attribute": "disable-escape",
            "reflect": false
        },
        "scale": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"s\" | \"m\" | \"l\"",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the scale of modal, defaults to m"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "width": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "\"s\" | \"m\" | \"l\" | number",
                "resolved": "\"l\" | \"m\" | \"s\" | number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set the width of the modal. Can use stock sizes or pass a number (in pixels)"
            },
            "attribute": "width",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "fullscreen": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set the modal to always be fullscreen (overrides width)"
            },
            "attribute": "fullscreen",
            "reflect": true
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
                "text": "Adds a color bar at the top for visual impact,\nUse color to add importance to destructive/workflow dialogs."
            },
            "attribute": "color",
            "reflect": true
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
            "reflect": true
        },
        "backgroundColor": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"white\" | \"grey\"",
                "resolved": "\"grey\" | \"white\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Background color of modal content"
            },
            "attribute": "background-color",
            "reflect": true,
            "defaultValue": "\"white\""
        },
        "noPadding": {
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
                "text": "Turn off spacing around the content area slot"
            },
            "attribute": "no-padding",
            "reflect": false
        }
    }; }
    static get states() { return {
        "isActive": {}
    }; }
    static get events() { return [{
            "method": "calciteModalOpen",
            "name": "calciteModalOpen",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Fired when the modal begins the open animation"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "calciteModalClose",
            "name": "calciteModalClose",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Fired when the modal begins the close animation"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "focusElement": {
            "complexType": {
                "signature": "(el?: HTMLElement) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Focus first interactive element",
                "tags": []
            }
        },
        "scrollContent": {
            "complexType": {
                "signature": "(top?: number, left?: number) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Set the scroll top of the modal content",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "active",
            "methodName": "toggleModal"
        }]; }
    static get listeners() { return [{
            "name": "keyup",
            "method": "handleEscape",
            "target": "window",
            "capture": false,
            "passive": false
        }]; }
}
