/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as r, m as p } from "./utils3.js";
import { s as d } from "./index3.js";
import { h as i } from "./formatting.js";
import "./action.js";
import "./action-menu.js";
import "./avatar.js";
import "./chip.js";
import "./dropdown.js";
import "./dropdown-group.js";
import "./dropdown-item.js";
import "./handle.js";
import "./input.js";
import "./panel.js";
import "./stack.js";
const $ = {
  title: "Components/Support/Stack",
  args: {
    disabled: !1
  }
}, o = d({
  width: 44,
  height: 44
}), s = (l) => i`<calcite-stack ${r("disabled", l.disabled)}>
    <calcite-action appearance="transparent" text="banana" icon="banana" slot="actions-start"></calcite-action>
    Hello World
    <calcite-avatar slot="content-end" thumbnail="${o}" scale="s"> </calcite-avatar>
    <calcite-chip slot="content-start" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
    <calcite-action appearance="transparent" text="Close" icon="x" slot="actions-end"></calcite-action>
  </calcite-stack>`, t = (l) => s(l), e = () => i`
  <calcite-stack>
    <calcite-handle slot="actions-start"></calcite-handle>
    <calcite-action appearance="transparent" text="banana" icon="banana" slot="actions-start"></calcite-action>
    Hello World
    <calcite-avatar slot="content-end" thumbnail="${o}" scale="s"> </calcite-avatar>
    <calcite-chip slot="content-start" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
    <calcite-action-menu slot="actions-end" appearance="transparent">
      <calcite-action appearance="transparent" text="Plus" icon="plus" text-enabled></calcite-action>
      <calcite-action appearance="transparent" text="Minus" icon="minus" text-enabled></calcite-action>
      <calcite-action appearance="transparent" text="Table" icon="table" text-enabled></calcite-action>
    </calcite-action-menu>
    <calcite-dropdown slot="actions-end">
      <calcite-action appearance="transparent" icon="plus" slot="trigger"></calcite-action>
      <calcite-dropdown-group selection-mode="single" group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </calcite-stack>
`, a = () => s({
  disabled: !1
});
a.parameters = {
  themes: p
};
const c = () => i`<calcite-stack disabled>
    <calcite-action appearance="transparent" text="banana" icon="banana" slot="actions-start"></calcite-action>
    Hello World
    <calcite-avatar slot="content-end" thumbnail="${o}" scale="s"> </calcite-avatar>
    <calcite-chip slot="content-start" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
    <calcite-action appearance="transparent" text="Close" icon="x" slot="actions-end"></calcite-action>
  </calcite-stack>`, n = () => i`<calcite-panel>
    <div slot="header-content">My Panel</div>
    <p>My content</p>
    <calcite-stack slot="footer">
      <calcite-action text="select" icon="check" slot="actions-start"></calcite-action>
      <calcite-input disabled></calcite-input>
      <calcite-avatar slot="content-start" thumbnail="${o}" scale="s"> </calcite-avatar>
      <calcite-chip slot="content-end" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
      <calcite-action text="delete" icon="trash" slot="actions-end"></calcite-action>
    </calcite-stack>
  </calcite-panel>`;
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: "(args: StackStoryArgs): string => simpleHTML(args)",
      ...t.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-stack>
    <calcite-handle slot="actions-start"></calcite-handle>
    <calcite-action appearance="transparent" text="banana" icon="banana" slot="actions-start"></calcite-action>
    Hello World
    <calcite-avatar slot="content-end" thumbnail="\${thumbnailImage}" scale="s"> </calcite-avatar>
    <calcite-chip slot="content-start" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
    <calcite-action-menu slot="actions-end" appearance="transparent">
      <calcite-action appearance="transparent" text="Plus" icon="plus" text-enabled></calcite-action>
      <calcite-action appearance="transparent" text="Minus" icon="minus" text-enabled></calcite-action>
      <calcite-action appearance="transparent" text="Table" icon="table" text-enabled></calcite-action>
    </calcite-action-menu>
    <calcite-dropdown slot="actions-end">
      <calcite-action appearance="transparent" icon="plus" slot="trigger"></calcite-action>
      <calcite-dropdown-group selection-mode="single" group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </calcite-stack>
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
      originalSource: `(): string => simpleHTML({
  disabled: false
})`,
      ...a.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-stack disabled>
    <calcite-action appearance="transparent" text="banana" icon="banana" slot="actions-start"></calcite-action>
    Hello World
    <calcite-avatar slot="content-end" thumbnail="\${thumbnailImage}" scale="s"> </calcite-avatar>
    <calcite-chip slot="content-start" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
    <calcite-action appearance="transparent" text="Close" icon="x" slot="actions-end"></calcite-action>
  </calcite-stack>\``,
      ...c.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-panel>
    <div slot="header-content">My Panel</div>
    <p>My content</p>
    <calcite-stack slot="footer">
      <calcite-action text="select" icon="check" slot="actions-start"></calcite-action>
      <calcite-input disabled></calcite-input>
      <calcite-avatar slot="content-start" thumbnail="\${thumbnailImage}" scale="s"> </calcite-avatar>
      <calcite-chip slot="content-end" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
      <calcite-action text="delete" icon="trash" slot="actions-end"></calcite-action>
    </calcite-stack>
  </calcite-panel>\``,
      ...n.parameters?.docs?.source
    }
  }
};
const T = ["simple", "stretchSlottedContent", "simpleDarkMode", "disabled", "panelFooter"];
export {
  T as __namedExportsOrder,
  $ as default,
  c as disabled,
  n as panelFooter,
  t as simple,
  a as simpleDarkMode,
  e as stretchSlottedContent
};
