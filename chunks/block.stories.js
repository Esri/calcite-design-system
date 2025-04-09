import { b as c } from "./utils.js";
import { p as a } from "./placeholder-image.js";
import { h as e } from "./formatting.js";
import { A as I } from "./resources14.js";
import { p as P, a as D } from "./floating-ui.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
var w = Object.freeze, B = Object.defineProperty, A = (n, C) => w(B(n, "raw", { value: w(n.slice()) })), $;
const {
  toggleDisplay: H
} = I, V = {
  title: "Components/Block",
  args: {
    menuPlacement: D,
    heading: "Heading",
    description: "description",
    expanded: !0,
    collapsible: !0,
    loading: !1,
    disabled: !1,
    dragDisabled: !1,
    sortHandleOpen: !1,
    headingLevel: 2,
    text: "Animals",
    sectionExpanded: !0,
    toggleDisplay: H.defaultValue
  },
  argTypes: {
    menuPlacement: {
      options: P,
      control: {
        type: "select"
      }
    },
    headingLevel: {
      control: {
        type: "number",
        min: 1,
        max: 6,
        step: 1
      }
    },
    toggleDisplay: {
      options: H.values,
      control: {
        type: "select"
      }
    }
  }
}, o = (n) => e`
  <calcite-block
    heading="${n.heading}"
    description="${n.description}"
    menu-placement="${n.menuPlacement}"
    ${c("expanded", n.expanded)}
    ${c("collapsible", n.collapsible)}
    ${c("loading", n.loading)}
    ${c("disabled", n.disabled)}
    ${c("drag-disabled", n.dragDisabled)}
    ${c("sort-handle-open", n.dragDisabled)}
    heading-level="${n.headingLevel}"
  >
    <calcite-block-section
      text="${n.text}"
      ${c("expanded", n.sectionExpanded)}
      toggle-display="${n.toggleDisplay}"
    >
      <img alt="demo" src="${a({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
    <calcite-block-section text="Nature" expanded>
      <img alt="demo" src="${a({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
  </calcite-block>
`, i = () => e`
  <calcite-block heading="Heading" description="description" collapsible heading-level="2">
    <label slot="control">test <input placeholder="I'm a header control" /></label>
  </calcite-block>
`, l = () => e`
  <calcite-block heading="Heading" description="description" collapsible heading-level="2">
    <div slot="icon">✅</div>
  </calcite-block>
`, s = () => e`
  <calcite-block heading="heading" description="description" expanded collapsible disabled>
    <calcite-block-section text="Nature" expanded>
      <img alt="demo" src="${a({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
  </calcite-block>
`, r = () => e` <calcite-panel heading="Properties">
    <calcite-block
      heading="Example block heading"
      description="example summary heading"
      collapsible
      expanded
      style="--calcite-block-padding: 0;"
    >
      <div>calcite components ninja</div>
    </calcite-block>
  </calcite-panel>`, d = () => e`
  <calcite-block
    heading="Heading"
    description="description"
    expanded
    collapsible
    heading-level="2"
    class="calcite-mode-dark"
    dir="rtl"
  >
    <calcite-block-section text="Animals" expanded toggle-display="button">
      <img alt="demo" src="${a({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
    <calcite-block-section text="Nature" expanded>
      <img alt="demo" src="${a({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
  </calcite-block>
`, p = () => e`<calcite-block expanded heading="Heading" description="description" style="height: 250px">
    <div style="background: red; height: 100%;">should take full width of the content area</div>
  </calcite-block>`, m = () => e`<calcite-block heading="Heading"></calcite-block>`, g = () => e`<calcite-block description="description"></calcite-block>`, b = () => e`<calcite-block heading="Heading" description="description"></calcite-block>`, h = () => e`<calcite-block heading="Heading"><calcite-icon scale="s" slot="icon" icon="layer" /></calcite-block>`, u = () => e`<calcite-block description="description"><calcite-icon scale="s" slot="icon" icon="layer" /></calcite-block>`, k = () => e`<calcite-block heading="Heading" description="description"
    ><calcite-icon scale="s" slot="icon" icon="layer"
  /></calcite-block>`, x = () => e`
  <calcite-block heading="Block heading" expanded>
    <div>Some text that has padding built in</div>
  </calcite-block>
`, y = () => e`
  <calcite-block collapsible expanded loading heading="Layer effects" description="Adjust blur">
    <calcite-icon scale="s" slot="icon" icon="effects"></calcite-icon>
    <calcite-notice open>
      <div slot="message">Use layer effects sparingly</div>
    </calcite-notice>
  </calcite-block>
`, f = () => e`
  <calcite-block collapsible expanded loading heading="Layer effects" description="Adjust blur">
    <calcite-notice open>
      <div slot="message">Use layer effects sparingly</div>
    </calcite-notice>
  </calcite-block>
`, v = () => e`
  <calcite-panel style="width:250px">
    <calcite-block
      collapsible
      expanded
      heading="Planes, trains, and automobiles are some examples of modes of transportation"
      description="Planes, trains, and automobiles are some examples of modes of transportation"
    >
      <calcite-notice open>
        <div slot="message">Some more complex options.</div>
      </calcite-notice>
      <calcite-block-section
        expanded
        text="Planes, trains, and automobiles are some examples of modes of transportation"
      >
        <p>Block section content</p>
      </calcite-block-section>
      <calcite-block-section
        expanded
        text="Planes, trains, and automobiles are some examples of modes of transportation"
      >
        <p>Block section content</p>
      </calcite-block-section>
    </calcite-block>
    <calcite-block
      collapsible
      heading="Planes, trains, and automobiles are some examples of modes of transportation"
      description="Planes, trains, and automobiles are some examples of modes of transportation"
    >
      <calcite-notice open>
        <div slot="message">Some more complex options.</div>
      </calcite-notice>
      <calcite-block-section
        expanded
        text="Planes, trains, and automobiles are some examples of modes of transportation"
      >
        <p>Block section content</p>
      </calcite-block-section>
    </calcite-block>
  </calcite-panel>
`, S = () => e`
  <calcite-block loading heading="Valid status" description="summary" collapsible status="valid">
    <calcite-input icon="form-field" placeholder="This is valid input field"></calcite-input>
  </calcite-block>

  <calcite-block heading="Invalid status" description="summary" status="invalid"> </calcite-block>
`, t = () => e($ || ($ = A([`<style>
      calcite-block {
        height: 250px;
        overflow: hidden;
      }

      .scroll-container {
        height: 100%;
        overflow-y: scroll;
      }

      p {
        background: linear-gradient(to bottom, red, transparent);
        height: 500px;
        margin: 0;
      }
    </style>
    <calcite-block heading="Should scroll to the gradient at the bottom" expanded>
      <div class="scroll-container">
        <p></p>
      </div>
    </calcite-block>
    <script>
      (async () => {
        const block = document.querySelector("calcite-block");
        await customElements.whenDefined("calcite-block");
        await block.componentOnReady();

        const scrollContainer = document.querySelector(".scroll-container");
        scrollContainer.scrollTo(0, 500);
      })();
    <\/script>`])));
