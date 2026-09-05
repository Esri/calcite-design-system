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
  labelable,
  reflects,
  renders,
  t9n,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import { Select } from "./select";
import { CSS } from "./resources";

describe("labelable", () => {
  labelable((mountOptions) => mount("calcite-select", mountOptions));
});

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-select label="required-for-a11y-test">
        <calcite-option>uno</calcite-option>
        <calcite-option>dos</calcite-option>
        <calcite-option>tres</calcite-option>
      </calcite-select>,
    ),
  );
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-select"),
    [
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "status", defaultValue: "idle" },
      { propertyName: "validationIcon", defaultValue: undefined },
      { propertyName: "validationMessage", defaultValue: undefined },
      {
        propertyName: "validity",
        defaultValue: defaultValidity,
      },
    ],
  );
});

describe("is form-associated", () => {
  formAssociated(
    () =>
      mount(
        <calcite-select name="calciteSelect">
          <calcite-option />
          <calcite-option>uno</calcite-option>
          <calcite-option>dos</calcite-option>
          <calcite-option>tres</calcite-option>
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

describe("theme", () => {
  themed(
    () =>
      mount(
        <calcite-select label="calcite select">
          <calcite-option value="high">uno</calcite-option>
          <calcite-option value="medium">dos</calcite-option>
          <calcite-option value="low">tres</calcite-option>
        </calcite-select>,
      ),
    {
      "--calcite-select-font-size": {
        shadowSelector: `.${CSS.select}`,
        targetProp: "fontSize",
      },
      "--calcite-select-text-color": {
        shadowSelector: `.${CSS.select}`,
        targetProp: "color",
      },
      "--calcite-select-border-color": [
        {
          shadowSelector: `.${CSS.select}`,
          targetProp: "borderColor",
        },
        {
          shadowSelector: `.${CSS.iconContainer}`,
          targetProp: "borderColor",
        },
      ],
      "--calcite-select-icon-color": {
        shadowSelector: `.${CSS.icon}`,
        targetProp: "color",
      },
      "--calcite-select-icon-color-hover": {
        shadowSelector: `.${CSS.icon}`,
        targetProp: "color",
        state: "hover",
      },
      "--calcite-select-background-color": {
        shadowSelector: `.${CSS.select}`,
        targetProp: "backgroundColor",
      },
      "--calcite-select-corner-radius": {
        shadowSelector: `.${CSS.select}`,
        targetProp: "borderRadius",
      },
      "--calcite-select-shadow": {
        shadowSelector: `.${CSS.select}`,
        targetProp: "boxShadow",
      },
    },
  );
});
