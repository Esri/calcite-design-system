import { k as b, h as n } from "./index.js";
import { p as m } from "./placeholder-image.js";
import { A as H } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  dir: $,
  layout: f,
  scale: x
} = H, z = {
  title: "Components/Tiles/Tile Group",
  args: {
    dir: $.defaultValue,
    disabled: !1,
    layout: f.defaultValue,
    scale: x.defaultValue
  },
  argTypes: {
    dir: {
      options: $.values,
      control: {
        type: "select"
      }
    },
    layout: {
      options: f.values.filter((i) => i !== "grid" && i !== "inline" && i !== "center" && i !== "auto" && i !== "fixed" && i !== "none" && i !== "horizontal-single"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: x.values,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      delay: 1e4,
      viewports: [1728]
    }
  }
};
function e(i = {}, v, s = "none", d) {
  return n`
    <calcite-tile-group layout="${v}" selection-mode="${s}" scale="${d}">
      ${Array(4).fill(null).map((h, t) => {
    let l = !1;
    return s === "single" ? l = t === (d === "s" ? 0 : d === "m" ? 1 : 2) : s === "multiple" && (l = d === "s" ? (
      // select even tiles
      t % 2 === 0
    ) : (
      // select odd tiles
      d === "m" ? t % 2 !== 0 : (
        // select all except for the 3rd tile
        t !== 2
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
    contentBottom: v = !1,
    contentTop: s = !1,
    description: d = !1,
    heading: h = !1,
    icon: t = !1,
    link: l = !1,
    selected: T = !1
  } = i, g = 275, u = 100, p = [s ? n`<img src="${m({
    width: g,
    height: u
  })}" slot="content-top" />` : "", v ? n`<img src="${m({
    width: g,
    height: u
  })}" slot="content-bottom" />` : ""];
  return n`
    <calcite-tile
      ${h ? 'heading="Tile heading"' : ""}
      ${d ? 'description="This is sort of a medium length description."' : ""}
      ${l ? 'href="/"' : ""}
      ${t ? 'icon="layers"' : ""}
      ${T ? "selected" : ""}
    >
      ${p.length > 0 ? p.join(`
`) : ""}
    </calcite-tile>
  `;
}
const c = (i) => n`
  <calcite-tile-group
    dir="${i.dir}"
    ${b("disabled", i.disabled)}
    layout="${i.layout}"
    scale="${i.scale}"
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
function k(i) {
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

    <!-- single selection-appearance="border" -->
    <div class="parent">
      <div class="child right-aligned-text">single selection-appearance="border"</div>
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
const a = k("horizontal"), o = k("vertical");
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(args: TileGroupStoryArgs): string => html\`
  <calcite-tile-group
    dir="\${args.dir}"
    \${boolean("disabled", args.disabled)}
    layout="\${args.layout}"
    scale="\${args.scale}"
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
      ...c.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: 'createVariantsHtmlStory("horizontal")',
      ...a.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: 'createVariantsHtmlStory("vertical")',
      ...o.parameters?.docs?.source
    }
  }
};
const w = ["simple", "allVariantsHorizontal", "allVariantsVertical"];
export {
  w as __namedExportsOrder,
  a as allVariantsHorizontal,
  o as allVariantsVertical,
  z as default,
  c as simple
};
