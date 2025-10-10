import { h as t, k as l, j as b } from "./index.js";
import { p as $ } from "./floating-ui.js";
import { d as g } from "./resources15.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
var h = Object.freeze, x = Object.defineProperty, T = (e, L) => h(x(e, "raw", { value: h(e.slice()) })), y;
const n = `
<div style="width: 300px; padding:12px 16px;">
  <b>I am a title!</b> <br>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <calcite-link>I am an inline link</calcite-link>
</div>
`, r = 'Ut enim ad minim veniam, quis <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.', k = 'Ut enim ad minim veniam, quis <calcite-button title="Nested Reference Element" id="reference-element-nested">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.', M = {
  title: "Components/Popover",
  args: {
    closable: !1,
    flipDisabled: !1,
    pointerDisabled: !1,
    placement: g,
    offsetDistance: 6,
    offsetSkidding: 0,
    open: !0,
    textClose: "Close"
  },
  argTypes: {
    placement: {
      options: $,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      delay: 500
    }
  }
}, i = (e) => t`
  <div style="width: 400px;">
    ${r}
    <calcite-popover
      ${l("closable", e.closable)}
      ${l("flip-disabled", e.flipDisabled)}
      ${l("pointer-disabled", e.pointerDisabled)}
      reference-element="reference-element"
      placement="${e.placement}"
      offset-distance="${e.offsetDistance}"
      offset-skidding="${e.offsetSkidding}"
      ${l("open", e.open)}
      text-close="${e.textClose}"
    >
      ${n}
    </calcite-popover>
  </div>
`, o = () => t`
  ${r}
  <calcite-popover reference-element="reference-element" open>
    <b>I am a title!</b> <br />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua.
    </p>
    <calcite-link>I am an inline link</calcite-link>
  </calcite-popover>
`;
o.parameters = {
  chromatic: {
    viewports: [300, 300]
  }
};
const c = () => t` <div style="width: 400px;">
    ${r}
    <calcite-popover
      reference-element="reference-element"
      placement="${g}"
      offset-distance="6"
      offset-skidding="0"
      open
      text-close="Close"
      dir="rtl"
      class="calcite-mode-dark"
    >
      ${n}
    </calcite-popover>
  </div>`;
