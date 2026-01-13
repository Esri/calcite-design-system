import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  focusable,
  internalLabel,
  renders,
  disabled,
  defaults,
  reflects,
  hidden,
  accessible,
} from "../../tests/commonTests/browser";

describe("calcite-radio-button", () => {
  describe("defaults", () => {
    defaults(() => mount("calcite-radio-button"), [{ propertyName: "scale", defaultValue: "m" }]);
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-radio-button"),
      [
        { propertyName: "checked", value: true },
        { propertyName: "disabled", value: true },
        { propertyName: "focused", value: true },
        { propertyName: "hidden", value: true },
        { propertyName: "name", value: "reflects-name" },
        { propertyName: "required", value: true },
        { propertyName: "scale", value: "m" },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-radio-button"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-radio-button`));
  });

  describe("renders", () => {
    renders(() => mount("calcite-radio-button"), { display: "block" });
  });

  describe("is focusable", () => {
    focusable(() => mount("calcite-radio-button"), {
      shadowFocusTargetSelector: ".container",
    });
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-radio-button"), {
      focusTarget: {
        tab: "calcite-radio-button",
        click: {
          pointer: "calcite-radio-button",
          method: "body",
        },
      },
    });
  });

  describe("accessible", () => {
    describe("default", () => {
      accessible(() =>
        mount(<calcite-radio-button id="example" label="label" name="example" value="one" />),
      );
    });

    describe("with label", () => {
      accessible(() =>
        mount(
          <calcite-label>
            <calcite-radio-button id="example" name="example" value="one" />
            label
          </calcite-label>,
        ),
      );
    });
  });
});
