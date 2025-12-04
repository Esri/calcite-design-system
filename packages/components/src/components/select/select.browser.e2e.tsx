import { h, JsxNode } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe } from "vitest";
import {
  defaults,
  reflects,
  hidden,
  internalLabel,
  renders,
  t9n,
  disabled,
} from "../../tests/commonTests/browser";
import { Select } from "./select";

describe("calcite-select", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-select"),
      [
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "status", defaultValue: "idle" },
        { propertyName: "validationIcon", defaultValue: undefined },
        { propertyName: "validationMessage", defaultValue: undefined },
      ],
    );
  });

  function createSimpleSelect(): JsxNode {
    return (
      <calcite-select label="required-for-a11y-test">
        <calcite-option>uno</calcite-option>
        <calcite-option>dos</calcite-option>
        <calcite-option>tres</calcite-option>
      </calcite-select>
    );
  }

  describe("reflects", () => {
    reflects(
      () => mount<Select>(createSimpleSelect()),
      [
        {
          propertyName: "disabled",
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
    hidden(() => mount("calcite-select"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-select`));
  });

  describe("renders", () => {
    renders(() => mount(createSimpleSelect()), { display: "flex" });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-select"));
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-select"));
  });
});
