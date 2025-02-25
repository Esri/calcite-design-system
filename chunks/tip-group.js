import { h as e, L as t, x as o, j as i } from "./iframe.js";
import { l as r } from "./logger.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
const s = e`:host{box-sizing:border-box;display:block;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}::slotted(calcite-tip){margin:0;border-style:none;max-inline-size:var(--calcite-tip-max-width)}:host([hidden]){display:none}[hidden]{display:none}`;
class l extends t {
  static {
    this.properties = { groupTitle: 1 };
  }
  static {
    this.styles = s;
  }
  // #endregion
  // #region Lifecycle
  load() {
    r.deprecated("component", {
      name: "tip-group",
      removalVersion: 4,
      suggested: ["carousel", "carousel-item"]
    });
  }
  // #endregion
  // #region Rendering
  render() {
    return o`<slot></slot>`;
  }
}
i("calcite-tip-group", l);
export {
  l as TipGroup
};
