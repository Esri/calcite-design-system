import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, t9n } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

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

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-time-picker"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-time-picker"), { display: "inline-block" });
  });

  describe("translation support", () => {
    t9n(() => mount(<calcite-time-picker />));
  });
});
