import { IconName } from "../icon/interfaces";

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
  title: "title",
  subtitle: "subtitle",
};

export const ICONS = {
  selected: "check-square-f" as IconName,
  unselected: "square" as IconName,
  selectedSingle: "circle-f" as IconName,
  unselectedSingle: "circle" as IconName,
};
