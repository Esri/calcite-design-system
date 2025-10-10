import { i as v } from "./helpers.js";
import { n as y, k as d, h as t, j as f } from "./index.js";
import { A as S } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  scale: b,
  status: h,
  alignment: g,
  layout: x
} = S, k = {
  title: "Components/Controls/Input Number",
  args: {
    scale: b.defaultValue,
    status: h.defaultValue,
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
    placeholder: "Placeholder text",
    validationMessage: "",
    validationIcon: ""
  },
  argTypes: {
    scale: {
      options: b.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: h.values,
      control: {
        type: "select"
      }
    },
    alignment: {
      options: g.values,
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
    validationIcon: {
      options: v,
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
      ${d("loading", e.loading)}
      ${d("clearable", e.clearable)}
      ${d("disabled", e.disabled)}
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
  themes: f
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
`, c = () => t`<calcite-input-number lang="ar-EG" numbering-system="latn" value="123456"></calcite-input-number>`, s = () => t`
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
`, o = () => y(t`
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
  `), u = () => t` <style>
      :root {
        font-size: 60px;
      }
    </style>
    <calcite-input-number placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input-number>`, m = () => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-number alignment="start" placeholder="Placeholder text"></calcite-input-number>
    <br />
    <calcite-input-number alignment="center" placeholder="Placeholder text"></calcite-input-number>
    <br />
    <calcite-input-number alignment="end" placeholder="Placeholder text"></calcite-input-number>
  </div>
`, p = () => t` <style>
      .overlay {
        position: absolute;
        inset: 0;
        background-color: white;
        opacity: 0.75;
      }
    </style>
    <calcite-input-number icon="check-square-f"></calcite-input-number>
    <div class="overlay"></div>`;
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
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-input-number lang="ar-EG" numbering-system="latn" value="123456"></calcite-input-number>`',
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
      ...s.parameters?.docs?.source
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
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <style>
      :root {
        font-size: 60px;
      }
    </style>
    <calcite-input-number placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input-number>\``,
      ...u.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-number alignment="start" placeholder="Placeholder text"></calcite-input-number>
    <br />
    <calcite-input-number alignment="center" placeholder="Placeholder text"></calcite-input-number>
    <br />
    <calcite-input-number alignment="end" placeholder="Placeholder text"></calcite-input-number>
  </div>
\``,
      ...m.parameters?.docs?.source
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
    <calcite-input-number icon="check-square-f"></calcite-input-number>
    <div class="overlay"></div>\``,
      ...p.parameters?.docs?.source
    }
  }
};
const I = ["simple", "withSlottedAction", "darkModeRTL_TestOnly", "Infinity_TestOnly", "mediumIconForLargeInputStyling_TestOnly", "arabicLocaleWithLatinNumberingSystem_TestOnly", "validationMessageAllScales_TestOnly", "widthSetToBreakpoints_TestOnly", "fontSizeSetAtRoot", "alignmentAllOptions", "overlayDoesNotObscureIcon"];
export {
  l as Infinity_TestOnly,
  I as __namedExportsOrder,
  m as alignmentAllOptions,
  c as arabicLocaleWithLatinNumberingSystem_TestOnly,
  n as darkModeRTL_TestOnly,
  k as default,
  u as fontSizeSetAtRoot,
  r as mediumIconForLargeInputStyling_TestOnly,
  p as overlayDoesNotObscureIcon,
  a as simple,
  s as validationMessageAllScales_TestOnly,
  o as widthSetToBreakpoints_TestOnly,
  i as withSlottedAction
};
