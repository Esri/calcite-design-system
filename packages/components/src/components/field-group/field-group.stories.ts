import "./field-group";
import "../autocomplete/autocomplete";
import "../field-set/field-set";
import "../input/input";
import "../input-number/input-number";
import "../input-text/input-text";
import "../label/label";
import "../text-area/text-area";
import { optionalAttribute } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";

type FieldGroupStoryArgs = {
  layout: "columns" | "horizontal" | "vertical";
  columns: 1 | 2 | 3 | 4 | 5 | 6;
  gap: string;
  columnGap: string;
  prefixAutoWidth: boolean;
  suffixAutoWidth: boolean;
};

export default {
  title: "Components/Field Group",
  parameters: { layout: "padded" },
  args: {
    layout: "vertical",
    columns: 2,
    gap: "",
    columnGap: "",
    prefixAutoWidth: false,
    suffixAutoWidth: false,
  },
  argTypes: {
    layout: { options: ["vertical", "horizontal", "columns"], control: { type: "radio" } },
    columns: { options: [1, 2, 3, 4, 5, 6], control: { type: "radio" }, if: { arg: "layout", eq: "columns" } },
    gap: { control: { type: "text" } },
    columnGap: {
      name: "column gap",
      control: { type: "text" },
      if: { arg: "layout", eq: "columns" },
    },
    prefixAutoWidth: { control: { type: "boolean" } },
    suffixAutoWidth: { control: { type: "boolean" } },
  },
};

