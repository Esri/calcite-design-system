'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8fc102d1.js');

const calciteProgressCss = ":host([hidden]){display:none}:host{position:relative;display:block;height:2px;width:100%}.track,.bar{position:absolute;top:0;height:2px}.track{background:var(--calcite-ui-border-3);z-index:0;width:100%;overflow:hidden}.bar{background-color:var(--calcite-ui-blue-1);z-index:0}.indeterminate{width:20%;-webkit-animation:looping-progress-bar-ani 2200ms linear infinite;animation:looping-progress-bar-ani 2200ms linear infinite}.reversed{right:0}.text{padding:1.5rem 0 0 0}@-webkit-keyframes looping-progress-bar-ani{0%{-webkit-transform:translate3d(-100%, 0, 0);transform:translate3d(-100%, 0, 0)}50%{width:40%}100%{-webkit-transform:translate3d(600%, 0, 0);transform:translate3d(600%, 0, 0)}}@keyframes looping-progress-bar-ani{0%{-webkit-transform:translate3d(-100%, 0, 0);transform:translate3d(-100%, 0, 0)}50%{width:40%}100%{-webkit-transform:translate3d(600%, 0, 0);transform:translate3d(600%, 0, 0)}}";

const CalciteProgress = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /** Use indeterminate if finding actual progress value is impossible */
        this.type = "determinate";
        /** Percent complete of 100 */
        this.value = 0;
        /** Text label for the progress indicator */
        this.text = null;
        /** Fill bar in the opposite direction */
        this.reversed = false;
    }
    render() {
        const isDeterminate = this.type === "determinate";
        const barStyles = isDeterminate ? { width: `${this.value * 100}%` } : {};
        return (index.h(index.Host, null, index.h("div", { class: "track" }, index.h("div", { class: {
                bar: true,
                indeterminate: this.type === "indeterminate",
                reversed: this.reversed,
            }, style: barStyles })), this.text ? index.h("div", { class: "text" }, this.text) : null));
    }
    get el() { return index.getElement(this); }
};
CalciteProgress.style = calciteProgressCss;

exports.calcite_progress = CalciteProgress;
