import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-carousel-item"));
});

describe("renders", () => {
  renders(() => mount(<calcite-carousel-item selected>content</calcite-carousel-item>), {
    display: "flex",
  });
});
