import { b as a, m as y } from "./utils.js";
import { h as t } from "./formatting.js";
import { p as b } from "./floating-ui.js";
import { d as u } from "./resources13.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
var h = Object.freeze, $ = Object.defineProperty, x = (e, L) => h($(e, "raw", { value: h(e.slice()) })), g;
const n = `
<div style="width: 300px; padding:12px 16px;">
  <b>I am a title!</b> <br>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <calcite-link>I am an inline link</calcite-link>
</div>
`, r = 'Ut enim ad minim veniam, quis <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.', T = 'Ut enim ad minim veniam, quis <calcite-button title="Nested Reference Element" id="reference-element-nested">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.', _ = {
  title: "Components/Popover",
  args: {
    closable: !1,
    flipDisabled: !1,
    pointerDisabled: !1,
    placement: u,
    offsetDistance: 6,
    offsetSkidding: 0,
    open: !0,
    textClose: "Close"
  },
  argTypes: {
    placement: {
      options: b,
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
}, l = (e) => t`
  <div style="width: 400px;">
    ${r}
    <calcite-popover
      ${a("closable", e.closable)}
      ${a("flip-disabled", e.flipDisabled)}
      ${a("pointer-disabled", e.pointerDisabled)}
      reference-element="reference-element"
      placement="${e.placement}"
      offset-distance="${e.offsetDistance}"
      offset-skidding="${e.offsetSkidding}"
      ${a("open", e.open)}
      text-close="${e.textClose}"
    >
      ${n}
    </calcite-popover>
  </div>
`, o = () => t` <div style="width: 400px;">
    ${r}
    <calcite-popover
      reference-element="reference-element"
      placement="${u}"
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
o.parameters = {
  themes: y
};
const c = () => t`
  <div style="width: 400px;">
    ${r}
    <calcite-popover closable reference-element="reference-element" placement="${u}" open>
      <div style="width: 300px; padding:12px 16px;">${T}</div>
      <calcite-popover
        heading="Heading"
        closable
        reference-element="reference-element-nested"
        placement="${u}"
        open
      >
        ${n}
      </calcite-popover>
    </calcite-popover>
  </div>
`;
c.parameters = {
  chromatic: {
    delay: 1500
  }
};
const s = () => t(g || (g = x([`
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
`])), n), i = () => t`
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
`, p = () => t`
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
`, d = () => t`
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
`, m = () => t`
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
`, v = () => t`
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
`, f = () => t`<calcite-popover reference-element="button">
      <div style="width:10000px; height:10000px;">Popover</div>
    </calcite-popover>
    <calcite-button id="button">Button</calcite-button>`;
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
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
      ...l.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
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
      ...c.parameters?.docs?.source
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
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
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
      ...i.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
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
      scale="m"
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
      scale="l"
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
      ...v.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-popover reference-element="button">
      <div style="width:10000px; height:10000px;">Popover</div>
    </calcite-popover>
    <calcite-button id="button">Button</calcite-button>\``,
      ...f.parameters?.docs?.source
    }
  }
};
const M = ["simple", "darkModeRTL_TestOnly", "nested", "flipPlacements_TestOnly", "scaleConsistencyPopoverHeadingActionSlottedIcon_TestOnly", "smallScaleLayout_TestOnly", "mediumScaleLayout_TestOnly", "largeScaleLayout_TestOnly", "transparentBG_TestOnly", "closedShouldNotCauseScrollbars"];
export {
  M as __namedExportsOrder,
  f as closedShouldNotCauseScrollbars,
  o as darkModeRTL_TestOnly,
  _ as default,
  s as flipPlacements_TestOnly,
  m as largeScaleLayout_TestOnly,
  d as mediumScaleLayout_TestOnly,
  c as nested,
  i as scaleConsistencyPopoverHeadingActionSlottedIcon_TestOnly,
  l as simple,
  p as smallScaleLayout_TestOnly,
  v as transparentBG_TestOnly
};
