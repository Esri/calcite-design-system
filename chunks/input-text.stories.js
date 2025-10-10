import { i as h } from "./helpers.js";
import { n as g, k as d, h as t, j as v } from "./index.js";
import { A as f } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  scale: p,
  status: x,
  alignment: m
} = f, w = {
  title: "Components/Controls/Input Text",
  args: {
    scale: p.defaultValue,
    status: x.defaultValue,
    alignment: m.defaultValue,
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
      options: p.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: x.values,
      control: {
        type: "select"
      }
    },
    alignment: {
      options: m.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: h,
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
      ${d("loading", e.loading)}
      ${d("clearable", e.clearable)}
      ${d("disabled", e.disabled)}
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
  themes: v
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
`, c = () => g(t`
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
  `), s = () => t`
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
`, o = () => t` <style>
      :root {
        font-size: 60px;
      }
    </style>
    <calcite-input-text placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input-text>`, r = () => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text alignment="start" placeholder="Placeholder text"></calcite-input-text>
    <br />
    <calcite-input-text alignment="center" placeholder="Placeholder text"></calcite-input-text>
    <br />
    <calcite-input-text alignment="end" placeholder="Placeholder text"></calcite-input-text>
  </div>
`, u = () => t` <style>
      .overlay {
        position: absolute;
        inset: 0;
        background-color: white;
        opacity: 0.75;
      }
    </style>
    <calcite-input-text icon="check-square-f"></calcite-input-text>
    <div class="overlay"></div>`;
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
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
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
      ...c.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
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
      ...s.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <style>
      :root {
        font-size: 60px;
      }
    </style>
    <calcite-input-text placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input-text>\``,
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
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text alignment="start" placeholder="Placeholder text"></calcite-input-text>
    <br />
    <calcite-input-text alignment="center" placeholder="Placeholder text"></calcite-input-text>
    <br />
    <calcite-input-text alignment="end" placeholder="Placeholder text"></calcite-input-text>
  </div>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <style>
      .overlay {
        position: absolute;
        inset: 0;
        background-color: white;
        opacity: 0.75;
      }
    </style>
    <calcite-input-text icon="check-square-f"></calcite-input-text>
    <div class="overlay"></div>\``,
      ...u.parameters?.docs?.source
    }
  }
};
const T = ["simple", "withSlottedAction", "darkModeRTL_TestOnly", "mediumIconForLargeScaleStyling_TestOnly", "widthSetToBreakpoints_TestOnly", "validationMessageAllScales_TestOnly", "fontSizeSetAtRoot", "alignmentAllOptions", "overlayDoesNotObscureIcon"];
export {
  T as __namedExportsOrder,
  r as alignmentAllOptions,
  a as darkModeRTL_TestOnly,
  w as default,
  o as fontSizeSetAtRoot,
  n as mediumIconForLargeScaleStyling_TestOnly,
  u as overlayDoesNotObscureIcon,
  i as simple,
  s as validationMessageAllScales_TestOnly,
  c as widthSetToBreakpoints_TestOnly,
  l as withSlottedAction
};
