import { TemplateResult } from "lit";
import { unsafeStatic, literal } from "lit/static-html.js";
import { bindAttribute, h, JsxNode, LuminaJsx, nothing } from "@arcgis/lumina";

/** @public */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = Pick<LuminaJsx.HTMLAttributes, "class" | "hidden" | "id" | "key" | "part"> & {
  level?: HeadingLevel;
};

export function constrainHeadingLevel(level: number): HeadingLevel {
  return Math.min(Math.max(Math.ceil(level), 1), 6) as HeadingLevel;
}

export const Heading = ({
  children,
  class: className,
  hidden = false,
  id,
  key,
  level,
  part,
}: HeadingProps & { children: JsxNode }): TemplateResult => {
  const DynamicHtmlTag = level
    ? (unsafeStatic(`h${level}`) as unknown as "h1")
    : (literal`div` as unknown as "div");

  return (
    <DynamicHtmlTag
      class={className}
      hidden={hidden}
      id={id}
      key={key}
      part={bindAttribute(part ?? nothing)}
    >
      {children}
    </DynamicHtmlTag>
  );
};
