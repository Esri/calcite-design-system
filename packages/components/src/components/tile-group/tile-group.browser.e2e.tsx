import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  hidden,
  reflects,
  renders,
  disabled,
  accessible,
} from "../../tests/commonTests/browser";

describe("calcite-tile-group", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-tile-group"),
      [
        { propertyName: "layout", defaultValue: "horizontal" },
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "selectionAppearance", defaultValue: "icon" },
        { propertyName: "selectionMode", defaultValue: "none" },
      ],
    );
  });

  describe("hidden", () => {
    hidden(() => mount("calcite-tile-group"));
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-tile-group"),
      [
        { propertyName: "layout", value: "horizontal" },
        { propertyName: "scale", value: "m" },
        { propertyName: "selectionAppearance", value: "icon" },
        { propertyName: "selectionMode", value: "none" },
      ],
    );
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-tile-group>
            <calcite-tile heading="test" />
          </calcite-tile-group>,
        ),
      { display: "inline-block" },
    );
  });

  describe("disabled", () => {
    disabled(
      () =>
        mount(
          <calcite-tile-group>
            <calcite-tile />
            <calcite-tile />
            <calcite-tile />
          </calcite-tile-group>,
        ),
      { focusTarget: "child" },
    );
  });

  describe("accessible", () => {
    describe("in selection-mode none", () => {
      accessible(() =>
        mount(
          <calcite-tile-group>
            <calcite-tile label="item-1" />
            <calcite-tile label="item-2" />
          </calcite-tile-group>,
        ),
      );
    });

    describe("in selection-mode single", () => {
      accessible(() =>
        mount(
          <calcite-tile-group selection-mode="single">
            <calcite-tile label="item-1" />
            <calcite-tile label="item-2" />
          </calcite-tile-group>,
        ),
      );
    });

    describe("in selection-mode single-persist", () => {
      accessible(() =>
        mount(
          <calcite-tile-group selection-mode="single-persist">
            <calcite-tile label="item-1" />
            <calcite-tile label="item-2" />
          </calcite-tile-group>,
        ),
      );
    });

    describe("in selection-mode multiple", () => {
      accessible(() =>
        mount(
          <calcite-tile-group selection-mode="multiple">
            <calcite-tile label="item-1" />
            <calcite-tile label="item-2" />
          </calcite-tile-group>,
        ),
      );
    });

    describe("as links", () => {
      accessible(() =>
        mount(
          <calcite-tile-group>
            <calcite-tile href="#" label="item-1" />
            <calcite-tile href="#" label="item-2" />
          </calcite-tile-group>,
        ),
      );
    });
  });
});
