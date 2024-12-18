import { ListItem } from "./list-item";

export type ItemData = {
  label: string;
  description: string;
  metadata: Record<string, unknown>;
  value: string;
  el: ListItem["el"];
};
