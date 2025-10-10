import { k as n, h as c } from "./index.js";
import { A as d } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  scale: b
} = d, u = {
  title: "Components/Block Group",
  args: {
    disabled: !1,
    dragEnabled: !1,
    group: "",
    label: "My Group",
    loading: !1,
    scale: b.defaultValue
  },
  argTypes: {
    scale: {
      options: b.values,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      delay: 500
    }
  }
}, e = c`<calcite-block
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
  >`, o = (l) => c`
  <calcite-block-group
    ${n("disabled", l.disabled)}
    ${n("drag-enabled", l.dragEnabled)}
    ${n("loading", l.loading)}
    label="${l.label}"
    group="${l.group}"
    scale="${l.scale}"
  >
    ${e}
  </calcite-block-group>
`, a = () => c`
  <calcite-block-group drag-enabled label="My Group"> ${e} </calcite-block-group>
`, r = () => c`
  <calcite-block-group drag-enabled label="My Group">
    <calcite-block sort-handle-open collapsible heading="Invisible ink" description="You can't see me!"
      >My block content!</calcite-block
    >
    ${e}
  </calcite-block-group>
`, t = () => c`
  <calcite-block-group loading label="My Group"> ${e} </calcite-block-group>
`, s = () => c`
  <calcite-block-group disabled label="My Group"> ${e} </calcite-block-group>
`, i = () => c` <style>
      .container {
        display: flex;
        flex-direction: row;
        gap: 20px;
      }
    </style>
    <div class="container">
      <calcite-block-group scale="s"> ${e} </calcite-block-group>
      <calcite-block-group scale="m"> ${e} </calcite-block-group>
      <calcite-block-group scale="l"> ${e} </calcite-block-group>
    </div>`;
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(args: BlockGroupStoryArgs): string => html\`
  <calcite-block-group
    \${boolean("disabled", args.disabled)}
    \${boolean("drag-enabled", args.dragEnabled)}
    \${boolean("loading", args.loading)}
    label="\${args.label}"
    group="\${args.group}"
    scale="\${args.scale}"
  >
    \${blockHTML}
  </calcite-block-group>
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
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-block-group loading label="My Group"> ${blockHTML} </calcite-block-group>\n`',
      ...t.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-block-group disabled label="My Group"> ${blockHTML} </calcite-block-group>\n`',
      ...s.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <style>
      .container {
        display: flex;
        flex-direction: row;
        gap: 20px;
      }
    </style>
    <div class="container">
      <calcite-block-group scale="s"> \${blockHTML} </calcite-block-group>
      <calcite-block-group scale="m"> \${blockHTML} </calcite-block-group>
      <calcite-block-group scale="l"> \${blockHTML} </calcite-block-group>
    </div>\``,
      ...i.parameters?.docs?.source
    }
  }
};
const k = ["simple", "dragEnabled", "sortHandleOpen", "loading", "disabled", "allScales"];
export {
  k as __namedExportsOrder,
  i as allScales,
  u as default,
  s as disabled,
  a as dragEnabled,
  t as loading,
  o as simple,
  r as sortHandleOpen
};
