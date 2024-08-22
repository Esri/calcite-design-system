import { html } from "../../support/formatting";
import { accordionItem } from "./accordion-item";
import { tree } from "./tree";

export const accordion = html`<calcite-accordion>
  ${[0, 1, 2, 3, 4].map((idx) => accordionItem(idx))}
  <calcite-accordion-item heading="Accordion Item 5" expanded>${tree}</calcite-accordion-item>
</calcite-accordion>`;
