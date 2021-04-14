import { FunctionalComponent, h } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface CalciteHeadingProps extends JSXBase.HTMLAttributes {
  level: HeadingLevel;
}

export function constrainHeadingLevel(level: number): HeadingLevel {
  return Math.min(Math.max(Math.ceil(level), 1), 6) as HeadingLevel;
}

export const CalciteHeading: FunctionalComponent<CalciteHeadingProps> = (props, children) => {
  const HeadingTag = `h${props.level}`;

  delete props.level;

  return <HeadingTag {...props}>{children}</HeadingTag>;
};
