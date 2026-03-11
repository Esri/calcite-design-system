import { Fragment, h, JsxNode } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { commands, Locator, page, userEvent } from "vitest/browser";
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
import { DEBOUNCE } from "../../utils/resources";
import { CSS } from "./resources";
import { Combobox } from "./combobox";

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
  await expect.element(page.getByLabelText("Apple")).toHaveProperty("ariaLabel", "Apple");
  await expect
    .element(page.getByLabelText("Fallback Heading"))
    .toHaveProperty("ariaLabel", "Fallback Heading");
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
      selectItem: (item: Locator) => Promise<void>,
    ): Promise<void> {
      it("single-selection mode allows toggling selection once the selected item is selected", async () => {
        const { el } = await mount<Combobox>(
          <calcite-combobox selection-mode="single">
            <calcite-combobox-item heading="one" value="one" />
            <calcite-combobox-item heading="two" value="two" />
          </calcite-combobox>,
        );
        const item1 = page.getByLabelText("one").getByText("one");
        const comboboxItemChangeHandler = vi.fn();
        el.addEventListener("calciteComboboxItemChange", comboboxItemChangeHandler);

        let openEvent = waitForEvent(el, "calciteComboboxOpen");
        await userEvent.click(el);
        await openEvent;
        await selectItem(item1);

        expect(el).toHaveProperty("value", "one");
        expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(1);

        openEvent = waitForEvent(el, "calciteComboboxOpen");
        await userEvent.click(el);
        await openEvent;
        await selectItem(item1);

        expect(el).toHaveProperty("value", "");
        expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(2);
      });

      it("single-persist-selection mode does not allow toggling selection once the selected item is selected", async () => {
        const { el } = await mount<Combobox>(
          <calcite-combobox selection-mode="single-persist">
            <calcite-combobox-item heading="one" value="one" />
            <calcite-combobox-item heading="two" value="two" />
          </calcite-combobox>,
        );
        const item1 = page.getByLabelText("one").getByText("one");
        const comboboxItemChangeHandler = vi.fn();
        el.addEventListener("calciteComboboxItemChange", comboboxItemChangeHandler);

        let openEvent = waitForEvent(el, "calciteComboboxOpen");
        await userEvent.click(el);
        await openEvent;
        await selectItem(item1);

        expect(el).toHaveProperty("value", "one");
        expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(1);

        openEvent = waitForEvent(el, "calciteComboboxOpen");
        await userEvent.click(el);
        await openEvent;
        await selectItem(item1);

        expect(el).toHaveProperty("value", "one");
        expect(el).toHaveProperty("open", true);
        expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(1);
      });

      it("single-persist-selection mode correctly selects different items with the same value", async () => {
        const { el } = await mount<Combobox>(
          <calcite-combobox selection-mode="single-persist">
            <calcite-combobox-item heading="one" value="one" />
            <calcite-combobox-item heading="two" value="one" />
          </calcite-combobox>,
        );
        const item1 = page.getBySelector("calcite-combobox-item:first-child");
        const comboboxItemChangeHandler1 = vi.fn();
        item1.element().addEventListener("calciteComboboxItemChange", comboboxItemChangeHandler1);

        const item2 = page.getBySelector("calcite-combobox-item:last-child");
        const comboboxItemChangeHandler2 = vi.fn();
        item2.element().addEventListener("calciteComboboxItemChange", comboboxItemChangeHandler2);

        let openEvent = waitForEvent(el, "calciteComboboxOpen");
        await userEvent.click(el);
        await openEvent;
        await userEvent.click(item1);

        expect(el).toHaveProperty("value", "one");
        expect(el).toHaveProperty("open", false);
        await expect.element(item1).toHaveProperty("selected", true);
        await expect.element(item2).toHaveProperty("selected", false);
        expect(comboboxItemChangeHandler1).toHaveBeenCalledTimes(1);

        openEvent = waitForEvent(el, "calciteComboboxOpen");
        await userEvent.click(el);
        await openEvent;
        await userEvent.click(item2);

        expect(el).toHaveProperty("value", "one");
        expect(el).toHaveProperty("open", false);
        await expect.element(item1).toHaveProperty("selected", false);
        await expect.element(item2).toHaveProperty("selected", true);
        expect(comboboxItemChangeHandler2).toHaveBeenCalledTimes(1);
      });

      it("multiple-selection mode allows toggling selection once the selected item is selected", async () => {
        const { el } = await mount<Combobox>(
          <calcite-combobox selection-mode="multiple">
            <calcite-combobox-item heading="one" value="one" />
            <calcite-combobox-item heading="two" value="two" />
          </calcite-combobox>,
        );
        const item1 = page.getBySelector("calcite-combobox-item:first-child");
        const comboboxItemChangeHandler = vi.fn();
        item1.element().addEventListener("calciteComboboxItemChange", comboboxItemChangeHandler);

        const openEvent = waitForEvent(el, "calciteComboboxOpen");
        await userEvent.click(el);
        await openEvent;
        await selectItem(item1);

        expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(1);

        const chip = page.getBySelector("calcite-chip");
        await expect.element(chip).toBeInTheDocument();

        await selectItem(item1);

        expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(2);
        await expect.element(chip).not.toBeInTheDocument();

        await selectItem(item1);

        expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(3);
        await expect.element(chip).toBeInTheDocument();
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
        const item1 = page.getBySelector("calcite-combobox-item[value=one]");
        const comboboxItemChangeHandler = vi.fn();
        item1.element().addEventListener("calciteComboboxItemChange", comboboxItemChangeHandler);

        const openEvent = waitForEvent(el, "calciteComboboxOpen");
        await userEvent.click(el);
        await openEvent;
        await selectItem(item1);

        expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(1);

        const chip = page.getBySelector("calcite-chip");
        await expect.element(chip).toBeInTheDocument();

        await selectItem(item1);

        expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(2);
        await expect.element(chip).not.toBeInTheDocument();

        await selectItem(item1);

        expect(comboboxItemChangeHandler).toHaveBeenCalledTimes(3);
        await expect.element(chip).toBeInTheDocument();
      });
    }
  });

  it("should select parent in ancestor selection mode", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox selection-mode="ancestors">
        <calcite-combobox-item heading="parent" value="parent">
          <calcite-combobox-item heading="child1" value="child1" />
        </calcite-combobox-item>
      </calcite-combobox>,
    );
    const item1 = page.getByLabelText("child1").getByText("child1");

    const openEvent = waitForEvent(el, "calciteComboboxOpen");
    await userEvent.click(el);
    await openEvent;
    await userEvent.click(item1);

    const parent = page.getByLabelText("parent", { exact: true });

    await expect.element(parent).toBeInTheDocument();
    await expect.element(parent).toHaveProperty("selected", true);

    const chips = page.getBySelector("calcite-chip");
    expect(chips).toHaveLength(1);
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

    const parent = page.getByLabelText("parent", { exact: true });
    const item1 = page.getByLabelText("child1");
    const item2 = page.getByLabelText("child2");

    const openEvent = waitForEvent(el, "calciteComboboxOpen");
    await userEvent.click(el);
    await openEvent;
    await userEvent.click(item1);
    await userEvent.click(item2);

    const chips = page.getBySelector("calcite-chip");
    expect(chips).toHaveLength(2);
    await expect.element(parent).toHaveProperty("selected", true);

    await userEvent.click(parent, { position: { x: 1, y: 1 } });

    expect(chips).toHaveLength(0);
    await expect.element(parent).toHaveProperty("selected", false);
    await expect.element(item1).toHaveProperty("selected", false);
    await expect.element(item2).toHaveProperty("selected", false);
  });

  it("clicking a chip should remove the selected item", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox>
        <calcite-combobox-item heading="one" value="one" />
        <calcite-combobox-item heading="two" value="two" />
      </calcite-combobox>,
    );
    const item1 = page.getBySelector("calcite-combobox-item[value=one]");

    const openEvent = waitForEvent(el, "calciteComboboxOpen");
    await userEvent.click(el);
    await openEvent;
    await userEvent.click(item1);

    const chip = page.getBySelector("calcite-chip");
    await expect.element(chip).toBeDefined();
    expect(el).toHaveProperty("open", true);

    const closeButton = chip.getByRole("button", { hasText: "Remove tag" });
    await userEvent.click(closeButton);

    await expect.element(chip).not.toBeInTheDocument();
    expect(el).toHaveProperty("open", false);
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
    await userEvent.click(chipCloseButton);

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
    const comboboxChangeHandler = vi.fn();
    el.addEventListener("calciteComboboxChange", comboboxChangeHandler);

    await userEvent.click(el);
    await userEvent.type(el, "K{Enter}");

    const customItem = page.getByLabelText("K");
    await expect.element(customItem).toHaveProperty("heading", "K");

    expect(el).toHaveProperty("selectedItems", expect.objectContaining({ length: 1 }));
    await expect.element(customItem).toHaveProperty("selected", true);
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

    const customItem = page.getByLabelText("K");
    const item1 = page.getByLabelText("one");

    await expect.element(customItem).toHaveProperty("heading", "K");

    expect(el).toHaveProperty("selectedItems", expect.objectContaining({ length: 1 }));
    await expect.element(customItem).toHaveProperty("selected", true);
    await expect.element(item1).toHaveProperty("selected", false);
    expect(comboboxChangeHandler).toHaveBeenCalledTimes(1);
  });

  it.skip("should auto-select new custom values in multiple selection mode", async () => {
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

    const customItem = page.getBySelector("calcite-combobox-item:first-child");
    const item1 = page.getByLabelText("one", { exact: true });
    const item2 = page.getByLabelText("two").getByText("two");
    const chips = page.getBySelector("calcite-chip");

    await expect.element(customItem).toHaveProperty("heading", "K");

    expect(el).toHaveProperty("selectedItems", expect.objectContaining({ length: 3 }));
    expect(chips).toHaveLength(2);
    await expect.element(chips.elements()[2]).toHaveTextContent("K");
    await expect.element(customItem).toHaveProperty("selected", true);
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

    const firstItem = page.getBySelector("calcite-combobox-item:first-child");
    (firstItem.element() as ComboboxItem["el"]).selected = true;
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
      const selectedItem = page.getByLabelText("Black Eyed Susan");

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
      const firstSelectedItem = page.getByLabelText("Flowers").getByLabelText("Black Eyed Susan");
      const secondSelectedItem = page.getByLabelText("Rocks").filter({ hasText: "Rocks" });

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

    expect(el.selectedItems).toHaveLength(1);
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

    expect(el.selectedItems).toHaveLength(1);
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

    expect(el.selectedItems).toHaveLength(1);
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

    expect(el.selectedItems).toHaveLength(1);
    expect(el.selectedItems[0]).toBe(selectedItem2.element());
  });
});

