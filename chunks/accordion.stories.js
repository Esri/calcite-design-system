import { h as e, j as $ } from "./index.js";
import { p as u } from "./placeholder-image.js";
import { i as p } from "./helpers.js";
import { A as f } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  scale: g,
  appearance: _,
  selectionMode: h
} = f, C = {
  title: "Components/Accordion",
  args: {
    scale: g.defaultValue,
    appearance: _.defaultValue,
    selectionMode: h.defaultValue,
    heading: "Heading",
    description: "Description for item",
    iconStart: "",
    iconEnd: ""
  },
  argTypes: {
    scale: {
      options: g.values,
      control: {
        type: "select"
      }
    },
    appearance: {
      options: _.values.filter((i) => i !== "outline" && i !== "outline-fill"),
      control: {
        type: "select"
      }
    },
    selectionMode: {
      options: h.values.filter((i) => i !== "none" && i !== "children" && i !== "multichildren" && i !== "ancestors"),
      control: {
        type: "select"
      }
    },
    iconStart: {
      options: p,
      control: {
        type: "select"
      }
    },
    iconEnd: {
      options: p,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    backgrounds: {
      values: [{
        name: "transparent",
        value: "#0000ffff"
      }]
    }
  }
}, c = `Custom content here<br/><img src="${u({
  width: 200,
  height: 133
})}"><br/>More custom content here`, a = (i) => e`
  <calcite-accordion scale="${i.scale}" appearance="${i.appearance}" selection-mode="${i.selectionMode}">
    <calcite-accordion-item
      heading="${i.heading}"
      description="${i.description}"
      icon-start="${i.iconStart}"
      icon-end="${i.iconEnd}"
    >
      ${c}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="${i.heading}"
      description="${i.description}"
      icon-start="${i.iconStart}"
      icon-end="${i.iconEnd}"
    >
      ${c}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="${i.heading}"
      description="${i.description}"
      icon-start="${i.iconStart}"
      icon-end="${i.iconEnd}"
    >
      ${c}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="${i.heading}"
      description="${i.description}"
      icon-start="${i.iconStart}"
      icon-end="${i.iconEnd}"
      expanded
    >
      ${c}
    </calcite-accordion-item>
  </calcite-accordion>
`, t = () => e`
  <calcite-accordion scale="s">
    <calcite-accordion-item scale="m" heading="Accordion Item 1">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >${c}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item scale="m" heading="Accordion Item 2" expanded>
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >${c}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-start"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item scale="m" heading="Accordion Item 3">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      >${c}
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
  </calcite-accordion>
`, o = () => e`
  <style>
    .accordion-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr;
      grid-column-gap: 20px;
      grid-row-gap: 0px;
    }
  </style>
  <div class="accordion-grid">
    <div>
      <h2>Small</h2>
      <calcite-accordion appearance="solid" scale="s" selection-mode="multiple">
        <calcite-accordion-item
          heading-level="1"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${c}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="2"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${c}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="3"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${c}
        </calcite-accordion-item>
        <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
          ${c}
        </calcite-accordion-item>
      </calcite-accordion>
    </div>
    <div>
      <h2>Medium</h2>
      <calcite-accordion appearance="solid" selection-mode="multiple">
        <calcite-accordion-item
          heading-level="1"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${c}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="2"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${c}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="3"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${c}
        </calcite-accordion-item>
        <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
          ${c}
        </calcite-accordion-item>
      </calcite-accordion>
    </div>
    <div>
      <h2>Large</h2>
      <calcite-accordion appearance="solid" scale="l" selection-mode="multiple">
        <calcite-accordion-item
          heading-level="1"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${c}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="2"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${c}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="3"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${c}
        </calcite-accordion-item>
        <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
          ${c}
        </calcite-accordion-item>
      </calcite-accordion>
    </div>
  </div>
`, n = () => e`
  <calcite-accordion scale="m" appearance="solid" selection-mode="multiple" class="calcite-mode-dark" dir="rtl">
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      ${c}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      ${c}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      ${c}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
      ${c}
    </calcite-accordion-item>
  </calcite-accordion>
`;
n.parameters = {
  themes: $
};
const r = () => e`
  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${c}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${c}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${c}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" expanded>
      ${c}
    </calcite-accordion-item>
  </calcite-accordion>
`, d = () => e`
  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
      ${c}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-end="cars">
      ${c}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="plane" icon-end="plane">
      ${c}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="Heading"
      description="Description for item"
      icon-start="biking"
      icon-end="biking"
      expanded
    >
      ${c}
    </calcite-accordion-item>
  </calcite-accordion>
`, w = [{
  icon: "",
  heading: "Simple item with heading",
  description: ""
}, {
  icon: "",
  heading: "Simple item with heading",
  description: "Simple item with description"
}, {
  icon: "embark",
  heading: "Embark_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_",
  description: "Extra long heading with underscores and icons m /scale l"
}, {
  icon: "car",
  heading: "Extra long description with underscores and icons m /scale l",
  description: "Car_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_"
}, {
  icon: "plane",
  heading: "Extra long description and icons m /scale l",
  description: "Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets."
}], b = w.map((i) => e`<calcite-accordion-item
        icon-start="${i.icon}"
        icon-end="${i.icon}"
        scale="l"
        heading="${i.heading}"
        description="${i.description}"
      ></calcite-accordion-item>`).join(""), s = () => e`
  <calcite-accordion scale="l" style="width: 600px"> ${b} </calcite-accordion>
`, l = () => e`
  <calcite-accordion scale="l">
    <calcite-accordion-item description="Yachts, boats, and dinghies" heading="Watercraft" icon-start="embark">
      <calcite-action slot="actions-start" icon="smile"> </calcite-action>
      <calcite-notice open>
        <div slot="message">Recommended for coastal use</div>
      </calcite-notice>
      <calcite-action slot="actions-end" icon="smile"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item description="Cars, trucks and motorcycles" heading="Vehicles" icon-start="car">
      <calcite-switch slot="actions-start" icon="smile"> </calcite-switch>
      <calcite-notice open>
        <div slot="message">Recommended for highway use</div>
      </calcite-notice>
      <calcite-switch slot="actions-end" icon="smile"></calcite-switch>
    </calcite-accordion-item>
  </calcite-accordion>
`, m = () => e`
  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${c}
      <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      <calcite-icon slot="content-end" icon="banana"></calcite-icon>
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${c}
      <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      <calcite-icon slot="content-end" icon="banana"></calcite-icon>
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${c}
      <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      <calcite-icon slot="content-end" icon="banana"></calcite-icon>
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${c}
      <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      <calcite-icon slot="content-end" icon="banana"></calcite-icon>
    </calcite-accordion-item>
  </calcite-accordion>
`;
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(args: AccordionStoryArgs): string => html\`
  <calcite-accordion scale="\${args.scale}" appearance="\${args.appearance}" selection-mode="\${args.selectionMode}">
    <calcite-accordion-item
      heading="\${args.heading}"
      description="\${args.description}"
      icon-start="\${args.iconStart}"
      icon-end="\${args.iconEnd}"
    >
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="\${args.heading}"
      description="\${args.description}"
      icon-start="\${args.iconStart}"
      icon-end="\${args.iconEnd}"
    >
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="\${args.heading}"
      description="\${args.description}"
      icon-start="\${args.iconStart}"
      icon-end="\${args.iconEnd}"
    >
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="\${args.heading}"
      description="\${args.description}"
      icon-start="\${args.iconStart}"
      icon-end="\${args.iconEnd}"
      expanded
    >
      \${accordionItemContent}
    </calcite-accordion-item>
  </calcite-accordion>
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
  <calcite-accordion scale="s">
    <calcite-accordion-item scale="m" heading="Accordion Item 1">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >\${accordionItemContent}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item scale="m" heading="Accordion Item 2" expanded>
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >\${accordionItemContent}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-start"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item scale="m" heading="Accordion Item 3">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      >\${accordionItemContent}
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
  </calcite-accordion>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .accordion-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr;
      grid-column-gap: 20px;
      grid-row-gap: 0px;
    }
  </style>
  <div class="accordion-grid">
    <div>
      <h2>Small</h2>
      <calcite-accordion appearance="solid" scale="s" selection-mode="multiple">
        <calcite-accordion-item
          heading-level="1"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          \${accordionItemContent}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="2"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          \${accordionItemContent}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="3"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          \${accordionItemContent}
        </calcite-accordion-item>
        <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
          \${accordionItemContent}
        </calcite-accordion-item>
      </calcite-accordion>
    </div>
    <div>
      <h2>Medium</h2>
      <calcite-accordion appearance="solid" selection-mode="multiple">
        <calcite-accordion-item
          heading-level="1"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          \${accordionItemContent}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="2"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          \${accordionItemContent}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="3"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          \${accordionItemContent}
        </calcite-accordion-item>
        <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
          \${accordionItemContent}
        </calcite-accordion-item>
      </calcite-accordion>
    </div>
    <div>
      <h2>Large</h2>
      <calcite-accordion appearance="solid" scale="l" selection-mode="multiple">
        <calcite-accordion-item
          heading-level="1"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          \${accordionItemContent}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="2"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          \${accordionItemContent}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="3"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          \${accordionItemContent}
        </calcite-accordion-item>
        <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
          \${accordionItemContent}
        </calcite-accordion-item>
      </calcite-accordion>
    </div>
  </div>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-accordion scale="m" appearance="solid" selection-mode="multiple" class="calcite-mode-dark" dir="rtl">
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
      \${accordionItemContent}
    </calcite-accordion-item>
  </calcite-accordion>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">
    <calcite-accordion-item heading="Heading" description="Description for item">
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" expanded>
      \${accordionItemContent}
    </calcite-accordion-item>
  </calcite-accordion>
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
      originalSource: `(): string => html\`
  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-end="cars">
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="plane" icon-end="plane">
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="Heading"
      description="Description for item"
      icon-start="biking"
      icon-end="biking"
      expanded
    >
      \${accordionItemContent}
    </calcite-accordion-item>
  </calcite-accordion>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-accordion scale="l" style="width: 600px"> ${accordionItemsIconHeaderUseCases} </calcite-accordion>\n`',
      ...s.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-accordion scale="l">
    <calcite-accordion-item description="Yachts, boats, and dinghies" heading="Watercraft" icon-start="embark">
      <calcite-action slot="actions-start" icon="smile"> </calcite-action>
      <calcite-notice open>
        <div slot="message">Recommended for coastal use</div>
      </calcite-notice>
      <calcite-action slot="actions-end" icon="smile"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item description="Cars, trucks and motorcycles" heading="Vehicles" icon-start="car">
      <calcite-switch slot="actions-start" icon="smile"> </calcite-switch>
      <calcite-notice open>
        <div slot="message">Recommended for highway use</div>
      </calcite-notice>
      <calcite-switch slot="actions-end" icon="smile"></calcite-switch>
    </calcite-accordion-item>
  </calcite-accordion>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">
    <calcite-accordion-item heading="Heading" description="Description for item">
      \${accordionItemContent}
      <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      <calcite-icon slot="content-end" icon="banana"></calcite-icon>
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      \${accordionItemContent}
      <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      <calcite-icon slot="content-end" icon="banana"></calcite-icon>
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      \${accordionItemContent}
      <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      <calcite-icon slot="content-end" icon="banana"></calcite-icon>
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      \${accordionItemContent}
      <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      <calcite-icon slot="content-end" icon="banana"></calcite-icon>
    </calcite-accordion-item>
  </calcite-accordion>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
const S = ["simple", "withActions", "headingLevelAllScales", "darkModeRTL_TestOnly", "transparentAppearance_TestOnly", "withIconStartAndEnd_TestOnly", "longHeading_MediumIconForLargeAccordionItem_TestOnly", "slottedItemsStretched", "withContentStartAndEnd"];
export {
  S as __namedExportsOrder,
  n as darkModeRTL_TestOnly,
  C as default,
  o as headingLevelAllScales,
  s as longHeading_MediumIconForLargeAccordionItem_TestOnly,
  a as simple,
  l as slottedItemsStretched,
  r as transparentAppearance_TestOnly,
  t as withActions,
  m as withContentStartAndEnd,
  d as withIconStartAndEnd_TestOnly
};
