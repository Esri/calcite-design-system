import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  delegatesToFloatingUiOwningComponent,
  focusable,
  t9n,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { SLOTS } from "./resources";

describe("calcite-action-pad", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-action-pad"),
      [
        {
          propertyName: "expandDisabled",
          defaultValue: false,
        },
        {
          propertyName: "expanded",
          defaultValue: false,
        },
        {
          propertyName: "layout",
          defaultValue: "vertical",
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
          propertyName: "selectionAppearance",
          defaultValue: "neutral",
        },
      ],
    );
  });

  describe("is focusable", () => {
    focusable(
      () =>
        mount(
          <calcite-action-pad>
            <calcite-action-group>
              <calcite-action icon="plus" text="Add" />
            </calcite-action-group>
          </calcite-action-pad>,
        ),
      {
        focusTargetSelector: "calcite-action",
      },
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-action-pad"),
      [
        {
          propertyName: "expandDisabled",
          value: true,
        },
        {
          propertyName: "expanded",
          value: true,
        },
        {
          propertyName: "layout",
          value: "horizontal",
        },
        {
          propertyName: "overlayPositioning",
          value: "fixed",
        },
        {
          propertyName: "selectionAppearance",
          value: "neutral",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-action-pad"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-action-pad"), { display: "block" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-action-pad"), SLOTS);
  });

  describe("delegates to floating-ui-owner component", () => {
    delegatesToFloatingUiOwningComponent(
      () =>
        mount(
          <calcite-action-pad>
            <calcite-action icon="plus" id="plus" slot="menu-actions" text="Add" />
          </calcite-action-pad>,
        ),
      "calcite-action-group",
    );
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-action-pad"));
  });
});
