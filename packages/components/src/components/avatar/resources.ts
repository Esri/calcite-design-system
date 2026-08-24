import { isTag } from "../resources";

export const CSS = {
  thumbnail: "thumbnail",
  background: "background",
  initials: "initials",
  icon: "icon",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isAvatar = isTag("calcite-avatar");
