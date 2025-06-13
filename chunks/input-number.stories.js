import { i as g } from "./helpers.js";
import { c as v, b as u, m as h } from "./utils.js";
import { h as t } from "./formatting.js";
import { A as x } from "./resources14.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
const {
  scale: m,
  status: p,
  alignment: d,
  layout: b
} = x, w = {
  title: "Components/Controls/Input Number",
  args: {
    scale: m.defaultValue,
    status: p.defaultValue,
    alignment: d.defaultValue,
    numberButtonType: b.defaultValue,
    min: 0,
    max: 100,
    step: 1,
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
      options: m.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: p.values,
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
    numberButtonType: {
      options: b.values.filter((e) => e !== "grid" && e !== "inline" && e !== "center" && e !== "auto" && e !== "fixed" && e !== "horizontal-single"),
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: g,
      control: {
        type: "select"
      }
    }
  }
}, a = (e) => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-number
      scale="${e.scale}"
      status="${e.status}"
      alignment="${e.alignment}"
      number-button-type="${e.numberButtonType}"
      min="${e.min}"
      max="${e.max}"
      step="${e.step}"
      prefix-text="${e.prefixText}"
      suffix-text="${e.suffixText}"
      ${u("loading", e.loading)}
      ${u("clearable", e.clearable)}
      ${u("disabled", e.disabled)}
      value="${e.value}"
      placeholder="${e.placeholder}"
      validation-message="${e.validationMessage}"
      validation-icon="${e.validationIcon}"
    >
    </calcite-input-number>
  </div>
`, i = () => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-number
      id="input-with-slotted-action"
      status="idle"
      alignment="start"
      number-button-type="horizontal"
      min="0"
      max="100"
      step="1"
      placeholder="Placeholder text"
    >
      <calcite-button slot="action">Go</calcite-button>
    </calcite-input-number>
  </div>
`, n = () => t`
  <div dir="rtl" style="width:300px;max-width:100%;text-align:center;">
    <calcite-label class="calcite-mode-dark" status="idle" for="input-dark-mode">
      My great label
      <calcite-input-number
        id="input-dark-mode"
        status="idle"
        alignment="start"
        number-button-type="horizontal"
        min="0"
        max="100"
        step="1"
        placeholder="Placeholder text"
        validation-message="This should not appear because the status is not 'invalid'"
      >
      </calcite-input-number>
    </calcite-label>
  </div>
`;
n.parameters = {
  themes: h
};
const l = () => t`<calcite-input-number value="Infinity"></calcite-input-number>`, r = () => t`
  <calcite-input-number number-button-type="vertical" lang="ar-EG" value="123456" scale="l"></calcite-input-number
  ><calcite-input-number
    number-button-type="vertical"
    lang="ar-EG"
    value="123456"
    scale="l"
    icon="pen"
  ></calcite-input-number>
  <calcite-input-number number-button-type="horizontal" lang="ar-EG" value="123456" scale="l"></calcite-input-number
  ><calcite-input-number
    number-button-type="horizontal"
    lang="ar-EG"
    value="123456"
    scale="l"
    icon="pen"
  ></calcite-input-number>
`, s = () => t`<calcite-input-number lang="ar-EG" numbering-system="latn" value="123456"></calcite-input-number>`, c = () => t`
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
    <calcite-input-number
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-input-number>
    <calcite-input-number
      scale="m"
      status="invalid"
      validation-message="Value must be greater than 1337"
      validation-icon
      value="420"
    ></calcite-input-number>
    <calcite-input-number
      scale="l"
      status="invalid"
      validation-message="Exceeds the maximum length of 2 characters"
      validation-icon
      value="123"
    ></calcite-input-number>
  </div>
`, o = () => v(t`
    <style>
      .breakpoint-story-container {
        flex-wrap: wrap;
      }
      .breakpoint-story-container > * {
        flex-basis: 100%;
      }
    </style>
    <calcite-input-number
      scale="{scale}"
      placeholder="Placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input-number>
    <calcite-input-number
      scale="{scale}"
      value="123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
    ></calcite-input-number>
  `);
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(args: InputNumberStoryArgs): string => html\`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-number
      scale="\${args.scale}"
      status="\${args.status}"
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
      placeholder="\${args.placeholder}"
      validation-message="\${args.validationMessage}"
      validation-icon="\${args.validationIcon}"
    >
    </calcite-input-number>
  </div>
\``,
      ...a.parameters?.docs?.source
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
    <calcite-input-number
      id="input-with-slotted-action"
      status="idle"
      alignment="start"
      number-button-type="horizontal"
      min="0"
      max="100"
      step="1"
      placeholder="Placeholder text"
    >
      <calcite-button slot="action">Go</calcite-button>
    </calcite-input-number>
  </div>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div dir="rtl" style="width:300px;max-width:100%;text-align:center;">
    <calcite-label class="calcite-mode-dark" status="idle" for="input-dark-mode">
      My great label
      <calcite-input-number
        id="input-dark-mode"
        status="idle"
        alignment="start"
        number-button-type="horizontal"
        min="0"
        max="100"
        step="1"
        placeholder="Placeholder text"
        validation-message="This should not appear because the status is not 'invalid'"
      >
      </calcite-input-number>
    </calcite-label>
  </div>
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
      originalSource: '(): string => html`<calcite-input-number value="Infinity"></calcite-input-number>`',
      ...l.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-input-number number-button-type="vertical" lang="ar-EG" value="123456" scale="l"></calcite-input-number
  ><calcite-input-number
    number-button-type="vertical"
    lang="ar-EG"
    value="123456"
    scale="l"
    icon="pen"
  ></calcite-input-number>
  <calcite-input-number number-button-type="horizontal" lang="ar-EG" value="123456" scale="l"></calcite-input-number
  ><calcite-input-number
    number-button-type="horizontal"
    lang="ar-EG"
    value="123456"
    scale="l"
    icon="pen"
  ></calcite-input-number>
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
      originalSource: '(): string => html`<calcite-input-number lang="ar-EG" numbering-system="latn" value="123456"></calcite-input-number>`',
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
    <calcite-input-number
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-input-number>
    <calcite-input-number
      scale="m"
      status="invalid"
      validation-message="Value must be greater than 1337"
      validation-icon
      value="420"
    ></calcite-input-number>
    <calcite-input-number
      scale="l"
      status="invalid"
      validation-message="Exceeds the maximum length of 2 characters"
      validation-icon
      value="123"
    ></calcite-input-number>
  </div>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
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
    <calcite-input-number
      scale="{scale}"
      placeholder="Placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input-number>
    <calcite-input-number
      scale="{scale}"
      value="123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
    ></calcite-input-number>
  \`)`,
      ...o.parameters?.docs?.source
    }
  }
};
const S = ["simple", "withSlottedAction", "darkModeRTL_TestOnly", "Infinity_TestOnly", "mediumIconForLargeInputStyling_TestOnly", "arabicLocaleWithLatinNumberingSystem_TestOnly", "validationMessageAllScales_TestOnly", "widthSetToBreakpoints_TestOnly"];
export {
  l as Infinity_TestOnly,
  S as __namedExportsOrder,
  s as arabicLocaleWithLatinNumberingSystem_TestOnly,
  n as darkModeRTL_TestOnly,
  w as default,
  r as mediumIconForLargeInputStyling_TestOnly,
  a as simple,
  c as validationMessageAllScales_TestOnly,
  o as widthSetToBreakpoints_TestOnly,
  i as withSlottedAction
};
