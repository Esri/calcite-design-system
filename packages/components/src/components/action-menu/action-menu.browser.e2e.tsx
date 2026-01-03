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
  accessible,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { SLOTS } from "./resources";

describe("calcite-action-menu", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-action-menu"),
      [
        {
          propertyName: "appearance",
          defaultValue: "solid",
        },
        {
          propertyName: "expanded",
          defaultValue: false,
        },
        {
          propertyName: "flipPlacements",
          defaultValue: undefined,
        },
        {
          propertyName: "open",
          defaultValue: false,
        },
        {
          propertyName: "placement",
          defaultValue: "auto",
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("is focusable", () => {
    focusable(
      () =>
        mount(
          <calcite-action-menu>
            <calcite-action icon="plus" id="triggerAction" slot={SLOTS.trigger} text="Add" />
            <calcite-action icon="plus" text="Add" />
            <calcite-action icon="plus" text="Add" />
          </calcite-action-menu>,
        ),
      {
        focusTargetSelector: `#triggerAction`,
      },
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-action-menu"),
      [
        {
          propertyName: "expanded",
          value: true,
        },
        {
          propertyName: "open",
          value: true,
        },
        {
          propertyName: "placement",
          value: "auto",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-action-menu"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-action-menu"), { display: "flex" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-action-menu"), SLOTS);
  });

  describe("delegates to floating-ui-owner component", () => {
    delegatesToFloatingUiOwningComponent(
      () =>
        mount(
          <calcite-action-menu>
            <calcite-action icon="plus" text="Plus" text-enabled />
          </calcite-action-menu>,
        ),
      "calcite-popover",
    );
  });

  describe("accessible", () => {
    describe("default", () => {
      accessible(() =>
        mount(
          <calcite-action-menu label="test">
            <calcite-action icon="plus" text="Add" />
          </calcite-action-menu>,
        ),
      );
    });

    describe("with tooltip", () => {
      accessible(() =>
        mount(
          <calcite-action-menu label="test">
            <calcite-tooltip slot="${SLOTS.tooltip}">Bits and bobs.</calcite-tooltip>
            <calcite-action icon="plus" text="Add" />
          </calcite-action-menu>,
        ),
      );
    });
  });
});
