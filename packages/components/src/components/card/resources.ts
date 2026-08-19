import type { Card } from "./card";

import { IconName } from "../icon/types";

export const CSS = {
  container: "container",
  contentWrapper: "content-wrapper",
  header: "header",
  footer: "footer",
  heading: "heading",
  description: "description",
  checkboxWrapper: "checkbox-wrapper",
  checkboxWrapperDeprecated: "checkbox-wrapper-deprecated",
  thumbnailWrapper: "thumbnail-wrapper",
  headerTextContainer: "header-text-container",
  cardContent: "card-content",
  hasSlottedContent: "has-slotted-content",
};

export const SLOTS = {
  thumbnail: "thumbnail",
  heading: "heading",
  description: "description",
  footerStart: "footer-start",
  footerEnd: "footer-end",
};

export const ICONS: Record<string, IconName> = {
  selected: "check-square-f",
  unselected: "square",
  selectedSingle: "circle-f",
  unselectedSingle: "circle",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isCard(el: Element | null | EventTarget): el is Card["el"] {
  return (el as Element | null)?.tagName === "CALCITE-CARD";
}
