import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import { defaults, reflects, hidden, renders, slots } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { SLOTS } from "./resources";

describe("calcite-dialog", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-dialog"),
      [
        {
          propertyName: "beforeClose",
          defaultValue: undefined,
        },
        {
          propertyName: "description",
          defaultValue: undefined,
        },
        {
          propertyName: "dragEnabled",
          defaultValue: false,
        },
        {
          propertyName: "escapeDisabled",
          defaultValue: false,
        },
        {
          propertyName: "closeDisabled",
          defaultValue: false,
        },
        {
          propertyName: "placement",
          defaultValue: "center",
        },
        {
          propertyName: "heading",
          defaultValue: undefined,
        },
        {
          propertyName: "headingLevel",
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
        {
          propertyName: "kind",
          defaultValue: undefined,
        },
        {
          propertyName: "loading",
          defaultValue: false,
        },
        {
          propertyName: "menuOpen",
          defaultValue: false,
        },
        {
          propertyName: "messageOverrides",
          defaultValue: undefined,
        },
        {
          propertyName: "modal",
          defaultValue: false,
        },
        {
          propertyName: "open",
          defaultValue: false,
        },
        {
          propertyName: "outsideCloseDisabled",
          defaultValue: false,
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "resizable",
          defaultValue: false,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "widthScale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-dialog"),
      [
        {
          propertyName: "closeDisabled",
          value: true,
        },
        {
          propertyName: "dragEnabled",
          value: true,
        },
        {
          propertyName: "escapeDisabled",
          value: true,
        },
        {
          propertyName: "placement",
          value: "center",
        },
        {
          propertyName: "headingLevel",
          value: 1,
        },
        {
          propertyName: "kind",
          value: "brand",
        },
        {
          propertyName: "icon",
          value: "x",
        },
        {
          propertyName: "iconFlipRtl",
          value: true,
        },
        {
          propertyName: "loading",
          value: true,
        },
        {
          propertyName: "menuOpen",
          value: true,
        },
        {
          propertyName: "modal",
          value: true,
        },
        {
          propertyName: "open",
          value: true,
        },
        {
          propertyName: "outsideCloseDisabled",
          value: true,
        },
        {
          propertyName: "overlayPositioning",
          value: "fixed",
        },
        {
          propertyName: "resizable",
          value: true,
        },
        {
          propertyName: "scale",
          value: "s",
        },
        {
          propertyName: "widthScale",
          value: "s",
        },
        {
          propertyName: "width",
          value: "s",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-dialog"));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-dialog open>
            <div slot="custom-content">content</div>
          </calcite-dialog>,
        ),
      {
        display: "flex",
        visible: {
          value: true,
          locator: page.getByRole("dialog"),
        },
      },
    );
  });

  describe("slots", () => {
    slots(() => mount("calcite-dialog"), SLOTS);
  });
});
