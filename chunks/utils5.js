import "./iframe.js";
import { n as s } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.2 */
const c = "CALCITE-COMBOBOX-ITEM", i = "CALCITE-COMBOBOX-ITEM-GROUP", r = `${c}, ${i}`, u = {
  input: "input",
  inputHidden: "input--hidden",
  chip: "chip",
  chipInvisible: "chip--invisible",
  selectionDisplayFit: "selection-display-fit",
  selectionDisplaySingle: "selection-display-single",
  listContainer: "list-container",
  icon: "icon",
  placeholderIcon: "placeholder-icon",
  selectedIcon: "selected-icon",
  floatingUIContainer: "floating-ui-container",
  screenReadersOnly: "screen-readers-only",
  wrapper: "wrapper",
  wrapperSingle: "wrapper--single",
  wrapperActive: "wrapper--active"
}, d = {
  validationMessage: "comboboxValidationMessage"
};
function m(e) {
  const n = e.parentElement?.closest(r), t = n?.parentElement?.closest(r);
  return [n, t].filter((o) => o);
}
function g(e) {
  return e.ancestors?.filter((n) => n.nodeName === "CALCITE-COMBOBOX-ITEM") || [];
}
function b(e) {
  return s(e.querySelectorAll("calcite-combobox-item"));
}
function h(e) {
  return s(e.querySelectorAll("calcite-combobox-item")).filter((t) => t.selected).length > 0;
}
function f(e) {
  const n = document.evaluate(
    "ancestor::calcite-combobox-item | ancestor::calcite-combobox-item-group",
    e,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  ), t = n.snapshotLength;
  if (t > 0 && e.nodeName === c) {
    for (let o = 0; o < t; o++)
      if (n.snapshotItem(o).nodeName === i)
        return t;
  } else if (e.nodeName === i)
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
  u as C,
  d as I,
  c as a,
  i as b,
  g as c,
  b as d,
  m as e,
  f,
  I as g,
  h,
  C as i
};
