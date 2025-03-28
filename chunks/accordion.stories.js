import { m as h } from "./utils.js";
import { p as g } from "./placeholder-image.js";
import { i as l } from "./helpers.js";
import { h as i } from "./formatting.js";
import { A as u } from "./resources14.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
const {
  scale: m,
  appearance: p,
  selectionMode: _
} = u, S = {
  title: "Components/Accordion",
  args: {
    scale: m.defaultValue,
    appearance: p.defaultValue,
    selectionMode: _.defaultValue,
    heading: "Heading",
    description: "Description for item",
    iconStart: "",
    iconEnd: ""
  },
  argTypes: {
    scale: {
      options: m.values,
      control: {
        type: "select"
      }
    },
    appearance: {
      options: p.values.filter((c) => c !== "outline" && c !== "outline-fill"),
      control: {
        type: "select"
      }
    },
    selectionMode: {
      options: _.values.filter((c) => c !== "none" && c !== "children" && c !== "multichildren" && c !== "ancestors"),
      control: {
        type: "select"
      }
    },
    iconStart: {
      options: l,
      control: {
        type: "select"
      }
    },
    iconEnd: {
      options: l,
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
}, e = `Custom content here<br/><img src="${g({
  width: 200,
  height: 133
})}"><br/>More custom content here`, n = (c) => i`
  <calcite-accordion scale="${c.scale}" appearance="${c.appearance}" selection-mode="${c.selectionMode}">
    <calcite-accordion-item
      heading="${c.heading}"
      description="${c.description}"
      icon-start="${c.iconStart}"
      icon-end="${c.iconEnd}"
    >
      ${e}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="${c.heading}"
      description="${c.description}"
      icon-start="${c.iconStart}"
      icon-end="${c.iconEnd}"
    >
      ${e}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="${c.heading}"
      description="${c.description}"
      icon-start="${c.iconStart}"
      icon-end="${c.iconEnd}"
    >
      ${e}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="${c.heading}"
      description="${c.description}"
      icon-start="${c.iconStart}"
      icon-end="${c.iconEnd}"
      expanded
    >
      ${e}
    </calcite-accordion-item>
  </calcite-accordion>
`, a = () => i`
  <calcite-accordion scale="s">
    <calcite-accordion-item scale="m" heading="Accordion Item 1">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >${e}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item scale="m" heading="Accordion Item 2" expanded>
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >${e}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-start"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item scale="m" heading="Accordion Item 3">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      >${e}
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
  </calcite-accordion>
`, t = () => i`
  <calcite-accordion scale="m" appearance="solid" selection-mode="multiple" class="calcite-mode-dark" dir="rtl">
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      ${e}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      ${e}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      ${e}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
      ${e}
    </calcite-accordion-item>
  </calcite-accordion>
`;
t.parameters = {
  themes: h
};
const o = () => i`
  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${e}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${e}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${e}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" expanded>
      ${e}
    </calcite-accordion-item>
  </calcite-accordion>
`, r = () => i`
  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
      ${e}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-end="cars">
      ${e}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="plane" icon-end="plane">
      ${e}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="Heading"
      description="Description for item"
      icon-start="biking"
      icon-end="biking"
      expanded
    >
      ${e}
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
}], $ = w.map((c) => i`<calcite-accordion-item
        icon-start="${c.icon}"
        icon-end="${c.icon}"
        scale="l"
        heading="${c.heading}"
        description="${c.description}"
      ></calcite-accordion-item>`).join(""), s = () => i`
  <calcite-accordion scale="l" style="width: 600px"> ${$} </calcite-accordion>
`, d = () => i`
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
`;
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
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
      ...n.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
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
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
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
      ...r.parameters?.docs?.source
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
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
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
      ...d.parameters?.docs?.source
    }
  }
};
const C = ["simple", "withActions", "darkModeRTL_TestOnly", "transparentAppearance_TestOnly", "withIconStartAndEnd_TestOnly", "longHeading_MediumIconForLargeAccordionItem_TestOnly", "slottedItemsStretched"];
export {
  C as __namedExportsOrder,
  t as darkModeRTL_TestOnly,
  S as default,
  s as longHeading_MediumIconForLargeAccordionItem_TestOnly,
  n as simple,
  d as slottedItemsStretched,
  o as transparentAppearance_TestOnly,
  a as withActions,
  r as withIconStartAndEnd_TestOnly
};
