import { SLOTS as ACTION_GROUP_SLOTS, isActionGroup } from "../action-group/resources";
import type { ActionGroup } from "../action-group/action-group";
import type { Action } from "../action/action";

export const queryActions = (el: HTMLElement): Action["el"][] => {
  return Array.from(el.querySelectorAll("calcite-action")).filter((action) => {
    if (action.parentElement?.closest("calcite-action")) {
      return false;
    }

    return true;
  });
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
  actionGroups.reverse().forEach((group) => {
    let slottedWithinGroupCount = 0;

    const directGroupActions = queryActions(group)
      .filter((action) => isActionGroup(action.parentElement))
      .reverse();

    directGroupActions.forEach((groupAction) => {
      if (groupAction.slot === ACTION_GROUP_SLOTS.menuActions) {
        groupAction.removeAttribute("slot");
        groupAction.textEnabled = expanded;
      }
    });

    if (needToSlotCount > 0 && group.overflowMode !== "disabled") {
      directGroupActions.some((groupAction) => {
        const unslottedActions = directGroupActions.filter((action) => !action.slot);

        if (unslottedActions.length > 1 && directGroupActions.length > 2) {
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
