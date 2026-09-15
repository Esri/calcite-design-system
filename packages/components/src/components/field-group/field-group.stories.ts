import "./field-group"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../field-set/field-set"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../input/input"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../label/label"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../button/button"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import { html } from "../../../support/formatting";

type FieldGroupStoryArgs = {
  disabled: boolean;
  scale: "s" | "m" | "l";
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
    disabled: false,
    scale: "m",
    layout: "vertical",
    columns: 2,
    gap: "",
    columnGap: "",
    prefixAutoWidth: false,
    suffixAutoWidth: false,
  },
  argTypes: {
    disabled: { control: { type: "boolean" } },
    scale: { options: ["s", "m", "l"], control: { type: "radio" } },
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
    <calcite-field-group
      columns="${args.columns}"
      ${args.disabled ? "disabled" : ""}
      layout="${args.layout}"
      scale="${args.scale}"
      ${style ? `style="${style}"` : ""}
    >
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-group>
  `;
};
simple.parameters = {
  controls: { exclude: ["prefixAutoWidth", "suffixAutoWidth"] },
};

export const simpleUsingLabel = (args: FieldGroupStoryArgs): string => {
  const style = [
    args.gap ? `--calcite-field-group-gap: ${args.gap};` : "",
    args.columnGap ? `--calcite-field-group-column-gap: ${args.columnGap};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return html`
    <calcite-field-group
      columns="${args.columns}"
      ${args.disabled ? "disabled" : ""}
      layout="${args.layout}"
      scale="${args.scale}"
      ${style ? `style="${style}"` : ""}
    >
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
    </calcite-field-group>
  `;
};
simpleUsingLabel.storyName = "Simple (using 'Label')";
simpleUsingLabel.parameters = {
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
    <calcite-field-group
      columns="${args.columns}"
      ${args.disabled ? "disabled" : ""}
      layout="${args.layout}"
      ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
      scale="${args.scale}"
      ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
      ${style ? `style="${style}"` : ""}
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-set>
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-set>
    </calcite-field-group>
  `;
};
complex.parameters = {
  controls: { exclude: ["prefixAutoWidth", "suffixAutoWidth"] },
};

export const complexUsingLabel = (args: FieldGroupStoryArgs): string => {
  const style = [
    args.gap ? `--calcite-field-group-gap: ${args.gap};` : "",
    args.columnGap ? `--calcite-field-group-column-gap: ${args.columnGap};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return html`
    <calcite-field-group
      columns="${args.columns}"
      ${args.disabled ? "disabled" : ""}
      layout="${args.layout}"
      ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
      scale="${args.scale}"
      ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
      ${style ? `style="${style}"` : ""}
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        </calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-set>
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        </calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-set>
    </calcite-field-group>
  `;
};
complexUsingLabel.storyName = "Complex (using 'Label')";
complexUsingLabel.parameters = {
  controls: { exclude: ["prefixAutoWidth", "suffixAutoWidth"] },
};

export const scales = (args: FieldGroupStoryArgs): string => html`
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${complex({ ...args, scale: "s" })} ${complex({ ...args, scale: "m" })} ${complex({ ...args, scale: "l" })}
  </div>
`;
scales.parameters = { controls: { disable: true } };

export const scalesUsingLabel = (args: FieldGroupStoryArgs): string => html`
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${labels({ ...args, scale: "s" })} ${labels({ ...args, scale: "m" })} ${labels({ ...args, scale: "l" })}
  </div>
`;
scalesUsingLabel.storyName = "Scale (using 'Label')";
scalesUsingLabel.parameters = { controls: { disable: true } };

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
    <calcite-field-group
      columns="${columns}"
      layout="${layout}"
      scale="${args.scale}"
      ${style ? `style="${style}"` : ""}
    >
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
    <calcite-field-group
      columns="${columns}"
      layout="${layout}"
      scale="${args.scale}"
      ${style ? `style="${style}"` : ""}
    >
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
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${renderLayoutExample(args, "vertical", 1, 3)} ${renderLayoutExample(args, "horizontal", 1, 3)}
    ${renderLayoutExample(args, "columns", 1, 1)} ${renderLayoutExample(args, "columns", 2, 2)}
    ${renderLayoutExample(args, "columns", 3, 3)} ${renderLayoutExample(args, "columns", 4, 4)}
    ${renderLayoutExample(args, "columns", 5, 5)} ${renderLayoutExample(args, "columns", 6, 6)}
  </div>
`;
layouts.parameters = { controls: { disable: true } };

export const layoutsUsingLabel = (args: FieldGroupStoryArgs): string => html`
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${renderLabelLayoutExample(args, "vertical", 1, 3)} ${renderLabelLayoutExample(args, "horizontal", 1, 3)}
    ${renderLabelLayoutExample(args, "columns", 1, 1)} ${renderLabelLayoutExample(args, "columns", 2, 2)}
    ${renderLabelLayoutExample(args, "columns", 3, 3)} ${renderLabelLayoutExample(args, "columns", 4, 4)}
    ${renderLabelLayoutExample(args, "columns", 5, 5)} ${renderLabelLayoutExample(args, "columns", 6, 6)}
  </div>
