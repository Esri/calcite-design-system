import { isTag } from "../resources";
import { IconName } from "../icon/types";
export const SLOTS = {
  menuActions: "menu-actions",
  menuTooltip: "menu-tooltip",
};

export const ICONS: Record<string, IconName> = {
  menu: "ellipsis",
};

export const CSS = {
  container: "container",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isActionGroup = isTag("calcite-action-group");
