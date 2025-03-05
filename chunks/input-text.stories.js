import { i as p } from "./helpers.js";
import { c as m, b as o, m as x } from "./utils.js";
import { h as t } from "./formatting.js";
import { A as h } from "./resources14.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
const {
  scale: r,
  status: u,
  alignment: d
} = h, y = {
  title: "Components/Controls/Input Text",
  args: {
    scale: r.defaultValue,
    status: u.defaultValue,
    alignment: d.defaultValue,
    prefixText: "",
    suffixText: "",
    loading: !1,
    clearable: !1,
    disabled: !1,
    value: "",
    placeholder: "Placeholder text",
    validationMessage: "",
    validationIcon: ""
  },
  argTypes: {
    scale: {
      options: r.values,
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
    alignment: {
      options: d.values.filter((e) => e !== "center"),
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: p,
      control: {
        type: "select"
      }
    }
  }
}, i = (e) => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text
      scale="${e.scale}"
      status="${e.status}"
      alignment="${e.alignment}"
      prefix-text="${e.prefixText}"
      suffix-text="${e.suffixText}"
      ${o("loading", e.loading)}
      ${o("clearable", e.clearable)}
      ${o("disabled", e.disabled)}
      value="${e.value}"
      placeholder="${e.placeholder}"
      validation-message="${e.validationMessage}"
      validation-icon="${e.validationIcon}"
    >
    </calcite-input-text>
  </div>
`, l = () => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text id="input-with-slotted-action" status="idle" alignment="start" placeholder="Placeholder text">
      <calcite-button slot="action">Go</calcite-button>
    </calcite-input-text>
  </div>
`, a = () => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text
      id="input-dark-mode"
      status="idle"
      alignment="start"
      placeholder="Placeholder text"
      validation-message="This should not appear because the status is not 'invalid'"
    >
    </calcite-input-text>
  </div>
`;
a.parameters = {
  themes: x
};
const n = () => t`
  <calcite-label scale="l">
    Input Label
    <calcite-input-text placeholder="Placeholder" scale="l"></calcite-input-text>
    <calcite-input-text
      placeholder="Placeholder"
      scale="l"
      icon="search"
      clearable
      value="sample input to show x"
    ></calcite-input-text>
  </calcite-label>
`, s = () => m(t`
    <style>
      .breakpoint-story-container {
        flex-wrap: wrap;
      }
      .breakpoint-story-container > * {
        flex-basis: 100%;
      }
    </style>
    <calcite-input-text
      scale="{scale}"
      placeholder="Placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input-text>
    <calcite-input-text
      scale="{scale}"
      value="Value: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input-text>
  `), c = () => t`
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
    <calcite-input-text
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-input-text>
    <calcite-input-text
      scale="m"
      status="invalid"
      validation-message="Value must be greater than 1337"
      validation-icon
      value="420"
    ></calcite-input-text>
    <calcite-input-text
      scale="l"
      status="invalid"
      validation-message="Exceeds the maximum length of 2 characters"
      validation-icon
      value="test"
    ></calcite-input-text>
  </div>
`;
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: InputTextStoryArgs): string => html\`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text
      scale="\${args.scale}"
      status="\${args.status}"
      alignment="\${args.alignment}"
      prefix-text="\${args.prefixText}"
      suffix-text="\${args.suffixText}"
      \${boolean("loading", args.loading)}
      \${boolean("clearable", args.clearable)}
      \${boolean("disabled", args.disabled)}
      value="\${args.value}"
      placeholder="\${args.placeholder}"
      validation-message="\${args.validationMessage}"
      validation-icon="\${args.validationIcon}"
    >
    </calcite-input-text>
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
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text id="input-with-slotted-action" status="idle" alignment="start" placeholder="Placeholder text">
      <calcite-button slot="action">Go</calcite-button>
    </calcite-input-text>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text
      id="input-dark-mode"
      status="idle"
      alignment="start"
      placeholder="Placeholder text"
      validation-message="This should not appear because the status is not 'invalid'"
    >
    </calcite-input-text>
  </div>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-label scale="l">
    Input Label
    <calcite-input-text placeholder="Placeholder" scale="l"></calcite-input-text>
    <calcite-input-text
      placeholder="Placeholder"
      scale="l"
      icon="search"
      clearable
      value="sample input to show x"
    ></calcite-input-text>
  </calcite-label>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(html\`
    <style>
      .breakpoint-story-container {
        flex-wrap: wrap;
      }
      .breakpoint-story-container > * {
        flex-basis: 100%;
      }
    </style>
    <calcite-input-text
      scale="{scale}"
      placeholder="Placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input-text>
    <calcite-input-text
      scale="{scale}"
      value="Value: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input-text>
  \`)`,
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
    <calcite-input-text
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-input-text>
    <calcite-input-text
      scale="m"
      status="invalid"
      validation-message="Value must be greater than 1337"
      validation-icon
      value="420"
    ></calcite-input-text>
    <calcite-input-text
      scale="l"
      status="invalid"
      validation-message="Exceeds the maximum length of 2 characters"
      validation-icon
      value="test"
    ></calcite-input-text>
  </div>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
const T = ["simple", "withSlottedAction", "darkModeRTL_TestOnly", "mediumIconForLargeScaleStyling_TestOnly", "widthSetToBreakpoints_TestOnly", "validationMessageAllScales_TestOnly"];
export {
  T as __namedExportsOrder,
  a as darkModeRTL_TestOnly,
  y as default,
  n as mediumIconForLargeScaleStyling_TestOnly,
  i as simple,
  c as validationMessageAllScales_TestOnly,
  s as widthSetToBreakpoints_TestOnly,
  l as withSlottedAction
};
