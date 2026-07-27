import { html } from "../../../support/formatting";

type FieldSetStoryArgs = {
  disabled: boolean;
  legendText: string;
  legendTextColor?: string;
  gap?: string;
  scale: "s" | "m" | "l";
  layout: "vertical" | "horizontal" | "columns";
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  prefixAutoWidth: boolean;
  suffixAutoWidth: boolean;
};

export default {
  title: "Components/Field Set",
  parameters: {
    layout: "padded",
  },
  args: {
    disabled: false,
    legendText: "Field Set legend",
    legendTextColor: "",
    scale: "m",
    layout: "vertical",
    columns: 2,
    prefixAutoWidth: false,
    suffixAutoWidth: false,
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    gap: {
      name: "spacing",
      control: { type: "text" },
    },
    layout: {
      options: ["vertical", "horizontal", "columns"],
      control: { type: "radio" },
    },
    columns: {
      options: [1, 2, 3, 4, 5, 6],
      control: { type: "radio" },
    },
    legendText: {
      control: { type: "text" },
    },
    legendTextColor: {
      control: { type: "text" },
    },
    prefixAutoWidth: {
      control: { type: "boolean" },
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
    suffixAutoWidth: {
      control: { type: "boolean" },
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
      ${args.layout === "columns" && args.columns ? `columns="${args.columns}"` : ""}
      ${args.disabled ? "disabled" : ""}
      layout="${args.layout}"
      scale="${args.scale}"
      ${style ? `style="${style}"` : ""}
    >
      <div slot="legend">${args.legendText}</div>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input
        label-text="Label"
        placeholder="Placeholder"
        status="invalid"
        validation-message="This field is required."
        validation-icon="frown"
      ></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder" disabled></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-notice scale="${args.scale}" slot="notice" open kind="danger" icon="exclamation-mark-triangle-f">
        <div slot="title">Notice</div>
      </calcite-notice>
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
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${simple({ ...args, layout: "vertical", legendText: "Vertical" })}
    ${simple({ ...args, layout: "horizontal", legendText: "Horizontal" })}
    ${simple({ ...args, columns: 1, layout: "columns", legendText: "Columns (1)" })}
    ${simple({ ...args, columns: 2, layout: "columns", legendText: "Columns (2)" })}
    ${simple({ ...args, columns: 3, layout: "columns", legendText: "Columns (3)" })}
    ${simple({ ...args, columns: 4, layout: "columns", legendText: "Columns (4)" })}
    ${simple({ ...args, columns: 5, layout: "columns", legendText: "Columns (5)" })}
    ${simple({ ...args, columns: 6, layout: "columns", legendText: "Columns (6)" })}
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

export const prefixAndSuffixAutoWidth = (args: FieldSetStoryArgs): string => html`
  <calcite-field-set
    ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
    ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
  >
    <div slot="legend">prefix and suffix auto-width</div>
    <calcite-input
      label-text="Desired size"
      prefix-text="prefix"
      suffix-text="px"
      placeholder="Enter a size"
    ></calcite-input>
    <calcite-input
      label-text="Desired size"
      prefix-text="longer prefix"
      suffix-text="pixels"
      placeholder="Enter a size"
    ></calcite-input>
    <calcite-input
      label-text="Desired size"
      prefix-text="abc"
      suffix-text="centimeters"
      placeholder="Enter a size"
    ></calcite-input>
  </calcite-field-set>
`;
prefixAndSuffixAutoWidth.args = { prefixAutoWidth: true, suffixAutoWidth: true };
prefixAndSuffixAutoWidth.parameters = {
  controls: { include: ["prefixAutoWidth", "suffixAutoWidth"] },
};
