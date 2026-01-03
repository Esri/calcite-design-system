import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, disabled, accessible } from "../../tests/commonTests/browser";

describe("calcite-swatch-group", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-swatch-group"));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-swatch-group>
            <calcite-swatch />
          </calcite-swatch-group>,
        ),
      {
        display: "flex",
      },
    );
  });

  describe("disabled", () => {
    disabled(
      () =>
        mount(
          <calcite-swatch-group>
            <calcite-swatch />
          </calcite-swatch-group>,
        ),
      {
        focusTarget: "child",
      },
    );
  });

  describe("accessible", () => {
    describe("selection mode single-persist", () => {
      accessible(() =>
        mount(
          <calcite-swatch-group label="test-label" selectionMode="single-persist">
            <calcite-swatch label="test-label" />
            <calcite-swatch label="test-label" />
          </calcite-swatch-group>,
        ),
      );
    });

    describe("selection mode none (default)", () => {
      accessible(() =>
        mount(
          <calcite-swatch-group label="test-label">
            <calcite-swatch label="test-label" />
            <calcite-swatch label="test-label" />
          </calcite-swatch-group>,
        ),
      );
    });

    describe("selection mode single", () => {
      accessible(() =>
        mount(
          <calcite-swatch-group label="test-label" selectionMode="single">
            <calcite-swatch label="test-label" />
            <calcite-swatch label="test-label" />
          </calcite-swatch-group>,
        ),
      );
    });

    describe("selection mode multiple", () => {
      accessible(() =>
        mount(
          <calcite-swatch-group label="test-label" selectionMode="multiple">
            <calcite-swatch label="test-label" />
            <calcite-swatch label="test-label" />
          </calcite-swatch-group>,
        ),
      );
    });
  });
});
