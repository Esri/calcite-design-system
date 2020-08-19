'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-562d2854.js');

const calciteTileSelectGroupCss = ":host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}:host ::slotted(calcite-tile-select){margin-right:1px;margin-bottom:1px}";

const CalciteTileSelectGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h(index.Host, null, index.h("slot", null)));
    }
};
CalciteTileSelectGroup.style = calciteTileSelectGroupCss;

exports.calcite_tile_select_group = CalciteTileSelectGroup;