c.parameters = {
  themes: b
};
const a = () => t`
  <div style="width: 400px;">
    ${r}
    <calcite-popover closable reference-element="reference-element" placement="${g}" open>
      <div style="width: 300px; padding:12px 16px;">${k}</div>
      <calcite-popover
        heading="Heading"
        closable
        reference-element="reference-element-nested"
        placement="${g}"
        open
      >
        ${n}
      </calcite-popover>
    </calcite-popover>
  </div>
`;
a.parameters = {
  chromatic: {
    delay: 1500
  }
};
const s = () => t(y || (y = T([`
  <div style="height: 100px; overflow:scroll; width: 200px;">
    <div class="my-popover-reference">
      <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button>
    </div>
    <calcite-popover class="my-popover" reference-element="reference-element" open placement="top" heading="Heading">
      `, `
    </calcite-popover>
  </div>
  <script>
    document.querySelector(".my-popover").flipPlacements = ["right"];
  <\/script>
`])), n), p = () => t`
  <div style="width: 800px; height:800px;">
    <div style="width: 400px;">
      ${r}
      <calcite-popover
        heading="Dreams didn't make us kings. Dragons did. 🐉"
        reference-element="reference-element"
        placement="auto"
        open
        closable
        scale="m"
      >
        ${n}
      </calcite-popover>
    </div>
  </div>
`, d = () => t`
  <div style="width: 400px;">
    ${r}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="s"
    >
      ${n}
    </calcite-popover>
  </div>
`, m = () => t`
  <div style="width: 400px;">
    ${r}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="m"
    >
      ${n}
    </calcite-popover>
  </div>
`, v = () => t`
  <div style="width: 400px;">
    ${r}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="l"
    >
      ${n}
    </calcite-popover>
  </div>
`, f = () => t`
  <style>
    calcite-popover {
      --calcite-color-foreground-1: rgba(0, 0, 0, 0.5);
      --calcite-color-text-1: orange;
    }
  </style>
  <div style="width: 400px;">
    ${r}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="l"
    >
      ${n}
    </calcite-popover>
  </div>
`, u = () => t`<calcite-popover reference-element="button">
      <div style="width:10000px; height:10000px;">Popover</div>
    </calcite-popover>
    <calcite-button id="button">Button</calcite-button>`;
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: PopoverStoryArgs): string => html\`
  <div style="width: 400px;">
    \${referenceElementHTML}
    <calcite-popover
      \${boolean("closable", args.closable)}
      \${boolean("flip-disabled", args.flipDisabled)}
      \${boolean("pointer-disabled", args.pointerDisabled)}
      reference-element="reference-element"
      placement="\${args.placement}"
      offset-distance="\${args.offsetDistance}"
      offset-skidding="\${args.offsetSkidding}"
      \${boolean("open", args.open)}
      text-close="\${args.textClose}"
    >
      \${contentHTML}
    </calcite-popover>
  </div>
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
  \${referenceElementHTML}
  <calcite-popover reference-element="reference-element" open>
    <b>I am a title!</b> <br />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua.
    </p>
    <calcite-link>I am an inline link</calcite-link>
  </calcite-popover>
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
      originalSource: `(): string => html\` <div style="width: 400px;">
    \${referenceElementHTML}
    <calcite-popover
      reference-element="reference-element"
      placement="\${defaultPopoverPlacement}"
      offset-distance="6"
      offset-skidding="0"
      open
      text-close="Close"
      dir="rtl"
      class="calcite-mode-dark"
    >
      \${contentHTML}
    </calcite-popover>
  </div>\``,
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
  <div style="width: 400px;">
    \${referenceElementHTML}
    <calcite-popover closable reference-element="reference-element" placement="\${defaultPopoverPlacement}" open>
      <div style="width: 300px; padding:12px 16px;">\${nestedReferenceElementHTML}</div>
      <calcite-popover
        heading="Heading"
        closable
        reference-element="reference-element-nested"
        placement="\${defaultPopoverPlacement}"
        open
      >
        \${contentHTML}
      </calcite-popover>
    </calcite-popover>
  </div>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="height: 100px; overflow:scroll; width: 200px;">
    <div class="my-popover-reference">
      <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button>
    </div>
    <calcite-popover class="my-popover" reference-element="reference-element" open placement="top" heading="Heading">
      \${contentHTML}
    </calcite-popover>
  </div>
  <script>
    document.querySelector(".my-popover").flipPlacements = ["right"];
  <\/script>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 800px; height:800px;">
    <div style="width: 400px;">
      \${referenceElementHTML}
      <calcite-popover
        heading="Dreams didn't make us kings. Dragons did. 🐉"
        reference-element="reference-element"
        placement="auto"
        open
        closable
        scale="m"
      >
        \${contentHTML}
      </calcite-popover>
    </div>
  </div>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px;">
    \${referenceElementHTML}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="s"
    >
      \${contentHTML}
    </calcite-popover>
  </div>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px;">
    \${referenceElementHTML}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="m"
    >
      \${contentHTML}
    </calcite-popover>
  </div>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px;">
    \${referenceElementHTML}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="l"
    >
      \${contentHTML}
    </calcite-popover>
  </div>
\``,
      ...v.parameters?.docs?.source
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
    calcite-popover {
      --calcite-color-foreground-1: rgba(0, 0, 0, 0.5);
      --calcite-color-text-1: orange;
    }
  </style>
  <div style="width: 400px;">
    \${referenceElementHTML}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="l"
    >
      \${contentHTML}
    </calcite-popover>
  </div>
\``,
      ...f.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-popover reference-element="button">
      <div style="width:10000px; height:10000px;">Popover</div>
    </calcite-popover>
    <calcite-button id="button">Button</calcite-button>\``,
      ...u.parameters?.docs?.source
    }
  }
};
const _ = ["simple", "smallViewport", "darkModeRTL_TestOnly", "nested", "flipPlacements_TestOnly", "scaleConsistencyPopoverHeadingActionSlottedIcon_TestOnly", "smallScaleLayout_TestOnly", "mediumScaleLayout_TestOnly", "largeScaleLayout_TestOnly", "transparentBG_TestOnly", "closedShouldNotCauseScrollbars"];
export {
  _ as __namedExportsOrder,
  u as closedShouldNotCauseScrollbars,
  c as darkModeRTL_TestOnly,
  M as default,
  s as flipPlacements_TestOnly,
  v as largeScaleLayout_TestOnly,
  m as mediumScaleLayout_TestOnly,
  a as nested,
  p as scaleConsistencyPopoverHeadingActionSlottedIcon_TestOnly,
  i as simple,
  d as smallScaleLayout_TestOnly,
  o as smallViewport,
  f as transparentBG_TestOnly
};
