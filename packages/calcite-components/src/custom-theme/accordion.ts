import { html } from "../../support/formatting";
import { accordionItem } from "./accordion-item";
import { tree } from "./tree";

export const accordionTokens = {
  CalciteAccordionBorderColor: "",
  CalciteAccordionBackgroundColor: "",
};
// ${[0, 1, 2, 3, 4].map((idx) => accordionItem(idx))}
// ${Array(5).map((v, idx) => accordionItem(idx))}
export const accordion = html`<style>
    calcite-accordion-item:hover {
      --calcite-accordion-item-background-color: white;
    }
    calcite-accordion-item[expanded] {
      --calcite-accordion-item-header-background-color: #ccc;
    }</style
  ><calcite-accordion>
    ${[0, 1, 2, 3, 4].map((idx) => accordionItem(idx)).join("\n")}
    <calcite-accordion-item heading="Accordion Item 5" expanded>${tree}</calcite-accordion-item>
  </calcite-accordion>`;
