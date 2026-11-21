/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { b as z, m as L } from "./utils3.js";
import { h as t } from "./formatting.js";
import { A as D } from "./resources34.js";
import "./button.js";
import "./dropdown-group.js";
import "./dropdown-item.js";
import "./panel.js";
import "./sheet.js";
const { expect: I, waitFor: P } = __STORYBOOK_MODULE_TEST__, {
  logicalFlowPosition: T,
  displayMode: q,
  scale: s
} = D, j = {
  title: "Components/Sheet",
  args: {
    modal: !0,
    open: !0,
    resizable: !1,
    position: T.values[0],
    displayMode: q.values[1],
    width: s.defaultValue,
    heightScale: s.defaultValue
  },
  argTypes: {
    position: {
      options: T.values,
      control: {
        type: "select"
      }
    },
    displayMode: {
      options: q.values,
      control: {
        type: "select"
      }
    },
    width: {
      options: s.values,
      control: {
        type: "select"
      }
    },
    heightScale: {
      options: s.values,
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
}, e = t`<calcite-panel heading="Ultrices neque"
  ><p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
  <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>
  <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>
</calcite-panel>`, n = (a) => t`
  <calcite-sheet
    label="libero nunc"
    ${z("modal", a.modal)}
    ${z("open", a.open)}
    ${z("resizable", a.resizable)}
    position="${a.position}"
    display-mode="${a.displayMode}"
    width="${a.width}"
    height-scale="${a.heightScale}"
    >${e}</calcite-sheet
  >
`, o = (a) => t`
  <calcite-sheet
    label="libero nunc"
    modal
    ${z("open", a.open)}
    position="${a.position}"
    display-mode="${a.displayMode}"
    >${e}</calcite-sheet
  >
`;
o.parameters = {
  themes: L
};
const r = () => t`
  <calcite-sheet label="Non-modal inline sheet" open position="inline-end">${e}</calcite-sheet>
`, c = () => t`
  <calcite-sheet label="Non-modal block sheet" open position="block-end">${e}</calcite-sheet>
`, p = () => t`<calcite-sheet modal resizable label="libero nunc" open position="inline-start">${e}</calcite-sheet>`, d = () => t`<calcite-sheet dir="rtl" modal resizable label="libero nunc" open position="inline-start"
    >${e}</calcite-sheet
  >`, i = () => t`<calcite-sheet width="s" modal resizable label="libero nunc" open position="inline-start" focus-trap-disabled>
    <calcite-panel heading="Map" id="panel-start" focus-trap-disabled>
      <calcite-dropdown width="m" overlay-positioning="fixed">
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
  >`;
i.play = async ({
  canvasElement: a
}) => {
  const H = a.querySelector("calcite-sheet"), x = a.querySelector("calcite-dropdown"), E = a.querySelector("calcite-dropdown-item");
  await new Promise((F) => {
    H.addEventListener("calciteSheetOpen", () => F(), {
      once: !0
    });
  }), x.open = !0, await P(async () => {
    await I(E).toHaveFocus();
  });
};
i.parameters = {
  chromatic: {
    delay: 0
  }
};
const u = () => t`<calcite-sheet modal resizable label="libero nunc" open position="block-start">${e}</calcite-sheet>`, m = () => t`<calcite-sheet display-mode="float" modal resizable label="libero nunc" open position="inline-start"
    >${e}</calcite-sheet
  >`, b = () => t`<calcite-sheet display-mode="float" modal resizable label="libero nunc" open position="inline-end"
    >${e}</calcite-sheet
  >`, h = () => t`<calcite-sheet display-mode="float" modal resizable label="libero nunc" open position="block-start"
    >${e}</calcite-sheet
  >`, g = () => t`<calcite-sheet display-mode="float" modal resizable label="libero nunc" open position="block-end"
    >${e}</calcite-sheet
  >`, f = () => t`<calcite-sheet modal resizable label="libero nunc" open position="inline-end"
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
  </calcite-sheet>`, v = () => t`<calcite-sheet label="libero nunc" modal open position="inline-start" display-mode="float"
    >${e}</calcite-sheet
  >`, $ = () => t`<calcite-sheet label="libero nunc" modal open position="block-start" display-mode="float"
    >${e}</calcite-sheet
  >`, w = () => t`<calcite-sheet label="libero nunc" modal open position="inline-start">${e}</calcite-sheet>`, S = () => t`<calcite-sheet label="libero nunc" modal open position="inline-end">${e}</calcite-sheet>`, y = () => t`<calcite-sheet label="libero nunc" modal open position="block-start">${e}</calcite-sheet>`, M = () => t`<calcite-sheet label="libero nunc" modal open position="block-end">${e}</calcite-sheet>`, l = () => t`<div dir="rtl">
    <calcite-sheet label="libero nunc" modal open position="inline-start" display-mode="float"
      >${e}</calcite-sheet
    >
  </div>`;
l.parameters = {
  themes: L
};
const k = () => t`
  <style>
    :root {
      --calcite-sheet-scrim-background: transparent;
      --calcite-sheet-shadow: 0 8px 24px blue;
    }
  </style>
  <calcite-sheet label="overlay + block" modal open position="block-start">${e}</calcite-sheet>
  <calcite-sheet display-mode="float" label="float + block" modal open position="block-end">${e}</calcite-sheet>
  <calcite-sheet label="overlay + inline" modal open position="inline-start">${e}</calcite-sheet>
  <calcite-sheet display-mode="float" label="float + inline" modal open position="inline-end"
    >${e}</calcite-sheet
  >
`;
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(args: SheetStoryArgs): string => html\`
  <calcite-sheet
    label="libero nunc"
    \${boolean("modal", args.modal)}
    \${boolean("open", args.open)}
    \${boolean("resizable", args.resizable)}
    position="\${args.position}"
    display-mode="\${args.displayMode}"
    width="\${args.width}"
    height-scale="\${args.heightScale}"
    >\${panelHTML}</calcite-sheet
  >
\``,
      ...n.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(args: SheetStoryArgs): string => html\`
  <calcite-sheet
    label="libero nunc"
    modal
    \${boolean("open", args.open)}
    position="\${args.position}"
    display-mode="\${args.displayMode}"
    >\${panelHTML}</calcite-sheet
  >
\``,
      ...o.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-sheet label="Non-modal inline sheet" open position="inline-end">${panelHTML}</calcite-sheet>\n`',
      ...r.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-sheet label="Non-modal block sheet" open position="block-end">${panelHTML}</calcite-sheet>\n`',
      ...c.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet modal resizable label="libero nunc" open position="inline-start">${panelHTML}</calcite-sheet>`',
      ...p.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet dir="rtl" modal resizable label="libero nunc" open position="inline-start"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...d.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-sheet width="s" modal resizable label="libero nunc" open position="inline-start" focus-trap-disabled>
    <calcite-panel heading="Map" id="panel-start" focus-trap-disabled>
      <calcite-dropdown width="m" overlay-positioning="fixed">
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
      ...i.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet modal resizable label="libero nunc" open position="block-start">${panelHTML}</calcite-sheet>`',
      ...u.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" modal resizable label="libero nunc" open position="inline-start"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...m.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" modal resizable label="libero nunc" open position="inline-end"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...b.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" modal resizable label="libero nunc" open position="block-start"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...h.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" modal resizable label="libero nunc" open position="block-end"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...g.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-sheet modal resizable label="libero nunc" open position="inline-end"
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
      ...f.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" modal open position="inline-start" display-mode="float"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...v.parameters?.docs?.source
    }
  }
};
$.parameters = {
  ...$.parameters,
  docs: {
    ...$.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" modal open position="block-start" display-mode="float"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...$.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" modal open position="inline-start">${panelHTML}</calcite-sheet>`',
      ...w.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" modal open position="inline-end">${panelHTML}</calcite-sheet>`',
      ...S.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" modal open position="block-start">${panelHTML}</calcite-sheet>`',
      ...y.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" modal open position="block-end">${panelHTML}</calcite-sheet>`',
      ...M.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div dir="rtl">
    <calcite-sheet label="libero nunc" modal open position="inline-start" display-mode="float"
      >\${panelHTML}</calcite-sheet
    >
  </div>\``,
      ...l.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    :root {
      --calcite-sheet-scrim-background: transparent;
      --calcite-sheet-shadow: 0 8px 24px blue;
    }
  </style>
  <calcite-sheet label="overlay + block" modal open position="block-start">\${panelHTML}</calcite-sheet>
  <calcite-sheet display-mode="float" label="float + block" modal open position="block-end">\${panelHTML}</calcite-sheet>
  <calcite-sheet label="overlay + inline" modal open position="inline-start">\${panelHTML}</calcite-sheet>
  <calcite-sheet display-mode="float" label="float + inline" modal open position="inline-end"
    >\${panelHTML}</calcite-sheet
  >
\``,
      ...k.parameters?.docs?.source
    }
  }
};
const Q = ["simple", "simpleDarkMode", "nonModalInlineEnd", "nonModalBlockEnd", "resizable", "resizableRTL", "resizableWithDropdown", "resizableBlockStart", "resizableFloatInlineStart", "resizableFloatInlineEnd", "resizableFloatBlockStart", "resizableFloatBlockEnd", "resizableLoremIpsum", "inlineStartFloat", "blockStartFloat", "inlineStart", "inlineEnd", "blockStart", "blockEnd", "darkModeFloatRTL", "shadowAcrossModesAndPositions"];
export {
  Q as __namedExportsOrder,
  M as blockEnd,
  y as blockStart,
  $ as blockStartFloat,
  l as darkModeFloatRTL,
  j as default,
  S as inlineEnd,
  w as inlineStart,
  v as inlineStartFloat,
  c as nonModalBlockEnd,
  r as nonModalInlineEnd,
  p as resizable,
  u as resizableBlockStart,
  g as resizableFloatBlockEnd,
  h as resizableFloatBlockStart,
  b as resizableFloatInlineEnd,
  m as resizableFloatInlineStart,
  f as resizableLoremIpsum,
  d as resizableRTL,
  i as resizableWithDropdown,
  k as shadowAcrossModesAndPositions,
  n as simple,
  o as simpleDarkMode
};
