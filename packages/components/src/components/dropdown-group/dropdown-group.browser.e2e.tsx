import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects, renders, themed } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";

mockConsole();

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

describe("theme", () => {
  themed(
    () =>
      mount(
        <calcite-dropdown open>
          <calcite-dropdown-group group-title="one">
            <calcite-dropdown-item>A</calcite-dropdown-item>
          </calcite-dropdown-group>
          <calcite-dropdown-group class="two" group-title="two">
            <calcite-dropdown-item>A</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>,
      ),
    {
      "--calcite-dropdown-group-border-color": {
        targetProp: "backgroundColor",
        shadowSelector: `.${CSS.separator}`,
        selector: `calcite-dropdown-group.two`,
      },
      "--calcite-dropdown-group-title-text-color": {
        targetProp: "color",
        shadowSelector: `.${CSS.title}`,
        selector: `calcite-dropdown-group`,
      },
    },
  );
});
