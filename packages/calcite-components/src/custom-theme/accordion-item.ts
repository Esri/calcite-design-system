import { placeholderImage } from "../../.storybook/placeholder-image";
import { html } from "../../support/formatting";

export const accordionItemTokens = {
  calciteAccordionItemBackgroundColor: "",
  calciteAccordionItemBorderColor: "",
  calciteAccordionItemIconColorEnd: "",
  calciteAccordionItemIconColorStart: "",
  calciteAccordionItemContentSpace: "",
  calciteAccordionItemExpandIconColor: "",
  calciteAccordionItemHeaderBackgroundColor: "",
  calciteAccordionItemHeadingTextColor: "",
  calciteAccordionItemIconColor: "",
  calciteAccordionItemTextColor: "",
};

export const accordionItem = (idx: number): string =>
  html`<calcite-accordion-item
    icon-end="car"
    icon-start="layers"
    heading="${idx === 0 ? "Accordion Item" : `Accordion Item ${idx + 1}`}"
    ><img src="${placeholderImage({ width: 100, height: 50 })}" />
  </calcite-accordion-item>`;
