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
      ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
      scale="${args.scale}"
      ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
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
      <calcite-input label-text="Color" type="color" value="#abcdef"></calcite-input>
      <calcite-input label-text="Date" type="date" value="2018-07-22"></calcite-input>
      <calcite-input label-text="Date and time" type="datetime-local" value="2018-06-12T19:30"></calcite-input>
      <calcite-input label-text="Email" type="email" value="test@test.com"></calcite-input>
      <calcite-input label-text="Month" type="month" value="2018-05"></calcite-input>
      <calcite-input label-text="Number" type="number" value="1337"></calcite-input>
      <calcite-input label-text="Phone" type="tel" value="1234567890"></calcite-input>
      <calcite-input label-text="Text" type="text" value="test"></calcite-input>
      <calcite-input label-text="Password" type="password" value="password"></calcite-input>
      <calcite-input label-text="Time" type="time" value="01:00"></calcite-input>
      <calcite-input label-text="URL" type="url" value="http://www.esri.com"></calcite-input>
      <calcite-input label-text="Week" type="week" value="2018-W26"></calcite-input>
      <calcite-text-area label-text="Feedback" placeholder="Provide your feedback"></calcite-text-area>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="prefix" suffix-text="px" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="longer prefix" suffix-text="pixels" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="abc" suffix-text="centimeters" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
      <calcite-notice hidden slot="notice" open kind="danger" icon="exclamation-mark-triangle-f">
        <div slot="title">Aggregate notice</div>
      </calcite-notice>
      <calcite-label layout="inline">
        Desired size
        <calcite-input prefix-text="prefix" suffix-text="px" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
      <calcite-label layout="inline">
        Desired size
        <calcite-input prefix-text="longer prefix" suffix-text="pixels" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
      <calcite-label layout="inline">
        Desired size
        <calcite-input prefix-text="abc" suffix-text="centimeters" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
      <calcite-inline-editable>
        <calcite-input
          label-text="Editable"
          value="Business District Tree Survey"
          placeholder="Business District Tree Survey"
        ></calcite-input>
      </calcite-inline-editable>
      <calcite-notice hidden slot="notice" open kind="danger" icon="exclamation-mark-triangle-f">
        <div slot="title">Aggregate notice</div>
      </calcite-notice>
    </calcite-field-set>
  `;
};

export const scales = (args: FieldSetStoryArgs): string => html`
  <div style="display: flex; gap: 3rem;">
    ${simple({ ...args, legendText: "Small", prefixAutoWidth: true, scale: "s", suffixAutoWidth: true })}
    ${simple({ ...args, legendText: "Medium (default)", prefixAutoWidth: true, suffixAutoWidth: true })}
    ${simple({ ...args, legendText: "Large", prefixAutoWidth: true, scale: "l", suffixAutoWidth: true })}
  </div>
`;
scales.args = { prefixAutoWidth: true, scale: "m", suffixAutoWidth: true };
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

export const prefixAndSuffixAutoWidth = (): string => html`
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem;">
    <calcite-field-set>
      <div slot="legend">no auto-width set</div>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="prefix" suffix-text="px" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="longer prefix" suffix-text="pixels" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="abc" suffix-text="centimeters" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
    </calcite-field-set>
    <calcite-field-set prefix-auto-width>
      <div slot="legend">prefix auto-width set</div>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="prefix" suffix-text="px" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="longer prefix" suffix-text="pixels" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="abc" suffix-text="centimeters" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
    </calcite-field-set>
    <calcite-field-set suffix-auto-width>
      <div slot="legend">suffix auto-width set</div>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="prefix" suffix-text="px" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="longer prefix" suffix-text="pixels" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="abc" suffix-text="centimeters" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
    </calcite-field-set>
    <calcite-field-set prefix-auto-width suffix-auto-width>
      <div slot="legend">prefix and suffix auto-width set</div>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="prefix" suffix-text="px" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="longer prefix" suffix-text="pixels" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
      <calcite-label>
        Desired size
        <calcite-input prefix-text="abc" suffix-text="centimeters" placeholder="Enter a size"> </calcite-input>
      </calcite-label>
    </calcite-field-set>
  </div>
`;
prefixAndSuffixAutoWidth.parameters = { controls: { disable: true } };
