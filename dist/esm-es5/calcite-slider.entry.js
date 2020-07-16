var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { h as hasLabel } from './dom-084e3cc4.js';
import { g as getKey } from './key-3b974aad.js';
import { g as guid } from './guid-ef96c8c4.js';
var calciteSliderCss = "@charset \"UTF-8\";:host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:block;padding:7px 0;margin:7px 0;position:relative}:host([disabled]){opacity:0.4;pointer-events:none}:host([disabled]) .track__range,:host([disabled]) .tick--active{background-color:var(--calcite-ui-text-3)}:host([disabled]) .graph .graph-path--highlight{fill:var(--calcite-ui-text-3)}:host([label-handles]),:host([precise]:not([precise=false])){margin-top:21px}:host([label-ticks]),:host([precise]:not([precise=false])[is-range]){margin-bottom:21px}:host([precise]:not([precise=false])[label-handles]){margin-top:35px}:host([precise]:not([precise=false])[label-handles][is-range]){margin-bottom:35px}.thumb{position:absolute;border:none;background:transparent;cursor:pointer;font-family:inherit;z-index:2;outline:none;padding:0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-webkit-transform:translate(7px, -8px);transform:translate(7px, -8px)}.thumb .handle__label{font-size:0.75rem;line-height:1.5;font-weight:500;line-height:1;color:var(--calcite-ui-text-2);margin-bottom:5px}.thumb .handle__label.static,.thumb .handle__label.transformed{opacity:0;position:absolute;top:0;bottom:0}.thumb .handle__label--minValue.hyphen::after{content:\"—\";display:inline-block;width:1em}.thumb .handle{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;height:14px;width:14px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:100%;background-color:var(--calcite-ui-foreground-1);-webkit-box-shadow:0 0 0 2px var(--calcite-ui-text-3) inset;box-shadow:0 0 0 2px var(--calcite-ui-text-3) inset;-webkit-transition:border 0.25s ease, background-color 0.25s ease, -webkit-box-shadow 0.25s ease;transition:border 0.25s ease, background-color 0.25s ease, -webkit-box-shadow 0.25s ease;transition:border 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;transition:border 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease, -webkit-box-shadow 0.25s ease}.thumb .handle-extension{width:2px;height:7px;background-color:var(--calcite-ui-text-3)}.thumb:hover .handle{-webkit-box-shadow:0 0 0 3px var(--calcite-ui-blue-1) inset;box-shadow:0 0 0 3px var(--calcite-ui-blue-1) inset}.thumb:hover .handle-extension{background-color:var(--calcite-ui-blue-1)}.thumb:focus .handle{outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px;outline-offset:2px}.thumb:focus .handle-extension{background-color:var(--calcite-ui-blue-1)}.thumb--minValue{-webkit-transform:translate(-7px, -8px);transform:translate(-7px, -8px)}:host([label-handles]) .thumb{-webkit-transform:translate(50%, -25px);transform:translate(50%, -25px)}:host([label-handles]) .thumb--minValue{-webkit-transform:translate(-50%, -25px);transform:translate(-50%, -25px)}:host([has-histogram][label-handles]) .thumb{-webkit-transform:translate(50%, -8px);transform:translate(50%, -8px)}:host([has-histogram][label-handles]) .thumb .handle__label{margin-bottom:unset;margin-top:5px}:host([has-histogram][label-handles]) .thumb--minValue{-webkit-transform:translate(-50%, -8px);transform:translate(-50%, -8px)}:host([precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -21px);transform:translate(7px, -21px)}:host([precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-7px, -2px);transform:translate(-7px, -2px)}:host([precise]:not([precise=false])) .thumb--minValue .handle__label{margin-bottom:unset;margin-top:5px}:host([has-histogram][precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -2px);transform:translate(7px, -2px)}:host([has-histogram][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -2px);transform:translate(-50%, -2px)}:host([ticks][precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -20px);transform:translate(7px, -20px)}:host([ticks][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-7px, -3px);transform:translate(-7px, -3px)}:host([has-histogram][ticks][precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -3px);transform:translate(7px, -3px)}:host([has-histogram][ticks][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -3px);transform:translate(-50%, -3px)}:host([label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -38px);transform:translate(50%, -38px)}:host([label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -2px);transform:translate(-50%, -2px)}:host([has-histogram][label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -2px);transform:translate(50%, -2px)}:host([has-histogram][label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -2px);transform:translate(-50%, -2px)}:host([ticks][label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -37px);transform:translate(50%, -37px)}:host([ticks][label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -3px);transform:translate(-50%, -3px)}:host([has-histogram][ticks][label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -3px);transform:translate(50%, -3px)}:host([has-histogram][ticks][label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -3px);transform:translate(-50%, -3px)}.thumb:focus,.thumb--active{z-index:3}.thumb:focus .handle,.thumb--active .handle{background-color:var(--calcite-ui-blue-1);-webkit-box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16)}.thumb:hover.thumb--precise:after,.thumb:focus.thumb--precise:after,.thumb--active.thumb--precise:after{background-color:var(--calcite-ui-blue-1)}.track{height:2px;border-radius:0;z-index:1;background-color:var(--calcite-ui-border-2);-webkit-transition:all 250ms ease-in;transition:all 250ms ease-in;position:relative}.track__range{position:absolute;top:0;height:2px;background-color:var(--calcite-ui-blue-1)}:host([is-range]) .track__range:hover{cursor:ew-resize}:host([is-range]) .track__range:after{content:\"\";position:absolute;top:-5px;width:100%;height:14px}.tick{position:absolute;top:-2px;width:2px;height:4px;left:var(--calcite-ui-border-1-offset);margin-left:-2px;border:1px solid var(--calcite-ui-foreground-1);background-color:var(--calcite-ui-border-1)}.tick--active{background-color:var(--calcite-ui-blue-1)}.tick__label{position:absolute;font-size:0.75rem;line-height:1.5;font-weight:500;color:var(--calcite-ui-text-2);width:4em;margin:14px -2em;text-align:center;display:block;pointer-events:none}.tick__label--min{left:0;margin:14px -3px;text-align:left;-webkit-transition:opacity 150ms;transition:opacity 150ms}.tick__label--max{left:unset;right:0;margin:14px -3px;text-align:right;-webkit-transition:opacity 50ms;transition:opacity 50ms}:host([has-histogram][label-handles]) .tick__label--min,:host([has-histogram][label-handles]) .tick__label--max{margin:6px -3px;font-weight:300;color:var(--calcite-ui-text-3)}:host([has-histogram][precise]:not([precise=false])) .tick__label--min,:host([has-histogram][precise]:not([precise=false])) .tick__label--max{margin:6px -3px;font-weight:300;color:var(--calcite-ui-text-3)}.graph{width:100%;height:48px;position:relative;color:var(--calcite-ui-foreground-2)}.graph svg{position:absolute;width:100%;height:48px}.graph .graph-path--highlight{fill:var(--calcite-ui-blue-1);opacity:0.25}";
var CalciteSlider = /** @class */ (function () {
    function class_1(hostRef) {
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
        this.guid = "calcite-slider-" + guid();
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
    class_1.prototype.histogramWatcher = function (newHistogram) {
        this.hasHistogram = newHistogram ? true : false;
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_1.prototype.componentWillLoad = function () {
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
    };
    class_1.prototype.componentDidRender = function () {
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
    };
    class_1.prototype.render = function () {
        var _this = this;
        var id = this.el.id || this.guid;
        var min = this.minValue || this.min;
        var max = this.maxValue || this.value;
        var maxProp = this.isRange ? "maxValue" : "value";
        var value = this[maxProp];
        var left = this.getUnitInterval(min) * 100 + "%";
        var right = 100 - this.getUnitInterval(max) * 100 + "%";
        var handle = (h("button", { ref: function (el) { return (_this.maxHandle = el); }, onFocus: function () { return (_this.activeProp = maxProp); }, onBlur: function () { return (_this.activeProp = null); }, onMouseDown: function () { return _this.dragStart(maxProp); }, onTouchStart: function (e) { return _this.dragStart(maxProp, e); }, role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right: right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
            } }, h("div", { class: "handle" })));
        var labeledHandle = (h("button", { ref: function (el) { return (_this.maxHandle = el); }, onFocus: function () { return (_this.activeProp = maxProp); }, onBlur: function () { return (_this.activeProp = null); }, onMouseDown: function () { return _this.dragStart(maxProp); }, onTouchStart: function (e) { return _this.dragStart(maxProp, e); }, role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right: right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
            } }, h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("div", { class: "handle" })));
        var histogramLabeledHandle = (h("button", { ref: function (el) { return (_this.maxHandle = el); }, onFocus: function () { return (_this.activeProp = maxProp); }, onBlur: function () { return (_this.activeProp = null); }, onMouseDown: function () { return _this.dragStart(maxProp); }, onTouchStart: function (e) { return _this.dragStart(maxProp, e); }, role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right: right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
            } }, h("div", { class: "handle" }), h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value)));
        var preciseHandle = (h("button", { ref: function (el) { return (_this.maxHandle = el); }, onFocus: function () { return (_this.activeProp = maxProp); }, onBlur: function () { return (_this.activeProp = null); }, onMouseDown: function () { return _this.dragStart(maxProp); }, onTouchStart: function (e) { return _this.dragStart(maxProp, e); }, role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right: right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } }, h("div", { class: "handle" }), h("div", { class: "handle-extension" })));
        var histogramPreciseHandle = (h("button", { ref: function (el) { return (_this.maxHandle = el); }, onFocus: function () { return (_this.activeProp = maxProp); }, onBlur: function () { return (_this.activeProp = null); }, onMouseDown: function () { return _this.dragStart(maxProp); }, onTouchStart: function (e) { return _this.dragStart(maxProp, e); }, role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right: right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } }, h("div", { class: "handle-extension" }), h("div", { class: "handle" })));
        var labeledPreciseHandle = (h("button", { ref: function (el) { return (_this.maxHandle = el); }, onFocus: function () { return (_this.activeProp = maxProp); }, onBlur: function () { return (_this.activeProp = null); }, onMouseDown: function () { return _this.dragStart(maxProp); }, onTouchStart: function (e) { return _this.dragStart(maxProp, e); }, role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right: right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } }, h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("div", { class: "handle" }), h("div", { class: "handle-extension" })));
        var histogramLabeledPreciseHandle = (h("button", { ref: function (el) { return (_this.maxHandle = el); }, onFocus: function () { return (_this.activeProp = maxProp); }, onBlur: function () { return (_this.activeProp = null); }, onMouseDown: function () { return _this.dragStart(maxProp); }, onTouchStart: function (e) { return _this.dragStart(maxProp, e); }, role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right: right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } }, h("div", { class: "handle-extension" }), h("div", { class: "handle" }), h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value)));
        var minHandle = (h("button", { ref: function (el) { return (_this.minHandle = el); }, onFocus: function () { return (_this.activeProp = "minValue"); }, onBlur: function () { return (_this.activeProp = null); }, onMouseDown: function () { return _this.dragStart("minValue"); }, onTouchStart: function (e) { return _this.dragStart("minValue", e); }, role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left: left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
            } }, h("div", { class: "handle" })));
        var minLabeledHandle = (h("button", { ref: function (el) { return (_this.minHandle = el); }, onFocus: function () { return (_this.activeProp = "minValue"); }, onBlur: function () { return (_this.activeProp = null); }, onMouseDown: function () { return _this.dragStart("minValue"); }, onTouchStart: function (e) { return _this.dragStart("minValue", e); }, role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left: left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
            } }, h("span", { class: "handle__label handle__label--minValue", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue static", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue transformed", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("div", { class: "handle" })));
        var minHistogramLabeledHandle = (h("button", { ref: function (el) { return (_this.minHandle = el); }, onFocus: function () { return (_this.activeProp = "minValue"); }, onBlur: function () { return (_this.activeProp = null); }, onMouseDown: function () { return _this.dragStart("minValue"); }, onTouchStart: function (e) { return _this.dragStart("minValue", e); }, role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left: left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
            } }, h("div", { class: "handle" }), h("span", { class: "handle__label handle__label--minValue", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue static", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue transformed", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString())));
        var minPreciseHandle = (h("button", { ref: function (el) { return (_this.minHandle = el); }, onFocus: function () { return (_this.activeProp = "minValue"); }, onBlur: function () { return (_this.activeProp = null); }, onMouseDown: function () { return _this.dragStart("minValue"); }, onTouchStart: function (e) { return _this.dragStart("minValue", e); }, role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left: left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
                "thumb--precise": true,
            } }, h("div", { class: "handle-extension" }), h("div", { class: "handle" })));
        var minLabeledPreciseHandle = (h("button", { ref: function (el) { return (_this.minHandle = el); }, onFocus: function () { return (_this.activeProp = "minValue"); }, onBlur: function () { return (_this.activeProp = null); }, onMouseDown: function () { return _this.dragStart("minValue"); }, onTouchStart: function (e) { return _this.dragStart("minValue", e); }, role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left: left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
                "thumb--precise": true,
            } }, h("div", { class: "handle-extension" }), h("div", { class: "handle" }), h("span", { class: "handle__label handle__label--minValue", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue static", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue transformed", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString())));
        return (h(Host, { id: id, "is-range": this.isRange }, this.renderGraph(), h("div", { class: "track" }, h("div", { class: "track__range", onMouseDown: function () { return _this.dragStart("minMaxValue"); }, onTouchStart: function (e) { return _this.dragStart("minMaxValue", e); }, style: { left: left, right: right } }), h("div", { class: "ticks" }, this.tickValues.map(function (tick) { return (h("span", { class: {
                tick: true,
                "tick--active": tick >= min && tick <= max,
            }, style: {
                left: _this.getUnitInterval(tick) * 100 + "%",
            } }, _this.renderTickLabel(tick))); }))), !this.precise && !this.labelHandles && this.isRange && minHandle, !this.hasHistogram &&
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
    };
    class_1.prototype.renderGraph = function () {
        return this.histogram ? (h("div", { class: "graph" }, h("calcite-graph", { width: 300, height: 48, data: this.histogram, highlightMin: this.isRange ? this.minValue : this.min, highlightMax: this.isRange ? this.maxValue : this.value }))) : null;
    };
    class_1.prototype.renderTickLabel = function (tick) {
        var isMinTickLabel = tick === this.min;
        var isMaxTickLabel = tick === this.max;
        var tickLabel = (h("span", { class: {
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
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    class_1.prototype.handleLabelFocus = function (e) {
        if (e.detail.interactedEl !== this.el &&
            hasLabel(e.detail.labelEl, this.el)) {
            this.setFocus();
        }
    };
    class_1.prototype.keyDownHandler = function (e) {
        var value = this[this.activeProp];
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
    };
    class_1.prototype.clickHandler = function (e) {
        var x = e.clientX || e.pageX;
        var num = this.translate(x);
        var prop = "value";
        if (this.isRange) {
            if (this.lastDragProp === "minMaxValue") {
                prop = "minMaxValue";
            }
            else {
                var closerToMax = Math.abs(this.maxValue - num) < Math.abs(this.minValue - num);
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
    };
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    class_1.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var handle;
            return __generator(this, function (_a) {
                handle = this.minHandle ? this.minHandle : this.maxHandle;
                handle.focus();
                return [2 /*return*/];
            });
        });
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    class_1.prototype.generateTickValues = function () {
        var ticks = [];
        var current = this.min;
        while (this.ticks && current < this.max + this.ticks) {
            ticks.push(current);
            current = current + this.ticks;
        }
        return ticks;
    };
    class_1.prototype.dragStart = function (prop, e) {
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
    };
    class_1.prototype.dragUpdate = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.dragProp) {
            var value = this.translate(e.clientX || e.pageX);
            if (this.isRange && this.dragProp === "minMaxValue") {
                if (this.minValueDragRange &&
                    this.maxValueDragRange &&
                    this.minMaxValueRange) {
                    var newMinValue = value - this.minValueDragRange;
                    var newMaxValue = value + this.maxValueDragRange;
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
    };
    class_1.prototype.dragEnd = function () {
        this.dragProp = null;
        document.removeEventListener("mousemove", this.dragListener);
        document.removeEventListener("touchmove", this.dragListener);
        this.minValueDragRange = null;
        this.maxValueDragRange = null;
        this.minMaxValueRange = null;
    };
    /**
     * If number is outside range, constrain to min or max
     * @internal
     */
    class_1.prototype.bound = function (num, prop) {
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
    };
    /**
     * Translate a pixel position to value along the range
     * @internal
     */
    class_1.prototype.translate = function (x) {
        var range = this.max - this.min;
        var _a = this.el.getBoundingClientRect(), left = _a.left, width = _a.width;
        var percent = (x - left) / width;
        var value = this.bound(this.min + range * percent);
        if (this.snap && this.step) {
            value = this.getClosestStep(value);
        }
        return value;
    };
    /**
     * Get closest allowed value along stepped values
     * @internal
     */
    class_1.prototype.getClosestStep = function (num) {
        num = this.bound(num);
        if (this.step) {
            var step = Math.round(num / this.step) * this.step;
            num = this.bound(step);
        }
        return num;
    };
    class_1.prototype.getFontSizeForElement = function (element) {
        return Number(window
            .getComputedStyle(element)
            .getPropertyValue("font-size")
            .match(/\d+/)[0]);
    };
    /**
     * Get position of value along range as fractional value
     * @return {number} number in the unit interval [0,1]
     * @internal
     */
    class_1.prototype.getUnitInterval = function (num) {
        num = this.bound(num);
        var range = this.max - this.min;
        return (num - this.min) / range;
    };
    class_1.prototype.adjustHostObscuredHandleLabel = function (name) {
        var label = this.el.shadowRoot.querySelector(".handle__label--" + name);
        var labelStatic = this.el.shadowRoot.querySelector(".handle__label--" + name + ".static");
        var labelTransformed = this.el.shadowRoot.querySelector(".handle__label--" + name + ".transformed");
        var labelStaticOffset = this.getHostOffset(labelStatic.getBoundingClientRect().left, labelStatic.getBoundingClientRect().right);
        label.style.transform = "translateX(" + labelStaticOffset + "px)";
        labelTransformed.style.transform = "translateX(" + labelStaticOffset + "px)";
    };
    class_1.prototype.hyphenateCollidingRangeHandleLabels = function () {
        var minValueLabel = this.el.shadowRoot.querySelector(".handle__label--minValue");
        var minValueLabelStatic = this.el.shadowRoot.querySelector(".handle__label--minValue.static");
        var minValueLabelTransformed = this.el.shadowRoot.querySelector(".handle__label--minValue.transformed");
        var minValueLabelStaticHostOffset = this.getHostOffset(minValueLabelStatic.getBoundingClientRect().left, minValueLabelStatic.getBoundingClientRect().right);
        var valueLabel = this.el.shadowRoot.querySelector(".handle__label--value");
        var valueLabelStatic = this.el.shadowRoot.querySelector(".handle__label--value.static");
        var valueLabelTransformed = this.el.shadowRoot.querySelector(".handle__label--value.transformed");
        var valueLabelStaticHostOffset = this.getHostOffset(valueLabelStatic.getBoundingClientRect().left, valueLabelStatic.getBoundingClientRect().right);
        var labelFontSize = this.getFontSizeForElement(minValueLabel);
        var labelTransformedOverlap = this.getRangeLabelOverlap(minValueLabelTransformed, valueLabelTransformed);
        if (labelTransformedOverlap > 0) {
            minValueLabel.classList.add("hyphen");
            if (valueLabelStaticHostOffset === 0 &&
                minValueLabelStaticHostOffset === 0) {
                // Neither handle overlaps the host boundary
                var minValueLabelTranslate = labelTransformedOverlap / 2 - labelFontSize / 2;
                if (Math.sign(minValueLabelTranslate) === -1) {
                    minValueLabelTranslate = Math.abs(minValueLabelTranslate);
                }
                else {
                    minValueLabelTranslate = -minValueLabelTranslate;
                }
                var minValueLabelTransformedHostOffset = this.getHostOffset(minValueLabelTransformed.getBoundingClientRect().left +
                    minValueLabelTranslate -
                    labelFontSize / 2, minValueLabelTransformed.getBoundingClientRect().right +
                    minValueLabelTranslate -
                    labelFontSize / 2);
                var valueLabelTranslate = labelTransformedOverlap / 2;
                var valueLabelTransformedHostOffset = this.getHostOffset(valueLabelTransformed.getBoundingClientRect().left +
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
                minValueLabel.style.transform = "translateX(" + minValueLabelTranslate + "px)";
                minValueLabelTransformed.style.transform = "translateX(" + (minValueLabelTranslate - labelFontSize / 2) + "px)";
                valueLabel.style.transform = "translateX(" + valueLabelTranslate + "px)";
                valueLabelTransformed.style.transform = "translateX(" + valueLabelTranslate + "px)";
            }
            else if (minValueLabelStaticHostOffset !== 0 &&
                (Math.sign(valueLabelStaticHostOffset) === 0 ||
                    Math.sign(valueLabelStaticHostOffset) === 1)) {
                // minValueLabel overlaps host boundary on the left side
                minValueLabel.style.transform = "translateX(" + (minValueLabelStaticHostOffset + labelFontSize / 2) + "px)";
                valueLabel.style.transform = "translateX(" + (labelTransformedOverlap + valueLabelStaticHostOffset) + "px)";
                valueLabelTransformed.style.transform = "translateX(" + (labelTransformedOverlap + valueLabelStaticHostOffset) + "px)";
            }
            else if (valueLabelStaticHostOffset !== 0) {
                // valueLabel overlaps host boundary on the right side
                var minValueLabelTranslate = Math.abs(minValueLabelStaticHostOffset) +
                    labelTransformedOverlap -
                    labelFontSize / 2;
                if (Math.sign(minValueLabelTranslate) === -1) {
                    minValueLabelTranslate = Math.abs(minValueLabelTranslate);
                }
                else {
                    minValueLabelTranslate = -minValueLabelTranslate;
                }
                minValueLabel.style.transform = "translateX(" + minValueLabelTranslate + "px)";
                minValueLabelTransformed.style.transform = "translateX(" + (minValueLabelTranslate - labelFontSize / 2) + "px)";
            }
        }
        else {
            minValueLabel.classList.remove("hyphen");
            minValueLabel.style.transform = "translateX(" + minValueLabelStaticHostOffset + "px)";
            minValueLabelTransformed.style.transform = "translateX(" + minValueLabelStaticHostOffset + "px)";
            valueLabel.style.transform = "translateX(" + valueLabelStaticHostOffset + "px)";
            valueLabelTransformed.style.transform = "translateX(" + valueLabelStaticHostOffset + "px)";
        }
    };
    /**
     * Hides bounding tick labels that are obscured by either handle.
     */
    class_1.prototype.hideObscuredBoundingTickLabels = function () {
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
        var minHandle = this.el.shadowRoot.querySelector(".thumb--minValue");
        var maxHandle = this.el.shadowRoot.querySelector(".thumb--value");
        var minTickLabel = this.el.shadowRoot.querySelector(".tick__label--min");
        var maxTickLabel = this.el.shadowRoot.querySelector(".tick__label--max");
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
    };
    /**
     * Returns an integer representing the number of pixels to offset on the left or right side based on desired position behavior.
     * @internal
     */
    class_1.prototype.getHostOffset = function (leftBounds, rightBounds) {
        var hostBounds = this.el.getBoundingClientRect();
        if (leftBounds + 7 < hostBounds.left) {
            var offset = hostBounds.left - leftBounds - 7;
            return offset;
        }
        if (rightBounds - 7 > hostBounds.right) {
            var offset = -(rightBounds - hostBounds.right) + 7;
            return offset;
        }
        return 0;
    };
    /**
     * Returns an integer representing the number of pixels that the two given span elements are overlapping, taking into account
     * a space in between the two spans equal to the font-size set on them to account for the space needed to render a hyphen.
     * @param minValueLabel
     * @param valueLabel
     */
    class_1.prototype.getRangeLabelOverlap = function (minValueLabel, valueLabel) {
        var minValueLabelBounds = minValueLabel.getBoundingClientRect();
        var valueLabelBounds = valueLabel.getBoundingClientRect();
        var minValueLabelFontSize = this.getFontSizeForElement(minValueLabel);
        var rangeLabelOverlap = minValueLabelBounds.right + minValueLabelFontSize - valueLabelBounds.left;
        return rangeLabelOverlap > 0 ? rangeLabelOverlap : 0;
    };
    /**
     * Returns a boolean value representing if the minLabel span element is obscured (being overlapped) by the given handle button element.
     * @param minLabel
     * @param handle
     */
    class_1.prototype.isMinTickLabelObscured = function (minLabel, handle) {
        var minLabelBounds = minLabel.getBoundingClientRect();
        var handleBounds = handle.getBoundingClientRect();
        if (handleBounds.left < minLabelBounds.right) {
            return true;
        }
        return false;
    };
    /**
     * Returns a boolean value representing if the maxLabel span element is obscured (being overlapped) by the given handle button element.
     * @param maxLabel
     * @param handle
     */
    class_1.prototype.isMaxTickLabelObscured = function (maxLabel, handle) {
        var maxLabelBounds = maxLabel.getBoundingClientRect();
        var handleBounds = handle.getBoundingClientRect();
        if (handleBounds.right > maxLabelBounds.left) {
            return true;
        }
        return false;
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "histogram": ["histogramWatcher"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
CalciteSlider.style = calciteSliderCss;
export { CalciteSlider as calcite_slider };
