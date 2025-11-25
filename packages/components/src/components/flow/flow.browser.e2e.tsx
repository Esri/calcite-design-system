import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-flow", () => {
  mockConsole();

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-flow"));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-flow>
            <calcite-flow-item heading="test">content</calcite-flow-item>
          </calcite-flow>,
        ),
      { display: "flex" },
    );
  });
});
