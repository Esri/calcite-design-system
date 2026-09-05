import { isTag } from "../resources";

export const CSS = {
  positionContainer: "position-container",
  container: "container",
  imageContainer: "image-container",
  closeButtonContainer: "close-button-container",
  closeButton: "close-button",
  content: "content",
  hasHeader: "has-header",
  header: "header",
  headerContainer: "header-container",
  headerContent: "header-content",
  heading: "heading",
};

export const defaultPopoverPlacement = "auto";

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isPopover = isTag("calcite-popover");
