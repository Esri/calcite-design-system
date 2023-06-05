import { FunctionalComponent, h } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends JSXBase.HTMLAttributes {
  level?: HeadingLevel;
}

export function constrainHeadingLevel(level: number): HeadingLevel {
  return Math.min(Math.max(Math.ceil(level), 1), 6) as HeadingLevel;
}

export const Heading: FunctionalComponent<HeadingProps> = (props, children) => {
  const HeadingTag = props.level ? `h${props.level}` : "div";

  delete props.level;

  return <HeadingTag {...props}>{children}</HeadingTag>;
};
