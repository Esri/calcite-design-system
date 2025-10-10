import { j as e, M as o } from "./blocks.js";
import { useMDXComponents as i } from "./index3.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function t(s) {
  const n = {
    a: "a",
    h1: "h1",
    h2: "h2",
    li: "li",
    p: "p",
    ul: "ul",
    ...i(),
    ...s.components
  };
  return e.jsxs(e.Fragment, {
    children: [e.jsx(o, {
      title: "Overview/Home"
    }), `
`, e.jsx(n.h1, {
      id: "calcite-components",
      children: "Calcite Components"
    }), `
`, e.jsx(n.p, {
      children: "Calcite Components are a set of reusable web components built using Stencil.js. With Calcite Components, you can quickly build on-brand, lightweight, and accessible web applications."
    }), `
`, e.jsxs(n.ul, {
      children: [`
`, e.jsx(n.li, {
        children: e.jsx(n.a, {
          href: "https://github.com/Esri/calcite-design-system",
          rel: "nofollow",
          children: "GitHub project"
        })
      }), `
`]
    }), `
`, e.jsx(n.h2, {
      id: "calcite",
      children: "Calcite"
    }), `
`, e.jsx(n.p, {
      children: "Calcite is the name of a branded visual design system for Esri."
    }), `
`, e.jsx(n.h2, {
      id: "issues",
      children: "Issues"
    }), `
`, e.jsxs(n.p, {
      children: ["Find a bug or want to request a new feature? Please let us know by ", e.jsx(n.a, {
        href: "https://github.com/Esri/calcite-design-system/issues/new/choose",
        rel: "nofollow",
        children: "submitting an issue"
      }), "."]
    })]
  });
}
function a(s = {}) {
  const { wrapper: n } = {
    ...i(),
    ...s.components
  };
  return n ? e.jsx(n, {
    ...s,
    children: e.jsx(t, {
      ...s
    })
  }) : t(s);
}
export {
  a as default
};
