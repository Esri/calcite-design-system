'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-eefb78d6.js');
const __chunk_3 = require('./chunk-7f841849.js');
const __chunk_4 = require('./chunk-51cd86d5.js');

class CalciteLoader {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
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
        this.guid = `calcite-loader-${__chunk_3.guid()}`;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidLoad() {
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
        const dir = __chunk_4.getElementDir(this.el);
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
        return (__chunk_1.h(__chunk_1.Host, Object.assign({ id: id, dir: dir, role: "progressbar" }, (this.type === "determinate" ? ariaAttributes : {}), { style: styleProperties }), __chunk_1.h("svg", { viewBox: viewbox, class: "loader__square" }, __chunk_1.h("rect", { width: size, height: size })), __chunk_1.h("svg", { viewBox: viewbox, class: "loader__square loader__square--2" }, __chunk_1.h("rect", { width: size, height: size })), __chunk_1.h("svg", { viewBox: viewbox, class: "loader__square loader__square--3", style: isDeterminate ? progress : {} }, __chunk_1.h("rect", { width: size, height: size })), this.text ? __chunk_1.h("div", { class: "loader__text" }, this.text) : "", this.value ? (__chunk_1.h("div", { class: "loader__percentage" }, Math.floor(this.value))) : ("")));
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
    get el() { return __chunk_1.getElement(this); }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tabs{display:block}:host{--calcite-loader-spot:#007ac2;--calcite-loader-spot-light:#009af2;--calcite-loader-spot-dark:#00619b;--calcite-loader-neutral:#eaeaea}:host([theme=dark]){--calcite-loader-neutral:#151515}:host{position:relative;display:none;padding-bottom:4rem;padding-top:4rem;margin-left:auto;margin-right:auto;min-height:54px;stroke:var(--calcite-loader-light);stroke-width:6px;stroke-dashoffset:0;fill:none;animation:loader-color-shift 2s linear infinite alternate-reverse}:host([is-active]){display:block}.loader__text{margin-top:4rem;line-height:1.5}.loader__percentage,.loader__text{display:block;text-align:center;font-size:.875rem}.loader__percentage{left:50%;margin-top:27px;line-height:.25}.loader__percentage,.loader__square{width:54px;position:absolute;top:4rem;margin-left:-27px}.loader__square{height:54px;left:0;left:50%;stroke-dasharray:50% 350%;-webkit-animation:loader-clockwise 2s linear infinite;animation:loader-clockwise 2s linear infinite}.loader__square--2{stroke-dasharray:100% 225% 50% 25%;-webkit-animation:loader-clockwise 1s linear infinite;animation:loader-clockwise 1s linear infinite}.loader__square--3{stroke-dasharray:50% 50% 75% 225%;-webkit-animation:loader-clockwise 1.85s linear infinite;animation:loader-clockwise 1.85s linear infinite}\@supports (-ms-ime-align:auto){.loader__square{stroke-dashoffset:var(--calcite-loader-offset);-webkit-animation:none;animation:none}.loader__square--2{stroke-dashoffset:var(--calcite-loader-offset2)}.loader__square--3{stroke-dashoffset:var(--calcite-loader-offset3)}}:host([type=determinate]){stroke:var(--calcite-loader-neutral);-webkit-animation:none;animation:none}:host([type=determinate]) .loader__square--3{stroke:var(--calcite-loader-spot);stroke-dasharray:400%;stroke-dashoffset:var(--calcite-loader-progress);-webkit-transition:all 50ms linear;transition:all 50ms linear;-webkit-transform:rotate(90deg);transform:rotate(90deg);-webkit-animation:none;animation:none}:host([inline]){stroke:currentColor;stroke-width:4px;-webkit-animation:none;animation:none;margin:0;padding-bottom:0;padding-top:0;position:relative;height:16px;min-height:16px;width:16px;margin-right:8px;vertical-align:-2px}:host([inline][dir=rtl]){margin-left:8px;margin-right:0}:host([is-active][inline]){display:inline-block}:host([inline]) .loader__square{margin:0;position:absolute;top:0;left:0;width:16px;height:16px}\@-webkit-keyframes loader-color-shift{0%{stroke:var(--calcite-loader-spot-light)}to{stroke:var(--calcite-loader-spot-dark)}}\@keyframes loader-color-shift{0%{stroke:var(--calcite-loader-spot-light)}to{stroke:var(--calcite-loader-spot-dark)}}\@-webkit-keyframes loader-clockwise{0%{stroke-dashoffset:0}to{stroke-dashoffset:-400%}}\@keyframes loader-clockwise{0%{stroke-dashoffset:0}to{stroke-dashoffset:-400%}}"; }
}

exports.calcite_loader = CalciteLoader;
