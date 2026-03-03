import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

mockConsole();

describe("defaults", () => {
  defaults(
    () => mount("calcite-tree"),
    [
      {
        propertyName: "lines",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "selectionMode",
        defaultValue: "single",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-tree"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-tree>
          <calcite-tree-item>Layer 2</calcite-tree-item>
        </calcite-tree>,
      ),
    { display: "block" },
  );
});
