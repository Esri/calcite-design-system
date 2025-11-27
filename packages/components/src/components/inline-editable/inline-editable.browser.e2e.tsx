import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, focusable } from "../../tests/commonTests/browser";

describe("calcite-inline-editable", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-inline-editable"),
      [
        {
          propertyName: "scale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-inline-editable"));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-inline-editable>
            <calcite-input />
          </calcite-inline-editable>,
        ),
      { display: "block" },
    );
  });

  describe("focusable", () => {
    focusable(
      () =>
        mount(
          <calcite-inline-editable>
            <calcite-input />
          </calcite-inline-editable>,
        ),
      {
        focusTargetSelector: "calcite-input",
      },
    );
  });
});
