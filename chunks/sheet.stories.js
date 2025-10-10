import { k as $, h as e, j as T } from "./index.js";
import { A as M } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  logicalFlowPosition: w,
  displayMode: z
} = M, L = {
  title: "Components/Sheet",
  args: {
    open: !0,
    resizable: !1,
    position: w.values[0],
    displayMode: z.values[1]
  },
  argTypes: {
    position: {
      options: w.values,
      control: {
        type: "select"
      }
    },
    displayMode: {
      options: z.values,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      delay: 1e3
    }
  }
}, t = e`<calcite-panel heading="Ultrices neque"
  ><p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
  <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>
  <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>
</calcite-panel>`, o = (a) => e`
  <calcite-sheet
    label="libero nunc"
    ${$("open", a.open)}
    ${$("resizable", a.resizable)}
    position="${a.position}"
    display-mode="${a.displayMode}"
    >${t}</calcite-sheet
  >
`, i = (a) => e`
  <calcite-sheet
    label="libero nunc"
    ${$("open", a.open)}
    position="${a.position}"
    display-mode="${a.displayMode}"
    >${t}</calcite-sheet
  >
`;
i.parameters = {
  themes: T
};
const l = () => e`<calcite-sheet resizable label="libero nunc" open position="inline-start">${t}</calcite-sheet>`, n = () => e`<calcite-sheet dir="rtl" resizable label="libero nunc" open position="inline-start"
    >${t}</calcite-sheet
  >`, r = () => e`<calcite-sheet width="s" resizable label="libero nunc" open position="inline-start">
    <calcite-panel heading="Map" id="panel-start">
      <calcite-dropdown open width="m" overlay-positioning="fixed">
        <calcite-button slot="trigger">Select landform</calcite-button>
        <calcite-dropdown-group group-title="Natural places">
          <calcite-dropdown-item>Mountain</calcite-dropdown-item>
          <calcite-dropdown-item>River</calcite-dropdown-item>
          <calcite-dropdown-item>Waterfall</calcite-dropdown-item>
          <calcite-dropdown-item>Rainforest</calcite-dropdown-item>
          <calcite-dropdown-item>Tundra</calcite-dropdown-item>
          <calcite-dropdown-item>Desert</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
    </calcite-panel></calcite-sheet
  >`, c = () => e`<calcite-sheet resizable label="libero nunc" open position="block-start">${t}</calcite-sheet>`, u = () => e`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="inline-start"
    >${t}</calcite-sheet
  >`, p = () => e`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="inline-end"
    >${t}</calcite-sheet
  >`, m = () => e`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="block-start"
    >${t}</calcite-sheet
  >`, d = () => e`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="block-end"
    >${t}</calcite-sheet
  >`, b = () => e`<calcite-sheet resizable label="libero nunc" open position="inline-end"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel viverra purus. Vestibulum fringilla fringilla orci
    ac elementum. Sed viverra risus eu nibh facilisis imperdiet. Maecenas sed semper lacus, imperdiet placerat risus.
    Sed at urna sit amet tellus egestas condimentum a non nisi. Integer vehicula urna eros. Nunc ante quam, porttitor
    vel ex vel, volutpat ultrices mi. Aenean cursus tempor mi, eget accumsan ligula pellentesque nec. Nulla non
    facilisis libero. Praesent purus risus, suscipit porttitor odio nec, aliquam placerat elit. Vivamus id justo porta,
    pharetra tortor vitae, convallis lorem. Proin at molestie metus. Vestibulum quis mauris neque. Integer ornare, nisi
    a blandit dignissim, odio tortor maximus nisi, at placerat ex dui ut nisi. Aliquam metus dolor, ullamcorper sit amet
    ornare eget, gravida a erat. Quisque a lacus fringilla, fermentum est sed, ultrices eros. Praesent posuere felis eu
    arcu pulvinar commodo at sodales diam. Morbi eu iaculis nunc. Pellentesque habitant morbi tristique senectus et
    netus et malesuada fames ac turpis egestas. Duis sed auctor velit, ut tempus mauris. Donec fermentum sagittis tortor
    et posuere. Pellentesque posuere nunc non augue suscipit cursus. Donec feugiat in nisi non dignissim. Proin
    vulputate, justo ac rhoncus porttitor, velit nunc molestie nisi, ac bibendum erat magna et magna. Interdum et
    malesuada fames ac ante ipsum primis in faucibus. Quisque urna sapien, tempus in tortor eu, elementum dictum ligula.
    Mauris mollis condimentum quam. Curabitur a efficitur velit, non pellentesque massa. Etiam sit amet nulla nulla.
    Cras volutpat eros in velit euismod, at accumsan velit pulvinar.
  </calcite-sheet>`, h = () => e`<calcite-sheet label="libero nunc" open position="inline-start" display-mode="float"
    >${t}</calcite-sheet
  >`, g = () => e`<calcite-sheet label="libero nunc" open position="block-start" display-mode="float"
    >${t}</calcite-sheet
  >`, f = () => e`<calcite-sheet label="libero nunc" open position="inline-start">${t}</calcite-sheet>`, v = () => e`<calcite-sheet label="libero nunc" open position="inline-end">${t}</calcite-sheet>`, y = () => e`<calcite-sheet label="libero nunc" open position="block-start">${t}</calcite-sheet>`, S = () => e`<calcite-sheet label="libero nunc" open position="block-end">${t}</calcite-sheet>`, s = () => e`<div dir="rtl">
    <calcite-sheet label="libero nunc" open position="inline-start" display-mode="float">${t}</calcite-sheet>
  </div>`;
