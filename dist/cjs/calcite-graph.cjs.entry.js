'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8fc102d1.js');
const guid = require('./guid-0a2e4f7f.js');

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
    const dx = p1[0] - p0[0];
    const dx1 = p2[0] - p1[0];
    const dy = p1[1] - p0[1];
    const dy1 = p2[1] - p1[1];
    const m = dy / (dx || (dx1 < 0 && 0));
    const m1 = dy1 / (dx1 || (dx < 0 && 0));
    const p = (m * dx1 + m1 * dx) / (dx + dx1);
    return ((sign(m) + sign(m1)) *
        Math.min(Math.abs(m), Math.abs(m1), 0.5 * Math.abs(p)) || 0);
}
/**
 * Calculate slope for just one tangent (single-sided)
 */
function slopeSingle(p0, p1, m) {
    const dx = p1[0] - p0[0];
    const dy = p1[1] - p0[1];
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
    const [x0, y0] = p0;
    const [x1, y1] = p1;
    const dx = (x1 - x0) / 3;
    const h1 = t([x0 + dx, y0 + dx * m0]).join(",");
    const h2 = t([x1 - dx, y1 - dx * m1]).join(",");
    const p = t([x1, y1]).join(",");
    return `C ${h1} ${h2} ${p}`;
}
/**
 * Generate a function which will translate a point
 * from the data coordinate space to svg viewbox oriented pixels
 */
function translate({ width, height, min, max, }) {
    const rangeX = max[0] - min[0];
    const rangeY = max[1] - min[1];
    return (point) => {
        const x = (point[0] / rangeX) * width;
        const y = height - (point[1] / rangeY) * height;
        return [x, y];
    };
}
/**
 * Get the min and max values from the dataset
 */
function range(data) {
    const [startX, startY] = data[0];
    const min = [startX, startY];
    const max = [startX, startY];
    return data.reduce(({ min, max }, [x, y]) => ({
        min: [Math.min(min[0], x), Math.min(min[1], y)],
        max: [Math.max(max[0], x), Math.max(max[1], y)],
    }), { min, max });
}
/**
 * Generate drawing commands for an area graph
 * returns a string can can be passed directly to a path element's `d` attribute
 */
function area({ data, min, max, t }) {
    if (data.length === 0) {
        return "";
    }
    // important points for beginning and ending the path
    const [startX, startY] = t(data[0]);
    const [minX, minY] = t(min);
    const [maxX] = t(max);
    // keep track of previous slope/points
    let m;
    let p0;
    let p1;
    // iterate over data points, calculating command for each
    const commands = data.reduce((acc, point, i) => {
        p0 = data[i - 2];
        p1 = data[i - 1];
        if (i > 1) {
            const m1 = slope(p0, p1, point);
            const m0 = m === undefined ? slopeSingle(p0, p1, m1) : m;
            const command = bezier(p0, p1, m0, m1, t);
            m = m1;
            return `${acc} ${command}`;
        }
        return acc;
    }, `M ${minX},${minY} L ${minX},${startY} L ${startX},${startY}`);
    // close the path
    const last = data[data.length - 1];
    const end = bezier(p1, last, m, slopeSingle(p1, last, m), t);
    return `${commands} ${end} L ${maxX},${minY} Z`;
}

const calciteGraphCss = ":host([hidden]){display:none}.svg{fill:currentColor;stroke:transparent;margin:0;padding:0;display:block}";

const CalciteGraph = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        this.maskId = `calcite-graph-mask-${guid.guid()}`;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    render() {
        const { data, width, height, highlightMax, highlightMin } = this;
        const id = this.maskId;
        // if we have no data, return empty svg
        if (!data || data.length === 0) {
            return (index.h("svg", { preserveAspectRatio: "none", class: "svg", viewBox: `0 0 ${width} ${height}`, width: width, height: height }));
        }
        const { min, max } = range(data);
        const t = translate({ min, max, width, height });
        const [hMinX] = t([highlightMin, max[1]]);
        const [hMaxX] = t([highlightMax, max[1]]);
        const areaPath = area({ data, min, max, t });
        return (index.h("svg", { preserveAspectRatio: "none", class: "svg", viewBox: `0 0 ${width} ${height}`, width: width, height: height }, highlightMin !== undefined ? (index.h("svg", { preserveAspectRatio: "none", class: "svg", viewBox: `0 0 ${width} ${height}`, width: width, height: height }, index.h("mask", { id: `${id}1`, x: "0%", y: "0%", width: "100%", height: "100%" }, index.h("path", { fill: "white", d: `
              M 0,0
              L ${hMinX - 1},0
              L ${hMinX - 1},${height}
              L 0,${height}
              Z
            ` })), index.h("mask", { id: `${id}2`, x: "0%", y: "0%", width: "100%", height: "100%" }, index.h("path", { fill: "white", d: `
              M ${hMinX + 1},0
              L ${hMaxX - 1},0
              L ${hMaxX - 1},${height}
              L ${hMinX + 1}, ${height}
              Z
            ` })), index.h("mask", { id: `${id}3`, x: "0%", y: "0%", width: "100%", height: "100%" }, index.h("path", { fill: "white", d: `
                  M ${hMaxX + 1},0
                  L ${width},0
                  L ${width},${height}
                  L ${hMaxX + 1}, ${height}
                  Z
                ` })), index.h("path", { d: areaPath, class: "graph-path", mask: `url(#${id}1)` }), index.h("path", { d: areaPath, class: "graph-path--highlight", mask: `url(#${id}2)` }), index.h("path", { d: areaPath, class: "graph-path", mask: `url(#${id}3)` }))) : (index.h("path", { d: areaPath, class: "graph-path" }))));
    }
    get el() { return index.getElement(this); }
};
CalciteGraph.style = calciteGraphCss;

exports.calcite_graph = CalciteGraph;
