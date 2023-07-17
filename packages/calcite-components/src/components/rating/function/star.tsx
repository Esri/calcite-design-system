import { FunctionalComponent, h } from "@stencil/core";

import { StarIconProps } from "../interfaces";

export const StarIcon: FunctionalComponent<StarIconProps> = ({ full, scale, partial }) => (
  <calcite-icon
    {...{
      class: partial ? undefined : "icon",
      icon: full ? "star-f" : "star",
      scale,
    }}
  />
);
