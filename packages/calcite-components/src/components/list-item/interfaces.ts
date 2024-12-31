import { ListItem } from "./list-item";

export type ItemData = {
  label: string;
  description: string;
  metadata: Record<string, unknown>;
  heading?: string;
  el: ListItem["el"];
};
