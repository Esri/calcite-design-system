import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { disabled, focusable, hidden, renders } from "../../tests/commonTests/browser";

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

describe("disabled", () => {
  disabled(
    () =>
      mount(
        <calcite-chip-group>
          <calcite-chip />
        </calcite-chip-group>,
      ),
    {
      focusTarget: "child",
    },
  );
});
