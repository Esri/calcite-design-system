import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-dropdown-group", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-dropdown-group"),
      [
        {
          propertyName: "selectionMode",
          defaultValue: "single",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-dropdown-group"),
      [
        {
          propertyName: "selectionMode",
          value: "single",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-dropdown-group"));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-dropdown-group>
            <calcite-dropdown-item>item</calcite-dropdown-item>
          </calcite-dropdown-group>,
        ),
      { display: "block" },
    );
  });
});
