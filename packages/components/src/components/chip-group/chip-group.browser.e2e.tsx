import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { disabled, focusable, hidden, renders, accessible } from "../../tests/commonTests/browser";

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

  describe("accessible", () => {
    describe("is accessible in selection mode none (default)", () => {
      accessible(() =>
        mount(
          <calcite-chip-group label="test-label">
            <calcite-chip label="test-label" />
            <calcite-chip label="test-label" />
          </calcite-chip-group>,
        ),
      );
    });

    describe("is accessible in selection mode single", () => {
      accessible(() =>
        mount(
          <calcite-chip-group label="test-label" selection-mode="single">
            <calcite-chip label="test-label" />
            <calcite-chip label="test-label" />
          </calcite-chip-group>,
        ),
      );
    });

    describe("is accessible in selection mode single persists", () => {
      accessible(() =>
        mount(
          <calcite-chip-group label="test-label" selection-mode="single-persist">
            <calcite-chip label="test-label" />
            <calcite-chip label="test-label" />
          </calcite-chip-group>,
        ),
      );
    });

    describe("is accessible in selection mode multiple", () => {
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
});
