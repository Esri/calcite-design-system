import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  focusable,
  hidden,
  internalLabel,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests/browser";

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

  describe("is focusable", () => {
    describe("focuses the first item if there is no selection", () => {
      focusable(
        () =>
          mount(
            <calcite-segmented-control>
              <calcite-segmented-control-item id="child-1" value="1">
                one
              </calcite-segmented-control-item>
              <calcite-segmented-control-item id="child-2" value="2">
                two
              </calcite-segmented-control-item>
              <calcite-segmented-control-item id="child-3" value="3">
                three
              </calcite-segmented-control-item>
            </calcite-segmented-control>,
          ),
        {
          focusTargetSelector: "#child-1",
        },
      );
    });

    describe("focuses the selected item", () => {
      focusable(
        () =>
          mount(
            <calcite-segmented-control>
              <calcite-segmented-control-item id="child-1" value="1">
                one
              </calcite-segmented-control-item>
              <calcite-segmented-control-item id="child-2" value="2">
                two
              </calcite-segmented-control-item>
              <calcite-segmented-control-item checked id="child-3" value="3">
                three
              </calcite-segmented-control-item>
            </calcite-segmented-control>,
          ),
        {
          focusTargetSelector: "#child-3",
        },
      );
    });
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
