import { h, JsxNode } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import {
  cancelable,
  defaults,
  disabled,
  floatingUIOwner,
  focusable,
  hidden,
  internalLabel,
  reflects,
  renders,
  t9n,
  topLayer,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { defaultMenuPlacement } from "../../utils/floating-ui";
import { waitForEvent } from "../../tests/commonTests/browser/utils";
import { ComboboxItem } from "../combobox-item/combobox-item";
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
    await mount<Combobox>(
      <calcite-combobox label="Fruits">
        <calcite-combobox-item heading="Apple" />
        <calcite-combobox-item heading="Fallback Heading" />
      </calcite-combobox>,
    );
    const [item1, item2] = document.body.querySelectorAll("calcite-combobox-item");
    expect(item1.ariaLabel).toBe("Apple");
    expect(item2.value).toBe("Fallback Heading");
  });

  describe("item selection", () => {
    describe("toggling items", () => {
      describe("via keyboard", () => {
        assertSelectionModeToggling(async (item): Promise<void> => userEvent.type(item, "{Enter}"));
      });

      describe("via mouse", () => {
        assertSelectionModeToggling(async (item): Promise<void> => userEvent.click(item));
      });

      async function assertSelectionModeToggling(
        selectItem: (item: ComboboxItem["el"]) => Promise<void>,
      ): Promise<void> {
        it("single-selection mode allows toggling selection once the selected item is selected", async () => {
          const { el } = await mount<Combobox>(
            <calcite-combobox selection-mode="single">
              <calcite-combobox-item heading="one" value="one" />
              <calcite-combobox-item heading="two" value="two" />
            </calcite-combobox>,
          );
          let openEvent = waitForEvent(el, "calciteComboboxOpen");
          await userEvent.click(el);
          await openEvent;

          const item1 = el.querySelector<ComboboxItem["el"]>("calcite-combobox-item[value=one]")!;
          const comboboxItemChangeHandler = vi.fn();
          el.addEventListener("calciteComboboxItemChange", comboboxItemChangeHandler);

          await selectItem(item1);
          expect(el.value).toBe("one");
          expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(1);

          openEvent = waitForEvent(el, "calciteComboboxOpen");
          await userEvent.click(el);
          await openEvent;

          await selectItem(item1);
          expect(el.value).toBe("");
          expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(2);
        });

        it("single-persist-selection mode does not allow toggling selection once the selected item is selected", async () => {
          const { el } = await mount<Combobox>(
            <calcite-combobox selection-mode="single-persist">
              <calcite-combobox-item heading="one" value="one" />
              <calcite-combobox-item heading="two" value="two" />
            </calcite-combobox>,
          );
          let openEvent = waitForEvent(el, "calciteComboboxOpen");
          await userEvent.click(el);
          await openEvent;

          const item1 = page
            .getBySelector("calcite-combobox-item[value=one]")
            .element() as ComboboxItem["el"];
          const itemChangeHandler = vi.fn();
          el.addEventListener("calciteComboboxItemChange", itemChangeHandler);

          await selectItem(item1);
          expect(el.value).toBe("one");
          expect(itemChangeHandler).toHaveBeenCalledTimes(1);

          openEvent = waitForEvent(el, "calciteComboboxOpen");
          await userEvent.click(el);
          await openEvent;

          await selectItem(item1);
          expect(el.value).toBe("one");
          expect(el.open).toBe(true);
          expect(itemChangeHandler).toHaveBeenCalledTimes(1);
        });

        it("single-persist-selection mode correctly selects different items with the same value", async () => {
          const { el } = await mount<Combobox>(
            <calcite-combobox selection-mode="single-persist">
              <calcite-combobox-item heading="one" value="one" />
              <calcite-combobox-item heading="two" value="one" />
            </calcite-combobox>,
          );

          let openEvent = waitForEvent(el, "calciteComboboxOpen");
          await userEvent.click(el);
          await openEvent;

          const item1 = page.getBySelector("calcite-combobox-item:nth-child(1)");
          const comboboxItemChangeHandler1 = vi.fn();
          const item2 = page.getBySelector("calcite-combobox-item:nth-child(2)");
          const comboboxItemChangeHandler2 = vi.fn();

          item1.element().addEventListener("calciteComboboxItemChange", comboboxItemChangeHandler1);
          item2.element().addEventListener("calciteComboboxItemChange", comboboxItemChangeHandler2);

          await userEvent.click(item1);

          await expect.element(el).toHaveProperty("value", "one");
          await expect.element(item1).toHaveProperty("selected", true);
          await expect.element(item2).toHaveProperty("selected", false);
          await expect.element(el).toHaveProperty("open", false);
          expect(comboboxItemChangeHandler1).toHaveBeenCalledTimes(1);

          openEvent = waitForEvent(el, "calciteComboboxOpen");
          await userEvent.click(el);
          await openEvent;

          await userEvent.click(item2);

          expect(el.value).toBe("one");
          await expect.element(item1).toHaveProperty("selected", false);
          await expect.element(item2).toHaveProperty("selected", true);
          await expect.element(el).toHaveProperty("open", false);
          expect(comboboxItemChangeHandler2).toHaveBeenCalledTimes(1);
        });

        it("multiple-selection mode allows toggling selection once the selected item is selected", async () => {
          const { el } = await mount<Combobox>(
            <calcite-combobox selection-mode="multiple">
              <calcite-combobox-item heading="one" value="one" />
              <calcite-combobox-item heading="two" value="two" />
            </calcite-combobox>,
          );
          const openEvent = waitForEvent(el, "calciteComboboxOpen");
          await userEvent.click(el);
          await openEvent;

          const item1 = (await page
            .getBySelector("calcite-combobox-item[value=one]")
            .element()) as ComboboxItem["el"];
          const comboboxItemChangeHandler = vi.fn();
          item1.addEventListener("calciteComboboxItemChange", comboboxItemChangeHandler);

          await selectItem(item1);
          expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(1);
          await expect
            .element(page.getBySelector("calcite-combobox calcite-chip"))
            .toBeInTheDocument();

          await selectItem(item1);
          expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(2);
          await expect
            .element(page.getBySelector("calcite-combobox calcite-chip"))
            .not.toBeInTheDocument();

          await selectItem(item1);
          expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(3);
          await expect
            .element(page.getBySelector("calcite-combobox calcite-chip"))
            .toBeInTheDocument();
        });

        it("ancestors-selection mode allows toggling selection once the selected item is selected", async () => {
          const { el } = await mount<Combobox>(
            <calcite-combobox selection-mode="ancestors">
              <calcite-combobox-item heading="parent" value="one">
                <calcite-combobox-item heading="child1" value="two" />
                <calcite-combobox-item heading="child2" value="three" />
              </calcite-combobox-item>
            </calcite-combobox>,
          );
          const openEvent = waitForEvent(el, "calciteComboboxOpen");
          await userEvent.click(el);
          await openEvent;

          const item1 = (await page
            .getBySelector("calcite-combobox-item[value=one]")
            .element()) as ComboboxItem["el"];
          const comboboxItemChangeHandler = vi.fn();
          item1.addEventListener("calciteComboboxItemChange", comboboxItemChangeHandler);

          await selectItem(item1);
          expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(1);
          await expect.element(page.getBySelector("calcite-chip")).toBeInTheDocument();

          await selectItem(item1);
          expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(2);
          await expect.element(page.getBySelector("calcite-chip")).not.toBeInTheDocument();

          await selectItem(item1);
          expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(3);
          await expect.element(page.getBySelector("calcite-chip")).toBeInTheDocument();
        });
      }
    });

    it("should select parent in ancestor selection mode", async () => {
      const { el } = await mount<Combobox>(
        <calcite-combobox selection-mode="ancestors">
          <calcite-combobox-item heading="one" value="one">
            <calcite-combobox-item heading="child1" value="child1" />
          </calcite-combobox-item>
        </calcite-combobox>,
      );
      const openEvent = waitForEvent(el, "calciteComboboxOpen");
      await userEvent.click(el);
      await openEvent;

      const item1 = page
        .getBySelector("calcite-combobox-item[value=child1]")
        .element() as ComboboxItem["el"];
      await userEvent.click(item1);

      const parent = page.getBySelector("calcite-combobox-item[value=one]");
      await expect.element(parent).toBeInTheDocument();
      await expect.element(parent).toHaveProperty("selected", true);

      const chips = page.getBySelector("calcite-chip").elements() as ComboboxItem["el"][];
      expect(chips.length).toBe(1);
    });

    it("should clear children in ancestor selection mode", async () => {
      const { el } = await mount<Combobox>(
        <calcite-combobox selection-mode="ancestors">
          <calcite-combobox-item heading="parent" value="parent">
            <calcite-combobox-item heading="child1" value="child1" />
            <calcite-combobox-item heading="child2" value="child2" />
          </calcite-combobox-item>
        </calcite-combobox>,
      );
      const openEvent = waitForEvent(el, "calciteComboboxOpen");
      await userEvent.click(el);
      await openEvent;

      const parent = page
        .getBySelector("calcite-combobox-item[value=parent]")
        .element() as ComboboxItem["el"];
      const parentItem = page.getByLabelText("parent").filter({ hasText: "parent" });
      const item1 = page
        .getBySelector("calcite-combobox-item[value=child1]")
        .element() as ComboboxItem["el"];
      const item2 = page
        .getBySelector("calcite-combobox-item[value=child2]")
        .element() as ComboboxItem["el"];
      await userEvent.click(item1);
      await userEvent.click(item2);

      const chips = page.getBySelector("calcite-combobox calcite-chip");
      expect(chips.elements().length).toBe(2);
      expect(parent).toHaveAttribute("selected");
      await userEvent.click(parentItem, { position: { x: 1, y: 1 } });
      expect(chips.elements().length).toBe(0);
      expect(parent).not.toHaveAttribute("selected");
      expect(item1).not.toHaveAttribute("selected");
      expect(item2).not.toHaveAttribute("selected");
    });

    it("clicking a chip should remove the selected item", async () => {
      const { el } = await mount<Combobox>(
        <calcite-combobox>
          <calcite-combobox-item heading="one" value="one" />
          <calcite-combobox-item heading="two" value="two" />
        </calcite-combobox>,
      );
      const openEvent = waitForEvent(el, "calciteComboboxOpen");
      await userEvent.click(el);
      await openEvent;

      const item1 = page
        .getBySelector("calcite-combobox-item[value=one]")
        .element() as ComboboxItem["el"];
      await userEvent.click(item1);

      const chip = page.getBySelector("calcite-combobox calcite-chip");
      await expect.element(chip).toBeDefined();
      await expect.element(el).toHaveProperty("open", true);

      const closeButton = chip.getByRole("button", { hasText: "Remove tag" });
      await userEvent.click(closeButton, { timeout: 100 });

      await expect.element(chip).not.toBeInTheDocument();
      await expect.element(el).toHaveProperty("open", false);
    });

    it("should honor calciteComboboxChipClose", async () => {
      const { el } = await mount<Combobox>(
        <calcite-combobox>
          <calcite-combobox-item heading="one" selected value="one" />
        </calcite-combobox>,
      );

      const comboboxChipCloseHandler = vi.fn();
      el.addEventListener("calciteComboboxChipClose", comboboxChipCloseHandler);

      const chipCloseButton = page
        .getBySelector("calcite-chip")
        .getByRole("button", { hasText: "Remove tag" });
      await userEvent.click(chipCloseButton, { timeout: 100 });

      expect(comboboxChipCloseHandler).toHaveBeenCalledTimes(1);
    });

    it("should auto-select new custom value if selection is empty", async () => {
      const { el } = await mount<Combobox>(
        <calcite-combobox allow-custom-values selection-mode="single">
          <calcite-combobox-item heading="one" id="one" value="one" />
          <calcite-combobox-item heading="two" id="two" value="two" />
          <calcite-combobox-item heading="three" id="three" value="three" />
        </calcite-combobox>,
      );
      const input = page.getBySelector("calcite-combobox input");
      const comboboxChangeHandler = vi.fn();
      el.addEventListener("calciteComboboxChange", comboboxChangeHandler);

      await userEvent.click(input);
      await userEvent.type(input, "K{Enter}");

      const item = page.getBySelector("calcite-combobox-item:first-child");
      await expect.element(item).toHaveProperty("heading", "K");

      await expect
        .element(page.elementLocator(el))
        .toHaveProperty("selectedItems", expect.objectContaining({ length: 1 }));
      await expect.element(item).toHaveProperty("selected", true);
      expect(comboboxChangeHandler).toHaveBeenCalledTimes(1);
    });

    it("should replace current value to new custom value in single selection mode", async () => {
      const { el } = await mount<Combobox>(
        <calcite-combobox allow-custom-values selection-mode="single">
          <calcite-combobox-item heading="one" id="one" selected value="one" />
          <calcite-combobox-item heading="two" id="two" value="two" />
          <calcite-combobox-item heading="three" id="three" value="three" />
        </calcite-combobox>,
      );
      const comboboxChangeHandler = vi.fn();
      el.addEventListener("calciteComboboxChange", comboboxChangeHandler);

      await userEvent.click(el);
      await userEvent.type(el, "K{Enter}");

      const customValue = page.getBySelector("calcite-combobox-item:first-child");
      const item1 = page.getBySelector("calcite-combobox-item#one");

      await expect.element(customValue).toHaveProperty("heading", "K");

      await expect
        .element(page.elementLocator(el))
        .toHaveProperty("selectedItems", expect.objectContaining({ length: 1 }));
      await expect.element(customValue).toHaveProperty("selected", true);
      await expect.element(item1).toHaveProperty("selected", false);
      expect(comboboxChangeHandler).toHaveBeenCalledTimes(1);
    });

    it("should auto-select new custom values in multiple selection mode", async () => {
      const { el } = await mount<Combobox>(
        <calcite-combobox allow-custom-values>
          <calcite-combobox-item heading="one" id="one" selected value="one" />
          <calcite-combobox-item heading="two" id="two" selected value="two" />
          <calcite-combobox-item heading="three" id="three" value="three" />
        </calcite-combobox>,
      );
      const comboboxChangeHandler = vi.fn();
      el.addEventListener("calciteComboboxChange", comboboxChangeHandler);

      await userEvent.click(el);
      await userEvent.type(el, "K{Enter}{Escape}");

      const customValue = page.getBySelector("calcite-combobox-item:first-child");
      const item1 = page.getBySelector("calcite-combobox-item#one");
      const item2 = page.getBySelector("calcite-combobox-item#two");
      const chips = page.getBySelector("calcite-combobox calcite-chip");

      await expect.element(customValue).toHaveProperty("heading", "K");

      await expect
        .element(page.elementLocator(el))
        .toHaveProperty("selectedItems", expect.objectContaining({ length: 3 }));
      await expect.element(chips.elements()[2]).toHaveTextContent("K");
      await expect.element(customValue).toHaveProperty("selected", true);
      await expect.element(item1).toHaveProperty("selected", true);
      await expect.element(item2).toHaveProperty("selected", true);
      expect(comboboxChangeHandler).toHaveBeenCalledTimes(1);
    });

    it("updates the value immediately after selecting an item programmatically", async () => {
      const { el } = await mount<Combobox>(
        <calcite-combobox selection-mode="single">
          <calcite-combobox-item heading="first" value="1" />
          <calcite-combobox-item heading="second" value="2" />
          <calcite-combobox-item heading="third" value="3" />
        </calcite-combobox>,
      );

      const firstItem = el.querySelector("calcite-combobox-item")!;
      firstItem.selected = true;
      const immediateValueAfterSelected = el.value;

      expect(immediateValueAfterSelected).toBe("1");
    });
  });

  describe("active item when opened", () => {
    async function assertActiveItem(
      setup: () => JsxNode,
      expectedActiveItemValue: string,
    ): Promise<void> {
      const { el } = await mount<Combobox>(setup);
      const openEvent = waitForEvent(el, "calciteComboboxOpen");

      await userEvent.click(el);
      await openEvent;
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
        await mount<Combobox>(
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
        await mount<Combobox>(() => (
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
