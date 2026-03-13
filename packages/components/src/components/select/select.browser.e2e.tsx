import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe } from "vitest";
import { TemplateResult } from "lit/html.js";
import {
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  internalLabel,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import { Select } from "./select";

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

describe("is form-associated", () => {
  formAssociated(
    () =>
      mount(
        <calcite-select>
          <calcite-option id="0" />
          <calcite-option id="1">uno</calcite-option>
          <calcite-option id="2">dos</calcite-option>
          <calcite-option id="3">tres</calcite-option>
        </calcite-select>,
      ),
    {
      testValue: "dos",
      validation: true,
      // we use <select>'s char-matching behavior vs navigating with arrows + space/enter
      // due to the context menu not being accessible in the browser rendering environment
      changeValueKeys: ["t"],
    },
  );
});

function renderSelect(): TemplateResult {
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
    () => mount<Select>(renderSelect()),
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
  renders(() => mount(renderSelect()), { display: "flex" });
});

describe("is focusable", () => {
  focusable(() => mount(renderSelect()));
});

describe("translation support", () => {
  t9n(() => mount("calcite-select"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-select"));
});
