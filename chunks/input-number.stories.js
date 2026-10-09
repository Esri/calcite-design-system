/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as f } from "./helpers.js";
import { b as n, o as l, c as k, m as P } from "./utils3.js";
import { h as t } from "./formatting.js";
import { A } from "./resources34.js";
import "./button.js";
import "./input-number.js";
import "./label2.js";
var y = Object.freeze, q = Object.defineProperty, z = (e, I) => y(q(e, "raw", { value: y(e.slice()) })), $;
const {
  scale: S,
  status: w,
  alignment: E,
  layout: T
} = A, C = {
  title: "Components/Controls/Input Number",
  args: {
    scale: S.defaultValue,
    status: w.defaultValue,
    alignment: E.defaultValue,
    numberButtonType: T.defaultValue,
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
    inlineEdit: !1
  },
  argTypes: {
    scale: {
      options: S.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: w.values,
      control: {
        type: "select"
      }
    },
    alignment: {
      options: E.values,
      control: {
        type: "select"
      }
    },
    numberButtonType: {
      options: T.values.filter((e) => e !== "grid" && e !== "inline" && e !== "center" && e !== "auto" && e !== "fixed" && e !== "horizontal-single"),
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: f,
      control: {
        type: "select"
      }
    },
    icon: {
      options: ["", ...f],
      control: {
        type: "select"
      }
    },
    inlineEdit: {
      options: [!1, !0, "controls-disabled"],
      control: {
        type: "select"
      }
    }
  }
}, r = (e) => t`
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
      ${l("icon", e.icon)}
      ${n("icon-flip-rtl", e.iconFlipRtl)}
      ${n("integer", e.integer)}
      ${l("label-text", e.labelText)}
      ${n("read-only", e.readOnly)}
      ${n("required", e.required)}
      value="${e.value}"
      placeholder="${e.placeholder}"
      validation-message="${e.validationMessage}"
      ${n("inline-edit", e.inlineEdit === !0)}
      ${l("inline-edit", e.inlineEdit === "controls-disabled" ? e.inlineEdit : "")}
      ${l("validation-icon", e.validationIcon)}
    >
    </calcite-input-number>
  </div>
`, c = () => t`
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
`, i = () => t`
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
i.parameters = {
  themes: P
};
const o = () => t`<calcite-input-number value="Infinity"></calcite-input-number>`, s = () => t`
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
`, u = () => t`<calcite-input-number lang="ar-EG" numbering-system="latn" value="123456"></calcite-input-number>`, m = () => t`
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
`, p = () => k(t`
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
  `), d = () => t` <style>
      :root {
        font-size: 60px;
      }
    </style>
    <calcite-input-number placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input-number>`, b = () => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-number alignment="start" placeholder="Placeholder text"></calcite-input-number>
    <br />
    <calcite-input-number alignment="center" placeholder="Placeholder text"></calcite-input-number>
    <br />
    <calcite-input-number alignment="end" placeholder="Placeholder text"></calcite-input-number>
  </div>
`, g = () => t` <style>
      .overlay {
        position: absolute;
        inset: 0;
        background-color: white;
        opacity: 0.75;
      }
    </style>
    <calcite-input-number icon="check-square-f"></calcite-input-number>
    <div class="overlay"></div>`, h = () => t` <calcite-input-number clearable value="123"> </calcite-input-number> `, v = () => t` <calcite-input-number inline-edit value="42"></calcite-input-number> `, a = () => t($ || ($ = z([`
  <calcite-input-number id="inline-edit-confirm-loading" inline-edit inline-editing value="42"></calcite-input-number>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-input-number");
      const input = await document.querySelector("#inline-edit-confirm-loading").componentOnReady();
      input.inlineEditingBeforeConfirm = () => new Promise(() => {});
      input.shadowRoot.querySelector(".confirm-changes").click();
    })();
  <\/script>
`])));
a.parameters = {
  chromatic: {
    delay: 500
  }
};
const x = () => t`
  <calcite-input-number inline-edit="controls-disabled" value="42"></calcite-input-number>
`;
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
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
      \${boolean("inline-edit", args.inlineEdit === true)}
      \${optionalAttribute("inline-edit", args.inlineEdit === "controls-disabled" ? args.inlineEdit : "")}
      \${optionalAttribute("validation-icon", args.validationIcon)}
    >
    </calcite-input-number>
  </div>
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
      ...c.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
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
      ...i.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-input-number value="Infinity"></calcite-input-number>`',
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
      ...s.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-input-number lang="ar-EG" numbering-system="latn" value="123456"></calcite-input-number>`',
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
      ...m.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
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
      ...p.parameters?.docs?.source
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
    <calcite-input-number placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input-number>\``,
      ...d.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
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
      ...b.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
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
      ...g.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: '(): string => html` <calcite-input-number clearable value="123"> </calcite-input-number> `',
      ...h.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: '(): string => html` <calcite-input-number inline-edit value="42"></calcite-input-number> `',
      ...v.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-input-number id="inline-edit-confirm-loading" inline-edit inline-editing value="42"></calcite-input-number>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-input-number");
      const input = await document.querySelector("#inline-edit-confirm-loading").componentOnReady();
      input.inlineEditingBeforeConfirm = () => new Promise(() => {});
      input.shadowRoot.querySelector(".confirm-changes").click();
    })();
  <\/script>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-number inline-edit="controls-disabled" value="42"></calcite-input-number>\n`',
      ...x.parameters?.docs?.source
    }
  }
};
const D = ["simple", "withSlottedAction", "darkModeRTL", "infinityAsValue", "mediumIconForLargeInputStyling", "arabicLocaleWithLatinNumberingSystem", "validationMessageAllScales", "widthSetToBreakpoints", "fontSizeSetAtRoot", "alignmentAllOptions", "overlayDoesNotObscureIcon", "clearable", "inlineEdit", "inlineEditConfirmLoading", "inlineEditControlsDisabled"];
export {
  D as __namedExportsOrder,
  b as alignmentAllOptions,
  u as arabicLocaleWithLatinNumberingSystem,
  h as clearable,
  i as darkModeRTL,
  C as default,
  d as fontSizeSetAtRoot,
  o as infinityAsValue,
  v as inlineEdit,
  a as inlineEditConfirmLoading,
  x as inlineEditControlsDisabled,
  s as mediumIconForLargeInputStyling,
  g as overlayDoesNotObscureIcon,
  r as simple,
  m as validationMessageAllScales,
  p as widthSetToBreakpoints,
  c as withSlottedAction
};
