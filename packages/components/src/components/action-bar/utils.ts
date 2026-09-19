import { SLOTS as ACTION_GROUP_SLOTS, isActionGroup } from "../action-group/resources";
import { SLOTS as ACTION_MENU_SLOTS, isActionMenu } from "../action-menu/resources";
import type { ActionMenu } from "../action-menu/action-menu";
import type { ActionGroup } from "../action-group/action-group";
import type { Action } from "../action/action";

export type ActionBarItem = Action["el"] | ActionGroup["el"] | ActionMenu["el"];

export const queryActions = (items: ActionBarItem[]): Action["el"][] =>
  items
    .flatMap((item) => {
      if (isActionGroup(item)) {
        return item.actions;
      }

      if (isActionMenu(item)) {
        return item.actions.filter((action) => action.slot === ACTION_MENU_SLOTS.trigger);
      }

      return item;
    })
    .filter((action): action is Action["el"] => !!action);

/**
 * Returns an item's cross-axis offset (px) relative to the container, accounting for layout
 * orientation and text direction.
 */
export const getWrapItemCrossOffset = ({
  item,
  containerRect,
  horizontal,
  rtl,
}: {
  item: HTMLElement;
  containerRect: DOMRect;
  horizontal: boolean;
  rtl: boolean;
}): number => {
  const rect = item.getBoundingClientRect();

  if (horizontal) {
    return rect.top - containerRect.top;
  }

  return rtl ? containerRect.right - rect.right : rect.left - containerRect.left;
};

/**
 * Manages action overflow by slotting actions into action menus as needed.
 * Note: this only handles direct actions and action-groups.
 */
export const overflowActions = ({
  actionGroups,
  expanded,
  overflowCount,
}: {
  actionGroups: ActionGroup["el"][];
  expanded: boolean;
  overflowCount: number;
}): void => {
  let needToSlotCount = overflowCount;

  [...actionGroups].reverse().forEach((group) => {
    const directGroupActions = group.actions.filter((action) => action.parentElement === group).reverse();
    const canOverflowGroup = directGroupActions.length > 2 && !group.overflowActionsDisabled;
    let visibleActionCount = directGroupActions.length;
    let slotsChanged = false;

    directGroupActions.forEach((groupAction) => {
      const shouldOverflow =
        needToSlotCount > 0 && canOverflowGroup && visibleActionCount > 1 && !groupAction.overflowDisabled;
      const isOverflowed = groupAction.slot === ACTION_GROUP_SLOTS.menuActions;

      if (shouldOverflow) {
        visibleActionCount--;
        needToSlotCount--;
      }

      if (shouldOverflow || isOverflowed) {
        groupAction.textEnabled = shouldOverflow ? true : expanded;
      }

      if (shouldOverflow === isOverflowed) {
        return;
      }

      slotsChanged = true;

      if (shouldOverflow) {
        groupAction.setAttribute("slot", ACTION_GROUP_SLOTS.menuActions);
      } else {
        groupAction.removeAttribute("slot");
      }
    });

    if (slotsChanged) {
      group.manager.component.requestUpdate();
    }
  });
};
