/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as n, o as Q, m as X } from "./utils3.js";
import { h as e } from "./formatting.js";
import { A as Z } from "./resources34.js";
import { S as a } from "./resources15.js";
import "./dialog.js";
import "./button.js";
import "./fab.js";
import "./action-bar.js";
import "./action-group.js";
import "./action.js";
import "./tooltip.js";
import "./inline-editable.js";
import "./panel.js";
import "./alert.js";
import "./shell.js";
import "./shell-panel.js";
import "./input.js";
import "./link.js";
var W = Object.freeze, ee = Object.defineProperty, N = (t, oe) => W(ee(t, "raw", { value: W(t.slice()) })), V, j;
const {
  dialogPlacement: U,
  kind: te,
  scale: i,
  overlayPositioning: Y
} = Z, ye = {
  title: "Components/Dialog",
  args: {
    open: !0,
    kind: "",
    escapeDisabled: !1,
    scale: i.defaultValue,
    widthScale: i.values[0],
    placement: U.defaultValue,
    heading: "My Dialog",
    description: "My description!",
    closeDisabled: !1,
    loading: !1,
    icon: "",
    iconFlipRtl: !1,
    menuOpen: !1,
    modal: !1,
    dragEnabled: !1,
    resizable: !1,
    fullscreenDisabled: !1,
    overlayPositioning: Y.defaultValue,
    outsideCloseDisabled: !1,
    width: i.values[0]
  },
  argTypes: {
    kind: {
      options: te.values.filter((t) => t !== "inverse" && t !== "neutral"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: i.values,
      control: {
        type: "select"
      }
    },
    widthScale: {
      options: i.values,
      control: {
        type: "select"
      }
    },
    width: {
      options: i.values,
      control: {
        type: "select"
      }
    },
    overlayPositioning: {
      options: Y.values,
      control: {
        type: "select"
      }
    },
    placement: {
      options: U.values,
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
}, ae = e` <calcite-action
    text="Action"
    label="Action"
    slot="${a.headerActionsStart}"
    icon="bluetooth"
  ></calcite-action>
  <calcite-action text="Action" label="Action" slot="${a.headerActionsEnd}" icon="attachment"></calcite-action>`, G = e` <calcite-action
    text="banana"
    text-enabled
    icon="banana"
    slot="${a.headerMenuActions}"
  ></calcite-action>
  <calcite-action text="measure" text-enabled icon="measure" slot="${a.headerMenuActions}"></calcite-action
  ><calcite-action text="search" text-enabled icon="search" slot="${a.headerMenuActions}"></calcite-action>`, s = (t) => e`
  <calcite-dialog
    ${n("drag-enabled", t.dragEnabled)}
    ${n("resizable", t.resizable)}
    ${n("modal", t.modal)}
    ${n("open", t.open)}
    ${n("menu-open", t.menuOpen)}
    ${n("loading", t.loading)}
    ${n("close-disabled", t.closeDisabled)}
    ${n("escape-disabled", t.escapeDisabled)}
    ${n("fullscreen-disabled", t.fullscreenDisabled)}
    ${n("outside-close-disabled", t.outsideCloseDisabled)}
    kind="${t.kind}"
    scale="${t.scale}"
    width-scale="${t.widthScale}"
    width="${t.width}"
    placement="${t.placement}"
    heading="${t.heading}"
    ${Q("icon", t.icon)}
    icon-flip-rtl="${t.iconFlipRtl}"
    description="${t.description}"
    overlay-positioning="${t.overlayPositioning}"
  >
    ${ae} ${G} The small modal is perfect for short confirmation dialogs or very compact
    interfaces with few elements. ${l}
  </calcite-dialog>
`, J = e`
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nisi et elit auctor aliquet ac suscipit eros. Sed nec
  nibh viverra, feugiat magna ut, posuere arcu. Curabitur varius erat ut suscipit convallis. Nullam semper pellentesque
  est laoreet accumsan. Aenean eget urna fermentum, porttitor dui et, tincidunt erat. Curabitur lacinia lacus in urna
  lacinia, ac interdum lorem fermentum. Ut accumsan malesuada varius. Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Phasellus tempus tempor magna, eu dignissim urna ornare non. Integer tempor justo blandit nunc ornare, a
  interdum nisl pharetra. Sed ultricies at augue vel fermentum. Maecenas laoreet odio lorem. Aliquam in pretium turpis.
  Donec quis felis a diam accumsan vehicula efficitur at orci. Donec sollicitudin gravida ultrices.
`, l = e`<calcite-button
    id="tooltip-button"
    slot="${a.footerStart}"
    kind="neutral"
    appearance="outline"
    icon="chevron-left"
    width="auto"
    >Back</calcite-button
  >
  <calcite-button slot="${a.footerEnd}" width="auto" appearance="outline">Cancel</calcite-button>
  <calcite-button slot="${a.footerEnd}" width="auto">Save</calcite-button>`, ne = e` <div
  style="margin: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--calcite-color-background);
        border: 1px solid var(--calcite-color-brand);
        border-radius: 5px;"
  slot="custom-content"
>
  <p>This dialog has default content replaced with custom content.</p>
  <calcite-button id="custom-content-button" appearance="transparent" scale="s">Close</calcite-button>
</div>`, d = () => e`
  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s">
    <div slot="${a.contentTop}">Slot for a content-top.</div>
    ${J}
    <div slot="${a.contentBottom}">Slot for a content-bottom.</div>
    <calcite-fab slot="${a.fab}"></calcite-fab>
    <calcite-action-bar slot="${a.actionBar}">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    ${l}
  </calcite-dialog>
`, r = () => e`
  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s" modal>
    <div slot="${a.contentTop}">Slot for a content-top.</div>
    ${J}
    <div slot="${a.contentBottom}">Slot for a content-bottom.</div>
    <calcite-fab slot="${a.fab}"></calcite-fab>
    <calcite-action-bar slot="${a.actionBar}">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    ${l}
  </calcite-dialog>
`, p = () => e`
  <calcite-dialog heading="Custom content slot dialog" open placement="cover"> ${ne} </calcite-dialog>
`, m = () => e`
  <calcite-dialog icon="banana" heading="Banana" description="This is bananas" open scale="m" width-scale="s" modal>
    Hello world!
  </calcite-dialog>
`, g = () => e`
  <calcite-dialog heading="Dialog heading" open scale="m" width-scale="s">
    <div slot="${a.headerTop}">Header top content</div>
    <p>Dialog content</p>
  </calcite-dialog>
`, h = () => e`
  <calcite-dialog
    heading="Plain heading fallback"
    description="Plain description fallback"
    open
    scale="m"
    width-scale="s"
  >
    <span slot="heading"><strong>Rich heading</strong> with <calcite-link href="#">markup</calcite-link></span>
    <span slot="description">Description with <em>inline emphasis</em> and <code>HTML</code>.</span>
    <p>Slotted content!</p>
  </calcite-dialog>
`, u = () => e`
  <calcite-dialog
    kind="brand"
    icon="banana"
    heading="Banana"
    description="This is bananas"
    open
    scale="m"
    width-scale="s"
    modal
  >
    Hello world!
  </calcite-dialog>
`, b = () => e`
  <calcite-dialog
    kind="danger"
    icon="banana"
    heading="Banana"
    description="This is bananas"
    open
    scale="m"
    width-scale="s"
    modal
  >
    Hello world!
  </calcite-dialog>
`, S = () => e`
  <calcite-dialog
    kind="info"
    icon="banana"
    heading="Banana"
    description="This is bananas"
    open
    scale="m"
    width-scale="s"
    modal
  >
    Hello world!
  </calcite-dialog>
`, w = () => e`
  <calcite-dialog
    kind="success"
    icon="banana"
    heading="Banana"
    description="This is bananas"
    open
    scale="m"
    width-scale="s"
    modal
  >
    Hello world!
  </calcite-dialog>
`, f = () => e`
  <calcite-dialog
    kind="warning"
    icon="banana"
    description="This is bananas"
    heading="Banana"
    open
    scale="m"
    width-scale="s"
    modal
  >
    Hello world!
  </calcite-dialog>
`, o = () => e`
  <calcite-dialog
    heading="My Dialog"
    class="calcite-mode-dark"
    dir="rtl"
    open
    scale="m"
    style="--calcite-dialog-size-y: 500px; --calcite-dialog-size-x: 600px;"
  >
    <p>
      The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements. You can
      customize the size using the width attribute.
    </p>
    ${l}
  </calcite-dialog>
`;
o.parameters = {
  themes: X
};
const c = () => e(V || (V = N([`
  <calcite-dialog scale="m" width-scale="s" open heading="Dialog title">
    <div>
      Dialog content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    `, `
  </calcite-dialog>
  <calcite-tooltip label="Back" reference-element="tooltip-button">Back</calcite-tooltip>
  <script>
    document.addEventListener("calciteDialogOpen", (event) => {
      document.querySelector("calcite-tooltip").open = true;
    });
  <\/script>
`])), l);
c.parameters = {
  chromatic: {
    delay: 500
  }
};
const v = () => e`
  <style>
    #three-quarters-width-header-content {
      width: 75%;
    }
  </style>
  <calcite-dialog open scale="m" width-scale="s">
    <div id="three-quarters-width-header-content" slot="${a.headerContent}">
      <calcite-inline-editable scale="l" editingEnabled="true">
        <calcite-input alignment="start" placeholder="Enter text..." scale="l" type="text" value="Editable header" />
      </calcite-inline-editable>
    </div>
    <p>Slotted content!</p>
  </calcite-dialog>
`, $ = () => e`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="${a.customContent}">Custom Content!</div>
    <p>Slotted content!</p>
  </calcite-dialog>
`, x = () => e`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <calcite-panel heading="Custom Panel" slot="${a.customContent}">Custom Panel Content!</calcite-panel>
  </calcite-dialog>
`, C = () => e`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="${a.customContent}"><calcite-panel heading="Custom Panel">Custom Panel Content!</calcite-panel></div>
  </calcite-dialog>
`, y = () => e`
  <calcite-dialog loading open modal heading="heading" description="description" scale="m" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`, T = () => e(j || (j = N([`
  <calcite-dialog
    overlay-positioning="fixed"
    open
    modal
    heading="heading"
    description="description"
    scale="m"
    width-scale="s"
  >
    <p>Slotted content!</p>
    `, `
  </calcite-dialog>
  <script>
    document.addEventListener("calciteDialogOpen", (event) => {
      event.target.menuOpen = true;
    });
  <\/script>
`])), G), k = () => e`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <calcite-action text="Action" label="Action" slot="${a.footer}" icon="attachment"></calcite-action>
    Hello world!
  </calcite-dialog>
`, D = () => e`
  <calcite-dialog open heading="heading" description="description" scale="s" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`, A = () => e`
  <calcite-dialog open heading="heading" description="description" scale="l" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`, L = () => e`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="m">
    <p>Slotted content!</p>
  </calcite-dialog>
`, B = () => e`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="l">
    <p>Slotted content!</p>
  </calcite-dialog>
`, H = () => e`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="s">
    <p>Slotted content!</p>
    <calcite-alert slot="alerts" open label="this is a default alert" scale="s">
      <div slot="title">Hello there!</div>
      <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
    </calcite-alert>
  </calcite-dialog>
`, O = () => e`
  <calcite-dialog modal placement="top" kind="brand" open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`, z = () => e`
  <calcite-dialog
    modal
    placement="top-start"
    kind="danger"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
`, P = () => e`
  <calcite-dialog
    modal
    placement="top-end"
    kind="info"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
`, E = () => e`
  <calcite-dialog
    modal
    placement="bottom"
    kind="success"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
`, M = () => e`
  <calcite-dialog
    modal
    placement="bottom-start"
    kind="warning"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
`, q = () => e`
  <calcite-dialog modal placement="bottom-end" open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`, I = () => e`
  <calcite-dialog modal open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
    <calcite-button slot="footer" width="auto" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="footer" width="auto">Save</calcite-button>
  </calcite-dialog>
`, ie = e`--calcite-dialog-scrim-background-color: purple; --calcite-dialog-size-x: 400px;
--calcite-dialog-size-y: 400px; --calcite-dialog-footer-space: 50px; --calcite-dialog-border-color: pink;
--calcite-dialog-content-space: 50px; --calcite-dialog-offset-x: 50px; --calcite-dialog-offset-y: -30px;`, R = () => e`<calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="l">
    <calcite-shell>
      <calcite-shell-panel slot="panel-start">
        <calcite-action-bar slot="action-bar" expanded>
          <calcite-action-group>
            <calcite-action text-enabled text="Action 1"></calcite-action>
            <calcite-action text-enabled text="Action 2"></calcite-action>
            <calcite-action text-enabled text="Action 3"></calcite-action>
            <calcite-action text-enabled text="Action 4"></calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
      </calcite-shell-panel>
      <calcite-shell-panel slot="panel-bottom">
        <calcite-button>button</calcite-button>
      </calcite-shell-panel>
    </calcite-shell>
    <calcite-button slot="footer-end" appearance="outline"> Cancel </calcite-button>
    <calcite-button slot="footer-end"> Save </calcite-button>
  </calcite-dialog>`, _ = () => e`<calcite-dialog
    style="--calcite-dialog-max-size-x: 100px"
    scale="s"
    open
    heading="Thisisthesongthatneverends...itkeeps goingonnd on my friends...."
    description="Heyyy"
  >
    Dialog Content
  </calcite-dialog>`, K = () => e`<calcite-dialog
    style="${ie}"
    open
    modal
    heading="heading"
    description="description"
    scale="m"
    width-scale="s"
  >
    Slotted content!
    <div slot="footer">Footer!</div>
    <calcite-fab slot="${a.fab}"></calcite-fab>
  </calcite-dialog>`, F = () => e`
  <calcite-dialog
    heading="fullscreen Disabled"
    description="This dialog cannot go fullscreen even on small screens."
    open
    fullscreen-disabled
  >
    <div>
      This dialog has <b>fullscreenDisabled</b> set to true. Resize the viewport to a small size and verify it does not
      become fullscreen.
    </div>
    <calcite-button slot="footer-end">Close</calcite-button>
  </calcite-dialog>
`;
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(args: DialogStoryArgs): string => html\`
  <calcite-dialog
    \${boolean("drag-enabled", args.dragEnabled)}
    \${boolean("resizable", args.resizable)}
    \${boolean("modal", args.modal)}
    \${boolean("open", args.open)}
    \${boolean("menu-open", args.menuOpen)}
    \${boolean("loading", args.loading)}
    \${boolean("close-disabled", args.closeDisabled)}
    \${boolean("escape-disabled", args.escapeDisabled)}
    \${boolean("fullscreen-disabled", args.fullscreenDisabled)}
    \${boolean("outside-close-disabled", args.outsideCloseDisabled)}
    kind="\${args.kind}"
    scale="\${args.scale}"
    width-scale="\${args.widthScale}"
    width="\${args.width}"
    placement="\${args.placement}"
    heading="\${args.heading}"
    \${optionalAttribute("icon", args.icon)}
    icon-flip-rtl="\${args.iconFlipRtl}"
    description="\${args.description}"
    overlay-positioning="\${args.overlayPositioning}"
  >
    \${actionsContent} \${menuActionsContent} The small modal is perfect for short confirmation dialogs or very compact
    interfaces with few elements. \${footerContent}
  </calcite-dialog>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s">
    <div slot="\${SLOTS.contentTop}">Slot for a content-top.</div>
    \${mightyLongTextToScroll}
    <div slot="\${SLOTS.contentBottom}">Slot for a content-bottom.</div>
    <calcite-fab slot="\${SLOTS.fab}"></calcite-fab>
    <calcite-action-bar slot="\${SLOTS.actionBar}">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    \${footerContent}
  </calcite-dialog>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s" modal>
    <div slot="\${SLOTS.contentTop}">Slot for a content-top.</div>
    \${mightyLongTextToScroll}
    <div slot="\${SLOTS.contentBottom}">Slot for a content-bottom.</div>
    <calcite-fab slot="\${SLOTS.fab}"></calcite-fab>
    <calcite-action-bar slot="\${SLOTS.actionBar}">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    \${footerContent}
  </calcite-dialog>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-dialog heading="Custom content slot dialog" open placement="cover"> ${customContent} </calcite-dialog>\n`',
      ...p.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog icon="banana" heading="Banana" description="This is bananas" open scale="m" width-scale="s" modal>
    Hello world!
  </calcite-dialog>
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
  <calcite-dialog heading="Dialog heading" open scale="m" width-scale="s">
    <div slot="\${SLOTS.headerTop}">Header top content</div>
    <p>Dialog content</p>
  </calcite-dialog>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog
    heading="Plain heading fallback"
    description="Plain description fallback"
    open
    scale="m"
    width-scale="s"
  >
    <span slot="heading"><strong>Rich heading</strong> with <calcite-link href="#">markup</calcite-link></span>
    <span slot="description">Description with <em>inline emphasis</em> and <code>HTML</code>.</span>
    <p>Slotted content!</p>
  </calcite-dialog>
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
  <calcite-dialog
    kind="brand"
    icon="banana"
    heading="Banana"
    description="This is bananas"
    open
    scale="m"
    width-scale="s"
    modal
  >
    Hello world!
  </calcite-dialog>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog
    kind="danger"
    icon="banana"
    heading="Banana"
    description="This is bananas"
    open
    scale="m"
    width-scale="s"
    modal
  >
    Hello world!
  </calcite-dialog>
\``,
      ...b.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog
    kind="info"
    icon="banana"
    heading="Banana"
    description="This is bananas"
    open
    scale="m"
    width-scale="s"
    modal
  >
    Hello world!
  </calcite-dialog>
\``,
      ...S.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog
    kind="success"
    icon="banana"
    heading="Banana"
    description="This is bananas"
    open
    scale="m"
    width-scale="s"
    modal
  >
    Hello world!
  </calcite-dialog>
\``,
      ...w.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog
    kind="warning"
    icon="banana"
    description="This is bananas"
    heading="Banana"
    open
    scale="m"
    width-scale="s"
    modal
  >
    Hello world!
  </calcite-dialog>
\``,
      ...f.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog
    heading="My Dialog"
    class="calcite-mode-dark"
    dir="rtl"
    open
    scale="m"
    style="--calcite-dialog-size-y: 500px; --calcite-dialog-size-x: 600px;"
  >
    <p>
      The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements. You can
      customize the size using the width attribute.
    </p>
    \${footerContent}
  </calcite-dialog>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog scale="m" width-scale="s" open heading="Dialog title">
    <div>
      Dialog content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    \${footerContent}
  </calcite-dialog>
  <calcite-tooltip label="Back" reference-element="tooltip-button">Back</calcite-tooltip>
  <script>
    document.addEventListener("calciteDialogOpen", (event) => {
      document.querySelector("calcite-tooltip").open = true;
    });
  <\/script>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    #three-quarters-width-header-content {
      width: 75%;
    }
  </style>
  <calcite-dialog open scale="m" width-scale="s">
    <div id="three-quarters-width-header-content" slot="\${SLOTS.headerContent}">
      <calcite-inline-editable scale="l" editingEnabled="true">
        <calcite-input alignment="start" placeholder="Enter text..." scale="l" type="text" value="Editable header" />
      </calcite-inline-editable>
    </div>
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...v.parameters?.docs?.source
    }
  }
};
$.parameters = {
  ...$.parameters,
  docs: {
    ...$.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="\${SLOTS.customContent}">Custom Content!</div>
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...$.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <calcite-panel heading="Custom Panel" slot="\${SLOTS.customContent}">Custom Panel Content!</calcite-panel>
  </calcite-dialog>
\``,
      ...x.parameters?.docs?.source
    }
  }
};
C.parameters = {
  ...C.parameters,
  docs: {
    ...C.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="\${SLOTS.customContent}"><calcite-panel heading="Custom Panel">Custom Panel Content!</calcite-panel></div>
  </calcite-dialog>
\``,
      ...C.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog loading open modal heading="heading" description="description" scale="m" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...y.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog
    overlay-positioning="fixed"
    open
    modal
    heading="heading"
    description="description"
    scale="m"
    width-scale="s"
  >
    <p>Slotted content!</p>
    \${menuActionsContent}
  </calcite-dialog>
  <script>
    document.addEventListener("calciteDialogOpen", (event) => {
      event.target.menuOpen = true;
    });
  <\/script>
\``,
      ...T.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <calcite-action text="Action" label="Action" slot="\${SLOTS.footer}" icon="attachment"></calcite-action>
    Hello world!
  </calcite-dialog>
\``,
      ...k.parameters?.docs?.source
    }
  }
};
D.parameters = {
  ...D.parameters,
  docs: {
    ...D.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open heading="heading" description="description" scale="s" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...D.parameters?.docs?.source
    }
  }
};
A.parameters = {
  ...A.parameters,
  docs: {
    ...A.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open heading="heading" description="description" scale="l" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...A.parameters?.docs?.source
    }
  }
};
L.parameters = {
  ...L.parameters,
  docs: {
    ...L.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="m">
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...L.parameters?.docs?.source
    }
  }
};
B.parameters = {
  ...B.parameters,
  docs: {
    ...B.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="l">
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...B.parameters?.docs?.source
    }
  }
};
H.parameters = {
  ...H.parameters,
  docs: {
    ...H.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="s">
    <p>Slotted content!</p>
    <calcite-alert slot="alerts" open label="this is a default alert" scale="s">
      <div slot="title">Hello there!</div>
      <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
    </calcite-alert>
  </calcite-dialog>
\``,
      ...H.parameters?.docs?.source
    }
  }
};
O.parameters = {
  ...O.parameters,
  docs: {
    ...O.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog modal placement="top" kind="brand" open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...O.parameters?.docs?.source
    }
  }
};
z.parameters = {
  ...z.parameters,
  docs: {
    ...z.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog
    modal
    placement="top-start"
    kind="danger"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...z.parameters?.docs?.source
    }
  }
};
P.parameters = {
  ...P.parameters,
  docs: {
    ...P.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog
    modal
    placement="top-end"
    kind="info"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...P.parameters?.docs?.source
    }
  }
};
E.parameters = {
  ...E.parameters,
  docs: {
    ...E.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog
    modal
    placement="bottom"
    kind="success"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...E.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog
    modal
    placement="bottom-start"
    kind="warning"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...M.parameters?.docs?.source
    }
  }
};
q.parameters = {
  ...q.parameters,
  docs: {
    ...q.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog modal placement="bottom-end" open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...q.parameters?.docs?.source
    }
  }
};
I.parameters = {
  ...I.parameters,
  docs: {
    ...I.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog modal open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
    <calcite-button slot="footer" width="auto" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="footer" width="auto">Save</calcite-button>
  </calcite-dialog>
\``,
      ...I.parameters?.docs?.source
    }
  }
};
R.parameters = {
  ...R.parameters,
  docs: {
    ...R.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="l">
    <calcite-shell>
      <calcite-shell-panel slot="panel-start">
        <calcite-action-bar slot="action-bar" expanded>
          <calcite-action-group>
            <calcite-action text-enabled text="Action 1"></calcite-action>
            <calcite-action text-enabled text="Action 2"></calcite-action>
            <calcite-action text-enabled text="Action 3"></calcite-action>
            <calcite-action text-enabled text="Action 4"></calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
      </calcite-shell-panel>
      <calcite-shell-panel slot="panel-bottom">
        <calcite-button>button</calcite-button>
      </calcite-shell-panel>
    </calcite-shell>
    <calcite-button slot="footer-end" appearance="outline"> Cancel </calcite-button>
    <calcite-button slot="footer-end"> Save </calcite-button>
  </calcite-dialog>\``,
      ...R.parameters?.docs?.source
    }
  }
};
_.parameters = {
  ..._.parameters,
  docs: {
    ..._.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-dialog
    style="--calcite-dialog-max-size-x: 100px"
    scale="s"
    open
    heading="Thisisthesongthatneverends...itkeeps goingonnd on my friends...."
    description="Heyyy"
  >
    Dialog Content
  </calcite-dialog>\``,
      ..._.parameters?.docs?.source
    }
  }
};
K.parameters = {
  ...K.parameters,
  docs: {
    ...K.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-dialog
    style="\${themedStyle}"
    open
    modal
    heading="heading"
    description="description"
    scale="m"
    width-scale="s"
  >
    Slotted content!
    <div slot="footer">Footer!</div>
    <calcite-fab slot="\${SLOTS.fab}"></calcite-fab>
  </calcite-dialog>\``,
      ...K.parameters?.docs?.source
    }
  }
};
F.parameters = {
  ...F.parameters,
  docs: {
    ...F.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog
    heading="fullscreen Disabled"
    description="This dialog cannot go fullscreen even on small screens."
    open
    fullscreen-disabled
  >
    <div>
      This dialog has <b>fullscreenDisabled</b> set to true. Resize the viewport to a small size and verify it does not
      become fullscreen.
    </div>
    <calcite-button slot="footer-end">Close</calcite-button>
  </calcite-dialog>
\``,
      ...F.parameters?.docs?.source
    }
  }
};
const Te = ["simple", "slots", "slotsWithModal", "customContentSlot", "withIcon", "withHeaderTop", "withRichHeaderSlots", "withKindBrandIcon", "withKindDangerIcon", "withKindInfoIcon", "withKindSuccessIcon", "withKindWarningIcon", "darkModeRTLCustomSizeCSSVars", "withTooltips", "withCustomHeader", "withCustomContent", "withCustomContentPanel", "withCustomContentDivPanel", "loading", "menuOpen", "withFooter", "scaleS", "scaleL", "widthScaleM", "widthScaleL", "withAlertsSlot", "placementTop", "placementTopStart", "placementTopEnd", "placementBottom", "placementBottomStart", "placementBottomEnd", "footerSlot", "withShellInside", "withWrappingHeaderText", "themed", "fullscreenDisabled"];
export {
  Te as __namedExportsOrder,
  p as customContentSlot,
  o as darkModeRTLCustomSizeCSSVars,
  ye as default,
  I as footerSlot,
  F as fullscreenDisabled,
  y as loading,
  T as menuOpen,
  E as placementBottom,
  q as placementBottomEnd,
  M as placementBottomStart,
  O as placementTop,
  P as placementTopEnd,
  z as placementTopStart,
  A as scaleL,
  D as scaleS,
  s as simple,
  d as slots,
  r as slotsWithModal,
  K as themed,
  B as widthScaleL,
  L as widthScaleM,
  H as withAlertsSlot,
  $ as withCustomContent,
  C as withCustomContentDivPanel,
  x as withCustomContentPanel,
  v as withCustomHeader,
  k as withFooter,
  g as withHeaderTop,
  m as withIcon,
  u as withKindBrandIcon,
  b as withKindDangerIcon,
  S as withKindInfoIcon,
  w as withKindSuccessIcon,
  f as withKindWarningIcon,
  h as withRichHeaderSlots,
  R as withShellInside,
  c as withTooltips,
  _ as withWrappingHeaderText
};
