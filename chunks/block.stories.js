/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as B } from "./helpers.js";
import { o as w, b as a } from "./utils3.js";
import { s as t } from "./index3.js";
import { h as n } from "./formatting.js";
import { A as D } from "./resources34.js";
import { a as E } from "./floating-ui.js";
import "./block.js";
import "./block-section.js";
import "./panel.js";
import "./notice.js";
import "./icon.js";
import "./action.js";
import "./label2.js";
var P = Object.freeze, I = Object.defineProperty, R = (e, _) => P(I(e, "raw", { value: P(e.slice()) })), T;
const {
  headingLevelWithNone: W,
  placement: M,
  toggleDisplay: A,
  scale: L
} = D, Y = {
  title: "Components/Block",
  args: {
    menuPlacement: E,
    heading: "Heading",
    description: "description",
    expanded: !0,
    expandable: !0,
    loading: !1,
    disabled: !1,
    dragDisabled: !1,
    sortHandleOpen: !1,
    headingLevel: "",
    iconEnd: "",
    iconStart: "",
    text: "Animals",
    sectionExpanded: !0,
    toggleDisplay: A.defaultValue,
    scale: L.defaultValue
  },
  argTypes: {
    menuPlacement: {
      options: M.values,
      control: {
        type: "select"
      }
    },
    headingLevel: {
      options: W.values,
      control: {
        type: "select"
      }
    },
    iconStart: {
      options: ["", ...B],
      control: {
        type: "select"
      }
    },
    iconEnd: {
      options: ["", ...B],
      control: {
        type: "select"
      }
    },
    toggleDisplay: {
      options: A.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: L.values,
      control: {
        type: "select"
      }
    }
  }
}, o = (e) => n`
  <calcite-block
    heading="${e.heading}"
    description="${e.description}"
    ${w("icon-start", e.iconStart)}
    ${w("icon-end", e.iconEnd)}
    menu-placement="${e.menuPlacement}"
    ${a("expanded", e.expanded)}
    ${a("expandable", e.expandable)}
    ${a("loading", e.loading)}
    ${a("disabled", e.disabled)}
    ${a("drag-disabled", e.dragDisabled)}
    ${a("sort-handle-open", e.sortHandleOpen)}
    ${w("heading-level", e.headingLevel)}
    scale="${e.scale}"
  >
    <calcite-block-section
      text="${e.text}"
      ${a("expanded", e.sectionExpanded)}
      toggle-display="${e.toggleDisplay}"
    >
      <img alt="demo" src="${t({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
    <calcite-block-section text="Nature" expanded>
      <img alt="demo" src="${t({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
  </calcite-block>
`, i = () => n`
  <calcite-block heading="heading" description="description" expanded expandable disabled>
    <calcite-block-section text="Nature" expanded>
      <img alt="demo" src="${t({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
  </calcite-block>
`, l = () => n` <calcite-panel heading="Properties">
    <calcite-block
      heading="Example block heading"
      description="example summary heading"
      expandable
      expanded
      style="--calcite-block-padding: 0;"
    >
      <div>calcite components ninja</div>
    </calcite-block>
  </calcite-panel>`, s = () => n`
  <calcite-block
    heading="Heading"
    description="description"
    expanded
    expandable
    heading-level="2"
    class="calcite-mode-dark"
    dir="rtl"
  >
    <calcite-block-section text="Animals" expanded toggle-display="button">
      <img alt="demo" src="${t({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
    <calcite-block-section text="Nature" expanded>
      <img alt="demo" src="${t({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
  </calcite-block>
`, r = () => n`
  <style>
    calcite-block {
      --calcite-block-background-color: var(--calcite-color-transparent);
      --calcite-block-border-color: var(--calcite-color-transparent);
      --calcite-block-header-background-color-hover: var(--calcite-color-transparent-hover);
      --calcite-block-header-background-color-press: var(--calcite-color-transparent-press);
    }
  </style>
  <calcite-block-group>
    <calcite-block heading="Heading" description="Description" expandable> Block content </calcite-block>
    <calcite-block heading="Heading" description="Description" expandable expanded> Block content </calcite-block>
  </calcite-block-group>
`, d = () => n`<calcite-block expanded heading="Heading" description="description" style="height: 250px">
    <div style="background: red; height: 100%;">should take full width of the content area</div>
  </calcite-block>`, p = () => n`
  <calcite-block heading="Heading"></calcite-block>
  <br />
  <calcite-block description="description"></calcite-block>
  <br />
  <calcite-block heading="Heading" description="description"></calcite-block>
`, b = () => n`
  <calcite-block heading="Block heading" expanded>
    <div>Some text that has padding built in</div>
  </calcite-block>
`, m = () => n`
  <calcite-block expandable expanded loading heading="Layer effects" description="Adjust blur">
    With no status
  </calcite-block>
  <br />
  <calcite-block loading heading="Valid status" description="summary" expandable status="valid">
    With valid status
  </calcite-block>
  <br />
  <calcite-block heading="Invalid status" description="summary" status="invalid"> With invalid status </calcite-block>
`, g = () => n`
  <calcite-panel style="width:250px">
    <calcite-block
      expandable
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
      expandable
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
`, c = () => n(T || (T = R([`<style>
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
c.parameters = {
  chromatic: {
    delay: 500
  }
};
const k = () => n`<calcite-block expanded heading="Calcite block" style="width:150px">
    <calcite-block-section id="block-section" expanded text="Calcite block's super long text" toggle-display="switch">
      <calcite-notice open>
        <div slot="message">Some more complex options.</div>
      </calcite-notice>
    </calcite-block-section>
  </calcite-block>`, h = () => n`
  <calcite-block heading="Heading" description="summary" expandable expanded>
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
`, u = () => n`
  <h1>content-start, content-end and actions-end</h1>

  <calcite-block
    heading="Valid status"
    description="summary"
    expandable
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

    <calcite-icon
      icon="compass"
      slot="content-end"
      style="color: var(--calcite-color-status-success)"
      scale="s"
    ></calcite-icon>

    <calcite-action appearance="transparent" icon="ellipsis" text="menu" label="menu" slot="actions-end" />
  </calcite-block>

  <h1>loading and actions-end</h1>

  <calcite-block
    heading="Valid status"
    expandable
    status="valid"
    icon-start="pen"
    icon-end="pen"
    loading
    style="width: 500px"
  >
    <calcite-action appearance="transparent" icon="ellipsis" text="menu" label="menu" slot="actions-end" />
  </calcite-block>
`, H = (e) => n`
  <calcite-block
    heading="Heading"
    description="description"
    expanded
    expandable
    scale="${e}"
    icon-start="layers"
    icon-end="layers"
  >
    <calcite-action
      label="Add"
      icon="plus"
      text="Add item"
      text-enabled
      slot="header-menu-actions"
      scale="${e}"
    ></calcite-action>
    <calcite-action
      label="Add"
      icon="plus"
      text="Add item"
      text-enabled
      slot="actions-end"
      scale="${e}"
    ></calcite-action>
    <calcite-block-section text="block-section"> </calcite-block-section>
  </calcite-block>
`, x = () => n` <style>
      .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    </style>
    <div class="container">${H("s")} ${H("m")} ${H("l")}</div>`, v = () => n` <calcite-block
    icon-end="3d-building"
    heading="Layer effects"
    description="Adjust blur, highlight, and more"
    icon-start="effects"
    loading
    drag-handle
  >
    <div slot="content-start">
      <calcite-action icon="information"></calcite-action>
    </div>
    <div slot="content-end">
      <calcite-action icon="information"></calcite-action>
    </div>
    <calcite-action icon="layers" slot="actions-end"></calcite-action>
    <div slot="header-menu-actions">
      <calcite-action text="Information" icon="information" text-enabled></calcite-action>
    </div>
    <p>Block content</p>
  </calcite-block>`, y = () => n`
  <calcite-block expanded calcite-hydrated>
    <calcite-label layout="inline-space-between">
      <div>Favorite vegetable</div>
      <calcite-icon icon="information" />
    </calcite-label>
  </calcite-block>
`, f = () => n`
  <calcite-block heading="Heading" description="description" toggle-display="switch" expandable> </calcite-block>
`, C = (e = !0) => n`
  <calcite-block
    heading="Road network"
    description="Highways, arterials, and local streets"
    ${e ? 'slot="children"' : ""}
    expandable
    expanded
  >
    <calcite-block heading="County roads" description="County roads" slot="children"></calcite-block>
    <calcite-block heading="Local Streets" description="Local streets" slot="children"></calcite-block>
  </calcite-block>
`, S = () => n`
  <calcite-block heading="Transportation" description="Roads, rail, and transit overlays" expandable expanded>
    ${C()}
  </calcite-block>
  <calcite-block heading="Hydrology" description="Rivers, lakes, and watershed boundaries"></calcite-block>
`, $ = () => n`
  <calcite-block heading="Transportation" description="Roads, rail, and transit overlays" expandable expanded>
    <calcite-block-group slot="children"> ${C(!1)} </calcite-block-group>
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
    \${optionalAttribute("icon-start", args.iconStart)}
    \${optionalAttribute("icon-end", args.iconEnd)}
    menu-placement="\${args.menuPlacement}"
    \${boolean("expanded", args.expanded)}
    \${boolean("expandable", args.expandable)}
    \${boolean("loading", args.loading)}
    \${boolean("disabled", args.disabled)}
    \${boolean("drag-disabled", args.dragDisabled)}
    \${boolean("sort-handle-open", args.sortHandleOpen)}
    \${optionalAttribute("heading-level", args.headingLevel)}
    scale="\${args.scale}"
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
  <calcite-block heading="heading" description="description" expanded expandable disabled>
    <calcite-block-section text="Nature" expanded>
      <img alt="demo" src="\${placeholderImage({
  width: 320,
  height: 240
})}" />
    </calcite-block-section>
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
      originalSource: `(): string => html\` <calcite-panel heading="Properties">
    <calcite-block
      heading="Example block heading"
      description="example summary heading"
      expandable
      expanded
      style="--calcite-block-padding: 0;"
    >
      <div>calcite components ninja</div>
    </calcite-block>
  </calcite-panel>\``,
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
  <calcite-block
    heading="Heading"
    description="description"
    expanded
    expandable
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
      ...s.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    calcite-block {
      --calcite-block-background-color: var(--calcite-color-transparent);
      --calcite-block-border-color: var(--calcite-color-transparent);
      --calcite-block-header-background-color-hover: var(--calcite-color-transparent-hover);
      --calcite-block-header-background-color-press: var(--calcite-color-transparent-press);
    }
  </style>
  <calcite-block-group>
    <calcite-block heading="Heading" description="Description" expandable> Block content </calcite-block>
    <calcite-block heading="Heading" description="Description" expandable expanded> Block content </calcite-block>
  </calcite-block-group>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-block expanded heading="Heading" description="description" style="height: 250px">\n    <div style="background: red; height: 100%;">should take full width of the content area</div>\n  </calcite-block>`',
      ...d.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block heading="Heading"></calcite-block>
  <br />
  <calcite-block description="description"></calcite-block>
  <br />
  <calcite-block heading="Heading" description="description"></calcite-block>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block heading="Block heading" expanded>
    <div>Some text that has padding built in</div>
  </calcite-block>
\``,
      ...b.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block expandable expanded loading heading="Layer effects" description="Adjust blur">
    With no status
  </calcite-block>
  <br />
  <calcite-block loading heading="Valid status" description="summary" expandable status="valid">
    With valid status
  </calcite-block>
  <br />
  <calcite-block heading="Invalid status" description="summary" status="invalid"> With invalid status </calcite-block>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-panel style="width:250px">
    <calcite-block
      expandable
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
      expandable
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
      ...g.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
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
      ...c.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-block expanded heading="Calcite block" style="width:150px">
    <calcite-block-section id="block-section" expanded text="Calcite block's super long text" toggle-display="switch">
      <calcite-notice open>
        <div slot="message">Some more complex options.</div>
      </calcite-notice>
    </calcite-block-section>
  </calcite-block>\``,
      ...k.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block heading="Heading" description="summary" expandable expanded>
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
      ...h.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <h1>content-start, content-end and actions-end</h1>

  <calcite-block
    heading="Valid status"
    description="summary"
    expandable
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

    <calcite-icon
      icon="compass"
      slot="content-end"
      style="color: var(--calcite-color-status-success)"
      scale="s"
    ></calcite-icon>

    <calcite-action appearance="transparent" icon="ellipsis" text="menu" label="menu" slot="actions-end" />
  </calcite-block>

  <h1>loading and actions-end</h1>

  <calcite-block
    heading="Valid status"
    expandable
    status="valid"
    icon-start="pen"
    icon-end="pen"
    loading
    style="width: 500px"
  >
    <calcite-action appearance="transparent" icon="ellipsis" text="menu" label="menu" slot="actions-end" />
  </calcite-block>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <style>
      .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    </style>
    <div class="container">\${blockHTML("s")} \${blockHTML("m")} \${blockHTML("l")}</div>\``,
      ...x.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-block
    icon-end="3d-building"
    heading="Layer effects"
    description="Adjust blur, highlight, and more"
    icon-start="effects"
    loading
    drag-handle
  >
    <div slot="content-start">
      <calcite-action icon="information"></calcite-action>
    </div>
    <div slot="content-end">
      <calcite-action icon="information"></calcite-action>
    </div>
    <calcite-action icon="layers" slot="actions-end"></calcite-action>
    <div slot="header-menu-actions">
      <calcite-action text="Information" icon="information" text-enabled></calcite-action>
    </div>
    <p>Block content</p>
  </calcite-block>\``,
      ...v.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block expanded calcite-hydrated>
    <calcite-label layout="inline-space-between">
      <div>Favorite vegetable</div>
      <calcite-icon icon="information" />
    </calcite-label>
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
      originalSource: '(): string => html`\n  <calcite-block heading="Heading" description="description" toggle-display="switch" expandable> </calcite-block>\n`',
      ...f.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block heading="Transportation" description="Roads, rail, and transit overlays" expandable expanded>
    \${nestedBlockHTML()}
  </calcite-block>
  <calcite-block heading="Hydrology" description="Rivers, lakes, and watershed boundaries"></calcite-block>
\``,
      ...S.parameters?.docs?.source
    }
  }
};
$.parameters = {
  ...$.parameters,
  docs: {
    ...$.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-block heading="Transportation" description="Roads, rail, and transit overlays" expandable expanded>
    <calcite-block-group slot="children"> \${nestedBlockHTML(false)} </calcite-block-group>
  </calcite-block>
\``,
      ...$.parameters?.docs?.source
    }
  }
};
const Z = ["simple", "disabled", "paddingDisabled", "darkModeRTL", "transparentAppearance", "contentCanTakeFullHeight", "alignment", "contentSpacing", "loading", "longWrappingTextInBlockAndBlockSection", "scrollingContainerSetup", "toggleDisplayWithLongText", "icons", "iconStartEnd", "allScales", "nonCollapsible", "emptyHeader", "toggleDisplaySwitch", "nestedBlockInChildrenSlot", "nestedBlockGroupInChildrenSlot"];
export {
  Z as __namedExportsOrder,
  p as alignment,
  x as allScales,
  d as contentCanTakeFullHeight,
  b as contentSpacing,
  s as darkModeRTL,
  Y as default,
  i as disabled,
  y as emptyHeader,
  u as iconStartEnd,
  h as icons,
  m as loading,
  g as longWrappingTextInBlockAndBlockSection,
  $ as nestedBlockGroupInChildrenSlot,
  S as nestedBlockInChildrenSlot,
  v as nonCollapsible,
  l as paddingDisabled,
  c as scrollingContainerSetup,
  o as simple,
  f as toggleDisplaySwitch,
  k as toggleDisplayWithLongText,
  r as transparentAppearance
};
