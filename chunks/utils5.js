import { n as s } from "./dom.js";
import { i as a } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
const c = "CALCITE-COMBOBOX-ITEM", i = "CALCITE-COMBOBOX-ITEM-GROUP", r = `${c}, ${i}`, d = {
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
}, m = {
  validationMessage: "comboboxValidationMessage"
};
function g(e) {
  const n = e.parentElement?.closest(r), t = n?.parentElement?.closest(r);
  return [n, t].filter((o) => o);
}
function b(e) {
  return e.ancestors?.filter((n) => n.nodeName === "CALCITE-COMBOBOX-ITEM") || [];
}
function f(e) {
  return s(e.querySelectorAll("calcite-combobox-item"));
}
function h(e) {
  return s(e.querySelectorAll("calcite-combobox-item")).filter((t) => t.selected).length > 0;
}
function C(e) {
  if (!a())
    return 0;
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
function I(e) {
  return e.includes("single");
}
function O(e) {
  return e.shortHeading || e.heading || e.textLabel;
}
export {
  d as C,
  m as I,
  c as a,
  i as b,
  b as c,
  f as d,
  g as e,
  C as f,
  O as g,
  h,
  I as i
};
