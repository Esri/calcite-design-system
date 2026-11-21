/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { b as g } from "./utils3.js";
import { h as c } from "./formatting.js";
import { A as h } from "./resources34.js";
import "./block-group.js";
import "./block.js";
const {
  scale: k
} = h, x = ["single", "multiple", "single-persist"], w = {
  title: "Components/Block Group",
  args: {
    disabled: !1,
    dragEnabled: !1,
    group: "",
    label: "My Group",
    loading: !1,
    scale: k.defaultValue
  },
  argTypes: {
    scale: {
      options: k.values,
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
}, a = c`<calcite-block
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
  >`, n = (e) => c`
  <calcite-block-group
    ${g("disabled", e.disabled)}
    ${g("drag-enabled", e.dragEnabled)}
    ${g("loading", e.loading)}
    label="${e.label}"
    group="${e.group}"
    scale="${e.scale}"
  >
    ${a}
  </calcite-block-group>
`, i = () => c`
  <calcite-block-group drag-enabled label="My Group"> ${a} </calcite-block-group>
`, t = () => c`
  <calcite-block-group drag-enabled label="My Group">
    <calcite-block sort-handle-open expandable heading="Invisible ink" description="You can't see me!"
      >My block content!</calcite-block
    >
    ${a}
  </calcite-block-group>
`, r = () => c`
  <calcite-block-group loading label="My Group"> ${a} </calcite-block-group>
`, s = () => c`
  <style>
    .loading-block-group {
      inline-size: 400px;
    }
    .loading-block-content {
      block-size: 120px;
    }
  </style>
  <calcite-block-group class="loading-block-group" loading label="Loading parent group">
    <calcite-block heading="Loading child" expandable expanded loading>
      <div class="loading-block-content">Nested loading content</div>
    </calcite-block>
    <calcite-block heading="Sibling block" expandable expanded>
      <div class="loading-block-content">Sibling content</div>
    </calcite-block>
  </calcite-block-group>
`, d = () => c`
  <calcite-block-group disabled label="My Group"> ${a} </calcite-block-group>
`, p = () => c` <style>
      .container {
        display: flex;
        flex-direction: row;
        gap: 20px;
      }
    </style>
    <div class="container">
      <calcite-block-group scale="s"> ${a} </calcite-block-group>
      <calcite-block-group scale="m"> ${a} </calcite-block-group>
      <calcite-block-group scale="l"> ${a} </calcite-block-group>
    </div>`, y = (e) => c`
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
`, M = () => c`
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
`, u = (e, m) => c` <style>
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
      ${x.map((b) => c` <div class="container">
              <p>expandMode="${b}"</p>
              <calcite-block-group label="My Group" expand-mode="${b}">
                ${e({
  ...m.args,
  expandMode: b
})}
              </calcite-block-group>
            </div>`).join("")}
    </div>`, o = (e) => y(e.expandMode);
o.decorators = [u];
o.args = {
  expandMode: "single"
};
const l = () => M();
l.decorators = [u];
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
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
      ...n.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-block-group drag-enabled label="My Group"> ${blockHTML} </calcite-block-group>\n`',
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
  <calcite-block-group drag-enabled label="My Group">
    <calcite-block sort-handle-open expandable heading="Invisible ink" description="You can't see me!"
      >My block content!</calcite-block
    >
    \${blockHTML}
  </calcite-block-group>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-block-group loading label="My Group"> ${blockHTML} </calcite-block-group>\n`',
      ...r.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .loading-block-group {
      inline-size: 400px;
    }
    .loading-block-content {
      block-size: 120px;
    }
  </style>
  <calcite-block-group class="loading-block-group" loading label="Loading parent group">
    <calcite-block heading="Loading child" expandable expanded loading>
      <div class="loading-block-content">Nested loading content</div>
    </calcite-block>
    <calcite-block heading="Sibling block" expandable expanded>
      <div class="loading-block-content">Sibling content</div>
    </calcite-block>
  </calcite-block-group>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-block-group disabled label="My Group"> ${blockHTML} </calcite-block-group>\n`',
      ...d.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
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
      ...p.parameters?.docs?.source
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
const G = ["simple", "dragEnabled", "sortHandleOpen", "loading", "loadingNestedContent", "disabled", "allScales", "allExpandModesWithNestedBlockGroup", "allExpandModesWithNestedBlock"];
export {
  G as __namedExportsOrder,
  l as allExpandModesWithNestedBlock,
  o as allExpandModesWithNestedBlockGroup,
  p as allScales,
  w as default,
  d as disabled,
  i as dragEnabled,
  r as loading,
  s as loadingNestedContent,
  n as simple,
  t as sortHandleOpen
};
