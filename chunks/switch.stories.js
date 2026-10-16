/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as l, m as p } from "./utils3.js";
import { h as s } from "./formatting.js";
import { A as u } from "./resources34.js";
import "./label2.js";
import "./switch.js";
var n = Object.freeze, w = Object.defineProperty, m = (e, b) => n(w(e, "raw", { value: n(e.slice()) })), o, d;
const {
  scale: h
} = u, x = {
  title: "Components/Controls/Switch",
  args: {
    checked: !0,
    disabled: !1,
    required: !1,
    scale: h.defaultValue
  },
  argTypes: {
    scale: {
      options: h.values,
      control: {
        type: "select"
      }
    }
  }
}, i = (e) => s`
  <calcite-switch
    name="setting"
    value="enabled"
    ${l("checked", e.checked)}
    ${l("disabled", e.disabled)}
    ${l("required", e.required)}
    scale="${e.scale}"
  ></calcite-switch>
`, c = () => s`
  <calcite-switch class="calcite-mode-dark" name="setting" value="enabled" checked scale="m"></calcite-switch>
`;
c.parameters = {
  themes: p
};
const r = () => s`<calcite-switch disabled checked></calcite-switch>`, t = () => s(o || (o = m([`
  <div style="width:300px;height:300px; padding: 20px">
    <calcite-switch></calcite-switch>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-switch");
      await document.querySelector("calcite-switch").setFocus();
    })();
  <\/script>
`])));
t.parameters = {
  chromatic: {
    delay: 1e3
  }
};
const a = () => s(d || (d = m([`
  <div style="width:300px;height:300px; padding: 20px">
    <calcite-label>Switch label<calcite-switch></calcite-switch></calcite-label>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-switch");
      await document.querySelector("calcite-switch").setFocus();
    })();
  <\/script>
`])));
a.parameters = {
  chromatic: {
    delay: 1e3
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: SwitchStoryArgs): string => html\`
  <calcite-switch
    name="setting"
    value="enabled"
    \${boolean("checked", args.checked)}
    \${boolean("disabled", args.disabled)}
    \${boolean("required", args.required)}
    scale="\${args.scale}"
  ></calcite-switch>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-switch class="calcite-mode-dark" name="setting" value="enabled" checked scale="m"></calcite-switch>\n`',
      ...c.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: "(): string => html`<calcite-switch disabled checked></calcite-switch>`",
      ...r.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:300px;height:300px; padding: 20px">
    <calcite-switch></calcite-switch>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-switch");
      await document.querySelector("calcite-switch").setFocus();
    })();
  <\/script>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:300px;height:300px; padding: 20px">
    <calcite-label>Switch label<calcite-switch></calcite-switch></calcite-label>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-switch");
      await document.querySelector("calcite-switch").setFocus();
    })();
  <\/script>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
const k = ["simple", "darkModeRTL", "disabled", "Focus", "FocusLabel"];
export {
  t as Focus,
  a as FocusLabel,
  k as __namedExportsOrder,
  c as darkModeRTL,
  x as default,
  r as disabled,
  i as simple
};