`;
layoutsUsingLabel.storyName = "Layout (using 'Label')";
layoutsUsingLabel.parameters = { controls: { disable: true } };

export const customGap = (args: FieldGroupStoryArgs): string => html`
  <calcite-field-group
    columns="${args.columns}"
    ${args.disabled ? "disabled" : ""}
    layout="${args.layout}"
    scale="${args.scale}"
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
`;
customGap.args = { gap: "40px" };
customGap.parameters = { controls: { include: ["gap"] } };

export const customGapUsingLabel = (args: FieldGroupStoryArgs): string => labels(args);
customGapUsingLabel.storyName = "Custom Gap (using 'Label')";
customGapUsingLabel.args = { gap: "40px" };
customGapUsingLabel.parameters = { controls: { include: ["gap"] } };

export const disabled = (args: FieldGroupStoryArgs): string => complex(args);
disabled.args = { disabled: true };
disabled.parameters = { controls: { disable: true } };

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
      ${args.disabled ? "disabled" : ""}
      layout="${args.layout}"
      ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
      scale="${args.scale}"
      ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
      ${style ? `style="${style}"` : ""}
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        </calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-set>
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        </calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-set>
    </calcite-field-group>
  `;
};

export const disabledUsingLabel = (args: FieldGroupStoryArgs): string => labels(args);
disabledUsingLabel.storyName = "Disabled (using 'Label')";
disabledUsingLabel.args = { disabled: true };
disabledUsingLabel.parameters = { controls: { disable: true } };

export const prefixAndSuffixAutoWidth = (args: FieldGroupStoryArgs): string => html`
  <calcite-field-group
    ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
    ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
  >
    <calcite-field-set legend="Measurements">
      <calcite-input
        label-text="Width"
        prefix-text="prefix"
        suffix-text="px"
        placeholder="Enter a size"
      ></calcite-input>
      <calcite-input
        label-text="Height"
        prefix-text="longer prefix"
        suffix-text="pixels"
        placeholder="Enter a size"
      ></calcite-input>
      <calcite-input
        label-text="Depth"
        prefix-text="abc"
        suffix-text="centimeters"
        placeholder="Enter a size"
      ></calcite-input>
    </calcite-field-set>
  </calcite-field-group>
`;
prefixAndSuffixAutoWidth.args = { prefixAutoWidth: true, suffixAutoWidth: true };
prefixAndSuffixAutoWidth.parameters = {
  controls: { include: ["prefixAutoWidth", "suffixAutoWidth"] },
};

export const prefixAndSuffixAutoWidthUsingLabel = (args: FieldGroupStoryArgs): string => html`
  <calcite-field-group
    ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
    ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
  >
    <calcite-field-set legend="Measurements">
      <calcite-label>
        Width
        <calcite-input prefix-text="prefix" suffix-text="px" placeholder="Enter a size"></calcite-input>
      </calcite-label>
      <calcite-label>
        Height
        <calcite-input prefix-text="longer prefix" suffix-text="pixels" placeholder="Enter a size"></calcite-input>
      </calcite-label>
      <calcite-label>
        Depth
        <calcite-input prefix-text="abc" suffix-text="centimeters" placeholder="Enter a size"></calcite-input>
      </calcite-label>
    </calcite-field-set>
  </calcite-field-group>
`;
prefixAndSuffixAutoWidthUsingLabel.storyName = "Prefix and Suffix Auto Width (using 'Label')";
prefixAndSuffixAutoWidthUsingLabel.args = { prefixAutoWidth: true, suffixAutoWidth: true };
prefixAndSuffixAutoWidthUsingLabel.parameters = {
  controls: { include: ["prefixAutoWidth", "suffixAutoWidth"] },
};

type NativeFieldGroupStoryOptions = {
  description: string;
  formId: string;
  includePreviewButton?: boolean;
  requireLastName?: boolean;
  statusId: string;
  useLabel?: boolean;
};

const renderNativeFieldGroupFields = (requireLastName = false, useLabel = false): string => {
  const lastNameRequired = requireLastName ? "required" : "";
  const lastNameValue = requireLastName ? "" : 'value="Ramos"';
  const labelText = (label: string): string => (useLabel ? "" : `label-text="${label}"`);

  const firstName = `
    <calcite-input
      ${labelText("First name")}
      name="firstName"
      placeholder="Enter first name"
      value="Alicia"
    ></calcite-input>`;
  const lastName = `
    <calcite-input
      ${labelText("Last name")}
      name="lastName"
      placeholder="Enter last name"
      ${lastNameRequired}
      ${lastNameValue}
    ></calcite-input>`;
  const parcelId = `
    <calcite-input
      ${labelText("Parcel ID")}
      name="parcelId"
      placeholder="Enter parcel ID"
      value="12-345-6789"
    ></calcite-input>`;
  const city = `
    <calcite-input
      ${labelText("City")}
      name="city"
      placeholder="Enter city"
      value="Austin"
    ></calcite-input>`;

  const wrap = (label: string, control: string): string =>
    useLabel ? `<calcite-label>${label}${control}</calcite-label>` : control;

  return `
    <calcite-field-set>
      <div slot="legend">Applicant details</div>
      ${wrap("First name", firstName)}
      ${wrap("Last name", lastName)}
    </calcite-field-set>
    <calcite-field-set>
      <div slot="legend">Property details</div>
      ${wrap("Parcel ID", parcelId)}
      ${wrap("City", city)}
    </calcite-field-set>
  `;
};

