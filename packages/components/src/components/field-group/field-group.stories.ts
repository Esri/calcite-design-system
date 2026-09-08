import { html } from "../../../support/formatting";

type FieldGroupStoryArgs = {
  scale: "s" | "m" | "l";
  layout: "columns" | "horizontal" | "vertical";
  columns: 1 | 2 | 3 | 4 | 5 | 6;
  gap: string;
  columnGap: string;
};

export default {
  title: "Components/Field Group",
  parameters: { layout: "padded" },
  args: { scale: "m", layout: "vertical", columns: 2, gap: "", columnGap: "" },
  argTypes: {
    scale: { options: ["s", "m", "l"], control: { type: "radio" } },
    layout: { options: ["vertical", "horizontal", "columns"], control: { type: "radio" } },
    columns: { options: [1, 2, 3, 4, 5, 6], control: { type: "radio" }, if: { arg: "layout", eq: "columns" } },
    gap: { control: { type: "text" } },
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

type NativeFieldGroupStoryOptions = {
  description: string;
  formId: string;
  includePreviewButton?: boolean;
  requireLastName?: boolean;
  statusId: string;
};

const renderNativeFieldGroupFields = (requireLastName = false): string => {
  const lastNameRequired = requireLastName ? "required" : "";
  const lastNameValue = requireLastName ? "" : 'value="Ramos"';

  return `
    <calcite-field-set>
      <div slot="legend">Applicant details</div>
      <calcite-input
        label-text="First name"
        name="firstName"
        placeholder="Enter first name"
        value="Alicia"
      ></calcite-input>
      <calcite-input
        label-text="Last name"
        name="lastName"
        placeholder="Enter last name"
        ${lastNameRequired}
        ${lastNameValue}
      ></calcite-input>
    </calcite-field-set>
    <calcite-field-set>
      <div slot="legend">Property details</div>
      <calcite-input
        label-text="Parcel ID"
        name="parcelId"
        placeholder="Enter parcel ID"
        value="12-345-6789"
      ></calcite-input>
      <calcite-input
        label-text="City"
        name="city"
        placeholder="Enter city"
        value="Austin"
      ></calcite-input>
    </calcite-field-set>
  `;
};

const renderNativeFieldGroupStory = (args: FieldGroupStoryArgs, options: NativeFieldGroupStoryOptions): string => {
  const style = [
    args.columnGap ? `--calcite-field-group-column-gap: ${args.columnGap};` : "",
    args.gap ? `--calcite-field-group-gap: ${args.gap};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-inline-size: 42rem;">
      <div style="color: var(--calcite-color-text-2);">${options.description}</div>
      <form id="${options.formId}" style="display: flex; flex-direction: column; gap: 1rem;">
        <calcite-field-group
          columns="${args.columns}"
          layout="${args.layout}"
          scale="${args.scale}"
          ${style ? `style="${style}"` : ""}
        >
          ${renderNativeFieldGroupFields(options.requireLastName)}
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

export const nativeSubmitAndReset = (args: FieldGroupStoryArgs): string =>
  renderNativeFieldGroupStory(args, {
    description:
      "The buttons remain light DOM children of the outer native form, so submit and reset work without extra wiring.",
    formId: "native-field-group-submit-reset",
    statusId: "native-field-group-submit-reset-status",
  });

export const nativeValidation = (args: FieldGroupStoryArgs): string =>
  renderNativeFieldGroupStory(args, {
    description:
      "This story leaves one required value empty so the browser's native validation UI can block submission until the field is completed.",
    formId: "native-field-group-validation",
    requireLastName: true,
    statusId: "native-field-group-validation-status",
  });

export const nativeButtonTypes = (args: FieldGroupStoryArgs): string =>
  renderNativeFieldGroupStory(args, {
    description:
      "A non-submit button can read the current form data, while the reset and submit buttons keep their native form behavior.",
    formId: "native-field-group-button-types",
    includePreviewButton: true,
    statusId: "native-field-group-button-types-status",
  });
