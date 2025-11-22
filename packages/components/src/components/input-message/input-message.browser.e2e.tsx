import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-input-message", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount(<calcite-input-message>Text</calcite-input-message>));
  });

  describe("renders", () => {
    renders(() => mount(<calcite-input-message>content</calcite-input-message>), {
      display: "flex",
    });
  });
});
