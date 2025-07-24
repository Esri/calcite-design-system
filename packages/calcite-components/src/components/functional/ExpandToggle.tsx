// @ts-strict-ignore
import { TemplateResult } from "lit-html";
import { h } from "@arcgis/lumina";
import { getElementDir } from "../../utils/dom";
import { queryActions } from "../action-bar/utils";
import { SLOTS as ACTION_GROUP_SLOTS } from "../action-group/resources";
import { Position, Scale } from "../interfaces";
import type { Action } from "../action/action";
import type { Tooltip } from "../tooltip/tooltip";
import type { ActionGroup } from "../action-group/action-group";
import type { ActionMenu } from "../action-menu/action-menu";

interface ExpandToggleProps {
  expanded: boolean;
  expandText: string;
  collapseText: string;
  expandLabel: string;
  collapseLabel: string;
  el: HTMLElement;
  position: Position;
  tooltip?: Tooltip["el"];
  toggle: () => void;
  ref?: (el: HTMLElement) => void;
  scale?: Scale;
}

const ICONS = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right",
} as const;

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
    (el: ActionMenu["el"] | ActionGroup["el"]) => (el.expanded = expanded),
  );
}

const setTooltipReference = ({
  tooltip,
  referenceElement,
  expanded,
  ref,
}: {
  tooltip: Tooltip["el"];
  referenceElement: Action["el"];
  expanded: boolean;
  ref?: (el: HTMLElement) => void;
}): Action["el"] => {
  if (tooltip) {
    tooltip.referenceElement = !expanded && referenceElement ? referenceElement : null;
  }

  if (ref) {
    ref(referenceElement);
  }

  return referenceElement;
};

export const ExpandToggle = ({
  expanded,
  expandText,
  collapseText,
  expandLabel,
  collapseLabel,
  toggle,
  el,
  position,
  tooltip,
  ref,
  scale,
}: ExpandToggleProps): TemplateResult => {
  const rtl = getElementDir(el) === "rtl";

  const text = expanded ? collapseText : expandText;
  const label = expanded ? collapseLabel : expandLabel;
  const icons = [ICONS.chevronsLeft, ICONS.chevronsRight];

  if (rtl) {
    icons.reverse();
  }

  const end = getCalcitePosition(position, el) === "end";
  const expandIcon = end ? icons[1] : icons[0];
  const collapseIcon = end ? icons[0] : icons[1];

  const actionNode = (
    <calcite-action
      aria={{ ariaExpanded: expanded }}
      icon={expanded ? expandIcon : collapseIcon}
      id="expand-toggle"
      label={label}
      onClick={toggle}
      ref={(referenceElement): Action["el"] =>
        setTooltipReference({ tooltip, referenceElement, expanded, ref })
      }
      scale={scale}
      text={text}
      textEnabled={expanded}
      title={!expanded && !tooltip ? text : null}
    />
  );

  return actionNode;
};
