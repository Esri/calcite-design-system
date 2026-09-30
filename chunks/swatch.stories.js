/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as g, m as p } from "./utils3.js";
import { s as h } from "./index3.js";
import { h as e } from "./formatting.js";
import { A as b } from "./resources34.js";
import "./swatch.js";
const {
  scale: m
} = b, S = {
  title: "Components/Swatch",
  args: {
    color: "",
    disabled: !1,
    scale: m.defaultValue,
    selected: !1,
    label: "My great swatch"
  },
  argTypes: {
    scale: {
      options: m.values,
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
}, t = (a) => e`
  <div style="background-color:white;padding:100px">
    <calcite-swatch
      scale="${a.scale}"
      color="${a.color}"
      label="${a.label}"
      ${g("disabled", a.disabled)}
      ${g("selected", a.selected)}
    ></calcite-swatch>
  </div>
`, l = (a) => e`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" color="#FF0000" label="${a.label}"> </calcite-swatch>
  </div>
`, s = (a) => e`
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
        src="${h({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
  </div>
`, n = (a) => e`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" label="${a.label}" disabled>
      <img
        src="${h({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
  </div>
`, d = (a) => e`
  <calcite-button appearance="outline" kind="neutral">
    with color
    <calcite-swatch color="#ff00ff" label="${a.label}"></calcite-swatch>
  </calcite-button>
  <calcite-button appearance="outline" kind="neutral">
    with image
    <calcite-swatch label="${a.label}">
      <img
        src="${h({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
  </calcite-button>
`, c = (a) => e`
  <div style="background-color:#2b2b2b;padding:100px" dir="rtl">
    <calcite-swatch class="calcite-mode-dark" label="${a.label}"></calcite-swatch>
  </div>
`;
c.parameters = {
  themes: p
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: SwatchSimpleStoryArgs): string => html\`
  <div style="background-color:white;padding:100px">
    <calcite-swatch
      scale="\${args.scale}"
      color="\${args.color}"
      label="\${args.label}"
      \${boolean("disabled", args.disabled)}
      \${boolean("selected", args.selected)}
    ></calcite-swatch>
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
    <calcite-swatch scale="m" color="#FF0000" label="\${args.label}"> </calcite-swatch>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(args: SwatchStoryArgs): string => html\`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" color="rgba(255, 0, 0, 0.5)" label="\${args.label}"> </calcite-swatch>
  </div>
\``,
      ...s.parameters?.docs?.source
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
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
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
      ...n.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(args: SwatchStoryArgs): string => html\`
  <calcite-button appearance="outline" kind="neutral">
    with color
    <calcite-swatch color="#ff00ff" label="\${args.label}"></calcite-swatch>
  </calcite-button>
  <calcite-button appearance="outline" kind="neutral">
    with image
    <calcite-swatch label="\${args.label}">
      <img
        src="\${placeholderImage({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
  </calcite-button>
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
const k = ["simple", "withHex", "withRgba", "hexDisabled", "emptyDisabled", "withImage", "withImageDisabled", "containedInButton", "darkModeRTL"];
export {
  k as __namedExportsOrder,
  d as containedInButton,
  c as darkModeRTL,
  S as default,
  o as emptyDisabled,
  r as hexDisabled,
  t as simple,
  l as withHex,
  i as withImage,
  n as withImageDisabled,
  s as withRgba
};