const renderNativeFieldGroupStory = (args: FieldGroupStoryArgs, options: NativeFieldGroupStoryOptions): string => {
  const style = [
    args.gap ? `--calcite-field-group-gap: ${args.gap};` : "",
    args.columnGap ? `--calcite-field-group-column-gap: ${args.columnGap};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-inline-size: 42rem;">
      <div style="color: var(--calcite-color-text-2);">${options.description}</div>
      <form id="${options.formId}" style="display: flex; flex-direction: column; gap: 1rem;">
        <calcite-field-group
          columns="${args.columns}"
          ${args.disabled ? "disabled" : ""}
          layout="${args.layout}"
          ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
          scale="${args.scale}"
          ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
          ${style ? `style="${style}"` : ""}
        >
          ${renderNativeFieldGroupFields(options.requireLastName, options.useLabel)}
        </calcite-field-group>
        <div style="display: flex; flex-direction: column; gap: 1rem; border: 1px dashed black; padding: 0.75rem 1rem;">
          <div style="display: flex; gap: 0.5rem;">
            ${options.includePreviewButton
              ? html`
                  <calcite-button appearance="outline" data-action="preview" type="button">
                    Preview data
                  </calcite-button>
                `
              : ""}
            <calcite-button appearance="outline" type="reset">Reset</calcite-button>
            <calcite-button type="submit">Submit</calcite-button>
          </div>
          <div aria-live="polite" id="${options.statusId}"></div>
        </div>
      </form>
      <script>
        (() => {
          const form = document.getElementById("${options.formId}");
          const status = document.getElementById("${options.statusId}");

          if (!(form instanceof HTMLFormElement) || !(status instanceof HTMLElement)) {
            return;
          }

          if (form.dataset.storyBound === "true") {
            return;
          }

          const formatData = () =>
            JSON.stringify(Array.from(new FormData(form).entries()).map(([name, value]) => [name, String(value)]));
          const writeStatus = (label) => {
            status.textContent = label + ": " + formatData();
          };

          form.dataset.storyBound = "true";

          form.addEventListener("submit", (event) => {
            event.preventDefault();
            writeStatus("Submitted");
          });

          form.addEventListener("reset", () => {
            requestAnimationFrame(() => {
              writeStatus("Reset");
            });
          });

          form.querySelector('[data-action="preview"]')?.addEventListener("click", () => {
            writeStatus("Preview");
          });

          writeStatus("Current values");
        })();
      </script>
    </div>
  `;
};

export const nativeFormSupport = (args: FieldGroupStoryArgs): string => html`
  <calcite-field-group columns="3" layout="columns">
    ${renderNativeFieldGroupStory(args, {
      description:
        "The buttons remain light DOM children of the outer native form, so submit and reset work without extra wiring.",
      formId: "native-field-group-submit-reset",
      statusId: "native-field-group-submit-reset-status",
    })}
    ${renderNativeFieldGroupStory(args, {
      description:
        "This story leaves one required value empty so the browser's native validation UI can block submission until the field is completed.",
      formId: "native-field-group-validation",
      requireLastName: true,
      statusId: "native-field-group-validation-status",
    })}
    ${renderNativeFieldGroupStory(args, {
      description:
        "A non-submit button can read the current form data, while the reset and submit buttons keep their native form behavior.",
      formId: "native-field-group-button-types",
      includePreviewButton: true,
      statusId: "native-field-group-button-types-status",
    })}
  </calcite-field-group>
`;
nativeFormSupport.parameters = { controls: { disable: true } };

export const nativeFormSupportUsingLabel = (args: FieldGroupStoryArgs): string => html`
  <calcite-field-group columns="3" layout="columns">
    ${renderNativeFieldGroupStory(args, {
      description:
        "The buttons remain light DOM children of the outer native form, so submit and reset work without extra wiring.",
      formId: "native-field-group-label-submit-reset",
      statusId: "native-field-group-label-submit-reset-status",
      useLabel: true,
    })}
    ${renderNativeFieldGroupStory(args, {
      description:
        "This story leaves one required value empty so the browser's native validation UI can block submission until the field is completed.",
      formId: "native-field-group-label-validation",
      requireLastName: true,
      statusId: "native-field-group-label-validation-status",
      useLabel: true,
    })}
    ${renderNativeFieldGroupStory(args, {
      description:
        "A non-submit button can read the current form data, while the reset and submit buttons keep their native form behavior.",
      formId: "native-field-group-label-button-types",
      includePreviewButton: true,
      statusId: "native-field-group-label-button-types-status",
      useLabel: true,
    })}
  </calcite-field-group>
`;
nativeFormSupportUsingLabel.storyName = "Native Form Support (using 'Label')";
nativeFormSupportUsingLabel.parameters = { controls: { disable: true } };
