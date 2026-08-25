import { isTag } from "../resources";

export const CSS = {
  buttonLoader: "calcite-button--loader",
  content: "content",
  contentSlotted: "content--slotted",
  icon: "icon",
  iconStart: "icon--start",
  iconEnd: "icon--end",
  loadingIn: "loading-in",
  loadingOut: "loading-out",
  iconStartEmpty: "icon-start-empty",
  iconEndEmpty: "icon-end-empty",
  buttonPadding: "button-padding",
  buttonPaddingShrunk: "button-padding--shrunk",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isButton = isTag("calcite-button");
