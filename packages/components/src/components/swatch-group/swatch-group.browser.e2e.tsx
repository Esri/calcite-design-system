import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, disabled } from "../../tests/commonTests/browser";

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
});
