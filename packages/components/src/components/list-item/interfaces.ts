import { ListItem } from "./list-item";
import { CloneSafeRecord } from "../../utils/clone-safe";

export type SharedListFilterFields = {
  label?: string;
  description?: string;
  metadata?: CloneSafeRecord;
  heading?: string[];
};

export type ItemData = SharedListFilterFields & {
  el: ListItem["el"];
};
