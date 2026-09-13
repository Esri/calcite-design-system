import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { accessible, hidden, renders } from "../../tests/common";

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-carousel label="Carousel example">
        <calcite-carousel-item label="Carousel Item 1">🎠</calcite-carousel-item>
      </calcite-carousel>,
    ),
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-carousel-item"));
});

describe("renders", () => {
  renders(() => mount(<calcite-carousel-item selected>content</calcite-carousel-item>), {
    display: "flex",
  });
});
