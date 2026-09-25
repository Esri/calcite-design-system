/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as t, o as u, m as T } from "./utils3.js";
import { h as e } from "./formatting.js";
import { i as $ } from "./helpers.js";
import { A as f } from "./resources34.js";
import "./action.js";
const {
  alignment: g,
  appearance: v,
  scale: h
} = f, w = {
  title: "Components/Buttons/Action",
  args: {
    active: !1,
    alignment: g.defaultValue,
    appearance: v.defaultValue,
    disabled: !1,
    icon: "banana",
    indicator: !1,
    label: "Label",
    loading: !1,
    overflowDisabled: !1,
    scale: h.defaultValue,
    text: "",
    textEnabled: !0
  },
  argTypes: {
    alignment: {
      options: g.values,
      control: {
        type: "select"
      }
    },
    appearance: {
      options: v.values.filter((a) => a !== "outline" && a !== "outline-fill"),
      control: {
        type: "select"
      }
    },
    icon: {
      options: $,
      control: {
        type: "select"
      }
    },
    scale: {
      options: h.values,
      control: {
        type: "select"
      }
    }
  }
}, c = (a) => e`
  <div>
    <calcite-action
      ${t("active", a.active)}
      alignment="${a.alignment}"
      appearance="${a.appearance}"
      ${t("disabled", a.disabled)}
      ${u("icon", a.icon)}
      ${t("indicator", a.indicator)}
      label="${a.label}"
      ${t("loading", a.loading)}
      ${t("overflow-disabled", a.overflowDisabled)}
      scale="${a.scale}"
      text="${a.text}"
      ${t("text-enabled style", a.textEnabled)}
    ></calcite-action>
  </div>
`, i = () => e`
  <div>
    <calcite-action
      alignment="start"
      appearance="solid"
      disabled
      icon="banana"
      text-enabled
      text="Text"
    ></calcite-action>
    <calcite-action
      active
      alignment="start"
      appearance="solid"
      disabled
      icon="banana"
      text-enabled
      text="Text"
    ></calcite-action>
    <calcite-action
      alignment="start"
      appearance="solid"
      disabled
      icon="banana"
      loading
      text-enabled
      text="Text"
    ></calcite-action>
  </div>
`, l = () => e`
  <div>
    <calcite-action icon="banana" loading text-enabled text="Text"></calcite-action>
    <calcite-action active icon="banana" loading text-enabled text="Text"></calcite-action>
  </div>
`, o = () => e`
  <div>
    <calcite-action
      icon="banana"
      alignment="start"
      label="Label"
      scale="m"
      active
      appearance="transparent"
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
`, r = () => e`
  <div style="width: 300px">
    <calcite-action
      appearance="solid"
      icon="banana"
      alignment="end"
      label="Label"
      indicator
      scale="s"
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
`, s = () => e`
  <div style="width: 150px">
    <calcite-action
      appearance="solid"
      icon="banana"
      alignment="start"
      label="Label"
      scale="l"
      text="Blah blah blah blah blah blah blah blah blah blah"
      text-enabled
    ></calcite-action>
  </div>
`, d = () => e`
  <calcite-action
    appearance="solid"
    indicator
    scale="m"
    active
    text="click-me"
    text-enabled
    icon="gear"
  ></calcite-action>
`, b = () => e`
  <calcite-action indicator scale="m" active text="click-me" text-enabled></calcite-action>
`, p = () => e`
  <calcite-action indicator active text="click-me"></calcite-action>
`, m = () => e`
  <h2>All actions should be the same height</h2>
  <div style="width: min-content">
    <div style="border: solid 1px">
      <calcite-action text="hello" text-enabled icon="home" scale="s"></calcite-action>
    </div>
    <div style="border: solid 1px">
      <calcite-action text="hello" icon="home" scale="s"></calcite-action>
    </div>
    <div style="border: solid 1px">
      <calcite-action icon="home" scale="s"></calcite-action>
    </div>
  </div>
`, x = () => e`
  <calcite-action
    dir="rtl"
    icon="banana"
    lang="ar"
    lang="ar-EG"
    text="لكن لا بد أن أوضح لك أن كل"
    text-enabled
  ></calcite-action>
`, n = () => e`
  <div>
    <calcite-action
      appearance="solid"
      label="Label"
      scale="m"
      icon="banana"
      alignment="start"
      class="calcite-mode-dark"
      dir="rtl"
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
`;
n.parameters = {
  themes: T
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(args: ActionStoryArgs): string => html\`
  <div>
    <calcite-action
      \${boolean("active", args.active)}
      alignment="\${args.alignment}"
      appearance="\${args.appearance}"
      \${boolean("disabled", args.disabled)}
      \${optionalAttribute("icon", args.icon)}
      \${boolean("indicator", args.indicator)}
      label="\${args.label}"
      \${boolean("loading", args.loading)}
      \${boolean("overflow-disabled", args.overflowDisabled)}
      scale="\${args.scale}"
      text="\${args.text}"
      \${boolean("text-enabled style", args.textEnabled)}
    ></calcite-action>
  </div>
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
  <div>
    <calcite-action
      alignment="start"
      appearance="solid"
      disabled
      icon="banana"
      text-enabled
      text="Text"
    ></calcite-action>
    <calcite-action
      active
      alignment="start"
      appearance="solid"
      disabled
      icon="banana"
      text-enabled
      text="Text"
    ></calcite-action>
    <calcite-action
      alignment="start"
      appearance="solid"
      disabled
      icon="banana"
      loading
      text-enabled
      text="Text"
    ></calcite-action>
  </div>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div>
    <calcite-action icon="banana" loading text-enabled text="Text"></calcite-action>
    <calcite-action active icon="banana" loading text-enabled text="Text"></calcite-action>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div>
    <calcite-action
      icon="banana"
      alignment="start"
      label="Label"
      scale="m"
      active
      appearance="transparent"
      text="Text"
      text-enabled
    ></calcite-action>
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
  <div style="width: 300px">
    <calcite-action
      appearance="solid"
      icon="banana"
      alignment="end"
      label="Label"
      indicator
      scale="s"
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
\``,
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
  <div style="width: 150px">
    <calcite-action
      appearance="solid"
      icon="banana"
      alignment="start"
      label="Label"
      scale="l"
      text="Blah blah blah blah blah blah blah blah blah blah"
      text-enabled
    ></calcite-action>
  </div>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-action
    appearance="solid"
    indicator
    scale="m"
    active
    text="click-me"
    text-enabled
    icon="gear"
  ></calcite-action>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-action indicator scale="m" active text="click-me" text-enabled></calcite-action>\n`',
      ...b.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-action indicator active text="click-me"></calcite-action>\n`',
      ...p.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <h2>All actions should be the same height</h2>
  <div style="width: min-content">
    <div style="border: solid 1px">
      <calcite-action text="hello" text-enabled icon="home" scale="s"></calcite-action>
    </div>
    <div style="border: solid 1px">
      <calcite-action text="hello" icon="home" scale="s"></calcite-action>
    </div>
    <div style="border: solid 1px">
      <calcite-action icon="home" scale="s"></calcite-action>
    </div>
  </div>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-action
    dir="rtl"
    icon="banana"
    lang="ar"
    lang="ar-EG"
    text="لكن لا بد أن أوضح لك أن كل"
    text-enabled
  ></calcite-action>
\``,
      ...x.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div>
    <calcite-action
      appearance="solid"
      label="Label"
      scale="m"
      icon="banana"
      alignment="start"
      class="calcite-mode-dark"
      dir="rtl"
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
const k = ["simple", "disabledAndTextOnly", "loading", "activeAndAppearanceTransparent", "alignmentEndAndSmallScaleAndIndicator", "alignmentStartAndLargeScaleAndTextOverflow", "indicatorTextEnabled", "indicatorTextEnabledNoIcon", "indicatorNoTextEnabledNoIcon", "noTextHeight", "arabicLocale", "darkModeRTL"];
export {
  k as __namedExportsOrder,
  o as activeAndAppearanceTransparent,
  r as alignmentEndAndSmallScaleAndIndicator,
  s as alignmentStartAndLargeScaleAndTextOverflow,
  x as arabicLocale,
  n as darkModeRTL,
  w as default,
  i as disabledAndTextOnly,
  p as indicatorNoTextEnabledNoIcon,
  d as indicatorTextEnabled,
  b as indicatorTextEnabledNoIcon,
  l as loading,
  m as noTextHeight,
  c as simple
};
