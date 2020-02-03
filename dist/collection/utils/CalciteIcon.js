import { h } from "@stencil/core";
export const CalciteIcon = ({ path, size, svgAttributes, title }) => (h("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: size, width: size, fill: "currentColor", viewBox: `0 0 ${size} ${size}` }, svgAttributes),
    title ? h("title", null, title) : null,
    h("path", { d: path })));
export default CalciteIcon;
