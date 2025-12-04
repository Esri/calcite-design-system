import { h } from "@arcgis/lumina";
import { userEvent } from "@vitest/browser/context";
import { describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  delegatesToFloatingUiOwningComponent,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import "./action-pad";
import "../action-group/action-group";
import "../action/action";
import type { Action } from "../action/action";
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

  describe("selection-modes", () => {
    it("supports ARIA keyboard navigation and focus management", async () => {
      const { el } = await mount<"calcite-action-pad">(
        <calcite-action-pad overflow-actions-disabled>
          <calcite-action-group selection-mode="single-persist">
            <calcite-action icon="plus" id="action-1" text="Add" />
            <calcite-action icon="save" id="action-2" text="Save" />
            <calcite-action icon="trash" id="action-3" text="Delete" />
          </calcite-action-group>
        </calcite-action-pad>,
      );

      const [action1, action2, action3] = el.querySelectorAll("calcite-action");

      await userEvent.click(action1);
      expect(document.activeElement).toBe(action1);

      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(action2);

      await userEvent.keyboard("{ArrowLeft}");
      expect(document.activeElement).toBe(action1);

      await userEvent.keyboard("{End}");
      expect(document.activeElement).toBe(action3);

      await userEvent.keyboard("{Home}");
      expect(document.activeElement).toBe(action1);

      await userEvent.keyboard("{Enter}");
      expect(action1.active).toBe(true);
    });

    it("has single and none (default) selection modes", async () => {
      const { el } = await mount<"calcite-action-pad">(
        <calcite-action-pad overflow-actions-disabled>
          <calcite-action-group selection-mode="single">
            <calcite-action icon="plus" id="action-1" text="Add" />
            <calcite-action icon="save" id="action-2" text="Save" />
            <calcite-action icon="trash" id="action-3" text="Delete" />
          </calcite-action-group>
          <calcite-action-group>
            <calcite-action icon="layers" id="action-4" text="Layers" />
            <calcite-action icon="layer-basemap" id="action-5" text="Basemaps" />
            <calcite-action icon="bookmark" id="action-6" text="Bookmarks" />
          </calcite-action-group>
        </calcite-action-pad>,
      );

      const [action1, action2] = el.querySelectorAll("calcite-action");

      await userEvent.click(action1);
      expect(action1.active).toBe(true);
      expect(action2.active).toBe(false);

      await userEvent.click(action2);
      await userEvent.click(action2);
      expect(action2.active).toBe(false);

      const action4 = el.querySelector("#action-4") as Action["el"];
      const action5 = el.querySelector("#action-5") as Action["el"];

      await userEvent.click(action4);
      expect(action4.active).toBe(false);

      await userEvent.click(action5);
      expect(action5.active).toBe(false);
    });
  });
});
