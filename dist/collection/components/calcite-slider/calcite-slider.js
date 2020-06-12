import { Component, Element, Prop, Host, Event, Listen, Method, h, State, } from "@stencil/core";
import { guid } from "../../utils/guid";
import { getKey } from "../../utils/key";
export class CalciteSlider {
    constructor() {
        /** Disable and gray out the slider */
        this.disabled = false;
        /** Minimum selectable value */
        this.min = 0;
        /** Maximum selectable value */
        this.max = 100;
        /** Currently selected number (if single select) */
        this.value = null;
        /** Snap selection along the step interval */
        this.snap = true;
        /** Interval to move on up/down keys */
        this.step = 1;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** @internal */
        this.guid = `calcite-slider-${guid()}`;
        /** @internal */
        this.isRange = false;
        /** @internal */
        this.tickValues = [];
        /** @internal */
        this.activeProp = "value";
        /** @internal */
        this.minMaxValueRange = null;
        /** @internal */
        this.minValueDragRange = null;
        /** @internal */
        this.maxValueDragRange = null;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.isRange = !!(this.maxValue || this.maxValue === 0);
        this.tickValues = this.generateTickValues();
        this.value = this.bound(this.value);
        if (this.snap) {
            this.value = this.getClosestStep(this.value);
        }
        this.calciteSliderUpdate.emit();
    }
    render() {
        const id = this.el.id || this.guid;
        const min = this.minValue || this.min;
        const max = this.maxValue || this.value;
        const maxProp = this.isRange ? "maxValue" : "value";
        const left = `${this.getUnitInterval(min) * 100}%`;
        const right = `${100 - this.getUnitInterval(max) * 100}%`;
        return (h(Host, { id: id, "is-range": this.isRange },
            this.renderGraph(),
            h("div", { class: "track" },
                h("div", { class: "track__range", onMouseDown: () => this.dragStart("minMaxValue"), onTouchStart: (e) => this.dragStart("minMaxValue", e), style: { left, right } }),
                h("div", { class: "ticks" }, this.tickValues.map((number) => (h("span", { class: {
                        tick: true,
                        "tick--active": number >= min && number <= max,
                    }, style: {
                        left: `${this.getUnitInterval(number) * 100}%`,
                    } }, this.labelTicks ? (h("span", { class: {
                        tick__label: true,
                        "tick__label--min": number === this.min,
                        "tick__label--max": number === this.max,
                    } }, number)) : ("")))))),
            this.isRange ? (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                    thumb: true,
                    "thumb--min": true,
                    "thumb--active": this.dragProp === "minValue",
                    "thumb--precise": this.precise,
                } },
                h("span", { class: "handle" }),
                this.labelHandles ? (h("span", { class: "handle__label", "aria-hidden": "true" }, this.minValue)) : (""))) : (""),
            h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": this[maxProp], "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                    thumb: true,
                    "thumb--max": true,
                    "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                    "thumb--precise": this.precise,
                } },
                h("span", { class: "handle" }),
                this.labelHandles ? (h("span", { class: "handle__label", "aria-hidden": "true" }, this[maxProp])) : (""))));
    }
    renderGraph() {
        return this.histogram ? (h("div", { class: "graph" },
            h("calcite-graph", { width: 300, height: 48, data: this.histogram, highlightMin: this.isRange ? this.minValue : null, highlightMax: this.isRange ? this.maxValue : null }))) : null;
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    keyDownHandler(e) {
        const value = this[this.activeProp];
        switch (getKey(e.key)) {
            case "ArrowUp":
            case "ArrowRight":
                e.preventDefault();
                this[this.activeProp] = this.bound(value + this.step, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
            case "ArrowDown":
            case "ArrowLeft":
                e.preventDefault();
                this[this.activeProp] = this.bound(value - this.step, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
            case "PageUp":
                if (this.pageStep) {
                    e.preventDefault();
                    this[this.activeProp] = this.bound(value + this.pageStep, this.activeProp);
                    this.calciteSliderUpdate.emit();
                }
                break;
            case "PageDown":
                if (this.pageStep) {
                    e.preventDefault();
                    this[this.activeProp] = this.bound(value - this.pageStep, this.activeProp);
                    this.calciteSliderUpdate.emit();
                }
                break;
            case "Home":
                e.preventDefault();
                this[this.activeProp] = this.bound(this.min, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
            case "End":
                e.preventDefault();
                this[this.activeProp] = this.bound(this.max, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
        }
    }
    clickHandler(e) {
        const x = e.clientX || e.pageX;
        const num = this.translate(x);
        let prop = "value";
        if (this.isRange) {
            if (this.lastDragProp === "minMaxValue") {
                prop = "minMaxValue";
            }
            else {
                const closerToMax = Math.abs(this.maxValue - num) < Math.abs(this.minValue - num);
                prop = closerToMax ? "maxValue" : "minValue";
            }
        }
        this[prop] = this.bound(num, prop);
        this.calciteSliderUpdate.emit();
        switch (prop) {
            default:
            case "maxValue":
                this.maxHandle.focus();
                break;
            case "minValue":
                this.minHandle.focus();
                break;
            case "minMaxValue":
                break;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    async setFocus() {
        const handle = this.minHandle ? this.minHandle : this.maxHandle;
        handle.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    generateTickValues() {
        const ticks = [];
        let current = this.min;
        while (this.ticks && current < this.max + this.ticks) {
            ticks.push(current);
            current = current + this.ticks;
        }
        return ticks;
    }
    dragStart(prop, e) {
        if (e) {
            e.preventDefault();
        }
        if (this.dragListener) {
            this.dragEnd();
        }
        this.dragProp = prop;
        this.lastDragProp = this.dragProp;
        this.activeProp = prop;
        this.dragListener = this.dragListener || this.dragUpdate.bind(this);
        document.addEventListener("mousemove", this.dragListener);
        document.addEventListener("touchmove", this.dragListener, {
            capture: false,
        });
        document.addEventListener("mouseup", this.dragEnd.bind(this));
        document.addEventListener("touchend", this.dragEnd.bind(this), false);
        document.addEventListener("touchcancel", this.dragEnd.bind(this));
    }
    dragUpdate(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.dragProp) {
            const value = this.translate(e.clientX || e.pageX);
            if (this.isRange && this.dragProp === "minMaxValue") {
                if (this.minValueDragRange &&
                    this.maxValueDragRange &&
                    this.minMaxValueRange) {
                    const newMinValue = value - this.minValueDragRange;
                    const newMaxValue = value + this.maxValueDragRange;
                    if (newMaxValue <= this.max &&
                        newMinValue >= this.min &&
                        newMaxValue - newMinValue === this.minMaxValueRange) {
                        this.minValue = this.bound(newMinValue, "minValue");
                        this.maxValue = this.bound(newMaxValue, "maxValue");
                    }
                }
                else {
                    this.minValueDragRange = value - this.minValue;
                    this.maxValueDragRange = this.maxValue - value;
                    this.minMaxValueRange = this.maxValue - this.minValue;
                }
            }
            else {
                this[this.dragProp] = this.bound(value, this.dragProp);
            }
            this.calciteSliderUpdate.emit();
        }
    }
    dragEnd() {
        this.dragProp = null;
        document.removeEventListener("mousemove", this.dragListener);
        document.removeEventListener("touchmove", this.dragListener);
        this.minValueDragRange = null;
        this.maxValueDragRange = null;
        this.minMaxValueRange = null;
    }
    /**
     * If number is outside range, constrain to min or max
     * @internal
     */
    bound(num, prop) {
        num = Math.min(num, this.max);
        num = Math.max(num, this.min);
        // ensure that maxValue and minValue don't swap positions
        if (prop === "maxValue") {
            num = Math.max(num, this.minValue);
        }
        if (prop === "minValue") {
            num = Math.min(num, this.maxValue);
        }
        return num;
    }
    /**
     * Translate a pixel position to value along the range
     * @internal
     */
    translate(x) {
        const range = this.max - this.min;
        const { left, width } = this.el.getBoundingClientRect();
        const percent = (x - left) / width;
        let value = this.bound(this.min + range * percent);
        if (this.snap && this.step) {
            value = this.getClosestStep(value);
        }
        return value;
    }
    /**
     * Get closest allowed value along stepped values
     * @internal
     */
    getClosestStep(num) {
        num = this.bound(num);
        if (this.step) {
            const step = Math.round(num / this.step) * this.step;
            num = this.bound(step);
        }
        return num;
    }
    /**
     * Get position of value along range as fractional value
     * @return {number} number in the unit interval [0,1]
     * @internal
     */
    getUnitInterval(num) {
        num = this.bound(num);
        const range = this.max - this.min;
        return (num - this.min) / range;
    }
    static get is() { return "calcite-slider"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-slider.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-slider.css"]
    }; }
    static get properties() { return {
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
        "disabled": {
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
                "text": "Disable and gray out the slider"
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
        },
        "min": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Minimum selectable value"
            },
            "attribute": "min",
            "reflect": true,
            "defaultValue": "0"
        },
        "max": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Maximum selectable value"
            },
            "attribute": "max",
            "reflect": true,
            "defaultValue": "100"
        },
        "value": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "null | number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Currently selected number (if single select)"
            },
            "attribute": "value",
            "reflect": true,
            "defaultValue": "null"
        },
        "minValue": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Currently selected lower number (if multi-select)"
            },
            "attribute": "min-value",
            "reflect": false
        },
        "maxValue": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Currently selected upper number (if multi-select)"
            },
            "attribute": "max-value",
            "reflect": false
        },
        "minLabel": {
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
                "text": "Label for first (or only) handle (ex. \"Temperature, lower bound\")"
            },
            "attribute": "min-label",
            "reflect": false
        },
        "maxLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Label for second handle if needed (ex. \"Temperature, upper bound\")"
            },
            "attribute": "max-label",
            "reflect": false
        },
        "snap": {
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
                "text": "Snap selection along the step interval"
            },
            "attribute": "snap",
            "reflect": false,
            "defaultValue": "true"
        },
        "step": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Interval to move on up/down keys"
            },
            "attribute": "step",
            "reflect": false,
            "defaultValue": "1"
        },
        "pageStep": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Interval to move on page up/page down keys"
            },
            "attribute": "page-step",
            "reflect": false
        },
        "ticks": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Show tick marks on the number line at provided interval"
            },
            "attribute": "ticks",
            "reflect": false
        },
        "labelTicks": {
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
                "text": "Label tick marks with their numeric value."
            },
            "attribute": "label-ticks",
            "reflect": true
        },
        "labelHandles": {
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
                "text": "Label handles with their numeric value"
            },
            "attribute": "label-handles",
            "reflect": true
        },
        "precise": {
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
                "text": "Use finer point for handles"
            },
            "attribute": "precise",
            "reflect": false
        },
        "histogram": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "DataSeries",
                "resolved": "Point[]",
                "references": {
                    "DataSeries": {
                        "location": "import",
                        "path": "../../interfaces/Graph"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Display a histogram above the slider"
            }
        }
    }; }
    static get states() { return {
        "tickValues": {},
        "activeProp": {},
        "minMaxValueRange": {},
        "minValueDragRange": {},
        "maxValueDragRange": {}
    }; }
    static get events() { return [{
            "method": "calciteSliderUpdate",
            "name": "calciteSliderUpdate",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Fires on all updates to the slider.\n:warning: Will be fired frequently during drag. If you are performing any\nexpensive operations consider using a debounce or throttle to avoid\nlocking up the main thread."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "setFocus": {
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
    static get listeners() { return [{
            "name": "keydown",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "clickHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
