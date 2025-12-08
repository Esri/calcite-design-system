import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, t9n, disabled } from "../../tests/commonTests/browser";

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

  describe("translation support", () => {
    t9n(() => mount("calcite-inline-editable"));
  });

  describe("disabled", () => {
    disabled(
      () =>
        mount(
          <calcite-inline-editable>
            <calcite-input />
          </calcite-inline-editable>,
        ),
      { focusTarget: { tab: "calcite-inline-editable", click: "calcite-input" } },
    );
  });
});
