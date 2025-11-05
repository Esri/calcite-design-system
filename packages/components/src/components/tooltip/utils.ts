// @ts-strict-ignore
import { ReferenceElement } from "../../utils/floating-ui";
import { queryElementRoots } from "../../utils/dom";
import type { Tooltip } from "./tooltip";

export function getEffectiveReferenceElement(tooltip: Tooltip["el"]): ReferenceElement {
  const { referenceElement } = tooltip;

  return (
    (typeof referenceElement === "string" ? queryElementRoots(tooltip, { id: referenceElement }) : referenceElement) ||
    null
  );
}
