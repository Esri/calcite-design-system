/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as v } from "./helpers.js";
import { b as n, o as h, c as S, m as w } from "./utils3.js";
import { h as t } from "./formatting.js";
import { A as T } from "./resources34.js";
import "./button.js";
import "./input-number.js";
import "./label2.js";
const {
  scale: x,
  status: y,
  alignment: f,
  layout: $
} = T, G = {
  title: "Components/Controls/Input Number",
  args: {
    scale: x.defaultValue,
    status: y.defaultValue,
    alignment: f.defaultValue,
    numberButtonType: $.defaultValue,
    min: 0,
    max: 100,
    step: 1,
    prefixText: "",
    suffixText: "",
    loading: !1,
    clearable: !1,
    disabled: !1,
    groupSeparator: !1,
    icon: "",
    iconFlipRtl: !1,
    integer: !1,
    labelText: "Label text",
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
      options: x.values,
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
    alignment: {
      options: f.values,
      control: {
        type: "select"
      }
    },
    numberButtonType: {
      options: $.values.filter((e) => e !== "grid" && e !== "inline" && e !== "center" && e !== "auto" && e !== "fixed" && e !== "horizontal-single"),
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: v,
      control: {
        type: "select"
      }
    },
    icon: {
      options: ["", ...v],
      control: {
        type: "select"
      }
    }
  }
}, i = (e) => t`
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
      ${n("loading", e.loading)}
      ${n("clearable", e.clearable)}
      ${n("disabled", e.disabled)}
      ${n("group-separator", e.groupSeparator)}
      ${h("icon", e.icon)}
      ${n("icon-flip-rtl", e.iconFlipRtl)}
      ${n("integer", e.integer)}
      ${h("label-text", e.labelText)}
      ${n("read-only", e.readOnly)}
      ${n("required", e.required)}
      value="${e.value}"
      placeholder="${e.placeholder}"
      validation-message="${e.validationMessage}"
      ${n("inline-editable", e.inlineEditable)}
      ${n("inline-editable-controls", e.inlineEditableControls)}
      ${h("validation-icon", e.validationIcon)}
    >
    </calcite-input-number>
  </div>
`, l = () => t`
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
`, a = () => t`
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
a.parameters = {
  themes: w
};
const r = () => t`<calcite-input-number value="Infinity"></calcite-input-number>`, c = () => t`
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
`, o = () => t`<calcite-input-number lang="ar-EG" numbering-system="latn" value="123456"></calcite-input-number>`, s = () => t`
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
`, u = () => S(t`
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
  `), p = () => t` <style>
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
`, d = () => t` <style>
      .overlay {
        position: absolute;
        inset: 0;
        background-color: white;
        opacity: 0.75;
      }
    </style>
    <calcite-input-number icon="check-square-f"></calcite-input-number>
    <div class="overlay"></div>`, b = () => t` <calcite-input-number clearable value="123"> </calcite-input-number> `, g = () => t`
  <div>
    <calcite-input-number inline-editable inline-editable-controls value="42"></calcite-input-number>
  </div>
`;
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
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
      \${boolean("group-separator", args.groupSeparator)}
      \${optionalAttribute("icon", args.icon)}
      \${boolean("icon-flip-rtl", args.iconFlipRtl)}
      \${boolean("integer", args.integer)}
      \${optionalAttribute("label-text", args.labelText)}
      \${boolean("read-only", args.readOnly)}
      \${boolean("required", args.required)}
      value="\${args.value}"
      placeholder="\${args.placeholder}"
      validation-message="\${args.validationMessage}"
      \${boolean("inline-editable", args.inlineEditable)}
      \${boolean("inline-editable-controls", args.inlineEditableControls)}
      \${optionalAttribute("validation-icon", args.validationIcon)}
    >
    </calcite-input-number>
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
      ...a.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-input-number value="Infinity"></calcite-input-number>`',
      ...r.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
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
      ...c.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-input-number lang="ar-EG" numbering-system="latn" value="123456"></calcite-input-number>`',
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
    <calcite-input-number
      scale="{scale}"
      placeholder="Placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input-number>
    <calcite-input-number
      scale="{scale}"
      value="123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
    ></calcite-input-number>
  \`)`,
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
      :root {
        font-size: 60px;
      }
    </style>
    <calcite-input-number placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input-number>\``,
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
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
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
      ...d.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: '(): string => html` <calcite-input-number clearable value="123"> </calcite-input-number> `',
      ...b.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div>
    <calcite-input-number inline-editable inline-editable-controls value="42"></calcite-input-number>
  </div>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
const L = ["simple", "withSlottedAction", "darkModeRTL", "infinityAsValue", "mediumIconForLargeInputStyling", "arabicLocaleWithLatinNumberingSystem", "validationMessageAllScales", "widthSetToBreakpoints", "fontSizeSetAtRoot", "alignmentAllOptions", "overlayDoesNotObscureIcon", "clearable", "inlineEditable"];
export {
  L as __namedExportsOrder,
  m as alignmentAllOptions,
  o as arabicLocaleWithLatinNumberingSystem,
  b as clearable,
  a as darkModeRTL,
  G as default,
  p as fontSizeSetAtRoot,
  r as infinityAsValue,
  g as inlineEditable,
  c as mediumIconForLargeInputStyling,
  d as overlayDoesNotObscureIcon,
  i as simple,
  s as validationMessageAllScales,
  u as widthSetToBreakpoints,
  l as withSlottedAction
};
