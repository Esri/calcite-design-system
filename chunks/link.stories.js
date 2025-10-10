import { k as l, h as t, j as d } from "./index.js";
import { i as p } from "./index4.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const c = Object.keys(p).filter((e) => e.endsWith("16")).map((e) => e.replace("16", "")), h = {
  title: "Components/Link",
  args: {
    containingFontSize: "16",
    containingFontWeight: "400",
    href: "",
    disabled: !1,
    text: "link text here"
  },
  argTypes: {
    containingFontSize: {
      options: ["12", "14", "16", "18", "20", "24", "32"],
      control: {
        type: "select"
      }
    },
    containingFontWeight: {
      options: ["300", "400", "500", "700"],
      control: {
        type: "select"
      }
    }
  }
}, i = (e) => t`
  <div style="font-size: ${e.containingFontSize}px; font-weight: ${e.containingFontWeight};">
    Some wrapping text
    <calcite-link href="${e.href}" ${l("disabled", e.disabled)}> ${e.text}</calcite-link>
    around the link
  </div>
`, a = () => t`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-start="${c[0]}"> link text here</calcite-link>
    around the link
  </div>
`, o = () => t`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-end="${c[0]}"> link text here</calcite-link>
    around the link
  </div>
`, r = () => t`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-start="${c[0]}" icon-end="${c[0]}"> link text here</calcite-link>
    around the link
  </div>
`, n = () => t`
  <div class="calcite-mode-dark" dir="rtl" style="color: white; font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link class="calcite-mode-dark">link text here</calcite-link>
    around the link
  </div>
`;
n.parameters = {
  themes: d
};
const s = () => t`<calcite-link disabled>disabled</calcite-link`;
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: '(args: LinkStoryArgs): string => html`\n  <div style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight};">\n    Some wrapping text\n    <calcite-link href="${args.href}" ${boolean("disabled", args.disabled)}> ${args.text}</calcite-link>\n    around the link\n  </div>\n`',
      ...i.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-start="\${iconNames[0]}"> link text here</calcite-link>
    around the link
  </div>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-end="\${iconNames[0]}"> link text here</calcite-link>
    around the link
  </div>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-start="\${iconNames[0]}" icon-end="\${iconNames[0]}"> link text here</calcite-link>
    around the link
  </div>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div class="calcite-mode-dark" dir="rtl" style="color: white; font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link class="calcite-mode-dark">link text here</calcite-link>
    around the link
  </div>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: "(): string => html`<calcite-link disabled>disabled</calcite-link`",
      ...s.parameters?.docs?.source
    }
  }
};
const g = ["simple", "iconStart", "iconEnd", "iconStartAndIconEnd", "darkModeRTL_TestOnly", "disabled_TestOnly"];
export {
  g as __namedExportsOrder,
  n as darkModeRTL_TestOnly,
  h as default,
  s as disabled_TestOnly,
  o as iconEnd,
  a as iconStart,
  r as iconStartAndIconEnd,
  i as simple
};
