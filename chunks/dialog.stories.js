import { k as n, h as e, j as V } from "./index.js";
import { A as U } from "./resources16.js";
import { d as j, S as t } from "./resources8.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  kind: _,
  scale: s,
  overlayPositioning: F
} = U, Z = {
  title: "Components/Dialog",
  args: {
    open: !0,
    kind: "",
    escapeDisabled: !1,
    scale: s.defaultValue,
    widthScale: s.values[0],
    placement: "center",
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
    overlayPositioning: F.defaultValue,
    outsideCloseDisabled: !1
  },
  argTypes: {
    kind: {
      options: _.values.filter((a) => a !== "inverse" && a !== "neutral"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: s.values,
      control: {
        type: "select"
      }
    },
    widthScale: {
      options: s.values,
      control: {
        type: "select"
      }
    },
    overlayPositioning: {
      options: F.values,
      control: {
        type: "select"
      }
    },
    placement: {
      options: j,
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
}, Y = e` <calcite-action
    text="Action"
    label="Action"
    slot="${t.headerActionsStart}"
    icon="bluetooth"
  ></calcite-action>
  <calcite-action text="Action" label="Action" slot="${t.headerActionsEnd}" icon="attachment"></calcite-action>`, R = e` <calcite-action
    text="banana"
    text-enabled
    icon="banana"
    slot="${t.headerMenuActions}"
  ></calcite-action>
  <calcite-action text="measure" text-enabled icon="measure" slot="${t.headerMenuActions}"></calcite-action
  ><calcite-action text="search" text-enabled icon="search" slot="${t.headerMenuActions}"></calcite-action>`, d = (a) => e`
  <calcite-dialog
    ${n("drag-enabled", a.dragEnabled)}
    ${n("resizable", a.resizable)}
    ${n("modal", a.modal)}
    ${n("open", a.open)}
    ${n("menu-open", a.menuOpen)}
    ${n("loading", a.loading)}
    ${n("close-disabled", a.closeDisabled)}
    ${n("escape-disabled", a.escapeDisabled)}
    ${n("outside-close-disabled", a.outsideCloseDisabled)}
    kind="${a.kind}"
    scale="${a.scale}"
    width-scale="${a.widthScale}"
    placement="${a.placement}"
    heading="${a.heading}"
    icon="${a.icon}"
    icon-flip-rtl="${a.iconFlipRtl}"
    description="${a.description}"
    overlay-positioning="${a.overlayPositioning}"
  >
    ${Y} ${R} The small modal is perfect for short confirmation dialogs or very compact
    interfaces with few elements. ${l}
  </calcite-dialog>
`, W = e`
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nisi et elit auctor aliquet ac suscipit eros. Sed nec
  nibh viverra, feugiat magna ut, posuere arcu. Curabitur varius erat ut suscipit convallis. Nullam semper pellentesque
  est laoreet accumsan. Aenean eget urna fermentum, porttitor dui et, tincidunt erat. Curabitur lacinia lacus in urna
  lacinia, ac interdum lorem fermentum. Ut accumsan malesuada varius. Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Phasellus tempus tempor magna, eu dignissim urna ornare non. Integer tempor justo blandit nunc ornare, a
  interdum nisl pharetra. Sed ultricies at augue vel fermentum. Maecenas laoreet odio lorem. Aliquam in pretium turpis.
  Donec quis felis a diam accumsan vehicula efficitur at orci. Donec sollicitudin gravida ultrices.
`, l = e`<calcite-button
    id="tooltip-button"
    slot="${t.footerStart}"
    kind="neutral"
    appearance="outline"
    icon="chevron-left"
    width="auto"
    >Back</calcite-button
  >
  <calcite-button slot="${t.footerEnd}" width="auto" appearance="outline">Cancel</calcite-button>
  <calcite-button slot="${t.footerEnd}" width="auto">Save</calcite-button>`, N = e` <div
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
</div>`, r = () => e`
  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s">
    <div slot="${t.contentTop}">Slot for a content-top.</div>
    ${W}
    <div slot="${t.contentBottom}">Slot for a content-bottom.</div>
    <calcite-fab slot="${t.fab}"></calcite-fab>
    <calcite-action-bar slot="${t.actionBar}">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    ${l}
  </calcite-dialog>
`, p = () => e`
  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s" modal>
    <div slot="${t.contentTop}">Slot for a content-top.</div>
    ${W}
    <div slot="${t.contentBottom}">Slot for a content-bottom.</div>
    <calcite-fab slot="${t.fab}"></calcite-fab>
    <calcite-action-bar slot="${t.actionBar}">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    ${l}
  </calcite-dialog>
`, m = () => e`
  <calcite-dialog heading="Custom content slot dialog" open placement="cover"> ${N} </calcite-dialog>
`, g = () => e`
  <calcite-dialog icon="banana" heading="Banana" description="This is bananas" open scale="m" width-scale="s" modal>
    Hello world!
  </calcite-dialog>
`, h = () => e`
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
`, u = () => e`
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
`, b = () => e`
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
`, S = () => e`
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
`, w = () => e`
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
`, i = () => e`
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
i.parameters = {
  themes: V
};
const o = () => e`
  <calcite-tooltip style="--calcite-tooltip-z-index: 600;" open label="Open modal" reference-element="button"
    >Open modal</calcite-tooltip
  >
  <calcite-dialog scale="m" width-scale="s" open heading="Dialog title">
    <div>
      Dialog content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    ${l}
  </calcite-dialog>
  <calcite-tooltip open label="Back" reference-element="tooltip-button">Back</calcite-tooltip>
`;
o.parameters = {
  chromatic: {
    delay: 500
  }
};
const f = () => e`
  <style>
    #three-quarters-width-header-content {
      width: 75%;
    }
  </style>
  <calcite-dialog open scale="m" width-scale="s">
    <div id="three-quarters-width-header-content" slot="${t.headerContent}">
      <calcite-inline-editable scale="l" editingEnabled="true">
        <calcite-input alignment="start" placeholder="Enter text..." scale="l" type="text" value="Editable header" />
      </calcite-inline-editable>
    </div>
    <p>Slotted content!</p>
  </calcite-dialog>
`, v = () => e`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="${t.content}">Custom Content!</div>
    <p>Slotted content!</p>
  </calcite-dialog>
`, $ = () => e`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <calcite-panel heading="Custom Panel" slot="${t.content}">Custom Panel Content!</calcite-panel>
  </calcite-dialog>
`, x = () => e`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="${t.content}"><calcite-panel heading="Custom Panel">Custom Panel Content!</calcite-panel></div>
  </calcite-dialog>
`, y = () => e`
  <calcite-dialog loading open modal heading="heading" description="description" scale="m" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`, C = () => e`
  <calcite-dialog
    overlay-positioning="fixed"
    menu-open
    open
    modal
    heading="heading"
    description="description"
    scale="m"
    width-scale="s"
  >
    <p>Slotted content!</p>
    ${R}
  </calcite-dialog>
`, T = () => e`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <calcite-action text="Action" label="Action" slot="${t.footer}" icon="attachment"></calcite-action>
    Hello world!
  </calcite-dialog>
`, k = () => e`
  <calcite-dialog open heading="heading" description="description" scale="s" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`, A = () => e`
  <calcite-dialog open heading="heading" description="description" scale="l" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`, B = () => e`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="m">
    <p>Slotted content!</p>
  </calcite-dialog>
`, D = () => e`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="l">
    <p>Slotted content!</p>
  </calcite-dialog>
`, L = () => e`
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
`, H = () => e`
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
`, z = () => e`
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
`, P = () => e`
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
`, E = () => e`
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
`, I = () => e`
  <calcite-dialog modal placement="bottom-end" open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`, M = () => e`
  <calcite-dialog modal open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
    <calcite-button slot="footer" width="auto" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="footer" width="auto">Save</calcite-button>
  </calcite-dialog>
`, G = e`--calcite-dialog-scrim-background-color: purple; --calcite-dialog-size-x: 400px;
--calcite-dialog-size-y: 400px; --calcite-dialog-footer-space: 50px; --calcite-dialog-border-color: pink;
--calcite-dialog-content-space: 50px; --calcite-dialog-offset-x: 50px; --calcite-dialog-offset-y: -30px;`, q = () => e`<calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="l">
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
      <calcite-shell-center-row>
        <calcite-button>button</calcite-button>
      </calcite-shell-center-row>
    </calcite-shell>
    <calcite-button slot="footer-end" appearance="outline"> Cancel </calcite-button>
    <calcite-button slot="footer-end"> Save </calcite-button>
  </calcite-dialog>`, c = () => e`<calcite-dialog
    style="--calcite-dialog-max-size-x: 100px"
    scale="s"
    open
    heading="Thisisthesongthatneverends...itkeeps goingonnd on my friends...."
    description="Heyyy"
  >
    Dialog Content
  </calcite-dialog>`;
c.parameters = {
  chromatic: {
    delay: 1e3,
    modes: {
      specific: {
        viewport: {
          width: 1200,
          height: 1200
        }
      }
    },
    cropToViewport: !0
  }
};
const K = () => e`<calcite-dialog
    style="${G}"
    open
    modal
    heading="heading"
    description="description"
    scale="m"
    width-scale="s"
  >
    Slotted content!
    <div slot="footer">Footer!</div>
    <calcite-fab slot="${t.fab}"></calcite-fab>
  </calcite-dialog>`;
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
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
    \${boolean("outside-close-disabled", args.outsideCloseDisabled)}
    kind="\${args.kind}"
    scale="\${args.scale}"
    width-scale="\${args.widthScale}"
    placement="\${args.placement}"
    heading="\${args.heading}"
    icon="\${args.icon}"
    icon-flip-rtl="\${args.iconFlipRtl}"
    description="\${args.description}"
    overlay-positioning="\${args.overlayPositioning}"
  >
    \${actionsContent} \${menuActionsContent} The small modal is perfect for short confirmation dialogs or very compact
    interfaces with few elements. \${footerContent}
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
      ...r.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
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
      ...p.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-dialog heading="Custom content slot dialog" open placement="cover"> ${customContent} </calcite-dialog>\n`',
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
  <calcite-dialog icon="banana" heading="Banana" description="This is bananas" open scale="m" width-scale="s" modal>
    Hello world!
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
      ...w.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
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
      ...i.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tooltip style="--calcite-tooltip-z-index: 600;" open label="Open modal" reference-element="button"
    >Open modal</calcite-tooltip
  >
  <calcite-dialog scale="m" width-scale="s" open heading="Dialog title">
    <div>
      Dialog content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    \${footerContent}
  </calcite-dialog>
  <calcite-tooltip open label="Back" reference-element="tooltip-button">Back</calcite-tooltip>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
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
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="\${SLOTS.content}">Custom Content!</div>
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
    <calcite-panel heading="Custom Panel" slot="\${SLOTS.content}">Custom Panel Content!</calcite-panel>
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
    <div slot="\${SLOTS.content}"><calcite-panel heading="Custom Panel">Custom Panel Content!</calcite-panel></div>
  </calcite-dialog>
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
  <calcite-dialog loading open modal heading="heading" description="description" scale="m" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...y.parameters?.docs?.source
    }
  }
};
C.parameters = {
  ...C.parameters,
  docs: {
    ...C.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog
    overlay-positioning="fixed"
    menu-open
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
\``,
      ...C.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <calcite-action text="Action" label="Action" slot="\${SLOTS.footer}" icon="attachment"></calcite-action>
    Hello world!
  </calcite-dialog>
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
  <calcite-dialog open heading="heading" description="description" scale="s" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...k.parameters?.docs?.source
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
B.parameters = {
  ...B.parameters,
  docs: {
    ...B.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="m">
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...B.parameters?.docs?.source
    }
  }
};
D.parameters = {
  ...D.parameters,
  docs: {
    ...D.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="l">
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...D.parameters?.docs?.source
    }
  }
};
L.parameters = {
  ...L.parameters,
  docs: {
    ...L.parameters?.docs,
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
      ...L.parameters?.docs?.source
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
H.parameters = {
  ...H.parameters,
  docs: {
    ...H.parameters?.docs,
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
      ...H.parameters?.docs?.source
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
      ...E.parameters?.docs?.source
    }
  }
};
I.parameters = {
  ...I.parameters,
  docs: {
    ...I.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog modal placement="bottom-end" open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...I.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog modal open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
    <calcite-button slot="footer" width="auto" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="footer" width="auto">Save</calcite-button>
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
      <calcite-shell-center-row>
        <calcite-button>button</calcite-button>
      </calcite-shell-center-row>
    </calcite-shell>
    <calcite-button slot="footer-end" appearance="outline"> Cancel </calcite-button>
    <calcite-button slot="footer-end"> Save </calcite-button>
  </calcite-dialog>\``,
      ...q.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
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
      ...c.parameters?.docs?.source
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
const ee = ["simple", "slots", "slotsWithModal", "customContentSlot", "withIcon", "withKindBrandIcon", "withKindDangerIcon", "withKindInfoIcon", "withKindSuccessIcon", "withKindWarningIcon", "darkModeRTLCustomSizeCSSVars", "withTooltips", "withCustomHeader", "withCustomContent", "withCustomContentPanel", "withCustomContentDivPanel", "loading", "menuOpen", "withFooter", "scaleS", "scaleL", "widthScaleM", "widthScaleL", "withAlertsSlot", "placementTop", "placementTopStart", "placementTopEnd", "placementBottom", "placementBottomStart", "placementBottomEnd", "footerSlot", "withShellInside", "withWrappingHeaderText", "themed"];
export {
  ee as __namedExportsOrder,
  m as customContentSlot,
  i as darkModeRTLCustomSizeCSSVars,
  Z as default,
  M as footerSlot,
  y as loading,
  C as menuOpen,
  P as placementBottom,
  I as placementBottomEnd,
  E as placementBottomStart,
  O as placementTop,
  z as placementTopEnd,
  H as placementTopStart,
  A as scaleL,
  k as scaleS,
  d as simple,
  r as slots,
  p as slotsWithModal,
  K as themed,
  D as widthScaleL,
  B as widthScaleM,
  L as withAlertsSlot,
  v as withCustomContent,
  x as withCustomContentDivPanel,
  $ as withCustomContentPanel,
  f as withCustomHeader,
  T as withFooter,
  g as withIcon,
  h as withKindBrandIcon,
  u as withKindDangerIcon,
  b as withKindInfoIcon,
  S as withKindSuccessIcon,
  w as withKindWarningIcon,
  q as withShellInside,
  o as withTooltips,
  c as withWrappingHeaderText
};