t.parameters = {
  chromatic: {
    delay: 500
  }
};
const T = () => e`<calcite-block expanded heading="Calcite block" style="width:150px">
    <calcite-block-section id="block-section" expanded text="Calcite block's super long text" toggle-display="switch">
      <calcite-notice open>
        <div slot="message">Some more complex options.</div>
      </calcite-notice>
    </calcite-block-section>
  </calcite-block>`, _ = () => e`
  <calcite-block heading="Heading" description="summary" collapsible expanded>
    <calcite-block-section
      text="Planes, trains, and automobiles are some examples of modes of transportation"
      expanded
      icon-end="pen"
      icon-start="pen"
      toggle-display="switch"
      status="valid"
    >
      <p>Block section content</p>
    </calcite-block-section>

    <calcite-block-section
      text="Planes, trains, and automobiles are some examples of modes of transportation"
      expanded
      icon-end="pen"
      icon-start="pen"
      toggle-display="button"
      status="valid"
    >
      <p>Block section content</p>
    </calcite-block-section>
  </calcite-block>
`, O = () => e`
  <h1>content-start and actions-end</h1>

  <calcite-block
    heading="Valid status"
    description="summary"
    collapsible
    icon-start="pen"
    icon-end="pen"
    style="width: 500px"
  >
    <calcite-icon
      icon="compass"
      slot="content-start"
      style="color: var(--calcite-color-status-success)"
      scale="s"
    ></calcite-icon>
    <calcite-action appearance="transparent" icon="ellipsis" text="menu" label="menu" slot="actions-end" />
  </calcite-block>

  <h1>loading and actions-end</h1>

  <calcite-block
    heading="Valid status"
    collapsible
    status="valid"
    icon-start="pen"
    icon-end="pen"
    loading
    style="width: 500px"
  >
    <calcite-action appearance="transparent" icon="ellipsis" text="menu" label="menu" slot="actions-end" />
  </calcite-block>
`;
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(args: BlockStoryArgs): string => html\`
  <calcite-block
    heading="\${args.heading}"
    description="\${args.description}"
    menu-placement="\${args.menuPlacement}"
    \${boolean("expanded", args.expanded)}
    \${boolean("collapsible", args.collapsible)}
    \${boolean("loading", args.loading)}
    \${boolean("disabled", args.disabled)}
    \${boolean("drag-disabled", args.dragDisabled)}
    \${boolean("sort-handle-open", args.dragDisabled)}
    heading-level="\${args.headingLevel}"
  >
    <calcite-block-section
      text="\${args.text}"
      \${boolean("expanded", args.sectionExpanded)}
      toggle-display="\${args.toggleDisplay}"
    >
      <img alt="demo" src="\${placeholderImage({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
    <calcite-block-section text="Nature" expanded>
      <img alt="demo" src="\${placeholderImage({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
  </calcite-block>
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
      originalSource: `(): string => html\`
  <calcite-block heading="Heading" description="description" collapsible heading-level="2">
    <label slot="control">test <input placeholder="I'm a header control" /></label>
  </calcite-block>
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
      originalSource: `(): string => html\`
  <calcite-block heading="Heading" description="description" collapsible heading-level="2">
    <div slot="icon">✅</div>
  </calcite-block>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block heading="heading" description="description" expanded collapsible disabled>
    <calcite-block-section text="Nature" expanded>
      <img alt="demo" src="\${placeholderImage({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
  </calcite-block>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-panel heading="Properties">
    <calcite-block
      heading="Example block heading"
      description="example summary heading"
      collapsible
      expanded
      style="--calcite-block-padding: 0;"
    >
      <div>calcite components ninja</div>
    </calcite-block>
  </calcite-panel>\``,
      ...r.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block
    heading="Heading"
    description="description"
    expanded
    collapsible
    heading-level="2"
    class="calcite-mode-dark"
    dir="rtl"
  >
    <calcite-block-section text="Animals" expanded toggle-display="button">
      <img alt="demo" src="\${placeholderImage({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
    <calcite-block-section text="Nature" expanded>
      <img alt="demo" src="\${placeholderImage({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
  </calcite-block>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-block expanded heading="Heading" description="description" style="height: 250px">\n    <div style="background: red; height: 100%;">should take full width of the content area</div>\n  </calcite-block>`',
      ...p.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-block heading="Heading"></calcite-block>`',
      ...m.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-block description="description"></calcite-block>`',
      ...g.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-block heading="Heading" description="description"></calcite-block>`',
      ...b.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-block heading="Heading"><calcite-icon scale="s" slot="icon" icon="layer" /></calcite-block>`',
      ...h.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-block description="description"><calcite-icon scale="s" slot="icon" icon="layer" /></calcite-block>`',
      ...u.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-block heading="Heading" description="description"\n    ><calcite-icon scale="s" slot="icon" icon="layer"\n  /></calcite-block>`',
      ...k.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block heading="Block heading" expanded>
    <div>Some text that has padding built in</div>
  </calcite-block>
\``,
      ...x.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block collapsible expanded loading heading="Layer effects" description="Adjust blur">
    <calcite-icon scale="s" slot="icon" icon="effects"></calcite-icon>
    <calcite-notice open>
      <div slot="message">Use layer effects sparingly</div>
    </calcite-notice>
  </calcite-block>
