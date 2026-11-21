import { ListItem } from "./list-item";

/** @public */
export type ItemData = {
  /** @public */
  label?: string;
  /** @public */
  description?: string;
  /** @public */
  metadata?: Record<string, unknown>;
  /** @public */
  el: ListItem["el"];
  /** @public */
  heading?: string[];
};
