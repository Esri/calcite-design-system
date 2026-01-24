import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { disabled, focusable, hidden, renders } from "../../tests/commonTests/browser";

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

  describe("focusable", () => {
    focusable(
      () =>
        mount(
          <calcite-card-group>
            <calcite-card label="test-label">
              <span slot="heading">Heading</span>
            </calcite-card>
            <calcite-card label="test-label-2">
              <span slot="heading">Heading</span>
            </calcite-card>
          </calcite-card-group>,
        ),
      {
        focusTargetSelector: "calcite-card:first-of-type",
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
