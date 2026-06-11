import { html } from "../../../support/formatting";
import type { Handle } from "./handle";

type HandleStoryArgs = Pick<Handle, "disabled" | "dragHandle" | "label" | "selected">;

export default {
  title: "Components/Handle",
  args: {
    disabled: false,
    dragHandle: "Drag item",
    label: "Item",
    selected: false,
  },
  argTypes: {
    label: {
      control: { type: "text" },
    },
    dragHandle: {
      control: { type: "text" },
    },
  },
};

export const simple = (args: HandleStoryArgs): string => html`
  <calcite-handle
    ${args.disabled ? "disabled" : ""}
    ${args.selected ? "selected" : ""}
    label="${args.label}"
    drag-handle="${args.dragHandle}"
  ></calcite-handle>
`;

export const activated = (): string => html` <calcite-handle activated></calcite-handle> `;

export const disabled = (): string => html` <calcite-handle disabled></calcite-handle> `;
