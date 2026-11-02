import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  hidden,
  renders,
  disabled,
  accessible,
  scalePropagates,
} from "../../tests/common";

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

describe("defaults", () => {
  defaults(() => mount("calcite-swatch-group"), [{ propertyName: "scale", defaultValue: "m" }]);
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-swatch-group"));
});

describe("propagates", () => {
  scalePropagates(
    (mountOptions) =>
      mount(
        <calcite-swatch-group>
          <calcite-swatch />
          <calcite-swatch />
        </calcite-swatch-group>,
        mountOptions,
      ),
    { targetSelector: "calcite-swatch" },
  );
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
