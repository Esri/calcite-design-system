import { ReferenceElement } from "../../utils/floating-ui";
import { queryElementRoots } from "../../utils/dom";

export function getEffectiveReferenceElement(tooltip: HTMLCalciteTooltipElement): ReferenceElement {
  const { referenceElement } = tooltip;

  return (
    (typeof referenceElement === "string" ? queryElementRoots(tooltip, { id: referenceElement }) : referenceElement) ||
    null
  );
}
