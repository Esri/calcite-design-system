import { FunctionalComponent, h, VNode } from "@stencil/core";
import { StarIconProps } from "../interfaces";

export const StarIcon: FunctionalComponent<StarIconProps> = ({ full, scale, partial }): VNode => (
  <calcite-icon
    {...{
      class: partial ? undefined : "icon",
      icon: full ? "star-f" : "star",
      scale,
    }}
  />
);
