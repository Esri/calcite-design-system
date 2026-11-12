import type { Accordion } from "../accordion/accordion";
import type { AccordionItem } from "./accordion-item";

export interface RegistryEntry {
  parent: Accordion["el"];
  position: number;
}

/** @internal */
export interface RequestedItem {
  /** @internal */
  requestedAccordionItem: AccordionItem["el"];
}
