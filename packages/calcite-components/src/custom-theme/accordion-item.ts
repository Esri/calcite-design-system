import { placeholderImage } from "../../.storybook/placeholder-image";
import { html } from "../../support/formatting";

export const accordionItem = (idx: number): string =>
  html`<calcite-accordion-item heading="${idx === 0 ? "Accordion Item" : `Accordion Item ${idx + 1}`}"
    ><img src="${placeholderImage({ width: 300, height: 200 })}" />
  </calcite-accordion-item>`;
