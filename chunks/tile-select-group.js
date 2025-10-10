import { b as e, L as t, x as s, q as o } from "./index.js";
import { u as i, I as l } from "./interactive.js";
import { l as a } from "./logger.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const r = e`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-wrap:wrap}:host ::slotted(calcite-tile-select){margin-block-end:1px;margin-inline-end:1px}:host([layout=vertical]){flex-direction:column}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class c extends t {
  constructor() {
    super(...arguments), this.disabled = !1, this.layout = "horizontal";
  }
  static {
    this.properties = { disabled: 7, layout: 3 };
  }
  static {
    this.styles = r;
  }
  load() {
    a.deprecated("component", {
      name: "tile-select-group",
      removalVersion: 4,
      suggested: ["tile", "tile-group"]
    });
  }
  updated() {
    i(this);
  }
  render() {
    return l({ disabled: this.disabled, children: s`<slot></slot>` });
  }
}
o("calcite-tile-select-group", c);
export {
  c as TileSelectGroup
};
