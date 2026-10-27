import type { Accordion } from "../accordion/accordion";
import type { AccordionItem } from "./accordion-item";

export interface RegistryEntry {
  parent: Accordion["el"];
  position: number;
}

export interface RequestedItem {
  requestedAccordionItem: AccordionItem["el"];
}
