import { ListItem } from "./list-item";
import type { CloneSafeRecord } from "../../utils/clone-safe-types";

export type SharedListFilterFields = {
  label?: string;
  description?: string;
  metadata?: CloneSafeRecord;
  heading?: string[];
};

export type ItemData = SharedListFilterFields & {
  el: ListItem["el"];
};
