import { SLOTS as ACTION_GROUP_SLOTS, isActionGroup } from "../action-group/resources";
import { SLOTS as ACTION_MENU_SLOTS } from "../action-menu/resources";
import type { ActionMenu } from "../action-menu/action-menu";
import type { ActionGroup } from "../action-group/action-group";
import type { Action } from "../action/action";
import { isAction } from "../action/resources";

export type ActionBarItem = Action["el"] | ActionGroup["el"] | ActionMenu["el"];

export function isActionMenu(el: Element | null): el is ActionMenu["el"] {
  return el?.tagName === "CALCITE-ACTION-MENU";
}

function getNestedTriggerActions(root: Element): Action["el"][] {
  return Array.from(root.children).flatMap((child) => {
    if (isAction(child)) {
      return child.slot === ACTION_MENU_SLOTS.trigger ? [child] : [];
    }

    return getNestedTriggerActions(child);
  });
}

export const queryActions = (items: ActionBarItem[]): Action["el"][] =>
  items
    .flatMap((item) => {
      if (isActionGroup(item)) {
        return item.actions;
      }

      if (isActionMenu(item)) {
        return getNestedTriggerActions(item);
      }

      return item;
    })
    .filter((action): action is Action["el"] => !!action);

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
    let slottedWithinGroupCount = 0;

    const directGroupActions = [...group.actions].reverse();

    directGroupActions.forEach((groupAction) => {
      if (groupAction.slot === ACTION_GROUP_SLOTS.menuActions) {
        groupAction.removeAttribute("slot");
        groupAction.textEnabled = expanded;
      }
    });

    if (needToSlotCount > 0 && !group.overflowActionsDisabled) {
      directGroupActions.some((groupAction) => {
        const unslottedActions = directGroupActions.filter((action) => !action.slot);

        if (
          unslottedActions.length > 1 &&
          directGroupActions.length > 2 &&
          !groupAction.closest("calcite-action-menu") &&
          !groupAction.overflowDisabled
        ) {
          groupAction.textEnabled = true;
          groupAction.setAttribute("slot", ACTION_GROUP_SLOTS.menuActions);
          slottedWithinGroupCount++;

          if (slottedWithinGroupCount > 1) {
            needToSlotCount--;
          }
        }

        return needToSlotCount < 1;
      });
    }

    group.manager.component.requestUpdate();
  });
};
