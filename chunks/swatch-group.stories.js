/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as h, m as o } from "./utils3.js";
import { h as i } from "./formatting.js";
import { A as r } from "./resources34.js";
import { s as a } from "./index3.js";
import "./swatch.js";
import "./swatch-group.js";
const {
  selectionMode: l,
  scale: s
} = r, p = {
  title: "Components/Swatch Group",
  args: {
    disabled: !1,
    selectionMode: l.defaultValue,
    scale: s.defaultValue
  },
  argTypes: {
    selectionMode: {
      options: l.values.filter((c) => c !== "children" && c !== "multichildren" && c !== "ancestors"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: s.values,
      control: {
        type: "select"
      }
    }
  }
}, e = (c) => i`
  <calcite-swatch-group
    ${h("disabled", c.disabled)}
    selection-mode="${c.selectionMode}"
    scale="${c.scale}"
  >
    <calcite-swatch value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#ff0000" value="calcite swatch"></calcite-swatch>
    <calcite-swatch value="calcite swatch">
      <img
        src="${a({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
    <calcite-swatch color="rgba(250,210,150,0.2)" value="calcite swatch"> </calcite-swatch>
    <calcite-swatch value="calcite swatch">
      <img
        src="${a({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
    <calcite-swatch selected color="rgba(25,25,25,0.1)" value="calcite swatch"></calcite-swatch>
    <calcite-swatch disabled color="#ddd" value="calcite swatch">
      <img
        src="${a({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
    <calcite-swatch disabled color="#ff00ee" value="calcite swatch"> </calcite-swatch>
  </calcite-swatch-group>
`, t = () => i`
  <div dir="rtl">
    <calcite-swatch-group>
      <calcite-swatch value="calcite swatch"></calcite-swatch>
      <calcite-swatch color="#ff0000" value="calcite swatch"></calcite-swatch>
      <calcite-swatch value="calcite swatch">
        <img
          src="${a({
  width: 24,
  height: 24
})}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch color="rgba(250,210,150,0.2)" value="calcite swatch">
        <img
          src="${a({
  width: 24,
  height: 24
})}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch value="calcite swatch">
        <img
          src="${a({
  width: 24,
  height: 24
})}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch selected color="rgba(25,25,25,0.1)" value="calcite swatch"></calcite-swatch>
      <calcite-swatch disabled color="#ddd" value="calcite swatch">
        <img
          src="${a({
  width: 24,
  height: 24
})}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch disabled color="#ff00ee" value="calcite swatch"> </calcite-swatch>
    </calcite-swatch-group>
  </div>
`;
t.parameters = {
  themes: o
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(args: SwatchGroupStoryArgs): string => html\`
  <calcite-swatch-group
    \${boolean("disabled", args.disabled)}
    selection-mode="\${args.selectionMode}"
    scale="\${args.scale}"
  >
    <calcite-swatch value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#ff0000" value="calcite swatch"></calcite-swatch>
    <calcite-swatch value="calcite swatch">
      <img
        src="\${placeholderImage({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
    <calcite-swatch color="rgba(250,210,150,0.2)" value="calcite swatch"> </calcite-swatch>
    <calcite-swatch value="calcite swatch">
      <img
        src="\${placeholderImage({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
    <calcite-swatch selected color="rgba(25,25,25,0.1)" value="calcite swatch"></calcite-swatch>
    <calcite-swatch disabled color="#ddd" value="calcite swatch">
      <img
        src="\${placeholderImage({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
    <calcite-swatch disabled color="#ff00ee" value="calcite swatch"> </calcite-swatch>
  </calcite-swatch-group>
\``,
      ...e.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div dir="rtl">
    <calcite-swatch-group>
      <calcite-swatch value="calcite swatch"></calcite-swatch>
      <calcite-swatch color="#ff0000" value="calcite swatch"></calcite-swatch>
      <calcite-swatch value="calcite swatch">
        <img
          src="\${placeholderImage({
  width: 24,
  height: 24
})}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch color="rgba(250,210,150,0.2)" value="calcite swatch">
        <img
          src="\${placeholderImage({
  width: 24,
  height: 24
})}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch value="calcite swatch">
        <img
          src="\${placeholderImage({
  width: 24,
  height: 24
})}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch selected color="rgba(25,25,25,0.1)" value="calcite swatch"></calcite-swatch>
      <calcite-swatch disabled color="#ddd" value="calcite swatch">
        <img
          src="\${placeholderImage({
  width: 24,
  height: 24
})}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch disabled color="#ff00ee" value="calcite swatch"> </calcite-swatch>
    </calcite-swatch-group>
  </div>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
const v = ["simple", "darkThemeRTL"];
export {
  v as __namedExportsOrder,
  t as darkThemeRTL,
  p as default,
  e as simple
};
