import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { Text } from "./text";
import type { StoryContext } from "@storybook/web-components-vite";

type TextStoryArgs = Pick<Text, "maxLines" | "tooltipEnabled" | "truncatePosition"> & {
  text: string;
  containerWidth: number;
};

export default {
  title: "Components/Text",
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
      if (context.parameters.disableDecorators) {
        return story();
      }
      return html`
        <div style="width: ${containerWidth}px; border: 1px solid var(--calcite-color-border-3); padding: 8px;">
          ${story()}
        </div>
      `;
    },
  ],
};

export const simple = (args: TextStoryArgs): string => html`
  <calcite-text
    truncate-position="${args.truncatePosition}"
    max-lines="${args.maxLines}"
    ${boolean("tooltip-enabled", args.tooltipEnabled)}
    >The Rocky Mountain range spans multiple states and includes several major peaks and protected
    ecosystems.</calcite-text
  >
`;

simple.args = {
  maxLines: 0,
  tooltipEnabled: false,
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
  <calcite-text truncate-position="middle" max-lines="0">
    https://example.com/trails/north-america/rocky-mountains/alpine-lakes-route
  </calcite-text>
`;

export const maxLines = (): string => html`
  <calcite-text max-lines="2">
    The Mississippi River is one of the world&apos;s major river systems and drains much of the central United States.
  </calcite-text>
`;

export const tooltipEnabled = (): string => html`
  <calcite-text tooltip-enabled max-lines="1" truncate-position="middle">
    Andes-Mountain-Observatory-Annual-Climate-Report-Archive-2026
  </calcite-text>
`;
