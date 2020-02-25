'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-67746296.js');
const dom = require('./dom-801460f3.js');
const guid = require('./guid-1986fc89.js');
const keys = require('./keys-4806e54f.js');

const CalciteSlider = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Select theme (light or dark) */
        this.theme = "light";
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
        /**
         * @internal
         */
        this.guid = `calcite-slider-${guid.guid()}`;
        /**
         * @internal
         */
        this.isRange = false;
        /**
         * @internal
         */
        this.tickValues = [];
        /**
         * @internal
         */
        this.activeProp = "value";
        this.calciteSliderUpdate = core.createEvent(this, "calciteSliderUpdate", 7);
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
        const dir = dom.getElementDir(this.el);
        const theme = dom.getElementTheme(this.el);
        const min = this.minValue || this.min;
        const max = this.maxValue || this.value;
        const maxProp = this.isRange ? "maxValue" : "value";
        return (core.h(core.Host, { dir: dir, theme: theme, id: id, "is-range": this.isRange, style: {
                "--calcite-slider-range-max": `${100 -
                    this.getUnitInterval(max) * 100}%`,
                "--calcite-slider-range-min": `${this.getUnitInterval(min) * 100}%`
            } }, core.h("div", { class: "slider__track" }, core.h("div", { class: "slider__track__range" }), core.h("div", { class: "slider__ticks" }, this.tickValues.map(number => (core.h("span", { class: {
                slider__tick: true,
                "slider__tick--active": number >= min && number <= max
            }, style: {
                "--calcite-slider-tick-offset": `${this.getUnitInterval(number) * 100}%`
            } }, this.labelTicks ? (core.h("span", { class: {
                slider__tick__label: true,
                "slider__tick__label--min": number === this.min,
                "slider__tick__label--max": number === this.max
            } }, number)) : ("")))))), this.isRange ? (core.h("button", { ref: el => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: e => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, class: {
                slider__thumb: true,
                "slider__thumb--min": true,
                "slider__thumb--active": this.dragProp === "minValue",
                "slider__thumb--precise": this.precise
            } }, core.h("span", { class: "slider__handle" }), this.labelHandles ? (core.h("span", { class: "slider__handle__label", "aria-hidden": "true" }, this.minValue)) : (""))) : (""), core.h("button", { ref: el => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: e => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": this[maxProp], "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, class: {
                slider__thumb: true,
                "slider__thumb--max": true,
                "slider__thumb--active": this.dragProp === maxProp,
                "slider__thumb--precise": this.precise
            } }, core.h("span", { class: "slider__handle" }), this.labelHandles ? (core.h("span", { class: "slider__handle__label", "aria-hidden": "true" }, this[maxProp])) : (""))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    keyDownHandler(e) {
        const value = this[this.activeProp];
        switch (e.keyCode) {
            case keys.UP:
            case keys.RIGHT:
                e.preventDefault();
                this[this.activeProp] = this.bound(value + this.step, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
            case keys.DOWN:
            case keys.LEFT:
                e.preventDefault();
                this[this.activeProp] = this.bound(value - this.step, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
            case keys.PAGE_UP:
                if (this.pageStep) {
                    e.preventDefault();
                    this[this.activeProp] = this.bound(value + this.pageStep, this.activeProp);
                    this.calciteSliderUpdate.emit();
                }
                break;
            case keys.PAGE_DOWN:
                if (this.pageStep) {
                    e.preventDefault();
                    this[this.activeProp] = this.bound(value - this.pageStep, this.activeProp);
                    this.calciteSliderUpdate.emit();
                }
                break;
            case keys.HOME:
                e.preventDefault();
                this[this.activeProp] = this.bound(this.min, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
            case keys.END:
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
            const closerToMax = Math.abs(this.maxValue - num) < Math.abs(this.minValue - num);
            prop = closerToMax ? "maxValue" : "minValue";
        }
        this[prop] = this.bound(num, prop);
        this.calciteSliderUpdate.emit();
        const handle = prop === "minValue" ? this.minHandle : this.maxHandle;
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
        this.activeProp = prop;
        this.dragListener = this.dragListener || this.dragUpdate.bind(this);
        document.addEventListener("mousemove", this.dragListener);
        document.addEventListener("touchmove", this.dragListener, {
            capture: false
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
            this[this.dragProp] = this.bound(value, this.dragProp);
            this.calciteSliderUpdate.emit();
        }
    }
    dragEnd() {
        this.dragProp = null;
        document.removeEventListener("mousemove", this.dragListener);
        document.removeEventListener("touchmove", this.dragListener);
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
    get el() { return core.getElement(this); }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host{--calcite-slider-tick:#959595;--calcite-slider-label:#6a6a6a;--calcite-slider-track:#d4d4d4;--calcite-slider-handle:#fff;--calcite-slider-handle-border:#6a6a6a;display:block;padding:7px 0;margin:7px 0;position:relative}:host([theme=dark]){--calcite-slider-tick:#6a6a6a;--calcite-slider-label:#9f9f9f;--calcite-slider-track:#4a4a4a;--calcite-slider-handle:#2b2b2b;--calcite-slider-handle-border:#9f9f9f}:host([disabled]){opacity:.5;pointer-events:none}:host([label-handles]),:host([precise]){margin-top:21px}:host([label-ticks]),:host([precise][is-range]){margin-bottom:21px}:host([precise][label-handles]){margin-top:35px}:host([precise][label-handles][is-range]){margin-bottom:35px}.slider__thumb{position:absolute;right:var(--calcite-slider-range-max);height:28px;width:28px;margin:-14px;-webkit-box-sizing:border-box;box-sizing:border-box;border:none;background:transparent;cursor:pointer;font-family:inherit;z-index:3}.slider__thumb--min{right:auto;left:var(--calcite-slider-range-min)}.slider__handle{position:absolute;top:0;left:0;height:14px;width:14px;margin:7px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:100%;background-color:var(--calcite-slider-handle);border:2px solid var(--calcite-slider-handle-border);-webkit-transition:border .25s ease,background-color .25s ease,-webkit-box-shadow .25s ease;transition:border .25s ease,background-color .25s ease,-webkit-box-shadow .25s ease;transition:border .25s ease,background-color .25s ease,box-shadow .25s ease;transition:border .25s ease,background-color .25s ease,box-shadow .25s ease,-webkit-box-shadow .25s ease}.slider__handle__label{position:absolute;left:0;bottom:28px;width:28px;height:.75em;font-size:.8125rem;line-height:1.5;font-weight:500;line-height:1;color:var(--calcite-slider-label);text-align:center}.slider__thumb:hover .slider__handle{border-width:3px;border-color:var(--calcite-ui-blue);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.08);box-shadow:0 0 16px 0 rgba(0,0,0,.08)}.slider__thumb--active,.slider__thumb:focus{outline:none;z-index:4}.slider__thumb--active .slider__handle,.slider__thumb:focus .slider__handle{background-color:var(--calcite-ui-blue);border-color:var(--calcite-ui-blue);-webkit-box-shadow:0 0 8px 0 rgba(0,0,0,.16);box-shadow:0 0 8px 0 rgba(0,0,0,.16)}.slider__thumb--precise{margin-top:-28px}.slider__thumb--precise:after{content:\"\";display:block;position:absolute;top:14px;left:50%;width:2px;height:7px;background-color:var(--calcite-slider-handle-border);margin-left:-1px;margin-top:7px;z-index:2}.slider__thumb--active.slider__thumb--precise:after,.slider__thumb:focus.slider__thumb--precise:after,.slider__thumb:hover.slider__thumb--precise:after{background-color:var(--calcite-ui-blue)}.slider__thumb--precise.slider__thumb--min{margin-top:-2px}.slider__thumb--precise.slider__thumb--min .slider__handle__label{bottom:unset;top:28px}.slider__thumb--precise.slider__thumb--min:after{top:0;margin-top:0}.slider__track{height:2px;border-radius:0;z-index:2;background-color:var(--calcite-slider-track);-webkit-transition:all .25s ease-in;transition:all .25s ease-in;position:relative}.slider__track__range{position:absolute;top:0;right:var(--calcite-slider-range-max);left:var(--calcite-slider-range-min);height:2px;background-color:var(--calcite-ui-blue)}.slider__tick{position:absolute;top:-2px;width:2px;height:4px;left:var(--calcite-slider-tick-offset);margin-left:-3px;border:1px solid var(--calcite-slider-handle);border-right-width:2px;border-left-width:2px;background-color:var(--calcite-slider-tick)}.slider__tick--active{background-color:var(--calcite-ui-blue)}.slider__tick__label{position:absolute;font-size:.8125rem;line-height:1.5;font-weight:500;color:var(--calcite-slider-label);width:4em;margin:14px -2em;text-align:center;display:block;pointer-events:none}.slider__tick__label--min{left:0;margin:14px -3px;text-align:left}.slider__tick__label--max{left:unset;right:0;margin:14px -3px;text-align:right}"; }
};

exports.calcite_slider = CalciteSlider;
