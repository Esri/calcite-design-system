import {
  Attribute,
  Attributes,
  filterComponentAttributes,
  createComponentHTML as create
} from "../../../.storybook/utils";
import { html } from "../../tests/utils";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { iconNames } from "../../../.storybook/helpers";
import { select, text } from "@storybook/addon-knobs";
import accordionReadme from "./readme.md";
import accordionItemReadme from "../calcite-accordion-item/readme.md";
import { placeholderImage } from "../../tests/utils";

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
          this.value = select("selection-mode", ["multi", "single", "single-persist"], "multi", group);
          delete this.build;
          return this;
        }
      }
    ],
    exceptions
  );
};

const createAccordionItemAttributes: (options?: { icon?: boolean; group?: string }) => Attributes = ({
  icon,
  group
}) => {
  const groupTitle = group ? group : "";
  const defaultAttributes = [
    {
      name: "item-title",
      value: text("item-title", "Item title", groupTitle)
    },
    {
      name: "item-subtitle",
      value: text("item-subtitle", "Item subtitle", groupTitle)
    }
  ];

  const iconAttribute = [
    {
      name: "icon",
      value: select("icon", iconNames, iconNames[0], groupTitle)
    }
  ];

  return icon ? iconAttribute.concat(defaultAttributes) : defaultAttributes;
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
    }
  }
};

export const basic = (): string =>
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
          name: "active",
          value: true
        }),
        accordionItemContent
      )}
    `
  );

export const icon = (): string =>
  create(
    "calcite-accordion",
    createAccordionAttributes(),
    html`
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ icon: true, group: "accordion-item-1" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ icon: true, group: "accordion-item-2" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ icon: true, group: "accordion-item-3" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ icon: true, group: "accordion-item-4" }).concat({
          name: "active",
          value: true
        }),
        accordionItemContent
      )}
    `
  );

export const darkThemeIcon = (): string =>
  create(
    "calcite-accordion",
    createAccordionAttributes({ exceptions: ["class"] }).concat({
      name: "class",
      value: "calcite-theme-dark"
    }),
    html`
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ icon: true, group: "accordion-item-1" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ icon: true, group: "accordion-item-2" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ icon: true, group: "accordion-item-3" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ icon: true, group: "accordion-item-4" }).concat({
          name: "active",
          value: true
        }),
        accordionItemContent
      )}
    `
  );

export const RTL = (): string =>
  create(
    "calcite-accordion",
    createAccordionAttributes({ exceptions: ["dir"] }).concat({
      name: "dir",
      value: "rtl"
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
          name: "active",
          value: true
        }),
        accordionItemContent
      )}
    `
  );
