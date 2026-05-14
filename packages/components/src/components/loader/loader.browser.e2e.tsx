import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-loader"));
});

describe("renders", () => {
  renders(() => mount(<calcite-loader />), { display: "flex", visible: true });

  describe("inline", () => {
    renders(() => mount(<calcite-loader inline />), { display: "flex", visible: true });
  });
});
