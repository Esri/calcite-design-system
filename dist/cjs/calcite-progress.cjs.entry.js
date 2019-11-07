'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-01bf3bd6.js');
const dom = require('./dom-7866810c.js');

const CalciteProgress = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
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
        /** Select theme (light or dark) */
        this.theme = "light";
    }
    render() {
        const theme = dom.getElementTheme(this.el);
        return (core.h(core.Host, { class: "calcite-progress", type: this.type, reversed: this.reversed, style: {
                "--percentage-value": `${this.value * 100}%`
            }, theme: theme }, core.h("div", { class: "calcite-progress--track" }), core.h("div", { class: {
                "calcite-progress--bar": true,
                "--indeterminate": this.type === "indeterminate",
                "--determinate": this.type === "determinate"
            } }), core.h("div", { class: "calcite-progress--text" }, this.text), core.h("slot", null)));
    }
    get el() { return core.getElement(this); }
    static get style() { return ":root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}:host([theme=dark]){--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{--calcite-progress-color:#007ac2;--calcite-track-color:#eaeaea;position:relative;display:block}:host([theme=dark]){--calcite-progress-color:#00a0ff;--calcite-track-color:#353535}.calcite-progress--bar,.calcite-progress--track{content:\"\";opacity:1;position:absolute;height:2px;top:0;-webkit-transition:opacity .5s ease-in-out;transition:opacity .5s ease-in-out}.calcite-progress--track{background:var(--calcite-track-color);z-index:0;width:100%}.calcite-progress--bar{background-color:var(--calcite-progress-color);z-index:0}.--indeterminate{width:20%;-webkit-animation:looping-progress-bar-ani 1.5s linear infinite;animation:looping-progress-bar-ani 1.5s linear infinite}.--determinate{width:var(--percentage-value)}.calcite-progress--text{padding:20px 0 0 0}\@-webkit-keyframes looping-progress-bar-ani{0%{left:0;width:0}20%{left:0;width:20%}80%{left:80%;width:20%}to{left:100%;width:0}}\@keyframes looping-progress-bar-ani{0%{left:0;width:0}20%{left:0;width:20%}80%{left:80%;width:20%}to{left:100%;width:0}}"; }
};

exports.calcite_progress = CalciteProgress;
