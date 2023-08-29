import { FunctionalComponent, h } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { queryActions } from "../action-bar/utils";
import { SLOTS as ACTION_GROUP_SLOTS } from "../action-group/resources";
import { Position, Scale } from "../interfaces";

interface ExpandToggleProps {
  expanded: boolean;
  expandText: string;
  collapseText: string;
  el: HTMLElement;
  position: Position;
  tooltip?: HTMLCalciteTooltipElement;
  toggle: () => void;
  ref?: (el: HTMLElement) => void;
  scale?: Scale;
}

const ICONS = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right",
};

function getCalcitePosition(position: Position, el: HTMLElement): Position {
  return position || el.closest("calcite-shell-panel")?.position || "start";
}

export function toggleChildActionText({
  el,
  expanded,
}: {
  el: HTMLElement;
  expanded: boolean;
}): void {
  queryActions(el)
    .filter((el) => el.slot !== ACTION_GROUP_SLOTS.menuActions)
    .forEach((action) => (action.textEnabled = expanded));
  el.querySelectorAll("calcite-action-group, calcite-action-menu").forEach(
    (el: HTMLCalciteActionMenuElement | HTMLCalciteActionGroupElement) => (el.expanded = expanded)
  );
}

const setTooltipReference = ({
  tooltip,
  referenceElement,
  expanded,
  ref,
}: {
  tooltip: HTMLCalciteTooltipElement;
  referenceElement: HTMLCalciteActionElement;
  expanded: boolean;
  ref?: (el: HTMLElement) => void;
}): HTMLCalciteActionElement => {
  if (tooltip) {
    tooltip.referenceElement = !expanded && referenceElement ? referenceElement : null;
  }

  if (ref) {
    ref(referenceElement);
  }

  return referenceElement;
};

export const ExpandToggle: FunctionalComponent<ExpandToggleProps> = ({
  expanded,
  expandText,
  collapseText,
  toggle,
  el,
  position,
  tooltip,
  ref,
  scale,
}) => {
  const rtl = getElementDir(el) === "rtl";

  const text = expanded ? collapseText : expandText;
  const icons = [ICONS.chevronsLeft, ICONS.chevronsRight];

  if (rtl) {
    icons.reverse();
  }

  const end = getCalcitePosition(position, el) === "end";
  const expandIcon = end ? icons[1] : icons[0];
  const collapseIcon = end ? icons[0] : icons[1];

  const actionNode = (
    <calcite-action
      icon={expanded ? expandIcon : collapseIcon}
      onClick={toggle}
      scale={scale}
      text={text}
      textEnabled={expanded}
      title={!expanded && !tooltip ? text : null}
      // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
      ref={(referenceElement): HTMLCalciteActionElement =>
        setTooltipReference({ tooltip, referenceElement, expanded, ref })
      }
    />
  );

  return actionNode;
};
