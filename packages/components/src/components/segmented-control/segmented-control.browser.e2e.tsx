import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { internalLabel, renders, t9n } from "../../tests/commonTests/browser";
import { defaults, reflects, hidden } from "../../tests/commonTests/browser";

describe("calcite-segmented-control", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-segmented-control"),
      [
        {
          propertyName: "appearance",
          defaultValue: "solid",
        },
        {
          propertyName: "layout",
          defaultValue: "horizontal",
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },

        {
          propertyName: "width",
          defaultValue: "auto",
        },
        {
          propertyName: "status",
          defaultValue: "idle",
        },
        {
          propertyName: "validationIcon",
          defaultValue: undefined,
        },
        {
          propertyName: "validationMessage",
          defaultValue: undefined,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-segmented-control"),
      [
        {
          propertyName: "scale",
          value: "m",
        },
        {
          propertyName: "layout",
          value: "horizontal",
        },
        {
          propertyName: "appearance",
          value: "solid",
        },
        {
          propertyName: "width",
          value: "auto",
        },
        {
          propertyName: "status",
          value: "invalid",
        },
        {
          propertyName: "validationIcon",
          value: true,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-segmented-control"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-segmented-control`));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-segmented-control>
            <calcite-segmented-control-item checked icon-start="banana" value="test" />
          </calcite-segmented-control>,
        ),
      { display: "flex" },
    );
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-segmented-control"));
  });
});
