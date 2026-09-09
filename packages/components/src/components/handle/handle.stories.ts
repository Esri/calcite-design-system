import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import type { Handle } from "./handle";
import "./handle"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature

type HandleStoryArgs = Pick<Handle, "disabled" | "dragHandle" | "selected">;

export default {
  title: "Components/Handle",
  args: {
    disabled: false,
    dragHandle: "Drag item",
    selected: false,
  },
  argTypes: {
    dragHandle: {
      control: { type: "text" },
    },
  },
};

export const simple = (args: HandleStoryArgs): string => html`
  <calcite-handle
    ${boolean("disabled", args.disabled)}
    ${boolean("selected", args.selected)}
    drag-handle="${args.dragHandle}"
  ></calcite-handle>
`;

export const activated = (): string => html` <calcite-handle activated></calcite-handle> `;

export const disabled = (): string => html` <calcite-handle disabled></calcite-handle> `;
