import { h, JsxNode } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  focusable,
  cancelable,
  defaults,
  reflects,
  hidden,
  internalLabel,
  renders,
  slots,
  floatingUIOwner,
  t9n,
  disabled,
  topLayer,
  accessible,
} from "../../tests/commonTests/browser";
import { defaultMenuPlacement } from "../../utils/floating-ui";
import { mockConsole } from "../../tests/utils/logging";
import { CSS, SLOTS } from "./resources";

describe("calcite-autocomplete", () => {
  mockConsole();

  describe("cancelable", () => {
    cancelable("calcite-autocomplete");
  });

  describe("defaults", () => {
    defaults(
      () => mount("calcite-autocomplete"),
      [
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
          defaultValue: "",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-autocomplete"),
      [
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
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-autocomplete"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-autocomplete`));
  });

  describe("renders", () => {
    renders(() => mount("calcite-autocomplete"), { display: "block" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-autocomplete"), SLOTS);
  });

  describe("is focusable", () => {
    focusable(() => mount("calcite-autocomplete"));
  });

  function renderAutocomplete(): JsxNode {
    return (
      <calcite-autocomplete id="myAutocomplete" label="Item list">
        <calcite-autocomplete-item heading="Item one" label="Item one" value="one" />
        <calcite-autocomplete-item heading="Item two" label="Item two" value="two" />
        <calcite-autocomplete-item heading="Item three" label="Item three" value="three" />
        <calcite-autocomplete-item heading="Item four" label="Item four" value="four" />
        <calcite-autocomplete-item disabled heading="Item five" label="Item five" value="five" />
      </calcite-autocomplete>
    );
  }

  describe("floating-ui", () => {
    describe("owns a floating-ui", () => {
      floatingUIOwner(() => mount(renderAutocomplete), "open", {
        shadowSelector: `.${CSS.floatingUIContainer}`,
      });
    });
  });

  describe("top layer placement", () => {
    topLayer(() => mount("calcite-autocomplete"));
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-autocomplete"));
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-autocomplete"));
  });

  describe("accessible", () => {
    describe("default", () => {
      accessible(() =>
        mount(
          <calcite-autocomplete id="myAutocomplete" label="Item list">
            <calcite-autocomplete-item heading="Item one" label="Item one" value="one" />
            <calcite-autocomplete-item heading="Item two" label="Item two" value="two" />
            <calcite-autocomplete-item heading="Item three" label="Item three" value="three" />
            <calcite-autocomplete-item heading="Item four" label="Item four" value="four" />
            <calcite-autocomplete-item
              disabled
              heading="Item five"
              label="Item five"
              value="five"
            />
          </calcite-autocomplete>,
        ),
      );
      accessible(() =>
        mount(
          <form>
            <calcite-autocomplete id="myAutocomplete" label="Item list" name="test">
              <calcite-autocomplete-item heading="Item one" label="Item one" value="one" />
              <calcite-autocomplete-item heading="Item two" label="Item two" value="two" />
              <calcite-autocomplete-item heading="Item three" label="Item three" value="three" />
              <calcite-autocomplete-item heading="Item four" label="Item four" value="four" />
              <calcite-autocomplete-item
                disabled
                heading="Item five"
                label="Item five"
                value="five"
              />
            </calcite-autocomplete>
          </form>,
        ),
      );
      accessible(() =>
        mount(
          <calcite-autocomplete label="Pets">
            <calcite-autocomplete-item-group heading="Dogs">
              <calcite-autocomplete-item heading="Rover" label="Rover" value="rover" />
              <calcite-autocomplete-item heading="Fido" label="Fido" value="one" />
            </calcite-autocomplete-item-group>
            <calcite-autocomplete-item-group heading="Cats">
              <calcite-autocomplete-item heading="Felix" label="Felix" value="felix" />
              <calcite-autocomplete-item heading="Garfield" label="Garfield" value="garfield" />
            </calcite-autocomplete-item-group>
          </calcite-autocomplete>,
        ),
      );
      accessible(() =>
        mount(
          <calcite-autocomplete label="Pets">
            <calcite-autocomplete-item-group heading="Dogs">
              <calcite-autocomplete-item heading="Rover" label="Rover" value="rover" />
              <calcite-autocomplete-item heading="Fido" label="Fido" value="one" />
            </calcite-autocomplete-item-group>
            <calcite-autocomplete-item-group heading="Cats">
              <calcite-autocomplete-item heading="Felix" label="Felix" value="felix" />
              <calcite-autocomplete-item heading="Garfield" label="Garfield" value="garfield" />
            </calcite-autocomplete-item-group>
          </calcite-autocomplete>,
        ),
      );
    });
  });
});
