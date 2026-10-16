/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as g } from "./helpers.js";
import { b as i, o as n, c as S, m as $ } from "./utils3.js";
import { h as t } from "./formatting.js";
import { A as E } from "./resources34.js";
import "./button.js";
import "./input-text.js";
import "./label2.js";
var v = Object.freeze, P = Object.defineProperty, T = (e, q) => v(P(e, "raw", { value: v(e.slice()) })), b;
const {
  scale: f,
  status: y,
  alignment: w
} = E, C = {
  title: "Components/Controls/Input Text",
  args: {
    scale: f.defaultValue,
    status: y.defaultValue,
    alignment: w.defaultValue,
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
    inlineEdit: !1
  },
  argTypes: {
    scale: {
      options: f.values,
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
      options: w.values,
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
      options: g,
      control: {
        type: "select"
      }
    },
    icon: {
      options: ["", ...g],
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
}, c = (e) => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text
      scale="${e.scale}"
      status="${e.status}"
      alignment="${e.alignment}"
      prefix-text="${e.prefixText}"
      suffix-text="${e.suffixText}"
      ${i("loading", e.loading)}
      ${i("clearable", e.clearable)}
      ${i("disabled", e.disabled)}
      ${n("icon", e.icon)}
      ${i("icon-flip-rtl", e.iconFlipRtl)}
      ${n("label-text", e.labelText)}
      ${n("max-length", e.maxLength)}
      ${n("min-length", e.minLength)}
      ${i("read-only", e.readOnly)}
      ${i("required", e.required)}
      value="${e.value}"
      placeholder="${e.placeholder}"
      validation-message="${e.validationMessage}"
      ${i("inline-edit", e.inlineEdit === !0)}
      ${n("inline-edit", e.inlineEdit === "controls-disabled" ? e.inlineEdit : "")}
      ${n("validation-icon", e.validationIcon)}
    >
    </calcite-input-text>
  </div>
`, o = () => t`
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
  themes: $
};
const s = () => t`
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
`, r = () => S(t`
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
  `), d = () => t`
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
`, u = () => t` <style>
      :root {
        font-size: 60px;
      }
    </style>
    <calcite-input-text placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input-text>`, p = () => t`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text alignment="start" placeholder="Placeholder text"></calcite-input-text>
    <br />
    <calcite-input-text alignment="center" placeholder="Placeholder text"></calcite-input-text>
    <br />
    <calcite-input-text alignment="end" placeholder="Placeholder text"></calcite-input-text>
  </div>
`, m = () => t` <style>
      .overlay {
        position: absolute;
        inset: 0;
        background-color: white;
        opacity: 0.75;
      }
    </style>
    <calcite-input-text icon="check-square-f"></calcite-input-text>
    <div class="overlay"></div>`, x = () => t`<calcite-input-text inline-edit value="Editable text"></calcite-input-text> `, l = () => t(b || (b = T([`
  <calcite-input-text
    id="inline-edit-confirm-loading"
    inline-edit
    inline-editing
    value="Editable text"
  ></calcite-input-text>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-input-text");
      const input = await document.querySelector("#inline-edit-confirm-loading").componentOnReady();
      input.inlineEditingBeforeConfirm = () => new Promise(() => {});
      input.shadowRoot.querySelector(".confirm-changes").click();
    })();
  <\/script>
`])));
l.parameters = {
  chromatic: {
    delay: 500
  }
};
const h = () => t`<calcite-input-text inline-edit="controls-disabled" value="Editable text"></calcite-input-text> `;
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
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
      \${boolean("inline-edit", args.inlineEdit === true)}
      \${optionalAttribute("inline-edit", args.inlineEdit === "controls-disabled" ? args.inlineEdit : "")}
      \${optionalAttribute("validation-icon", args.validationIcon)}
    >
    </calcite-input-text>
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
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
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
      ...s.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
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
      ...r.parameters?.docs?.source
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
      ...d.parameters?.docs?.source
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
    <calcite-input-text placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input-text>\``,
      ...u.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
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
      ...p.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
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
      ...m.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-input-text inline-edit value="Editable text"></calcite-input-text> `',
      ...x.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-input-text
    id="inline-edit-confirm-loading"
    inline-edit
    inline-editing
    value="Editable text"
  ></calcite-input-text>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-input-text");
      const input = await document.querySelector("#inline-edit-confirm-loading").componentOnReady();
      input.inlineEditingBeforeConfirm = () => new Promise(() => {});
      input.shadowRoot.querySelector(".confirm-changes").click();
    })();
  <\/script>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-input-text inline-edit="controls-disabled" value="Editable text"></calcite-input-text> `',
      ...h.parameters?.docs?.source
    }
  }
};
const D = ["simple", "withSlottedAction", "darkModeRTL", "mediumIconForLargeScaleStyling", "widthSetToBreakpoints", "validationMessageAllScales", "fontSizeSetAtRoot", "alignmentAllOptions", "overlayDoesNotObscureIcon", "inlineEdit", "inlineEditConfirmLoading", "inlineEditControlsDisabled"];
export {
  D as __namedExportsOrder,
  p as alignmentAllOptions,
  a as darkModeRTL,
  C as default,
  u as fontSizeSetAtRoot,
  x as inlineEdit,
  l as inlineEditConfirmLoading,
  h as inlineEditControlsDisabled,
  s as mediumIconForLargeScaleStyling,
  m as overlayDoesNotObscureIcon,
  c as simple,
  d as validationMessageAllScales,
  r as widthSetToBreakpoints,
  o as withSlottedAction
};
