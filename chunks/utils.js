import "./index10.js";
import { C as d } from "./iframe.js";
import { h as m } from "./formatting.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.5 */
const { useParameter: y, addons: S, useEffect: g, useMemo: I } = __STORYBOOK_MODULE_PREVIEW_API__;
var C = Object.defineProperty, v = (e, t) => {
  for (var s in t) C(e, s, { get: t[s], enumerable: !0 });
}, M = {};
v(M, { initializeThemeState: () => x, pluckThemeFromContext: () => _, useThemeParameters: () => p });
var f = "themes", k = `storybook/${f}`, O = "theme", R = {}, $ = { REGISTER_THEMES: `${k}/REGISTER_THEMES` };
function _({ globals: e }) {
  return e[O] || "";
}
function p() {
  return y(f, R);
}
function x(e, t) {
  S.getChannel().emit($.REGISTER_THEMES, { defaultTheme: t, themes: e });
}
var L = "html", T = (e) => e.split(" ").filter(Boolean), b = ({ themes: e, defaultTheme: t, parentSelector: s = L }) => (x(Object.keys(e), t), (c, h) => {
  let { themeOverride: r } = p(), a = _(h);
  return g(() => {
    let o = r || a || t, n = document.querySelector(s);
    if (!n) return;
    Object.entries(e).filter(([E]) => E !== o).forEach(([E, l]) => {
      let u = T(l);
      u.length > 0 && n.classList.remove(...u);
    });
    let i = T(e[o]);
    i.length > 0 && n.classList.add(...i);
  }, [r, a]), c();
});
const N = b({
  themes: {
    auto: d.autoMode,
    light: d.lightMode,
    dark: d.darkMode
  },
  defaultTheme: "light"
}), B = {
  themeOverride: "dark"
};
function H(e, t) {
  const s = [
    { name: "xxsmall", maxWidth: 320 },
    { name: "xsmall", maxWidth: 476 },
    { name: "small", maxWidth: 768 },
    { name: "medium", maxWidth: 1152 },
    { name: "large", maxWidth: 1440 }
  ], c = ["s", "m", "l"], h = /"\{([^}]+)\}"/g, r = {
    storiesContainer: "breakpoint-stories-container",
    storyContainer: "breakpoint-story-container"
  };
  let a = "";
  return c.filter((o) => !0).forEach((o) => {
    a += m`<strong>scale = ${o}</strong>`, s.filter(({ name: n }) => !0).forEach(({ name: n, maxWidth: i }) => {
      a += m`<strong>breakpoint = ${n}</strong>`, a += m`<div class="${r.storyContainer}" style="width:${i - 1}px">
            ${e.replace(
        h,
        (E, l) => l === "scale" ? o : l
      )}
          </div>`;
    });
  }), m`<div class="${r.storiesContainer}">
    <style>
      .${r.storiesContainer} {
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: flex-start;
      }

      .${r.storyContainer} {
        display: flex;
      }

      .${r.storyContainer} > * {
        flex: 1;
      }
    </style>
    ${a}
  </div>`;
}
const W = (e, t) => t ? e : "";
export {
  W as b,
  H as c,
  B as m,
  N as t
};
