import { Component, Element, Host, h, Prop } from "@stencil/core";
import { TOOLTIP_REFERENCE } from "../calcite-tooltip/resources";
import { getDescribedByElement } from "../../utils/dom";
export class CalciteTooltipManager {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * CSS Selector to match reference elements for tooltips.
         */
        this.selector = `[${TOOLTIP_REFERENCE}]`;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.toggle = (event, value = true) => {
            const target = event.target;
            const describedByElement = target && target.matches(this.selector) && getDescribedByElement(target);
            if (describedByElement) {
                describedByElement.open = value;
            }
        };
        this.show = (event) => {
            this.toggle(event, true);
        };
        this.hide = (event) => {
            this.toggle(event, false);
        };
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentDidLoad() {
        const { el } = this;
        el.addEventListener("mouseenter", this.show, true);
        el.addEventListener("mouseleave", this.hide, true);
        el.addEventListener("focus", this.show, true);
        el.addEventListener("blur", this.hide, true);
    }
    componentDidUnload() {
        const { el } = this;
        el.removeEventListener("mouseenter", this.show, true);
        el.removeEventListener("mouseleave", this.hide, true);
        el.removeEventListener("focus", this.show, true);
        el.removeEventListener("blur", this.hide, true);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return h(Host, null);
    }
    static get is() { return "calcite-tooltip-manager"; }
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
                "text": "CSS Selector to match reference elements for tooltips."
            },
            "attribute": "selector",
            "reflect": false,
            "defaultValue": "`[${TOOLTIP_REFERENCE}]`"
        }
    }; }
    static get elementRef() { return "el"; }
}
