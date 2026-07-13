import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { Typography } from "./typography";
import type { StoryContext } from "@storybook/web-components-vite";

type TypographyStoryArgs = Pick<Typography, "maxLines" | "tooltipEnabled" | "truncatePosition"> & {
  text: string;
  containerWidth: number;
};

export default {
  title: "Components/Typography",
  args: {
    containerWidth: 200,
  },
  argTypes: {
    containerWidth: {
      control: { type: "number" },
    },
  },
  decorators: [
    (story: () => string, context: StoryContext): string => {
      const { containerWidth } = context.args;
      return html`
        <div style="width: ${containerWidth}px; border: 1px solid var(--calcite-color-border-3); padding: 8px;">
          ${story()}
        </div>
      `;
    },
  ],
};

export const simple = (args: TypographyStoryArgs): string => html`
  <calcite-typography
    truncate-position="${args.truncatePosition}"
    max-lines="${args.maxLines}"
    ${boolean("tooltip-enabled", args.tooltipEnabled)}
    >The Rocky Mountain range spans multiple states and includes several major peaks and protected
    ecosystems.</calcite-typography
  >
`;

simple.args = {
  maxLines: 1,
  tooltipEnabled: false,
  truncatePosition: "end",
};

simple.argTypes = {
  truncatePosition: {
    options: ["end", "middle"],
    control: { type: "select" },
  },
  maxLines: {
    control: { type: "number" },
  },
};

export const middleTruncation = (): string => html`
  <calcite-typography truncate-position="middle" max-lines="0">
    https://example.com/trails/north-america/rocky-mountains/alpine-lakes-route
  </calcite-typography>
`;

export const endTruncationMultiLine = (): string => html`
  <calcite-typography max-lines="2">
    The Mississippi River is one of the world&apos;s major river systems and drains much of the central United States.
  </calcite-typography>
`;

export const tooltipEnabled = (): string => html`
  <calcite-typography tooltip-enabled max-lines="1" truncate-position="middle">
    Andes-Mountain-Observatory-Annual-Climate-Report-Archive-2026
  </calcite-typography>
`;
