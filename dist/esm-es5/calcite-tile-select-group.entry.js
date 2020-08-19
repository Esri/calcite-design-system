import { r as registerInstance, h, H as Host } from './index-610ae5e8.js';
var calciteTileSelectGroupCss = ":host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}:host ::slotted(calcite-tile-select){margin-right:1px;margin-bottom:1px}";
var CalciteTileSelectGroup = /** @class */ (function () {
    function CalciteTileSelectGroup(hostRef) {
        registerInstance(this, hostRef);
    }
    CalciteTileSelectGroup.prototype.render = function () {
        return (h(Host, null, h("slot", null)));
    };
    return CalciteTileSelectGroup;
}());
CalciteTileSelectGroup.style = calciteTileSelectGroupCss;
export { CalciteTileSelectGroup as calcite_tile_select_group };
