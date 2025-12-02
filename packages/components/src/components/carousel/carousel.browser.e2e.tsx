import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, focusable, renders, t9n } from "../../tests/commonTests/browser";

describe("calcite-carousel", () => {
  describe("honors hidden attribute", () => {
    hidden(() =>
      mount(
        <calcite-carousel hidden label="Carousel example">
          <calcite-carousel-item label="Carousel Item 1">
            <p>carousel item content</p>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2">
            <p>carousel item content</p>
          </calcite-carousel-item>
        </calcite-carousel>,
      ),
    );
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-carousel label="Carousel example">
            <calcite-carousel-item label="Carousel Item 1">
              <p>carousel item content</p>
            </calcite-carousel-item>
            <calcite-carousel-item label="Carousel Item 2">
              <p>carousel item content</p>
            </calcite-carousel-item>
          </calcite-carousel>,
        ),
      {
        display: "flex",
      },
    );
  });

  describe("focusable", () => {
    focusable(() =>
      mount(
        <calcite-carousel label="Carousel example">
          <calcite-carousel-item label="Carousel Item 1">
            <p>carousel item content</p>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2">
            <p>carousel item content</p>
          </calcite-carousel-item>
        </calcite-carousel>,
      ),
    );
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-carousel"));
  });
});
