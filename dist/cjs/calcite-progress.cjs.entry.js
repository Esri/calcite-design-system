'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./calcite-8834ad67.js');

class CalciteProgress {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        /**
         * Use indeterminate if finding actual progress value is impossible
         */
        this.type = "determinate";
        /**
         * Percent complete of 100
         */
        this.value = 0;
        /**
         * Text label for the progress indicator
         */
        this.text = null;
        /**
         * Fill bar in the opposite direction
         */
        this.reversed = false;
    }
    render() {
        return (__chunk_1.h(__chunk_1.Host, { class: "calcite-progress", type: this.type, reversed: this.reversed, style: {
                "--percentage-value": `${this.value * 100}%`
            } }, __chunk_1.h("div", { class: "calcite-progress__text" }, this.text), __chunk_1.h("slot", null)));
    }
    get el() { return __chunk_1.getElement(this); }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}calcite-tabs{display:block}.calcite-progress{position:relative;display:block}.calcite-progress:after,.calcite-progress:before{content:\"\";opacity:1;position:absolute;height:2px;top:0;-webkit-transition:opacity .5s ease-in-out;transition:opacity .5s ease-in-out}.calcite-progress:before{background-color:#007ac2;z-index:0;width:100%}.calcite-progress:after{background-color:hsla(0,0%,100%,.6);z-index:0}.calcite-progress[type=indeterminate]:after{width:20%;-webkit-animation:looping-progresss-bar-ani 1.5s linear infinite;animation:looping-progresss-bar-ani 1.5s linear infinite}.calcite-progress[type=determinate]:after{width:var(--percentage-value)}.calcite-progress__text{text-align:center}\@-webkit-keyframes looping-progresss-bar-ani{0%{left:0;width:0}20%{left:0;width:20%}80%{left:80%;width:20%}to{left:100%;width:0}}\@keyframes looping-progresss-bar-ani{0%{left:0;width:0}20%{left:0;width:20%}80%{left:80%;width:20%}to{left:100%;width:0}}"; }
}

exports.calcite_progress = CalciteProgress;
