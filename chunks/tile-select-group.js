import { a as e, L as t, x as s, c as i } from "./iframe.js";
import { u as l, I as a } from "./interactive.js";
import { l as o } from "./logger.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
const d = e`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-wrap:wrap}:host ::slotted(calcite-tile-select){margin-block-end:1px;margin-inline-end:1px}:host([layout=vertical]){flex-direction:column}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class n extends t {
  constructor() {
    super(...arguments), this.disabled = !1, this.layout = "horizontal";
  }
  static {
    this.properties = { disabled: 7, layout: 3 };
  }
  static {
    this.styles = d;
  }
  load() {
    o.deprecated("component", {
      name: "tile-select-group",
      removalVersion: 4,
      suggested: ["tile", "tile-group"]
    });
  }
  updated() {
    l(this);
  }
  render() {
    return a({ disabled: this.disabled, children: s`<slot></slot>` });
  }
}
i("calcite-tile-select-group", n);
export {
  n as TileSelectGroup
};
