/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as x } from "./helpers.js";
import { b as a, o as i, c as b, m as f } from "./utils3.js";
import { h as t } from "./formatting.js";
import { A as y } from "./resources34.js";
import "./button.js";
import "./input-text.js";
import "./label2.js";
const {
  scale: h,
  status: g,
  alignment: v
} = y, q = {
  title: "Components/Controls/Input Text",
  args: {
    scale: h.defaultValue,
    status: g.defaultValue,
    alignment: v.defaultValue,
    prefixText: "",
    suffixText: "",
    loading: !1,
    clearable: !1,
    disabled: !1,
    icon: "",
    iconFlipRtl: !1,
    labelText: "Label text",
    maxLength: void 0,
    minLength: void 0,
    readOnly: !1,
    required: !1,
    value: "",
    placeholder: "Placeholder text",
    validationMessage: "",
    validationIcon: "",
    inlineEditable: !1,
    inlineEditableControls: !1
  },
  argTypes: {
    scale: {
      options: h.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: g.values,
      control: {
        type: "select"
      }
    },
    alignment: {
      options: v.values,
      control: {
        type: "select"
      }
    },
    maxLength: {
      control: {
        type: "number"
      }
    },
    minLength: {
      control: {
        type: "number"
      }
    },
    validationIcon: {
      options: x,
      control: {
        type: "select"
      }
    },
    icon: {
      options: ["", ...x],
      control: {
        type: "select"
      }
    }
  }
}, l = (e) => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text
      scale="${e.scale}"
      status="${e.status}"
      alignment="${e.alignment}"
      prefix-text="${e.prefixText}"
      suffix-text="${e.suffixText}"
      ${a("loading", e.loading)}
      ${a("clearable", e.clearable)}
      ${a("disabled", e.disabled)}
      ${i("icon", e.icon)}
      ${a("icon-flip-rtl", e.iconFlipRtl)}
      ${i("label-text", e.labelText)}
      ${i("max-length", e.maxLength)}
      ${i("min-length", e.minLength)}
      ${a("read-only", e.readOnly)}
      ${a("required", e.required)}
      value="${e.value}"
      placeholder="${e.placeholder}"
      validation-message="${e.validationMessage}"
      ${a("inline-editable", e.inlineEditable)}
      ${a("inline-editable-controls", e.inlineEditableControls)}
      ${i("validation-icon", e.validationIcon)}
    >
    </calcite-input-text>
  </div>
`, o = () => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text id="input-with-slotted-action" status="idle" alignment="start" placeholder="Placeholder text">
      <calcite-button slot="action">Go</calcite-button>
    </calcite-input-text>
  </div>
`, n = () => t`
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
n.parameters = {
  themes: f
};
const c = () => t`
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
`, s = () => b(t`
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
  `), r = () => t`
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
`, d = () => t` <style>
      :root {
        font-size: 60px;
      }
    </style>
    <calcite-input-text placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input-text>`, u = () => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text alignment="start" placeholder="Placeholder text"></calcite-input-text>
    <br />
    <calcite-input-text alignment="center" placeholder="Placeholder text"></calcite-input-text>
    <br />
    <calcite-input-text alignment="end" placeholder="Placeholder text"></calcite-input-text>
  </div>
`, p = () => t` <style>
      .overlay {
        position: absolute;
        inset: 0;
        background-color: white;
        opacity: 0.75;
      }
    </style>
    <calcite-input-text icon="check-square-f"></calcite-input-text>
    <div class="overlay"></div>`, m = () => t`
  <div>
    <calcite-input-text inline-editable inline-editable-controls value="Editable text"></calcite-input-text>
  </div>
`;
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
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
      \${optionalAttribute("icon", args.icon)}
      \${boolean("icon-flip-rtl", args.iconFlipRtl)}
      \${optionalAttribute("label-text", args.labelText)}
      \${optionalAttribute("max-length", args.maxLength)}
      \${optionalAttribute("min-length", args.minLength)}
      \${boolean("read-only", args.readOnly)}
      \${boolean("required", args.required)}
      value="\${args.value}"
      placeholder="\${args.placeholder}"
      validation-message="\${args.validationMessage}"
      \${boolean("inline-editable", args.inlineEditable)}
      \${boolean("inline-editable-controls", args.inlineEditableControls)}
      \${optionalAttribute("validation-icon", args.validationIcon)}
    >
    </calcite-input-text>
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
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text id="input-with-slotted-action" status="idle" alignment="start" placeholder="Placeholder text">
      <calcite-button slot="action">Go</calcite-button>
    </calcite-input-text>
  </div>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
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
      ...n.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
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
      ...c.parameters?.docs?.source
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
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
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
      ...r.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <style>
      :root {
        font-size: 60px;
      }
    </style>
    <calcite-input-text placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input-text>\``,
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
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text alignment="start" placeholder="Placeholder text"></calcite-input-text>
    <br />
    <calcite-input-text alignment="center" placeholder="Placeholder text"></calcite-input-text>
    <br />
    <calcite-input-text alignment="end" placeholder="Placeholder text"></calcite-input-text>
  </div>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
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
  <div>
    <calcite-input-text inline-editable inline-editable-controls value="Editable text"></calcite-input-text>
  </div>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
const A = ["simple", "withSlottedAction", "darkModeRTL", "mediumIconForLargeScaleStyling", "widthSetToBreakpoints", "validationMessageAllScales", "fontSizeSetAtRoot", "alignmentAllOptions", "overlayDoesNotObscureIcon", "inlineEditable"];
export {
  A as __namedExportsOrder,
  u as alignmentAllOptions,
  n as darkModeRTL,
  q as default,
  d as fontSizeSetAtRoot,
  m as inlineEditable,
  c as mediumIconForLargeScaleStyling,
  p as overlayDoesNotObscureIcon,
  l as simple,
  r as validationMessageAllScales,
  s as widthSetToBreakpoints,
  o as withSlottedAction
};
