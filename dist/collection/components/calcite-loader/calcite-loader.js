import { h, Host } from "@stencil/core";
import { guid } from "../../utils/guid";
import { getElementDir } from "../../utils/dom";
export class CalciteLoader {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Show the loader
         */
        this.isActive = false;
        /**
         * Inline loaders are smaller and will appear to the left of the text
         */
        this.inline = false;
        /**
         * Use indeterminate if finding actual progress value is impossible
         */
        this.type = "indeterminate";
        /**
         * Percent complete of 100, only valid for determinate indicators
         */
        this.value = 0;
        /**
         * Text which should appear under the loading indicator (optional)
         */
        this.text = "";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /**
         * @internal
         */
        this.loaderBarOffsets = [0, 0, 0];
        /**
         * @internal
         */
        this.loaderBarRates = [1, 2.25, 3.5];
        /**
         * @internal
         */
        this.isEdge = false;
        /**
         * @internal
         */
        this.animationID = null;
        /**
         * @internal
         */
        this.guid = `calcite-loader-${guid()}`;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.isEdge = /Edge/.test(navigator.userAgent);
        if (this.isEdge) {
            this.updateOffset();
        }
    }
    componentDidUnload() {
        if (this.animationID) {
            window.cancelAnimationFrame(this.animationID);
        }
    }
    render() {
        const dir = getElementDir(this.el);
        const id = this.el.id || this.guid;
        const ariaAttributes = {
            "aria-valuenow": this.value,
            "aria-valuemin": 0,
            "aria-valuemax": 100
        };
        const size = this.inline ? 16 : 56;
        const viewbox = this.inline ? "0 0 16 16" : "0 0 56 56";
        const isDeterminate = this.type === "determinate";
        const styleProperties = {};
        if (this.isEdge) {
            styleProperties["--calcite-loader-offset"] = `${this.loaderBarOffsets[0]}%`;
            styleProperties["--calcite-loader-offset2"] = `${this.loaderBarOffsets[1]}%`;
            styleProperties["--calcite-loader-offset3"] = `${this.loaderBarOffsets[2]}%`;
        }
        const progress = {
            "--calcite-loader-progress": `${-400 - this.value * 4}%`
        };
        return (h(Host, Object.assign({ id: id, dir: dir, role: "progressbar" }, (this.type === "determinate" ? ariaAttributes : {}), { style: styleProperties }),
            h("svg", { viewBox: viewbox, class: "loader__square" },
                h("rect", { width: size, height: size })),
            h("svg", { viewBox: viewbox, class: "loader__square loader__square--2" },
                h("rect", { width: size, height: size })),
            h("svg", { viewBox: viewbox, class: "loader__square loader__square--3", style: isDeterminate ? progress : {} },
                h("rect", { width: size, height: size })),
            this.text ? h("div", { class: "loader__text" }, this.text) : "",
            this.value ? (h("div", { class: "loader__percentage" }, Math.floor(this.value))) : ("")));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     */
    updateOffset() {
        this.loaderBarOffsets = this.rotateLoaderBars(this.loaderBarOffsets);
        this.animationID = window.requestAnimationFrame(() => this.updateOffset());
    }
    /**
     * @internal
     */
    rotateLoaderBars(barOffsets) {
        return barOffsets.map((offset, i) => {
            if (offset > -400) {
                return offset - this.loaderBarRates[i];
            }
            else {
                return 0;
            }
        });
    }
    static get is() { return "calcite-loader"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-loader.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-loader.css"]
    }; }
    static get properties() { return {
        "isActive": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Show the loader"
            },
            "attribute": "is-active",
            "reflect": true,
            "defaultValue": "false"
        },
        "inline": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Inline loaders are smaller and will appear to the left of the text"
            },
            "attribute": "inline",
            "reflect": true,
            "defaultValue": "false"
        },
        "type": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"indeterminate\" | \"determinate\"",
                "resolved": "\"determinate\" | \"indeterminate\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Use indeterminate if finding actual progress value is impossible"
            },
            "attribute": "type",
            "reflect": true,
            "defaultValue": "\"indeterminate\""
        },
        "value": {
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
                "text": "Percent complete of 100, only valid for determinate indicators"
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "0"
        },
        "text": {
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
                "text": "Text which should appear under the loading indicator (optional)"
            },
            "attribute": "text",
            "reflect": false,
            "defaultValue": "\"\""
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
                "text": "Turn off spacing around the loader"
            },
            "attribute": "no-padding",
            "reflect": false
        }
    }; }
    static get states() { return {
        "loaderBarOffsets": {},
        "isEdge": {}
    }; }
    static get elementRef() { return "el"; }
}
