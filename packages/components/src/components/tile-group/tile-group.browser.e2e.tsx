import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects, renders, disabled } from "../../tests/commonTests/browser";

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
});
