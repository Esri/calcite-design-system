import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { h as hasLabel } from './dom-084e3cc4.js';
import { g as getKey } from './key-3b974aad.js';
import { g as guid } from './guid-ef96c8c4.js';

const calciteSliderCss = "@charset \"UTF-8\";:host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:block;padding:7px 0;margin:7px 0;position:relative}:host([disabled]){opacity:0.4;pointer-events:none}:host([disabled]) .track__range,:host([disabled]) .tick--active{background-color:var(--calcite-ui-text-3)}:host([disabled]) .graph .graph-path--highlight{fill:var(--calcite-ui-text-3)}:host([label-handles]),:host([precise]:not([precise=false])){margin-top:21px}:host([label-ticks]),:host([precise]:not([precise=false])[is-range]){margin-bottom:21px}:host([precise]:not([precise=false])[label-handles]){margin-top:35px}:host([precise]:not([precise=false])[label-handles][is-range]){margin-bottom:35px}.thumb{position:absolute;border:none;background:transparent;cursor:pointer;font-family:inherit;z-index:2;outline:none;padding:0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-webkit-transform:translate(7px, -8px);transform:translate(7px, -8px)}.thumb .handle__label{font-size:0.75rem;line-height:1.5;font-weight:500;line-height:1;color:var(--calcite-ui-text-2);margin-bottom:5px}.thumb .handle__label.static,.thumb .handle__label.transformed{opacity:0;position:absolute;top:0;bottom:0}.thumb .handle__label--minValue.hyphen::after{content:\"—\";display:inline-block;width:1em}.thumb .handle{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;height:14px;width:14px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:100%;background-color:var(--calcite-ui-foreground-1);-webkit-box-shadow:0 0 0 2px var(--calcite-ui-text-3) inset;box-shadow:0 0 0 2px var(--calcite-ui-text-3) inset;-webkit-transition:border 0.25s ease, background-color 0.25s ease, -webkit-box-shadow 0.25s ease;transition:border 0.25s ease, background-color 0.25s ease, -webkit-box-shadow 0.25s ease;transition:border 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;transition:border 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease, -webkit-box-shadow 0.25s ease}.thumb .handle-extension{width:2px;height:7px;background-color:var(--calcite-ui-text-3)}.thumb:hover .handle{-webkit-box-shadow:0 0 0 3px var(--calcite-ui-blue-1) inset;box-shadow:0 0 0 3px var(--calcite-ui-blue-1) inset}.thumb:hover .handle-extension{background-color:var(--calcite-ui-blue-1)}.thumb:focus .handle{outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px;outline-offset:2px}.thumb:focus .handle-extension{background-color:var(--calcite-ui-blue-1)}.thumb--minValue{-webkit-transform:translate(-7px, -8px);transform:translate(-7px, -8px)}:host([label-handles]) .thumb{-webkit-transform:translate(50%, -25px);transform:translate(50%, -25px)}:host([label-handles]) .thumb--minValue{-webkit-transform:translate(-50%, -25px);transform:translate(-50%, -25px)}:host([has-histogram][label-handles]) .thumb{-webkit-transform:translate(50%, -8px);transform:translate(50%, -8px)}:host([has-histogram][label-handles]) .thumb .handle__label{margin-bottom:unset;margin-top:5px}:host([has-histogram][label-handles]) .thumb--minValue{-webkit-transform:translate(-50%, -8px);transform:translate(-50%, -8px)}:host([precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -21px);transform:translate(7px, -21px)}:host([precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-7px, -2px);transform:translate(-7px, -2px)}:host([precise]:not([precise=false])) .thumb--minValue .handle__label{margin-bottom:unset;margin-top:5px}:host([has-histogram][precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -2px);transform:translate(7px, -2px)}:host([has-histogram][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -2px);transform:translate(-50%, -2px)}:host([ticks][precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -20px);transform:translate(7px, -20px)}:host([ticks][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-7px, -3px);transform:translate(-7px, -3px)}:host([has-histogram][ticks][precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -3px);transform:translate(7px, -3px)}:host([has-histogram][ticks][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -3px);transform:translate(-50%, -3px)}:host([label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -38px);transform:translate(50%, -38px)}:host([label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -2px);transform:translate(-50%, -2px)}:host([has-histogram][label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -2px);transform:translate(50%, -2px)}:host([has-histogram][label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -2px);transform:translate(-50%, -2px)}:host([ticks][label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -37px);transform:translate(50%, -37px)}:host([ticks][label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -3px);transform:translate(-50%, -3px)}:host([has-histogram][ticks][label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -3px);transform:translate(50%, -3px)}:host([has-histogram][ticks][label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -3px);transform:translate(-50%, -3px)}.thumb:focus,.thumb--active{z-index:3}.thumb:focus .handle,.thumb--active .handle{background-color:var(--calcite-ui-blue-1);-webkit-box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16)}.thumb:hover.thumb--precise:after,.thumb:focus.thumb--precise:after,.thumb--active.thumb--precise:after{background-color:var(--calcite-ui-blue-1)}.track{height:2px;border-radius:0;z-index:1;background-color:var(--calcite-ui-border-2);-webkit-transition:all 250ms ease-in;transition:all 250ms ease-in;position:relative}.track__range{position:absolute;top:0;height:2px;background-color:var(--calcite-ui-blue-1)}:host([is-range]) .track__range:hover{cursor:ew-resize}:host([is-range]) .track__range:after{content:\"\";position:absolute;top:-5px;width:100%;height:14px}.tick{position:absolute;top:-2px;width:2px;height:4px;left:var(--calcite-ui-border-1-offset);margin-left:-2px;border:1px solid var(--calcite-ui-foreground-1);background-color:var(--calcite-ui-border-1)}.tick--active{background-color:var(--calcite-ui-blue-1)}.tick__label{position:absolute;font-size:0.75rem;line-height:1.5;font-weight:500;color:var(--calcite-ui-text-2);width:4em;margin:14px -2em;text-align:center;display:block;pointer-events:none}.tick__label--min{left:0;margin:14px -3px;text-align:left;-webkit-transition:opacity 150ms;transition:opacity 150ms}.tick__label--max{left:unset;right:0;margin:14px -3px;text-align:right;-webkit-transition:opacity 50ms;transition:opacity 50ms}:host([has-histogram][label-handles]) .tick__label--min,:host([has-histogram][label-handles]) .tick__label--max{margin:6px -3px;font-weight:300;color:var(--calcite-ui-text-3)}:host([has-histogram][precise]:not([precise=false])) .tick__label--min,:host([has-histogram][precise]:not([precise=false])) .tick__label--max{margin:6px -3px;font-weight:300;color:var(--calcite-ui-text-3)}.graph{width:100%;height:48px;position:relative;color:var(--calcite-ui-foreground-2)}.graph svg{position:absolute;width:100%;height:48px}.graph .graph-path--highlight{fill:var(--calcite-ui-blue-1);opacity:0.25}";

