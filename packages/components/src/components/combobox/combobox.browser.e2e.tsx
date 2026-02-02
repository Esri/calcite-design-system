import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import {
  cancelable,
  defaults,
  disabled,
  focusable,
  reflects,
  hidden,
  internalLabel,
  renders,
  floatingUIOwner,
  t9n,
  topLayer,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { defaultMenuPlacement } from "../../utils/floating-ui";
import { CSS } from "./resources";
import { Combobox } from "./combobox";

describe("calcite-combobox", () => {
  mockConsole();

  describe("cancelable", () => {
    cancelable("calcite-combobox");
  });

  describe("defaults", () => {
    defaults(
      () => mount("calcite-combobox"),
      [
        {
          propertyName: "clearDisabled",
          defaultValue: false,
        },
        {
          propertyName: "flipPlacements",
          defaultValue: undefined,
        },
        {
          propertyName: "filterProps",
          defaultValue: undefined,
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "placement",
          defaultValue: defaultMenuPlacement,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "status",
          defaultValue: "idle",
        },
        {
          propertyName: "validationIcon",
          defaultValue: undefined,
        },
        {
          propertyName: "validationMessage",
          defaultValue: undefined,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-combobox"),
      [
        {
          propertyName: "allowCustomValues",
          value: true,
        },
        {
          propertyName: "clearDisabled",
          value: true,
        },
        {
          propertyName: "form",
          value: "test-form",
        },
        {
          propertyName: "maxItems",
          value: 1,
        },
        {
          propertyName: "name",
          value: "test-name",
        },
        {
          propertyName: "open",
          value: true,
        },
        {
          // needs to run after `open` since it resets `open` after it's asserted value
          propertyName: "disabled",
          value: true,
        },
        {
          propertyName: "placeholderIcon",
          value: "banana",
        },
        {
          propertyName: "placement",
          value: "auto",
        },
        {
          propertyName: "placeholderIconFlipRtl",
          value: true,
        },
        {
          propertyName: "required",
          value: true,
        },
        {
          propertyName: "scale",
          value: "s",
        },
        {
          propertyName: "selectionMode",
          value: "single",
        },
        {
          propertyName: "status",
          value: "invalid",
        },
        {
          propertyName: "validationIcon",
          value: true,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-combobox"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-combobox`));
  });

  describe("renders", () => {
    renders(() => mount("calcite-combobox"), { display: "block" });
  });

  describe("focusable", () => {
    focusable(() =>
      mount(
        <calcite-combobox label="Trees" value="Trees">
          <calcite-combobox-item heading="Pine" value="Pine" />
          <calcite-combobox-item heading="Spruce" value="Spruce" />
        </calcite-combobox>,
      ),
    );
  });

  describe("owns a floating-ui", () => {
    floatingUIOwner(
      () =>
        mount(
          <calcite-combobox>
            <calcite-combobox-item heading="One" icon="banana" id="one" value="one" />
            <calcite-combobox-item heading="Two" icon="beaker" id="two" selected value="two" />
            <calcite-combobox-item heading="Three" id="three" value="three" />
          </calcite-combobox>,
        ),
      "open",
      { shadowSelector: `.${CSS.floatingUIContainer}` },
    );
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-combobox"));
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-combobox"), {
      focusTarget: {
        tab: "calcite-combobox",
        click: {
          pointer: "calcite-combobox",
          method: "calcite-combobox",
        },
      },
    });
  });

  it("should use heading as fallback for both accessibility (aria-label) and value if not provided", async () => {
    await mount(
      <calcite-combobox label="Fruits">
        <calcite-combobox-item heading="Apple" />
        <calcite-combobox-item heading="Fallback Heading" />
      </calcite-combobox>,
    );
    const [item1, item2] = document.body.querySelectorAll("calcite-combobox-item");
    expect(item1.getAttribute("aria-label")).toBe("Apple");
    expect(item2.getAttribute("value")).toBe("Fallback Heading");
  });

  describe("top layer placement", () => {
    topLayer(() => mount("calcite-combobox"));
  });

  describe("keyboard interactions", async () => {
    it("should delete the first focused chip on Enter key in multi-selection mode", async () => {
      const { el } = await mount<Combobox>(
        <calcite-combobox allow-custom-values placeholder="Select a field">
          <calcite-combobox-item
            heading="Natural Resources"
            id="one"
            selected
            value="Natural Resources"
          />
          <calcite-combobox-item heading="Agriculture" id="two" selected value="agriculture" />
          <calcite-combobox-item heading="Forestry" id="three" value="forestry" />
          <calcite-combobox-item heading="Transportation" id="four" value="transportation" />
        </calcite-combobox>,
      );
      const selectedItem1 = page.getBySelector("#one");
      await el.setFocus();
      await userEvent.keyboard("{ArrowLeft}");
      await userEvent.keyboard("{Enter}");
      expect(el.selectedItems.length).toBe(1);
      expect(el.selectedItems[0]).toBe(selectedItem1.element());
    });
    it("should delete the focused chip on Enter key in multi-selection mode", async () => {
      const { el } = await mount<Combobox>(
        <calcite-combobox allow-custom-values placeholder="Select a field">
          <calcite-combobox-item
            heading="Natural Resources"
            id="one"
            selected
            value="Natural Resources"
          />
          <calcite-combobox-item heading="Agriculture" id="two" selected value="agriculture" />
          <calcite-combobox-item heading="Forestry" id="three" value="forestry" />
          <calcite-combobox-item heading="Transportation" id="four" value="transportation" />
        </calcite-combobox>,
      );
      const selectedItem2 = page.getBySelector("#two");
      await el.setFocus();
      await userEvent.keyboard("{ArrowLeft}");
      await userEvent.keyboard("{ArrowLeft}");
      await userEvent.keyboard("{Enter}");
      expect(el.selectedItems.length).toBe(1);
      expect(el.selectedItems[0]).toBe(selectedItem2.element());
    });
    it("should delete the first focused chip on Enter key in multi-selection mode", async () => {
      const { el } = await mount<Combobox>(
        <calcite-combobox allow-custom-values placeholder="Select a field">
          <calcite-combobox-item
            heading="Natural Resources"
            id="one"
            selected
            value="Natural Resources"
          />
          <calcite-combobox-item heading="Agriculture" id="two" selected value="agriculture" />
          <calcite-combobox-item heading="Forestry" id="three" value="forestry" />
          <calcite-combobox-item heading="Transportation" id="four" value="transportation" />
        </calcite-combobox>,
      );
      const selectedItem1 = page.getBySelector("#one");
      await el.setFocus();
      await userEvent.keyboard("{ArrowLeft}");
      await userEvent.keyboard("{Enter}");
      expect(el.selectedItems.length).toBe(1);
      expect(el.selectedItems[0]).toBe(selectedItem1.element());
    });
    it("should delete the focused chip on Delete key in multi-selection mode", async () => {
      const { el } = await mount<Combobox>(
        <calcite-combobox allow-custom-values placeholder="Select a field">
          <calcite-combobox-item
            heading="Natural Resources"
            id="one"
            selected
            value="Natural Resources"
          />
          <calcite-combobox-item heading="Agriculture" id="two" selected value="agriculture" />
          <calcite-combobox-item heading="Forestry" id="three" value="forestry" />
          <calcite-combobox-item heading="Transportation" id="four" value="transportation" />
        </calcite-combobox>,
      );
      const selectedItem2 = page.getBySelector("#two");
      await el.setFocus();
      await userEvent.keyboard("{ArrowLeft}");
      await userEvent.keyboard("{ArrowLeft}");
      await userEvent.keyboard("{Delete}");
      expect(el.selectedItems.length).toBe(1);
      expect(el.selectedItems[0]).toBe(selectedItem2.element());
    });
  });
});
