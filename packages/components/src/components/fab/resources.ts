import { isTag } from "../resources";
import { IconName } from "../icon/types";

export const CSS = {
  button: "button",
};

export const ICONS: Record<string, IconName> = {
  plus: "plus",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isFab = isTag("calcite-fab");
