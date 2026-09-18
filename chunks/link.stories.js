/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as n, o as f, m as $ } from "./utils3.js";
import { i as u } from "./index4.js";
import { h as t } from "./formatting.js";
import { A as w } from "./resources34.js";
import "./link.js";
const i = Object.keys(u).filter((e) => e.endsWith("16")).map((e) => e.replace("16", "")), {
  fontSize: S,
  fontWeight: v
} = w, T = {
  title: "Components/Link",
  args: {
    containingFontSize: "16",
    containingFontWeight: "400",
    href: "http://www.esri.com",
    disabled: !1,
    download: !1,
    iconEnd: "",
    iconFlipRtl: !1,
    iconStart: "",
    rel: "",
    target: "",
    text: "link text here",
    longText: "Lorem ipsum odor amet, consectetur adipiscing elit. Egestas magnis porta tristique magnis justo tincidunt. Lacinia et euismod massa aliquam venenatis sem arcu tellus."
  },
  argTypes: {
    containingFontSize: {
      options: S.values,
      control: {
        type: "select"
      }
    },
    containingFontWeight: {
      options: v.values,
      control: {
        type: "select"
      }
    },
    iconStart: {
      options: ["", ...i],
      control: {
        type: "select"
      }
    },
    iconEnd: {
      options: ["", ...i],
      control: {
        type: "select"
      }
    }
  }
}, a = (e) => t`
  <div style="font-size: ${e.containingFontSize}px; font-weight: ${e.containingFontWeight};">
    Some wrapping text
    <calcite-link
      ${n("download", !!e.download)}
      href="${e.href}"
      ${f("icon-start", e.iconStart)}
      ${f("icon-end", e.iconEnd)}
      ${n("icon-flip-rtl", !!e.iconFlipRtl)}
      rel="${e.rel}"
      target="${e.target}"
      >${e.text}</calcite-link
    >
    around the link
  </div>
`, r = (e) => t`
  <div
    style="font-size: ${e.containingFontSize}px; font-weight: ${e.containingFontWeight}; width: 300px; border: 1px solid black;"
  >
    <calcite-link href="${e.href}" ${n("disabled", e.disabled)}>${e.text}</calcite-link>
  </div>
`, s = () => t`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link>link text here</calcite-link>
    around the link
  </div>
`, c = () => t`
  <div style="font-size: 16px; font-weight: 400; width: 300px; border: 1px solid black;">
    <calcite-link>link text here</calcite-link>
  </div>
`, l = () => t`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-start="${i[0]}">link text here</calcite-link>
    around the link
  </div>
`, d = () => t`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-end="${i[0]}">link text here</calcite-link>
    around the link
  </div>
`, p = () => t`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-start="${i[0]}" icon-end="${i[0]}">link text here</calcite-link>
    around the link
  </div>
`, g = (e) => t`
  <div style="font-size: ${e.containingFontSize}px; font-weight: ${e.containingFontWeight}; max-width: 400px;">
    Some wrapping text
    <calcite-link href="${e.href}" ${n("disabled", e.disabled)}>${e.longText}</calcite-link>
    around the link
  </div>
`, m = (e) => t`
  <div style="font-size: ${e.containingFontSize}px; font-weight: ${e.containingFontWeight}; max-width: 400px;">
    <calcite-link href="${e.href}" ${n("disabled", e.disabled)}>${e.longText}</calcite-link>
  </div>
`, h = (e) => t`
  <div style="font-size: ${e.containingFontSize}px; font-weight: ${e.containingFontWeight}; max-width: 400px;">
    <calcite-link ${n("disabled", e.disabled)}>${e.longText}</calcite-link>
  </div>
`, k = (e) => t`
  <div style="font-size: ${e.containingFontSize}px; font-weight: ${e.containingFontWeight}; max-width: 400px;">
    Some wrapping text
    <calcite-link
      icon-start="${i[0]}"
      icon-end="${i[0]}"
      href="${e.href}"
      ${n("disabled", e.disabled)}
    >
      ${e.longText}</calcite-link
    >
    around the link
  </div>
`, o = () => t`
  <div class="calcite-mode-dark" dir="rtl" style="color: white; font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link class="calcite-mode-dark">link text here</calcite-link>
    around the link
  </div>
`;
o.parameters = {
  themes: $
};
const x = () => t`<calcite-link disabled>disabled</calcite-link>`;
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(args: LinkStoryArgs): string => html\`
  <div style="font-size: \${args.containingFontSize}px; font-weight: \${args.containingFontWeight};">
    Some wrapping text
    <calcite-link
      \${boolean("download", !!args.download)}
      href="\${args.href}"
      \${optionalAttribute("icon-start", args.iconStart)}
      \${optionalAttribute("icon-end", args.iconEnd)}
      \${boolean("icon-flip-rtl", !!args.iconFlipRtl)}
      rel="\${args.rel}"
      target="\${args.target}"
      >\${args.text}</calcite-link
    >
    around the link
  </div>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(args: LinkStoryArgs): string => html`\n  <div\n    style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight}; width: 300px; border: 1px solid black;"\n  >\n    <calcite-link href="${args.href}" ${boolean("disabled", args.disabled)}>${args.text}</calcite-link>\n  </div>\n`',
      ...r.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link>link text here</calcite-link>
    around the link
  </div>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="font-size: 16px; font-weight: 400; width: 300px; border: 1px solid black;">
    <calcite-link>link text here</calcite-link>
  </div>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-start="\${iconNames[0]}">link text here</calcite-link>
    around the link
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-end="\${iconNames[0]}">link text here</calcite-link>
    around the link
  </div>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-start="\${iconNames[0]}" icon-end="\${iconNames[0]}">link text here</calcite-link>
    around the link
  </div>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: '(args: LinkStoryArgs): string => html`\n  <div style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight}; max-width: 400px;">\n    Some wrapping text\n    <calcite-link href="${args.href}" ${boolean("disabled", args.disabled)}>${args.longText}</calcite-link>\n    around the link\n  </div>\n`',
      ...g.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: '(args: LinkStoryArgs): string => html`\n  <div style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight}; max-width: 400px;">\n    <calcite-link href="${args.href}" ${boolean("disabled", args.disabled)}>${args.longText}</calcite-link>\n  </div>\n`',
      ...m.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: '(args: LinkStoryArgs): string => html`\n  <div style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight}; max-width: 400px;">\n    <calcite-link ${boolean("disabled", args.disabled)}>${args.longText}</calcite-link>\n  </div>\n`',
      ...h.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(args: LinkStoryArgs): string => html\`
  <div style="font-size: \${args.containingFontSize}px; font-weight: \${args.containingFontWeight}; max-width: 400px;">
    Some wrapping text
    <calcite-link
      icon-start="\${iconNames[0]}"
      icon-end="\${iconNames[0]}"
      href="\${args.href}"
      \${boolean("disabled", args.disabled)}
    >
      \${args.longText}</calcite-link
    >
    around the link
  </div>
\``,
      ...k.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div class="calcite-mode-dark" dir="rtl" style="color: white; font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link class="calcite-mode-dark">link text here</calcite-link>
    around the link
  </div>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: "(): string => html`<calcite-link disabled>disabled</calcite-link>`",
      ...x.parameters?.docs?.source
    }
  }
};
const L = ["simple", "simpleNoWrappingText", "noHref", "noHrefNoWrappingText", "iconStart", "iconEnd", "iconStartAndIconEnd", "multiLine", "multiLineNoWrappingText", "multiLineNoWrappingTextNoHref", "multiLineWithIcons", "darkModeRTL", "disabled"];
export {
  L as __namedExportsOrder,
  o as darkModeRTL,
  T as default,
  x as disabled,
  d as iconEnd,
  l as iconStart,
  p as iconStartAndIconEnd,
  g as multiLine,
  m as multiLineNoWrappingText,
  h as multiLineNoWrappingTextNoHref,
  k as multiLineWithIcons,
  s as noHref,
  c as noHrefNoWrappingText,
  a as simple,
  r as simpleNoWrappingText
};
