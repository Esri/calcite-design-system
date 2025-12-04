import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  handlesActionMenuPlacements,
  delegatesToFloatingUiOwningComponent,
  t9n,
  disabled,
} from "../../tests/commonTests/browser";
import { defaultEndMenuPlacement } from "../../utils/floating-ui";
import { mockConsole } from "../../tests/utils/logging";
import { scrolling } from "../../tests/browser/utils/content";
import { SLOTS } from "./resources";

describe("calcite-panel", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-panel"),
      [
        {
          propertyName: "beforeClose",
          defaultValue: undefined,
        },
        {
          propertyName: "headingLevel",
          defaultValue: undefined,
        },
        {
          propertyName: "collapsible",
          defaultValue: false,
        },
        {
          propertyName: "collapseDirection",
          defaultValue: "down",
        },
        {
          propertyName: "collapsed",
          defaultValue: false,
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "menuPlacement",
          defaultValue: defaultEndMenuPlacement,
        },
        {
          propertyName: "menuFlipPlacements",
          defaultValue: undefined,
        },
        {
          propertyName: "icon",
          defaultValue: undefined,
        },
        {
          propertyName: "iconFlipRtl",
          defaultValue: false,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-panel"),
      [
        {
          propertyName: "headingLevel",
          value: 2,
        },
        {
          propertyName: "collapsible",
          value: true,
        },
        {
          propertyName: "collapsed",
          value: true,
        },
        {
          propertyName: "overlayPositioning",
          value: "fixed",
        },
        {
          propertyName: "menuPlacement",
          value: "bottom",
        },
        {
          propertyName: "icon",
          value: "x",
        },
        {
          propertyName: "iconFlipRtl",
          value: "true",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-panel"));
  });

  describe("renders", () => {
    renders(() => mount(<calcite-panel>content</calcite-panel>), { display: "flex" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-panel"), SLOTS);
  });

  describe("floating-ui", () => {
    describe("handles action-menu placement and flipPlacements", () => {
      handlesActionMenuPlacements(() =>
        mount(
          <calcite-panel>
            <calcite-action icon="banana" slot={SLOTS.headerMenuActions} text="test" />
          </calcite-panel>,
        ),
      );
    });

    describe("delegates to floating-ui-owner component", () => {
      delegatesToFloatingUiOwningComponent(
        () =>
          mount(
            <calcite-panel>
              <calcite-action
                icon="measure"
                slot="header-menu-actions"
                text="measure"
                text-enabled
              />
            </calcite-panel>,
          ),
        "calcite-action-menu",
      );
    });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-panel"));
  });

  describe("disabled", () => {
    describe("with scrolling content", () => {
      disabled(
        () => mount(<calcite-panel style={scrolling.style}>{scrolling.render()}</calcite-panel>),
        {
          focusTarget: {
            tab: "calcite-panel",
            click: "calcite-panel",
          },
        },
      );
    });

    describe("without scrolling content", () => {
      disabled(() => mount(<calcite-panel>non-scrolling content</calcite-panel>), {
        focusTarget: "none",
      });
    });
  });
});
