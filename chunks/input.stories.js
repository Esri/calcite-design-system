import { i as v } from "./helpers.js";
import { c as b, b as p, m as f } from "./utils.js";
import { h as t } from "./formatting.js";
import { A as T } from "./resources14.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
const {
  textType: m,
  alignment: g,
  layout: x,
  scale: h,
  status: y
} = T, O = {
  title: "Components/Controls/Input",
  args: {
    type: m.defaultValue,
    alignment: g.defaultValue,
    numberButtonType: x.defaultValue,
    min: 0,
    max: 100,
    step: 1,
    prefixText: "",
    suffixText: "",
    loading: !1,
    clearable: !1,
    disabled: !1,
    value: "",
    scale: h.defaultValue,
    status: y.defaultValue,
    placeholder: "Placeholder text",
    validationMessage: "",
    validationIcon: ""
  },
  argTypes: {
    type: {
      options: m.values,
      control: {
        type: "select"
      }
    },
    alignment: {
      options: g.values.filter((e) => e !== "center"),
      control: {
        type: "select"
      }
    },
    numberButtonType: {
      options: x.values.filter((e) => e !== "grid" && e !== "inline" && e !== "center" && e !== "auto" && e !== "fixed" && e !== "horizontal-single"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: h.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: y.values,
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
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      id="input-with-label"
      type="${e.type}"
      alignment="${e.alignment}"
      number-button-type="${e.numberButtonType}"
      min="${e.min}"
      max="${e.max}"
      step="${e.step}"
      prefix-text="${e.prefixText}"
      suffix-text="${e.suffixText}"
      ${p("loading", e.loading)}
      ${p("clearable", e.clearable)}
      ${p("disabled", e.disabled)}
      value="${e.value}"
      scale="${e.scale}"
      status="${e.status}"
      placeholder="${e.placeholder}"
      validation-message="${e.validationMessage}"
      validation-icon="${e.validationIcon}"
    ></calcite-input>
  </div>
`, i = () => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      id="input-with-slotted-action"
      type="text"
      alignment="start"
      number-button-type="horizontal"
      min="0"
      max="100"
      step="1"
      placeholder="Placeholder text"
      scale="m"
      status="idle"
    >
      <calcite-button slot="action">Go</calcite-button>
    </calcite-input>
  </div>
`, l = () => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      id="input-with-text-area"
      type="textarea"
      scale="m"
      status="idle"
      placeholder="Placeholder text"
      validation-message="My great input message"
    >
    </calcite-input>
  </div>
`, s = () => t`<calcite-input disabled value="disabled"></calcite-input>`, a = () => t`
  <div dir="rtl" style="width:300px;max-width:100%;text-align:center;">
    <calcite-label class="calcite-mode-dark" status="idle" for="input-dark-mode">
      My great label
      <calcite-input
        id="input-dark-mode"
        type="text"
        status="idle"
        alignment="start"
        number-button-type="horizontal"
        min="0"
        max="100"
        step="1"
        placeholder="Placeholder text"
        validation-message="This should not appear because the status is not 'invalid'"
      >
      </calcite-input>
    </calcite-label>
  </div>
`;
a.parameters = {
  themes: f
};
const c = () => t` <calcite-input type="number" value="-Infinity"></calcite-input>`, r = () => t` <calcite-input type="number" lang="ar-EG" value="123456"></calcite-input>`, o = () => t`
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
    <calcite-input
      type="number"
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-input>
    <calcite-input
      type="number"
      scale="m"
      status="invalid"
      validation-message="Value must be greater than 1337"
      validation-icon
      value="420"
    ></calcite-input>
    <calcite-input
      type="number"
      scale="l"
      status="invalid"
      validation-message="Exceeds the maximum length of 2 characters"
      validation-icon
      value="123"
    ></calcite-input>
  </div>
`, u = () => b(t`
    <style>
      .breakpoint-story-container {
        flex-wrap: wrap;
      }
      .breakpoint-story-container > * {
        flex-basis: 100%;
      }
    </style>
    <calcite-input
      scale="{scale}"
      placeholder="Placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input>
    <calcite-input
      scale="{scale}"
      value="Value: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input>
  `), d = () => t`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      background: #abcdef;
      padding: 8px;
      width: 200px;
    }
  </style>
  <div class="container">
    <calcite-input
      clearable
      icon="date-time"
      step=".001"
      type="datetime-local"
      value="2024-05-09T12:00:00.000"
    ></calcite-input>
  </div>
`;
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(args: InputStoryArgs): string => html\`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      id="input-with-label"
      type="\${args.type}"
      alignment="\${args.alignment}"
      number-button-type="\${args.numberButtonType}"
      min="\${args.min}"
      max="\${args.max}"
      step="\${args.step}"
      prefix-text="\${args.prefixText}"
      suffix-text="\${args.suffixText}"
      \${boolean("loading", args.loading)}
      \${boolean("clearable", args.clearable)}
      \${boolean("disabled", args.disabled)}
      value="\${args.value}"
      scale="\${args.scale}"
      status="\${args.status}"
      placeholder="\${args.placeholder}"
      validation-message="\${args.validationMessage}"
      validation-icon="\${args.validationIcon}"
    ></calcite-input>
  </div>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      id="input-with-slotted-action"
      type="text"
      alignment="start"
      number-button-type="horizontal"
      min="0"
      max="100"
      step="1"
      placeholder="Placeholder text"
      scale="m"
      status="idle"
    >
      <calcite-button slot="action">Go</calcite-button>
    </calcite-input>
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
    <calcite-input
      id="input-with-text-area"
      type="textarea"
      scale="m"
      status="idle"
      placeholder="Placeholder text"
      validation-message="My great input message"
    >
    </calcite-input>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-input disabled value="disabled"></calcite-input>`',
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
  <div dir="rtl" style="width:300px;max-width:100%;text-align:center;">
    <calcite-label class="calcite-mode-dark" status="idle" for="input-dark-mode">
      My great label
      <calcite-input
        id="input-dark-mode"
        type="text"
        status="idle"
        alignment="start"
        number-button-type="horizontal"
        min="0"
        max="100"
        step="1"
        placeholder="Placeholder text"
        validation-message="This should not appear because the status is not 'invalid'"
      >
      </calcite-input>
    </calcite-label>
  </div>
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
      originalSource: '(): string => html` <calcite-input type="number" value="-Infinity"></calcite-input>`',
      ...c.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html` <calcite-input type="number" lang="ar-EG" value="123456"></calcite-input>`',
      ...r.parameters?.docs?.source
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
    <calcite-input
      type="number"
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-input>
    <calcite-input
      type="number"
      scale="m"
      status="invalid"
      validation-message="Value must be greater than 1337"
      validation-icon
      value="420"
    ></calcite-input>
    <calcite-input
      type="number"
      scale="l"
      status="invalid"
      validation-message="Exceeds the maximum length of 2 characters"
      validation-icon
      value="123"
    ></calcite-input>
  </div>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
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
    <calcite-input
      scale="{scale}"
      placeholder="Placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input>
    <calcite-input
      scale="{scale}"
      value="Value: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input>
  \`)`,
      ...u.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      background: #abcdef;
      padding: 8px;
      width: 200px;
    }
  </style>
  <div class="container">
    <calcite-input
      clearable
      icon="date-time"
      step=".001"
      type="datetime-local"
      value="2024-05-09T12:00:00.000"
    ></calcite-input>
  </div>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
const _ = ["simple", "withSlottedAction", "textarea_TestOnly", "disabled_TestOnly", "darkModeRTL_TestOnly", "negativeInfinity_TestOnly", "arabicLocaleWithLatinNumberingSystem_TestOnly", "validationMessageAllScales_TestOnly", "widthSetToBreakpoints_TestOnly", "shrinkingInputDoesNotObscureCalendarIcon"];
export {
  _ as __namedExportsOrder,
  r as arabicLocaleWithLatinNumberingSystem_TestOnly,
  a as darkModeRTL_TestOnly,
  O as default,
  s as disabled_TestOnly,
  c as negativeInfinity_TestOnly,
  d as shrinkingInputDoesNotObscureCalendarIcon,
  n as simple,
  l as textarea_TestOnly,
  o as validationMessageAllScales_TestOnly,
  u as widthSetToBreakpoints_TestOnly,
  i as withSlottedAction
};
