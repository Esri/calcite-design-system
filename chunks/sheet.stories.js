/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as z, m as D } from "./utils3.js";
import { h as e } from "./formatting.js";
import { A as x } from "./resources34.js";
import "./button.js";
import "./dropdown.js";
import "./dropdown-group.js";
import "./dropdown-item.js";
import "./panel.js";
import "./sheet.js";
var q = Object.freeze, E = Object.defineProperty, F = (a, I) => q(E(a, "raw", { value: q(a.slice()) })), L;
const {
  logicalFlowPosition: T,
  displayMode: H,
  scale: n
} = x, Q = {
  title: "Components/Sheet",
  args: {
    modalDisabled: !1,
    open: !0,
    resizable: !1,
    position: T.values[0],
    displayMode: H.values[1],
    width: n.defaultValue,
    heightScale: n.defaultValue
  },
  argTypes: {
    position: {
      options: T.values,
      control: {
        type: "select"
      }
    },
    displayMode: {
      options: H.values,
      control: {
        type: "select"
      }
    },
    width: {
      options: n.values,
      control: {
        type: "select"
      }
    },
    heightScale: {
      options: n.values,
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
</calcite-panel>`, P = e`
  <style>
    .non-modal-page-content {
      box-sizing: border-box;
      display: grid;
      gap: var(--calcite-spacing-md);
      min-block-size: 100vh;
      padding: var(--calcite-spacing-xl);
    }

    .non-modal-page-content__actions {
      display: flex;
      gap: var(--calcite-spacing-sm);
    }
  </style>
  <main class="non-modal-page-content">
    <h1>Page content remains available</h1>
    <p>The controls and content outside the Sheet remain visible and interactive.</p>
    <div class="non-modal-page-content__actions">
      <calcite-button>Primary action</calcite-button>
      <calcite-button appearance="outline">Secondary action</calcite-button>
    </div>
  </main>
`, l = (a) => e`
  <calcite-sheet
    label="libero nunc"
    ${z("modal-disabled", a.modalDisabled)}
    ${z("open", a.open)}
    ${z("resizable", a.resizable)}
    position="${a.position}"
    display-mode="${a.displayMode}"
    width="${a.width}"
    height-scale="${a.heightScale}"
    >${t}</calcite-sheet
  >
`, i = (a) => e`
  <calcite-sheet
    label="libero nunc"
    ${z("open", a.open)}
    position="${a.position}"
    display-mode="${a.displayMode}"
    >${t}</calcite-sheet
  >
`;
i.parameters = {
  themes: D
};
const s = () => e`
  ${P}
  <calcite-sheet label="Non-modal inline sheet" modal-disabled open position="inline-end">${t}</calcite-sheet>
`, r = () => e`
  ${P}
  <calcite-sheet label="Non-modal block sheet" modal-disabled open position="block-end">${t}</calcite-sheet>
`, c = () => e`<calcite-sheet resizable label="libero nunc" open position="inline-start">${t}</calcite-sheet>`, p = () => e`<calcite-sheet dir="rtl" resizable label="libero nunc" open position="inline-start"
    >${t}</calcite-sheet
  >`, d = () => e(L || (L = F([`<calcite-sheet width="s" resizable label="libero nunc" open position="inline-start">
      <calcite-panel heading="Map" id="panel-start">
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
    >
    <script>
      document.addEventListener("calciteSheetOpen", (event) => {
        document.querySelector("calcite-dropdown").open = true;
      });
    <\/script>`]))), u = () => e`<calcite-sheet resizable label="libero nunc" open position="block-start">${t}</calcite-sheet>`, m = () => e`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="inline-start"
    >${t}</calcite-sheet
  >`, b = () => e`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="inline-end"
    >${t}</calcite-sheet
  >`, h = () => e`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="block-start"
    >${t}</calcite-sheet
  >`, g = () => e`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="block-end"
    >${t}</calcite-sheet
  >`, v = () => e`<calcite-sheet resizable label="libero nunc" open position="inline-end"
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
  </calcite-sheet>`, f = () => e`<calcite-sheet label="libero nunc" open position="inline-start" display-mode="float"
    >${t}</calcite-sheet
  >`, $ = () => e`<calcite-sheet label="libero nunc" open position="block-start" display-mode="float"
    >${t}</calcite-sheet
  >`, S = () => e`<calcite-sheet label="libero nunc" open position="inline-start">${t}</calcite-sheet>`, y = () => e`<calcite-sheet label="libero nunc" open position="inline-end">${t}</calcite-sheet>`, w = () => e`<calcite-sheet label="libero nunc" open position="block-start">${t}</calcite-sheet>`, M = () => e`<calcite-sheet label="libero nunc" open position="block-end">${t}</calcite-sheet>`, o = () => e`<div dir="rtl">
    <calcite-sheet label="libero nunc" open position="inline-start" display-mode="float">${t}</calcite-sheet>
  </div>`;
o.parameters = {
  themes: D
};
const k = () => e`
  <style>
    :root {
      --calcite-sheet-scrim-background: transparent;
      --calcite-sheet-shadow: 0 8px 24px blue;
    }
  </style>
  <calcite-sheet label="overlay + block" open position="block-start">${t}</calcite-sheet>
  <calcite-sheet display-mode="float" label="float + block" open position="block-end">${t}</calcite-sheet>
  <calcite-sheet label="overlay + inline" open position="inline-start">${t}</calcite-sheet>
  <calcite-sheet display-mode="float" label="float + inline" open position="inline-end">${t}</calcite-sheet>
`;
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(args: SheetStoryArgs): string => html\`
  <calcite-sheet
    label="libero nunc"
    \${boolean("modal-disabled", args.modalDisabled)}
    \${boolean("open", args.open)}
    \${boolean("resizable", args.resizable)}
    position="\${args.position}"
    display-mode="\${args.displayMode}"
    width="\${args.width}"
    height-scale="\${args.heightScale}"
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
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  ${nonModalPageContent}\n  <calcite-sheet label="Non-modal inline sheet" modal-disabled open position="inline-end">${panelHTML}</calcite-sheet>\n`',
      ...s.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  ${nonModalPageContent}\n  <calcite-sheet label="Non-modal block sheet" modal-disabled open position="block-end">${panelHTML}</calcite-sheet>\n`',
      ...r.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet resizable label="libero nunc" open position="inline-start">${panelHTML}</calcite-sheet>`',
      ...c.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet dir="rtl" resizable label="libero nunc" open position="inline-start"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...p.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-sheet width="s" resizable label="libero nunc" open position="inline-start">
      <calcite-panel heading="Map" id="panel-start">
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
    >
    <script>
      document.addEventListener("calciteSheetOpen", (event) => {
        document.querySelector("calcite-dropdown").open = true;
      });
    <\/script>\``,
      ...d.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet resizable label="libero nunc" open position="block-start">${panelHTML}</calcite-sheet>`',
      ...u.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="inline-start"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...m.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="inline-end"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...b.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="block-start"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...h.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="block-end"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...g.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
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
      ...v.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="inline-start" display-mode="float"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...f.parameters?.docs?.source
    }
  }
};
$.parameters = {
  ...$.parameters,
  docs: {
    ...$.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="block-start" display-mode="float"\n    >${panelHTML}</calcite-sheet\n  >`',
      ...$.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="inline-start">${panelHTML}</calcite-sheet>`',
      ...S.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="inline-end">${panelHTML}</calcite-sheet>`',
      ...y.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="block-start">${panelHTML}</calcite-sheet>`',
      ...w.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sheet label="libero nunc" open position="block-end">${panelHTML}</calcite-sheet>`',
      ...M.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div dir="rtl">\n    <calcite-sheet label="libero nunc" open position="inline-start" display-mode="float">${panelHTML}</calcite-sheet>\n  </div>`',
      ...o.parameters?.docs?.source
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
  <calcite-sheet label="overlay + block" open position="block-start">\${panelHTML}</calcite-sheet>
  <calcite-sheet display-mode="float" label="float + block" open position="block-end">\${panelHTML}</calcite-sheet>
  <calcite-sheet label="overlay + inline" open position="inline-start">\${panelHTML}</calcite-sheet>
  <calcite-sheet display-mode="float" label="float + inline" open position="inline-end">\${panelHTML}</calcite-sheet>
\``,
      ...k.parameters?.docs?.source
    }
  }
};
const W = ["simple", "simpleDarkMode", "modalDisabledInlineEnd", "modalDisabledBlockEnd", "resizable", "resizableRTL", "resizableWithDropdown", "resizableBlockStart", "resizableFloatInlineStart", "resizableFloatInlineEnd", "resizableFloatBlockStart", "resizableFloatBlockEnd", "resizableLoremIpsum", "inlineStartFloat", "blockStartFloat", "inlineStart", "inlineEnd", "blockStart", "blockEnd", "darkModeFloatRTL", "shadowAcrossModesAndPositions"];
export {
  W as __namedExportsOrder,
  M as blockEnd,
  w as blockStart,
  $ as blockStartFloat,
  o as darkModeFloatRTL,
  Q as default,
  y as inlineEnd,
  S as inlineStart,
  f as inlineStartFloat,
  r as modalDisabledBlockEnd,
  s as modalDisabledInlineEnd,
  c as resizable,
  u as resizableBlockStart,
  g as resizableFloatBlockEnd,
  h as resizableFloatBlockStart,
  b as resizableFloatInlineEnd,
  m as resizableFloatInlineStart,
  v as resizableLoremIpsum,
  p as resizableRTL,
  d as resizableWithDropdown,
  k as shadowAcrossModesAndPositions,
  l as simple,
  i as simpleDarkMode
};
