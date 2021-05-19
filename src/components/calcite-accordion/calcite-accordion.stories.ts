import { Attribute, Attributes, createComponentHTML as create, darkBackground } from "../../../.storybook/utils";
import { html } from "../../tests/utils";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { iconNames } from "../../../.storybook/helpers";
import { select, text } from "@storybook/addon-knobs";
import accordionReadme from "./readme.md";
import accordionItemReadme from "../calcite-accordion-item/readme.md";
import { placeholderImage } from "../../tests/utils";

const createAccordionAttributes: (options?: { except: string[] }) => Attributes = ({ except } = { except: [] }) => {
  const group = "accordion";
  const { dir, theme, scale } = ATTRIBUTES;

  interface DeferredAttribute {
    name: string;
    commit: () => Attribute;
  }

  return (
    [
      {
        name: "dir",
        commit(): Attribute {
          this.value = select("dir", dir.values, dir.defaultValue, group);
          delete this.build;
          return this;
        }
      },
      {
        name: "scale",
        commit(): Attribute {
          this.value = select("scale", scale.values, scale.defaultValue, group);
          delete this.build;
          return this;
        }
      },
      {
        name: "theme",
        commit(): Attribute {
          this.value = select("theme", theme.values, theme.defaultValue, group);
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
    ] as DeferredAttribute[]
  )
    .filter((attr) => !except.find((excluded) => excluded === attr.name))
    .map((attr) => attr.commit());
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
    backgrounds: darkBackground,
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
    `
  );
