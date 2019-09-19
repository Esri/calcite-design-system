import { Host, h } from "@stencil/core";
import { CSS } from "./resources";
import Popper from "popper.js";
export class CalcitePopover {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Display and position the component.
         */
        this.open = false;
        /**
         * Determines where the element will be positioned.
         * horizontal: Positioned to the left or right of the referenceElement.
         * vertical: Positioned above or below the referenceElement.
         */
        this.placement = "horizontal";
        /**
         * Offset the position of the popover in the horizontal direction.
         */
        this.xOffset = 0;
        /**
         * Offset the position of the popover in the vertical direction.
         */
        this.yOffset = 0;
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
        this.reposition();
    }
    referenceElementHandler() {
        this.destroyPopper();
        this.reposition();
    }
    xOffsetHandler() {
        this.reposition();
    }
    yOffsetHandler() {
        this.reposition();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentDidLoad() {
        this.reposition();
    }
    componentDidUnload() {
        this.destroyPopper();
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    async reposition() {
        const { el, placement: componentPlacement, open, popper, referenceElement, xOffset, yOffset } = this;
        const placement = componentPlacement === "vertical" ? "bottom-start" : "auto-start";
        const offsetEnabled = !!(yOffset || xOffset);
        const modifiers = {
            hide: {
                enabled: false
            },
            offset: {
                enabled: offsetEnabled,
                offset: `${yOffset}, ${xOffset}`
            },
            preventOverflow: {
                enabled: false
            }
        };
        if (popper) {
            popper.options.placement = placement;
            popper.options.modifiers = Object.assign({}, popper.options.modifiers, modifiers);
            popper.scheduleUpdate();
            return;
        }
        if (referenceElement && open) {
            const newPopper = new Popper(referenceElement, el, {
                eventsEnabled: false,
                placement,
                modifiers,
                onCreate: data => {
                    if (data.originalPlacement === "bottom-start" &&
                        document.body.clientWidth &&
                        data.offsets &&
                        data.offsets.reference &&
                        data.offsets.reference.left > document.body.clientWidth / 2) {
                        data.instance.options.placement = "bottom-end";
                        data.instance.scheduleUpdate();
                    }
                }
            });
            window.addEventListener("resize", newPopper.scheduleUpdate, {
                passive: true
            });
            this.popper = newPopper;
        }
    }
    async toggle() {
        this.open = !this.open;
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
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
    render() {
        return (h(Host, null,
            h("div", { class: {
                    [CSS.container]: true,
                    [CSS.containerOpen]: this.open
                } },
                h("slot", null))));
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
                "original": "\"horizontal\" | \"vertical\"",
                "resolved": "\"horizontal\" | \"vertical\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Determines where the element will be positioned.\nhorizontal: Positioned to the left or right of the referenceElement.\nvertical: Positioned above or below the referenceElement."
            },
            "attribute": "placement",
            "reflect": true,
            "defaultValue": "\"horizontal\""
        },
        "referenceElement": {
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Reference HTMLElement used to position this component according to the placement property."
            }
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
        "popper": {}
    }; }
    static get methods() { return {
        "reposition": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "Popper": {
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
