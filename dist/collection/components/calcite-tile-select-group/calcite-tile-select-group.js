import { Component, Host, h } from "@stencil/core";
export class CalciteTileSelectGroup {
    render() {
        return (h(Host, null,
            h("slot", null)));
    }
    static get is() { return "calcite-tile-select-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-tile-select-group.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-tile-select-group.css"]
    }; }
}
