import { FunctionalComponent, h } from "@stencil/core";

import { JSXBase } from "@stencil/core/internal";
import SVGAttributes = JSXBase.SVGAttributes;

interface CalciteSVGProps {
  size: string;
  path: string;
  svgAttributes?: SVGAttributes;
  title?: string;
}

export const CalciteIcon: FunctionalComponent<CalciteSVGProps> = ({
  path,
  size,
  svgAttributes,
  title
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    width={size}
    fill="currentColor"
    viewBox={`0 0 ${size} ${size}`}
    {...svgAttributes}
  >
    {title ? <title>{title}</title> : null}
    <path d={path} />
  </svg>
);

export default CalciteIcon;
