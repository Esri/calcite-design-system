/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b } from "./utils3.js";
import { h as a } from "./formatting.js";
import { A as m } from "./resources34.js";
import "./block-group.js";
import "./block.js";
const {
  scale: g
} = m, h = ["single", "multiple", "single-persist"], G = {
  title: "Components/Block Group",
  args: {
    disabled: !1,
    dragEnabled: !1,
    group: "",
    label: "My Group",
    loading: !1,
    scale: g.defaultValue
  },
  argTypes: {
    scale: {
      options: g.values,
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
}, c = a`<calcite-block
    expandable
    heading="A rubber chicken"
    description="Why did the chicken cross the road? To avoid being squeezed!"
    >My block content!</calcite-block
  >
  <calcite-block expandable heading="Invisible ink" description="You can't see me!">My block content!</calcite-block>
  <calcite-block expandable heading="Whoopee cushion" description="The sound of laughter!"
    >My block content!</calcite-block
  >
  <calcite-block expandable heading="Fake mustache" description="Incognito mode activated!"
    >My block content!</calcite-block
  >
  <calcite-block expandable heading="Giant foam finger" description="We're number one!"
    >My block content!</calcite-block
  >
  <calcite-block drag-disabled expandable heading="Clown nose" description="Honk if you love clowns!"
    >My block content!</calcite-block
  >
  <calcite-block
    expandable
    heading="Joke book"
    description="Why don't scientists trust atoms? Because they make up everything!"
    >My block content!</calcite-block
  >`, r = (e) => a`
  <calcite-block-group
    ${b("disabled", e.disabled)}
    ${b("drag-enabled", e.dragEnabled)}
    ${b("loading", e.loading)}
    label="${e.label}"
    group="${e.group}"
    scale="${e.scale}"
  >
    ${c}
  </calcite-block-group>
`, n = () => a`
  <calcite-block-group drag-enabled label="My Group"> ${c} </calcite-block-group>
`, i = () => a`
  <calcite-block-group drag-enabled label="My Group">
    <calcite-block sort-handle-open expandable heading="Invisible ink" description="You can't see me!"
      >My block content!</calcite-block
    >
    ${c}
  </calcite-block-group>
`, t = () => a`
  <calcite-block-group loading label="My Group"> ${c} </calcite-block-group>
`, s = () => a`
  <calcite-block-group disabled label="My Group"> ${c} </calcite-block-group>
`, d = () => a` <style>
      .container {
        display: flex;
        flex-direction: row;
        gap: 20px;
      }
    </style>
    <div class="container">
      <calcite-block-group scale="s"> ${c} </calcite-block-group>
      <calcite-block-group scale="m"> ${c} </calcite-block-group>
      <calcite-block-group scale="l"> ${c} </calcite-block-group>
    </div>`, x = (e) => a`
  <calcite-block-group label="Rivers">
    <calcite-block
      expandable
      heading="Rivers"
      description="Primary waterways and regional flow lines"
      expanded
    ></calcite-block>
    <calcite-block
      expandable
      heading="Gauging Stations"
      description="Monitoring sites reporting water level metrics"
    ></calcite-block>
  </calcite-block-group>
  <calcite-block-group expand-mode="${e}" label="Lakes & Ponds">
    <calcite-block expandable heading="Lakes" description="Large standing-water bodies and reservoirs"></calcite-block>
    <calcite-block expandable heading="Ponds" description="Small standing-water features and basins"></calcite-block>
  </calcite-block-group>
`, M = () => a`
  <calcite-block expandable heading="Rivers" description="Primary waterways and regional flow lines" expanded>
    <calcite-block
      expandable
      heading="Gauging Stations"
      description="Monitoring sites reporting water level metrics"
      slot="children"
    ></calcite-block>
    <calcite-block
      expandable
      heading="Streams"
      description="Secondary channels feeding larger rivers"
      expanded
      slot="children"
    >
      <calcite-block
        expandable
        heading="Sub Streams"
        description="Minor stream branches in local watersheds"
        slot="children"
      ></calcite-block>
      <calcite-block
        expandable
        heading="Tributaries"
        description="Contributing flow sources into stream network"
        slot="children"
      ></calcite-block>
    </calcite-block>
  </calcite-block>
  <calcite-block expandable heading="Lakes" description="Large standing-water bodies and reservoirs"></calcite-block>
`, k = (e, u) => a` <style>
      .container-wrapper {
        display: flex;
        flex-direction: row;
        gap: 20px;
      }
      .container {
        display: flex;
        flex-direction: column;
      }
    </style>
    <div class="container-wrapper">
      ${h.map((p) => a` <div class="container">
              <p>expandMode="${p}"</p>
              <calcite-block-group label="My Group" expand-mode="${p}">
                ${e({
  ...u.args,
  expandMode: p
})}
              </calcite-block-group>
            </div>`).join("")}
    </div>`, o = (e) => x(e.expandMode);
o.decorators = [k];
o.args = {
  expandMode: "single"
};
const l = () => M();
l.decorators = [k];
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
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
      ...r.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-block-group drag-enabled label="My Group"> ${blockHTML} </calcite-block-group>\n`',
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
  <calcite-block-group drag-enabled label="My Group">
    <calcite-block sort-handle-open expandable heading="Invisible ink" description="You can't see me!"
      >My block content!</calcite-block
    >
    \${blockHTML}
  </calcite-block-group>
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
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
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
      ...d.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: "(args: ExpandModeStoryArgs): string => nestedBlockGroupHTML(args.expandMode)",
      ...o.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: "(): string => nestedBlockHTML()",
      ...l.parameters?.docs?.source
    }
  }
};
const S = ["simple", "dragEnabled", "sortHandleOpen", "loading", "disabled", "allScales", "allExpandModesWithNestedBlockGroup", "allExpandModesWithNestedBlock"];
export {
  S as __namedExportsOrder,
  l as allExpandModesWithNestedBlock,
  o as allExpandModesWithNestedBlockGroup,
  d as allScales,
  G as default,
  s as disabled,
  n as dragEnabled,
  t as loading,
  r as simple,
  i as sortHandleOpen
};
