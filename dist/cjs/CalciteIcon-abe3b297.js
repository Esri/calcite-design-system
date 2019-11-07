'use strict';

const core = require('./core-01bf3bd6.js');

const CalciteIcon = ({ path, size, svgAttributes, title }) => (core.h("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: size, width: size, fill: "currentColor", viewBox: `0 0 ${size} ${size}` }, svgAttributes),
    title ? core.h("title", null, title) : null,
    core.h("path", { d: path })));

exports.CalciteIcon = CalciteIcon;
