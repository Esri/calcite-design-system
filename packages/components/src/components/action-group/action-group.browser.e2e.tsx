import { h, JsxNode } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  focusable,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { SLOTS } from "./resources";

describe("calcite-action-group", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-action-group"),
      [
        {
          propertyName: "layout",
          defaultValue: "vertical",
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "menuPlacement",
          defaultValue: undefined,
        },
        {
          propertyName: "menuFlipPlacements",
          defaultValue: undefined,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-action-group"),
      [
        {
          propertyName: "menuPlacement",
          value: "bottom",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-action-group"));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-action-group>
            <calcite-action icon="polygon" />
          </calcite-action-group>,
        ),
      { display: "flex" },
    );
  });

  describe("slots", () => {
    slots(() => mount("calcite-action-group"), SLOTS);
  });

  function renderActionGroup(): JsxNode {
    return (
      <calcite-action-group scale="l">
        <calcite-action icon="plus" id="plus" slot="menu-actions" text="Add" />
        <calcite-action icon="banana" id="banana" slot="menu-actions" text="Banana" />
      </calcite-action-group>
    );
  }

  describe("focusable", () => {
    focusable(() => mount(renderActionGroup), { shadowFocusTargetSelector: "calcite-action" });
  });
});
