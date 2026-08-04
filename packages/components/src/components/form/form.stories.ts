import { html } from "../../../support/formatting";

type FormStoryArgs = {
  disabled: boolean;
  readOnly: boolean;
  scale: "s" | "m" | "l";
  showButtons: boolean;
  showNotice: boolean;
  noticeOpen: boolean;
};

type NativeFormStoryOptions = {
  description: string;
  formId: string;
  includeNotice?: boolean;
  includePreviewButton?: boolean;
  requireName?: boolean;
  statusId: string;
};

export default {
  title: "Components/Form",
  parameters: {
    layout: "padded",
  },
  args: {
    disabled: false,
    readOnly: false,
    scale: "m",
    showButtons: true,
    showNotice: true,
    noticeOpen: true,
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    readOnly: {
      name: "read-only",
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
    showButtons: {
      name: "buttons",
      control: { type: "boolean" },
    },
    showNotice: {
      name: "notice",
      control: { type: "boolean" },
    },
    noticeOpen: {
      name: "notice open",
      control: { type: "boolean" },
    },
  },
};

export const simple = (args: FormStoryArgs): string => html`
  <calcite-form ${args.disabled ? "disabled" : ""} ${args.readOnly ? "read-only" : ""} scale="${args.scale}">
    <calcite-field-set>
      <div slot="legend">Field Set legend</div>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-text-area label-text="Label" placeholder="Placeholder"></calcite-text-area>
    </calcite-field-set>
    <calcite-field-set>
      <div slot="legend">Field Set legend</div>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-set>
    ${args.showNotice
      ? html`
          <calcite-notice
            ${args.noticeOpen ? "open" : ""}
            icon="exclamation-mark-triangle-f"
            kind="danger"
            closable
            slot="notice"
          >
            <div slot="message">Aggregate notice</div>
          </calcite-notice>
        `
      : ""}
    ${args.showButtons
      ? html`
          <calcite-button slot="buttons" appearance="outline">Cancel</calcite-button>
          <calcite-button slot="buttons">Save</calcite-button>
        `
      : ""}
  </calcite-form>
`;

export const noticeNoOpen = (args: FormStoryArgs): string => simple(args);
noticeNoOpen.args = { noticeOpen: false };
noticeNoOpen.parameters = { controls: { include: ["notice", "notice open"] } };

const renderNativeFormFieldSets = (requireName = false): string => {
  const lastNameRequired = requireName ? "required" : "";
  const lastNameValue = requireName ? "" : 'value="Ramos"';

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

const renderNativeFormStory = (args: FormStoryArgs, options: NativeFormStoryOptions): string => html`
  <div style="display: flex; flex-direction: column; gap: 1rem; max-inline-size: 42rem;">
    <div style="color: var(--calcite-color-text-2);">${options.description}</div>
    <form id="${options.formId}" style="display: flex; flex-direction: column; gap: 1rem;">
      <calcite-form ${args.disabled ? "disabled" : ""} ${args.readOnly ? "read-only" : ""} scale="${args.scale}">
        ${renderNativeFormFieldSets(options.requireName)}
        ${options.includeNotice
          ? html`
              <calcite-notice icon="information-f" kind="brand" open slot="notice">
                <div slot="message">The outer native form owns submission and validation.</div>
              </calcite-notice>
            `
          : ""}
        ${options.includePreviewButton
          ? html`
              <calcite-button appearance="outline" data-action="preview" slot="buttons" type="button">
                Preview data
              </calcite-button>
            `
          : ""}
        <calcite-button appearance="outline" slot="buttons" type="reset">Reset</calcite-button>
        <calcite-button slot="buttons" type="submit">Submit</calcite-button>
      </calcite-form>
    </form>
    <div
      aria-live="polite"
      id="${options.statusId}"
      style="border: 1px solid var(--calcite-color-border-3); border-radius: var(--calcite-corner-radius-round); padding: 0.75rem 1rem;"
    ></div>
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

export const scales = (args: FormStoryArgs): string => html`
  <div style="display: flex; gap: 3rem;">
    ${simple({ ...args, scale: "s" })} ${simple({ ...args, scale: "m" })} ${simple({ ...args, scale: "l" })}
  </div>
`;
scales.args = { scale: "m" };
scales.parameters = { controls: { disable: true } };

export const Disabled = (args: FormStoryArgs): string => simple(args);
Disabled.args = { disabled: true };
Disabled.parameters = { controls: { disable: true } };

export const ReadOnly = (args: FormStoryArgs): string => simple(args);
ReadOnly.args = { readOnly: true };
ReadOnly.parameters = { controls: { disable: true } };

const renderControlsForm = (args: FormStoryArgs, style = ""): string => html`
  <calcite-form
    ${args.disabled ? "disabled" : ""}
    ${args.readOnly ? "read-only" : ""}
    scale="${args.scale}"
    ${style ? `style="${style}"` : ""}
  >
    <calcite-field-set columns="2" layout="columns">
      <div slot="legend">Field Set legend</div>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-set>
    <calcite-field-set>
      <div slot="legend">Field Set legend</div>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-set>
    <calcite-field-set layout="horizontal">
      <div slot="legend">Field Set legend</div>
      <calcite-checkbox label-text="Allows large dogs"></calcite-checkbox>
      <calcite-checkbox label-text="Must have parking"></calcite-checkbox>
      <calcite-checkbox label-text="Allows cats"></calcite-checkbox>
      <calcite-checkbox label-text="Must be on ground floor"></calcite-checkbox>
      <calcite-checkbox label-text="On-site laundry"></calcite-checkbox>
      <calcite-checkbox label-text="Waterfront"></calcite-checkbox>
      <calcite-checkbox label-text="On-site parking"></calcite-checkbox>
    </calcite-field-set>
    <calcite-field-set layout="columns" columns="2">
      <div slot="legend">Field Set legend</div>
      <calcite-checkbox label-text="Allows large dogs"></calcite-checkbox>
      <calcite-checkbox label-text="Must have parking"></calcite-checkbox>
      <calcite-checkbox label-text="Allows cats"></calcite-checkbox>
      <calcite-checkbox label-text="Must be on ground floor"></calcite-checkbox>
      <calcite-checkbox label-text="On-site laundry"></calcite-checkbox>
      <calcite-checkbox label-text="Waterfront"></calcite-checkbox>
      <calcite-checkbox label-text="On-site parking"></calcite-checkbox>
    </calcite-field-set>
  </calcite-form>
`;

export const controls = (args: FormStoryArgs): string => html`
  <div style="display: flex; flex-direction: column; gap: 50px;">
    ${renderControlsForm(args)} ${renderControlsForm(args, "inline-size: 382px;")}
  </div>
`;

export const nativeSubmitAndReset = (args: FormStoryArgs): string =>
  renderNativeFormStory(args, {
    description:
      "The slotted buttons remain light DOM children of the outer native form, so submit and reset work without extra wiring.",
    formId: "native-form-submit-reset",
    statusId: "native-form-submit-reset-status",
  });
nativeSubmitAndReset.args = { showButtons: true, showNotice: false };
nativeSubmitAndReset.parameters = {
  controls: { disable: true },
};

export const nativeValidation = (args: FormStoryArgs): string =>
  renderNativeFormStory(args, {
    description:
      "This story leaves one required value empty so the browser's native validation UI can block submission until the field is completed.",
    formId: "native-form-validation",
    includeNotice: true,
    requireName: true,
    statusId: "native-form-validation-status",
  });
nativeValidation.args = { showButtons: true, showNotice: true };
nativeValidation.parameters = {
  controls: { disable: true },
};

export const nativeButtonTypes = (args: FormStoryArgs): string =>
  renderNativeFormStory(args, {
    description:
      "A non-submit button can still read the current form data, while the reset and submit buttons keep their native form behavior.",
    formId: "native-form-button-types",
    includePreviewButton: true,
    statusId: "native-form-button-types-status",
  });
nativeButtonTypes.args = { showButtons: true, showNotice: false };
nativeButtonTypes.parameters = {
  controls: { disable: true },
};
