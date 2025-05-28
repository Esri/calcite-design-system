import { d as O } from "./index.js";
import "./index10.js";
import { C as p } from "./iframe.js";
import { h as c } from "./formatting.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
const { useParameter: S, addons: g, useEffect: C, useMemo: H, definePreview: W } = __STORYBOOK_MODULE_PREVIEW_API__, { deprecate: M } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
var L = Object.defineProperty, f = (e, t) => {
  for (var s in t) L(e, s, { get: t[s], enumerable: !0 });
}, R = {};
f(R, { initialGlobals: () => b });
var d = "themes", k = `storybook/${d}`, x = "theme", u = {}, P = { REGISTER_THEMES: `${k}/REGISTER_THEMES` }, b = { [x]: "" }, $ = {};
f($, { initializeThemeState: () => y, pluckThemeFromContext: () => v, useThemeParameters: () => A });
function v({ globals: e }) {
  return e[x] || "";
}
function A(e) {
  return M(O`The useThemeParameters function is deprecated. Please access parameters via the context directly instead e.g.
    - const { themeOverride } = context.parameters.themes ?? {};
    `), e ? e.parameters[d] ?? u : S(d, u);
}
function y(e, t) {
  g.getChannel().emit(P.REGISTER_THEMES, { defaultTheme: t, themes: e });
}
var D = "html", T = (e) => e.split(" ").filter(Boolean), I = ({ themes: e, defaultTheme: t, parentSelector: s = D }) => (y(Object.keys(e), t), (h, i) => {
  let { themeOverride: r } = i.parameters[d] ?? {}, a = v(i);
  return C(() => {
    let o = r || a || t, n = document.querySelector(s);
    if (!n) return;
    Object.entries(e).filter(([E]) => E !== o).forEach(([E, m]) => {
      let _ = T(m);
      _.length > 0 && n.classList.remove(..._);
    });
    let l = T(e[o]);
    l.length > 0 && n.classList.add(...l);
  }, [r, a]), h();
});
const U = I({
  themes: {
    auto: p.autoMode,
    light: p.lightMode,
    dark: p.darkMode
  },
  defaultTheme: "light"
}), Y = {
  themeOverride: "dark"
};
function j(e, t) {
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
    a += c`<strong>scale = ${o}</strong>`, s.filter(({ name: n }) => !0).forEach(({ name: n, maxWidth: l }) => {
      a += c`<strong>breakpoint = ${n}</strong>`, a += c`<div class="${r.storyContainer}" style="width:${l - 1}px">
            ${e.replace(
        i,
        (E, m) => m === "scale" ? o : m
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
const F = (e, t) => t ? e : "";
export {
  F as b,
  j as c,
  Y as m,
  U as t
};
