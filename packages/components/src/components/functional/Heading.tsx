import { TemplateResult } from "lit";
import { unsafeStatic, literal } from "lit/static-html.js";
import { h, JsxNode, LuminaJsx } from "@arcgis/lumina";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = Pick<LuminaJsx.HTMLAttributes, "class" | "hidden" | "key"> & {
  level?: HeadingLevel;
};

export function constrainHeadingLevel(level: number): HeadingLevel {
  return Math.min(Math.max(Math.ceil(level), 1), 6) as HeadingLevel;
}

export const Heading = ({
  children,
  class: className,
  hidden,
  key,
  level,
}: HeadingProps & { children: JsxNode }): TemplateResult => {
  const DynamicHtmlTag = level
    ? (unsafeStatic(`h${level}`) as unknown as "h1")
    : (literal`div` as unknown as "div");

  return hidden === undefined ? (
    <DynamicHtmlTag class={className} key={key}>
      {children}
    </DynamicHtmlTag>
  ) : (
    <DynamicHtmlTag class={className} hidden={hidden} key={key}>
      {children}
    </DynamicHtmlTag>
  );
};