\``,
      ...y.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block collapsible expanded loading heading="Layer effects" description="Adjust blur">
    <calcite-notice open>
      <div slot="message">Use layer effects sparingly</div>
    </calcite-notice>
  </calcite-block>
\``,
      ...f.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-panel style="width:250px">
    <calcite-block
      collapsible
      expanded
      heading="Planes, trains, and automobiles are some examples of modes of transportation"
      description="Planes, trains, and automobiles are some examples of modes of transportation"
    >
      <calcite-notice open>
        <div slot="message">Some more complex options.</div>
      </calcite-notice>
      <calcite-block-section
        expanded
        text="Planes, trains, and automobiles are some examples of modes of transportation"
      >
        <p>Block section content</p>
      </calcite-block-section>
      <calcite-block-section
        expanded
        text="Planes, trains, and automobiles are some examples of modes of transportation"
      >
        <p>Block section content</p>
      </calcite-block-section>
    </calcite-block>
    <calcite-block
      collapsible
      heading="Planes, trains, and automobiles are some examples of modes of transportation"
      description="Planes, trains, and automobiles are some examples of modes of transportation"
    >
      <calcite-notice open>
        <div slot="message">Some more complex options.</div>
      </calcite-notice>
      <calcite-block-section
        expanded
        text="Planes, trains, and automobiles are some examples of modes of transportation"
      >
        <p>Block section content</p>
      </calcite-block-section>
    </calcite-block>
  </calcite-panel>
\``,
      ...v.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block loading heading="Valid status" description="summary" collapsible status="valid">
    <calcite-input icon="form-field" placeholder="This is valid input field"></calcite-input>
  </calcite-block>

  <calcite-block heading="Invalid status" description="summary" status="invalid"> </calcite-block>
