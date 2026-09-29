import { html } from "../../../support/formatting";
import { Text } from "./text";
import type { StoryContext } from "@storybook/web-components-vite";

type TextStoryArgs = Pick<Text, "maxLines" | "truncatePosition"> & {
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
  <calcite-text truncate-position="${args.truncatePosition}" max-lines="${args.maxLines}">
    The Rocky Mountain range spans multiple states and includes several major peaks and protected ecosystems.
  </calcite-text>
`;

simple.args = {
  maxLines: 0,
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

export const truncatePositionEnd = (): string => html`
  <calcite-text truncate-position="end">
    The Rocky Mountain range spans multiple states and includes several major peaks and protected ecosystems.
  </calcite-text>
`;

export const truncatePositionMiddle = (): string => html`
  <calcite-text truncate-position="middle">
    The Rocky Mountain range spans multiple states and includes several major peaks and protected ecosystems.
  </calcite-text>
`;

export const maxLines = (): string => html`
  <calcite-text max-lines="3">
    The Mississippi River is one of the world&apos;s major river systems and drains much of the central United States.
  </calcite-text>
`;

export const maxLinesWithTruncatePositionMiddle = (): string => html`
  <calcite-text max-lines="3" truncate-position="middle">
    The Appalachian Mountains are a system of mountains in eastern North America, extending from Canada to Alabama.
  </calcite-text>
`;
