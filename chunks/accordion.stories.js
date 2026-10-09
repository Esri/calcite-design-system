/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { o as n, m as f } from "./utils3.js";
import { s as b } from "./index3.js";
import { i as g } from "./helpers.js";
import { h as e } from "./formatting.js";
import { A as w } from "./resources34.js";
import "./accordion.js";
import "./accordion-item.js";
import "./icon.js";
import "./action.js";
import "./notice.js";
import "./switch.js";
const {
  appearance: _,
  iconType: h,
  position: H,
  scale: u,
  selectionMode: $
} = w, M = {
  title: "Components/Accordion",
  args: {
    scale: u.defaultValue,
    appearance: _.defaultValue,
    iconPosition: "end",
    iconType: h.defaultValue,
    selectionMode: $.defaultValue,
    heading: "Heading",
    description: "Description for item",
    iconStart: "",
    iconEnd: ""
  },
  argTypes: {
    scale: {
      options: u.values,
      control: {
        type: "select"
      }
    },
    appearance: {
      options: _.values.filter((c) => c !== "outline" && c !== "outline-fill"),
      control: {
        type: "select"
      }
    },
    iconPosition: {
      options: H.values.filter((c) => c === "start" || c === "end"),
      control: {
        type: "select"
      }
    },
    iconType: {
      options: h.values,
      control: {
        type: "select"
      }
    },
    selectionMode: {
      options: $.values.filter((c) => c !== "none" && c !== "children" && c !== "multichildren" && c !== "ancestors"),
      control: {
        type: "select"
      }
    },
    iconStart: {
      options: g,
      control: {
        type: "select"
      }
    },
    iconEnd: {
      options: g,
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
}, i = `Custom content here<br/><img src="${b({
  width: 200,
  height: 133
})}"><br/>More custom content here`, a = (c) => e`
  <calcite-accordion
    scale="${c.scale}"
    appearance="${c.appearance}"
    icon-position="${c.iconPosition}"
    icon-type="${c.iconType}"
    selection-mode="${c.selectionMode}"
  >
    <calcite-accordion-item
      heading="${c.heading}"
      description="${c.description}"
      ${n("icon-start", c.iconStart)}
      ${n("icon-end", c.iconEnd)}
    >
      ${i}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="${c.heading}"
      description="${c.description}"
      ${n("icon-start", c.iconStart)}
      ${n("icon-end", c.iconEnd)}
    >
      ${i}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="${c.heading}"
      description="${c.description}"
      ${n("icon-start", c.iconStart)}
      ${n("icon-end", c.iconEnd)}
    >
      ${i}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="${c.heading}"
      description="${c.description}"
      ${n("icon-start", c.iconStart)}
      ${n("icon-end", c.iconEnd)}
      expanded
    >
      ${i}
    </calcite-accordion-item>
  </calcite-accordion>
`, o = () => e`
  <calcite-accordion scale="s">
    <calcite-accordion-item scale="m" heading="Accordion Item 1">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >${i}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item scale="m" heading="Accordion Item 2" expanded>
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >${i}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-start"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item scale="m" heading="Accordion Item 3">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      >${i}
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
  </calcite-accordion>
`, r = () => e`
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
          ${i}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="2"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${i}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="3"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${i}
        </calcite-accordion-item>
        <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
          ${i}
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
          ${i}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="2"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${i}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="3"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${i}
        </calcite-accordion-item>
        <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
          ${i}
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
          ${i}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="2"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${i}
        </calcite-accordion-item>
        <calcite-accordion-item
          heading-level="3"
          heading="Heading"
          description="Description for item"
          icon-start="banana"
        >
          ${i}
        </calcite-accordion-item>
        <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
          ${i}
        </calcite-accordion-item>
      </calcite-accordion>
    </div>
  </div>
`, t = () => e`
  <calcite-accordion scale="m" appearance="solid" selection-mode="multiple" class="calcite-mode-dark" dir="rtl">
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      ${i}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      ${i}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      ${i}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
      ${i}
    </calcite-accordion-item>
  </calcite-accordion>
`;
t.parameters = {
  themes: f
};
const d = () => e`
  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${i}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${i}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${i}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" expanded>
      ${i}
    </calcite-accordion-item>
  </calcite-accordion>
`, s = () => e`
  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
      ${i}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-end="cars">
      ${i}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="plane" icon-end="plane">
      ${i}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="Heading"
      description="Description for item"
      icon-start="biking"
      icon-end="biking"
      expanded
    >
      ${i}
    </calcite-accordion-item>
  </calcite-accordion>
`, D = [{
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
}], I = D.map((c) => e`<calcite-accordion-item
        icon-start="${c.icon}"
        icon-end="${c.icon}"
        scale="l"
        heading="${c.heading}"
        description="${c.description}"
      ></calcite-accordion-item>`).join(""), l = () => e`
  <calcite-accordion scale="l" style="width: 600px"> ${I} </calcite-accordion>
`, m = () => e`
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
`, p = () => e`
  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${i}
      <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      <calcite-icon slot="content-end" icon="banana"></calcite-icon>
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${i}
      <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      <calcite-icon slot="content-end" icon="banana"></calcite-icon>
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${i}
      <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      <calcite-icon slot="content-end" icon="banana"></calcite-icon>
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${i}
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
  <calcite-accordion
    scale="\${args.scale}"
    appearance="\${args.appearance}"
    icon-position="\${args.iconPosition}"
    icon-type="\${args.iconType}"
    selection-mode="\${args.selectionMode}"
  >
    <calcite-accordion-item
      heading="\${args.heading}"
      description="\${args.description}"
      \${optionalAttribute("icon-start", args.iconStart)}
      \${optionalAttribute("icon-end", args.iconEnd)}
    >
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="\${args.heading}"
      description="\${args.description}"
      \${optionalAttribute("icon-start", args.iconStart)}
      \${optionalAttribute("icon-end", args.iconEnd)}
    >
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="\${args.heading}"
      description="\${args.description}"
      \${optionalAttribute("icon-start", args.iconStart)}
      \${optionalAttribute("icon-end", args.iconEnd)}
    >
      \${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="\${args.heading}"
      description="\${args.description}"
      \${optionalAttribute("icon-start", args.iconStart)}
      \${optionalAttribute("icon-end", args.iconEnd)}
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
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
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
      ...o.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
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
      ...r.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
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
      ...t.parameters?.docs?.source
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
      ...d.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
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
      ...s.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-accordion scale="l" style="width: 600px"> ${accordionItemsIconHeaderUseCases} </calcite-accordion>\n`',
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
      ...m.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
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
      ...p.parameters?.docs?.source
    }
  }
};
const V = ["simple", "withActions", "headingLevelAllScales", "darkModeRTL", "transparentAppearance", "withIconStartAndEnd", "longHeading_MediumIconForLargeAccordionItem", "slottedItemsStretched", "withContentStartAndEnd"];
export {
  V as __namedExportsOrder,
  t as darkModeRTL,
  M as default,
  r as headingLevelAllScales,
  l as longHeading_MediumIconForLargeAccordionItem,
  a as simple,
  m as slottedItemsStretched,
  d as transparentAppearance,
  o as withActions,
  p as withContentStartAndEnd,
  s as withIconStartAndEnd
};
