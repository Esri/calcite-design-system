import { FunctionalComponent, h, VNode } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends Pick<JSXBase.HTMLAttributes, "class" | "key"> {
  level?: HeadingLevel;
}

export function constrainHeadingLevel(level: number): HeadingLevel {
  return Math.min(Math.max(Math.ceil(level), 1), 6) as HeadingLevel;
}

export const Heading: FunctionalComponent<HeadingProps> = (props, children): VNode => {
  const HeadingTag = props.level ? `h${props.level}` : "div";

  return (
    <HeadingTag class={props.class} key={props.key}>
      {children}
    </HeadingTag>
  );
};
