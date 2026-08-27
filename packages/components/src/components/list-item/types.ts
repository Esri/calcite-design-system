import { ListItem } from "./list-item";

export type SharedListFilterFields = {
  label?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  heading?: string[];
};

export type ItemData = SharedListFilterFields & {
  el: ListItem["el"];
};