\``,
      ...S.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<style>
      calcite-block {
        height: 250px;
        overflow: hidden;
      }

      .scroll-container {
        height: 100%;
        overflow-y: scroll;
      }

      p {
        background: linear-gradient(to bottom, red, transparent);
        height: 500px;
        margin: 0;
      }
    </style>
    <calcite-block heading="Should scroll to the gradient at the bottom" expanded>
      <div class="scroll-container">
        <p></p>
      </div>
    </calcite-block>
    <script>
      (async () => {
        const block = document.querySelector("calcite-block");
        await customElements.whenDefined("calcite-block");
        await block.componentOnReady();

        const scrollContainer = document.querySelector(".scroll-container");
        scrollContainer.scrollTo(0, 500);
      })();
    <\/script>\``,
      ...t.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-block expanded heading="Calcite block" style="width:150px">
    <calcite-block-section id="block-section" expanded text="Calcite block's super long text" toggle-display="switch">
      <calcite-notice open>
        <div slot="message">Some more complex options.</div>
      </calcite-notice>
    </calcite-block-section>
  </calcite-block>\``,
      ...T.parameters?.docs?.source
    }
  }
};
_.parameters = {
  ..._.parameters,
  docs: {
    ..._.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block heading="Heading" description="summary" collapsible expanded>
    <calcite-block-section
      text="Planes, trains, and automobiles are some examples of modes of transportation"
      expanded
      icon-end="pen"
      icon-start="pen"
      toggle-display="switch"
      status="valid"
    >
      <p>Block section content</p>
    </calcite-block-section>

    <calcite-block-section
      text="Planes, trains, and automobiles are some examples of modes of transportation"
      expanded
      icon-end="pen"
      icon-start="pen"
      toggle-display="button"
      status="valid"
    >
      <p>Block section content</p>
    </calcite-block-section>
  </calcite-block>
\``,
      ..._.parameters?.docs?.source
    }
  }
};
O.parameters = {
  ...O.parameters,
  docs: {
    ...O.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <h1>content-start and actions-end</h1>

  <calcite-block
    heading="Valid status"
    description="summary"
    collapsible
    icon-start="pen"
    icon-end="pen"
    style="width: 500px"
  >
    <calcite-icon
      icon="compass"
      slot="content-start"
      style="color: var(--calcite-color-status-success)"
      scale="s"
    ></calcite-icon>
    <calcite-action appearance="transparent" icon="ellipsis" text="menu" label="menu" slot="actions-end" />
  </calcite-block>

  <h1>loading and actions-end</h1>

  <calcite-block
    heading="Valid status"
    collapsible
    status="valid"
    icon-start="pen"
    icon-end="pen"
    loading
    style="width: 500px"
  >
    <calcite-action appearance="transparent" icon="ellipsis" text="menu" label="menu" slot="actions-end" />
  </calcite-block>
\``,
      ...O.parameters?.docs?.source
    }
  }
};
const R = ["simple", "withHeaderControl", "withIconAndHeader", "disabled_TestOnly", "paddingDisabled_TestOnly", "darkModeRTL_TestOnly", "contentCanTakeFullHeight_TestOnly", "alignmentHeading_TestOnly", "alignmentDescription_TestOnly", "alignmentHeadingAndDescription_TestOnly", "alignmentIconHeading_TestOnly", "alignmentIconDescription_TestOnly", "alignmentIconHeadingAndDescription_TestOnly", "contentSpacing_TestOnly", "loadingWithSlottedIcon_TestOnly", "loadingWithNoStatusNorSlottedIcon_TestOnly", "longWrappingTextInBlockAndBlockSection_TestOnly", "loadingWithStatusIcon_TestOnly", "scrollingContainerSetup_TestOnly", "toggleDisplayWithLongText_TestOnly", "icons_TestOnly", "iconStartEnd"];
export {
  R as __namedExportsOrder,
  g as alignmentDescription_TestOnly,
  b as alignmentHeadingAndDescription_TestOnly,
  m as alignmentHeading_TestOnly,
  u as alignmentIconDescription_TestOnly,
  k as alignmentIconHeadingAndDescription_TestOnly,
  h as alignmentIconHeading_TestOnly,
  p as contentCanTakeFullHeight_TestOnly,
  x as contentSpacing_TestOnly,
  d as darkModeRTL_TestOnly,
  V as default,
  s as disabled_TestOnly,
  O as iconStartEnd,
  _ as icons_TestOnly,
  f as loadingWithNoStatusNorSlottedIcon_TestOnly,
  y as loadingWithSlottedIcon_TestOnly,
  S as loadingWithStatusIcon_TestOnly,
  v as longWrappingTextInBlockAndBlockSection_TestOnly,
  r as paddingDisabled_TestOnly,
  t as scrollingContainerSetup_TestOnly,
  o as simple,
  T as toggleDisplayWithLongText_TestOnly,
  i as withHeaderControl,
  l as withIconAndHeader
};
