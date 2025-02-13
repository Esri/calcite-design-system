import { b as y, m as T } from "./utils.js";
import { h as e } from "./formatting.js";
import { A as z } from "./resources14.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
const {
  logicalFlowPosition: $,
  displayMode: S
} = z, L = {
  title: "Components/Sheet",
  args: {
    open: !0,
    resizable: !1,
    position: $.values[0],
    displayMode: S.values[1]
  },
  argTypes: {
    position: {
      options: $.values,
      control: {
        type: "select"
      }
    },
    displayMode: {
      options: S.values,
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
</calcite-panel>`, l = (a) => e`
  <calcite-sheet
    label="libero nunc"
    ${y("open", a.open)}
    ${y("resizable", a.resizable)}
    position="${a.position}"
    display-mode="${a.displayMode}"
    >${t}</calcite-sheet
  >
`, i = (a) => e`
  <calcite-sheet
    label="libero nunc"
    ${y("open", a.open)}
    position="${a.position}"
    display-mode="${a.displayMode}"
    >${t}</calcite-sheet
  >
`;
i.parameters = {
  themes: T
};
const o = () => e`<calcite-sheet resizable label="libero nunc" open position="inline-start">${t}</calcite-sheet>`, r = () => e`<calcite-sheet resizable label="libero nunc" open position="block-start">${t}</calcite-sheet>`, n = () => e`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="inline-start"
    >${t}</calcite-sheet
  >`, c = () => e`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="inline-end"
    >${t}</calcite-sheet
  >`, u = () => e`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="block-start"
    >${t}</calcite-sheet
  >`, p = () => e`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="block-end"
    >${t}</calcite-sheet
  >`, m = () => e`<calcite-sheet resizable label="libero nunc" open position="inline-end"
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
  </calcite-sheet>`, d = () => e`<calcite-sheet label="libero nunc" open position="inline-start" display-mode="float"
    >${t}</calcite-sheet
  >`, b = () => e`<calcite-sheet label="libero nunc" open position="block-start" display-mode="float"
    >${t}</calcite-sheet
  >`, h = () => e`<calcite-sheet label="libero nunc" open position="inline-start">${t}</calcite-sheet>`, g = () => e`<calcite-sheet label="libero nunc" open position="inline-end">${t}</calcite-sheet>`, f = () => e`<calcite-sheet label="libero nunc" open position="block-start">${t}</calcite-sheet>`, v = () => e`<calcite-sheet label="libero nunc" open position="block-end">${t}</calcite-sheet>`, s = () => e`<div dir="rtl">
    <calcite-sheet label="libero nunc" open position="inline-start" display-mode="float">${t}</calcite-sheet>
  </div>`;
s.parameters = {
  themes: T
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
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
      ...l.parameters?.docs?.source
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
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet resizable label="libero nunc" open position="inline-start">${panelHTML}</calcite-sheet>`',
      ...o.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet resizable label="libero nunc" open position="block-start">${panelHTML}</calcite-sheet>`',
      ...r.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="inline-start"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...n.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="inline-end"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...c.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="block-start"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...u.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="block-end"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...p.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
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
      ...m.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="inline-start" display-mode="float"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...d.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="block-start" display-mode="float"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...b.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="inline-start">${panelHTML}</calcite-sheet>`',
      ...h.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="inline-end">${panelHTML}</calcite-sheet>`',
      ...g.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="block-start">${panelHTML}</calcite-sheet>`',
      ...f.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="block-end">${panelHTML}</calcite-sheet>`',
      ...v.parameters?.docs?.source
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
const _ = ["simple", "simpleDarkMode", "resizable", "resizableBlockStart", "resizableFloatInlineStart", "resizableFloatInlineEnd", "resizableFloatBlockStart", "resizableFloatBlockEnd", "resizableLoremIpsum", "inlineStartFloat_TestOnly", "blockStartFloat_TestOnly", "inlineStart_TestOnly", "inlineEnd_TestOnly", "blockStart_TestOnly", "blockEnd_TestOnly", "darkModeFloatRTL_TestOnly"];
export {
  _ as __namedExportsOrder,
  v as blockEnd_TestOnly,
  b as blockStartFloat_TestOnly,
  f as blockStart_TestOnly,
  s as darkModeFloatRTL_TestOnly,
  L as default,
  g as inlineEnd_TestOnly,
  d as inlineStartFloat_TestOnly,
  h as inlineStart_TestOnly,
  o as resizable,
  r as resizableBlockStart,
  p as resizableFloatBlockEnd,
  u as resizableFloatBlockStart,
  c as resizableFloatInlineEnd,
  n as resizableFloatInlineStart,
  m as resizableLoremIpsum,
  l as simple,
  i as simpleDarkMode
};
