import { h as i, j as h } from "./index.js";
import { A as o } from "./resources16.js";
import { p as c } from "./placeholder-image.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  selectionMode: l,
  scale: s
} = o, d = {
  title: "Components/Swatch Group",
  args: {
    selectionMode: l.defaultValue,
    scale: s.defaultValue
  },
  argTypes: {
    selectionMode: {
      options: l.values.filter((a) => a !== "children" && a !== "multichildren" && a !== "ancestors"),
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
}, e = (a) => i`
  <calcite-swatch-group selection-mode="${a.selectionMode}" scale="${a.scale}">
    <calcite-swatch value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#ff0000" value="calcite swatch"></calcite-swatch>
    <calcite-swatch value="calcite swatch">
      <img
        src="${c({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
    <calcite-swatch color="rgba(250,210,150,0.2)" value="calcite swatch"> </calcite-swatch>
    <calcite-swatch value="calcite swatch">
      <img
        src="${c({
  width: 24,
  height: 24
})}"
        slot="image"
      />
    </calcite-swatch>
    <calcite-swatch selected color="rgba(25,25,25,0.1)" value="calcite swatch"></calcite-swatch>
    <calcite-swatch disabled color="#ddd" value="calcite swatch">
      <img
        src="${c({
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
          src="${c({
  width: 24,
  height: 24
})}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch color="rgba(250,210,150,0.2)" value="calcite swatch">
        <img
          src="${c({
  width: 24,
  height: 24
})}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch value="calcite swatch">
        <img
          src="${c({
  width: 24,
  height: 24
})}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch selected color="rgba(25,25,25,0.1)" value="calcite swatch"></calcite-swatch>
      <calcite-swatch disabled color="#ddd" value="calcite swatch">
        <img
          src="${c({
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
  themes: h
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(args: SwatchGroupStoryArgs): string => html\`
  <calcite-swatch-group selection-mode="\${args.selectionMode}" scale="\${args.scale}">
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
const g = ["simple", "darkThemeRTL_TestOnly"];
export {
  g as __namedExportsOrder,
  t as darkThemeRTL_TestOnly,
  d as default,
  e as simple
};
