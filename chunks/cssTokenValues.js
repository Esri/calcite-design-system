/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.9 */
function t(e) {
  const o = {
    spacing: "42px",
    // granular patterns for the same token must be listed first to match correctly
    background$: "rgb(252, 244, 52)",
    "text-color$": "rgb(239, 118, 39)",
    "border-color$": "rgb(156, 89, 209)",
    "background-color$": "rgb(252, 244, 52)",
    "icon-color-end$": "rgb(213, 156, 74)",
    "icon-color-start$": "rgb(98, 213, 180)",
    color$: "rgb(0, 191, 255)",
    hover$: "rgb(255, 105, 180)",
    pressed$: "rgb(44, 44, 44)",
    press$: "rgb(44, 44, 44)",
    selected$: "rgb(156, 89, 209)",
    shadow$: "rgb(255, 255, 255) 0px 0px 0px 4px, rgb(255, 105, 180) 0px 0px 0px 5px inset, rgb(0, 191, 255) 0px 0px 0px 9px",
    "(z-index)$": "42",
    "(columns|gap|height|offset|radius|size|size-y|size-x|space|space-x|space-y|width|margin-bottom)": "42px"
  }, r = Object.entries(o).find(([n]) => new RegExp(n, "g").test(e));
  return r ? r[1] : (console.warn("token not found in tokenValueMap", e), o.color$);
}
function s(e, o = `
`) {
  return e.map((r) => `${r}: ${t(r)};`).join(o);
}
export {
  s
};
