/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as s } from "./helpers.js";
import { b as i, o as c, m as d } from "./utils3.js";
import { h as n } from "./formatting.js";
import { A as b } from "./resources34.js";
import "./button.js";
import "./label2.js";
import "./radio-button.js";
import "./radio-button-group.js";
const {
  layout: o,
  scale: u,
  status: r
} = b, x = {
  title: "Components/Controls/Radio/Radio Button Group",
  args: {
    disabled: !1,
    hidden: !1,
    labelText: "Label text",
    layout: o.defaultValue,
    required: !1,
    scale: u.defaultValue,
    status: r.defaultValue,
    validationIcon: "",
    validationMessage: ""
  },
  argTypes: {
    layout: {
      options: o.values.filter((a) => a !== "grid" && a !== "inline" && a !== "center" && a !== "auto" && a !== "fixed" && a !== "none" && a !== "horizontal-single"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: u.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: r.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: ["", ...s],
      control: {
        type: "select"
      }
    }
  }
}, l = (a) => n`
  <calcite-radio-button-group
    name="simple"
    ${i("disabled", a.disabled)}
    ${i("hidden", a.hidden)}
    ${c("label-text", a.labelText)}
    layout="${a.layout}"
    ${i("required", a.required)}
    scale="${a.scale}"
    status="${a.status}"
    ${c("validation-icon", a.validationIcon)}
    validation-message="${a.validationMessage}"
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
`, e = () => n`
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
e.parameters = {
  themes: d
};
const t = () => n`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 20px;
    }
  </style>
  <form>
    <div class="container">
      <calcite-radio-button-group
        layout="horizontal"
        name="validation-s"
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
        name="validation-m"
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
        name="validation-l"
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
      <calcite-button type="submit">Submit</calcite-button>
      <calcite-button type="reset" kind="danger">Reset</calcite-button>
    </div>
  </form>
`;
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(args: RadioButtonGroupStoryArgs): string => html\`
  <calcite-radio-button-group
    name="simple"
    \${boolean("disabled", args.disabled)}
    \${boolean("hidden", args.hidden)}
    \${optionalAttribute("label-text", args.labelText)}
    layout="\${args.layout}"
    \${boolean("required", args.required)}
    scale="\${args.scale}"
    status="\${args.status}"
    \${optionalAttribute("validation-icon", args.validationIcon)}
    validation-message="\${args.validationMessage}"
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
      ...l.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
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
      ...e.parameters?.docs?.source
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
  <form>
    <div class="container">
      <calcite-radio-button-group
        layout="horizontal"
        name="validation-s"
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
        name="validation-m"
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
        name="validation-l"
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
      <calcite-button type="submit">Submit</calcite-button>
      <calcite-button type="reset" kind="danger">Reset</calcite-button>
    </div>
  </form>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
const $ = ["simple", "darkModeRTL", "validationMessage"];
export {
  $ as __namedExportsOrder,
  e as darkModeRTL,
  x as default,
  l as simple,
  t as validationMessage
};
