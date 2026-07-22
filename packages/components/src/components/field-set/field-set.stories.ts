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
    legendTextColor: "",
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
      name: "spacing",
      control: { type: "text" },
    },
    layout: {
      options: ["vertical", "horizontal", "grid"],
      control: { type: "radio" },
    },
    legendText: {
      control: { type: "text" },
    },
    legendTextColor: {
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
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder" disabled></calcite-input>
    </calcite-field-set>
  `;
};

export const scales = (args: FieldSetStoryArgs): string => html`
  <div style="display: flex; gap: 3rem;">
    ${simple({ ...args, legendText: "Small", scale: "s" })} ${simple({ ...args, legendText: "Medium (default)" })}
    ${simple({ ...args, legendText: "Large", scale: "l" })}
  </div>
`;
scales.args = { scale: "m" };
scales.parameters = { controls: { disable: true } };

export const layouts = (args: FieldSetStoryArgs): string => html`
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    ${simple({ ...args, layout: "vertical", legendText: "Vertical" })}
    ${simple({ ...args, layout: "horizontal", legendText: "Horizontal" })}
    ${simple({ ...args, columns: 2, layout: "grid", legendText: "Grid with 2 columns" })}
    ${simple({ ...args, columns: 3, layout: "grid", legendText: "Grid with 3 columns" })}
    ${simple({ ...args, columns: 4, layout: "grid", legendText: "Grid with 4 columns" })}
    ${simple({ ...args, columns: 5, layout: "grid", legendText: "Grid with 5 columns" })}
    ${simple({ ...args, columns: 6, layout: "grid", legendText: "Grid with 6 columns" })}
  </div>
`;
layouts.args = { columns: 2, layout: "vertical" };
layouts.parameters = { controls: { disable: true } };

export const disabled = (args: FieldSetStoryArgs): string => simple(args);
disabled.args = { disabled: true };
disabled.parameters = { controls: { disable: true } };

export const customSpacing = (args: FieldSetStoryArgs): string => simple(args);
customSpacing.args = { gap: "40px" };
customSpacing.parameters = { controls: { disable: true } };

export const customLegendColor = (args: FieldSetStoryArgs): string => simple(args);
customLegendColor.args = { legendTextColor: "blue" };
customLegendColor.parameters = { controls: { disable: true } };
