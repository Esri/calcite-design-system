import { k as i, h as o, j as h } from "./index.js";
import { A as v } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  layout: a,
  dir: s,
  alignment: n,
  width: p,
  buttonType: c
} = v, d = {
  title: "Components/Tiles/Tile Select Group",
  args: {
    layout: a.defaultValue,
    dir: s.defaultValue,
    inputEnabled: !0,
    inputAlignment: n.defaultValue,
    width: p.defaultValue,
    type: c.defaultValue
  },
  argTypes: {
    layout: {
      options: a.values.filter((e) => e !== "inline" && e !== "center" && e !== "auto" && e !== "fixed" && e !== "none" && e !== "horizontal-single"),
      control: {
        type: "select"
      }
    },
    dir: {
      options: s.values,
      control: {
        type: "select"
      }
    },
    inputAlignment: {
      options: n.values,
      control: {
        type: "select"
      }
    },
    width: {
      options: p.values.filter((e) => e !== "half"),
      control: {
        type: "select"
      }
    },
    type: {
      options: c.values,
      control: {
        type: "select"
      }
    }
  }
}, u = () => o`
  <calcite-tile-select
    checked
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    icon="layers"
    name="light"
    input-enabled
    input-alignment="start"
    width="auto"
    type="radio"
    value="one"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile title lorem ipsum"
    icon="layers"
    name="light"
    input-enabled
    input-alignment="start"
    width="auto"
    type="radio"
    value="two"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile title lorem ipsum"
    icon="layers"
    name="light"
    input-enabled
    input-alignment="start"
    width="auto"
    type="radio"
    value="three"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum"
    icon="layers"
    name="light"
    input-enabled
    input-alignment="start"
    width="auto"
    type="radio"
    value="four"
  >
  </calcite-tile-select>
`, l = (e) => o`
  <calcite-tile-select-group layout="${e.layout}" dir="${e.dir}">
    <calcite-tile-select
      checked
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
      icon="layers"
      name="light"
      ${i("input-enabled", e.inputEnabled)}
      input-alignment="${e.inputAlignment}"
      width="${e.width}"
      type="${e.type}"
      value="one"
    >
    </calcite-tile-select>
    <calcite-tile-select
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      name="light"
      ${i("input-enabled", e.inputEnabled)}
      input-alignment="${e.inputAlignment}"
      width="${e.width}"
      type="${e.type}"
      value="two"
    >
    </calcite-tile-select>
    <calcite-tile-select
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      name="light"
      ${i("input-enabled", e.inputEnabled)}
      input-alignment="${e.inputAlignment}"
      width="${e.width}"
      type="${e.type}"
      value="three"
    >
    </calcite-tile-select>
    <calcite-tile-select
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum"
      icon="layers"
      name="light"
      ${i("input-enabled", e.inputEnabled)}
      input-alignment="${e.inputAlignment}"
      width="${e.width}"
      type="${e.type}"
      value="four"
    >
    </calcite-tile-select>
  </calcite-tile-select-group>
`, r = () => o`
  <calcite-tile-select-group layout="horizontal}" dir="ltr"> ${u()} </calcite-tile-select-group>
`, t = () => o`
  <calcite-tile-select-group layout="horizontal" dir="rtl" class="calcite-mode-dark">
    ${u()}
  </calcite-tile-select-group>
`;
t.parameters = {
  themes: h
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(args: TileSelectGroupStoryArgs): string => html\`
  <calcite-tile-select-group layout="\${args.layout}" dir="\${args.dir}">
    <calcite-tile-select
      checked
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
      icon="layers"
      name="light"
      \${boolean("input-enabled", args.inputEnabled)}
      input-alignment="\${args.inputAlignment}"
      width="\${args.width}"
      type="\${args.type}"
      value="one"
    >
    </calcite-tile-select>
    <calcite-tile-select
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      name="light"
      \${boolean("input-enabled", args.inputEnabled)}
      input-alignment="\${args.inputAlignment}"
      width="\${args.width}"
      type="\${args.type}"
      value="two"
    >
    </calcite-tile-select>
    <calcite-tile-select
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      name="light"
      \${boolean("input-enabled", args.inputEnabled)}
      input-alignment="\${args.inputAlignment}"
      width="\${args.width}"
      type="\${args.type}"
      value="three"
    >
    </calcite-tile-select>
    <calcite-tile-select
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum-Tile-title-lorem-ipsum"
      icon="layers"
      name="light"
      \${boolean("input-enabled", args.inputEnabled)}
      input-alignment="\${args.inputAlignment}"
      width="\${args.width}"
      type="\${args.type}"
      value="four"
    >
    </calcite-tile-select>
  </calcite-tile-select-group>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-tile-select-group layout="horizontal}" dir="ltr"> ${tileSelectsHTML()} </calcite-tile-select-group>\n`',
      ...r.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tile-select-group layout="horizontal" dir="rtl" class="calcite-mode-dark">
    \${tileSelectsHTML()}
  </calcite-tile-select-group>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
const f = ["simple", "disabled_TestOnly", "darkModeRTL_TestOnly"];
export {
  f as __namedExportsOrder,
  t as darkModeRTL_TestOnly,
  d as default,
  r as disabled_TestOnly,
  l as simple
};
