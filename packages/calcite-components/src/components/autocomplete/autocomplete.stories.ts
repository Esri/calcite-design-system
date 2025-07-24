import { iconNames } from "../../../.storybook/helpers";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { defaultMenuPlacement, menuPlacements } from "../../utils/floating-ui";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Autocomplete } from "./autocomplete";

const { scale, alignment, status, overlayPositioning } = ATTRIBUTES;

type AutocompleteStoryArgs = Pick<
  Autocomplete,
  | "alignment"
  | "disabled"
  | "inputValue"
  | "label"
  | "loading"
  | "maxLength"
  | "minLength"
  | "name"
  | "open"
  | "overlayPositioning"
  | "placeholder"
  | "placement"
  | "prefixText"
  | "readOnly"
  | "required"
  | "scale"
  | "status"
  | "suffixText"
  | "validationIcon"
  | "validationMessage"
  | "value"
>;

export default {
  title: "Components/Controls/Autocomplete",
  args: {
    alignment: alignment.defaultValue,
    disabled: false,
    inputValue: "",
    loading: false,
    open: true,
    overlayPositioning: overlayPositioning.defaultValue,
    placeholder: "Placeholder text",
    placement: defaultMenuPlacement,
    prefixText: "",
    readOnly: false,
    required: false,
    scale: scale.defaultValue,
    status: status.defaultValue,
    suffixText: "",
    validationIcon: "",
    validationMessage: "",
    value: "",
  },
  argTypes: {
    alignment: {
      options: alignment.values.filter((option) => option !== "center"),
      control: { type: "select" },
    },
    overlayPositioning: {
      options: overlayPositioning.values,
      control: { type: "select" },
    },
    placement: {
      options: menuPlacements,
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    status: {
      options: status.values,
      control: { type: "select" },
    },
    validationIcon: {
      options: iconNames,
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

export const simple = (args: AutocompleteStoryArgs): string => html`
  <div style="width:350px">
    <form class="locate-form">
      <calcite-autocomplete
        ${boolean("disabled", args.disabled)}
        ${boolean("loading", args.loading)}
        ${boolean("open", args.open)}
        ${boolean("read-only", args.readOnly)}
        ${boolean("required", args.required)}
        alignment="${args.alignment}"
        input-value="${args.inputValue}"
        label="${args.label}"
        max-length="${args.maxLength}"
        min-length="${args.minLength}"
        name="${args.name}"
        overlay-positioning="${args.overlayPositioning}"
        placeholder="${args.placeholder}"
        placement="${args.placement}"
        prefix-text="${args.prefixText}"
        scale="${args.scale}"
        status="${args.status}"
        suffix-text="${args.suffixText}"
        validation-icon="${args.validationIcon}"
        validation-message="${args.validationMessage}"
        value="${args.value}"
      >
        <calcite-autocomplete-item-group heading="Dogs">
          <calcite-autocomplete-item label="Rover" value="rover" heading="Rover"></calcite-autocomplete-item>
          <calcite-autocomplete-item label="Fido" value="one" heading="Fido"></calcite-autocomplete-item>
        </calcite-autocomplete-item-group>
        <calcite-autocomplete-item-group heading="Cats">
          <calcite-autocomplete-item label="Felix" value="felix" heading="Felix"></calcite-autocomplete-item>
          <calcite-autocomplete-item label="Garfield" value="garfield" heading="Garfield"></calcite-autocomplete-item>
        </calcite-autocomplete-item-group>
      </calcite-autocomplete>
    </form>
    <script>
      document.querySelectorAll(".locate-form").forEach((form) => {
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const data = new FormData(event.target);
          console.log([...data.entries()]);
        });
      });
    </script>
  </div>
`;

export const internalLabel = (): string => html`
  <div style="width:350px">
    <calcite-autocomplete scale="m" label-text="Label text" required>
      <calcite-icon slot="internal-label-content" icon="banana" scale="m"></calcite-icon>
    </calcite-autocomplete>
  </div>
`;

export const smallViewport = (): string => html`
  <calcite-autocomplete open>
    <calcite-autocomplete-item-group heading="Dogs">
      <calcite-autocomplete-item label="Rover" value="rover" heading="Rover"></calcite-autocomplete-item>
      <calcite-autocomplete-item label="Fido" value="one" heading="Fido"></calcite-autocomplete-item>
    </calcite-autocomplete-item-group>
    <calcite-autocomplete-item-group heading="Cats">
      <calcite-autocomplete-item label="Felix" value="felix" heading="Felix"></calcite-autocomplete-item>
      <calcite-autocomplete-item label="Garfield" value="garfield" heading="Garfield"></calcite-autocomplete-item>
    </calcite-autocomplete-item-group>
  </calcite-autocomplete>
`;
smallViewport.parameters = { chromatic: { viewports: [300, 300] } };

export const customIcon = (): string => html`
  <div style="width:350px">
    <calcite-autocomplete icon="banana"></calcite-autocomplete>
  </div>
`;

export const noIcon = (): string => html`
  <div style="width:350px">
    <calcite-autocomplete id="autocomplete"></calcite-autocomplete>
  </div>
  <script>
    document.getElementById("autocomplete").icon = false;
  </script>
`;

export const matchResults = (): string =>
  html`<div style="width:350px; height: 600px;">
    <calcite-autocomplete label="Item list" id="myAutocomplete" input-value="item" open>
      <calcite-autocomplete-item-group heading="items">
        <calcite-autocomplete-item label="Item one" value="one" heading="Item one"></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item two" value="two" heading="Item two"></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item three" value="three" heading="Item three"></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item four" value="four" heading="Item four"></calcite-autocomplete-item>
        <calcite-autocomplete-item
          disabled
          label="Item five"
          value="five"
          heading="Item five"
        ></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item six" value="six" heading="Item six"></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item seven" value="seven" heading="Item seven"></calcite-autocomplete-item>
      </calcite-autocomplete-item-group>
    </calcite-autocomplete>
  </div>`;

const kitchenSinkHTML = html`
  <style>
    .container {
      width: 1200px;
      height: 1200px;
    }

    .parent {
      display: flex;
      width: 85%;
      align-items: center;
      padding: 15px 0;
    }

    .child {
      flex: 1 0 15%;
      margin: 0 25px;
      color: var(--calcite-color-text-3);
      font-family: var(--calcite-font-family);
      font-size: var(--calcite-font-size-0);
      font-weight: var(--calcite-font-weight-medium);
    }

    .right-aligned-text {
      text-align: right;
    }

    hr {
      margin: 25px 0;
      border-top: 1px solid var(--calcite-color-border-2);
    }
  </style>
  <div class="container">
    <!-- Header -->
    <div class="parent">
      <div class="child"></div>
      <div class="child">Small</div>
      <div class="child">Medium</div>
      <div class="child">Large</div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Simple</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="s" class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="m" class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="l" class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent" style="margin-bottom:250px">
      <div class="child right-aligned-text">Open</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="s" open>
            <div slot="content-top">Content top</div>
            <div slot="content-bottom">Content bottom</div>
            <calcite-autocomplete-item
              scale="s"
              label="Item 1"
              value="1"
              heading="Item 1"
              description="Item 1 description"
              icon-start="information"
              icon-end="gear"
            ></calcite-autocomplete-item>
            <calcite-autocomplete-item
              disabled
              scale="s"
              label="Item 2"
              value="2"
              heading="Item 2"
              description="Item 2 description"
            ></calcite-autocomplete-item>
          </calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="m" open>
            <div slot="content-top">Content top</div>
            <div slot="content-bottom">Content bottom</div>
            <calcite-autocomplete-item
              scale="m"
              label="Item 1"
              value="1"
              heading="Item 1"
              description="Item 1 description"
              icon-start="information"
              icon-end="gear"
            ></calcite-autocomplete-item>
            <calcite-autocomplete-item
              disabled
              scale="m"
              label="Item 2"
              value="2"
              heading="Item 2"
              description="Item 2 description"
            ></calcite-autocomplete-item>
          </calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="l" open>
            <div slot="content-top">Content top</div>
            <div slot="content-bottom">Content bottom</div>
            <calcite-autocomplete-item
              scale="l"
              label="Item 1"
              value="1"
              heading="Item 1"
              description="Item 1 description"
              icon-start="information"
              icon-end="gear"
            ></calcite-autocomplete-item>
            <calcite-autocomplete-item
              disabled
              scale="l"
              label="Item 2"
              value="2"
              heading="Item 2"
              description="Item 2 description"
            ></calcite-autocomplete-item>
          </calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Content start/end</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="s" class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="m" class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="l" class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Placeholder</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="s"
            placeholder="Find an address"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="m"
            placeholder="Find an address"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="l"
            placeholder="Find an address"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Disabled</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="s" disabled class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="m" disabled class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="l" disabled class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Readonly</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="s" read-only class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="m" read-only class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="l" read-only class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Loading</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="s" loading class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="m" loading class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="l" loading class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Default value</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="s"
            input-value="Hello world!"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="m"
            input-value="Hello world!"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="l"
            input-value="Hello world!"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Custom Icon</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="s"
            icon="banana"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="m"
            icon="banana"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="l"
            icon="banana"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Required</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="s" class="locator-autocomplete" name="location" required></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="m" class="locator-autocomplete" name="location" required></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="l" class="locator-autocomplete" name="location" required></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Prefix & Suffix</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="s"
            prefix-text="A"
            suffix-text="Z"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="m"
            prefix-text="A"
            suffix-text="Z"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="l"
            prefix-text="A"
            suffix-text="Z"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
    </div>
  </div>
`;

export const kitchenSink = (): string => kitchenSinkHTML;

export const kitchenSinkDarkRTL = (): string => `<div dir="rtl">${kitchenSinkHTML}</div>`;

kitchenSinkDarkRTL.parameters = { themes: modesDarkDefault };
