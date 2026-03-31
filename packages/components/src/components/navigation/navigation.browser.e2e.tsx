import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, focusable } from "../../tests/commonTests/browser";

describe("defaults", () => {
  defaults(
    () => mount("calcite-navigation"),
    [
      {
        propertyName: "navigationAction",
        defaultValue: false,
      },
    ],
  );
});

// navigationAction is incorrectly being reset when set to true dynamically - see https://github.com/Esri/calcite-design-system/issues/14057
describe.skip("reflects", () => {
  reflects(
    () => mount("calcite-navigation"),
    [
      {
        propertyName: "navigationAction",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-navigation"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-navigation>
          <calcite-navigation-logo heading="Walt's Chips" slot="logo" />
        </calcite-navigation>,
      ),
    { display: "block" },
  );
});

describe("is focusable", () => {
  focusable(() => mount(<calcite-navigation navigation-action />), {
    shadowFocusTargetSelector: "calcite-action",
  });
});
