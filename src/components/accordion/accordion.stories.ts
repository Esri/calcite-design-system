import {
  Attribute,
  Attributes,
  filterComponentAttributes,
  createComponentHTML as create,
  themesDarkDefault
} from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { iconNames, storyFilters } from "../../../.storybook/helpers";
import { select, text } from "@storybook/addon-knobs";
import accordionReadme from "./readme.md";
import accordionItemReadme from "../accordion-item/readme.md";
import { html } from "../../../support/formatting";

const createAccordionAttributes: (options?: { exceptions: string[] }) => Attributes = (
  { exceptions } = { exceptions: [] }
) => {
  const group = "accordion";
  const { scale } = ATTRIBUTES;

  return filterComponentAttributes(
    [
      {
        name: "scale",
        commit(): Attribute {
          this.value = select("scale", scale.values, scale.defaultValue, group);
          delete this.build;
          return this;
        }
      },
      {
        name: "appearance",
        commit(): Attribute {
          this.value = select("appearance", ["default", "minimal", "transparent"], "default", group);
          delete this.build;
          return this;
        }
      },
      {
        name: "icon-position",
        commit(): Attribute {
          this.value = select("icon-position", ["start", "end"], "end", group);
          delete this.build;
          return this;
        }
      },
      {
        name: "icon-type",
        commit(): Attribute {
          this.value = select("icon-type", ["chevron", "caret", "plus-minus"], "chevron", group);
          delete this.build;
          return this;
        }
      },
      {
        name: "selection-mode",
        commit(): Attribute {
          this.value = select("selection-mode", ["multi", "single", "single-persist", "multiple"], "multiple", group);
          delete this.build;
          return this;
        }
      }
    ],
    exceptions
  );
};

const createAccordionItemAttributes: (options?: {
  group?: string;
  iconEnd?: string;
  iconStart?: string;
}) => Attributes = ({ group, iconStart, iconEnd }) => {
  const groupTitle = group ? group : "";
  const defaultAttributes = [
    {
      name: "heading",
      value: text("heading", "Heading", groupTitle)
    },
    {
      name: "description",
      value: text("description", "Description", groupTitle)
    }
  ];

  const iconStartAttribute = [
    {
      name: "icon-start",
      value: select("icon-start", iconNames, iconNames[0], groupTitle)
    }
  ];

  const iconEndAttribute = [
    {
      name: "icon-end",
      value: select("icon-end", iconNames, iconNames[0], groupTitle)
    }
  ];

  if (iconEnd && iconStart) {
    return iconStartAttribute.concat(defaultAttributes, iconEndAttribute);
  } else if (iconStart || iconEnd) {
    return iconStart ? iconStartAttribute.concat(defaultAttributes) : iconEndAttribute.concat(defaultAttributes);
  }

  return defaultAttributes;
};

const accordionItemContent = `Custom content here<br/><img src="${placeholderImage({
  width: 200,
  height: 133
})}"><br/>More custom content here`;

export default {
  title: "Components/Accordion",
  parameters: {
    notes: {
      accordion: accordionReadme,
      accordionItem: accordionItemReadme
    },
    backgrounds: {
      values: [{ name: "transparent", value: "#0000ffff" }]
    }
  },
  ...storyFilters()
};

export const simple = (): string =>
  create(
    "calcite-accordion",
    createAccordionAttributes(),
    html`
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-1" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-2" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-3" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-4" }).concat({
          name: "expanded",
          value: true
        }),
        accordionItemContent
      )}
    `
  );

export const icon_NoTest = (): string =>
  create(
    "calcite-accordion",
    createAccordionAttributes(),
    html`
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ iconStart: true, group: "accordion-item-1" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ iconStart: true, group: "accordion-item-2" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ iconStart: true, group: "accordion-item-3" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ iconStart: true, group: "accordion-item-4" }).concat({
          name: "expanded",
          value: true
        }),
        accordionItemContent
      )}
    `
  );

icon_NoTest.parameters = {
  chromatic: { disableSnapshot: true }
};

export const withActions = (): string => html`
  <calcite-accordion scale="s">
    <calcite-accordion-item scale="m" heading="Accordion Item">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >${accordionItemContent}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item scale="m" heading="Accordion Item">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >${accordionItemContent}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item scale="m" heading="Accordion Item">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >${accordionItemContent}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
  </calcite-accordion>
`;

export const darkThemeRTL_TestOnly = (): string =>
  create(
    "calcite-accordion",
    createAccordionAttributes({ exceptions: ["class", "dir"] }).concat(
      {
        name: "class",
        value: "calcite-theme-dark"
      },
      {
        name: "dir",
        value: "rtl"
      }
    ),
    html`
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ iconStart: true, group: "accordion-item-1" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ iconStart: true, group: "accordion-item-2" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ iconStart: true, group: "accordion-item-3" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ iconStart: true, group: "accordion-item-4" }).concat({
          name: "expanded",
          value: true
        }),
        accordionItemContent
      )}
    `
  );

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };

export const transparentAppearance_TestOnly = (): string =>
  create(
    "calcite-accordion",
    createAccordionAttributes({ exceptions: ["appearance"] }).concat({
      name: "appearance",
      value: "transparent"
    }),
    html`
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-1" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-2" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-3" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-4" }).concat({
          name: "expanded",
          value: true
        }),
        accordionItemContent
      )}
    `
  );

export const withIconStartAndEnd_TestOnly = (): string =>
  create(
    "calcite-accordion",
    createAccordionAttributes({ exceptions: ["appearance"] }).concat({
      name: "appearance",
      value: "transparent"
    }),
    html`
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-1", iconStart: "banana", icon: true }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-2", iconEnd: "cars" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-3", iconEnd: "plane", iconStart: "plane", icon: true }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({
          group: "accordion-item-4",
          iconStart: "biking",
          iconEnd: "biking",
          icon: true
        }).concat({
          name: "expanded",
          value: true
        }),
        accordionItemContent
      )}
    `
  );
