import { b as i } from "./utils.js";
import { h as e } from "./formatting.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
const d = {
  title: "Components/Block Group",
  args: {
    disabled: !1,
    dragEnabled: !1,
    group: "",
    label: "My Group",
    loading: !1
  },
  parameters: {
    chromatic: {
      delay: 500
    }
  }
}, c = e`<calcite-block
    collapsible
    heading="A rubber chicken"
    description="Why did the chicken cross the road? To avoid being squeezed!"
    >My block content!</calcite-block
  >
  <calcite-block collapsible heading="Invisible ink" description="You can't see me!">My block content!</calcite-block>
  <calcite-block collapsible heading="Whoopee cushion" description="The sound of laughter!"
    >My block content!</calcite-block
  >
  <calcite-block collapsible heading="Fake mustache" description="Incognito mode activated!"
    >My block content!</calcite-block
  >
  <calcite-block collapsible heading="Giant foam finger" description="We're number one!"
    >My block content!</calcite-block
  >
  <calcite-block drag-disabled collapsible heading="Clown nose" description="Honk if you love clowns!"
    >My block content!</calcite-block
  >
  <calcite-block
    collapsible
    heading="Joke book"
    description="Why don't scientists trust atoms? Because they make up everything!"
    >My block content!</calcite-block
  >`, l = (o) => e`
  <calcite-block-group
    ${i("disabled", o.disabled)}
    ${i("drag-enabled", o.dragEnabled)}
    ${i("loading", o.loading)}
    label="${o.label}"
    group="${o.group}"
  >
    ${c}
  </calcite-block-group>
`, a = () => e`
  <calcite-block-group drag-enabled label="My Group"> ${c} </calcite-block-group>
`, r = () => e`
  <calcite-block-group drag-enabled label="My Group">
    <calcite-block sort-handle-open collapsible heading="Invisible ink" description="You can't see me!"
      >My block content!</calcite-block
    >
    ${c}
  </calcite-block-group>
`, n = () => e`
  <calcite-block-group loading label="My Group"> ${c} </calcite-block-group>
`, t = () => e`
  <calcite-block-group disabled label="My Group"> ${c} </calcite-block-group>
`;
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(args: BlockGroupStoryArgs): string => html\`
  <calcite-block-group
    \${boolean("disabled", args.disabled)}
    \${boolean("drag-enabled", args.dragEnabled)}
    \${boolean("loading", args.loading)}
    label="\${args.label}"
    group="\${args.group}"
  >
    \${blockHTML}
  </calcite-block-group>
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
      originalSource: '(): string => html`\n  <calcite-block-group drag-enabled label="My Group"> ${blockHTML} </calcite-block-group>\n`',
      ...a.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block-group drag-enabled label="My Group">
    <calcite-block sort-handle-open collapsible heading="Invisible ink" description="You can't see me!"
      >My block content!</calcite-block
    >
    \${blockHTML}
  </calcite-block-group>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-block-group loading label="My Group"> ${blockHTML} </calcite-block-group>\n`',
      ...n.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-block-group disabled label="My Group"> ${blockHTML} </calcite-block-group>\n`',
      ...t.parameters?.docs?.source
    }
  }
};
const p = ["simple", "dragEnabled", "sortHandleOpen", "loading", "disabled"];
export {
  p as __namedExportsOrder,
  d as default,
  t as disabled,
  a as dragEnabled,
  n as loading,
  l as simple,
  r as sortHandleOpen
};
