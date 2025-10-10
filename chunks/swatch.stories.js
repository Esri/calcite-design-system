import { k as h, h as e, j as m } from "./index.js";
import { p as g } from "./placeholder-image.js";
import { A as p } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  scale: n
} = p, v = {
  title: "Components/Swatch",
  args: {
    scale: n.defaultValue,
    selected: !1,
    label: "My great swatch"
  },
  argTypes: {
    scale: {
      options: n.values,
      control: {
        type: "select"
      }
    },
    label: {
      control: {
        type: "text"
      }
    }
  }
}, s = (a) => e`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="${a.scale}" label="${a.label}" ${h("selected", a.selected)}></calcite-swatch>
  </div>
`, t = (a) => e`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" color="#FF0000" label="${a.label}"> </calcite-swatch>
  </div>
`, l = (a) => e`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" color="rgba(255, 0, 0, 0.5)" label="${a.label}"> </calcite-swatch>
  </div>
`, r = (a) => e`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" color="#FF0000" label="${a.label}" disabled> </calcite-swatch>
  </div>
`, o = (a) => e`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" label="${a.label}" disabled> </calcite-swatch>
  </div>
`, i = (a) => e`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" label="${a.label}">
      <img
        src="${g({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
  </div>
`, d = (a) => e`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" label="${a.label}" disabled>
      <img
        src="${g({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
  </div>
`, c = (a) => e`
  <div style="background-color:#2b2b2b;padding:100px" dir="rtl">
    <calcite-swatch class="calcite-mode-dark" label="${a.label}"></calcite-swatch>
  </div>
`;
c.parameters = {
  themes: m
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(args: SwatchStoryArgs): string => html`\n  <div style="background-color:white;padding:100px">\n    <calcite-swatch scale="${args.scale}" label="${args.label}" ${boolean("selected", args.selected)}></calcite-swatch>\n  </div>\n`',
      ...s.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: SwatchStoryArgs): string => html\`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" color="#FF0000" label="\${args.label}"> </calcite-swatch>
  </div>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(args: SwatchStoryArgs): string => html\`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" color="rgba(255, 0, 0, 0.5)" label="\${args.label}"> </calcite-swatch>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(args: SwatchStoryArgs): string => html\`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" color="#FF0000" label="\${args.label}" disabled> </calcite-swatch>
  </div>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(args: SwatchStoryArgs): string => html\`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" label="\${args.label}" disabled> </calcite-swatch>
  </div>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: SwatchStoryArgs): string => html\`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" label="\${args.label}">
      <img
        src="\${placeholderImage({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
  </div>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(args: SwatchStoryArgs): string => html\`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" label="\${args.label}" disabled>
      <img
        src="\${placeholderImage({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
  </div>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(args: SwatchStoryArgs): string => html\`
  <div style="background-color:#2b2b2b;padding:100px" dir="rtl">
    <calcite-swatch class="calcite-mode-dark" label="\${args.label}"></calcite-swatch>
  </div>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
const y = ["simple", "withHex", "withRgba", "hexDisabled", "emptyDisabled", "withImage", "withImageDisabled", "darkModeRTL_TestOnly"];
export {
  y as __namedExportsOrder,
  c as darkModeRTL_TestOnly,
  v as default,
  o as emptyDisabled,
  r as hexDisabled,
  s as simple,
  t as withHex,
  i as withImage,
  d as withImageDisabled,
  l as withRgba
};
