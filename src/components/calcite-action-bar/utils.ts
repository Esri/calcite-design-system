import { forceUpdate } from "@stencil/core";
import { SLOTS as ACTION_MENU_SLOTS } from "../calcite-action-menu/resources";
import { SLOTS as ACTION_GROUP_SLOTS } from "../calcite-action-group/resources";

const groupBufferHeight = 2;

const getMaxActionCount = ({
  height,
  actionHeight,
  groupCount
}: {
  height: number;
  actionHeight: number;
  groupCount: number;
}): number => {
  return Math.floor((height - groupCount * groupBufferHeight) / actionHeight);
};

export const getOverflowCount = ({
  actionCount,
  actionHeight,
  height,
  groupCount
}: {
  actionCount: number;
  actionHeight: number;
  height: number;
  groupCount: number;
}): number => {
  return Math.max(actionCount - getMaxActionCount({ height, actionHeight, groupCount }), 0);
};

export const queryActions = (el: HTMLElement): HTMLCalciteActionElement[] => {
  return Array.from(el.querySelectorAll("calcite-action")).filter((action) =>
    action.closest("calcite-action-menu") ? action.slot === ACTION_MENU_SLOTS.trigger : true
  );
};

export const overflowActions = ({
  actionGroups,
  expanded,
  overflowCount
}: {
  actionGroups: HTMLCalciteActionGroupElement[];
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

    forceUpdate(group);
  });
};