describe("filtering", () => {
  it("filters by visible, rendered props", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox>
        <calcite-combobox-item
          description="description-1"
          heading="text-heading-1"
          short-heading="short-heading-1"
          value="value-1"
        />
        <calcite-combobox-item
          description="description-2"
          heading="text-heading-2"
          short-heading="short-heading-2"
          value="value-2"
        />
        <calcite-combobox-item
          description="description-3"
          heading="text-heading-3"
          short-heading="short-heading-3"
          value="value-3"
        />
        <calcite-combobox-item
          description="description-4"
          heading="text-heading-4"
          short-heading="short-heading-4"
          value="value-4"
        />
      </calcite-combobox>,
    );
    const filterEventSpy = vi.fn();
    el.addEventListener("calciteComboboxFilterChange", filterEventSpy);

    await clearAndType(el, "text-heading-1");

    const items = page.getBySelector("calcite-combobox-item");

    await expect.element(items.nth(0)).toBeVisible();
    await expect.element(items.nth(1)).not.toBeVisible();
    await expect.element(items.nth(2)).not.toBeVisible();
    await expect.element(items.nth(3)).not.toBeVisible();
    await expect.element(el).toHaveProperty("filterText", "text-heading-1");
    expect(el).toHaveProperty("filteredItems", expect.arrayContaining([items.nth(0).element()]));
    expect(filterEventSpy).toHaveBeenCalledTimes(1);

    await clearAndType(el, "description-2");

    await expect.element(items.nth(0)).not.toBeVisible();
    await expect.element(items.nth(1)).toBeVisible();
    await expect.element(items.nth(2)).not.toBeVisible();
    await expect.element(items.nth(3)).not.toBeVisible();
    await expect.element(el).toHaveProperty("filterText", "description-2");
    expect(el).toHaveProperty("filteredItems", expect.arrayContaining([items.nth(1).element()]));
    expect(filterEventSpy).toHaveBeenCalledTimes(2);

    await clearAndType(el, "short-heading-3");

    await expect.element(items.nth(0)).not.toBeVisible();
    await expect.element(items.nth(1)).not.toBeVisible();
    await expect.element(items.nth(2)).toBeVisible();
    await expect.element(items.nth(3)).not.toBeVisible();
    await expect.element(el).toHaveProperty("filterText", "short-heading-3");
    expect(el).toHaveProperty("filteredItems", expect.arrayContaining([items.nth(2).element()]));
    expect(filterEventSpy).toHaveBeenCalledTimes(3);

    await clearAndType(el, "value-4");

    await expect.element(items.nth(0)).not.toBeVisible();
    await expect.element(items.nth(1)).not.toBeVisible();
    await expect.element(items.nth(2)).not.toBeVisible();
    await expect.element(items.nth(3)).not.toBeVisible();
    await expect.element(el).toHaveProperty("filterText", "value-4");
    expect(el).toHaveProperty("filteredItems", []);
    expect(filterEventSpy).toHaveBeenCalledTimes(4);

    await clearAndType(el, "-"); // common in all values

    await expect.element(items.nth(0)).toBeVisible();
    await expect.element(items.nth(1)).toBeVisible();
    await expect.element(items.nth(2)).toBeVisible();
    await expect.element(items.nth(3)).toBeVisible();
    await expect.element(el).toHaveProperty("filterText", "-");
    expect(el).toHaveProperty("filteredItems", expect.arrayContaining(items.elements()));
    expect(filterEventSpy).toHaveBeenCalledTimes(5);

    async function clearAndType(combobox: Combobox["el"], text: string): Promise<void> {
      await combobox.setFocus();
      await userEvent.keyboard("{Escape}{Escape}"); // clears input and closes list if open

      const filterEventSpy = waitForEvent(combobox, "calciteComboboxFilterChange");
      await userEvent.keyboard(text);
      await filterEventSpy;
    }
  });

  it("should toggle the combobox when typing within the input", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox id="myCombobox">
        <calcite-combobox-item heading="Raising Arizona" value="Raising Arizona" />
        <calcite-combobox-item heading="Miller's Crossing" value="Miller's Crossing" />
        <calcite-combobox-item heading="The Hudsucker Proxy" value="The Hudsucker Proxy" />
        <calcite-combobox-item heading="Inside Llewyn Davis" value="Inside Llewyn Davis" />
      </calcite-combobox>,
    );

    await el.setFocus();
    expect(el).toHaveProperty("open", false);

    const text = "Arizona";

    await userEvent.keyboard(text);
    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));

    expect(el).toHaveProperty("open", true);

    for (let i = 0; i < text.length; i++) {
      await userEvent.keyboard("{Backspace}");
    }

    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));
    expect(el).toHaveProperty("open", false);
  });

  it("should not toggle the combobox when typing within the input does not match any results", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox id="myCombobox">
        <calcite-combobox-item heading="Raising Arizona" value="Raising Arizona" />
        <calcite-combobox-item heading="Miller's Crossing" value="Miller's Crossing" />
        <calcite-combobox-item heading="The Hudsucker Proxy" value="The Hudsucker Proxy" />
        <calcite-combobox-item heading="Inside Llewyn Davis" value="Inside Llewyn Davis" />
      </calcite-combobox>,
    );

    await el.setFocus();
    expect(el).toHaveProperty("open", false);

    const text = "no-matching-text-here";

    await userEvent.keyboard(text);

    expect(el).toHaveProperty("open", false);
  });

  it("filtering does not match property with value of undefined", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox id="myCombobox">
        <calcite-combobox-item heading="Raising Arizona" value="Raising Arizona" />
        <calcite-combobox-item heading="Miller's Crossing" value="Miller's Crossing" />
        <calcite-combobox-item heading="The Hudsucker Proxy" value="The Hudsucker Proxy" />
        <calcite-combobox-item heading="Inside Llewyn Davis" value="Inside Llewyn Davis" />
      </calcite-combobox>,
    );
    const items = page.getBySelector("calcite-combobox-item");
    await userEvent.click(el);
    await userEvent.keyboard("undefined");
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.filter));

    await expect.element(items.nth(0)).not.toBeVisible();
    await expect.element(items.nth(1)).not.toBeVisible();
    await expect.element(items.nth(2)).not.toBeVisible();
    await expect.element(items.nth(3)).not.toBeVisible();
  });

  it("does not clear filter if pointer down/up on an item has a delay in between events", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox clear-disabled placeholder="Select a field" selection-mode="single-persist">
        <calcite-combobox-item heading="France/Germany" id="item-1" value="France/Germany" />
        <calcite-combobox-item heading="Spain/Portugal" id="item-2" value="Spain/Portugal" />
        <calcite-combobox-item
          heading="Indonesia/Malaysia"
          id="item-3"
          value="Indonesia/Malaysia"
        />
        <calcite-combobox-item heading="Libya/Algeria" id="item-4" value="Libya/Algeria" />
      </calcite-combobox>,
    );

    await userEvent.click(el);
    await userEvent.keyboard("Algeria");
    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));

    const item4 = page.getBySelector("#item-4");
    const bounds = item4.element().getBoundingClientRect();

    await commands.mouseMove(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
    await commands.mouseDown();
    await commands.mouseUp();

    expect(el).toHaveProperty("value", "Libya/Algeria");
  });

  it("respects the filterDisabled item property", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox selection-mode="single">
        <calcite-combobox-item heading="One" id="one" value="one" />
        <calcite-combobox-item heading="Two" id="two" value="two" />
        <calcite-combobox-item filter-disabled heading="Three" id="three" value="three" />
      </calcite-combobox>,
    );
    const items = page.getBySelector("calcite-combobox-item");

    await userEvent.click(el);
    await userEvent.keyboard("two");
    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));

    await expect.element(items.nth(0)).not.toBeVisible();
    await expect.element(items.nth(1)).toBeVisible();
    await expect.element(items.nth(2)).toBeVisible();
  });

  const renderNestedComboboxChildren = (): JsxNode => (
    <>
      <calcite-combobox-item-group id="group-1" label="group 1">
        <calcite-combobox-item heading="item 1.1" id="item-1-1" value="a" />
        <calcite-combobox-item heading="item 1.2" id="item-1-2" value="b" />

        <calcite-combobox-item-group id="subgroup-1-1" label="subgroup 1.1">
          <calcite-combobox-item heading="item 1.1.1" id="item-1-1-1" value="c" />
          <calcite-combobox-item-group id="subgroup-1-1-1" label="subgroup 1.1.1 (empty)" />

          <calcite-combobox-item-group id="subgroup-1-1-2" label="subgroup 1.1.2">
            <calcite-combobox-item heading="item 1.1.2.1" id="item-1-1-2-1" value="d">
              <calcite-combobox-item heading="subitem 1.1.2.2" id="item-1-1-2-2" value="e" />
            </calcite-combobox-item>
          </calcite-combobox-item-group>
        </calcite-combobox-item-group>
      </calcite-combobox-item-group>

      <calcite-combobox-item-group id="group-2" label="group 2">
        <calcite-combobox-item heading="item 2.1" id="item-2-1" value="f">
          <calcite-combobox-item heading="subitem 2.1.1" id="item-2-1-1" value="g" />
          <calcite-combobox-item heading="subitem 2.1.2" id="item-2-1-2" value="h" />
        </calcite-combobox-item>
      </calcite-combobox-item-group>
    </>
  );

  it("should filter on initial load", async () => {
    await mount<Combobox>(
      <calcite-combobox filter-text="1.2">{renderNestedComboboxChildren()}</calcite-combobox>,
    );
    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));

    const visibleItemsAndGroups = page.getBySelector(
      "calcite-combobox-item:not([item-hidden]), calcite-combobox-item-group:not([item-hidden])",
    );
    const visibleItemAndGroupIds = visibleItemsAndGroups.elements().map((item) => item.id);

    expect(visibleItemAndGroupIds).toEqual([
      "group-1",
      "item-1-2",
      "subgroup-1-1",
      "subgroup-1-1-2",
      "item-1-1-2-1",
      "item-1-1-2-2",
      "group-2",
      "item-2-1",
      "item-2-1-2",
    ]);
  });

  it("should display all groups/items when filter is cleared", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox>{renderNestedComboboxChildren()}</calcite-combobox>,
    );

    el.filterText = "1.2";
    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));

    const filteredItemsAndGroups = page.getBySelector(
      "calcite-combobox-item:not([item-hidden]), calcite-combobox-item-group:not([item-hidden])",
    );
    const filteredItemAndGroupIds = filteredItemsAndGroups.elements().map((item) => item.id);

    expect(filteredItemAndGroupIds).toEqual([
      "group-1",
      "item-1-2",
      "subgroup-1-1",
      "subgroup-1-1-2",
      "item-1-1-2-1",
      "item-1-1-2-2",
      "group-2",
      "item-2-1",
      "item-2-1-2",
    ]);

    el.filterText = "";
    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));

    const allVisibleItemAndGroups = page.getBySelector(
      "calcite-combobox-item:not([hidden]):not([item-hidden]), calcite-combobox-item-group:not([hidden]):not([item-hidden])",
    );
    const allVisibleItemAndGroupIds = allVisibleItemAndGroups.elements().map((item) => item.id);
    expect(allVisibleItemAndGroupIds).toEqual([
      "group-1",
      "item-1-1",
      "item-1-2",
      "subgroup-1-1",
      "item-1-1-1",
      "subgroup-1-1-1",
      "subgroup-1-1-2",
      "item-1-1-2-1",
      "item-1-1-2-2",
      "group-2",
      "item-2-1",
      "item-2-1-1",
      "item-2-1-2",
    ]);
  });

  it("allows filtering via item metadata", async () => {
    const { el } = await mount<Combobox>(() => (
      <calcite-combobox>
        <calcite-combobox-item heading="One" metadata={{ foo: "foo" }} value="1" />
        <calcite-combobox-item heading="Two" metadata={{ bar: "bar" }} value="2" />
      </calcite-combobox>
    ));

    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));

    el.filterText = "foo";

    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));

    const visibleItems = page.getBySelector("calcite-combobox-item:not([item-hidden])");

    expect(visibleItems).toHaveLength(1);
    await expect.element(visibleItems.nth(0)).toHaveProperty("value", "1");
  });

  it("should display group and its items when filter matches group label", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox placeholder="typing 'group1' or 'group2' should show group with all items">
        <calcite-combobox-item-group id="group1" label="group1">
          <calcite-combobox-item heading="value1" id="value1" value="value1" />
          <calcite-combobox-item heading="value2" id="value2" value="value2" />
          <calcite-combobox-item heading="value3" id="value3" value="value3" />
        </calcite-combobox-item-group>
        <calcite-combobox-item-group id="group2" label="group2">
          <calcite-combobox-item heading="value4" id="value4" value="value4" />
          <calcite-combobox-item heading="value5" id="value5" value="value5" />
          <calcite-combobox-item heading="value6" id="value6" value="value6" />
        </calcite-combobox-item-group>
      </calcite-combobox>,
    );

    await userEvent.click(el);
    await userEvent.keyboard("group");
    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));

    const one = page.getBySelector("#value1");
    const two = page.getBySelector("#value2");
    const three = page.getBySelector("#value3");
    const four = page.getBySelector("#value4");
    const five = page.getBySelector("#value5");
    const six = page.getBySelector("#value6");
    const group1 = page.getBySelector("#group1");
    const group2 = page.getBySelector("#group2");

    await expect.element(one).toBeVisible();
    await expect.element(two).toBeVisible();
    await expect.element(three).toBeVisible();
    await expect.element(four).toBeVisible();
    await expect.element(five).toBeVisible();
    await expect.element(six).toBeVisible();
    await expect.element(group1).toBeVisible();
    await expect.element(group2).toBeVisible();

    await userEvent.keyboard("1");
    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));

    await expect.element(one).toBeVisible();
    await expect.element(two).toBeVisible();
    await expect.element(three).toBeVisible();
    await expect.element(four).not.toBeVisible();
    await expect.element(five).not.toBeVisible();
    await expect.element(six).not.toBeVisible();
    await expect.element(group1).toBeVisible();
    await expect.element(group2).not.toBeVisible();
  });

  it("should restore filter text when no items are filtered", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox placeholder="Select a field" selection-mode="single-persist">
        <calcite-combobox-item
          heading="Natural Resources"
          id="one"
          selected
          value="Natural Resources"
        />
        <calcite-combobox-item heading="Agriculture" id="two" value="Agriculture" />
        <calcite-combobox-item heading="Transportation" id="three" value="Transportation" />
      </calcite-combobox>,
    );
    const items = page.getBySelector("calcite-combobox-item");
    const input = page.getBySelector("calcite-combobox input");
    await userEvent.click(el);
    await userEvent.keyboard("an");

    // TODO: replace with calciteComboboxFilterChange waiting instead
    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));

    await expect.element(items.nth(0)).not.toBeVisible();
    await expect.element(items.nth(1)).not.toBeVisible();
    await expect.element(items.nth(2)).toBeVisible();

    await userEvent.keyboard("m");
    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));

    await expect.element(items.nth(0)).not.toBeVisible();
    await expect.element(items.nth(1)).not.toBeVisible();
    await expect.element(items.nth(2)).not.toBeVisible();

    expect(el).toHaveProperty("value", "Natural Resources");
    expect(el.filteredItems).toHaveLength(0);
    await expect.element(input).toHaveProperty("value", "anm");
    await expect.element(input).not.toHaveClass(`${CSS.inputHidden}`);
  });

  it("supports filterProps", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox filter-text="match">
        <calcite-combobox-item
          description="description-1"
          heading="match"
          id="text-heading-match"
          short-heading="short-heading-1"
          value="value-1"
        />
        <calcite-combobox-item
          description="match"
          heading="text-heading-2"
          id="description-match"
          short-heading="short-heading-2"
          value="value-2"
        />
        <calcite-combobox-item
          description="description-3"
          heading="text-heading-3"
          id="value-match"
          short-heading="short-heading-3"
          value="match"
        />
        <calcite-combobox-item
          description="description-4"
          heading="text-heading-4"
          id="short-heading-match"
          short-heading="match"
          value="value-4"
        />
        <calcite-combobox-item
          description="description-5"
          heading="text-heading-5"
          id="no-match"
          short-heading="short-heading-5"
          value="value-5"
        />
      </calcite-combobox>,
    );

    el.filterProps = ["description"];
    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));

    expect(el.filteredItems).toHaveLength(1);

    const visibleItems = page.getBySelector(
      "calcite-combobox-item:not([hidden]):not([item-hidden])",
    );

    expect(visibleItems.elements().map((item) => item.id)).toEqual(["description-match"]);
  });
});
