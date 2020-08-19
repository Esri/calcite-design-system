import { r as registerInstance, h, H as Host } from './index-610ae5e8.js';

const calciteTileSelectGroupCss = ":host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}:host ::slotted(calcite-tile-select){margin-right:1px;margin-bottom:1px}";

const CalciteTileSelectGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("slot", null)));
    }
};
CalciteTileSelectGroup.style = calciteTileSelectGroupCss;

export { CalciteTileSelectGroup as calcite_tile_select_group };
