import { html } from "../../../support/formatting";

type FieldRowStoryArgs = {
  columnGap?: string;
  layout: "columns" | "horizontal" | "vertical";
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: string;
};

const hiddenCustomSpacingArgTypes = Object.fromEntries(
  ["columns", "layout"].map((key) => [key, { table: { disable: true }, control: false }]),
) as Partial<Record<keyof FieldRowStoryArgs, { table: { disable: true }; control: false }>>;

export default {
  title: "Components/Field Row",
  parameters: {
    layout: "padded",
  },
  args: {
    layout: "vertical",
    columnGap: "",
    columns: 1,
    gap: "",
  },
  argTypes: {
    layout: {
      options: ["vertical", "horizontal", "columns"],
      control: { type: "radio" },
    },
    columnGap: {
      name: "columnSpace",
      control: { type: "text" },
      if: { arg: "layout", eq: "columns" },
    },
    columns: {
      options: [1, 2, 3, 4, 5, 6],
      control: { type: "radio" },
      if: { arg: "layout", eq: "columns" },
    },
    gap: {
      name: "space",
      control: { type: "text" },
    },
  },
};

const getStyle = (args: FieldRowStoryArgs): string =>
  [
    args.columnGap ? `--calcite-field-row-column-gap: ${args.columnGap};` : "",
    args.gap ? `--calcite-field-row-gap: ${args.gap};` : "",
  ]
    .filter(Boolean)
    .join(" ");

const fields = (): string => html`
  <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
  <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
  <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
  <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
  <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
  <calcite-select label-text="Label">
    <calcite-option label="Austin" value="austin"></calcite-option>
    <calcite-option label="Portland" value="portland"></calcite-option>
  </calcite-select>
`;

const labels = (): string => html`
  <calcite-label>
    Label
    <calcite-input placeholder="Placeholder"></calcite-input>
  </calcite-label>
  <calcite-label>
    Label
    <calcite-input placeholder="Placeholder"></calcite-input>
  </calcite-label>
  <calcite-label>
    Label
    <calcite-input placeholder="Placeholder"></calcite-input>
  </calcite-label>
  <calcite-label>
    Label
    <calcite-input placeholder="Placeholder"></calcite-input>
  </calcite-label>
  <calcite-label>
    Label
    <calcite-input placeholder="Placeholder"></calcite-input>
  </calcite-label>
  <calcite-label>
    Label
    <calcite-select>
      <calcite-option label="Label"></calcite-option>
      <calcite-option label="Label"></calcite-option>
    </calcite-select>
  </calcite-label>
`;

const renderRow = (args: FieldRowStoryArgs, content: () => string = fields): string => {
  const style = getStyle(args);

  return html`
    <calcite-field-row
      ${args.layout === "columns" && args.columns ? `columns="${args.columns}"` : ""}
      layout="${args.layout}"
      ${style ? `style="${style}"` : ""}
    >
      ${content()}
    </calcite-field-row>
  `;
};

const renderLabeledRow = (label: string, args: FieldRowStoryArgs, content: () => string = fields): string => html`
  <div>
    <div
      style="display: flex;
        align-items: center;
        font-size: var(--calcite-font-size); 
        font-weight: bold; 
        min-block-size: var(--calcite-size-md); 
        margin-bottom: var(--calcite-space-md);"
    >
      ${label}
    </div>
    ${renderRow(args, content)}
  </div>
`;

export const simple = (args: FieldRowStoryArgs): string => renderRow(args);

export const layouts = (args: FieldRowStoryArgs): string => html`
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${renderLabeledRow("Vertical", { ...args, layout: "vertical" })}
    ${renderLabeledRow("Horizontal", { ...args, layout: "horizontal" })}
    ${renderLabeledRow("Columns (1)", { ...args, columns: 1, layout: "columns" })}
    ${renderLabeledRow("Columns (2)", { ...args, columns: 2, layout: "columns" })}
    ${renderLabeledRow("Columns (3)", { ...args, columns: 3, layout: "columns" })}
    ${renderLabeledRow("Columns (4)", { ...args, columns: 4, layout: "columns" })}
    ${renderLabeledRow("Columns (5)", { ...args, columns: 5, layout: "columns" })}
    ${renderLabeledRow("Columns (6)", { ...args, columns: 6, layout: "columns" })}
  </div>
`;
layouts.parameters = { controls: { disable: true } };

export const customSpacing = (args: FieldRowStoryArgs): string => renderRow(args);
customSpacing.args = { columnGap: "50px", gap: "40px" };
customSpacing.argTypes = {
  columnGap: {
    name: "columnSpace",
    control: { type: "text" },
  },
  gap: {
    name: "space",
    control: { type: "text" },
  },
  ...hiddenCustomSpacingArgTypes,
};

export const simpleUsingLabels = (args: FieldRowStoryArgs): string => renderRow(args, labels);

export const layoutsUsingLabels = (args: FieldRowStoryArgs): string => html`
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${renderRow({ ...args, layout: "vertical" }, labels)} ${renderRow({ ...args, layout: "horizontal" }, labels)}
    ${renderRow({ ...args, columns: 1, layout: "columns" }, labels)}
    ${renderRow({ ...args, columns: 2, layout: "columns" }, labels)}
    ${renderRow({ ...args, columns: 3, layout: "columns" }, labels)}
    ${renderRow({ ...args, columns: 4, layout: "columns" }, labels)}
    ${renderRow({ ...args, columns: 5, layout: "columns" }, labels)}
    ${renderRow({ ...args, columns: 6, layout: "columns" }, labels)}
  </div>
`;
layoutsUsingLabels.parameters = { controls: { disable: true } };

export const customSpacingUsingLabels = (args: FieldRowStoryArgs): string => renderRow(args, labels);
customSpacingUsingLabels.args = { columnGap: "50px", gap: "40px" };
customSpacingUsingLabels.argTypes = customSpacing.argTypes;
