import { forceUpdate } from "@stencil/core";

const actionHeight = 48;
const groupMargin = 16;

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
  const maxActionsCount = getMaxActionCount({ height, groupCount });
  return actionCount >= maxActionsCount ? actionCount - maxActionsCount + 2 : 0;
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
  let neededToSlot = overflowCount;
  actionGroups
    .reverse()
    .sort((a, b) => b.childElementCount - a.childElementCount)
    .forEach((group) => {
      const groupActions = Array.from(group.querySelectorAll("calcite-action")).reverse();

      groupActions.forEach((groupAction) => {
        groupAction.removeAttribute("slot");
        groupAction.textEnabled = expanded;
      });

      if (neededToSlot > 1) {
        groupActions.some((groupAction) => {
          const unslottedActions = groupActions.filter((action) => !action.slot);

          if (unslottedActions.length > 1 && groupActions.length > 2) {
            groupAction.textEnabled = true;
            groupAction.setAttribute("slot", "menu-actions");

            neededToSlot--;
          }

          return neededToSlot < 1;
        });
      }

      forceUpdate(group);
    });
};
