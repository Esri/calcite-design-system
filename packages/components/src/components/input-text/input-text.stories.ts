import { iconNames } from "../../../.storybook/helpers";
import { boolean, createBreakpointStories, modesDarkDefault, optionalAttribute } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { InputText } from "./input-text";
import "../button/button"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "./input-text"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../label/label"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature

const { scale, status, alignment } = ATTRIBUTES;

type InputTextStoryArgs = Pick<
  InputText,
  | "scale"
  | "status"
  | "alignment"
  | "prefixText"
  | "suffixText"
  | "loading"
  | "clearable"
  | "disabled"
  | "icon"
  | "iconFlipRtl"
  | "labelText"
  | "maxLength"
  | "minLength"
  | "readOnly"
  | "required"
  | "value"
  | "placeholder"
  | "validationIcon"
  | "inlineEdit"
  | "validationMessage"
>;

export default {
  title: "Components/Controls/Input Text",
  args: {
    scale: scale.defaultValue,
    status: status.defaultValue,
    alignment: alignment.defaultValue,
    prefixText: "",
    suffixText: "",
    loading: false,
    clearable: false,
    disabled: false,
    icon: "",
    iconFlipRtl: false,
    labelText: "Label text",
    maxLength: undefined,
    minLength: undefined,
    readOnly: false,
    required: false,
    value: "",
    placeholder: "Placeholder text",
    validationMessage: "",
    validationIcon: "",
    inlineEdit: false,
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    status: {
      options: status.values,
      control: { type: "select" },
    },
    alignment: {
      options: alignment.values,
      control: { type: "select" },
    },
    maxLength: {
      control: { type: "number" },
    },
    minLength: {
      control: { type: "number" },
    },
    validationIcon: {
      options: iconNames,
      control: { type: "select" },
    },
    icon: {
      options: ["", ...iconNames],
      control: { type: "select" },
    },
    inlineEdit: {
      options: [false, true, "controls-disabled"],
      control: { type: "select" },
    },
  },
};

export const simple = (args: InputTextStoryArgs): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text
      scale="${args.scale}"
      status="${args.status}"
      alignment="${args.alignment}"
      prefix-text="${args.prefixText}"
      suffix-text="${args.suffixText}"
      ${boolean("loading", args.loading)}
      ${boolean("clearable", args.clearable)}
      ${boolean("disabled", args.disabled)}
      ${optionalAttribute("icon", args.icon)}
      ${boolean("icon-flip-rtl", args.iconFlipRtl)}
      ${optionalAttribute("label-text", args.labelText)}
      ${optionalAttribute("max-length", args.maxLength)}
      ${optionalAttribute("min-length", args.minLength)}
      ${boolean("read-only", args.readOnly)}
      ${boolean("required", args.required)}
      value="${args.value}"
      placeholder="${args.placeholder}"
      validation-message="${args.validationMessage}"
      ${boolean("inline-edit", args.inlineEdit === true)}
      ${optionalAttribute("inline-edit", args.inlineEdit === "controls-disabled" ? args.inlineEdit : "")}
      ${optionalAttribute("validation-icon", args.validationIcon)}
    >
    </calcite-input-text>
  </div>
`;

export const withSlottedAction = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text id="input-with-slotted-action" status="idle" alignment="start" placeholder="Placeholder text">
      <calcite-button slot="action">Go</calcite-button>
    </calcite-input-text>
  </div>
`;

export const darkModeRTL = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text
      id="input-dark-mode"
      status="idle"
      alignment="start"
      placeholder="Placeholder text"
      validation-message="This should not appear because the status is not 'invalid'"
    >
    </calcite-input-text>
  </div>
`;
darkModeRTL.parameters = { themes: modesDarkDefault };

export const mediumIconForLargeScaleStyling = (): string => html`
  <calcite-label scale="l">
    Input Label
    <calcite-input-text placeholder="Placeholder" scale="l"></calcite-input-text>
    <calcite-input-text
      placeholder="Placeholder"
      scale="l"
      icon="search"
      clearable
      value="sample input to show x"
    ></calcite-input-text>
  </calcite-label>
`;

export const widthSetToBreakpoints = (): string =>
  createBreakpointStories(html`
    <style>
      .breakpoint-story-container {
        flex-wrap: wrap;
      }
      .breakpoint-story-container > * {
        flex-basis: 100%;
      }
    </style>
    <calcite-input-text
      scale="{scale}"
      placeholder="Placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input-text>
    <calcite-input-text
      scale="{scale}"
      value="Value: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input-text>
  `);

export const validationMessageAllScales = (): string => html`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 20px;
    }
  </style>
  <div class="container">
    <calcite-input-text
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-input-text>
    <calcite-input-text
      scale="m"
      status="invalid"
      validation-message="Value must be greater than 1337"
      validation-icon
      value="420"
    ></calcite-input-text>
    <calcite-input-text
      scale="l"
      status="invalid"
      validation-message="Exceeds the maximum length of 2 characters"
      validation-icon
      value="test"
    ></calcite-input-text>
  </div>
`;

export const fontSizeSetAtRoot = (): string =>
  html` <style>
      :root {
        font-size: 60px;
      }
    </style>
    <calcite-input-text placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input-text>`;

export const alignmentAllOptions = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text alignment="start" placeholder="Placeholder text"></calcite-input-text>
    <br />
    <calcite-input-text alignment="center" placeholder="Placeholder text"></calcite-input-text>
    <br />
    <calcite-input-text alignment="end" placeholder="Placeholder text"></calcite-input-text>
  </div>
`;

export const overlayDoesNotObscureIcon = (): string =>
  html` <style>
      .overlay {
        position: absolute;
        inset: 0;
        background-color: white;
        opacity: 0.75;
      }
    </style>
    <calcite-input-text icon="check-square-f"></calcite-input-text>
    <div class="overlay"></div>`;

export const inlineEdit = (): string =>
  html`<calcite-input-text inline-edit value="Editable text"></calcite-input-text> `;

export const inlineEditConfirmLoading = (): string => html`
  <calcite-input-text
    id="inline-edit-confirm-loading"
    inline-edit
    inline-editing
    value="Editable text"
  ></calcite-input-text>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-input-text");
      const input = await document.querySelector("#inline-edit-confirm-loading").componentOnReady();
      input.inlineEditingBeforeConfirm = () => new Promise(() => {});
      input.shadowRoot.querySelector(".confirm-changes").click();
    })();
  </script>
`;

inlineEditConfirmLoading.parameters = { chromatic: { delay: 500 } };

export const inlineEditControlsDisabled = (): string =>
  html`<calcite-input-text inline-edit="controls-disabled" value="Editable text"></calcite-input-text> `;
