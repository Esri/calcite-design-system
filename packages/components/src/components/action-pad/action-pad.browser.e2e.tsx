import { h } from "@arcgis/lumina";
import { userEvent } from "vitest/browser";
import { describe, it, expect } from "vitest";
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

  describe("selection-modes", () => {
    it("supports toolbar pattern keyboard navigation in vertical layout", async () => {
      const { el } = await mount<"calcite-action-pad">(
        <calcite-action-pad>
          <calcite-action-group selection-mode="single-persist">
            <calcite-action icon="plus" text="Add" />
            <calcite-action icon="save" text="Save" />
            <calcite-action icon="trash" text="Delete" />
          </calcite-action-group>
        </calcite-action-pad>,
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
      const { el } = await mount<"calcite-action-pad">(
        <calcite-action-pad layout="horizontal">
          <calcite-action-group selection-mode="single-persist">
            <calcite-action icon="plus" text="Add" />
            <calcite-action icon="save" text="Save" />
            <calcite-action icon="trash" text="Delete" />
          </calcite-action-group>
        </calcite-action-pad>,
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

    it("has single and none (default) selection modes", async () => {
      const { el } = await mount<"calcite-action-pad">(
        <calcite-action-pad overflow-actions-disabled>
          <calcite-action-group selection-mode="single">
            <calcite-action icon="plus" text="Add" />
            <calcite-action icon="save" text="Save" />
          </calcite-action-group>
          <calcite-action-group>
            <calcite-action icon="layers" text="Layers" />
            <calcite-action icon="layer-basemap" text="Basemaps" />
            <calcite-action icon="bookmark" text="Bookmarks" />
          </calcite-action-group>
        </calcite-action-pad>,
      );

      const [action1, action2, action3, action4] = el.querySelectorAll("calcite-action");

      await userEvent.click(action1);
      expect(action1.active).toBe(true);
      expect(action2.active).toBe(false);

      await userEvent.click(action2);
      await userEvent.click(action2);
      expect(action1.active).toBe(false);
      expect(action2.active).toBe(false);

      await userEvent.click(action3);
      expect(action3.active).toBe(false);
      expect(action4.active).toBe(false);

      await userEvent.click(action4);
      expect(action3.active).toBe(false);
      expect(action4.active).toBe(false);
    });
  });
});
