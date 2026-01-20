import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, focusable, hidden, renders, t9n } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";

describe("calcite-time-picker", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-time-picker"),
      [
        { propertyName: "hourFormat", defaultValue: "user" },
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "step", defaultValue: 60 },
      ],
    );
  });

  describe("is focusable", () => {
    describe("should focus the first focusable element when setFocus is called (ltr)", () => {
      focusable(() => mount(`calcite-time-picker`), {
        shadowFocusTargetSelector: `.${CSS.input}.${CSS.hour}`,
      });
    });

    describe("should focus the first focusable element when setFocus is called (rtl)", () => {
      focusable(() => mount(<calcite-time-picker dir="rtl" lang="ar" />), {
        shadowFocusTargetSelector: `.${CSS.input}.${CSS.hour}`,
      });
    });
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-time-picker"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-time-picker"), { display: "inline-block" });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-time-picker"));
  });
});
