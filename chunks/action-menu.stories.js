import { h as t } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
var s = Object.freeze, u = Object.defineProperty, x = (o, d) => s(u(o, "raw", { value: s(o.slice()) })), r;
const p = {
  title: "Components/Action Menu"
}, c = () => t`
  <calcite-action-menu>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
`, a = () => t`<div style="background-color:red">
    <calcite-action-menu appearance="transparent">
      <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
      <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
      <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    </calcite-action-menu>
  </div> `, n = () => t`
  <calcite-action-menu open>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
`, i = () => t`
  <calcite-action-menu open>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action-group>
      <calcite-action text="Plus" icon="plus" text-enabled></calcite-action
      ><calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Table" icon="table" text-enabled></calcite-action
    ></calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Save" icon="save" text-enabled></calcite-action>
    </calcite-action-group>
  </calcite-action-menu>
`, e = () => t(r || (r = x([`
  <calcite-action-menu>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
  <script>
    document
      .querySelector("calcite-action-menu")
      .setFocus()
      .then(() => {
        document.querySelector("calcite-action[slot=trigger]").dispatchEvent(
          new KeyboardEvent("keydown", {
            code: "Enter",
            key: "Enter",
            charCode: 13,
            keyCode: 13,
            view: window,
            bubbles: true,
          }),
        );
      });
  <\/script>
`]))), l = () => t`
  <calcite-action-menu open>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
`;
e.parameters = {
  chromatic: {
    delay: 1e3
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-action-menu>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="background-color:red">
    <calcite-action-menu appearance="transparent">
      <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
      <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
      <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    </calcite-action-menu>
  </div> \``,
      ...a.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-action-menu open>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
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
  <calcite-action-menu open>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action-group>
      <calcite-action text="Plus" icon="plus" text-enabled></calcite-action
      ><calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Table" icon="table" text-enabled></calcite-action
    ></calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Save" icon="save" text-enabled></calcite-action>
    </calcite-action-group>
  </calcite-action-menu>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-action-menu>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
  <script>
    document
      .querySelector("calcite-action-menu")
      .setFocus()
      .then(() => {
        document.querySelector("calcite-action[slot=trigger]").dispatchEvent(
          new KeyboardEvent("keydown", {
            code: "Enter",
            key: "Enter",
            charCode: 13,
            keyCode: 13,
            view: window,
            bubbles: true,
          }),
        );
      });
  <\/script>
\``,
      ...e.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-action-menu open>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
const m = ["simple", "simpleTransparent_TestOnly", "open", "openWithGroups", "keyDownOpen_TestOnly", "openMaxHeight_TestOnly"];
export {
  m as __namedExportsOrder,
  p as default,
  e as keyDownOpen_TestOnly,
  n as open,
  l as openMaxHeight_TestOnly,
  i as openWithGroups,
  c as simple,
  a as simpleTransparent_TestOnly
};
