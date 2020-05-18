import { Component, Element, Prop, Host, Event, Listen, h, Method, State, } from "@stencil/core";
import { queryShadowRoot, isHidden, isFocusable } from "@a11y/focus-trap";
import { getElementDir } from "../../utils/dom";
import { getKey } from "../../utils/key";
export class CalciteModal {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Optionally pass a function to run before close */
        this.beforeClose = () => Promise.resolve();
        /** Aria label for the close button */
        this.closeLabel = "Close";
        /** Set the overall size of the modal */
        this.size = "small";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, role: "dialog", "aria-modal": "true", class: { "is-active": this.isActive } },
            h("calcite-scrim", { class: "scrim", theme: "dark" }),
            h("div", { class: "modal" },
                h("div", { "data-focus-fence": "true", tabindex: "0", onFocus: this.focusLastElement.bind(this) }),
                h("div", { class: "modal__header" },
                    h("button", { class: "modal__close", "aria-label": this.closeLabel, ref: (el) => (this.closeButton = el), onClick: () => this.close() },
                        h("calcite-icon", { icon: "x", scale: "l" })),
                    h("header", { class: "modal__title" },
                        h("slot", { name: "header" }))),
                h("div", { class: {
                        modal__content: true,
                        "modal__content--spaced": !this.noPadding,
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
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleEscape(e) {
        if (this.isActive && !this.disableEscape && getKey(e.key) === "Escape") {
            this.close();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Open the modal */
    async open() {
        this.previousActiveElement = document.activeElement;
        this.isActive = true;
        // wait for the modal to open, then handle focus.
        return new Promise((resolve) => {
            setTimeout(() => {
                this.focusElement(this.firstFocus);
                resolve(this.el);
            }, 300);
            document.documentElement.classList.add("overflow-hidden");
            this.calciteModalOpen.emit();
        });
    }
    /** Close the modal, first running the `beforeClose` method */
    async close() {
        return this.beforeClose(this.el).then(() => {
            this.isActive = false;
            this.previousActiveElement.focus();
            document.documentElement.classList.remove("overflow-hidden");
            this.calciteModalClose.emit();
            return new Promise((resolve) => {
                setTimeout(() => resolve(this.el), 300);
            });
        });
    }
    /** Focus first interactive element */
    async focusElement(el) {
        if (el) {
            el.focus();
            return;
        }
        const focusableElements = queryShadowRoot(this.el, isHidden, isFocusable);
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
        else {
            this.closeButton && this.closeButton.focus();
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
    focusFirstElement() {
        this.closeButton && this.closeButton.focus();
    }
    focusLastElement() {
        const focusableElements = queryShadowRoot(this.el, isHidden, isFocusable).filter((el) => !el.getAttribute("data-focus-fence"));
        if (focusableElements.length > 0) {
            focusableElements[focusableElements.length - 1].focus();
        }
        else {
            this.closeButton && this.closeButton.focus();
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
            "defaultValue": "() =>\n    Promise.resolve()"
        },
        "closeLabel": {
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
            "attribute": "close-label",
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
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"small\" | \"medium\" | \"large\" | \"fullscreen\"",
                "resolved": "\"fullscreen\" | \"large\" | \"medium\" | \"small\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set the overall size of the modal"
            },
            "attribute": "size",
            "reflect": true,
            "defaultValue": "\"small\""
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
                "text": "Adds a color bar at the top for visual impact,\nUse color to add importance to desctructive/workflow dialogs."
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
        "open": {
            "complexType": {
                "signature": "() => Promise<HTMLElement>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<HTMLElement>"
            },
            "docs": {
                "text": "Open the modal",
                "tags": []
            }
        },
        "close": {
            "complexType": {
                "signature": "() => Promise<HTMLElement>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<HTMLElement>"
            },
            "docs": {
                "text": "Close the modal, first running the `beforeClose` method",
                "tags": []
            }
        },
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
    static get listeners() { return [{
            "name": "keyup",
            "method": "handleEscape",
            "target": "window",
            "capture": false,
            "passive": false
        }]; }
}
