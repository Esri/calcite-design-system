import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  cancelable,
  defaults,
  reflects,
  hidden,
  renders,
  focusable,
  t9n,
  disabled,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";

mockConsole();

describe("cancelable", () => {
  cancelable("calcite-color-picker");
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-color-picker"),
    [
      {
        propertyName: "alphaChannel",
        defaultValue: false,
      },
      {
        propertyName: "channelsDisabled",
        defaultValue: false,
      },
      {
        propertyName: "clearable",
        defaultValue: false,
      },
      {
        propertyName: "fieldDisabled",
        defaultValue: false,
      },
      {
        propertyName: "format",
        defaultValue: "auto",
      },
      {
        propertyName: "hexDisabled",
        defaultValue: false,
      },
      {
        propertyName: "savedDisabled",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "value",
        defaultValue: "#007ac2",
      },
    ],
  );
});

describe("is focusable", () => {
  focusable(() => mount("calcite-color-picker"), {
    shadowFocusTargetSelector: `.${CSS.colorFieldScope}`,
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-color-picker"),
    [
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "fieldDisabled",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-color-picker"));
});

describe("renders", () => {
  renders(() => mount("calcite-color-picker"), { display: "inline-block" });
});

describe("translation support", () => {
  t9n(() => mount("calcite-color-picker"));
});

const centerColorFieldColor = "#408047";

describe("disabled", () => {
  disabled(() => mount(<calcite-color-picker value={centerColorFieldColor} />));
});
