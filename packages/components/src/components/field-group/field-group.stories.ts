import { html } from "../../../support/formatting";

type FieldGroupStoryArgs = {
  columns: 1 | 2 | 3 | 4 | 5 | 6;
  columnGap: string;
  gap: string;
  layout: "columns" | "horizontal" | "vertical";
  scale: "s" | "m" | "l";
};

export default {
  title: "Components/Field Group",
  parameters: { layout: "padded" },
  args: { columns: 2, columnGap: "", gap: "", layout: "vertical", scale: "m" },
  argTypes: {
    scale: { options: ["s", "m", "l"], control: { type: "radio" } },
    gap: { control: { type: "text" } },
    layout: { options: ["vertical", "horizontal", "columns"], control: { type: "radio" } },
    columns: { options: [1, 2, 3, 4, 5, 6], control: { type: "radio" }, if: { arg: "layout", eq: "columns" } },
    columnGap: {
      name: "column gap",
      control: { type: "text" },
      if: { arg: "layout", eq: "columns" },
    },
  },
};

export const simple = (args: FieldGroupStoryArgs): string => {
  const style = [
    args.columnGap ? `--calcite-field-group-column-gap: ${args.columnGap};` : "",
    args.gap ? `--calcite-field-group-gap: ${args.gap};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return html`
    <calcite-field-group
      columns="${args.columns}"
      layout="${args.layout}"
      scale="${args.scale}"
      ${style ? `style="${style}"` : ""}
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
        <calcite-field-group>
          <calcite-field-group layout="columns" columns="2">
            <calcite-input label-text="Label"></calcite-input>
            <calcite-input label-text="Label"></calcite-input>
          </calcite-field-group>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
      </calcite-field-set>
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
        <calcite-field-group>
          <calcite-field-group layout="columns" columns="2">
            <calcite-input label-text="Label"></calcite-input>
            <calcite-input label-text="Label"></calcite-input>
          </calcite-field-group>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
      </calcite-field-set>
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
        <calcite-field-group>
          <calcite-field-group layout="columns" columns="2">
            <calcite-input label-text="Label"></calcite-input>
            <calcite-input label-text="Label"></calcite-input>
          </calcite-field-group>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
      </calcite-field-set>
    </calcite-field-group>
  `;
};
