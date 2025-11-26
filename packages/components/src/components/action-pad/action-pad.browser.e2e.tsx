import { h } from "@arcgis/lumina";
import { userEvent } from "@vitest/browser/context";
import { describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import "./action-pad";
import "../action-group/action-group";
import "../action/action";
import type { Action } from "../action/action";

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

  describe("keyboard navigation and selection-mode", () => {
    it("supports ARIA keyboard navigation and focus management", async () => {
      const { el } = await mount<"calcite-action-pad">(
        <calcite-action-pad
          layout="horizontal"
          overflow-actions-disabled
          selection-appearance="neutral"
        >
          <calcite-action-group selection-mode="single-persist">
            <calcite-action appearance="solid" icon="plus" id="action-1" scale="m" text="Add" />
            <calcite-action appearance="solid" icon="save" id="action-2" scale="m" text="Save" />
            <calcite-action appearance="solid" icon="trash" id="action-3" scale="m" text="Delete" />
          </calcite-action-group>
        </calcite-action-pad>,
      );

      const action1 = el.querySelector("#action-1") as Action["el"];
      const action2 = el.querySelector("#action-2") as Action["el"];
      const action3 = el.querySelector("#action-3") as Action["el"];

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
    });

    it("single and none(default) selection modes work as expected", async () => {
      const { el } = await mount<"calcite-action-pad">(
        <calcite-action-pad
          layout="horizontal"
          overflow-actions-disabled
          selection-appearance="neutral"
        >
          <calcite-action-group selection-mode="single">
            <calcite-action appearance="solid" icon="plus" id="action-1" scale="m" text="Add" />
            <calcite-action appearance="solid" icon="save" id="action-2" scale="m" text="Save" />
            <calcite-action appearance="solid" icon="trash" id="action-3" scale="m" text="Delete" />
          </calcite-action-group>
          <calcite-action-group>
            <calcite-action
              appearance="solid"
              icon="layers"
              id="action-4"
              scale="m"
              text="Layers"
            />
            <calcite-action
              appearance="solid"
              icon="layer-basemap"
              id="action-5"
              scale="m"
              text="Basemaps"
            />
            <calcite-action
              appearance="solid"
              icon="bookmark"
              id="action-6"
              scale="m"
              text="Bookmarks"
            />
          </calcite-action-group>
        </calcite-action-pad>,
      );

      const action1 = el.querySelector("#action-1") as Action["el"];
      const action2 = el.querySelector("#action-2") as Action["el"];

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
