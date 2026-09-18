/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as e } from "./helpers.js";
import { b as m, o as g, m as y } from "./utils3.js";
import { h as n } from "./formatting.js";
import { A as $ } from "./resources34.js";
import "./button.js";
const {
  alignment: v,
  appearance: h,
  kind: k,
  scale: f,
  width: w
} = $, B = {
  title: "Components/Buttons/Button",
  args: {
    alignment: "center",
    appearance: h.defaultValue,
    kind: k.defaultValue,
    scale: f.defaultValue,
    round: !1,
    href: "",
    iconEnd: "",
    iconStart: "",
    loading: !1,
    disabled: !1,
    width: w.defaultValue,
    text: "button text here"
  },
  argTypes: {
    alignment: {
      options: v.values,
      control: {
        type: "select"
      }
    },
    appearance: {
      options: h.values,
      control: {
        type: "select"
      }
    },
    kind: {
      options: k.values.filter((t) => t !== "info" && t !== "warning" && t !== "success"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: f.values,
      control: {
        type: "select"
      }
    },
    width: {
      options: w.values,
      control: {
        type: "select"
      }
    },
    iconStart: {
      options: ["", ...e],
      control: {
        type: "select"
      }
    },
    iconEnd: {
      options: ["", ...e],
      control: {
        type: "select"
      }
    }
  }
}, s = (t) => n`
  <calcite-button
    alignment="${t.alignment}"
    appearance="${t.appearance}"
    kind="${t.kind}"
    scale="${t.scale}"
    ${m("round", t.round)}
    href="${t.href}"
    ${g("icon-start", t.iconStart)}
    ${g("icon-end", t.iconEnd)}
    ${m("loading", t.loading)}
    ${m("disabled", t.disabled)}
    width="${t.width}"
  >
    ${t.text}
  </calcite-button>
`, a = () => n`
  <calcite-button
    alignment="center"
    appearance="solid"
    kind="brand"
    icon-start="${e[0]}"
    scale="m"
    type="button"
    width="auto"
  >
    button text here
  </calcite-button>
`;
a.storyName = "With icon-start";
const c = () => n`
  <calcite-button alignment="center" appearance="solid" icon-end="${e[0]}" kind="brand" scale="m" width="auto">
    button text here
  </calcite-button>
`;
c.storyName = "With icon-end";
const i = () => n`
  <calcite-button
    alignment="center"
    appearance="solid"
    kind="brand"
    icon-start="${e[0]}"
    icon-end="${e[0]}"
    scale="m"
    width="auto"
    type="button"
  >
    button text here
  </calcite-button>
`;
i.storyName = "With icon-start and icon-end";
const d = () => n`
  <div style="width: 480px; max-width: 100%; background-color: #fff">
    <calcite-button
      width="auto"
      icon-start="${e[0]}"
      alignment="center"
      appearance="solid"
      kind="brand"
      scale="m"
      type="button"
    >
      button text here
    </calcite-button>
  </div>
`, u = () => n`
  <calcite-button disabled>disabled</calcite-button>
  <br />
  <calcite-button loading disabled>loading + disabled</calcite-button>
`, o = () => n` <calcite-button icon-start> Button </calcite-button>`;
o.storyName = "With icon-start set to empty";
const r = () => n` <calcite-button icon-end> Button </calcite-button>`;
r.storyName = "With icon-end set to empty";
const p = () => n`
  <div style="width: 300px; max-width: 100%; display: flex; flex-direction: row; background-color: #fff">
    <calcite-button width="half" appearance="outline-fill" kind="brand" alignment="center" scale="m" type="button">
      Back
    </calcite-button>
    <calcite-button
      width="half"
      appearance="solid"
      kind="brand"
      icon-start="${e[0]}"
      alignment="center"
      scale="m"
      type="button"
    >
      Some long string
    </calcite-button>
  </div>
`, l = () => n`
  <calcite-button
    class="calcite-mode-dark"
    dir="rtl"
    appearance="solid"
    kind="brand"
    scale="m"
    icon-start="${e[0]}"
    icon-end="${e[0]}"
    alignment="center"
    type="button"
    width="auto"
  >
    button text here
  </calcite-button>
`;
l.parameters = {
  themes: y
};
const b = () => n`
  <calcite-button scale="s" appearance="outline" kind="brand">outline+brand</calcite-button>
  <calcite-button scale="s" appearance="outline" kind="danger">outline+danger</calcite-button>
  <calcite-button scale="s" appearance="outline" kind="inverse">outline+inverse</calcite-button>
  <calcite-button scale="s" appearance="outline" kind="neutral">outline+neutral</calcite-button>

  <calcite-button scale="s" appearance="outline-fill" kind="brand">outline-fill+brand</calcite-button>
  <calcite-button scale="s" appearance="outline-fill" kind="danger">outline-fill+danger</calcite-button>
  <calcite-button scale="s" appearance="outline-fill" kind="inverse">outline-fill+inverse</calcite-button>
  <calcite-button scale="s" appearance="outline-fill" kind="neutral">outline-fill+neutral</calcite-button>

  <calcite-button scale="s" appearance="solid" kind="brand">solid+brand</calcite-button>
  <calcite-button scale="s" appearance="solid" kind="danger">solid+danger</calcite-button>
  <calcite-button scale="s" appearance="solid" kind="inverse">solid+inverse</calcite-button>
  <calcite-button scale="s" appearance="solid" kind="neutral">solid+neutral</calcite-button>

  <calcite-button scale="s" appearance="transparent" kind="brand">transparent+brand</calcite-button>
  <calcite-button scale="s" appearance="transparent" kind="danger">transparent+danger</calcite-button>
  <calcite-button scale="s" appearance="transparent" kind="inverse">transparent+inverse</calcite-button>
  <calcite-button scale="s" appearance="transparent" kind="neutral">transparent+neutral</calcite-button>
`;
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(args: ButtonStoryArgs): string => html\`
  <calcite-button
    alignment="\${args.alignment}"
    appearance="\${args.appearance}"
    kind="\${args.kind}"
    scale="\${args.scale}"
    \${boolean("round", args.round)}
    href="\${args.href}"
    \${optionalAttribute("icon-start", args.iconStart)}
    \${optionalAttribute("icon-end", args.iconEnd)}
    \${boolean("loading", args.loading)}
    \${boolean("disabled", args.disabled)}
    width="\${args.width}"
  >
    \${args.text}
  </calcite-button>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-button
    alignment="center"
    appearance="solid"
    kind="brand"
    icon-start="\${iconNames[0]}"
    scale="m"
    type="button"
    width="auto"
  >
    button text here
  </calcite-button>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-button alignment="center" appearance="solid" icon-end="\${iconNames[0]}" kind="brand" scale="m" width="auto">
    button text here
  </calcite-button>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-button
    alignment="center"
    appearance="solid"
    kind="brand"
    icon-start="\${iconNames[0]}"
    icon-end="\${iconNames[0]}"
    scale="m"
    width="auto"
    type="button"
  >
    button text here
  </calcite-button>
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
      originalSource: `(): string => html\`
  <div style="width: 480px; max-width: 100%; background-color: #fff">
    <calcite-button
      width="auto"
      icon-start="\${iconNames[0]}"
      alignment="center"
      appearance="solid"
      kind="brand"
      scale="m"
      type="button"
    >
      button text here
    </calcite-button>
  </div>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-button disabled>disabled</calcite-button>
  <br />
  <calcite-button loading disabled>loading + disabled</calcite-button>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: "(): string => html` <calcite-button icon-start> Button </calcite-button>`",
      ...o.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: "(): string => html` <calcite-button icon-end> Button </calcite-button>`",
      ...r.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 300px; max-width: 100%; display: flex; flex-direction: row; background-color: #fff">
    <calcite-button width="half" appearance="outline-fill" kind="brand" alignment="center" scale="m" type="button">
      Back
    </calcite-button>
    <calcite-button
      width="half"
      appearance="solid"
      kind="brand"
      icon-start="\${iconNames[0]}"
      alignment="center"
      scale="m"
      type="button"
    >
      Some long string
    </calcite-button>
  </div>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-button
    class="calcite-mode-dark"
    dir="rtl"
    appearance="solid"
    kind="brand"
    scale="m"
    icon-start="\${iconNames[0]}"
    icon-end="\${iconNames[0]}"
    alignment="center"
    type="button"
    width="auto"
  >
    button text here
  </calcite-button>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-button scale="s" appearance="outline" kind="brand">outline+brand</calcite-button>
  <calcite-button scale="s" appearance="outline" kind="danger">outline+danger</calcite-button>
  <calcite-button scale="s" appearance="outline" kind="inverse">outline+inverse</calcite-button>
  <calcite-button scale="s" appearance="outline" kind="neutral">outline+neutral</calcite-button>

  <calcite-button scale="s" appearance="outline-fill" kind="brand">outline-fill+brand</calcite-button>
  <calcite-button scale="s" appearance="outline-fill" kind="danger">outline-fill+danger</calcite-button>
  <calcite-button scale="s" appearance="outline-fill" kind="inverse">outline-fill+inverse</calcite-button>
  <calcite-button scale="s" appearance="outline-fill" kind="neutral">outline-fill+neutral</calcite-button>

  <calcite-button scale="s" appearance="solid" kind="brand">solid+brand</calcite-button>
  <calcite-button scale="s" appearance="solid" kind="danger">solid+danger</calcite-button>
  <calcite-button scale="s" appearance="solid" kind="inverse">solid+inverse</calcite-button>
  <calcite-button scale="s" appearance="solid" kind="neutral">solid+neutral</calcite-button>

  <calcite-button scale="s" appearance="transparent" kind="brand">transparent+brand</calcite-button>
  <calcite-button scale="s" appearance="transparent" kind="danger">transparent+danger</calcite-button>
  <calcite-button scale="s" appearance="transparent" kind="inverse">transparent+inverse</calcite-button>
  <calcite-button scale="s" appearance="transparent" kind="neutral">transparent+neutral</calcite-button>
\``,
      ...b.parameters?.docs?.source
    }
  }
};
const A = ["simple", "withIconStart", "withIconEnd", "withIconStartAndIconEnd", "setWidthContainer", "disabled", "withIconStartEmpty", "withIconEndEmpty", "sideBySide", "darkModeRTL", "appearanceAndKindCombinations"];
export {
  A as __namedExportsOrder,
  b as appearanceAndKindCombinations,
  l as darkModeRTL,
  B as default,
  u as disabled,
  d as setWidthContainer,
  p as sideBySide,
  s as simple,
  c as withIconEnd,
  r as withIconEndEmpty,
  a as withIconStart,
  i as withIconStartAndIconEnd,
  o as withIconStartEmpty
};
