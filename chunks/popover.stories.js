/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as r, m as S } from "./utils3.js";
import { h as t } from "./formatting.js";
import { a as L } from "./modes.js";
import { A as w } from "./resources34.js";
import { d as h } from "./popover.js";
import "./button.js";
import "./link.js";
var b = Object.freeze, H = Object.defineProperty, k = (e, E) => b(H(e, "raw", { value: b(e.slice()) })), y, $;
const {
  placement: T,
  scale: x
} = w, n = `
<div style="width: 300px; padding:12px 16px;">
  <b>I am a title!</b> <br>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <calcite-link>I am an inline link</calcite-link>
</div>
`, o = 'Ut enim ad minim veniam, quis <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.', M = 'Ut enim ad minim veniam, quis <calcite-button title="Nested Reference Element" id="reference-element-nested">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.', B = {
  title: "Components/Popover",
  args: {
    autoClose: !1,
    closable: !1,
    flipDisabled: !1,
    pointerDisabled: !1,
    placement: h,
    offsetDistance: 6,
    offsetSkidding: 0,
    open: !0,
    scale: x.defaultValue,
    textClose: "Close"
  },
  argTypes: {
    placement: {
      options: T.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: x.values,
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
    ${o}
    <calcite-popover
      ${r("closable", e.closable)}
      ${r("auto-close", e.autoClose)}
      ${r("flip-disabled", e.flipDisabled)}
      ${r("pointer-disabled", e.pointerDisabled)}
      reference-element="reference-element"
      placement="${e.placement}"
      scale="${e.scale}"
      offset-distance="${e.offsetDistance}"
      offset-skidding="${e.offsetSkidding}"
      ${r("open", e.open)}
      text-close="${e.textClose}"
    >
      ${n}
    </calcite-popover>
  </div>
`, c = () => t`
  ${o}
  <calcite-popover reference-element="reference-element" open>
    <b>I am a title!</b> <br />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua.
    </p>
    <calcite-link>I am an inline link</calcite-link>
  </calcite-popover>
`;
c.parameters = {
  chromatic: {
    modes: {
      small: L.widthSmall
    }
  }
};
const a = () => t` <div style="width: 400px;">
    ${o}
    <calcite-popover
      reference-element="reference-element"
      placement="${h}"
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
a.parameters = {
  themes: S
};
const l = () => t(y || (y = k([`
  <div style="width: 400px;">
    `, `
    <calcite-popover closable open reference-element="reference-element" placement="`, `">
      <div style="width: 300px; padding:12px 16px;">`, `</div>
    </calcite-popover>
    <calcite-popover
      heading="Heading"
      closable
      id="nested-popover"
      reference-element="reference-element-nested"
      placement="`, `"
    >
      `, `
    </calcite-popover>
    <script>
      document.addEventListener("calcitePopoverOpen", () => {
        document.querySelector("#nested-popover").open = true;
      });
    <\/script>
  </div>
`])), o, h, M, h, n);
l.parameters = {
  chromatic: {
    delay: 1500
  }
};
const s = () => t($ || ($ = k([`
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
      ${o}
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
    ${o}
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
    ${o}
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
`, f = () => t`
  <div style="width: 400px;">
    ${o}
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
    ${o}
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
    <calcite-button id="button">Button</calcite-button>`, g = () => t`<p>
      Some text
      <button id="ref1">Button</button>
    </p>
    <calcite-popover placement="trailing-start" reference-element="ref1" open>Content 1</calcite-popover>
    <calcite-popover placement="trailing-start" offset-skidding="30" reference-element="ref1" open
      >Content 2</calcite-popover
    >
    <calcite-popover placement="trailing-start" offset-skidding="60" reference-element="ref1" open
      >Content 3</calcite-popover
    >`;
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
      \${boolean("auto-close", args.autoClose)}
      \${boolean("flip-disabled", args.flipDisabled)}
      \${boolean("pointer-disabled", args.pointerDisabled)}
      reference-element="reference-element"
      placement="\${args.placement}"
      scale="\${args.scale}"
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
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
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
      ...c.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
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
      ...a.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px;">
    \${referenceElementHTML}
    <calcite-popover closable open reference-element="reference-element" placement="\${defaultPopoverPlacement}">
      <div style="width: 300px; padding:12px 16px;">\${nestedReferenceElementHTML}</div>
    </calcite-popover>
    <calcite-popover
      heading="Heading"
      closable
      id="nested-popover"
      reference-element="reference-element-nested"
      placement="\${defaultPopoverPlacement}"
    >
      \${contentHTML}
    </calcite-popover>
    <script>
      document.addEventListener("calcitePopoverOpen", () => {
        document.querySelector("#nested-popover").open = true;
      });
    <\/script>
  </div>
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
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
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
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<p>
      Some text
      <button id="ref1">Button</button>
    </p>
    <calcite-popover placement="trailing-start" reference-element="ref1" open>Content 1</calcite-popover>
    <calcite-popover placement="trailing-start" offset-skidding="30" reference-element="ref1" open
      >Content 2</calcite-popover
    >
    <calcite-popover placement="trailing-start" offset-skidding="60" reference-element="ref1" open
      >Content 3</calcite-popover
    >\``,
      ...g.parameters?.docs?.source
    }
  }
};
const A = ["simple", "smallViewport", "darkModeRTL", "nested", "flipPlacements", "scaleConsistencyPopoverHeadingActionSlottedIcon", "smallScaleLayout", "mediumScaleLayout", "largeScaleLayout", "transparentBG", "closedShouldNotCauseScrollbars", "sharedReferenceElement"];
export {
  A as __namedExportsOrder,
  u as closedShouldNotCauseScrollbars,
  a as darkModeRTL,
  B as default,
  s as flipPlacements,
  f as largeScaleLayout,
  m as mediumScaleLayout,
  l as nested,
  p as scaleConsistencyPopoverHeadingActionSlottedIcon,
  g as sharedReferenceElement,
  i as simple,
  d as smallScaleLayout,
  c as smallViewport,
  v as transparentBG
};
