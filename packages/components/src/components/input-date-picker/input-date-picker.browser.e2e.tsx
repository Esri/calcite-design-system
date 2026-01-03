import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  internalLabel,
  renders,
  floatingUIOwner,
  t9n,
  topLayer,
  accessible,
} from "../../tests/commonTests/browser";

describe("calcite-input-date-picker", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-input-date-picker"),
      [
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "flipPlacements",
          defaultValue: undefined,
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
          propertyName: "calendars",
          defaultValue: 2,
        },
      ],
    );
  });

  describe("is focusable", () => {
    focusable(() => mount(`calcite-input-date-picker`), {
      shadowFocusTargetSelector: "calcite-input-text",
    });
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-input-date-picker"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-input-date-picker`));
  });

  describe("renders", () => {
    renders(() => mount("calcite-input-date-picker"), { display: "inline-block" });
  });

  describe("owns a floating-ui", () => {
    floatingUIOwner(
      () =>
        mount(<calcite-input-date-picker max="2024-11-15" min="2022-11-15" value="2022-11-27" />),
      "open",
      { shadowSelector: ".menu-container" },
    );
  });

  describe("top layer placement", () => {
    topLayer(() => mount("calcite-input-date-picker"));
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-input-date-picker"));
  });

  describe.skip("disabled", () => {
    disabled(() => mount("calcite-input-date-picker"));
  });

  describe("accessible", () => {
    accessible(() => mount(<calcite-input-date-picker label="Input Date Picker" />));
  });
});
