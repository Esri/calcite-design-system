import { b as t, m as v } from "./utils.js";
import { h as a } from "./formatting.js";
import { i as u } from "./helpers.js";
import { A as T } from "./resources14.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
const {
  alignment: x,
  appearance: g,
  scale: h
} = T, A = {
  title: "Components/Buttons/Action",
  args: {
    active: !1,
    alignment: x.defaultValue,
    appearance: g.defaultValue,
    disabled: !1,
    icon: "banana",
    indicator: !1,
    label: "Label",
    loading: !1,
    scale: h.defaultValue,
    text: "",
    textEnabled: !0
  },
  argTypes: {
    alignment: {
      options: x.values,
      control: {
        type: "select"
      }
    },
    appearance: {
      options: g.values.filter((e) => e !== "outline" && e !== "outline-fill"),
      control: {
        type: "select"
      }
    },
    icon: {
      options: u,
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
}, c = (e) => a`
  <div>
    <calcite-action
      ${t("active", e.active)}
      alignment="${e.alignment}"
      appearance="${e.appearance}"
      ${t("disabled", e.disabled)}
      icon="${e.icon}"
      ${t("indicator", e.indicator)}
      label="${e.label}"
      ${t("loading", e.loading)}
      scale="${e.scale}"
      text="${e.text}"
      ${t("text-enabled style", e.textEnabled)}
    ></calcite-action>
  </div>
`, l = () => a`
  <div>
    <calcite-action
      icon="banana"
      alignment="start"
      appearance="solid"
      label="Label"
      scale="m"
      disabled
      text="Text"
      text-enabled
    ></calcite-action>
    <calcite-action
      active
      icon="banana"
      alignment="start"
      appearance="solid"
      label="Label"
      scale="m"
      disabled
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
`, i = () => a`
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
`, o = () => a`
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
`, s = () => a`
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
`, r = () => a`
  <calcite-action
    appearance="solid"
    indicator
    scale="m"
    active
    text="click-me"
    text-enabled
    icon="gear"
  ></calcite-action>
`, d = () => a`
  <calcite-action indicator scale="m" active text="click-me" text-enabled></calcite-action>
`, m = () => a`
  <calcite-action indicator active text="click-me"></calcite-action>
`, b = () => a`
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
`, p = () => a`
  <calcite-action
    dir="rtl"
    icon="banana"
    lang="ar"
    lang="ar-EG"
    text="لكن لا بد أن أوضح لك أن كل"
    text-enabled
  ></calcite-action>
`, n = () => a`
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
  themes: v
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
      icon="\${args.icon}"
      \${boolean("indicator", args.indicator)}
      label="\${args.label}"
      \${boolean("loading", args.loading)}
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
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div>
    <calcite-action
      icon="banana"
      alignment="start"
      appearance="solid"
      label="Label"
      scale="m"
      disabled
      text="Text"
      text-enabled
    ></calcite-action>
    <calcite-action
      active
      icon="banana"
      alignment="start"
      appearance="solid"
      label="Label"
      scale="m"
      disabled
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
\``,
      ...l.parameters?.docs?.source
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
      ...i.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
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
      ...o.parameters?.docs?.source
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
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
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
      ...r.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-action indicator scale="m" active text="click-me" text-enabled></calcite-action>\n`',
      ...d.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-action indicator active text="click-me"></calcite-action>\n`',
      ...m.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
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
      ...b.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
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
      ...p.parameters?.docs?.source
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
const S = ["simple", "disabledAndTextOnly_TestOnly", "activeAndAppearanceTransparent_TestOnly", "alignmentEndAndSmallScaleAndIndicator_TestOnly", "alignmentStartAndLargeScaleAndTextOverflow_TestOnly", "indicatorTextEnabled_TestOnly", "indicatorTextEnabledNoIcon_TestOnly", "indicatorNoTextEnabledNoIcon_TestOnly", "noTextHeight_TestOnly", "arabicLocale_TestOnly", "darkModeRTL_TestOnly"];
export {
  S as __namedExportsOrder,
  i as activeAndAppearanceTransparent_TestOnly,
  o as alignmentEndAndSmallScaleAndIndicator_TestOnly,
  s as alignmentStartAndLargeScaleAndTextOverflow_TestOnly,
  p as arabicLocale_TestOnly,
  n as darkModeRTL_TestOnly,
  A as default,
  l as disabledAndTextOnly_TestOnly,
  m as indicatorNoTextEnabledNoIcon_TestOnly,
  d as indicatorTextEnabledNoIcon_TestOnly,
  r as indicatorTextEnabled_TestOnly,
  b as noTextHeight_TestOnly,
  c as simple
};
