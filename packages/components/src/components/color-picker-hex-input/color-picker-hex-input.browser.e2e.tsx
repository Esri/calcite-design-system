import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  focusable,
  accessible,
} from "../../tests/commonTests/browser";

describe("calcite-color-picker-hex-input", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-color-picker-hex-input"),
      [
        {
          propertyName: "allowEmpty",
          defaultValue: false,
        },
        {
          propertyName: "alphaChannel",
          defaultValue: false,
        },
        {
          propertyName: "value",
          defaultValue: "#000000",
        },
      ],
    );
  });

  describe("is focusable", () => {
    focusable(() => mount("calcite-color-picker-hex-input"));
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-color-picker-hex-input"),
      [
        {
          propertyName: "value",
          value: "#ffffff",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-color-picker-hex-input"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-color-picker-hex-input"), { display: "block" });
  });

  describe("accessible", () => {
    describe("default", () => {
      accessible(() => mount("calcite-color-picker-hex-input"));
    });

    describe("with color", () => {
      accessible(() => mount(<calcite-color-picker-hex-input value="#c0ffee" />));
    });

    describe("empty", () => {
      accessible(() => mount(<calcite-color-picker-hex-input allow-empty value="" />));
    });
  });
});
