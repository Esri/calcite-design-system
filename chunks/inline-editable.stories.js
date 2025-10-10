import { k as a, h as c, j as o } from "./index.js";
import { A as r } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  scale: s,
  alignment: d
} = r, m = {
  title: "Components/Controls/Inline Editable",
  args: {
    scale: s.defaultValue,
    controls: !1,
    editingEnabled: !1,
    loading: !1,
    disabled: !1,
    alignment: d.defaultValue,
    placeholder: "Placeholder text"
  },
  argTypes: {
    scale: {
      options: s.values,
      control: {
        type: "select"
      }
    },
    alignment: {
      options: d.values.filter((e) => e !== "center"),
      control: {
        type: "select"
      }
    }
  }
}, i = (e) => c`
  <div style="width:300px;max-width:100%;">
    <calcite-inline-editable
      scale="${e.scale}"
      ${a("controls", e.controls)}
      ${a("editing-enabled", e.editingEnabled)}
      ${a("loading", e.loading)}
      ${a("disabled", e.disabled)}
    >
      <calcite-input alignment="${e.alignment}" placeholder="${e.placeholder}"> </calcite-input>
    </calcite-inline-editable>
  </div>
`, t = () => c`
  <calcite-inline-editable disabled>
    <calcite-input value="disabled"></calcite-input>
  </calcite-inline-editable>
  <br />
  <calcite-inline-editable controls disabled editing-enabled loading>
    <calcite-input value="disabled and loading"></calcite-input>
  </calcite-inline-editable>
`, l = () => c`
  <div dir="rtl" style="width:300px;max-width:100%;">
    <calcite-label class="calcite-mode-dark" status="idle" scale="m" layout="default">
      My great label
      <calcite-inline-editable>
        <calcite-input alignment="start" placeholder="Placeholder text"> </calcite-input>
      </calcite-inline-editable>
      <calcite-input-message status="idle"> My great input message </calcite-input-message>
    </calcite-label>
  </div>
`;
l.parameters = {
  themes: o
};
const n = () => c`<div style="width: 300px;">
    <calcite-inline-editable>
      <calcite-input
        value="A flower, sometimes known as a bloom or blossom, is the reproductive structure found in flowering plants (plants of the division Angiospermae)."
        placeholder="My placeholder"
      ></calcite-input>
    </calcite-inline-editable>
  </div>`;
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: InlineEditableStoryArgs): string => html\`
  <div style="width:300px;max-width:100%;">
    <calcite-inline-editable
      scale="\${args.scale}"
      \${boolean("controls", args.controls)}
      \${boolean("editing-enabled", args.editingEnabled)}
      \${boolean("loading", args.loading)}
      \${boolean("disabled", args.disabled)}
    >
      <calcite-input alignment="\${args.alignment}" placeholder="\${args.placeholder}"> </calcite-input>
    </calcite-inline-editable>
  </div>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-inline-editable disabled>
    <calcite-input value="disabled"></calcite-input>
  </calcite-inline-editable>
  <br />
  <calcite-inline-editable controls disabled editing-enabled loading>
    <calcite-input value="disabled and loading"></calcite-input>
  </calcite-inline-editable>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div dir="rtl" style="width:300px;max-width:100%;">
    <calcite-label class="calcite-mode-dark" status="idle" scale="m" layout="default">
      My great label
      <calcite-inline-editable>
        <calcite-input alignment="start" placeholder="Placeholder text"> </calcite-input>
      </calcite-inline-editable>
      <calcite-input-message status="idle"> My great input message </calcite-input-message>
    </calcite-label>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width: 300px;">
    <calcite-inline-editable>
      <calcite-input
        value="A flower, sometimes known as a bloom or blossom, is the reproductive structure found in flowering plants (plants of the division Angiospermae)."
        placeholder="My placeholder"
      ></calcite-input>
    </calcite-inline-editable>
  </div>\``,
      ...n.parameters?.docs?.source
    }
  }
};
const b = ["simple", "disabled_TestOnly", "darkModeRTL_TestOnly", "longValue_TestOnly"];
export {
  b as __namedExportsOrder,
  l as darkModeRTL_TestOnly,
  m as default,
  t as disabled_TestOnly,
  n as longValue_TestOnly,
  i as simple
};
