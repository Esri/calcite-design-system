import { FunctionalComponent, h } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingWizardProps extends JSXBase.HTMLAttributes {
  level: HeadingLevel;
}

// (∩｀-´)⊃━☆ﾟ.*･｡ﾟ
export const HeadingWizard: FunctionalComponent<HeadingWizardProps> = (props, children) => {
  const HeadingTag = `h${props.level}`;

  delete props.level;

  return <HeadingTag {...props}>{children}</HeadingTag>;
};
