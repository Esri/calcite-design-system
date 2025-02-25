import { d as y } from "./index.js";
import "./index9.js";
import { C as u } from "./iframe.js";
import { h as c } from "./formatting.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
const { useParameter: O, addons: S, useEffect: g, useMemo: G } = __STORYBOOK_MODULE_PREVIEW_API__, { deprecate: v } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
var C = Object.defineProperty, M = (e, t) => {
  for (var s in t) C(e, s, { get: t[s], enumerable: !0 });
}, d = "themes", L = `storybook/${d}`, R = "theme", _ = {}, k = { REGISTER_THEMES: `${L}/REGISTER_THEMES` }, P = {};
M(P, { initializeThemeState: () => x, pluckThemeFromContext: () => f, useThemeParameters: () => $ });
function f({ globals: e }) {
  return e[R] || "";
}
function $(e) {
  return v(y`The useThemeParameters function is deprecated. Please access parameters via the context directly instead e.g.
    - const { themeOverride } = context.parameters.themes ?? {};
    `), e ? e.parameters[d] ?? _ : O(d, _);
}
function x(e, t) {
  S.getChannel().emit(k.REGISTER_THEMES, { defaultTheme: t, themes: e });
}
var b = "html", p = (e) => e.split(" ").filter(Boolean), A = ({ themes: e, defaultTheme: t, parentSelector: s = b }) => (x(Object.keys(e), t), (h, i) => {
  let { themeOverride: r } = i.parameters[d] ?? {}, a = f(i);
  return g(() => {
    let o = r || a || t, n = document.querySelector(s);
    if (!n) return;
    Object.entries(e).filter(([E]) => E !== o).forEach(([E, l]) => {
      let T = p(l);
      T.length > 0 && n.classList.remove(...T);
    });
    let m = p(e[o]);
    m.length > 0 && n.classList.add(...m);
  }, [r, a]), h();
});
const H = A({
  themes: {
    auto: u.autoMode,
    light: u.lightMode,
    dark: u.darkMode
  },
  defaultTheme: "light"
}), W = {
  themeOverride: "dark"
};
function U(e, t) {
  const s = [
    { name: "xxsmall", maxWidth: 320 },
    { name: "xsmall", maxWidth: 476 },
    { name: "small", maxWidth: 768 },
    { name: "medium", maxWidth: 1152 },
    { name: "large", maxWidth: 1440 }
  ], h = ["s", "m", "l"], i = /"\{([^}]+)\}"/g, r = {
    storiesContainer: "breakpoint-stories-container",
    storyContainer: "breakpoint-story-container"
  };
  let a = "";
  return h.filter((o) => !0).forEach((o) => {
    a += c`<strong>scale = ${o}</strong>`, s.filter(({ name: n }) => !0).forEach(({ name: n, maxWidth: m }) => {
      a += c`<strong>breakpoint = ${n}</strong>`, a += c`<div class="${r.storyContainer}" style="width:${m - 1}px">
            ${e.replace(
        i,
        (E, l) => l === "scale" ? o : l
      )}
          </div>`;
    });
  }), c`<div class="${r.storiesContainer}">
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
const Y = (e, t) => t ? e : "";
export {
  Y as b,
  U as c,
  W as m,
  H as t
};
