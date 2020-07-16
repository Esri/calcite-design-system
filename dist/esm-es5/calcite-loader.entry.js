import { r as registerInstance, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { g as guid } from './guid-ef96c8c4.js';
var calciteLoaderCss = "@charset \"UTF-8\";:host([hidden]){display:none}:host{-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:relative;display:none;padding-bottom:4rem;padding-top:4rem;margin-left:auto;margin-right:auto;min-height:var(--loader-size);stroke:var(--calcite-ui-blue-1);stroke-width:3;fill:none;opacity:1;-webkit-transform:scale(1, 1);transform:scale(1, 1);animation:loader-color-shift 6s alternate-reverse infinite linear}:host([scale=s]){--loader-size:33px;--loader-size-inline:13px;font-size:0.8125rem;line-height:1.5}:host([scale=s]) .loader__percentage{font-size:0.625rem}:host([scale=m]){--loader-size:57px;--loader-size-inline:17px;font-size:0.875rem;line-height:1.5}:host([scale=m]) .loader__percentage{font-size:0.875rem}:host([scale=l]){--loader-size:81px;--loader-size-inline:21px;font-size:0.9375rem;line-height:1.5}:host([scale=l]) .loader__percentage{font-size:1.25rem}:host([no-padding]){padding-top:0;padding-bottom:0}:host([active]){display:-ms-flexbox;display:flex}.loader__text{display:block;margin-top:calc(var(--loader-size) + 3rem);text-align:center}.loader__percentage{display:block;width:var(--loader-size);position:absolute;top:4rem;left:50%;margin-left:calc(var(--loader-size) / 2 * -1);margin-top:calc(var(--loader-size) / 2);text-align:center;color:var(--calcite-ui-text-1);line-height:0.25;-webkit-transform:scale(1, 1);transform:scale(1, 1)}.loader__svgs{width:var(--loader-size);height:var(--loader-size);position:absolute;top:4rem;left:50%;margin-left:calc(var(--loader-size) / 2 * -1);overflow:visible;opacity:1;-webkit-transform:scale(1, 1);transform:scale(1, 1)}.loader__svg{width:var(--loader-size);height:var(--loader-size);position:absolute;top:0;left:0;overflow:visible;-webkit-transform-origin:center;transform-origin:center;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-name:loader-clockwise;animation-name:loader-clockwise}@supports (display: grid){.loader__svg--1{-webkit-animation-name:loader-offset-1;animation-name:loader-offset-1}.loader__svg--2{-webkit-animation-name:loader-offset-2;animation-name:loader-offset-2}.loader__svg--3{-webkit-animation-name:loader-offset-3;animation-name:loader-offset-3}}:host([type=determinate]){stroke:var(--calcite-ui-border-3);-webkit-animation:none;animation:none}:host([type=determinate]) .loader__svg--3{stroke:var(--calcite-ui-blue-1);stroke-dasharray:157.0795;-webkit-transform:rotate(-90deg);transform:rotate(-90deg);-webkit-animation:none;animation:none;-webkit-transition:all 100ms linear;transition:all 100ms linear}:host([inline]){stroke:currentColor;stroke-width:2;-webkit-animation:none;animation:none;margin:0;padding-bottom:0;padding-top:0;position:relative;height:var(--loader-size-inline);min-height:var(--loader-size-inline);width:var(--loader-size-inline);margin-right:var(--loader-size-inline)/2;vertical-align:-var(--loader-size-inline)/5}:host([inline][dir=rtl]){margin-left:var(--loader-size-inline)/2;margin-right:0}:host([active][inline]){display:inline-block}:host([inline]) .loader__svgs{top:0;left:0;margin:0;width:var(--loader-size-inline);height:var(--loader-size-inline)}:host([inline]) .loader__svg{width:var(--loader-size-inline);height:var(--loader-size-inline)}:host([complete]){opacity:0;-webkit-transform:scale(0.75, 0.75);transform:scale(0.75, 0.75);-webkit-transform-origin:center;transform-origin:center;-webkit-transition:opacity 200ms linear 1000ms, -webkit-transform 200ms linear 1000ms;transition:opacity 200ms linear 1000ms, -webkit-transform 200ms linear 1000ms;transition:opacity 200ms linear 1000ms, transform 200ms linear 1000ms;transition:opacity 200ms linear 1000ms, transform 200ms linear 1000ms, -webkit-transform 200ms linear 1000ms}:host([complete]) .loader__svgs{opacity:0;-webkit-transform:scale(0.75, 0.75);transform:scale(0.75, 0.75);-webkit-transform-origin:center;transform-origin:center;-webkit-transition:opacity 180ms linear 800ms, -webkit-transform 180ms linear 800ms;transition:opacity 180ms linear 800ms, -webkit-transform 180ms linear 800ms;transition:opacity 180ms linear 800ms, transform 180ms linear 800ms;transition:opacity 180ms linear 800ms, transform 180ms linear 800ms, -webkit-transform 180ms linear 800ms}:host([complete]) .loader__percentage{color:var(--calcite-ui-blue-1);-webkit-transform:scale(1.05, 1.05);transform:scale(1.05, 1.05);-webkit-transform-origin:center;transform-origin:center;-webkit-transition:color 200ms linear, -webkit-transform 200ms linear;transition:color 200ms linear, -webkit-transform 200ms linear;transition:color 200ms linear, transform 200ms linear;transition:color 200ms linear, transform 200ms linear, -webkit-transform 200ms linear}.loader__svg--1{stroke-dasharray:28.0499107143% 140.2495535714%;-webkit-animation-duration:0.72s;animation-duration:0.72s}@-webkit-keyframes loader-offset-1{0%{stroke-dasharray:28.0499107143% 252.4491964286%;stroke-dashoffset:0}50%{stroke-dasharray:140.2495535714% 140.2495535714%;stroke-dashoffset:-84.1497321429%}100%{stroke-dasharray:28.0499107143% 252.4491964286%;stroke-dashoffset:-280.4991071429%}}@keyframes loader-offset-1{0%{stroke-dasharray:28.0499107143% 252.4491964286%;stroke-dashoffset:0}50%{stroke-dasharray:140.2495535714% 140.2495535714%;stroke-dashoffset:-84.1497321429%}100%{stroke-dasharray:28.0499107143% 252.4491964286%;stroke-dashoffset:-280.4991071429%}}.loader__svg--2{stroke-dasharray:56.0998214286% 140.2495535714%;-webkit-animation-duration:0.96s;animation-duration:0.96s}@-webkit-keyframes loader-offset-2{0%{stroke-dasharray:56.0998214286% 224.3992857143%;stroke-dashoffset:0}50%{stroke-dasharray:140.2495535714% 140.2495535714%;stroke-dashoffset:-98.1746875%}100%{stroke-dasharray:56.0998214286% 224.3992857143%;stroke-dashoffset:-280.4991071429%}}@keyframes loader-offset-2{0%{stroke-dasharray:56.0998214286% 224.3992857143%;stroke-dashoffset:0}50%{stroke-dasharray:140.2495535714% 140.2495535714%;stroke-dashoffset:-98.1746875%}100%{stroke-dasharray:56.0998214286% 224.3992857143%;stroke-dashoffset:-280.4991071429%}}.loader__svg--3{stroke-dasharray:14.0249553571% 140.2495535714%;-webkit-animation-duration:1.16s;animation-duration:1.16s}@-webkit-keyframes loader-offset-3{0%{stroke-dasharray:14.0249553571% 266.4741517857%;stroke-dashoffset:0}50%{stroke-dasharray:140.2495535714% 140.2495535714%;stroke-dashoffset:-77.1372544643%}100%{stroke-dasharray:14.0249553571% 266.4741517857%;stroke-dashoffset:-280.4991071429%}}@keyframes loader-offset-3{0%{stroke-dasharray:14.0249553571% 266.4741517857%;stroke-dashoffset:0}50%{stroke-dasharray:140.2495535714% 140.2495535714%;stroke-dashoffset:-77.1372544643%}100%{stroke-dasharray:14.0249553571% 266.4741517857%;stroke-dashoffset:-280.4991071429%}}@-webkit-keyframes loader-color-shift{0%{stroke:var(--calcite-ui-blue-1)}33%{stroke:var(--calcite-ui-blue-3)}66%{stroke:var(--calcite-ui-blue-2)}100%{stroke:var(--calcite-ui-blue-1)}}@keyframes loader-color-shift{0%{stroke:var(--calcite-ui-blue-1)}33%{stroke:var(--calcite-ui-blue-3)}66%{stroke:var(--calcite-ui-blue-2)}100%{stroke:var(--calcite-ui-blue-1)}}@-webkit-keyframes loader-clockwise{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes loader-clockwise{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}";
var CalciteLoader = /** @class */ (function () {
    function CalciteLoader(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Show the loader */
        this.active = false;
        /** Inline loaders are smaller and will appear to the left of the text */
        this.inline = false;
        /** Speficy the scale of the loader. Defaults to "m" */
        this.scale = "m";
        /** Percent complete of 100, only valid for determinate indicators */
        this.value = 0;
        /** Text which should appear under the loading indicator (optional) */
        this.text = "";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteLoader.prototype.connectedCallback = function () {
        // prop validations
        var scales = ["s", "m", "l"];
        if (!scales.includes(this.scale))
            this.scale = "m";
        var types = ["indeterminate", "determinate"];
        if (!types.includes(this.type))
            this.type = "indeterminate";
    };
    CalciteLoader.prototype.render = function () {
        var _a = this, el = _a.el, inline = _a.inline, scale = _a.scale, text = _a.text, type = _a.type, value = _a.value;
        var id = el.id || guid;
        var radiusRatio = 0.45;
        var size = inline ? this.getInlineSize(scale) : this.getSize(scale);
        var radius = size * radiusRatio;
        var viewbox = "0 0 " + size + " " + size;
        var isDeterminate = type === "determinate";
        var circumference = 2 * radius * Math.PI;
        var progress = (value / 100) * circumference;
        var remaining = circumference - progress;
        var valueNow = Math.floor(value);
        var hostAttributes = {
            "aria-valuenow": valueNow,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            complete: valueNow === 100,
        };
        var svgAttributes = { r: radius, cx: size / 2, cy: size / 2 };
        var determinateStyle = { "stroke-dasharray": progress + " " + remaining };
        return (h(Host, Object.assign({ id: id, role: "progressbar" }, (isDeterminate ? hostAttributes : {})), h("div", { class: "loader__svgs" }, h("svg", { viewBox: viewbox, class: "loader__svg loader__svg--1" }, h("circle", Object.assign({}, svgAttributes))), h("svg", { viewBox: viewbox, class: "loader__svg loader__svg--2" }, h("circle", Object.assign({}, svgAttributes))), h("svg", Object.assign({ viewBox: viewbox, class: "loader__svg loader__svg--3" }, (isDeterminate ? { style: determinateStyle } : {})), h("circle", Object.assign({}, svgAttributes)))), text && h("div", { class: "loader__text" }, text), isDeterminate && h("div", { class: "loader__percentage" }, value)));
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Return the proper sizes based on the scale property
     */
    CalciteLoader.prototype.getSize = function (scale) {
        return {
            "s": 32,
            "m": 56,
            "l": 80
        }[scale];
    };
    CalciteLoader.prototype.getInlineSize = function (scale) {
        return {
            "s": 12,
            "m": 16,
            "l": 20
        }[scale];
    };
    Object.defineProperty(CalciteLoader.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return CalciteLoader;
}());
CalciteLoader.style = calciteLoaderCss;
export { CalciteLoader as calcite_loader };
