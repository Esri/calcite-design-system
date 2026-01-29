import { h, JsxNode } from "@arcgis/lumina";
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
import { waitForEvent } from "../../tests/commonTests/browser/utils";
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

  describe("top layer placement", () => {
    topLayer(() => mount("calcite-combobox"));
  });

  it("should use heading as fallback for both accessibility (aria-label) and value if not provided", async () => {
    await mount(
      <calcite-combobox label="Fruits">
        <calcite-combobox-item heading="Apple" />
        <calcite-combobox-item heading="Fallback Heading" />
      </calcite-combobox>,
    );
    const [item1, item2] = document.body.querySelectorAll("calcite-combobox-item");
    expect(item1.ariaLabel).toBe("Apple");
    expect(item2.value).toBe("Fallback Heading");
  });

  describe("active item when opened", () => {
    async function assertActiveItem(
      setup: () => JsxNode,
      expectedActiveItemValue: string,
    ): Promise<void> {
      const { el } = await mount<Combobox>(setup);
      const openEventSpy = waitForEvent(el, "calciteComboboxOpen");

      await userEvent.click(el);
      await openEventSpy;
      const activeItem = page.getBySelector("calcite-combobox-item[active]");

      await expect.element(activeItem).toHaveProperty("value", expectedActiveItemValue);
    }

    describe("single-selection", () => {
      it("shows the first item as active if there is no previous selection", async () =>
        assertActiveItem(
          () => (
            <calcite-combobox selection-mode="single">
              <calcite-combobox-item heading="item1" value="item1" />
              <calcite-combobox-item heading="item2" value="item2" />
            </calcite-combobox>
          ),
          "item1",
        ));

      it("shows the selected item as active when opened", async () =>
        assertActiveItem(
          () => (
            <calcite-combobox selection-mode="single">
              <calcite-combobox-item heading="item1" value="item1" />
              <calcite-combobox-item heading="item2" value="item2" />
              <calcite-combobox-item heading="item3" selected value="item3" />
            </calcite-combobox>
          ),
          "item3",
        ));

      it("shows the selected item when initially opened with single selection", async () => {
        await mount(
          <calcite-combobox max-items="6" open selection-mode="single">
            <calcite-combobox-item heading="Trees" value="Trees">
              <calcite-combobox-item heading="Pine" value="Pine">
                <calcite-combobox-item heading="Pine Nested" value="Pine Nested" />
              </calcite-combobox-item>
              <calcite-combobox-item disabled heading="Sequoia" value="Sequoia" />
              <calcite-combobox-item heading="Douglas Fir" value="Douglas Fir" />
            </calcite-combobox-item>
            <calcite-combobox-item heading="Flowers" value="Flowers">
              <calcite-combobox-item heading="Daffodil" value="Daffodil" />
              <calcite-combobox-item heading="Black Eyed Susan" selected value="Black Eyed Susan" />
              <calcite-combobox-item heading="Nasturtium" value="Nasturtium" />
            </calcite-combobox-item>
            <calcite-combobox-item heading="Animals" value="Animals">
              <calcite-combobox-item heading="Birds" value="Birds" />
              <calcite-combobox-item heading="Reptiles" value="Reptiles" />
              <calcite-combobox-item heading="Amphibians" value="Amphibians" />
            </calcite-combobox-item>
            <calcite-combobox-item heading="Rocks" value="Rocks" />
            <calcite-combobox-item heading="Insects" value="Insects" />
            <calcite-combobox-item heading="Rivers" value="Rivers" />
          </calcite-combobox>,
        );
        const selectedItem = page.getBySelector(`calcite-combobox-item[value='Black Eyed Susan']`);

        await expect.element(selectedItem).toBeInViewport();
        await expect.element(selectedItem).toHaveProperty("selected", true);
      });
    });

    describe("multiple-selection", () => {
      it("shows the first item as active if there is no previous selection", async () =>
        assertActiveItem(
          () => (
            <calcite-combobox selection-mode="multiple">
              <calcite-combobox-item heading="item1" value="item1" />
              <calcite-combobox-item heading="item2" value="item2" />
              <calcite-combobox-item heading="item3" value="item3" />
            </calcite-combobox>
          ),
          "item1",
        ));

      it("shows the last selected item as active", async () =>
        assertActiveItem(
          () => (
            <calcite-combobox selection-mode="multiple">
              <calcite-combobox-item heading="item1" selected value="item1" />
              <calcite-combobox-item heading="item2" selected value="item2" />
              <calcite-combobox-item heading="item3" selected value="item3" />
            </calcite-combobox>
          ),
          "item3",
        ));

      it("shows the selected item when initially opened with multiple selection", async () => {
        await mount(() => (
          <calcite-combobox max-items="6" open selection-mode="multiple">
            <calcite-combobox-item heading="Trees" value="Trees">
              <calcite-combobox-item heading="Pine" value="Pine">
                <calcite-combobox-item heading="Pine Nested" value="Pine Nested" />
              </calcite-combobox-item>
              <calcite-combobox-item disabled heading="Sequoia" value="Sequoia" />
              <calcite-combobox-item heading="Douglas Fir" value="Douglas Fir" />
            </calcite-combobox-item>
            <calcite-combobox-item heading="Flowers" value="Flowers">
              <calcite-combobox-item heading="Daffodil" value="Daffodil" />
              <calcite-combobox-item heading="Black Eyed Susan" selected value="Black Eyed Susan" />
              <calcite-combobox-item heading="Nasturtium" value="Nasturtium" />
            </calcite-combobox-item>
            <calcite-combobox-item heading="Animals" value="Animals">
              <calcite-combobox-item heading="Birds" value="Birds" />
              <calcite-combobox-item heading="Reptiles" value="Reptiles" />
              <calcite-combobox-item heading="Amphibians" value="Amphibians" />
            </calcite-combobox-item>
            <calcite-combobox-item heading="Rocks" selected value="Rocks" />
            <calcite-combobox-item heading="Insects" value="Insects" />
            <calcite-combobox-item heading="Rivers" value="Rivers" />
          </calcite-combobox>
        ));
        const firstSelectedItem = page.getBySelector(
          `calcite-combobox-item[value='Black Eyed Susan']`,
        );
        const secondSelectedItem = page.getBySelector(`calcite-combobox-item[value='Rocks']`);

        await expect.element(firstSelectedItem.element()).toBeInViewport();
        await expect.element(firstSelectedItem.element()).toHaveProperty("selected", true);

        await expect.element(secondSelectedItem).not.toBeInViewport();
        await expect.element(secondSelectedItem).toHaveProperty("selected", true);
      });
    });

    describe("ancestors-selection", () => {
      it("shows the first item as active if there is no previous selection", async () =>
        assertActiveItem(
          () => (
            <calcite-combobox selection-mode="ancestors">
              <calcite-combobox-item heading="parent" value="item1">
                <calcite-combobox-item heading="item1_1" value="item1_1" />
              </calcite-combobox-item>
              <calcite-combobox-item heading="item2" value="item2" />
              <calcite-combobox-item heading="item3" value="item3" />
            </calcite-combobox>
          ),
          "item1",
        ));

      it("shows the last selected item as active", async () =>
        assertActiveItem(
          () => (
            <calcite-combobox selection-mode="ancestors">
              <calcite-combobox-item heading="parent" selected value="item1">
                <calcite-combobox-item heading="item1_1" value="item1_1" />
              </calcite-combobox-item>
              <calcite-combobox-item heading="item2" value="item2" />
              <calcite-combobox-item heading="item3" selected value="item3" />
            </calcite-combobox>
          ),
          "item3",
        ));
    });
  });
});
