import { h, JsxNode } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  focusable,
  reflects,
  hidden,
  renders,
  disabled,
  accessible,
} from "../../tests/commonTests/browser";

describe("calcite-split-button", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-split-button"),
      [
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "flipPlacements",
          defaultValue: undefined,
        },
        {
          propertyName: "placement",
          defaultValue: "bottom-end",
        },
        {
          propertyName: "download",
          defaultValue: false,
        },
        {
          propertyName: "href",
          defaultValue: undefined,
        },
        {
          propertyName: "rel",
          defaultValue: undefined,
        },
        {
          propertyName: "target",
          defaultValue: undefined,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-split-button"),
      [
        {
          propertyName: "placement",
          value: "bottom-end",
        },
        {
          propertyName: "download",
          value: true,
        },
        {
          propertyName: "href",
          value: "/",
        },
        {
          propertyName: "rel",
          value: "external",
        },
        {
          propertyName: "target",
          value: "_blank",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-split-button"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-split-button"), { display: "inline-block" });
  });

  function renderContent(): JsxNode {
    return (
      <calcite-dropdown-group>
        <calcite-dropdown-item id="item-1">Item</calcite-dropdown-item>
        <calcite-dropdown-item id="item-2" selected>
          Item2
        </calcite-dropdown-item>
      </calcite-dropdown-group>
    );
  }

  describe("focusable", () => {
    focusable(
      () =>
        mount(
          <calcite-split-button dropdownLabel="Show options" primaryText="Button Text">
            {renderContent()}
          </calcite-split-button>,
        ),
      {
        shadowFocusTargetSelector: "calcite-button",
      },
    );
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-split-button"));
  });

  describe("accessible", () => {
    describe("default", () => {
      accessible(() =>
        mount(
          <calcite-split-button dropdownLabel="Show options" primaryText="Button Text">
            {renderContent()}
          </calcite-split-button>,
        ),
      );
    });

    describe("when disabled", () => {
      accessible(() =>
        mount(
          <calcite-split-button disabled dropdownLabel="Show options" primaryText="Button Text">
            {renderContent()}
          </calcite-split-button>,
        ),
      );
    });

    describe("when loading", () => {
      accessible(() =>
        mount(
          <calcite-split-button dropdownLabel="Show options" loading primaryText="Button Text">
            {renderContent()}
          </calcite-split-button>,
        ),
      );
    });

    describe("with icons and no text", () => {
      accessible(() =>
        mount(
          <calcite-split-button
            dropdownLabel="Show options"
            primaryIconStart="plus"
            primaryLabel="Button label"
          >
            {renderContent()}
          </calcite-split-button>,
        ),
      );
    });
  });
});
