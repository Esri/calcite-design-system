import { Appearance, Position, IconType } from "../interfaces";

export const SLOTS = {
  actionsStart: "actions-start",
  actionsEnd: "actions-end",
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
};

export const IDS = {
  section: "section",
  sectionToggle: "section-toggle",
};

export const ICONS = {
  chevronDown: "chevronDown",
  caretDown: "caretDown",
  plus: "plus",
  minus: "minus",
};
