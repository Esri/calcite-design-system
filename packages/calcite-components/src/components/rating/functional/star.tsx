import { TemplateResult } from "lit-html";
import { h } from "@arcgis/lumina";
import { StarIconProps } from "../interfaces";

export const StarIcon = ({ full, scale, partial }: StarIconProps): TemplateResult => (
  <calcite-icon
    class={partial ? undefined : "icon"}
    icon={full ? "star-f" : "star"}
    scale={scale}
  />
);
