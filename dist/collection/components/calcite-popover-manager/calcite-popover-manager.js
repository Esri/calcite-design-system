import { Component, Element, Host, h, Prop } from "@stencil/core";
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
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.toggle = (event) => {
            const target = event.target;
            const describedByElement = target && target.matches(this.selector) && getDescribedByElement(target);
            if (describedByElement) {
                describedByElement.toggle();
            }
        };
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentDidLoad() {
        const { el } = this;
        el.addEventListener("click", this.toggle, true);
    }
    componentDidUnload() {
        const { el } = this;
        el.removeEventListener("click", this.toggle, true);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return h(Host, null);
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
        }
    }; }
    static get elementRef() { return "el"; }
}