export const simple = (args: FieldGroupStoryArgs): string => {
  const style = [
    args.gap ? `--calcite-field-group-gap: ${args.gap};` : "",
    args.columnGap ? `--calcite-field-group-column-gap: ${args.columnGap};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return html`
    <h1>calcite-input</h1>
    <calcite-field-group columns="${args.columns}" layout="${args.layout}" ${optionalAttribute("style", style)}>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-group>
    <h1>calcite-label with nested calcite-inputs</h1>
    <calcite-field-group columns="${args.columns}" layout="${args.layout}" ${optionalAttribute("style", style)}>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
    </calcite-field-group>
  `;
};
simple.parameters = {
  controls: { exclude: ["prefixAutoWidth", "suffixAutoWidth"] },
};

export const complex = (args: FieldGroupStoryArgs): string => {
  const style = [
    args.gap ? `--calcite-field-group-gap: ${args.gap};` : "",
    args.columnGap ? `--calcite-field-group-column-gap: ${args.columnGap};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return html`
    <h1>calcite-input and calcite-text-area</h1>
    <calcite-field-group
      columns="${args.columns}"
      layout="${args.layout}"
      ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
      ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
      ${optionalAttribute("style", style)}
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-text-area label-text="Label"></calcite-text-area>
        </calcite-field-group>
        <calcite-field-group layout="columns" columns="2">
          <calcite-text-area label-text="Label"></calcite-text-area>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-set>
      <calcite-field-set legend="Legend 2">
        <calcite-field-group layout="columns" columns="2">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-text-area label-text="Label"></calcite-text-area>
        </calcite-field-group>
        <calcite-field-group layout="columns" columns="2">
          <calcite-text-area label-text="Label"></calcite-text-area>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-set>
    </calcite-field-group>
    <h1>calcite-label with nested calcite-inputs and calcite-text-areas</h1>
    <calcite-field-group
      columns="${args.columns}"
      layout="${args.layout}"
      ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
      ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
      ${optionalAttribute("style", style)}
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          <calcite-label>Label<calcite-text-area></calcite-text-area></calcite-label>
        </calcite-field-group>
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-text-area></calcite-text-area></calcite-label>
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        </calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-set>
      <calcite-field-set legend="Legend 2">
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          <calcite-label>Label<calcite-text-area></calcite-text-area></calcite-label>
        </calcite-field-group>
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-text-area></calcite-text-area></calcite-label>
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        </calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-set>
    </calcite-field-group>
  `;
};
complex.parameters = {
  controls: { disable: true },
};

const renderLayoutExample = (
  args: FieldGroupStoryArgs,
  layout: FieldGroupStoryArgs["layout"],
  columns: FieldGroupStoryArgs["columns"],
  fieldSetCount: number,
): string => {
  const style = [
    args.gap ? `--calcite-field-group-gap: ${args.gap};` : "",
    args.columnGap ? `--calcite-field-group-column-gap: ${args.columnGap};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return html`
    <calcite-field-group columns="${columns}" layout="${layout}" ${optionalAttribute("style", style)}>
      ${Array.from(
        { length: fieldSetCount },
        (_, index) => html`
          <calcite-field-set legend="Legend ${index + 1}">
            <calcite-input label-text="Label"></calcite-input>
            <calcite-input label-text="Label"></calcite-input>
          </calcite-field-set>
        `,
      ).join("")}
    </calcite-field-group>
  `;
};

const renderLabelLayoutExample = (
  args: FieldGroupStoryArgs,
  layout: FieldGroupStoryArgs["layout"],
  columns: FieldGroupStoryArgs["columns"],
  fieldSetCount: number,
): string => {
  const style = [
    args.gap ? `--calcite-field-group-gap: ${args.gap};` : "",
    args.columnGap ? `--calcite-field-group-column-gap: ${args.columnGap};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return html`
    <calcite-field-group columns="${columns}" layout="${layout}" ${optionalAttribute("style", style)}>
      ${Array.from(
        { length: fieldSetCount },
        (_, index) => html`
          <calcite-field-set legend="Legend ${index + 1}">
            <calcite-label>Label<calcite-input></calcite-input></calcite-label>
            <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          </calcite-field-set>
        `,
      ).join("")}
    </calcite-field-group>
  `;
};

export const layouts = (args: FieldGroupStoryArgs): string => html`
  <h1>calcite-input</h1>
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${renderLayoutExample(args, "vertical", 1, 3)} ${renderLayoutExample(args, "horizontal", 1, 3)}
    ${renderLayoutExample(args, "columns", 1, 1)} ${renderLayoutExample(args, "columns", 2, 2)}
    ${renderLayoutExample(args, "columns", 3, 3)} ${renderLayoutExample(args, "columns", 4, 4)}
    ${renderLayoutExample(args, "columns", 5, 5)} ${renderLayoutExample(args, "columns", 6, 6)}
  </div>
  <h1>calcite-label</h1>
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${renderLabelLayoutExample(args, "vertical", 1, 3)} ${renderLabelLayoutExample(args, "horizontal", 1, 3)}
    ${renderLabelLayoutExample(args, "columns", 1, 1)} ${renderLabelLayoutExample(args, "columns", 2, 2)}
    ${renderLabelLayoutExample(args, "columns", 3, 3)} ${renderLabelLayoutExample(args, "columns", 4, 4)}
    ${renderLabelLayoutExample(args, "columns", 5, 5)} ${renderLabelLayoutExample(args, "columns", 6, 6)}
  </div>
`;
layouts.parameters = { controls: { disable: true } };

export const customGap = (args: FieldGroupStoryArgs): string => html`
  <h1>calcite-input</h1>
  <div>
    <calcite-field-group
      columns="${args.columns}"
      layout="${args.layout}"
      style="--calcite-field-group-gap: ${args.gap};"
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group columns="2" layout="columns">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-set>
      <calcite-field-set legend="Legend 2">
        <calcite-field-group columns="2" layout="columns">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-set>
    </calcite-field-group>
  </div>
  <h1>calcite-label</h1>
  <div>${labels(args)}</div>
`;
customGap.args = { gap: "40px" };
customGap.parameters = { controls: { disable: true } };

const labels = (args: FieldGroupStoryArgs): string => {
  const style = [
    args.gap ? `--calcite-field-group-gap: ${args.gap};` : "",
    args.columnGap ? `--calcite-field-group-column-gap: ${args.columnGap};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return html`
    <calcite-field-group
      columns="${args.columns}"
      layout="${args.layout}"
      ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
      ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
      ${optionalAttribute("style", style)}
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        </calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-set>
      <calcite-field-set legend="Legend 2">
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        </calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-set>
    </calcite-field-group>
  `;
};

export const prefixAndSuffixAutoWidth = (args: FieldGroupStoryArgs): string => html`
  <h1>input components that support prefix/suffix</h1>
  <calcite-field-group
    ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
    ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
  >
    <calcite-field-set>
      <calcite-input
        label-text="calcite-input"
        prefix-text="prefix"
        suffix-text="px"
        placeholder="Enter a size"
      ></calcite-input>
      <calcite-input-text
        label-text="calcite-input-text"
        prefix-text="square"
        suffix-text="meters"
        placeholder="Enter an area"
      ></calcite-input-text>
      <calcite-input-number
        label-text="calcite-input-number"
        prefix-text="approximately"
        suffix-text="kilometers"
        placeholder="Enter a length"
      ></calcite-input-number>
      <calcite-autocomplete
        label-text="calcite-autocomplete"
        prefix-text="nearest"
        suffix-text="result"
        placeholder="Search locations"
      ></calcite-autocomplete>
    </calcite-field-set>
  </calcite-field-group>
  <h1>calcite-label with nested input components that support prefix/suffix</h1>
  <calcite-field-group
    ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
    ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
  >
    <calcite-field-set>
      <calcite-label>
        calcite-input
        <calcite-input prefix-text="prefix" suffix-text="px" placeholder="Enter a size"></calcite-input>
      </calcite-label>
      <calcite-label>
        calcite-input-text
        <calcite-input-text
          prefix-text="rectangle"
          suffix-text="inches"
          placeholder="Enter an area"
        ></calcite-input-text>
      </calcite-label>
      <calcite-label>
        calcite-input-number
        <calcite-input-number
          prefix-text="estimated amount"
          suffix-text="miles"
          placeholder="Enter a length"
        ></calcite-input-number>
      </calcite-label>
      <calcite-label>
        calcite-autocomplete
        <calcite-autocomplete
          prefix-text="closest lab"
          suffix-text="final report"
          placeholder="Search locations"
        ></calcite-autocomplete>
      </calcite-label>
    </calcite-field-set>
  </calcite-field-group>
`;
prefixAndSuffixAutoWidth.args = { prefixAutoWidth: true, suffixAutoWidth: true };
prefixAndSuffixAutoWidth.parameters = {
  controls: { include: ["prefixAutoWidth", "suffixAutoWidth"] },
};
