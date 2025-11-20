import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-tab", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-tab"),
      [
        { propertyName: "tab", defaultValue: undefined },
        { propertyName: "selected", defaultValue: false },
        { propertyName: "scale", defaultValue: "m" },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-tab"));
  });

  describe("renders", () => {
    renders(() => mount(<calcite-tab>A tab</calcite-tab>), { display: "none", visible: false });
  });
});