const CalciteSlider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteSliderUpdate = createEvent(this, "calciteSliderUpdate", 7);
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
            } }, h("div", { class: "handle" })));
        const labeledHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
            } }, h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("div", { class: "handle" })));
        const histogramLabeledHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
            } }, h("div", { class: "handle" }), h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value)));
        const preciseHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } }, h("div", { class: "handle" }), h("div", { class: "handle-extension" })));
        const histogramPreciseHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } }, h("div", { class: "handle-extension" }), h("div", { class: "handle" })));
        const labeledPreciseHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } }, h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("div", { class: "handle" }), h("div", { class: "handle-extension" })));
        const histogramLabeledPreciseHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } }, h("div", { class: "handle-extension" }), h("div", { class: "handle" }), h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value)));
        const minHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
            } }, h("div", { class: "handle" })));
        const minLabeledHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
            } }, h("span", { class: "handle__label handle__label--minValue", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue static", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue transformed", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("div", { class: "handle" })));
        const minHistogramLabeledHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
            } }, h("div", { class: "handle" }), h("span", { class: "handle__label handle__label--minValue", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue static", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue transformed", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString())));
        const minPreciseHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
                "thumb--precise": true,
            } }, h("div", { class: "handle-extension" }), h("div", { class: "handle" })));
        const minLabeledPreciseHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
                "thumb--precise": true,
            } }, h("div", { class: "handle-extension" }), h("div", { class: "handle" }), h("span", { class: "handle__label handle__label--minValue", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue static", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue transformed", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString())));
        return (h(Host, { id: id, "is-range": this.isRange }, this.renderGraph(), h("div", { class: "track" }, h("div", { class: "track__range", onMouseDown: () => this.dragStart("minMaxValue"), onTouchStart: (e) => this.dragStart("minMaxValue", e), style: { left, right } }), h("div", { class: "ticks" }, this.tickValues.map((tick) => (h("span", { class: {
                tick: true,
                "tick--active": tick >= min && tick <= max,
            }, style: {
                left: `${this.getUnitInterval(tick) * 100}%`,
            } }, this.renderTickLabel(tick)))))), !this.precise && !this.labelHandles && this.isRange && minHandle, !this.hasHistogram &&
            !this.precise &&
            this.labelHandles &&
            this.isRange &&
            minLabeledHandle, this.precise && !this.labelHandles && this.isRange && minPreciseHandle, this.precise &&
            this.labelHandles &&
            this.isRange &&
            minLabeledPreciseHandle, this.hasHistogram &&
            !this.precise &&
            this.labelHandles &&
            this.isRange &&
            minHistogramLabeledHandle, !this.precise && !this.labelHandles && handle, !this.hasHistogram &&
            !this.precise &&
            this.labelHandles &&
            labeledHandle, !this.hasHistogram &&
            this.precise &&
            !this.labelHandles &&
            preciseHandle, this.hasHistogram &&
            this.precise &&
            !this.labelHandles &&
            histogramPreciseHandle, !this.hasHistogram &&
            this.precise &&
            this.labelHandles &&
            labeledPreciseHandle, this.hasHistogram &&
            !this.precise &&
            this.labelHandles &&
            histogramLabeledHandle, this.hasHistogram &&
            this.precise &&
            this.labelHandles &&
            histogramLabeledPreciseHandle));
    }
    renderGraph() {
        return this.histogram ? (h("div", { class: "graph" }, h("calcite-graph", { width: 300, height: 48, data: this.histogram, highlightMin: this.isRange ? this.minValue : this.min, highlightMax: this.isRange ? this.maxValue : this.value }))) : null;
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "histogram": ["histogramWatcher"]
    }; }
};
CalciteSlider.style = calciteSliderCss;

export { CalciteSlider as calcite_slider };
