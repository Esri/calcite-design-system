import { Host, h } from "@stencil/core";
import { CSS } from "./resources";
import { defaultOffsetDistance, createPopper, updatePopper } from "../../utils/popper";
import { guid } from "../../utils/guid";
import { HOST_CSS } from "../../utils/dom";
/**
 * @slot image - A slot for adding an image. The image will appear above the other slot content.
 */
export class CalcitePopover {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Adds a click handler to the referenceElement to toggle open the Popover.
         */
        this.addClickHandle = false;
        /**
         * Display a close button within the Popover.
         */
        this.closeButton = false;
        /**
         * Prevents flipping the popover's placement when it starts to overlap its reference element.
         */
        this.disableFlip = false;
        /**
         * Removes the caret pointer.
         */
        this.disablePointer = false;
        /**
         * Offset the position of the popover away from the reference element.
         */
        this.offsetDistance = defaultOffsetDistance;
        /**
         * Offset the position of the popover along the reference element.
         */
        this.offsetSkidding = 0;
        /**
         * Display and position the component.
         */
        this.open = false;
        /**
         * Determines where the component will be positioned relative to the referenceElement.
         */
        this.placement = "auto";
        /** Text for close button. */
        this.textClose = "Close";
        /** Select theme (light or dark) */
        this.theme = "light";
        this._referenceElement = this.getReferenceElement();
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getId = () => {
            return this.el.id || `calcite-popover-${guid()}`;
        };
        this.addReferenceAria = () => {
            const { _referenceElement } = this;
            if (_referenceElement &&
                !_referenceElement.hasAttribute("aria-describedby")) {
                _referenceElement.setAttribute("aria-describedby", this.getId());
            }
        };
        this.clickHandler = () => {
            this.toggle();
        };
        this.addReferenceListener = () => {
            const { _referenceElement, addClickHandle } = this;
            if (!_referenceElement || !addClickHandle) {
                return;
            }
            _referenceElement.addEventListener("click", this.clickHandler);
        };
        this.removeReferenceListener = () => {
            const { _referenceElement } = this;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.removeEventListener("click", this.clickHandler);
        };
        this.hide = () => {
            this.open = false;
        };
    }
    interactionElementHandler() {
        this.removeReferenceListener();
        this.addReferenceListener();
    }
    offsetDistanceOffsetHandler() {
        this.reposition();
    }
    offsetSkiddingHandler() {
        this.reposition();
    }
    openHandler(open) {
        if (open) {
            this.createPopper();
            this.calcitePopoverOpen.emit();
        }
        else {
            this.destroyPopper();
            this.calcitePopoverClose.emit();
        }
    }
    placementHandler() {
        this.reposition();
    }
    referenceElementHandler() {
        this.removeReferenceListener();
        this._referenceElement = this.getReferenceElement();
        this.addReferenceListener();
        this.addReferenceAria();
        this.createPopper();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentDidLoad() {
        this.createPopper();
        this.addReferenceListener();
        this.addReferenceAria();
    }
    componentDidUnload() {
        this.removeReferenceListener();
        this.destroyPopper();
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    async reposition() {
        const { popper, el, placement } = this;
        const modifiers = this.getModifiers();
        popper
            ? updatePopper({
                el,
                modifiers,
                placement,
                popper
            })
            : this.createPopper();
    }
    async setFocus(focusId) {
        var _a, _b;
        if (focusId === "close-button") {
            (_a = this.closeButtonEl) === null || _a === void 0 ? void 0 : _a.focus();
            return;
        }
        (_b = this.el) === null || _b === void 0 ? void 0 : _b.focus();
    }
    async toggle() {
        this.open = !this.open;
    }
    getReferenceElement() {
        const { referenceElement } = this;
        return ((typeof referenceElement === "string"
            ? document.getElementById(referenceElement)
            : referenceElement) || null);
    }
    getModifiers() {
        const { arrowEl, flipPlacements, disableFlip, disablePointer, offsetDistance, offsetSkidding } = this;
        const flipModifier = {
            name: "flip",
            enabled: !disableFlip
        };
        if (flipPlacements) {
            flipModifier.options = {
                fallbackPlacements: flipPlacements
            };
        }
        const arrowModifier = {
            name: "arrow",
            enabled: !disablePointer
        };
        if (arrowEl) {
            arrowModifier.options = {
                element: arrowEl
            };
        }
        const offsetModifier = {
            name: "offset",
            enabled: true,
            options: {
                offset: [offsetSkidding, offsetDistance]
            }
        };
        return [arrowModifier, flipModifier, offsetModifier];
    }
    createPopper() {
        this.destroyPopper();
        const { el, open, placement, _referenceElement: referenceEl } = this;
        const modifiers = this.getModifiers();
        this.popper = createPopper({
            el,
            modifiers,
            open,
            placement,
            referenceEl
        });
    }
    destroyPopper() {
        const { popper } = this;
        if (popper) {
            popper.destroy();
        }
        this.popper = null;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderImage() {
        return this.el.querySelector("[slot=image]") ? (h("div", { class: CSS.imageContainer },
            h("slot", { name: "image" }))) : null;
    }
    renderCloseButton() {
        const { closeButton, textClose } = this;
        return closeButton ? (h("button", { ref: closeButtonEl => (this.closeButtonEl = closeButtonEl), "aria-label": textClose, title: textClose, class: { [CSS.closeButton]: true }, onClick: this.hide },
            h("calcite-icon", { icon: "x", scale: "s" }))) : null;
    }
    render() {
        const { _referenceElement, open, disablePointer } = this;
        const displayed = _referenceElement && open;
        const arrowNode = !disablePointer ? (h("div", { class: CSS.arrow, ref: arrowEl => (this.arrowEl = arrowEl) })) : null;
        return (h(Host, { role: "dialog", class: {
                [HOST_CSS.hydratedInvisible]: !displayed
            }, "aria-hidden": !displayed ? "true" : "false", id: this.getId() },
            arrowNode,
            h("div", { class: CSS.container },
                this.renderImage(),
                h("div", { class: CSS.content },
                    h("slot", null),
                    this.renderCloseButton()))));
    }
    static get is() { return "calcite-popover"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-popover.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-popover.css"]
    }; }
    static get properties() { return {
        "addClickHandle": {
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
                "text": "Adds a click handler to the referenceElement to toggle open the Popover."
            },
            "attribute": "add-click-handle",
            "reflect": true,
            "defaultValue": "false"
        },
        "closeButton": {
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
                "text": "Display a close button within the Popover."
            },
            "attribute": "close-button",
            "reflect": true,
            "defaultValue": "false"
        },
        "disableFlip": {
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
                "text": "Prevents flipping the popover's placement when it starts to overlap its reference element."
            },
            "attribute": "disable-flip",
            "reflect": true,
            "defaultValue": "false"
        },
        "disablePointer": {
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
                "text": "Removes the caret pointer."
            },
            "attribute": "disable-pointer",
            "reflect": true,
            "defaultValue": "false"
        },
        "flipPlacements": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Placement[]",
                "resolved": "Placement[]",
                "references": {
                    "Placement": {
                        "location": "import",
                        "path": "@popperjs/core"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Defines the available placements that can be used when a flip occurs."
            }
        },
        "offsetDistance": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Offset the position of the popover away from the reference element."
            },
            "attribute": "offset-distance",
            "reflect": true,
            "defaultValue": "defaultOffsetDistance"
        },
        "offsetSkidding": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Offset the position of the popover along the reference element."
            },
            "attribute": "offset-skidding",
            "reflect": true,
            "defaultValue": "0"
        },
        "open": {
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
                "text": "Display and position the component."
            },
            "attribute": "open",
            "reflect": true,
            "defaultValue": "false"
        },
        "placement": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "CalcitePlacement",
                "resolved": "\"auto\" | \"auto-start\" | \"auto-end\" | \"top\" | \"bottom\" | \"right\" | \"left\" | \"top-start\" | \"top-end\" | \"bottom-start\" | \"bottom-end\" | \"right-start\" | \"right-end\" | \"left-start\" | \"left-end\" | \"leading-start\" | \"leading\" | \"leading-end\" | \"trailing-end\" | \"trailing\" | \"trailing-start\"",
                "references": {
                    "CalcitePlacement": {
                        "location": "import",
                        "path": "../../utils/popper"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Determines where the component will be positioned relative to the referenceElement."
            },
            "attribute": "placement",
            "reflect": true,
            "defaultValue": "\"auto\""
        },
        "referenceElement": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "HTMLElement | string",
                "resolved": "HTMLElement | string",
                "references": {
                    "HTMLElement": {
                        "location": "global"
                    }
                }
            },
            "required": true,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Reference HTMLElement used to position this component according to the placement property."
            },
            "attribute": "reference-element",
            "reflect": false
        },
        "textClose": {
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
                "text": "Text for close button."
            },
            "attribute": "text-close",
            "reflect": false,
            "defaultValue": "\"Close\""
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
        }
    }; }
    static get states() { return {
        "_referenceElement": {}
    }; }
    static get events() { return [{
            "method": "calcitePopoverClose",
            "name": "calcitePopoverClose",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Fired when the popover is closed"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "calcitePopoverOpen",
            "name": "calcitePopoverOpen",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Fired when the popover is opened"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "reposition": {
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
        },
        "setFocus": {
            "complexType": {
                "signature": "(focusId?: \"close-button\") => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "FocusId": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "toggle": {
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
    static get watchers() { return [{
            "propName": "addClickHandle",
            "methodName": "interactionElementHandler"
        }, {
            "propName": "offsetDistance",
            "methodName": "offsetDistanceOffsetHandler"
        }, {
            "propName": "offsetSkidding",
            "methodName": "offsetSkiddingHandler"
        }, {
            "propName": "open",
            "methodName": "openHandler"
        }, {
            "propName": "placement",
            "methodName": "placementHandler"
        }, {
            "propName": "referenceElement",
            "methodName": "referenceElementHandler"
        }]; }
}
