import { isTag } from "../resources";

export const CSS = {
  frame: "frame",
  frameAdvancing: "frame--advancing",
  frameRetreating: "frame--retreating",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isFlow = isTag("calcite-flow");
