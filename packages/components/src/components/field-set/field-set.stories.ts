import { html } from "../../../support/formatting";

type FieldSetStoryArgs = {
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  disabled: boolean;
  gap?: string;
  layout: "vertical" | "horizontal" | "grid";
  legendText: string;
  legendTextColor?: string;
  scale: "s" | "m" | "l";
};

export default {
  title: "Components/Field Set",
  parameters: {
    layout: "padded",
  },
  args: {
    columns: 2,
    disabled: false,
    layout: "vertical",
    legendText: "Field Set legend",
    scale: "m",
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    columns: {
      options: [1, 2, 3, 4, 5, 6],
      control: { type: "radio" },
    },
    gap: {
      control: { type: "text" },
    },
    layout: {
      options: ["vertical", "horizontal", "grid"],
      control: { type: "radio" },
    },
    legendTextColor: {
      control: { type: "text" },
    },
    legendText: {
      control: { type: "text" },
    },
    scale: {
      options: ["s", "m", "l"],
      control: {
        type: "radio",
        labels: {
          m: "m (default)",
        },
      },
    },
  },
};

export const simple = (args: FieldSetStoryArgs): string => {
  const style = [
    args.gap ? `--calcite-field-set-space: ${args.gap};` : "",
    args.legendTextColor ? `--calcite-field-set-legend-text-color: ${args.legendTextColor};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return html`
    <calcite-field-set
      ${args.columns ? `columns="${args.columns}"` : ""}
      ${args.disabled ? "disabled" : ""}
      layout="${args.layout}"
      scale="${args.scale}"
      ${style ? `style="${style}"` : ""}
    >
      <div slot="legend">${args.legendText}</div>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder" disabled></calcite-input>
      <calcite-input
        label-text="Label"
        placeholder="Placeholder"
        status="invalid"
        validation-message="This field is required."
        validation-icon="frown"
      ></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder" disabled></calcite-input>
      <calcite-input
        label-text="Label"
        placeholder="Placeholder"
        status="invalid"
        validation-message="This field is required."
        validation-icon="frown"
      ></calcite-input>
    </calcite-field-set>
  `;
};
