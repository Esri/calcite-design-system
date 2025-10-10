import { b as o, L as e, x as t, q as r } from "./index.js";
import { l as i } from "./logger.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const c = o`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{box-sizing:border-box;display:block;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}::slotted(calcite-tip){margin:0;border-style:none;max-inline-size:var(--calcite-tip-max-width)}:host([hidden]){display:none}[hidden]{display:none}`;
class l extends e {
  static {
    this.properties = { groupTitle: 1 };
  }
  static {
    this.styles = c;
  }
  load() {
    i.deprecated("component", {
      name: "tip-group",
      removalVersion: 4,
      suggested: ["carousel", "carousel-item"]
    });
  }
  render() {
    return t`<slot></slot>`;
  }
}
r("calcite-tip-group", l);
export {
  l as TipGroup
};
