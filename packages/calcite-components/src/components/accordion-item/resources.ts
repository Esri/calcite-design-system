import { IconName } from "../icon/interfaces";
import { Appearance, Position, IconType } from "../interfaces";

export const SLOTS = {
  actionsStart: "actions-start",
  actionsEnd: "actions-end",
  contentEnd: "content-end",
  contentStart: "content-start",
};

export const CSS = {
  actionsEnd: "actions-end",
  actionsStart: "actions-start",
  content: "content",
  description: "description",
  expandIcon: "expand-icon",
  header: "header",
  headerContainer: "header-container",
  headerContent: "header-content",
  headerText: "header-text",
  headerAppearance: (appearance: Appearance) => `header--${appearance}` as const,
  heading: "heading",
  icon: "icon",
  iconEnd: "icon--end",
  iconStart: "icon--start",
  iconPosition: (iconPosition: Position) => `icon-position--${iconPosition}` as const,
  iconType: (iconType: IconType) => `icon-type--${iconType}` as const,
  item: "item",
  slotContentEnd: "slot-content-end",
  slotContentStart: "slot-content-start",
};

export const IDS = {
  section: "section",
  sectionToggle: "section-toggle",
};

export const ICONS = {
  chevronDown: "chevronDown" as IconName,
  caretDown: "caretDown" as IconName,
  plus: "plus" as IconName,
  minus: "minus" as IconName,
};
