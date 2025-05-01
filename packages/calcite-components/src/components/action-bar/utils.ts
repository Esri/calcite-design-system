import { SLOTS as ACTION_GROUP_SLOTS } from "../action-group/resources";
import { SLOTS as ACTION_MENU_SLOTS } from "../action-menu/resources";
import type { ActionGroup } from "../action-group/action-group";
import type { Action } from "../action/action";

const calculateMaxItems = ({
  bufferPx,
  itemSizes,
  size,
}: {
  bufferPx: number;
  itemSizes: number[];
  size: number;
}): number => {
  const maxSize = size - bufferPx;
  let breakpoint = itemSizes.length; // assume all items will fit
  let sizeSum = 0;
  for (const [index, size] of itemSizes.entries()) {
    sizeSum = sizeSum + size;

    if (sizeSum > maxSize) {
      breakpoint = index;
      break;
    } else {
      continue;
    }
  }

  return breakpoint;
};

export const getOverflowCount = ({
  bufferPx = 0,
  itemSizes,
  size,
}: {
  bufferPx?: number;
  itemSizes: number[];
  size: number;
}): number => {
  return Math.max(itemSizes.length - calculateMaxItems({ bufferPx, itemSizes, size }), 0);
};

export const queryActions = (el: HTMLElement): Action["el"][] => {
  return Array.from(el.querySelectorAll("calcite-action")).filter((action) =>
    action.closest("calcite-action-menu") ? action.slot === ACTION_MENU_SLOTS.trigger : true,
  );
};

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

    const groupActions = queryActions(group).reverse();

    groupActions.forEach((groupAction) => {
      if (groupAction.slot === ACTION_GROUP_SLOTS.menuActions) {
        groupAction.removeAttribute("slot");
        groupAction.textEnabled = expanded;
      }
    });

    if (needToSlotCount > 0) {
      groupActions.some((groupAction) => {
        const unslottedActions = groupActions.filter((action) => !action.slot);

        if (unslottedActions.length > 1 && groupActions.length > 2 && !groupAction.closest("calcite-action-menu")) {
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
