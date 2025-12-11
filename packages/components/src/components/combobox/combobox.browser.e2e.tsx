import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  cancelable,
  defaults,
  reflects,
  hidden,
  internalLabel,
  renders,
  floatingUIOwner,
  t9n,
  disabled,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";

describe("calcite-combobox", () => {
  mockConsole();

  describe("cancelable", () => {
    cancelable("calcite-combobox");
  });

  describe("defaults", () => {
    defaults(
      () => mount("calcite-combobox"),
      [
        {
          propertyName: "clearDisabled",
          defaultValue: false,
        },
        {
          propertyName: "flipPlacements",
          defaultValue: undefined,
        },
        {
          propertyName: "filterProps",
          defaultValue: undefined,
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
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
          propertyName: "validationIcon",
          defaultValue: undefined,
        },
        {
          propertyName: "validationMessage",
          defaultValue: undefined,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-combobox"),
      [
        {
          propertyName: "allowCustomValues",
          value: true,
        },
        {
          propertyName: "clearDisabled",
          value: true,
        },
        {
          propertyName: "form",
          value: "test-form",
        },
        {
          propertyName: "maxItems",
          value: 1,
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
          // needs to run after `open` since it resets `open` after it's asserted value
          propertyName: "disabled",
          value: true,
        },
        {
          propertyName: "placeholderIcon",
          value: "banana",
        },
        {
          propertyName: "placeholderIconFlipRtl",
          value: true,
        },
        {
          propertyName: "required",
          value: true,
        },
        {
          propertyName: "scale",
          value: "s",
        },
        {
          propertyName: "selectionMode",
          value: "single",
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
    hidden(() => mount("calcite-combobox"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-combobox`));
  });

  describe("renders", () => {
    renders(() => mount("calcite-combobox"), { display: "block" });
  });

  describe("owns a floating-ui", () => {
    floatingUIOwner(
      () =>
        mount(
          <calcite-combobox>
            <calcite-combobox-item heading="One" icon="banana" id="one" value="one" />
            <calcite-combobox-item heading="Two" icon="beaker" id="two" selected value="two" />
            <calcite-combobox-item heading="Three" id="three" value="three" />
          </calcite-combobox>,
        ),
      "open",
      { shadowSelector: `.${CSS.floatingUIContainer}` },
    );
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-combobox"));
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-combobox"), {
      focusTarget: {
        tab: "calcite-combobox",
        click: {
          pointer: "calcite-combobox",
          method: "calcite-combobox",
        },
      },
    });
  });

  describe("combobox-item fallback logic", () => {
    it("should use heading as fallback for both accessibility (aria-label) and value if not provided", async () => {
      const wrapper = await mount(
        <calcite-combobox label="Fruits">
          <calcite-combobox-item heading="Apple" />
          <calcite-combobox-item heading="Fallback Heading" />
        </calcite-combobox>,
      );
      const items = Array.from(wrapper.container.querySelectorAll("calcite-combobox-item"));
      expect(items[0].getAttribute("aria-label")).toBe("Apple");
      expect(items[1].getAttribute("value")).toBe("Fallback Heading");
    });
  });
});
