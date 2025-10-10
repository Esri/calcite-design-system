import { k as c, h as i, j as u } from "./index.js";
import { A as r } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  layout: n,
  scale: o
} = r, b = {
  title: "Components/Controls/Radio/Radio Button Group",
  args: {
    disabled: !1,
    hidden: !1,
    layout: n.defaultValue,
    scale: o.defaultValue
  },
  argTypes: {
    layout: {
      options: n.values.filter((a) => a !== "grid" && a !== "inline" && a !== "center" && a !== "auto" && a !== "fixed" && a !== "none" && a !== "horizontal-single"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: o.values,
      control: {
        type: "select"
      }
    }
  }
}, e = (a) => i`
  <calcite-radio-button-group
    name="simple"
    ${c("disabled", a.disabled)}
    ${c("hidden", a.hidden)}
    layout="${a.layout}"
    scale="${a.scale}"
  >
    <calcite-label layout="inline">
      <calcite-radio-button value="react"></calcite-radio-button>
      React
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="ember"></calcite-radio-button>
      Ember
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="angular"></calcite-radio-button>
      Angular
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="vue"></calcite-radio-button>
      Vue
    </calcite-label>
  </calcite-radio-button-group>
`, l = () => i`
  <calcite-radio-button-group
    class="calcite-mode-dark"
    dir="rtl"
    name="dark"
    layout="vertical"
    validation-icon
    validation-message="This should not appear because the status is not 'invalid'"
  >
    <calcite-label layout="inline">
      <calcite-radio-button value="react" checked></calcite-radio-button>
      React
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="ember"></calcite-radio-button>
      Ember
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="angular"></calcite-radio-button>
      Angular
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="vue"></calcite-radio-button>
      Vue
    </calcite-label>
  </calcite-radio-button-group>
`;
l.parameters = {
  themes: u
};
const t = () => i`
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
    <calcite-radio-button-group
      layout="horizontal"
      name="validation"
      required
      scale="s"
      status="invalid"
      validation-icon
      validation-message="Please select an option."
    >
      <calcite-label layout="inline" scale="s">
        <calcite-radio-button value="one" scale="s"></calcite-radio-button>
        One
      </calcite-label>
      <calcite-label layout="inline" scale="s">
        <calcite-radio-button value="two" scale="s"></calcite-radio-button>
        Two
      </calcite-label>
      <calcite-label layout="inline" scale="s">
        <calcite-radio-button value="three" scale="s"></calcite-radio-button>
        Three
      </calcite-label>
    </calcite-radio-button-group>

    <calcite-radio-button-group
      layout="horizontal"
      name="validation"
      required
      scale="m"
      status="invalid"
      validation-icon
      validation-message="Please select an option."
    >
      <calcite-label layout="inline" scale="m">
        <calcite-radio-button value="one" scale="m"></calcite-radio-button>
        One
      </calcite-label>
      <calcite-label layout="inline" scale="m">
        <calcite-radio-button value="two" scale="m"></calcite-radio-button>
        Two
      </calcite-label>
      <calcite-label layout="inline" scale="m">
        <calcite-radio-button value="three" scale="m"></calcite-radio-button>
        Three
      </calcite-label>
    </calcite-radio-button-group>

    <calcite-radio-button-group
      layout="horizontal"
      name="validation"
      required
      scale="l"
      status="invalid"
      validation-icon
      validation-message="Please select an option."
    >
      <calcite-label layout="inline" scale="l">
        <calcite-radio-button value="one" scale="l"></calcite-radio-button>
        One
      </calcite-label>
      <calcite-label layout="inline" scale="l">
        <calcite-radio-button value="two" scale="l"></calcite-radio-button>
        Two
      </calcite-label>
      <calcite-label layout="inline" scale="l">
        <calcite-radio-button value="three" scale="l"></calcite-radio-button>
        Three
      </calcite-label>
    </calcite-radio-button-group>
  </div>
`;
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(args: RadioButtonGroupStoryArgs): string => html\`
  <calcite-radio-button-group
    name="simple"
    \${boolean("disabled", args.disabled)}
    \${boolean("hidden", args.hidden)}
    layout="\${args.layout}"
    scale="\${args.scale}"
  >
    <calcite-label layout="inline">
      <calcite-radio-button value="react"></calcite-radio-button>
      React
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="ember"></calcite-radio-button>
      Ember
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="angular"></calcite-radio-button>
      Angular
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="vue"></calcite-radio-button>
      Vue
    </calcite-label>
  </calcite-radio-button-group>
\``,
      ...e.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-radio-button-group
    class="calcite-mode-dark"
    dir="rtl"
    name="dark"
    layout="vertical"
    validation-icon
    validation-message="This should not appear because the status is not 'invalid'"
  >
    <calcite-label layout="inline">
      <calcite-radio-button value="react" checked></calcite-radio-button>
      React
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="ember"></calcite-radio-button>
      Ember
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="angular"></calcite-radio-button>
      Angular
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="vue"></calcite-radio-button>
      Vue
    </calcite-label>
  </calcite-radio-button-group>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
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
    <calcite-radio-button-group
      layout="horizontal"
      name="validation"
      required
      scale="s"
      status="invalid"
      validation-icon
      validation-message="Please select an option."
    >
      <calcite-label layout="inline" scale="s">
        <calcite-radio-button value="one" scale="s"></calcite-radio-button>
        One
      </calcite-label>
      <calcite-label layout="inline" scale="s">
        <calcite-radio-button value="two" scale="s"></calcite-radio-button>
        Two
      </calcite-label>
      <calcite-label layout="inline" scale="s">
        <calcite-radio-button value="three" scale="s"></calcite-radio-button>
        Three
      </calcite-label>
    </calcite-radio-button-group>

    <calcite-radio-button-group
      layout="horizontal"
      name="validation"
      required
      scale="m"
      status="invalid"
      validation-icon
      validation-message="Please select an option."
    >
      <calcite-label layout="inline" scale="m">
        <calcite-radio-button value="one" scale="m"></calcite-radio-button>
        One
      </calcite-label>
      <calcite-label layout="inline" scale="m">
        <calcite-radio-button value="two" scale="m"></calcite-radio-button>
        Two
      </calcite-label>
      <calcite-label layout="inline" scale="m">
        <calcite-radio-button value="three" scale="m"></calcite-radio-button>
        Three
      </calcite-label>
    </calcite-radio-button-group>

    <calcite-radio-button-group
      layout="horizontal"
      name="validation"
      required
      scale="l"
      status="invalid"
      validation-icon
      validation-message="Please select an option."
    >
      <calcite-label layout="inline" scale="l">
        <calcite-radio-button value="one" scale="l"></calcite-radio-button>
        One
      </calcite-label>
      <calcite-label layout="inline" scale="l">
        <calcite-radio-button value="two" scale="l"></calcite-radio-button>
        Two
      </calcite-label>
      <calcite-label layout="inline" scale="l">
        <calcite-radio-button value="three" scale="l"></calcite-radio-button>
        Three
      </calcite-label>
    </calcite-radio-button-group>
  </div>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
const v = ["simple", "darkModeRTL_TestOnly", "validationMessage_TestOnly"];
export {
  v as __namedExportsOrder,
  l as darkModeRTL_TestOnly,
  b as default,
  e as simple,
  t as validationMessage_TestOnly
};
