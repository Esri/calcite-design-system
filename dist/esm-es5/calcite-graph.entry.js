import { r as registerInstance, h, g as getElement } from './index-2cc146ea.js';
import { g as guid } from './guid-ef96c8c4.js';
/**
 * Math.sign not supported in IE
 */
function sign(x) {
    return x < 0 ? -1 : 1;
}
/**
 * Calculate slope of the tangents
 * uses Steffen interpolation as it's monotonic
 * http://jrwalsh1.github.io/posts/interpolations/
 */
function slope(p0, p1, p2) {
    var dx = p1[0] - p0[0];
    var dx1 = p2[0] - p1[0];
    var dy = p1[1] - p0[1];
    var dy1 = p2[1] - p1[1];
    var m = dy / (dx || (dx1 < 0 && 0));
    var m1 = dy1 / (dx1 || (dx < 0 && 0));
    var p = (m * dx1 + m1 * dx) / (dx + dx1);
    return ((sign(m) + sign(m1)) *
        Math.min(Math.abs(m), Math.abs(m1), 0.5 * Math.abs(p)) || 0);
}
/**
 * Calculate slope for just one tangent (single-sided)
 */
function slopeSingle(p0, p1, m) {
    var dx = p1[0] - p0[0];
    var dy = p1[1] - p0[1];
    return dx ? ((3 * dy) / dx - m) / 2 : m;
}
/**
 * Given two points and their tangent slopes,
 * calculate the bezier handle coordinates and return draw command.
 *
 * Translates Hermite Spline to Beziér curve:
 * stackoverflow.com/questions/42574940/
 */
function bezier(p0, p1, m0, m1, t) {
    var x0 = p0[0], y0 = p0[1];
    var x1 = p1[0], y1 = p1[1];
    var dx = (x1 - x0) / 3;
    var h1 = t([x0 + dx, y0 + dx * m0]).join(",");
    var h2 = t([x1 - dx, y1 - dx * m1]).join(",");
    var p = t([x1, y1]).join(",");
    return "C " + h1 + " " + h2 + " " + p;
}
/**
 * Generate a function which will translate a point
 * from the data coordinate space to svg viewbox oriented pixels
 */
function translate(_a) {
    var width = _a.width, height = _a.height, min = _a.min, max = _a.max;
    var rangeX = max[0] - min[0];
    var rangeY = max[1] - min[1];
    return function (point) {
        var x = (point[0] / rangeX) * width;
        var y = height - (point[1] / rangeY) * height;
        return [x, y];
    };
}
/**
 * Get the min and max values from the dataset
 */
function range(data) {
    var _a = data[0], startX = _a[0], startY = _a[1];
    var min = [startX, startY];
    var max = [startX, startY];
    return data.reduce(function (_a, _b) {
        var min = _a.min, max = _a.max;
        var x = _b[0], y = _b[1];
        return ({
            min: [Math.min(min[0], x), Math.min(min[1], y)],
            max: [Math.max(max[0], x), Math.max(max[1], y)],
        });
    }, { min: min, max: max });
}
/**
 * Generate drawing commands for an area graph
 * returns a string can can be passed directly to a path element's `d` attribute
 */
function area(_a) {
    var data = _a.data, min = _a.min, max = _a.max, t = _a.t;
    if (data.length === 0) {
        return "";
    }
    // important points for beginning and ending the path
    var _b = t(data[0]), startX = _b[0], startY = _b[1];
    var _c = t(min), minX = _c[0], minY = _c[1];
    var maxX = t(max)[0];
    // keep track of previous slope/points
    var m;
    var p0;
    var p1;
    // iterate over data points, calculating command for each
    var commands = data.reduce(function (acc, point, i) {
        p0 = data[i - 2];
        p1 = data[i - 1];
        if (i > 1) {
            var m1 = slope(p0, p1, point);
            var m0 = m === undefined ? slopeSingle(p0, p1, m1) : m;
            var command = bezier(p0, p1, m0, m1, t);
            m = m1;
            return acc + " " + command;
        }
        return acc;
    }, "M " + minX + "," + minY + " L " + minX + "," + startY + " L " + startX + "," + startY);
    // close the path
    var last = data[data.length - 1];
    var end = bezier(p1, last, m, slopeSingle(p1, last, m), t);
    return commands + " " + end + " L " + maxX + "," + minY + " Z";
}
var calciteGraphCss = ":host([hidden]){display:none}.svg{fill:currentColor;stroke:transparent;margin:0;padding:0;display:block}";
var CalciteGraph = /** @class */ (function () {
    function CalciteGraph(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Array of tuples describing a single data point ([x, y])
         * These data points should be sorted by x-axis value
         */
        this.data = [];
        /** Width of graph in pixels*/
        this.width = 300;
        /** Width of graph in pixels*/
        this.height = 100;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        this.maskId = "calcite-graph-mask-" + guid();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteGraph.prototype.componentWillUpdate = function () { };
    CalciteGraph.prototype.render = function () {
        var _a = this, data = _a.data, width = _a.width, height = _a.height, highlightMax = _a.highlightMax, highlightMin = _a.highlightMin;
        var id = this.maskId;
        // if we have no data, return empty svg
        if (!data || data.length === 0) {
            return (h("svg", { preserveAspectRatio: "none", class: "svg", viewBox: "0 0 " + width + " " + height, width: width, height: height }));
        }
        var _b = range(data), min = _b.min, max = _b.max;
        var t = translate({ min: min, max: max, width: width, height: height });
        var hMinX = t([highlightMin, max[1]])[0];
        var hMaxX = t([highlightMax, max[1]])[0];
        var areaPath = area({ data: data, min: min, max: max, t: t });
        return (h("svg", { preserveAspectRatio: "none", class: "svg", viewBox: "0 0 " + width + " " + height, width: width, height: height }, highlightMin !== undefined ? (h("svg", { preserveAspectRatio: "none", class: "svg", viewBox: "0 0 " + width + " " + height, width: width, height: height }, h("mask", { id: id + "1", x: "0%", y: "0%", width: "100%", height: "100%" }, h("path", { fill: "white", d: "\n              M 0,0\n              L " + (hMinX - 1) + ",0\n              L " + (hMinX - 1) + "," + height + "\n              L 0," + height + "\n              Z\n            " })), h("mask", { id: id + "2", x: "0%", y: "0%", width: "100%", height: "100%" }, h("path", { fill: "white", d: "\n              M " + (hMinX + 1) + ",0\n              L " + (hMaxX - 1) + ",0\n              L " + (hMaxX - 1) + "," + height + "\n              L " + (hMinX + 1) + ", " + height + "\n              Z\n            " })), h("mask", { id: id + "3", x: "0%", y: "0%", width: "100%", height: "100%" }, h("path", { fill: "white", d: "\n                  M " + (hMaxX + 1) + ",0\n                  L " + width + ",0\n                  L " + width + "," + height + "\n                  L " + (hMaxX + 1) + ", " + height + "\n                  Z\n                " })), h("path", { d: areaPath, class: "graph-path", mask: "url(#" + id + "1)" }), h("path", { d: areaPath, class: "graph-path--highlight", mask: "url(#" + id + "2)" }), h("path", { d: areaPath, class: "graph-path", mask: "url(#" + id + "3)" }))) : (h("path", { d: areaPath, class: "graph-path" }))));
    };
    Object.defineProperty(CalciteGraph.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return CalciteGraph;
}());
CalciteGraph.style = calciteGraphCss;
export { CalciteGraph as calcite_graph };
