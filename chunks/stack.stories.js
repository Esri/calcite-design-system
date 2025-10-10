import { h as i, j as s } from "./index.js";
import { p as r } from "./placeholder-image.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const m = {
  title: "Components/Support/Stack"
}, l = r({
  width: 44,
  height: 44
}), o = i`<calcite-stack>
  <calcite-action appearance="transparent" text="banana" icon="banana" slot="actions-start"></calcite-action>
  Hello World
  <calcite-avatar slot="content-end" thumbnail="${l}" scale="s"> </calcite-avatar>
  <calcite-chip slot="content-start" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
  <calcite-action appearance="transparent" text="Close" icon="x" slot="actions-end"></calcite-action>
</calcite-stack>`, a = () => o, e = () => i`
  <calcite-stack>
    <calcite-handle slot="actions-start"></calcite-handle>
    <calcite-action appearance="transparent" text="banana" icon="banana" slot="actions-start"></calcite-action>
    Hello World
    <calcite-avatar slot="content-end" thumbnail="${l}" scale="s"> </calcite-avatar>
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
`, t = () => o;
t.parameters = {
  themes: s
};
const c = () => i`<calcite-stack disabled>
    <calcite-action appearance="transparent" text="banana" icon="banana" slot="actions-start"></calcite-action>
    Hello World
    <calcite-avatar slot="content-end" thumbnail="${l}" scale="s"> </calcite-avatar>
    <calcite-chip slot="content-start" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
    <calcite-action appearance="transparent" text="Close" icon="x" slot="actions-end"></calcite-action>
  </calcite-stack>`, n = () => i`<calcite-panel>
    <div slot="header-content">My Panel</div>
    <p>My content</p>
    <calcite-stack slot="footer">
      <calcite-action text="select" icon="check" slot="actions-start"></calcite-action>
      <calcite-input disabled></calcite-input>
      <calcite-avatar slot="content-start" thumbnail="${l}" scale="s"> </calcite-avatar>
      <calcite-chip slot="content-end" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
      <calcite-action text="delete" icon="trash" slot="actions-end"></calcite-action>
    </calcite-stack>
  </calcite-panel>`;
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: "(): string => simpleHTML",
      ...a.parameters?.docs?.source
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
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: "(): string => simpleHTML",
      ...t.parameters?.docs?.source
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
const u = ["simple", "stretchSlottedContent", "simpleDarkMode_TestOnly", "disabled_TestOnly", "panelFooter_TestOnly"];
export {
  u as __namedExportsOrder,
  m as default,
  c as disabled_TestOnly,
  n as panelFooter_TestOnly,
  a as simple,
  t as simpleDarkMode_TestOnly,
  e as stretchSlottedContent
};
