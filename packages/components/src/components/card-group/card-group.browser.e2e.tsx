import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, disabled } from "../../tests/commonTests/browser";

describe("calcite-card-group", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-card-group"));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-card-group label="test-label">
            <calcite-card />
          </calcite-card-group>,
        ),
      {
        display: "block",
      },
    );
  });

  describe("disabled", () => {
    disabled(
      () =>
        mount(
          <calcite-card-group>
            <calcite-card />
          </calcite-card-group>,
        ),
      { focusTarget: "none" },
    );
  });
});
