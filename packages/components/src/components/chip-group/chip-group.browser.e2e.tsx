import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  renders,
  scalePropagates,
  accessible,
} from "../../tests/commonTests/browser";

describe("accessible", () => {
  describe("selection mode none (default)", () => {
    accessible(() =>
      mount(
        <calcite-chip-group label="test-label">
          <calcite-chip label="test-label" />
          <calcite-chip label="test-label" />
        </calcite-chip-group>,
      ),
    );
  });

  describe("selection mode single", () => {
    accessible(() =>
      mount(
        <calcite-chip-group label="test-label" selection-mode="single">
          <calcite-chip label="test-label" />
          <calcite-chip label="test-label" />
        </calcite-chip-group>,
      ),
    );
  });

  describe("selection mode single persist", () => {
    accessible(() =>
      mount(
        <calcite-chip-group label="test-label" selection-mode="single-persist">
          <calcite-chip label="test-label" />
          <calcite-chip label="test-label" />
        </calcite-chip-group>,
      ),
    );
  });

  describe("selection mode multiple", () => {
    accessible(() =>
      mount(
        <calcite-chip-group label="test-label" selection-mode="multiple">
          <calcite-chip label="test-label" />
          <calcite-chip label="test-label" />
        </calcite-chip-group>,
      ),
    );
  });
});

describe("defaults", () => {
  defaults(() => mount("calcite-chip-group"), [{ propertyName: "scale", defaultValue: "m" }]);
});

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

describe("propagates", () => {
  scalePropagates(
    (mountOptions) =>
      mount(
        <calcite-chip-group>
          <calcite-chip />
          <calcite-chip />
        </calcite-chip-group>,
        mountOptions,
      ),
    { targetSelector: "calcite-chip" },
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
