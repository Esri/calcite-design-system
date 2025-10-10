import { p as d } from "./placeholder-image.js";
import { k as b, h as e, j as T } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const f = {
  title: "Components/Tips/Tip Manager",
  args: {
    closed: !1
  }
}, h = e`
  <calcite-tip-group group-title="Astronomy">
    <calcite-tip heading="The Red Rocks and Blue Water" heading-level="2">
      <img slot="thumbnail" src="${d({
  width: 1e3,
  height: 600
})}" alt="This is an image." />
      <p>
        This tip is how a tip should really look. It has a landscape or square image and a small amount of text content.
        This paragraph is in an "info" slot.
      </p>
      <p>
        This is another paragraph in a subsequent "info" slot. In publishing and graphic design, Lorem ipsum is a
        placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful
        content (also called greeking). Replacing the actual content with placeholder text allows designers to design
        the form of the content before the content itself has been produced.
      </p>
      <a href="http://www.esri.com">This is the "link" slot.</a>
    </calcite-tip>
    <calcite-tip heading="The Long Trees">
      <img slot="thumbnail" src="${d({
  width: 1e3,
  height: 600
})}" alt="This is an image." />
      <p>This tip has an image that is a pretty tall. And the text will run out before the end of the image.</p>
      <p>In astronomy, the terms object and body are often used interchangeably.</p>
      <a href="http://www.esri.com">View Esri</a>
    </calcite-tip>
  </calcite-tip-group>
  <calcite-tip heading="Square Nature">
    <img slot="thumbnail" src="${d({
  width: 1e3,
  height: 1e3
})}" alt="This is an image." />
    <p>This tip has an image that is square. And the text will run out before the end of the image.</p>
    <p>In astronomy, the terms object and body are often used interchangeably.</p>
    <p>
      In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form
      of a document without relying on meaningful content (also called greeking). Replacing the actual content with
      placeholder text allows designers to design the form of the content before the content itself has been produced.
    </p>
    <a href="http://www.esri.com">View Esri</a>
  </calcite-tip>
  <calcite-tip heading="The lack of imagery">
    <p>This tip has no image. As such, the content area will take up the entire width of the tip.</p>
    <p>
      This is the next paragraph and should show how wide the content area is now. Of course, the width of the overall
      tip will affect things. In astronomy, the terms object and body are often used interchangeably.
    </p>
    <a href="http://www.esri.com">View Esri</a>
  </calcite-tip>
`, a = (u) => e`
  <calcite-tip-manager ${b("closed", u.closed)}> ${h} </calcite-tip-manager>
`, t = () => e`
  <calcite-tip-manager dir="rtl" class="calcite-mode-dark">${h}</calcite-tip-manager>
`;
t.parameters = {
  themes: T
};
const i = () => e`<calcite-tip-manager>
    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>
  </calcite-tip-manager>`, c = () => e`<calcite-tip-manager>
    <calcite-tip-group group-title="Group Title"
      ><calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip></calcite-tip-group
    >
  </calcite-tip-manager>`, r = () => e`<calcite-tip-manager style="width:500px; --calcite-tip-max-width:200px;">
    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>
  </calcite-tip-manager>`, n = () => e`<calcite-tip-manager style="width:500px; --calcite-tip-max-width:200px;">
    <calcite-tip-group group-title="Group Title"
      ><calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip></calcite-tip-group
    >
  </calcite-tip-manager>`, p = () => e`<calcite-tip-manager heading-level="1" lang="he">
    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>
  </calcite-tip-manager>`, s = () => e`<calcite-tip-manager lang="nb"
    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager
  >`, l = () => e`<calcite-tip-manager lang="fr"
    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager
  >`, o = () => e`<calcite-tip-manager lang="zh-HK"
    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager
  >`, g = () => e`<calcite-tip-manager>
<calcite-tip-group group-title="Tip Manager heading">
    <calcite-tip heading="Example tip title">
    <calcite-tip><p>basic render</p></calcite-tip>
</calcite-tip-group>
</calcite-tip-manager>`, m = () => e`<calcite-tip-manager heading-level="1" lang="bs">
    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>
  </calcite-tip-manager>`;
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: '(args: TipManagerStoryArgs): string => html`\n  <calcite-tip-manager ${boolean("closed", args.closed)}> ${tipContent} </calcite-tip-manager>\n`',
      ...a.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-tip-manager dir="rtl" class="calcite-mode-dark">${tipContent}</calcite-tip-manager>\n`',
      ...t.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-tip-manager>\n    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>\n  </calcite-tip-manager>`',
      ...i.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-tip-manager>
    <calcite-tip-group group-title="Group Title"
      ><calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip></calcite-tip-group
    >
  </calcite-tip-manager>\``,
      ...c.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-tip-manager style="width:500px; --calcite-tip-max-width:200px;">\n    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>\n  </calcite-tip-manager>`',
      ...r.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-tip-manager style="width:500px; --calcite-tip-max-width:200px;">
    <calcite-tip-group group-title="Group Title"
      ><calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip></calcite-tip-group
    >
  </calcite-tip-manager>\``,
      ...n.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-tip-manager heading-level="1" lang="he">\n    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>\n  </calcite-tip-manager>`',
      ...p.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-tip-manager lang="nb"\n    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager\n  >`',
      ...s.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-tip-manager lang="fr"\n    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager\n  >`',
      ...l.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-tip-manager lang="zh-HK"\n    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager\n  >`',
      ...o.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-tip-manager>
<calcite-tip-group group-title="Tip Manager heading">
    <calcite-tip heading="Example tip title">
    <calcite-tip><p>basic render</p></calcite-tip>
</calcite-tip-group>
</calcite-tip-manager>\``,
      ...g.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-tip-manager heading-level="1" lang="bs">\n    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>\n  </calcite-tip-manager>`',
      ...m.parameters?.docs?.source
    }
  }
};
const x = ["simple", "darkModeRTL_TestOnly", "tipWithoutGroup_TestOnly", "tipWithGroup_TestOnly", "tipWithoutGroupMaxWidth_TestOnly", "tipWithGroupMaxWidth_TestOnly", "hebrewLocale_TestOnly", "norwegianLocale_TestOnly", "FrenchLocale_TestOnly", "hongKongLocale_TestOnly", "ukrainianLocaleWithTipGroup_TestOnly", "bosnianLocale_TestOnly"];
export {
  l as FrenchLocale_TestOnly,
  x as __namedExportsOrder,
  m as bosnianLocale_TestOnly,
  t as darkModeRTL_TestOnly,
  f as default,
  p as hebrewLocale_TestOnly,
  o as hongKongLocale_TestOnly,
  s as norwegianLocale_TestOnly,
  a as simple,
  n as tipWithGroupMaxWidth_TestOnly,
  c as tipWithGroup_TestOnly,
  r as tipWithoutGroupMaxWidth_TestOnly,
  i as tipWithoutGroup_TestOnly,
  g as ukrainianLocaleWithTipGroup_TestOnly
};
