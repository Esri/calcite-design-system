import { html } from "../../../support/formatting";

type FormStoryArgs = {
  disabled: boolean;
  readOnly: boolean;
  scale: "s" | "m" | "l";
  showNotice: boolean;
  noticeOpen: boolean;
  space: string;
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
    showNotice: true,
    noticeOpen: true,
    space: "",
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
    showNotice: {
      name: "notice",
      control: { type: "boolean" },
    },
    noticeOpen: {
      name: "notice open",
      control: { type: "boolean" },
    },
    space: {
      name: "space",
      control: { type: "text" },
    },
  },
};

export const simple = (args: FormStoryArgs): string => html`
  <calcite-form
    ${args.disabled ? "disabled" : ""}
    ${args.readOnly ? "read-only" : ""}
    scale="${args.scale}"
    ${args.space ? `style="--calcite-form-space: ${args.space};"` : ""}
  >
    <calcite-field-set legend="Field Set legend">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-text-area label-text="Label" placeholder="Placeholder"></calcite-text-area>
    </calcite-field-set>
    <calcite-field-set legend="Field Set legend">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-checkbox label-text="Allows large dogs"></calcite-checkbox>
      <calcite-radio-button label-text="Standalone radio button" value="standalone"></calcite-radio-button>
      <calcite-radio-button-group name="framework">
        <calcite-radio-button label-text="React" value="react"></calcite-radio-button>
        <calcite-radio-button label-text="Vue" value="vue"></calcite-radio-button>
      </calcite-radio-button-group>
      <calcite-switch label="Enable notifications"></calcite-switch>
      <calcite-select label-text="Select an option">
        <calcite-option label="First option" value="first"></calcite-option>
        <calcite-option label="Second option" value="second"></calcite-option>
      </calcite-select>
      <calcite-combobox label-text="Choose an option">
        <calcite-combobox-item heading="First option" value="first"></calcite-combobox-item>
        <calcite-combobox-item heading="Second option" value="second"></calcite-combobox-item>
      </calcite-combobox>
      <calcite-slider label-text="Slider" max="100" min="0" value="50"></calcite-slider>
      <calcite-segmented-control label-text="Framework">
        <calcite-segmented-control-item checked value="react">React</calcite-segmented-control-item>
        <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
      </calcite-segmented-control>
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
  </calcite-form>
`;

const renderLabelFieldSets = (): string => html`
  <calcite-field-set legend="Field Set legend">
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
      <calcite-text-area placeholder="Placeholder"></calcite-text-area>
    </calcite-label>
  </calcite-field-set>
  <calcite-field-set legend="Field Set legend">
    <calcite-label>
      Label
      <calcite-input placeholder="Placeholder"></calcite-input>
    </calcite-label>
    <calcite-label>
      Label
      <calcite-input placeholder="Placeholder"></calcite-input>
    </calcite-label>
    <calcite-label>
      Allows large dogs
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label layout="inline">
      Standalone radio button
      <calcite-radio-button value="standalone"></calcite-radio-button>
    </calcite-label>
    <calcite-radio-button-group name="framework">
      <calcite-label layout="inline">
        React
        <calcite-radio-button value="react"></calcite-radio-button>
      </calcite-label>
      <calcite-label layout="inline">
        Vue
        <calcite-radio-button value="vue"></calcite-radio-button>
      </calcite-label>
    </calcite-radio-button-group>
    <calcite-label>
      Enable notifications
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label>
      Select an option
      <calcite-select>
        <calcite-option label="First option" value="first"></calcite-option>
        <calcite-option label="Second option" value="second"></calcite-option>
      </calcite-select>
    </calcite-label>
    <calcite-label>
      Choose an option
      <calcite-combobox>
        <calcite-combobox-item heading="First option" value="first"></calcite-combobox-item>
        <calcite-combobox-item heading="Second option" value="second"></calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      Slider
      <calcite-slider max="100" min="0" value="50"></calcite-slider>
    </calcite-label>
    <calcite-label>
      Framework
      <calcite-segmented-control>
        <calcite-segmented-control-item checked value="react">React</calcite-segmented-control-item>
        <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
      </calcite-segmented-control>
    </calcite-label>
  </calcite-field-set>
`;

