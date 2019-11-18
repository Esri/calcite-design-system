import { Host, h } from "@stencil/core";
import { CSS } from "./resources";
import { getPlacement } from "../../utils/popper";
import Popper from "popper.js";
import { x16 } from "@esri/calcite-ui-icons";
import CalciteIcon from "../../utils/CalciteIcon";
import { guid } from "../../utils/guid";
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
         * Makes the popover flow toward the inner of the reference element.
         */
        this.flowInner = false;
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
        /**
         * Offset the position of the popover in the horizontal direction.
         */
        this.xOffset = 0;
        /**
         * Offset the position of the popover in the vertical direction.
         */
        this.yOffset = 0;
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
    openHandler(open) {
        if (open) {
            this.reposition();
        }
        else {
            this.destroyPopper();
        }
    }
    placementHandler() {
        this.destroyPopper();
        this.reposition();
    }
    referenceElementHandler() {
        this.removeReferenceListener();
        this._referenceElement = this.getReferenceElement();
        this.addReferenceListener();
        this.addReferenceAria();
        this.destroyPopper();
        this.reposition();
    }
    xOffsetHandler() {
        this.destroyPopper();
        this.reposition();
    }
    yOffsetHandler() {
        this.destroyPopper();
        this.reposition();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentDidLoad() {
        this.reposition();
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
        const { popper } = this;
        popper ? this.updatePopper(popper) : this.createPopper();
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
        const verticalRE = /top|bottom/gi;
        const autoRE = /auto/gi;
        const { disableFlip, flowInner, placement, xOffset, yOffset } = this;
        const offsetEnabled = !!(yOffset || xOffset) && !autoRE.test(placement);
        const offsets = [yOffset, xOffset];
        if (verticalRE.test(placement)) {
            offsets.reverse();
        }
        return {
            preventOverflow: {
                enabled: false
            },
            flip: {
                enabled: !disableFlip
            },
            hide: {
                enabled: false
            },
            inner: {
                enabled: flowInner
            },
            offset: {
                enabled: !!offsetEnabled,
                offset: offsets.join(",")
            }
        };
    }
    createPopper() {
        const { el, open, placement, _referenceElement } = this;
        if (!_referenceElement || !open) {
            return;
        }
        const newPopper = new Popper(_referenceElement, el, {
            eventsEnabled: false,
            placement: getPlacement(el, placement),
            modifiers: this.getModifiers()
        });
        window.addEventListener("resize", newPopper.scheduleUpdate, {
            passive: true
        });
        this.popper = newPopper;
    }
    updatePopper(popper) {
        popper.options.placement = getPlacement(this.el, this.placement);
        popper.options.modifiers = Object.assign(Object.assign({}, popper.options.modifiers), this.getModifiers());
        popper.scheduleUpdate();
    }
    destroyPopper() {
        const { popper } = this;
        if (popper) {
            window.removeEventListener("resize", popper.scheduleUpdate);
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
        return closeButton ? (h("button", { "aria-label": textClose, title: textClose, class: { [CSS.closeButton]: true }, onClick: this.hide },
            h(CalciteIcon, { size: "16", path: x16 }))) : null;
    }
    render() {
        const { _referenceElement, open, disablePointer } = this;
        const displayed = _referenceElement && open;
        return (h(Host, { role: "dialog", "aria-hidden": !displayed ? "true" : "false", id: this.getId() },
            h("div", { class: {
                    [CSS.container]: true,
                    [CSS.containerOpen]: displayed,
                    [CSS.containerPointer]: !disablePointer
                } },
                h("div", { class: CSS.contentContainer },
                    this.renderImage(),
                    h("div", { class: CSS.content },
                        h("slot", null),
                        this.renderCloseButton())))));
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
        "flowInner": {
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
                "text": "Makes the popover flow toward the inner of the reference element."
            },
            "attribute": "flow-inner",
            "reflect": true,
            "defaultValue": "false"
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
                "resolved": "\"auto-start\" | \"auto\" | \"auto-end\" | \"top-start\" | \"top\" | \"top-end\" | \"right-start\" | \"right\" | \"right-end\" | \"bottom-end\" | \"bottom\" | \"bottom-start\" | \"left-end\" | \"left\" | \"left-start\" | \"leading-start\" | \"leading\" | \"leading-end\" | \"trailing-end\" | \"trailing\" | \"trailing-start\"",
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
        },
        "xOffset": {
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
                "text": "Offset the position of the popover in the horizontal direction."
            },
            "attribute": "x-offset",
            "reflect": true,
            "defaultValue": "0"
        },
        "yOffset": {
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
                "text": "Offset the position of the popover in the vertical direction."
            },
            "attribute": "y-offset",
            "reflect": true,
            "defaultValue": "0"
        }
    }; }
    static get states() { return {
        "_referenceElement": {}
    }; }
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
            "propName": "open",
            "methodName": "openHandler"
        }, {
            "propName": "placement",
            "methodName": "placementHandler"
        }, {
            "propName": "referenceElement",
            "methodName": "referenceElementHandler"
        }, {
            "propName": "xOffset",
            "methodName": "xOffsetHandler"
        }, {
            "propName": "yOffset",
            "methodName": "yOffsetHandler"
        }]; }
}
