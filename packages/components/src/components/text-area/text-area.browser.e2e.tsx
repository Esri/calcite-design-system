import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  cancelable,
  defaults,
  disabled,
  focusable,
  reflects,
  hidden,
  internalLabel,
  renders,
  t9n,
} from "../../tests/commonTests/browser";

describe("cancelable", () => {
  cancelable("calcite-text-area");
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-text-area"),
    [
      {
        propertyName: "limitText",
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
        propertyName: "validationIcon",
        defaultValue: undefined,
      },
      {
        propertyName: "validationMessage",
        defaultValue: undefined,
      },
      {
        propertyName: "wrap",
        defaultValue: "soft",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-text-area"),
    [
      {
        propertyName: "columns",
        value: "10",
      },
      {
        propertyName: "limitText",
        value: true,
      },
      {
        propertyName: "rows",
        value: "50",
      },
      {
        propertyName: "scale",
        value: "s",
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
  hidden(() => mount("calcite-text-area"));
});

describe("internal label", () => {
  internalLabel(() => mount(`calcite-text-area`));
});

describe("renders", () => {
  renders(() => mount("calcite-text-area"), { display: "inline-block" });
});

describe("is focusable", () => {
  focusable(() => mount("calcite-text-area"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-text-area"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-text-area"));
});
