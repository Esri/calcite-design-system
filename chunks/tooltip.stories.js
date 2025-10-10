import { k as m, h as e, j as f } from "./index.js";
import { p as d } from "./floating-ui.js";
import { p as u } from "./placeholder-image.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const o = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua", i = 'Ut enim ad minim veniam, quis <calcite-button appearance="transparent" kind="neutral" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.', $ = {
  title: "Components/Tooltip",
  args: {
    placement: d[0],
    offsetDistance: 6,
    offsetSkidding: 0,
    open: !1
  },
  argTypes: {
    placements: {
      options: d,
      control: {
        type: "select"
      }
    }
  }
}, a = (r) => e`
  <div style="width: 400px;">
    ${i}
    <calcite-tooltip
      reference-element="reference-element"
      placement="${r.placement}"
      offset-distance="${r.offsetDistance}"
      offset-skidding="${r.offsetSkidding}"
      ${m("open", r.open)}
    >
      <span> ${o} </span>
    </calcite-tooltip>
  </div>
`, t = () => e`
  <calcite-button appearance="transparent" kind="neutral" id="reference-element">nostrud</calcite-button>
  <calcite-tooltip reference-element="reference-element" open
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua</calcite-tooltip
  >
`;
t.parameters = {
  chromatic: {
    viewports: [300, 300]
  }
};
const c = () => e`
  <div style="width: 400px;">
    ${i}
    <calcite-tooltip
      reference-element="reference-element"
      placement="auto"
      offset-distance="6"
      offset-skidding="0"
      open
    >
      <span> ${o} </span>
    </calcite-tooltip>
  </div>
`, n = () => e`
  <div style="width: 400px;">
    ${i}
    <calcite-tooltip
      class="calcite-mode-dark"
      dir="rtl"
      reference-element="reference-element"
      placement="auto"
      offset-distance="6"
      offset-skidding="0"
    >
      <span> ${o} </span>
    </calcite-tooltip>
  </div>
`;
n.parameters = {
  themes: f
};
const l = () => e`<div style="width:800px; height:800px;">
    <div style="text-align: right; width: 600px;">
      <a href="#" id="tooltip-button">Hover for Tooltip</a>
      <calcite-tooltip open reference-element="tooltip-button">
        <span>Tooltip content lorem ipsum</span>
      </calcite-tooltip>
    </div>
  </div>`, s = () => e`
  <style>
    calcite-tooltip {
      --calcite-color-foreground-1: rgba(0, 0, 0, 0.5);
      --calcite-color-text-1: orange;
    }
  </style>
  <div style="width: 400px;">
    ${i}
    <calcite-tooltip reference-element="reference-element" placement="auto" open> ${o} </calcite-tooltip>
  </div>
`, p = () => e`<div style="width: 400px;">
    ${i}
    <calcite-tooltip reference-element="reference-element" placement="auto" open
      ><img width="100%" src="${u({
  width: 360,
  height: 90
})}" /> <p>${o}</p> <calcite-button>Click me</calcite-button
    </calcite-tooltip>
  </div>`;
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(args: TooltipStoryArgs): string => html\`
  <div style="width: 400px;">
    \${referenceElementHTML}
    <calcite-tooltip
      reference-element="reference-element"
      placement="\${args.placement}"
      offset-distance="\${args.offsetDistance}"
      offset-skidding="\${args.offsetSkidding}"
      \${boolean("open", args.open)}
    >
      <span> \${contentHTML} </span>
    </calcite-tooltip>
  </div>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-button appearance="transparent" kind="neutral" id="reference-element">nostrud</calcite-button>
  <calcite-tooltip reference-element="reference-element" open
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua</calcite-tooltip
  >
\``,
      ...t.parameters?.docs?.source
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
    <calcite-tooltip
      reference-element="reference-element"
      placement="auto"
      offset-distance="6"
      offset-skidding="0"
      open
    >
      <span> \${contentHTML} </span>
    </calcite-tooltip>
  </div>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px;">
    \${referenceElementHTML}
    <calcite-tooltip
      class="calcite-mode-dark"
      dir="rtl"
      reference-element="reference-element"
      placement="auto"
      offset-distance="6"
      offset-skidding="0"
    >
      <span> \${contentHTML} </span>
    </calcite-tooltip>
  </div>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width:800px; height:800px;">
    <div style="text-align: right; width: 600px;">
      <a href="#" id="tooltip-button">Hover for Tooltip</a>
      <calcite-tooltip open reference-element="tooltip-button">
        <span>Tooltip content lorem ipsum</span>
      </calcite-tooltip>
    </div>
  </div>\``,
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
  <style>
    calcite-tooltip {
      --calcite-color-foreground-1: rgba(0, 0, 0, 0.5);
      --calcite-color-text-1: orange;
    }
  </style>
  <div style="width: 400px;">
    \${referenceElementHTML}
    <calcite-tooltip reference-element="reference-element" placement="auto" open> \${contentHTML} </calcite-tooltip>
  </div>
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
      originalSource: `(): string => html\`<div style="width: 400px;">
    \${referenceElementHTML}
    <calcite-tooltip reference-element="reference-element" placement="auto" open
      ><img width="100%" src="\${placeholderImage({
  width: 360,
  height: 90
})}" /> <p>\${contentHTML}</p> <calcite-button>Click me</calcite-button
    </calcite-tooltip>
  </div>\``,
      ...p.parameters?.docs?.source
    }
  }
};
const y = ["simple", "smallViewport", "open_TestOnly", "darkModeRTL_TestOnly", "rightAligned_TestOnly", "transparentBG_TestOnly", "withInteractiveContent"];
export {
  y as __namedExportsOrder,
  n as darkModeRTL_TestOnly,
  $ as default,
  c as open_TestOnly,
  l as rightAligned_TestOnly,
  a as simple,
  t as smallViewport,
  s as transparentBG_TestOnly,
  p as withInteractiveContent
};
