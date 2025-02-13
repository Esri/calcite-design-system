import { h as e } from "./formatting.js";
import { p } from "./floating-ui.js";
import { b as d, m } from "./utils.js";
import { p as f } from "./placeholder-image.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
const n = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua", o = 'Ut enim ad minim veniam, quis <calcite-button appearance="transparent" kind="neutral" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.', $ = {
  title: "Components/Tooltip",
  args: {
    placement: p[0],
    offsetDistance: 6,
    offsetSkidding: 0,
    open: !1
  },
  argTypes: {
    placements: {
      options: p,
      control: {
        type: "select"
      }
    }
  }
}, r = (i) => e`
  <div style="width: 400px;">
    ${o}
    <calcite-tooltip
      reference-element="reference-element"
      placement="${i.placement}"
      offset-distance="${i.offsetDistance}"
      offset-skidding="${i.offsetSkidding}"
      ${d("open", i.open)}
    >
      <span> ${n} </span>
    </calcite-tooltip>
  </div>
`, c = () => e`
  <div style="width: 400px;">
    ${o}
    <calcite-tooltip
      reference-element="reference-element"
      placement="auto"
      offset-distance="6"
      offset-skidding="0"
      open
    >
      <span> ${n} </span>
    </calcite-tooltip>
  </div>
`, t = () => e`
  <div style="width: 400px;">
    ${o}
    <calcite-tooltip
      class="calcite-mode-dark"
      dir="rtl"
      reference-element="reference-element"
      placement="auto"
      offset-distance="6"
      offset-skidding="0"
    >
      <span> ${n} </span>
    </calcite-tooltip>
  </div>
`;
t.parameters = {
  themes: m
};
const a = () => e`<div style="width:800px; height:800px;">
    <div style="text-align: right; width: 600px;">
      <a href="#" id="tooltip-button">Hover for Tooltip</a>
      <calcite-tooltip open reference-element="tooltip-button">
        <span>Tooltip content lorem ipsum</span>
      </calcite-tooltip>
    </div>
  </div>`, l = () => e`
  <style>
    calcite-tooltip {
      --calcite-color-foreground-1: rgba(0, 0, 0, 0.5);
      --calcite-color-text-1: orange;
    }
  </style>
  <div style="width: 400px;">
    ${o}
    <calcite-tooltip reference-element="reference-element" placement="auto" open> ${n} </calcite-tooltip>
  </div>
`, s = () => e`<div style="width: 400px;">
    ${o}
    <calcite-tooltip reference-element="reference-element" placement="auto" open
      ><img width="100%" src="${f({
  width: 360,
  height: 90
})}" /> <p>${n}</p> <calcite-button>Click me</calcite-button
    </calcite-tooltip>
  </div>`;
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
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
      ...r.parameters?.docs?.source
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
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
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
      ...t.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width:800px; height:800px;">
    <div style="text-align: right; width: 600px;">
      <a href="#" id="tooltip-button">Hover for Tooltip</a>
      <calcite-tooltip open reference-element="tooltip-button">
        <span>Tooltip content lorem ipsum</span>
      </calcite-tooltip>
    </div>
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
      ...l.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
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
      ...s.parameters?.docs?.source
    }
  }
};
const y = ["simple", "open_TestOnly", "darkModeRTL_TestOnly", "rightAligned_TestOnly", "transparentBG_TestOnly", "withInteractiveContent"];
export {
  y as __namedExportsOrder,
  t as darkModeRTL_TestOnly,
  $ as default,
  c as open_TestOnly,
  a as rightAligned_TestOnly,
  r as simple,
  l as transparentBG_TestOnly,
  s as withInteractiveContent
};
