import { b as o, m as q } from "./utils.js";
import { h as e } from "./formatting.js";
import { A as H } from "./resources14.js";
import { d as F, S as t } from "./resources7.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
const {
  kind: I,
  scale: l,
  overlayPositioning: P
} = H, N = {
  title: "Components/Dialog",
  args: {
    open: !0,
    kind: "",
    escapeDisabled: !1,
    scale: l.defaultValue,
    widthScale: l.values[0],
    placement: "center",
    heading: "My Dialog",
    description: "My description!",
    closeDisabled: !1,
    loading: !1,
    menuOpen: !1,
    modal: !1,
    dragEnabled: !1,
    resizable: !1,
    overlayPositioning: P.defaultValue,
    outsideCloseDisabled: !1
  },
  argTypes: {
    kind: {
      options: I.values.filter((a) => a !== "inverse" && a !== "neutral"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: l.values,
      control: {
        type: "select"
      }
    },
    widthScale: {
      options: l.values,
      control: {
        type: "select"
      }
    },
    overlayPositioning: {
      options: P.values,
      control: {
        type: "select"
      }
    },
    placement: {
      options: F,
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
}, U = e` <calcite-action
    text="Action"
    label="Action"
    slot="${t.headerActionsStart}"
    icon="bluetooth"
  ></calcite-action>
  <calcite-action text="Action" label="Action" slot="${t.headerActionsEnd}" icon="attachment"></calcite-action>`, E = e` <calcite-action
    text="banana"
    text-enabled
    icon="banana"
    slot="${t.headerMenuActions}"
  ></calcite-action>
  <calcite-action text="measure" text-enabled icon="measure" slot="${t.headerMenuActions}"></calcite-action
  ><calcite-action text="search" text-enabled icon="search" slot="${t.headerMenuActions}"></calcite-action>`, s = (a) => e`
  <calcite-dialog
    ${o("drag-enabled", a.dragEnabled)}
    ${o("resizable", a.resizable)}
    ${o("modal", a.modal)}
    ${o("open", a.open)}
    ${o("menu-open", a.menuOpen)}
    ${o("loading", a.loading)}
    ${o("close-disabled", a.closeDisabled)}
    ${o("escape-disabled", a.escapeDisabled)}
    ${o("outside-close-disabled", a.outsideCloseDisabled)}
    kind="${a.kind}"
    scale="${a.scale}"
    width-scale="${a.widthScale}"
    placement="${a.placement}"
    heading="${a.heading}"
    description="${a.description}"
    overlay-positioning="${a.overlayPositioning}"
  >
    ${U} ${E} The small modal is perfect for short confirmation dialogs or very compact
    interfaces with few elements. ${n}
  </calcite-dialog>
`, M = e`
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nisi et elit auctor aliquet ac suscipit eros. Sed nec
  nibh viverra, feugiat magna ut, posuere arcu. Curabitur varius erat ut suscipit convallis. Nullam semper pellentesque
  est laoreet accumsan. Aenean eget urna fermentum, porttitor dui et, tincidunt erat. Curabitur lacinia lacus in urna
  lacinia, ac interdum lorem fermentum. Ut accumsan malesuada varius. Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Phasellus tempus tempor magna, eu dignissim urna ornare non. Integer tempor justo blandit nunc ornare, a
  interdum nisl pharetra. Sed ultricies at augue vel fermentum. Maecenas laoreet odio lorem. Aliquam in pretium turpis.
  Donec quis felis a diam accumsan vehicula efficitur at orci. Donec sollicitudin gravida ultrices.
`, n = e`<calcite-button
    id="tooltip-button"
    slot="${t.footerStart}"
    kind="neutral"
    appearance="outline"
    icon="chevron-left"
    width="auto"
    >Back</calcite-button
  >
  <calcite-button slot="${t.footerEnd}" width="auto" appearance="outline">Cancel</calcite-button>
  <calcite-button slot="${t.footerEnd}" width="auto">Save</calcite-button>`, V = e` <div
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
    <div slot="${t.contentTop}">Slot for a content-top.</div>
    ${M}
    <div slot="${t.contentBottom}">Slot for a content-bottom.</div>
    <calcite-fab slot="${t.fab}"></calcite-fab>
    <calcite-action-bar slot="${t.actionBar}">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    ${n}
  </calcite-dialog>
`, r = () => e`
  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s" modal>
    <div slot="${t.contentTop}">Slot for a content-top.</div>
    ${M}
    <div slot="${t.contentBottom}">Slot for a content-bottom.</div>
    <calcite-fab slot="${t.fab}"></calcite-fab>
    <calcite-action-bar slot="${t.actionBar}">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    ${n}
  </calcite-dialog>
`, p = () => e`
  <calcite-dialog heading="Custom content slot dialog" open placement="cover"> ${V} </calcite-dialog>
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
    ${n}
  </calcite-dialog>
`;
i.parameters = {
  themes: q
};
const c = () => e`
  <calcite-tooltip style="--calcite-tooltip-z-index: 600;" open label="Open modal" reference-element="button"
    >Open modal</calcite-tooltip
  >
  <calcite-dialog scale="m" width-scale="s" open heading="Dialog title">
    <div>
      Dialog content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    ${n}
  </calcite-dialog>
  <calcite-tooltip open label="Back" reference-element="tooltip-button">Back</calcite-tooltip>
`;
c.parameters = {
  chromatic: {
    delay: 500
  }
};
const m = () => e`
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
`, g = () => e`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="${t.content}">Custom Content!</div>
    <p>Slotted content!</p>
  </calcite-dialog>
`, u = () => e`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <calcite-panel heading="Custom Panel" slot="${t.content}">Custom Panel Content!</calcite-panel>
  </calcite-dialog>
`, h = () => e`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="${t.content}"><calcite-panel heading="Custom Panel">Custom Panel Content!</calcite-panel></div>
  </calcite-dialog>
`, b = () => e`
  <calcite-dialog loading open modal heading="heading" description="description" scale="m" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`, S = () => e`
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
    ${E}
  </calcite-dialog>
`, f = () => e`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <calcite-action text="Action" label="Action" slot="${t.footer}" icon="attachment"></calcite-action>
    Hello world!
  </calcite-dialog>
`, w = () => e`
  <calcite-dialog open heading="heading" description="description" scale="s" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`, v = () => e`
  <calcite-dialog open heading="heading" description="description" scale="l" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`, $ = () => e`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="m">
    <p>Slotted content!</p>
  </calcite-dialog>
`, x = () => e`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="l">
    <p>Slotted content!</p>
  </calcite-dialog>
`, C = () => e`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="s">
    <p>Slotted content!</p>
    <calcite-alert slot="alerts" open label="this is a default alert" scale="s">
      <div slot="title">Hello there!</div>
      <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
    </calcite-alert>
  </calcite-dialog>
`, y = () => e`
  <calcite-dialog modal placement="top" kind="brand" open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`, T = () => e`
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
`, A = () => e`
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
`, k = () => e`
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
`, L = () => e`
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
`, D = () => e`
  <calcite-dialog modal placement="bottom-end" open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`, O = () => e`
  <calcite-dialog modal open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
    <calcite-button slot="footer" width="auto" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="footer" width="auto">Save</calcite-button>
  </calcite-dialog>
`, R = e`--calcite-dialog-scrim-background-color: purple; --calcite-dialog-size-x: 400px;
--calcite-dialog-size-y: 400px; --calcite-dialog-footer-space: 50px; --calcite-dialog-border-color: pink;
--calcite-dialog-content-space: 50px; --calcite-dialog-offset-x: 50px; --calcite-dialog-offset-y: -30px;`, B = () => e`<calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="l">
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
  </calcite-dialog>`, z = () => e`<calcite-dialog
    style="${R}"
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
    \${boolean("outside-close-disabled", args.outsideCloseDisabled)}
    kind="\${args.kind}"
    scale="\${args.scale}"
    width-scale="\${args.widthScale}"
    placement="\${args.placement}"
    heading="\${args.heading}"
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
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
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
      ...c.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
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
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="\${SLOTS.content}">Custom Content!</div>
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <calcite-panel heading="Custom Panel" slot="\${SLOTS.content}">Custom Panel Content!</calcite-panel>
  </calcite-dialog>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="\${SLOTS.content}"><calcite-panel heading="Custom Panel">Custom Panel Content!</calcite-panel></div>
  </calcite-dialog>
\``,
      ...h.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog loading open modal heading="heading" description="description" scale="m" width-scale="s">
    <p>Slotted content!</p>
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
      ...S.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <calcite-action text="Action" label="Action" slot="\${SLOTS.footer}" icon="attachment"></calcite-action>
    Hello world!
  </calcite-dialog>
\``,
      ...f.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open heading="heading" description="description" scale="s" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...w.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog open heading="heading" description="description" scale="l" width-scale="s">
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
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="m">
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
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="l">
    <p>Slotted content!</p>
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
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="s">
    <p>Slotted content!</p>
    <calcite-alert slot="alerts" open label="this is a default alert" scale="s">
      <div slot="title">Hello there!</div>
      <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
    </calcite-alert>
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
  <calcite-dialog modal placement="top" kind="brand" open heading="heading" description="description" width-scale="s">
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
      ...T.parameters?.docs?.source
    }
  }
};
A.parameters = {
  ...A.parameters,
  docs: {
    ...A.parameters?.docs,
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
      ...A.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
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
      ...k.parameters?.docs?.source
    }
  }
};
L.parameters = {
  ...L.parameters,
  docs: {
    ...L.parameters?.docs,
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
      ...L.parameters?.docs?.source
    }
  }
};
D.parameters = {
  ...D.parameters,
  docs: {
    ...D.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog modal placement="bottom-end" open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
\``,
      ...D.parameters?.docs?.source
    }
  }
};
O.parameters = {
  ...O.parameters,
  docs: {
    ...O.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dialog modal open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
    <calcite-button slot="footer" width="auto" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="footer" width="auto">Save</calcite-button>
  </calcite-dialog>
\``,
      ...O.parameters?.docs?.source
    }
  }
};
B.parameters = {
  ...B.parameters,
  docs: {
    ...B.parameters?.docs,
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
      ...B.parameters?.docs?.source
    }
  }
};
z.parameters = {
  ...z.parameters,
  docs: {
    ...z.parameters?.docs,
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
      ...z.parameters?.docs?.source
    }
  }
};
const G = ["simple", "slots", "slotsWithModal", "customContentSlot", "darkModeRTLCustomSizeCSSVars", "withTooltips", "withCustomHeader", "withCustomContent", "withCustomContentPanel", "withCustomContentDivPanel", "loading", "menuOpen", "withFooter", "scaleS", "scaleL", "widthScaleM", "widthScaleL", "withAlertsSlot", "placementTop", "placementTopStart", "placementTopEnd", "placementBottom", "placementBottomStart", "placementBottomEnd", "footerSlot", "withShellInside", "themed"];
export {
  G as __namedExportsOrder,
  p as customContentSlot,
  i as darkModeRTLCustomSizeCSSVars,
  N as default,
  O as footerSlot,
  b as loading,
  S as menuOpen,
  k as placementBottom,
  D as placementBottomEnd,
  L as placementBottomStart,
  y as placementTop,
  A as placementTopEnd,
  T as placementTopStart,
  v as scaleL,
  w as scaleS,
  s as simple,
  d as slots,
  r as slotsWithModal,
  z as themed,
  x as widthScaleL,
  $ as widthScaleM,
  C as withAlertsSlot,
  g as withCustomContent,
  h as withCustomContentDivPanel,
  u as withCustomContentPanel,
  m as withCustomHeader,
  f as withFooter,
  B as withShellInside,
  c as withTooltips
};
