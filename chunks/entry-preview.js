import { A as _, B as a } from "./iframe.js";
import { d as u } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.23 */
const { simulatePageLoad: s, simulateDOMContentLoaded: O } = __STORYBOOK_MODULE_PREVIEW_API__, { global: l } = __STORYBOOK_MODULE_GLOBAL__;
var h = Object.defineProperty, y = (n, t) => {
  for (var o in t) h(n, o, { get: t[o], enumerable: !0 });
}, L = {};
y(L, { parameters: () => g, render: () => T, renderToCanvas: () => M });
var { Node: m } = l, T = (n, t) => {
  let { id: o, component: i } = t;
  if (!i) throw new Error(`Unable to render story ${o} as the component annotation is missing from the default export`);
  let d = document.createElement(i);
  return Object.entries(n).forEach(([p, e]) => {
    d[p] = e;
  }), d;
};
function M({ storyFn: n, kind: t, name: o, showMain: i, showError: d, forceRemount: p }, e) {
  let r = n();
  if (i(), _(r)) {
    (p || !e.querySelector('[id="root-inner"]')) && (e.innerHTML = '<div id="root-inner"></div>');
    let f = e.querySelector('[id="root-inner"]');
    a(r, f), s(e);
  } else if (typeof r == "string") e.innerHTML = r, s(e);
  else if (r instanceof m) {
    if (e.firstChild === r && !p) return;
    e.innerHTML = "", e.appendChild(r), O();
  } else d({ title: `Expecting an HTML snippet or DOM node from the story: "${o}" of "${t}".`, description: u`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      ` });
}
var g = { renderer: "web-components" };
export {
  g as parameters,
  T as render,
  M as renderToCanvas
};
