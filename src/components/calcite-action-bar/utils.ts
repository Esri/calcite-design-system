import { forceUpdate } from "@stencil/core";

const actionHeight = 50;
const groupMargin = 18;

const getMaxActionCount = ({ height, groupCount }: { height: number; groupCount: number }): number => {
  return Math.floor((height - groupCount * groupMargin) / actionHeight);
};

export const getOverflowCount = ({
  actionCount,
  height,
  groupCount
}: {
  actionCount: number;
  height: number;
  groupCount: number;
}): number => {
  return Math.max(actionCount - getMaxActionCount({ height, groupCount }), 0);
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

    const groupActions = Array.from(group.querySelectorAll("calcite-action")).reverse();

    groupActions.forEach((groupAction) => {
      groupAction.removeAttribute("slot");
      groupAction.textEnabled = expanded;
    });

    if (needToSlotCount > 0) {
      groupActions.some((groupAction) => {
        const unslottedActions = groupActions.filter((action) => !action.slot);

        if (unslottedActions.length > 1 && groupActions.length > 2) {
          groupAction.textEnabled = true;
          groupAction.setAttribute("slot", "menu-actions");
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
