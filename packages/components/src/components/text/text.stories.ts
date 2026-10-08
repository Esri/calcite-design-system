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
      return html`
        <style>
          .text-container {
            display: grid;
            gap: 8px;
          }
          .text-container > calcite-text {
            width: ${containerWidth}px;
            border: 1px solid var(--calcite-color-border-3);
            padding: 4px;
          }
        </style>
        <div class="text-container">${story()}</div>
      `;
    },
  ],
};

export const simple = (args: TextStoryArgs): string => html`
  <calcite-text truncate-position="${args.truncatePosition}">
    The Rocky Mountain range spans multiple states and includes several major peaks and protected ecosystems.
  </calcite-text>
`;

simple.argTypes = {
  truncatePosition: {
    options: ["end", "middle"],
    control: { type: "select" },
  },
  // maxLines: {
  //   control: { type: "number" },
  // },
};

export const truncatePosition = (): string => html`
  <p>truncatePosition="end"</p>
  <calcite-text truncate-position="end">
    The Rocky Mountain range spans multiple states and includes several major peaks and protected ecosystems.
  </calcite-text>

  <p>truncatePosition="middle"</p>
  <calcite-text truncate-position="middle">
    The Rocky Mountain range spans multiple states and includes several major peaks and protected ecosystems.
  </calcite-text>
`;

export const maxLines = (args: TextStoryArgs): string => html`
  <p>maxLines="${args.maxLines}"</p>
  <calcite-text max-lines="${args.maxLines}">
    The Appalachian Mountains are a system of mountains in eastern North America, extending from Canada to Alabama.
  </calcite-text>
  <p>maxLines="${args.maxLines}" + truncatePosition="middle"</p>
  <calcite-text max-lines="${args.maxLines}" truncate-position="middle">
    The Appalachian Mountains are a system of mountains in eastern North America, extending from Canada to Alabama.
  </calcite-text>
`;

maxLines.args = {
  maxLines: 3,
};
