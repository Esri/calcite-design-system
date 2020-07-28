import { Component, Host, h, Listen, Prop } from "@stencil/core";
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
            const { selector } = this;
            const describedByElement = getDescribedByElement(target.closest(selector));
            if (describedByElement) {
                describedByElement.open = value;
            }
        };
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
    mouseEnterShow(event) {
        this.toggle(event, true);
    }
    mouseLeaveHide(event) {
        this.toggle(event, false);
    }
    focusShow(event) {
        this.toggle(event, true);
    }
    blurHide(event) {
        this.toggle(event, false);
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
    static get listeners() { return [{
            "name": "mouseenter",
            "method": "mouseEnterShow",
            "target": undefined,
            "capture": true,
            "passive": true
        }, {
            "name": "mouseleave",
            "method": "mouseLeaveHide",
            "target": undefined,
            "capture": true,
            "passive": true
        }, {
            "name": "focus",
            "method": "focusShow",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "blur",
            "method": "blurHide",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
