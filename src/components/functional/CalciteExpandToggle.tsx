import { FunctionalComponent, h } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { CalcitePosition } from "../interfaces";

interface CalciteExpandToggleProps {
  expanded: boolean;
  intlExpand: string;
  intlCollapse: string;
  el: HTMLElement;
  position: CalcitePosition;
  tooltip?: HTMLCalciteTooltipElement;
  toggle: () => void;
  ref?: (el: HTMLElement) => void;
}

const ICONS = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right"
};

function getCalcitePosition(position: CalcitePosition, el: HTMLElement): CalcitePosition {
  return position || el.closest("calcite-shell-panel")?.position || "start";
}

export function toggleChildActionText({
  parent,
  expanded
}: {
  parent: HTMLElement;
  expanded: boolean;
}): void {
  parent.querySelectorAll("calcite-action").forEach((action) => (action.textEnabled = expanded));
}

const setTooltipReference = ({
  tooltip,
  referenceElement,
  expanded,
  ref
}: {
  tooltip: HTMLCalciteTooltipElement;
  referenceElement: HTMLCalciteActionElement;
  expanded: boolean;
  ref?: (el: HTMLElement) => void;
}): HTMLCalciteActionElement => {
  if (tooltip) {
    tooltip.referenceElement = !expanded && referenceElement;
  }

  if (ref) {
    ref(referenceElement);
  }

  return referenceElement;
};

export const CalciteExpandToggle: FunctionalComponent<CalciteExpandToggleProps> = ({
  expanded,
  intlExpand,
  intlCollapse,
  toggle,
  el,
  position,
  tooltip,
  ref
}) => {
  const rtl = getElementDir(el) === "rtl";

  const expandText = expanded ? intlCollapse : intlExpand;
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
      ref={(referenceElement): HTMLCalciteActionElement =>
        setTooltipReference({ tooltip, referenceElement, expanded, ref })
      }
      text={expandText}
      textEnabled={expanded}
    />
  );

  return tooltip ? <calcite-tooltip-manager>{actionNode}</calcite-tooltip-manager> : actionNode;
};
