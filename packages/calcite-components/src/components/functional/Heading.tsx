import { TemplateResult } from "lit-html";
import { unsafeStatic, literal } from "lit-html/static.js";
import { h, JsxNode, LuminaJsx } from "@arcgis/lumina";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends Pick<LuminaJsx.HTMLAttributes, "class" | "key"> {
  level?: HeadingLevel;
}

export function constrainHeadingLevel(level: number): HeadingLevel {
  return Math.min(Math.max(Math.ceil(level), 1), 6) as HeadingLevel;
}

export const Heading = ({
  children,
  ...props
}: HeadingProps & { children: JsxNode }): TemplateResult => {
  const DynamicHtmlTag = props.level
    ? (unsafeStatic(`h${props.level}`) as unknown as "h1")
    : (literal`div` as unknown as "div");

  return (
    <DynamicHtmlTag class={props.class} key={props.key}>
      {children}
    </DynamicHtmlTag>
  );
};
