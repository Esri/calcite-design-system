import { k as l, h as e, j as d } from "./index.js";
import { A as r } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  kind: u,
  scale: i
} = r, h = {
  title: "Components/Modal",
  args: {
    open: !0,
    kind: "",
    scale: i.defaultValue,
    widthScale: i.values[0],
    fullscreen: !1,
    docked: !1,
    escapeDisabled: !1
  },
  argTypes: {
    kind: {
      options: u.values.filter((t) => t !== "inverse" && t !== "neutral"),
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
    }
  },
  parameters: {
    chromatic: {
      delay: 1e3
    }
  }
}, n = (t) => e`
  <calcite-modal
    ${l("open", t.open)}
    kind="${t.kind}"
    scale="${t.scale}"
    width-scale="${t.widthScale}"
    ${l("fullscreen", t.fullscreen)}
    ${l("docked", t.docked)}
    ${l("escape-disabled", t.escapeDisabled)}
  >
    <h3 slot="header">Small Modal</h3>
    <div slot="content">
      The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements.
    </div>
    <calcite-button slot="back" kind="neutral" appearance="outline" icon="chevron-left" width="full"
      >Back</calcite-button
    >
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
`, m = e`
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nisi et elit auctor aliquet ac suscipit eros. Sed nec
  nibh viverra, feugiat magna ut, posuere arcu. Curabitur varius erat ut suscipit convallis. Nullam semper pellentesque
  est laoreet accumsan. Aenean eget urna fermentum, porttitor dui et, tincidunt erat. Curabitur lacinia lacus in urna
  lacinia, ac interdum lorem fermentum. Ut accumsan malesuada varius. Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Phasellus tempus tempor magna, eu dignissim urna ornare non. Integer tempor justo blandit nunc ornare, a
  interdum nisl pharetra. Sed ultricies at augue vel fermentum. Maecenas laoreet odio lorem. Aliquam in pretium turpis.
  Donec quis felis a diam accumsan vehicula efficitur at orci. Donec sollicitudin gravida ultrices.
`, c = () => e`
  <calcite-modal open scale="m" width-scale="s">
    <h3 slot="header">Slot for a header.</h3>
    <div slot="content-top">Slot for a content-top.</div>
    <div slot="content" style="height: 100px">${m}</div>
    <div slot="content-bottom">Slot for a content-bottom.</div>
    <calcite-button slot="primary" width="full">Button</calcite-button>
  </calcite-modal>
`, a = () => e`
  <calcite-modal
    class="calcite-mode-dark"
    dir="rtl"
    open
    scale="m"
    style="--calcite-modal-height: 500px; --calcite-modal-width: 600px;"
  >
    <h3 slot="header">Small Modal</h3>
    <div slot="content">
      <p>
        The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements. You can
        customize the size using the width attribute.
      </p>
    </div>
    <calcite-button slot="back" kind="neutral" appearance="outline" icon="chevron-left" width="full"
      >Back</calcite-button
    >
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
`;
a.parameters = {
  themes: d
};
const o = () => e`
  <button id="button">Open</button>
  <calcite-tooltip style="--calcite-tooltip-z-index: 600;" open label="Open modal" reference-element="button"
    >Open modal</calcite-tooltip
  >
  <calcite-modal open aria-labelledby="modal-title" id="modal">
    <div slot="header" id="modal-title">Modal title</div>
    <div slot="content">
      Modal content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    <calcite-button id="back-button-modal" slot="back" kind="neutral" icon="chevron-left" width="full"
      >Back
    </calcite-button>
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
  <calcite-tooltip open label="Back" reference-element="back-button-modal">Back</calcite-tooltip>
`;
o.parameters = {
  chromatic: {
    delay: 500
  }
};
const s = () => e`
  <button id="button">Open</button>
  <calcite-modal open aria-labelledby="modal-title" id="modal" style="--calcite-modal-content-background: #ddd;">
    <div slot="header" id="modal-title">Modal title</div>
    <div slot="content">
      Modal content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    <calcite-button id="back-button-modal" slot="back" kind="neutral" icon="chevron-left" width="full"
      >Back
    </calcite-button>
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
`;
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(args: ModalStoryArgs): string => html\`
  <calcite-modal
    \${boolean("open", args.open)}
    kind="\${args.kind}"
    scale="\${args.scale}"
    width-scale="\${args.widthScale}"
    \${boolean("fullscreen", args.fullscreen)}
    \${boolean("docked", args.docked)}
    \${boolean("escape-disabled", args.escapeDisabled)}
  >
    <h3 slot="header">Small Modal</h3>
    <div slot="content">
      The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements.
    </div>
    <calcite-button slot="back" kind="neutral" appearance="outline" icon="chevron-left" width="full"
      >Back</calcite-button
    >
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-modal open scale="m" width-scale="s">
    <h3 slot="header">Slot for a header.</h3>
    <div slot="content-top">Slot for a content-top.</div>
    <div slot="content" style="height: 100px">\${mightyLongTextToScroll}</div>
    <div slot="content-bottom">Slot for a content-bottom.</div>
    <calcite-button slot="primary" width="full">Button</calcite-button>
  </calcite-modal>
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
      originalSource: `(): string => html\`
  <calcite-modal
    class="calcite-mode-dark"
    dir="rtl"
    open
    scale="m"
    style="--calcite-modal-height: 500px; --calcite-modal-width: 600px;"
  >
    <h3 slot="header">Small Modal</h3>
    <div slot="content">
      <p>
        The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements. You can
        customize the size using the width attribute.
      </p>
    </div>
    <calcite-button slot="back" kind="neutral" appearance="outline" icon="chevron-left" width="full"
      >Back</calcite-button
    >
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <button id="button">Open</button>
  <calcite-tooltip style="--calcite-tooltip-z-index: 600;" open label="Open modal" reference-element="button"
    >Open modal</calcite-tooltip
  >
  <calcite-modal open aria-labelledby="modal-title" id="modal">
    <div slot="header" id="modal-title">Modal title</div>
    <div slot="content">
      Modal content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    <calcite-button id="back-button-modal" slot="back" kind="neutral" icon="chevron-left" width="full"
      >Back
    </calcite-button>
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
  <calcite-tooltip open label="Back" reference-element="back-button-modal">Back</calcite-tooltip>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <button id="button">Open</button>
  <calcite-modal open aria-labelledby="modal-title" id="modal" style="--calcite-modal-content-background: #ddd;">
    <div slot="header" id="modal-title">Modal title</div>
    <div slot="content">
      Modal content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    <calcite-button id="back-button-modal" slot="back" kind="neutral" icon="chevron-left" width="full"
      >Back
    </calcite-button>
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
const f = ["simple", "slots", "darkModeRTLCustomSizeCSSVars_TestOnly", "withTooltips_TestOnly", "withCSSVars_TestOnly"];
export {
  f as __namedExportsOrder,
  a as darkModeRTLCustomSizeCSSVars_TestOnly,
  h as default,
  n as simple,
  c as slots,
  s as withCSSVars_TestOnly,
  o as withTooltips_TestOnly
};
