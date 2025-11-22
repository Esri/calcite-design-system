import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { internalLabel, renders } from "../../tests/commonTests/browser";
import { defaults, reflects, hidden } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-input-time-picker", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-input-time-picker"),
      [
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "step", defaultValue: 60 },
        { propertyName: "overlayPositioning", defaultValue: "absolute" },
        { propertyName: "status", defaultValue: "idle" },
        { propertyName: "validationIcon", defaultValue: undefined },
        { propertyName: "validationMessage", defaultValue: undefined },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount(`calcite-input-time-picker`),
      [
        { propertyName: "open", value: true },
        { propertyName: "disabled", value: true },
        { propertyName: "scale", value: "m" },
        { propertyName: "status", value: "invalid" },
        { propertyName: "validationIcon", value: true },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-input-time-picker"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-input-time-picker`));
  });

  describe("renders", () => {
    renders(() => mount("calcite-input-time-picker"), { display: "inline-block" });

    describe("renders with en-us lowercase locale code", () => {
      renders(() => mount(<calcite-input-time-picker lang="en-us" />), {
        display: "inline-block",
      });
    });

    describe("renders with base lang when region code is unsupported", () => {
      renders(() => mount(<calcite-input-time-picker lang="nl-nl" />), {
        display: "inline-block",
      });
    });
  });
});
