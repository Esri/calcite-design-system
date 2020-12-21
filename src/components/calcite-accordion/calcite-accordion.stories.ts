import { createComponentHTML as create, darkBackground, AttributeMap } from "../../../.storybook/utils";
import { html } from "../../tests/utils";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { iconNames } from "../../../.storybook/helpers";
import { select, text } from "@storybook/addon-knobs";
import accordionReadme from "./readme.md";
import accordionItemReadme from "../calcite-accordion-item/readme.md";

const createAccordionAttributeMap = (): AttributeMap => {
  const group = "accordion";
  const { dir, theme, scale } = ATTRIBUTES;

  return {
    dir: () => select("dir", dir.values, dir.defaultValue, group),
    scale: () => select("scale", scale.values, scale.defaultValue, group),
    theme: () => select("theme", theme.values, theme.defaultValue, group),
    appearance: () => select("appearance", ["default", "minimal", "transparent"], "default", group),
    "icon-position": () => select("icon-position", ["start", "end"], "end", group),
    "icon-type": () => select("icon-type", ["chevron", "caret", "plus-minus"], "chevron", group),
    "selection-mode": () => select("selection-mode", ["multi", "single", "single-persist"], "multi", group)
  };
};

const createAccordionItemAttributeMap = ({ icon, group }: { icon?: boolean; group?: string }): AttributeMap => {
  const groupTitle = group ? group : "";

  const iconAttribute = {
    icon: () => select("icon", iconNames, iconNames[0], groupTitle)
  };

  return {
    ...(icon ? iconAttribute : null),
    "item-title": () => text("item-title", "Item title", groupTitle),
    "item-subtitle": () => text("item-subtitle", "Item subtitle", groupTitle)
  };
};

const accordionItemContent = `Custom content here<br/><img src="https://placem.at/places?w=200&txt=0"><br/>More custom content here`;

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
    createAccordionAttributeMap(),
    html`
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributeMap({ group: "accordion-item-1" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributeMap({ group: "accordion-item-2" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributeMap({ group: "accordion-item-3" }),
        accordionItemContent
      )}
    `
  );

export const icon = (): string =>
  create(
    "calcite-accordion",
    createAccordionAttributeMap(),
    html`
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributeMap({ icon: true, group: "accordion-item-1" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributeMap({ icon: true, group: "accordion-item-2" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributeMap({ icon: true, group: "accordion-item-3" }),
        accordionItemContent
      )}
    `
  );
