import "./iframe.js";
import { n as c } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.19 */
const s = "CALCITE-COMBOBOX-ITEM", l = "CALCITE-COMBOBOX-ITEM-GROUP", i = `${s}, ${l}`, d = {
  allSelected: "all-selected",
  chip: "chip",
  chipInvisible: "chip--invisible",
  icon: "icon",
  input: "input",
  inputHidden: "input--hidden",
  label: "label",
  labelIcon: "label--icon",
  listContainer: "list-container",
  placeholderIcon: "placeholder-icon",
  selectAll: "select-all",
  selectionDisplayFit: "selection-display--fit",
  selectionDisplaySingle: "selection-display--single",
  selectedIcon: "selected-icon",
  floatingUIContainer: "floating-ui-container",
  screenReadersOnly: "screen-readers-only",
  wrapper: "wrapper",
  wrapperSingle: "wrapper--single",
  wrapperActive: "wrapper--active"
}, u = {
  validationMessage: "comboboxValidationMessage"
};
function b(e) {
  const n = e.parentElement?.closest(i), t = n?.parentElement?.closest(i);
  return [n, t].filter((o) => o);
}
function m(e) {
  return e.ancestors?.filter((n) => n.nodeName === "CALCITE-COMBOBOX-ITEM") || [];
}
function g(e) {
  return c(e.querySelectorAll("calcite-combobox-item"));
}
function h(e) {
  return c(e.querySelectorAll("calcite-combobox-item")).filter((t) => t.selected).length > 0;
}
function f(e) {
  const n = document.evaluate(
    "ancestor::calcite-combobox-item | ancestor::calcite-combobox-item-group",
    e,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  ), t = n.snapshotLength;
  if (t > 0 && e.nodeName === s) {
    for (let o = 0; o < t; o++)
      if (n.snapshotItem(o).nodeName === l)
        return t;
  } else if (e.nodeName === l)
    return t;
  return t + 1;
}
function C(e) {
  return e.includes("single");
}
function I(e) {
  return e.shortHeading || e.heading || e.textLabel;
}
export {
  d as C,
  u as I,
  s as a,
  l as b,
  m as c,
  g as d,
  b as e,
  f,
  I as g,
  h,
  C as i
};
