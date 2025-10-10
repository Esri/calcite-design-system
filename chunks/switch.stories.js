import { h as s, k as r, j as p } from "./index.js";
import { A as w } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
var n = Object.freeze, u = Object.defineProperty, m = (e, b) => n(u(e, "raw", { value: n(e.slice()) })), o, d;
const {
  scale: h
} = w, _ = {
  title: "Components/Controls/Switch",
  args: {
    checked: !0,
    disabled: !1,
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
    ${r("checked", e.checked)}
    ${r("disabled", e.disabled)}
    scale="${e.scale}"
  ></calcite-switch>
`, c = () => s`
  <calcite-switch class="calcite-mode-dark" name="setting" value="enabled" checked scale="m"></calcite-switch>
`;
c.parameters = {
  themes: p
};
const l = () => s`<calcite-switch disabled checked></calcite-switch>`, t = () => s(o || (o = m([`
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
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: "(): string => html`<calcite-switch disabled checked></calcite-switch>`",
      ...l.parameters?.docs?.source
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
const v = ["simple", "darkModeRTL_TestOnly", "disabled_TestOnly", "Focus_TestOnly", "FocusLabel_TestOnly"];
export {
  a as FocusLabel_TestOnly,
  t as Focus_TestOnly,
  v as __namedExportsOrder,
  c as darkModeRTL_TestOnly,
  _ as default,
  l as disabled_TestOnly,
  i as simple
};
