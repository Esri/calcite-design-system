import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, focusable } from "../../tests/commonTests/browser";

describe("calcite-chip-group", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-chip-group"));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-chip-group>
            <calcite-chip />
          </calcite-chip-group>,
        ),
      {
        display: "flex",
      },
    );
  });

  describe("focusable", () => {
    focusable(
      () =>
        mount(
          <calcite-chip-group label="test-label">
            <calcite-chip label="test-label" />
            <calcite-chip label="test-label" />
          </calcite-chip-group>,
        ),
      {
        focusTargetSelector: "calcite-chip:first-of-type",
      },
    );
  });
});
