import type { IconName } from "../icon/interfaces";
import type { Block } from "./block";

export const IDS = {
  content: "content",
  toggle: "toggle",
  header: "header",
};

export const CSS = {
  actionsEnd: "actions-end",
  button: "button",
  container: "container",
  content: "content",
  contentEnd: "content-end",
  contentStart: "content-start",
  description: "description",
  hasSlottedContent: "has-slotted-content",
  header: "header",
  headerContainer: "header-container",
  headerHasContent: "header--has-content",
  headerDraggable: "header--draggable",
  heading: "heading",
  icon: "icon",
  iconStart: "icon--start",
  iconEnd: "icon--end",
  iconEndContainer: "icon-end-container",
  invalid: "invalid",
  statusIcon: "status-icon",
  summary: "summary",
  title: "title",
  toggle: "toggle",
  toggleIcon: "toggle-icon",
  valid: "valid",
};

export const SLOTS = {
  actionsEnd: "actions-end",
  contentEnd: "content-end",
  contentStart: "content-start",
  headerMenuActions: "header-menu-actions",
  section: "section",
};

export const ICONS: Record<string, IconName> = {
  expanded: "chevron-up",
  collapsed: "chevron-down",
  valid: "check-circle",
  invalid: "exclamation-mark-triangle",
};

export function isBlock(el?: Element | null): el is Block["el"] {
  return el?.tagName === "CALCITE-BLOCK";
}