export const noticeNoOpen = (args: FormStoryArgs): string => simple(args);
noticeNoOpen.args = { noticeOpen: false };
noticeNoOpen.parameters = { controls: { include: ["notice", "notice open"] } };

const renderNativeFormFieldSets = (requireName = false): string => {
  const lastNameRequired = requireName ? "required" : "";
  const lastNameValue = requireName ? "" : 'value="Ramos"';

  return `
    <calcite-field-set legend="Applicant details">
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
    <calcite-field-set legend="Property details">
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

const renderNativeFormLabelFieldSets = (requireName = false): string => {
  const lastNameRequired = requireName ? "required" : "";
  const lastNameValue = requireName ? "" : 'value="Ramos"';

  return `
    <calcite-field-set legend="Applicant details">
      <calcite-label>
        First name
        <calcite-input name="firstName" placeholder="Enter first name" value="Alicia"></calcite-input>
      </calcite-label>
      <calcite-label>
        Last name
        <calcite-input
          name="lastName"
          placeholder="Enter last name"
          ${lastNameRequired}
          ${lastNameValue}
        ></calcite-input>
      </calcite-label>
    </calcite-field-set>
    <calcite-field-set legend="Property details">
      <calcite-label>
        Parcel ID
        <calcite-input name="parcelId" placeholder="Enter parcel ID" value="12-345-6789"></calcite-input>
      </calcite-label>
      <calcite-label>
        City
        <calcite-input name="city" placeholder="Enter city" value="Austin"></calcite-input>
      </calcite-label>
    </calcite-field-set>
  `;
};

const renderNativeFormStory = (
  args: FormStoryArgs,
  options: NativeFormStoryOptions,
  renderFieldSets = renderNativeFormFieldSets,
): string => html`
  <div style="display: flex; flex-direction: column; gap: 1rem; max-inline-size: 42rem;">
    <div style="color: var(--calcite-color-text-2);">${options.description}</div>
    <form id="${options.formId}" style="display: flex; flex-direction: column; gap: 1rem;">
      <calcite-form ${args.disabled ? "disabled" : ""} ${args.readOnly ? "read-only" : ""} scale="${args.scale}">
        ${renderFieldSets(options.requireName)}
      </calcite-form>
      <div style="display: flex; gap: 1rem; padding: 1rem; border: 1px solid red;">
        ${options.includePreviewButton
          ? html`
              <calcite-button appearance="outline" data-action="preview" type="button"> Preview data </calcite-button>
            `
          : ""}
        <calcite-button appearance="outline" type="reset">Reset</calcite-button>
        <calcite-button type="submit">Submit</calcite-button>
      </div>
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

const renderInPanel = (args: FormStoryArgs): string => html`
  <calcite-panel
    heading="Form"
    scale="${args.scale}"
    style="height: auto; --calcite-panel-space: var(--calcite-space-md);"
  >
    ${simple(args)}
    <calcite-button slot="footer-end" appearance="outline"> Cancel </calcite-button>
    <calcite-button slot="footer-end"> Submit </calcite-button>
  </calcite-panel>
`;

const renderInPanelUsingLabels = (args: FormStoryArgs): string => html`
  <calcite-panel
    heading="Form"
    scale="${args.scale}"
    style="height: auto; --calcite-panel-space: var(--calcite-space-md);"
  >
    ${simpleUsingLabels(args)}
    <calcite-button slot="footer-end" appearance="outline"> Cancel </calcite-button>
    <calcite-button slot="footer-end"> Submit </calcite-button>
  </calcite-panel>
`;

export const inPanel = (args: FormStoryArgs): string => html`
  <div style="display: flex; gap: 3rem; align-items: start;">
    ${renderInPanel({ ...args, scale: "s" })} ${renderInPanel({ ...args, scale: "m" })}
    ${renderInPanel({ ...args, scale: "l" })}
  </div>
`;
inPanel.args = { scale: "m" };
inPanel.parameters = { controls: { disable: true } };

const renderInFlow = (args: FormStoryArgs): string => html`
  <calcite-flow>
    <calcite-flow-item
      heading="Form"
      scale="${args.scale}"
      style="height: auto; --calcite-flow-space: var(--calcite-space-md);"
    >
      ${simple(args)}
      <calcite-button slot="footer-end" appearance="outline"> Cancel </calcite-button>
      <calcite-button slot="footer-end"> Submit </calcite-button>
    </calcite-flow-item>
  </calcite-flow>
`;

export const inFlow = (args: FormStoryArgs): string => html`
  <div style="display: flex; gap: 3rem; align-items: start;">
    ${renderInFlow({ ...args, scale: "s" })} ${renderInFlow({ ...args, scale: "m" })}
    ${renderInFlow({ ...args, scale: "l" })}
  </div>
`;
inFlow.args = { scale: "m" };
inFlow.parameters = { controls: { disable: true } };

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
    <calcite-field-set columns="2" layout="columns" legend="Field Set legend">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-set>
    <calcite-field-set legend="Field Set legend">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-set>
    <calcite-field-set layout="horizontal" legend="Field Set legend">
      <calcite-checkbox label-text="Allows large dogs"></calcite-checkbox>
      <calcite-checkbox label-text="Must have parking"></calcite-checkbox>
      <calcite-checkbox label-text="Allows cats"></calcite-checkbox>
      <calcite-checkbox label-text="Must be on ground floor"></calcite-checkbox>
      <calcite-checkbox label-text="On-site laundry"></calcite-checkbox>
      <calcite-checkbox label-text="Waterfront"></calcite-checkbox>
      <calcite-checkbox label-text="On-site parking"></calcite-checkbox>
    </calcite-field-set>
    <calcite-field-set layout="columns" columns="2" legend="Field Set legend">
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

const renderControlsFormUsingLabels = (args: FormStoryArgs, style = ""): string => html`
  <calcite-form
    ${args.disabled ? "disabled" : ""}
    ${args.readOnly ? "read-only" : ""}
    scale="${args.scale}"
    ${style ? `style="${style}"` : ""}
  >
    <calcite-field-set columns="2" layout="columns" legend="Field Set legend">
      <calcite-label>
        Label
        <calcite-input placeholder="Placeholder"></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input placeholder="Placeholder"></calcite-input>
      </calcite-label>
    </calcite-field-set>
    <calcite-field-set legend="Field Set legend">
      <calcite-label>
        Label
        <calcite-input placeholder="Placeholder"></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input placeholder="Placeholder"></calcite-input>
      </calcite-label>
    </calcite-field-set>
    <calcite-field-set layout="horizontal" legend="Field Set legend">
      <calcite-checkbox label-text="Allows large dogs"></calcite-checkbox>
      <calcite-checkbox label-text="Must have parking"></calcite-checkbox>
      <calcite-checkbox label-text="Allows cats"></calcite-checkbox>
      <calcite-checkbox label-text="Must be on ground floor"></calcite-checkbox>
      <calcite-checkbox label-text="On-site laundry"></calcite-checkbox>
      <calcite-checkbox label-text="Waterfront"></calcite-checkbox>
      <calcite-checkbox label-text="On-site parking"></calcite-checkbox>
    </calcite-field-set>
    <calcite-field-set layout="columns" columns="2" legend="Field Set legend">
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

export const customSpacing = (args: FormStoryArgs): string => simple(args);
customSpacing.args = { space: "40px" };
customSpacing.parameters = { controls: { include: ["space"] } };

export const nativeSubmitAndReset = (args: FormStoryArgs): string =>
  renderNativeFormStory(args, {
    description:
      "Buttons remain light DOM children of the outer native form, so submit and reset work without extra wiring.",
    formId: "native-form-submit-reset",
    statusId: "native-form-submit-reset-status",
  });
nativeSubmitAndReset.args = { showNotice: false };
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
nativeValidation.args = { showNotice: true };
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
nativeButtonTypes.args = { showNotice: false };
nativeButtonTypes.parameters = {
  controls: { disable: true },
};

export const simpleUsingLabels = (args: FormStoryArgs): string => html`
  <calcite-form
    ${args.disabled ? "disabled" : ""}
    ${args.readOnly ? "read-only" : ""}
    scale="${args.scale}"
    ${args.space ? `style="--calcite-form-space: ${args.space};"` : ""}
  >
    ${renderLabelFieldSets()}
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
  </calcite-form>
`;

export const noticeNoOpenUsingLabels = (args: FormStoryArgs): string => simpleUsingLabels(args);
noticeNoOpenUsingLabels.args = { noticeOpen: false };
noticeNoOpenUsingLabels.parameters = { controls: { include: ["notice", "notice open"] } };

export const scalesUsingLabels = (args: FormStoryArgs): string => html`
  <div style="display: flex; gap: 3rem;">
    ${simpleUsingLabels({ ...args, scale: "s" })} ${simpleUsingLabels({ ...args, scale: "m" })}
    ${simpleUsingLabels({ ...args, scale: "l" })}
  </div>
`;
scalesUsingLabels.args = { scale: "m" };
scalesUsingLabels.parameters = { controls: { disable: true } };

export const inPanelUsingLabels = (args: FormStoryArgs): string => html`
  <div style="display: flex; gap: 3rem; align-items: start;">
    ${renderInPanelUsingLabels({ ...args, scale: "s" })} ${renderInPanelUsingLabels({ ...args, scale: "m" })}
    ${renderInPanelUsingLabels({ ...args, scale: "l" })}
  </div>
`;
inPanelUsingLabels.args = { scale: "m" };
inPanelUsingLabels.parameters = { controls: { disable: true } };

export const disabledUsingLabels = (args: FormStoryArgs): string => simpleUsingLabels(args);
disabledUsingLabels.args = { disabled: true };
disabledUsingLabels.parameters = { controls: { disable: true } };

export const readOnlyUsingLabels = (args: FormStoryArgs): string => simpleUsingLabels(args);
readOnlyUsingLabels.args = { readOnly: true };
readOnlyUsingLabels.parameters = { controls: { disable: true } };

export const controlsUsingLabels = (args: FormStoryArgs): string => html`
  <div style="display: flex; flex-direction: column; gap: 50px;">
    ${renderControlsFormUsingLabels(args)} ${renderControlsFormUsingLabels(args, "inline-size: 382px;")}
  </div>
`;

export const customSpacingUsingLabels = (args: FormStoryArgs): string => simpleUsingLabels(args);
customSpacingUsingLabels.args = { space: "40px" };
customSpacingUsingLabels.parameters = { controls: { include: ["space"] } };

export const nativeSubmitAndResetUsingLabels = (args: FormStoryArgs): string =>
  renderNativeFormStory(
    args,
    {
      description:
        "Buttons remain light DOM children of the outer native form, so submit and reset work without extra wiring.",
      formId: "native-form-submit-reset-using-labels",
      statusId: "native-form-submit-reset-using-labels-status",
    },
    renderNativeFormLabelFieldSets,
  );
nativeSubmitAndResetUsingLabels.args = { showNotice: false };
nativeSubmitAndResetUsingLabels.parameters = {
  controls: { disable: true },
};

export const nativeValidationUsingLabels = (args: FormStoryArgs): string =>
  renderNativeFormStory(
    args,
    {
      description:
        "This story leaves one required value empty so the browser's native validation UI can block submission until the field is completed.",
      formId: "native-form-validation-using-labels",
      includeNotice: true,
      requireName: true,
      statusId: "native-form-validation-using-labels-status",
    },
    renderNativeFormLabelFieldSets,
  );
nativeValidationUsingLabels.args = { showNotice: true };
nativeValidationUsingLabels.parameters = {
  controls: { disable: true },
};

export const nativeButtonTypesUsingLabels = (args: FormStoryArgs): string =>
  renderNativeFormStory(
    args,
    {
      description:
        "A non-submit button can still read the current form data, while the reset and submit buttons keep their native form behavior.",
      formId: "native-form-button-types-using-labels",
      includePreviewButton: true,
      statusId: "native-form-button-types-using-labels-status",
    },
    renderNativeFormLabelFieldSets,
  );
nativeButtonTypesUsingLabels.args = { showNotice: false };
nativeButtonTypesUsingLabels.parameters = {
  controls: { disable: true },
};