s.parameters = {
  themes: T
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(args: SheetStoryArgs): string => html\`
  <calcite-sheet
    label="libero nunc"
    \${boolean("open", args.open)}
    \${boolean("resizable", args.resizable)}
    position="\${args.position}"
    display-mode="\${args.displayMode}"
    >\${panelHTML}</calcite-sheet
  >
\``,
      ...o.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: SheetStoryArgs): string => html\`
  <calcite-sheet
    label="libero nunc"
    \${boolean("open", args.open)}
    position="\${args.position}"
    display-mode="\${args.displayMode}"
    >\${panelHTML}</calcite-sheet
  >
\``,
      ...i.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet resizable label="libero nunc" open position="inline-start">${panelHTML}</calcite-sheet>`',
      ...l.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet dir="rtl" resizable label="libero nunc" open position="inline-start"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...n.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-sheet width="s" resizable label="libero nunc" open position="inline-start">
    <calcite-panel heading="Map" id="panel-start">
      <calcite-dropdown open width="m" overlay-positioning="fixed">
        <calcite-button slot="trigger">Select landform</calcite-button>
        <calcite-dropdown-group group-title="Natural places">
          <calcite-dropdown-item>Mountain</calcite-dropdown-item>
          <calcite-dropdown-item>River</calcite-dropdown-item>
          <calcite-dropdown-item>Waterfall</calcite-dropdown-item>
          <calcite-dropdown-item>Rainforest</calcite-dropdown-item>
          <calcite-dropdown-item>Tundra</calcite-dropdown-item>
          <calcite-dropdown-item>Desert</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
    </calcite-panel></calcite-sheet
  >\``,
      ...r.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet resizable label="libero nunc" open position="block-start">${panelHTML}</calcite-sheet>`',
      ...c.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="inline-start"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...u.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="inline-end"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...p.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="block-start"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...m.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="block-end"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...d.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-sheet resizable label="libero nunc" open position="inline-end"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel viverra purus. Vestibulum fringilla fringilla orci
    ac elementum. Sed viverra risus eu nibh facilisis imperdiet. Maecenas sed semper lacus, imperdiet placerat risus.
    Sed at urna sit amet tellus egestas condimentum a non nisi. Integer vehicula urna eros. Nunc ante quam, porttitor
    vel ex vel, volutpat ultrices mi. Aenean cursus tempor mi, eget accumsan ligula pellentesque nec. Nulla non
    facilisis libero. Praesent purus risus, suscipit porttitor odio nec, aliquam placerat elit. Vivamus id justo porta,
    pharetra tortor vitae, convallis lorem. Proin at molestie metus. Vestibulum quis mauris neque. Integer ornare, nisi
    a blandit dignissim, odio tortor maximus nisi, at placerat ex dui ut nisi. Aliquam metus dolor, ullamcorper sit amet
    ornare eget, gravida a erat. Quisque a lacus fringilla, fermentum est sed, ultrices eros. Praesent posuere felis eu
    arcu pulvinar commodo at sodales diam. Morbi eu iaculis nunc. Pellentesque habitant morbi tristique senectus et
    netus et malesuada fames ac turpis egestas. Duis sed auctor velit, ut tempus mauris. Donec fermentum sagittis tortor
    et posuere. Pellentesque posuere nunc non augue suscipit cursus. Donec feugiat in nisi non dignissim. Proin
    vulputate, justo ac rhoncus porttitor, velit nunc molestie nisi, ac bibendum erat magna et magna. Interdum et
    malesuada fames ac ante ipsum primis in faucibus. Quisque urna sapien, tempus in tortor eu, elementum dictum ligula.
    Mauris mollis condimentum quam. Curabitur a efficitur velit, non pellentesque massa. Etiam sit amet nulla nulla.
    Cras volutpat eros in velit euismod, at accumsan velit pulvinar.
  </calcite-sheet>\``,
      ...b.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="inline-start" display-mode="float"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...h.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="block-start" display-mode="float"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...g.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="inline-start">${panelHTML}</calcite-sheet>`',
      ...f.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="inline-end">${panelHTML}</calcite-sheet>`',
      ...v.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="block-start">${panelHTML}</calcite-sheet>`',
      ...y.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="block-end">${panelHTML}</calcite-sheet>`',
      ...S.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div dir="rtl">\n    <calcite-sheet label="libero nunc" open position="inline-start" display-mode="float">${panelHTML}</calcite-sheet>\n  </div>`',
      ...s.parameters?.docs?.source
    }
  }
};
const H = ["simple", "simpleDarkMode", "resizable", "resizableRTL", "resizableWithDropdown", "resizableBlockStart", "resizableFloatInlineStart", "resizableFloatInlineEnd", "resizableFloatBlockStart", "resizableFloatBlockEnd", "resizableLoremIpsum", "inlineStartFloat_TestOnly", "blockStartFloat_TestOnly", "inlineStart_TestOnly", "inlineEnd_TestOnly", "blockStart_TestOnly", "blockEnd_TestOnly", "darkModeFloatRTL_TestOnly"];
export {
  H as __namedExportsOrder,
  S as blockEnd_TestOnly,
  g as blockStartFloat_TestOnly,
  y as blockStart_TestOnly,
  s as darkModeFloatRTL_TestOnly,
  L as default,
  v as inlineEnd_TestOnly,
  h as inlineStartFloat_TestOnly,
  f as inlineStart_TestOnly,
  l as resizable,
  c as resizableBlockStart,
  d as resizableFloatBlockEnd,
  m as resizableFloatBlockStart,
  p as resizableFloatInlineEnd,
  u as resizableFloatInlineStart,
  b as resizableLoremIpsum,
  n as resizableRTL,
  r as resizableWithDropdown,
  o as simple,
  i as simpleDarkMode
};
