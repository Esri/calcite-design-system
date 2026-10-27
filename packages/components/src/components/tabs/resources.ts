import { isTag } from "../resources";

export const CSS = {
  section: "section",
};

export const SLOTS = {
  titleGroup: "title-group",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isTabs = isTag("calcite-tabs");
