import type { Avatar } from "./avatar";

export const CSS = {
  thumbnail: "thumbnail",
  background: "background",
  initials: "initials",
  icon: "icon",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isAvatar(el: Element | null | EventTarget): el is Avatar["el"] {
  return (el as Element | null)?.tagName === "CALCITE-AVATAR";
}
