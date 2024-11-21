import { describe } from "vitest";
import {
  accessible,
  defaults,
  disabled,
  hidden,
  floatingUIOwner,
  formAssociated,
  labelable,
  openClose,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { defaultMenuPlacement } from "../../utils/floating-ui";
import { CSS } from "./resources";

const simpleHTML = html`
  <calcite-autocomplete label="test autocomplete" id="myAutocomplete" value="two">
    <calcite-autocomplete-item
      label="Item 1"
      value="one"
      heading="Item 1"
      description="Item 1 description"
    ></calcite-autocomplete-item>
    <calcite-autocomplete-item
      label="Item 2"
      value="two"
      heading="Item 2"
      description="Item 2 description"
    ></calcite-autocomplete-item>
  </calcite-autocomplete>
`;

const simpleGroupHTML = html`
  <calcite-autocomplete label="hello world">
    <calcite-autocomplete-item-group heading="Enabled Items">
      <calcite-autocomplete-item
        label="Item 1"
        value="1"
        heading="Item 1"
        description="Item 1 description"
        icon-start="information"
        icon-end="gear"
      ></calcite-autocomplete-item>
    </calcite-autocomplete-item-group>
  </calcite-autocomplete>
`;

describe("calcite-autocomplete", () => {
  describe("renders", () => {
    renders("calcite-autocomplete", { display: "block" });
  });

  describe("defaults", () => {
    defaults("calcite-autocomplete", [
      {
        propertyName: "alignment",
        defaultValue: "start",
      },
      {
        propertyName: "autocomplete",
        defaultValue: undefined,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "form",
        defaultValue: undefined,
      },
      {
        propertyName: "icon",
        defaultValue: undefined,
      },
      {
        propertyName: "iconFlipRtl",
        defaultValue: false,
      },
      {
        propertyName: "inputValue",
        defaultValue: undefined,
      },
      {
        propertyName: "label",
        defaultValue: undefined,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "maxLength",
        defaultValue: undefined,
      },
      {
        propertyName: "minLength",
        defaultValue: undefined,
      },
      {
        propertyName: "name",
        defaultValue: undefined,
      },
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "pattern",
        defaultValue: undefined,
      },
      {
        propertyName: "placeholder",
        defaultValue: undefined,
      },
      {
        propertyName: "placement",
        defaultValue: defaultMenuPlacement,
      },
      {
        propertyName: "prefixText",
        defaultValue: undefined,
      },
      {
        propertyName: "readOnly",
        defaultValue: false,
      },
      {
        propertyName: "required",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "status",
        defaultValue: "idle",
      },
      {
        propertyName: "suffixText",
        defaultValue: undefined,
      },
      {
        propertyName: "validationIcon",
        defaultValue: undefined,
      },
      {
        propertyName: "validationMessage",
        defaultValue: undefined,
      },
      {
        propertyName: "validity",
        defaultValue: {
          badInput: false,
          customError: false,
          patternMismatch: false,
          rangeOverflow: false,
          rangeUnderflow: false,
          stepMismatch: false,
          tooLong: false,
          tooShort: false,
          typeMismatch: false,
          valid: false,
          valueMissing: false,
        },
      },
      {
        propertyName: "value",
        defaultValue: undefined,
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-autocomplete", [
      {
        propertyName: "alignment",
        value: "start",
      },
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "form",
        value: "test-form",
      },
      {
        propertyName: "icon",
        value: "banana",
      },
      {
        propertyName: "iconFlipRtl",
        value: true,
      },

      {
        propertyName: "loading",
        value: true,
      },
      {
        propertyName: "maxLength",
        value: 2,
      },
      {
        propertyName: "minLength",
        value: 2,
      },
      {
        propertyName: "name",
        value: "test-name",
      },
      {
        propertyName: "open",
        value: true,
      },

      {
        propertyName: "overlayPositioning",
        value: "absolute",
      },
      {
        propertyName: "placement",
        value: "bottom",
      },
      {
        propertyName: "readOnly",
        value: true,
      },
      {
        propertyName: "required",
        value: true,
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "status",
        value: "invalid",
      },
      {
        propertyName: "validationIcon",
        value: true,
      },
    ]);
  });

  describe("translation support", () => {
    t9n("calcite-autocomplete");
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-autocomplete");
  });

  describe.skip("accessible", () => {
    accessible(simpleGroupHTML);
  });

  describe("labelable", () => {
    labelable("calcite-autocomplete");
  });

  describe("disabled", () => {
    disabled("calcite-autocomplete");
  });

  describe("openClose", () => {
    openClose(simpleHTML);
  });

  describe.skip("is form-associated", () => {
    formAssociated(simpleHTML, {
      testValue: "two",
      submitsOnEnter: true,
      validation: true,
      changeValueKeys: ["Space", "Enter"],
    });
  });

  describe("owns a floating-ui", () => {
    floatingUIOwner(simpleHTML, "open", { shadowSelector: `.${CSS.floatingUIContainer}` });
  });
});
