import { Component, Element, Prop, Host, Event, Listen, Method, h, State, Watch, } from "@stencil/core";
import { guid } from "../../utils/guid";
import { getKey } from "../../utils/key";
import { hasLabel } from "../../utils/dom";
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
        /** Indicates if a histogram is present */
        this.hasHistogram = false;
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
    histogramWatcher(newHistogram) {
        this.hasHistogram = newHistogram ? true : false;
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
        if (this.histogram) {
            this.hasHistogram = true;
        }
        this.calciteSliderUpdate.emit();
    }
    componentDidRender() {
        if (this.labelHandles) {
            this.adjustHostObscuredHandleLabel("value");
            if (this.isRange) {
                this.adjustHostObscuredHandleLabel("minValue");
                if (!(this.precise && this.isRange && !this.hasHistogram)) {
                    this.hyphenateCollidingRangeHandleLabels();
                }
            }
        }
        this.hideObscuredBoundingTickLabels();
    }
    render() {
        const id = this.el.id || this.guid;
        const min = this.minValue || this.min;
        const max = this.maxValue || this.value;
        const maxProp = this.isRange ? "maxValue" : "value";
        const value = this[maxProp];
        const left = `${this.getUnitInterval(min) * 100}%`;
        const right = `${100 - this.getUnitInterval(max) * 100}%`;
        const handle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
            } },
            h("div", { class: "handle" })));
        const labeledHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
            } },
            h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value),
            h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value),
            h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value),
            h("div", { class: "handle" })));
        const histogramLabeledHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
            } },
            h("div", { class: "handle" }),
            h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value),
            h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value),
            h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value)));
        const preciseHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } },
            h("div", { class: "handle" }),
            h("div", { class: "handle-extension" })));
        const histogramPreciseHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } },
            h("div", { class: "handle-extension" }),
            h("div", { class: "handle" })));
        const labeledPreciseHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } },
            h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value),
            h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value),
            h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value),
            h("div", { class: "handle" }),
            h("div", { class: "handle-extension" })));
        const histogramLabeledPreciseHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } },
            h("div", { class: "handle-extension" }),
            h("div", { class: "handle" }),
            h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value),
            h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value),
            h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value)));
        const minHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
            } },
            h("div", { class: "handle" })));
        const minLabeledHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
            } },
            h("span", { class: "handle__label handle__label--minValue", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()),
            h("span", { class: "handle__label handle__label--minValue static", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()),
            h("span", { class: "handle__label handle__label--minValue transformed", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()),
            h("div", { class: "handle" })));
        const minHistogramLabeledHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
            } },
            h("div", { class: "handle" }),
            h("span", { class: "handle__label handle__label--minValue", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()),
            h("span", { class: "handle__label handle__label--minValue static", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()),
            h("span", { class: "handle__label handle__label--minValue transformed", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString())));
        const minPreciseHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
                "thumb--precise": true,
            } },
            h("div", { class: "handle-extension" }),
            h("div", { class: "handle" })));
        const minLabeledPreciseHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
                "thumb--precise": true,
            } },
            h("div", { class: "handle-extension" }),
            h("div", { class: "handle" }),
            h("span", { class: "handle__label handle__label--minValue", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()),
            h("span", { class: "handle__label handle__label--minValue static", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()),
            h("span", { class: "handle__label handle__label--minValue transformed", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString())));
        return (h(Host, { id: id, "is-range": this.isRange },
            this.renderGraph(),
            h("div", { class: "track" },
                h("div", { class: "track__range", onMouseDown: () => this.dragStart("minMaxValue"), onTouchStart: (e) => this.dragStart("minMaxValue", e), style: { left, right } }),
                h("div", { class: "ticks" }, this.tickValues.map((tick) => (h("span", { class: {
                        tick: true,
                        "tick--active": tick >= min && tick <= max,
                    }, style: {
                        left: `${this.getUnitInterval(tick) * 100}%`,
                    } }, this.renderTickLabel(tick)))))),
            !this.precise && !this.labelHandles && this.isRange && minHandle,
            !this.hasHistogram &&
                !this.precise &&
                this.labelHandles &&
                this.isRange &&
                minLabeledHandle,
            this.precise && !this.labelHandles && this.isRange && minPreciseHandle,
            this.precise &&
                this.labelHandles &&
                this.isRange &&
                minLabeledPreciseHandle,
            this.hasHistogram &&
                !this.precise &&
                this.labelHandles &&
                this.isRange &&
                minHistogramLabeledHandle,
            !this.precise && !this.labelHandles && handle,
            !this.hasHistogram &&
                !this.precise &&
                this.labelHandles &&
                labeledHandle,
            !this.hasHistogram &&
                this.precise &&
                !this.labelHandles &&
                preciseHandle,
            this.hasHistogram &&
                this.precise &&
                !this.labelHandles &&
                histogramPreciseHandle,
            !this.hasHistogram &&
                this.precise &&
                this.labelHandles &&
                labeledPreciseHandle,
            this.hasHistogram &&
                !this.precise &&
                this.labelHandles &&
                histogramLabeledHandle,
            this.hasHistogram &&
                this.precise &&
                this.labelHandles &&
                histogramLabeledPreciseHandle));
    }
    renderGraph() {
        return this.histogram ? (h("div", { class: "graph" },
            h("calcite-graph", { width: 300, height: 48, data: this.histogram, highlightMin: this.isRange ? this.minValue : this.min, highlightMax: this.isRange ? this.maxValue : this.value }))) : null;
    }
    renderTickLabel(tick) {
        const isMinTickLabel = tick === this.min;
        const isMaxTickLabel = tick === this.max;
        const tickLabel = (h("span", { class: {
                tick__label: true,
                "tick__label--min": isMinTickLabel,
                "tick__label--max": isMaxTickLabel,
            } }, tick.toLocaleString()));
        if (this.labelTicks && !this.hasHistogram && !this.isRange) {
            return tickLabel;
        }
        if (this.labelTicks &&
            !this.hasHistogram &&
            this.isRange &&
            !this.precise &&
            !this.labelHandles) {
            return tickLabel;
        }
        if (this.labelTicks &&
            !this.hasHistogram &&
            this.isRange &&
            !this.precise &&
            this.labelHandles) {
            return tickLabel;
        }
        if (this.labelTicks &&
            !this.hasHistogram &&
            this.isRange &&
            this.precise &&
            (isMinTickLabel || isMaxTickLabel)) {
            return tickLabel;
        }
        if (this.labelTicks &&
            this.hasHistogram &&
            !this.precise &&
            !this.labelHandles) {
            return tickLabel;
        }
        if (this.labelTicks &&
            this.hasHistogram &&
            this.precise &&
            !this.labelHandles &&
            (isMinTickLabel || isMaxTickLabel)) {
            return tickLabel;
        }
        if (this.labelTicks &&
            this.hasHistogram &&
            !this.precise &&
            this.labelHandles &&
            (isMinTickLabel || isMaxTickLabel)) {
            return tickLabel;
        }
        if (this.labelTicks &&
            this.hasHistogram &&
            this.precise &&
            this.labelHandles &&
            (isMinTickLabel || isMaxTickLabel)) {
            return tickLabel;
        }
        return null;
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleLabelFocus(e) {
        if (e.detail.interactedEl !== this.el &&
            hasLabel(e.detail.labelEl, this.el)) {
            this.setFocus();
        }
    }
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
    getFontSizeForElement(element) {
        return Number(window
            .getComputedStyle(element)
            .getPropertyValue("font-size")
            .match(/\d+/)[0]);
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
    adjustHostObscuredHandleLabel(name) {
        const label = this.el.shadowRoot.querySelector(`.handle__label--${name}`);
        const labelStatic = this.el.shadowRoot.querySelector(`.handle__label--${name}.static`);
        const labelTransformed = this.el.shadowRoot.querySelector(`.handle__label--${name}.transformed`);
        const labelStaticOffset = this.getHostOffset(labelStatic.getBoundingClientRect().left, labelStatic.getBoundingClientRect().right);
        label.style.transform = `translateX(${labelStaticOffset}px)`;
        labelTransformed.style.transform = `translateX(${labelStaticOffset}px)`;
    }
    hyphenateCollidingRangeHandleLabels() {
        const minValueLabel = this.el.shadowRoot.querySelector(`.handle__label--minValue`);
        const minValueLabelStatic = this.el.shadowRoot.querySelector(`.handle__label--minValue.static`);
        const minValueLabelTransformed = this.el.shadowRoot.querySelector(`.handle__label--minValue.transformed`);
        const minValueLabelStaticHostOffset = this.getHostOffset(minValueLabelStatic.getBoundingClientRect().left, minValueLabelStatic.getBoundingClientRect().right);
        const valueLabel = this.el.shadowRoot.querySelector(`.handle__label--value`);
        const valueLabelStatic = this.el.shadowRoot.querySelector(`.handle__label--value.static`);
        const valueLabelTransformed = this.el.shadowRoot.querySelector(`.handle__label--value.transformed`);
        const valueLabelStaticHostOffset = this.getHostOffset(valueLabelStatic.getBoundingClientRect().left, valueLabelStatic.getBoundingClientRect().right);
        const labelFontSize = this.getFontSizeForElement(minValueLabel);
        const labelTransformedOverlap = this.getRangeLabelOverlap(minValueLabelTransformed, valueLabelTransformed);
        if (labelTransformedOverlap > 0) {
            minValueLabel.classList.add("hyphen");
            if (valueLabelStaticHostOffset === 0 &&
                minValueLabelStaticHostOffset === 0) {
                // Neither handle overlaps the host boundary
                let minValueLabelTranslate = labelTransformedOverlap / 2 - labelFontSize / 2;
                if (Math.sign(minValueLabelTranslate) === -1) {
                    minValueLabelTranslate = Math.abs(minValueLabelTranslate);
                }
                else {
                    minValueLabelTranslate = -minValueLabelTranslate;
                }
                const minValueLabelTransformedHostOffset = this.getHostOffset(minValueLabelTransformed.getBoundingClientRect().left +
                    minValueLabelTranslate -
                    labelFontSize / 2, minValueLabelTransformed.getBoundingClientRect().right +
                    minValueLabelTranslate -
                    labelFontSize / 2);
                let valueLabelTranslate = labelTransformedOverlap / 2;
                const valueLabelTransformedHostOffset = this.getHostOffset(valueLabelTransformed.getBoundingClientRect().left +
                    valueLabelTranslate, valueLabelTransformed.getBoundingClientRect().right +
                    valueLabelTranslate);
                if (minValueLabelTransformedHostOffset !== 0) {
                    minValueLabelTranslate =
                        minValueLabelTranslate + minValueLabelTransformedHostOffset;
                    valueLabelTranslate =
                        valueLabelTranslate + minValueLabelTransformedHostOffset;
                }
                if (valueLabelTransformedHostOffset !== 0) {
                    minValueLabelTranslate =
                        minValueLabelTranslate + valueLabelTransformedHostOffset;
                    valueLabelTranslate =
                        valueLabelTranslate + valueLabelTransformedHostOffset;
                }
                minValueLabel.style.transform = `translateX(${minValueLabelTranslate}px)`;
                minValueLabelTransformed.style.transform = `translateX(${minValueLabelTranslate - labelFontSize / 2}px)`;
                valueLabel.style.transform = `translateX(${valueLabelTranslate}px)`;
                valueLabelTransformed.style.transform = `translateX(${valueLabelTranslate}px)`;
            }
            else if (minValueLabelStaticHostOffset !== 0 &&
                (Math.sign(valueLabelStaticHostOffset) === 0 ||
                    Math.sign(valueLabelStaticHostOffset) === 1)) {
                // minValueLabel overlaps host boundary on the left side
                minValueLabel.style.transform = `translateX(${minValueLabelStaticHostOffset + labelFontSize / 2}px)`;
                valueLabel.style.transform = `translateX(${labelTransformedOverlap + valueLabelStaticHostOffset}px)`;
                valueLabelTransformed.style.transform = `translateX(${labelTransformedOverlap + valueLabelStaticHostOffset}px)`;
            }
            else if (valueLabelStaticHostOffset !== 0) {
                // valueLabel overlaps host boundary on the right side
                let minValueLabelTranslate = Math.abs(minValueLabelStaticHostOffset) +
                    labelTransformedOverlap -
                    labelFontSize / 2;
                if (Math.sign(minValueLabelTranslate) === -1) {
                    minValueLabelTranslate = Math.abs(minValueLabelTranslate);
                }
                else {
                    minValueLabelTranslate = -minValueLabelTranslate;
                }
                minValueLabel.style.transform = `translateX(${minValueLabelTranslate}px)`;
                minValueLabelTransformed.style.transform = `translateX(${minValueLabelTranslate - labelFontSize / 2}px)`;
            }
        }
        else {
            minValueLabel.classList.remove("hyphen");
            minValueLabel.style.transform = `translateX(${minValueLabelStaticHostOffset}px)`;
            minValueLabelTransformed.style.transform = `translateX(${minValueLabelStaticHostOffset}px)`;
            valueLabel.style.transform = `translateX(${valueLabelStaticHostOffset}px)`;
            valueLabelTransformed.style.transform = `translateX(${valueLabelStaticHostOffset}px)`;
        }
    }
    /**
     * Hides bounding tick labels that are obscured by either handle.
     */
    hideObscuredBoundingTickLabels() {
        if (!this.hasHistogram &&
            !this.isRange &&
            !this.labelHandles &&
            !this.precise) {
            return;
        }
        if (!this.hasHistogram &&
            !this.isRange &&
            this.labelHandles &&
            !this.precise) {
            return;
        }
        if (!this.hasHistogram &&
            !this.isRange &&
            !this.labelHandles &&
            this.precise) {
            return;
        }
        if (!this.hasHistogram &&
            !this.isRange &&
            this.labelHandles &&
            this.precise) {
            return;
        }
        if (!this.hasHistogram && this.isRange && !this.precise) {
            return;
        }
        if (this.hasHistogram && !this.precise && !this.labelHandles) {
            return;
        }
        const minHandle = this.el.shadowRoot.querySelector(".thumb--minValue");
        const maxHandle = this.el.shadowRoot.querySelector(".thumb--value");
        const minTickLabel = this.el.shadowRoot.querySelector(".tick__label--min");
        const maxTickLabel = this.el.shadowRoot.querySelector(".tick__label--max");
        if (!minHandle && maxHandle && minTickLabel && maxTickLabel) {
            if (this.isMinTickLabelObscured(minTickLabel, maxHandle)) {
                minTickLabel.style.opacity = "0";
            }
            else {
                minTickLabel.style.opacity = "1";
            }
            if (this.isMaxTickLabelObscured(maxTickLabel, maxHandle)) {
                maxTickLabel.style.opacity = "0";
            }
            else {
                maxTickLabel.style.opacity = "1";
            }
        }
        if (minHandle && maxHandle && minTickLabel && maxTickLabel) {
            if (this.isMinTickLabelObscured(minTickLabel, minHandle) ||
                this.isMinTickLabelObscured(minTickLabel, maxHandle)) {
                minTickLabel.style.opacity = "0";
            }
            else {
                minTickLabel.style.opacity = "1";
            }
            if (this.isMaxTickLabelObscured(maxTickLabel, minHandle) ||
                (this.isMaxTickLabelObscured(maxTickLabel, maxHandle) &&
                    this.hasHistogram)) {
                maxTickLabel.style.opacity = "0";
            }
            else {
                maxTickLabel.style.opacity = "1";
            }
        }
    }
    /**
     * Returns an integer representing the number of pixels to offset on the left or right side based on desired position behavior.
     * @internal
     */
    getHostOffset(leftBounds, rightBounds) {
        const hostBounds = this.el.getBoundingClientRect();
        if (leftBounds + 7 < hostBounds.left) {
            const offset = hostBounds.left - leftBounds - 7;
            return offset;
        }
        if (rightBounds - 7 > hostBounds.right) {
            const offset = -(rightBounds - hostBounds.right) + 7;
            return offset;
        }
        return 0;
    }
    /**
     * Returns an integer representing the number of pixels that the two given span elements are overlapping, taking into account
     * a space in between the two spans equal to the font-size set on them to account for the space needed to render a hyphen.
     * @param minValueLabel
     * @param valueLabel
     */
    getRangeLabelOverlap(minValueLabel, valueLabel) {
        const minValueLabelBounds = minValueLabel.getBoundingClientRect();
        const valueLabelBounds = valueLabel.getBoundingClientRect();
        const minValueLabelFontSize = this.getFontSizeForElement(minValueLabel);
        const rangeLabelOverlap = minValueLabelBounds.right + minValueLabelFontSize - valueLabelBounds.left;
        return rangeLabelOverlap > 0 ? rangeLabelOverlap : 0;
    }
    /**
     * Returns a boolean value representing if the minLabel span element is obscured (being overlapped) by the given handle button element.
     * @param minLabel
     * @param handle
     */
    isMinTickLabelObscured(minLabel, handle) {
        const minLabelBounds = minLabel.getBoundingClientRect();
        const handleBounds = handle.getBoundingClientRect();
        if (handleBounds.left < minLabelBounds.right) {
            return true;
        }
        return false;
    }
    /**
     * Returns a boolean value representing if the maxLabel span element is obscured (being overlapped) by the given handle button element.
     * @param maxLabel
     * @param handle
     */
    isMaxTickLabelObscured(maxLabel, handle) {
        const maxLabelBounds = maxLabel.getBoundingClientRect();
        const handleBounds = handle.getBoundingClientRect();
        if (handleBounds.right > maxLabelBounds.left) {
            return true;
        }
        return false;
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
        },
        "hasHistogram": {
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
                "text": "Indicates if a histogram is present"
            },
            "attribute": "has-histogram",
            "reflect": true,
            "defaultValue": "false"
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
    static get watchers() { return [{
            "propName": "histogram",
            "methodName": "histogramWatcher"
        }]; }
    static get listeners() { return [{
            "name": "calciteLabelFocus",
            "method": "handleLabelFocus",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
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
