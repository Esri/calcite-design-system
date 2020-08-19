import { Component, Element, Host, h, Listen, Prop } from "@stencil/core";
import { POPOVER_REFERENCE } from "../calcite-popover/resources";
import { getDescribedByElement } from "../../utils/dom";
export class CalcitePopoverManager {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * CSS Selector to match reference elements for popovers.
         */
        this.selector = `[${POPOVER_REFERENCE}]`;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return h(Host, null);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    closeOpenPopovers(event) {
        const target = event.target;
        const { autoClose, el, selector } = this;
        const popoverSelector = "calcite-popover";
        const isTargetInsidePopover = target.closest(popoverSelector);
        const describedByElement = getDescribedByElement(target.closest(selector));
        if (autoClose && !isTargetInsidePopover) {
            Array.from(document.body.querySelectorAll(popoverSelector))
                .filter((popover) => popover.open && popover !== describedByElement)
                .forEach((popover) => popover.toggle(false));
        }
        if (!el.contains(target)) {
            return;
        }
        if (describedByElement) {
            describedByElement.toggle();
        }
    }
    static get is() { return "calcite-popover-manager"; }
    static get properties() { return {
        "selector": {
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
                "text": "CSS Selector to match reference elements for popovers."
            },
            "attribute": "selector",
            "reflect": false,
            "defaultValue": "`[${POPOVER_REFERENCE}]`"
        },
        "autoClose": {
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
                "text": "Automatically close popovers when clicking outside of them."
            },
            "attribute": "auto-close",
            "reflect": true
        }
    }; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "click",
            "method": "closeOpenPopovers",
            "target": "window",
            "capture": true,
            "passive": false
        }]; }
}
