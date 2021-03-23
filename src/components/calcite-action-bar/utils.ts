import { forceUpdate } from "@stencil/core";

const actionHeight = 48;
const groupMargin = 16;

const getMaxActionCount = ({ height, groupCount }: { height: number; groupCount: number }): number => {
  return Math.floor((height - groupCount * groupMargin) / actionHeight);
};

export const getOverflowTotal = ({
  actionCount,
  height,
  groupCount
}: {
  actionCount: number;
  height: number;
  groupCount: number;
}): number => {
  const maxActionsCount = getMaxActionCount({ height, groupCount });
  return actionCount >= maxActionsCount ? actionCount - maxActionsCount + 1 : 0;
};

export const overflowActions = ({
  actionGroups,
  expanded,
  overflowTotal
}: {
  actionGroups: HTMLCalciteActionGroupElement[];
  expanded: boolean;
  overflowTotal: number;
}): void => {
  let slottedCount = 0;
  actionGroups
    .sort((a, b) => b.childElementCount - a.childElementCount)
    .forEach((group) => {
      const groupActions = Array.from(group.querySelectorAll("calcite-action")).reverse();

      groupActions.forEach((groupAction) => {
        groupAction.removeAttribute("slot");
        groupAction.textEnabled = expanded;
      });

      if (slottedCount < overflowTotal) {
        groupActions.some((groupAction) => {
          const unslottedActions = groupActions.filter((action) => !action.slot);

          if (unslottedActions.length > 1 && groupActions.length > 1) {
            groupAction.textEnabled = true;
            groupAction.setAttribute("slot", "menu-actions");
            slottedCount++;
          }

          return slottedCount >= overflowTotal;
        });
      }

      forceUpdate(group);
    });
};
