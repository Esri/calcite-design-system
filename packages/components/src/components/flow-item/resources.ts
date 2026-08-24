import { isTag } from "../resources";
import { IconName } from "../icon/types";

export const CSS = {
  backButton: "back-button",
};

export const ICONS: Record<string, IconName> = {
  backLeft: "chevron-left",
  backRight: "chevron-right",
};

export const SLOTS = {
  actionBar: "action-bar",
  alerts: "alerts",
  contentTop: "content-top",
  contentBottom: "content-bottom",
  headerActionsStart: "header-actions-start",
  headerActionsEnd: "header-actions-end",
  description: "description",
  heading: "heading",
  headerMenuActions: "header-menu-actions",
  headerContent: "header-content",
  fab: "fab",
  footer: "footer",
  footerEnd: "footer-end",
  footerStart: "footer-start",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isFlowItem = isTag("calcite-flow-item");
