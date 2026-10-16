/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as a, o as d, m as c } from "./utils3.js";
import { h as l } from "./formatting.js";
import { A as n } from "./resources34.js";
import "./label2.js";
import "./radio-button.js";
const {
  scale: r,
  status: i
} = n, $ = {
  title: "Components/Controls/Radio/Radio Button",
  args: {
    checked: !1,
    disabled: !1,
    hidden: !1,
    focused: !1,
    labelText: "Label text",
    required: !1,
    scale: r.defaultValue,
    label: "Radio Button",
    status: i.defaultValue,
    validationMessage: ""
  },
  argTypes: {
    scale: {
      options: r.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: i.values,
      control: {
        type: "select"
      }
    }
  }
}, o = (e) => l`
  <calcite-radio-button
    ${a("checked", e.checked)}
    ${a("disabled", e.disabled)}
    ${a("hidden", e.hidden)}
    ${a("focused", e.focused)}
    ${d("label-text", e.labelText)}
    name="simple"
    ${a("required", e.required)}
    scale="${e.scale}"
    status="${e.status}"
    validation-message="${e.validationMessage}"
    value="value"
  ></calcite-radio-button>
`, t = () => l`
  <calcite-label layout="inline" class="calcite-mode-dark" dir="rtl">
    <calcite-radio-button name="dark" scale="m" value="value"> </calcite-radio-button>
    Radio Button
  </calcite-label>
`;
t.parameters = {
  themes: c
};
const s = () => l`<calcite-radio-button checked disabled></calcite-radio-button>`;
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(args: RadioButtonStoryArgs): string => html\`
  <calcite-radio-button
    \${boolean("checked", args.checked)}
    \${boolean("disabled", args.disabled)}
    \${boolean("hidden", args.hidden)}
    \${boolean("focused", args.focused)}
    \${optionalAttribute("label-text", args.labelText)}
    name="simple"
    \${boolean("required", args.required)}
    scale="\${args.scale}"
    status="\${args.status}"
    validation-message="\${args.validationMessage}"
    value="value"
  ></calcite-radio-button>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-label layout="inline" class="calcite-mode-dark" dir="rtl">
    <calcite-radio-button name="dark" scale="m" value="value"> </calcite-radio-button>
    Radio Button
  </calcite-label>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: "(): string => html`<calcite-radio-button checked disabled></calcite-radio-button>`",
      ...s.parameters?.docs?.source
    }
  }
};
const f = ["simple", "darkModeRTL", "disabled"];
export {
  f as __namedExportsOrder,
  t as darkModeRTL,
  $ as default,
  s as disabled,
  o as simple
};
