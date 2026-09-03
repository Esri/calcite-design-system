/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as V } from "./utils3.js";
import { s as $ } from "./index3.js";
import { h as n } from "./formatting.js";
import { A as H } from "./resources34.js";
import { a as S } from "./modes.js";
import "./tile.js";
import "./tile-group.js";
const {
  alignment: f,
  dir: x,
  layout: b,
  scale: k,
  tileSelectionAppearance: A,
  tileSelectionMode: B
} = H, C = {
  title: "Components/Tiles/Tile Group",
  args: {
    dir: x.defaultValue,
    alignment: f.defaultValue,
    disabled: !1,
    layout: b.defaultValue,
    scale: k.defaultValue,
    selectionAppearance: "icon",
    selectionMode: "none"
  },
  argTypes: {
    dir: {
      options: x.values,
      control: {
        type: "select"
      }
    },
    layout: {
      options: b.values.filter((i) => i !== "grid" && i !== "inline" && i !== "center" && i !== "auto" && i !== "fixed" && i !== "none" && i !== "horizontal-single"),
      control: {
        type: "select"
      }
    },
    alignment: {
      options: f.values.filter((i) => i !== "center"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: k.values,
      control: {
        type: "select"
      }
    },
    selectionMode: {
      options: B.values,
      control: {
        type: "select"
      }
    },
    selectionAppearance: {
      options: A.values,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      delay: 1e4,
      modes: {
        wide: S.widthLarge
      }
    }
  }
};
function e(i = {}, h, s = "none", t, c) {
  return n`
    <calcite-tile-group
      layout="${h}"
      selection-mode="${s}"
      scale="${t}"
      ${c ? `selection-appearance="${c}"` : ""}
    >
      ${Array(4).fill(null).map((g, d) => {
    let l = !1;
    return s === "single" ? l = d === (t === "s" ? 0 : t === "m" ? 1 : 2) : s === "multiple" && (l = t === "s" ? (
      // select even tiles
      d % 2 === 0
    ) : (
      // select odd tiles
      t === "m" ? d % 2 !== 0 : (
        // select all except for the 3rd tile
        d !== 2
      )
    )), r({
      ...i,
      selected: l
    });
  }).join(`
`)}
    </calcite-tile-group>
  `;
}
function r(i = {}) {
  const {
    contentBottom: h = !1,
    contentTop: s = !1,
    description: t = !1,
    heading: c = !1,
    icon: g = !1,
    link: d = !1,
    selected: l = !1
  } = i, p = 275, u = 100, m = [s ? n`<img src="${$({
    width: p,
    height: u
  })}" slot="content-top" />` : "", h ? n`<img src="${$({
    width: p,
    height: u
  })}" slot="content-bottom" />` : ""];
  return n`
    <calcite-tile
      ${c ? 'heading="Tile heading"' : ""}
      ${t ? 'description="This is sort of a medium length description."' : ""}
      ${d ? 'href="/"' : ""}
      ${g ? 'icon="layers"' : ""}
      ${l ? "selected" : ""}
    >
      ${m.length > 0 ? m.join(`
`) : ""}
    </calcite-tile>
  `;
}
const a = (i) => n`
  <calcite-tile-group
    alignment="${i.alignment}"
    dir="${i.dir}"
    ${V("disabled", i.disabled)}
    layout="${i.layout}"
    scale="${i.scale}"
    selection-mode="${i.selectionMode}"
    selection-appearance="${i.selectionAppearance}"
  >
    ${r({
  heading: !0,
  description: !0,
  icon: !0
})}
    ${r({
  heading: !0,
  description: !0,
  icon: !0
})}
    ${r({
  heading: !0,
  description: !0,
  icon: !0
})}
    ${r({
  heading: !0,
  description: !0,
  icon: !0
})}
  </calcite-tile-group>
`;
function T(i) {
  return () => n`
    <style>
      .parent {
        display: flex;
        color: var(--calcite-color-text-3);
        font-family: var(--calcite-sans-family);
        font-size: var(--calcite-font-size-0);
        font-weight: var(--calcite-font-weight-medium);
      }

      .child {
        display: inline-flex;
        flex-direction: column;
        flex: 0 1 50%;
        padding: 15px;
      }

      .right-aligned-text {
        text-align: right;
        flex: 0 0 21%;
      }

      .screenshot-test {
        gap: 1em;
        padding: 0 1em;
      }

      .spaced-column {
        display: flex;
        flex-direction: column;
        gap: 1em;
      }

      hr {
        margin: 25px 0;
        border-top: 1px solid var(--calcite-color-border-2);
      }
    </style>

    <div class="parent">
      <div class="child right-aligned-text"><h2>${i}</h2></div>
    </div>

    <div class="parent">
      <div class="child"></div>
      <div class="child">small</div>
      <div class="child">medium</div>
      <div class="child">large</div>
    </div>

    <!-- single -->
    <div class="parent">
      <div class="child right-aligned-text">single</div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "single", "s")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "single", "m")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "single", "l")}
      </div>
    </div>

    <!-- single selection-appearance="highlight" -->
    <div class="parent">
      <div class="child right-aligned-text">single selection-appearance="highlight"</div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "single", "s", "highlight")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "single", "m", "highlight")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "single", "l", "highlight")}
      </div>
    </div>

    <!-- single selection-appearance="border" (deprecated) -->
    <div class="parent">
      <div class="child right-aligned-text">single selection-appearance="border" (deprecated)</div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "single", "s", "border")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "single", "m", "border")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "single", "l", "border")}
      </div>
    </div>

    <!-- multiple -->
    <div class="parent">
      <div class="child right-aligned-text">multiple</div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "multiple", "s")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "multiple", "m")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "multiple", "l")}
      </div>
    </div>

    <!-- multiple selection-appearance="highlight" -->
    <div class="parent">
      <div class="child right-aligned-text">multiple selection-appearance="highlight"</div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "multiple", "s", "highlight")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "multiple", "m", "highlight")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "multiple", "l", "highlight")}
      </div>
    </div>

    <!-- multiple selection-appearance="border" (deprecated) -->
    <div class="parent">
      <div class="child right-aligned-text">multiple selection-appearance="border" (deprecated)</div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "multiple", "s", "border")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "multiple", "m", "border")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "multiple", "l", "border")}
      </div>
    </div>

    <!-- single-persist -->
    <div class="parent">
      <div class="child right-aligned-text">single-persist</div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "single-persist", "s")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "single-persist", "m")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "single-persist", "l")}
      </div>
    </div>

    <!-- none -->
    <div class="parent">
      <div class="child right-aligned-text">none</div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "none", "s")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "none", "m")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "none", "l")}
      </div>
    </div>

    <!-- links -->
    <div class="parent">
      <div class="child right-aligned-text">links</div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0,
    link: !0
  }, i, "none", "s")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0,
    link: !0
  }, i, "none", "m")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0,
    link: !0
  }, i, "none", "l")}
      </div>
    </div>

    <!-- disabled -->
    <div class="parent">
      <div class="child right-aligned-text">disabled</div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "none", "s")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "none", "m")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    icon: !0
  }, i, "none", "l")}
      </div>
    </div>

    <!-- heading -->
    <div class="parent">
      <div class="child right-aligned-text">heading</div>
      <div class="child">${e({
    heading: !0
  }, i, "none", "s")}</div>
      <div class="child">${e({
    heading: !0
  }, i, "none", "m")}</div>
      <div class="child">${e({
    heading: !0
  }, i, "none", "l")}</div>
    </div>

    <!-- heading links -->
    <div class="parent">
      <div class="child right-aligned-text">heading links</div>
      <div class="child">
        ${e({
    heading: !0,
    link: !0
  }, i, "none", "s")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    link: !0
  }, i, "none", "m")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    link: !0
  }, i, "none", "l")}
      </div>
    </div>

    <!-- description -->
    <div class="parent">
      <div class="child right-aligned-text">description</div>
      <div class="child">${e({
    description: !0
  }, i, "none", "s")}</div>
      <div class="child">${e({
    description: !0
  }, i, "none", "m")}</div>
      <div class="child">${e({
    description: !0
  }, i, "none", "l")}</div>
    </div>

    <!-- description links -->
    <div class="parent">
      <div class="child right-aligned-text">description links</div>
      <div class="child">
        ${e({
    description: !0,
    link: !0
  }, i, "none", "s")}
      </div>
      <div class="child">
        ${e({
    description: !0,
    link: !0
  }, i, "none", "m")}
      </div>
      <div class="child">
        ${e({
    description: !0,
    link: !0
  }, i, "none", "l")}
      </div>
    </div>

    <!-- heading and description -->
    <div class="parent">
      <div class="child right-aligned-text">heading and description</div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0
  }, i, "none", "s")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0
  }, i, "none", "m")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0
  }, i, "none", "l")}
      </div>
    </div>

    <!-- heading and description links -->
    <div class="parent">
      <div class="child right-aligned-text">heading and description links</div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    link: !0
  }, i, "none", "s")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    link: !0
  }, i, "none", "m")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    description: !0,
    link: !0
  }, i, "none", "l")}
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">icon and heading (large visual) + none selection mode</div>
      <div class="child">
        ${e({
    heading: !0,
    icon: !0
  }, i, "none", "s")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    icon: !0
  }, i, "none", "m")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    icon: !0
  }, i, "none", "l")}
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">icon and heading (large visual) + multiple selection mode</div>
      <div class="child">
        ${e({
    heading: !0,
    icon: !0
  }, i, "multiple", "s")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    icon: !0
  }, i, "multiple", "m")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    icon: !0
  }, i, "multiple", "l")}
      </div>
    </div>

    <!-- icon and heading (large visual) links -->
    <div class="parent">
      <div class="child right-aligned-text">icon and heading (large visual) links</div>
      <div class="child">
        ${e({
    heading: !0,
    icon: !0,
    link: !0
  }, i, "none", "s")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    icon: !0,
    link: !0
  }, i, "none", "m")}
      </div>
      <div class="child">
        ${e({
    heading: !0,
    icon: !0,
    link: !0
  }, i, "none", "l")}
      </div>
    </div>

    <!-- content-top slotted images -->
    <div class="parent">
      <div class="child right-aligned-text">content-top slotted images</div>
      <div class="child">${e({
    contentTop: !0
  }, i, "none", "s")}</div>
      <div class="child">${e({
    contentTop: !0
  }, i, "none", "m")}</div>
      <div class="child">${e({
    contentTop: !0
  }, i, "none", "l")}</div>
    </div>

    <!-- content-bottom slotted images -->
    <div class="parent">
      <div class="child right-aligned-text">content-bottom slotted images</div>
      <div class="child">${e({
    contentBottom: !0
  }, i, "none", "s")}</div>
      <div class="child">${e({
    contentBottom: !0
  }, i, "none", "m")}</div>
      <div class="child">${e({
    contentBottom: !0
  }, i, "none", "l")}</div>
    </div>

    <!-- slotted images in both slots -->
    <div class="parent">
      <div class="child right-aligned-text">slotted images in both slots</div>
      <div class="child">${e({
    contentBottom: !0,
    contentTop: !0
  }, i, "none", "s")}</div>
      <div class="child">${e({
    contentBottom: !0,
    contentTop: !0
  }, i, "none", "m")}</div>
      <div class="child">${e({
    contentBottom: !0,
    contentTop: !0
  }, i, "none", "l")}</div>
    </div>
  `;
}
const o = T("horizontal"), v = T("vertical");
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(args: TileGroupStoryArgs): string => html\`
  <calcite-tile-group
    alignment="\${args.alignment}"
    dir="\${args.dir}"
    \${boolean("disabled", args.disabled)}
    layout="\${args.layout}"
    scale="\${args.scale}"
    selection-mode="\${args.selectionMode}"
    selection-appearance="\${args.selectionAppearance}"
  >
    \${getTileHtml({
  heading: true,
  description: true,
  icon: true
})}
    \${getTileHtml({
  heading: true,
  description: true,
  icon: true
})}
    \${getTileHtml({
  heading: true,
  description: true,
  icon: true
})}
    \${getTileHtml({
  heading: true,
  description: true,
  icon: true
})}
  </calcite-tile-group>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: 'createVariantsHtmlStory("horizontal")',
      ...o.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: 'createVariantsHtmlStory("vertical")',
      ...v.parameters?.docs?.source
    }
  }
};
const I = ["simple", "allVariantsHorizontal", "allVariantsVertical"];
export {
  I as __namedExportsOrder,
  o as allVariantsHorizontal,
  v as allVariantsVertical,
  C as default,
  a as simple
};
