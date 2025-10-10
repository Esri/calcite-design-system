import { i as v } from "./helpers.js";
import { k as p, h as t, j as h } from "./index.js";
import { A as b } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  layout: m,
  appearance: r,
  scale: d,
  width: g,
  status: u
} = b, A = {
  title: "Components/Controls/Radio/Segmented Control",
  args: {
    layout: m.defaultValue,
    appearance: r.defaultValue,
    scale: d.defaultValue,
    width: g.defaultValue,
    disabled: !1,
    status: u.defaultValue,
    validationIcon: "",
    validationMessage: ""
  },
  argTypes: {
    layout: {
      options: m.values.filter((e) => e !== "grid" && e !== "inline" && e !== "center" && e !== "auto" && e !== "fixed" && e !== "none" && e !== "horizontal-single"),
      control: {
        type: "select"
      }
    },
    appearance: {
      options: r.values.filter((e) => e !== "transparent"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: d.values,
      control: {
        type: "select"
      }
    },
    width: {
      options: g.values.filter((e) => e !== "half"),
      control: {
        type: "select"
      }
    },
    status: {
      options: u.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: v,
      control: {
        type: "select"
      }
    }
  }
}, n = (e) => t`
  <calcite-segmented-control
    layout="${e.layout}"
    appearance="${e.appearance}"
    scale="${e.scale}"
    width="${e.width}"
    ${p("disabled", e.disabled)}
    status="${e.status}"
    validation-icon="${e.validationIcon}"
    validation-message="${e.validationMessage}"
  >
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  </calcite-segmented-control>
`, l = () => t`
  <div style="width:33vw;">
    <calcite-label scale="m">
      My great segmented control
      <calcite-segmented-control layout="horizontal" appearance="solid" width="full" status="idle">
        <calcite-segmented-control-item icon-start="car" value="car" checked>Car</calcite-segmented-control-item>
        <calcite-segmented-control-item icon-start="plane" value="plane">Plane</calcite-segmented-control-item>
        <calcite-segmented-control-item icon-start="biking" value="bicycle">Bicycle</calcite-segmented-control-item>
      </calcite-segmented-control>
    </calcite-label>
  </div>
`, c = () => t`
  <calcite-segmented-control
    class="calcite-mode-dark"
    dir="rtl"
    validation-message="This should not appear because the status is not 'invalid'"
  >
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  </calcite-segmented-control>
`;
c.parameters = {
  themes: h
};
const a = () => t`<calcite-segmented-control disabled>
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  </calcite-segmented-control>`, i = () => t` <calcite-segmented-control scale="s">
    <calcite-segmented-control-item icon-start="car" icon-end="car" value="car" checked
      >Car</calcite-segmented-control-item
    >
    <calcite-segmented-control-item icon-start="plane" icon-end="plane" value="plane"
      >Plane</calcite-segmented-control-item
    >
    <calcite-segmented-control-item icon-start="biking" icon-end="biking" value="bicycle"
      >Bicycle</calcite-segmented-control-item
    >
    <calcite-segmented-control-item value="nothing">Nothing</calcite-segmented-control-item>
  </calcite-segmented-control>`, o = () => t`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 20px;
    }
  </style>
  <div class="container">
    <calcite-segmented-control
      name="validation"
      required
      scale="s"
      status="invalid"
      validation-icon
      validation-message="Please select an item."
    >
      <calcite-segmented-control-item scale="s" value="react" checked>React</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="s" value="ember">Ember</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="s" value="angular">Angular</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="s" value="vue">Vue</calcite-segmented-control-item>
    </calcite-segmented-control>

    <calcite-segmented-control
      name="validation"
      required
      scale="m"
      status="invalid"
      validation-icon
      validation-message="Please select an item."
    >
      <calcite-segmented-control-item scale="m" value="react" checked>React</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="m" value="ember">Ember</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="m" value="angular">Angular</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="m" value="vue">Vue</calcite-segmented-control-item>
    </calcite-segmented-control>

    <calcite-segmented-control
      name="validation"
      required
      scale="l"
      status="invalid"
      validation-icon
      validation-message="Please select an item."
    >
      <calcite-segmented-control-item scale="l" value="react" checked>React</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="l" value="ember">Ember</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="l" value="angular">Angular</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="l" value="vue">Vue</calcite-segmented-control-item>
    </calcite-segmented-control>
  </div>
`, s = () => t`
  <h1>small</h1>
  <calcite-segmented-control scale="s">
    <calcite-segmented-control-item icon-start="banana" value="react" checked></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-start="gear" value="ember"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-start="3d-glasses" value="angular"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-start="effects" value="vue"></calcite-segmented-control-item>
  </calcite-segmented-control>

  <h1>medium</h1>
  <calcite-segmented-control scale="m">
    <calcite-segmented-control-item icon-end="banana" value="react" checked></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="gear" value="ember"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="3d-glasses" value="angular"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="effects" value="vue"></calcite-segmented-control-item>
  </calcite-segmented-control>

  <h1>medium</h1>
  <calcite-segmented-control scale="l">
    <calcite-segmented-control-item icon-end="banana" value="react" checked></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="gear" value="ember"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="3d-glasses" value="angular"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="effects" value="vue"></calcite-segmented-control-item>
  </calcite-segmented-control>
`;
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(args: SegmentedControlStoryArgs): string => html\`
  <calcite-segmented-control
    layout="\${args.layout}"
    appearance="\${args.appearance}"
    scale="\${args.scale}"
    width="\${args.width}"
    \${boolean("disabled", args.disabled)}
    status="\${args.status}"
    validation-icon="\${args.validationIcon}"
    validation-message="\${args.validationMessage}"
  >
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  </calcite-segmented-control>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:33vw;">
    <calcite-label scale="m">
      My great segmented control
      <calcite-segmented-control layout="horizontal" appearance="solid" width="full" status="idle">
        <calcite-segmented-control-item icon-start="car" value="car" checked>Car</calcite-segmented-control-item>
        <calcite-segmented-control-item icon-start="plane" value="plane">Plane</calcite-segmented-control-item>
        <calcite-segmented-control-item icon-start="biking" value="bicycle">Bicycle</calcite-segmented-control-item>
      </calcite-segmented-control>
    </calcite-label>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-segmented-control
    class="calcite-mode-dark"
    dir="rtl"
    validation-message="This should not appear because the status is not 'invalid'"
  >
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  </calcite-segmented-control>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-segmented-control disabled>
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  </calcite-segmented-control>\``,
      ...a.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-segmented-control scale="s">
    <calcite-segmented-control-item icon-start="car" icon-end="car" value="car" checked
      >Car</calcite-segmented-control-item
    >
    <calcite-segmented-control-item icon-start="plane" icon-end="plane" value="plane"
      >Plane</calcite-segmented-control-item
    >
    <calcite-segmented-control-item icon-start="biking" icon-end="biking" value="bicycle"
      >Bicycle</calcite-segmented-control-item
    >
    <calcite-segmented-control-item value="nothing">Nothing</calcite-segmented-control-item>
  </calcite-segmented-control>\``,
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
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 20px;
    }
  </style>
  <div class="container">
    <calcite-segmented-control
      name="validation"
      required
      scale="s"
      status="invalid"
      validation-icon
      validation-message="Please select an item."
    >
      <calcite-segmented-control-item scale="s" value="react" checked>React</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="s" value="ember">Ember</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="s" value="angular">Angular</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="s" value="vue">Vue</calcite-segmented-control-item>
    </calcite-segmented-control>

    <calcite-segmented-control
      name="validation"
      required
      scale="m"
      status="invalid"
      validation-icon
      validation-message="Please select an item."
    >
      <calcite-segmented-control-item scale="m" value="react" checked>React</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="m" value="ember">Ember</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="m" value="angular">Angular</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="m" value="vue">Vue</calcite-segmented-control-item>
    </calcite-segmented-control>

    <calcite-segmented-control
      name="validation"
      required
      scale="l"
      status="invalid"
      validation-icon
      validation-message="Please select an item."
    >
      <calcite-segmented-control-item scale="l" value="react" checked>React</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="l" value="ember">Ember</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="l" value="angular">Angular</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="l" value="vue">Vue</calcite-segmented-control-item>
    </calcite-segmented-control>
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
  <h1>small</h1>
  <calcite-segmented-control scale="s">
    <calcite-segmented-control-item icon-start="banana" value="react" checked></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-start="gear" value="ember"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-start="3d-glasses" value="angular"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-start="effects" value="vue"></calcite-segmented-control-item>
  </calcite-segmented-control>

  <h1>medium</h1>
  <calcite-segmented-control scale="m">
    <calcite-segmented-control-item icon-end="banana" value="react" checked></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="gear" value="ember"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="3d-glasses" value="angular"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="effects" value="vue"></calcite-segmented-control-item>
  </calcite-segmented-control>

  <h1>medium</h1>
  <calcite-segmented-control scale="l">
    <calcite-segmented-control-item icon-end="banana" value="react" checked></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="gear" value="ember"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="3d-glasses" value="angular"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="effects" value="vue"></calcite-segmented-control-item>
  </calcite-segmented-control>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
const V = ["simple", "fullWidthWithIcons", "darkModeRTL_TestOnly", "disabled_TestOnly", "WithIconStartAndEnd", "validationMessage_TestOnly", "iconOnly"];
export {
  i as WithIconStartAndEnd,
  V as __namedExportsOrder,
  c as darkModeRTL_TestOnly,
  A as default,
  a as disabled_TestOnly,
  l as fullWidthWithIcons,
  s as iconOnly,
  n as simple,
  o as validationMessage_TestOnly
};
