import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent } from "vitest/browser";
import { describe, it, expect } from "vitest";
import {
  cancelable,
  defaults,
  focusable,
  reflects,
  hidden,
  renders,
  slots,
  t9n,
  delegatesToFloatingUiOwningComponent,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { SLOTS } from "./resources";

describe("calcite-action-bar", () => {
  mockConsole();

  describe("cancelable", () => {
    cancelable("calcite-action-bar");
  });

  describe("defaults", () => {
    defaults(
      () => mount("calcite-action-bar"),
      [
        {
          propertyName: "expandDisabled",
          defaultValue: false,
        },
        {
          propertyName: "floating",
          defaultValue: false,
        },
        {
          propertyName: "expanded",
          defaultValue: false,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
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
          <calcite-action-bar>
            <calcite-action-group>
              <calcite-action icon="plus" text="Add" />
            </calcite-action-group>
          </calcite-action-bar>,
        ),
      {
        focusTargetSelector: "calcite-action",
      },
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-action-bar"),
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
          propertyName: "floating",
          value: true,
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
    hidden(() => mount("calcite-action-bar"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-action-bar"), { display: "inline-flex" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-action-bar"), SLOTS);
  });

  describe("delegates to floating-ui-owner component", () => {
    delegatesToFloatingUiOwningComponent(
      () =>
        mount(
          <calcite-action-bar>
            <calcite-action icon="plus" id="plus" slot="menu-actions" text="Add" />
          </calcite-action-bar>,
        ),
      "calcite-action-group",
    );
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-action-bar"));
  });

  describe("selection-mode", () => {
    it("supports toolbar pattern keyboard navigation in vertical layout", async () => {
      const { el } = await mount<"calcite-action-bar">(
        <calcite-action-bar overflow-actions-disabled>
          <calcite-action-group selection-mode="single-persist">
            <calcite-action icon="plus" text="Add" />
            <calcite-action icon="save" text="Save" />
            <calcite-action icon="trash" text="Delete" />
          </calcite-action-group>
        </calcite-action-bar>,
      );

      await new Promise((resolve) => setTimeout(resolve, 1100));

      const actions = el.querySelectorAll("calcite-action");

      await userEvent.keyboard("{Tab}");
      expect(document.activeElement).toBe(actions[0]);

      await userEvent.keyboard("{ArrowDown}");
      expect(document.activeElement).toBe(actions[1]);

      await userEvent.keyboard("{Enter}");
      expect(actions[1].active).toBe(true);

      await userEvent.keyboard("{ArrowDown}");
      expect(document.activeElement).toBe(actions[2]);

      await userEvent.keyboard("{ArrowUp}");
      expect(document.activeElement).toBe(actions[1]);

      await userEvent.keyboard("{Home}");
      expect(document.activeElement).toBe(actions[0]);

      await userEvent.keyboard("{End}");
      expect(document.activeElement).toBe(el);
    });

    it("supports toolbar pattern keyboard navigation in horizontal layout", async () => {
      const { el } = await mount<"calcite-action-bar">(
        <calcite-action-bar layout="horizontal" overflow-actions-disabled>
          <calcite-action-group selection-mode="single-persist">
            <calcite-action icon="plus" text="Add" />
            <calcite-action icon="save" text="Save" />
            <calcite-action icon="trash" text="Delete" />
          </calcite-action-group>
        </calcite-action-bar>,
      );

      await new Promise((resolve) => setTimeout(resolve, 1100));

      const actions = el.querySelectorAll("calcite-action");

      await userEvent.keyboard("{Tab}");
      expect(document.activeElement).toBe(actions[0]);

      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(actions[1]);

      await userEvent.keyboard("{Enter}");
      expect(actions[1].active).toBe(true);

      await userEvent.keyboard("{ArrowRight}");
      expect(document.activeElement).toBe(actions[2]);

      await userEvent.keyboard("{ArrowLeft}");
      expect(document.activeElement).toBe(actions[1]);

      await userEvent.keyboard("{Home}");
      expect(document.activeElement).toBe(actions[0]);

      await userEvent.keyboard("{End}");
      expect(document.activeElement).toBe(el);
    });

    it("has single-persist and multiple selection modes", async () => {
      const { el } = await mount<"calcite-action-bar">(
        <calcite-action-bar overflow-actions-disabled>
          <calcite-action-group selection-mode="single-persist">
            <calcite-action icon="plus" text="Add" />
            <calcite-action icon="save" text="Save" />
          </calcite-action-group>
          <calcite-action-group selection-mode="multiple">
            <calcite-action icon="layers" text="Layers" />
            <calcite-action icon="layer-basemap" text="Basemaps" />
            <calcite-action icon="bookmark" text="Bookmarks" />
          </calcite-action-group>
        </calcite-action-bar>,
      );

      const [action1, action2, action3, action4] = el.querySelectorAll("calcite-action");

      await userEvent.click(action1);
      expect(action1.active).toBe(true);
      expect(action2.active).toBe(false);

      await userEvent.click(action1);
      expect(action1.active).toBe(true);
      expect(action2.active).toBe(false);

      await userEvent.click(action2);
      expect(action1.active).toBe(false);
      expect(action2.active).toBe(true);

      await userEvent.click(action3);
      expect(action3.active).toBe(true);
      expect(action4.active).toBe(false);

      await userEvent.click(action4);
      expect(action3.active).toBe(true);
      expect(action4.active).toBe(true);

      await userEvent.click(action4);
      expect(action3.active).toBe(true);
      expect(action4.active).toBe(false);
    });
  });
});
