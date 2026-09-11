/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { h as t } from "./formatting.js";
import "./action-menu.js";
import "./action.js";
import "./action-group.js";
var s = Object.freeze, u = Object.defineProperty, x = (l, d) => s(u(l, "raw", { value: s(l.slice()) })), r;
const M = {
  title: "Components/Action Menu"
}, e = () => t`
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
`, c = () => t(r || (r = x([`
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
`]))), o = () => t`
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
c.parameters = {
  chromatic: {
    delay: 1e3
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
\``,
      ...e.parameters?.docs?.source
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
      ...o.parameters?.docs?.source
    }
  }
};
const P = ["simple", "simpleTransparent", "open", "openWithGroups", "keyDownOpen", "openMaxHeight"];
export {
  P as __namedExportsOrder,
  M as default,
  c as keyDownOpen,
  n as open,
  o as openMaxHeight,
  i as openWithGroups,
  e as simple,
  a as simpleTransparent
};
