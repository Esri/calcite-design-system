import { h, JsxNode } from "@arcgis/lumina";
import { describe, expect, it, test, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { Locator, page, userEvent } from "vitest/browser";
import {
  cancelable,
  defaults,
  disabled,
  floatingUIOwner,
  focusable,
  formAssociated,
  hidden,
  internalLabel,
  openClose,
  reflects,
  renders,
  t9n,
  topLayer,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { defaultMenuPlacement } from "../../utils/floating-ui";
import { waitForEvent } from "../../tests/commonTests/browser/utils";
import { ComboboxItem } from "../combobox-item/combobox-item";
import { CSS as ClearButtonCSS } from "../functional/ClearButton";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import { CSS } from "./resources";
import type { Combobox } from "./combobox";

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
      {
        propertyName: "validity",
        defaultValue: defaultValidity,
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

describe("is form-associated", () => {
  formAssociated(
    () =>
      mount(
        <calcite-combobox selection-mode="single">
          <calcite-combobox-item heading="One" icon="banana" id="one" value="one" />
          <calcite-combobox-item heading="Two" icon="beaker" id="two" selected value="two" />
          <calcite-combobox-item heading="Three" id="three" value="three" />
        </calcite-combobox>,
      ),
    {
      testValue: "two",
      submitsOnEnter: true,
      validation: true,
      changeValueKeys: ["{Space}", "{Enter}"],
    },
  );
});

describe("openClose", () => {
  openClose((mountOptions) =>
    mount(
      <calcite-combobox id="myCombobox">
        <calcite-combobox-item heading="Raising Arizona" value="Raising Arizona" />
        <calcite-combobox-item heading="Miller's Crossing" value="Miller's Crossing" />
        <calcite-combobox-item heading="The Hudsucker Proxy" value="The Hudsucker Proxy" />
        <calcite-combobox-item heading="Inside Llewyn Davis" value="Inside Llewyn Davis" />
      </calcite-combobox>,
      mountOptions,
    ),
  );
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

describe("disabled chip labels", () => {
  it("renders disabled chip labels for selection-display=all, selection-mode=multiple", async () => {
    await mount<Combobox>(
      <calcite-combobox selection-display="all" selection-mode="multiple">
        <calcite-combobox-item heading="Apple" />
        <calcite-combobox-item disabled heading="Banana" selected />
      </calcite-combobox>,
    );

    const disabledChip = page.getByTestId("disabled-chip-0");
    await expect.element(disabledChip).toHaveProperty("label", "Banana");
  });

  it("renders disabled chip labels with ancestors for selection-display=all, selection-mode=ancestors", async () => {
    await mount<Combobox>(
      <calcite-combobox selection-display="all" selection-mode="ancestors">
        <calcite-combobox-item heading="Parent" value="parent">
          <calcite-combobox-item disabled heading="Child" selected value="child" />
        </calcite-combobox-item>
      </calcite-combobox>,
    );

    const disabledChip = page.getByTestId("disabled-chip-0");
    await expect.element(disabledChip).toHaveProperty("label", "Parent / Child");
  });

  it("renders disabled chips for selection-display=fit when space allows", async () => {
    await mount<Combobox>(
      <calcite-combobox selection-display="fit" selection-mode="multiple">
        <calcite-combobox-item disabled heading="Apple" selected />
        <calcite-combobox-item disabled heading="Banana" selected />
      </calcite-combobox>,
    );

    const disabledChipApple = page.getByTestId("disabled-chip-0");
    const disabledChipBanana = page.getByTestId("disabled-chip-1");
    const disabledChipCount = page.getByTestId("selected-chip-count");

    await expect.element(disabledChipApple).toHaveProperty("label", "Apple");
    await expect.element(disabledChipBanana).toHaveProperty("label", "Banana");
    await expect.element(disabledChipCount).not.toBeInTheDocument();
  });

  it("renders disabled chip count for selection-display=fit when space is constrained", async () => {
    await mount<Combobox>(
      <calcite-combobox selection-display="fit" selection-mode="multiple" style="width: 120px;">
        <calcite-combobox-item disabled heading="Very long disabled item one" selected />
        <calcite-combobox-item disabled heading="Very long disabled item two" selected />
      </calcite-combobox>,
    );

    const chipCountLabelPattern = /^\+\d+$/;

    const disabledChipCount = page.getByTestId("selected-chip-count");
    await expect
      .element(disabledChipCount)
      .toHaveProperty("label", expect.stringMatching(chipCountLabelPattern));
  });

  it("renders selected chip label instead of +1 count for single fit selection", async () => {
    await mount<Combobox>(
      <calcite-combobox selection-display="fit" selection-mode="multiple" style="width: 400px;">
        <calcite-combobox-item heading="Very long item one" selected />
        <calcite-combobox-item heading="Very long item two" />
      </calcite-combobox>,
    );

    const selectedChip = page.getByTestId("chip-0");
    const selectedChipCount = page.getByTestId("selected-chip-count");

    await expect.element(selectedChipCount).not.toBeInTheDocument();
    await expect.element(selectedChip).toHaveProperty("label", "Very long item one");
  });

  it("renders only the all-selected chip for fit selection-display when select-all is checked", async () => {
    await mount<Combobox>(
      <calcite-combobox
        open
        select-all-enabled
        selection-display="fit"
        selection-mode="multiple"
        style="width: 200px;"
      >
        <calcite-combobox-item heading="Trees">
          <calcite-combobox-item heading="Pine" />
          <calcite-combobox-item heading="Sequoia" />
          <calcite-combobox-item heading="Cedar" />
        </calcite-combobox-item>
        <calcite-combobox-item heading="Flowers">
          <calcite-combobox-item heading="Daffodil" />
          <calcite-combobox-item heading="Nasturtium" />
        </calcite-combobox-item>
      </calcite-combobox>,
    );

    const selectAllItem = page.getByTestId("select-all-item");
    await expect.element(selectAllItem).toBeInTheDocument();
    await userEvent.click(selectAllItem);

    const allSelectedChip = page.getByTestId("all-selected-indicator-chip");
    const selectedChipCount = page.getByTestId("selected-chip-count");
    const firstSelectedChip = page.getByTestId("chip-0");

    await expect.element(allSelectedChip).toBeInTheDocument();
    await expect.element(selectedChipCount).not.toBeInTheDocument();
    await expect.element(firstSelectedChip).not.toBeInTheDocument();
  });

  it("does not render an all-selected chip when fit selection-display is empty", async () => {
    await mount<Combobox>(
      <calcite-combobox select-all-enabled selection-display="fit" selection-mode="multiple" />,
    );

    const allSelectedChip = page.getByTestId("all-selected-indicator-chip");
    await expect.element(allSelectedChip).toHaveClass(CSS.chipInvisible);
  });

  it("includes disabled selected items in single display count", async () => {
    await mount<Combobox>(
      <calcite-combobox selection-display="single" selection-mode="multiple">
        <calcite-combobox-item disabled heading="Apple" selected />
        <calcite-combobox-item disabled heading="Banana" selected />
      </calcite-combobox>,
    );

    const selectedIndicatorChip = page.getByText("2 selected");
    await expect.element(selectedIndicatorChip).toHaveProperty("label", "2 selected");
  });

  it("excludes ancestor parents from single display count", async () => {
    await mount<Combobox>(
      <calcite-combobox selection-display="single" selection-mode="ancestors">
        <calcite-combobox-item heading="Parent" value="parent">
          <calcite-combobox-item disabled heading="Child" selected value="child" />
        </calcite-combobox-item>
      </calcite-combobox>,
    );

    const selectedIndicatorChip = page.getByText("1 selected");
    await expect.element(selectedIndicatorChip).toHaveProperty("label", "1 selected");
  });

  it("sets select-all to indeterminate when a disabled item is selected", async () => {
    await mount<Combobox>(
      <calcite-combobox select-all-enabled selection-mode="multiple">
        <calcite-combobox-item heading="Apple" />
        <calcite-combobox-item disabled heading="Banana" selected />
      </calcite-combobox>,
    );

    const selectAllItem = page.getByTestId("select-all-item");
    await expect.element(selectAllItem).toHaveProperty("indeterminate", true);
  });

  it("includes disabled selected items in value", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox selection-mode="multiple">
        <calcite-combobox-item heading="Apple" selected value="apple" />
        <calcite-combobox-item disabled heading="Banana" selected value="banana" />
      </calcite-combobox>,
    );

    expect(el.value).toEqual(["apple", "banana"]);
  });
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

        const chip = page.getBySelector("calcite-chip").first();
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

        const chip = page.getBySelector("calcite-chip").first();
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
  it("does not throw when pressing Space then Enter with no items", async () => {
    const { el } = await mount<Combobox>(<calcite-combobox />);

    await el.setFocus();
    await userEvent.keyboard("{Space}{Enter}");

    expect(el.open).toBe(false);
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
    await userEvent.keyboard("{Space}");

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
    await userEvent.keyboard("{Space}");

    expect(el.selectedItems).toHaveLength(1);
    expect(el.selectedItems[0]).toBe(selectedItem2.element());
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

  describe("clearing values", () => {
    type SelectionMode = "single" | "single-persist" | "multiple" | "ancestors";

    const selectionModes: SelectionMode[] = ["single", "single-persist", "multiple", "ancestors"];

    function renderCombobox(selectionMode: SelectionMode, clearDisabled = false): JsxNode {
      if (selectionMode === "ancestors") {
        return (
          <calcite-combobox clearDisabled={clearDisabled} selectionMode="ancestors">
            <calcite-combobox-item heading="parent" value="parent">
              <calcite-combobox-item heading="child1" value="child1" />
              <calcite-combobox-item heading="child2" selected value="child2" />
            </calcite-combobox-item>
          </calcite-combobox>
        );
      }

      if (selectionMode === "multiple") {
        return (
          <calcite-combobox clearDisabled={clearDisabled} selectionMode="multiple">
            <calcite-combobox-item heading="one" selected value="one" />
            <calcite-combobox-item heading="two" selected value="two" />
            <calcite-combobox-item heading="three" selected value="three" />
          </calcite-combobox>
        );
      }

      return (
        <calcite-combobox clearDisabled={clearDisabled} selectionMode={selectionMode}>
          <calcite-combobox-item heading="one" selected value="one" />
          <calcite-combobox-item heading="two" value="two" />
          <calcite-combobox-item heading="three" value="three" />
        </calcite-combobox>
      );
    }

    async function assertValueClearing(
      selectionMode: SelectionMode,
      clearDisabled: boolean,
      mode: "mouse" | "keyboard",
      expectedBehavior: "clear" | "no-clear",
    ): Promise<void> {
      const { el } = await mount<Combobox>(() => renderCombobox(selectionMode, clearDisabled));

      const initialValue = el.value;
      if (Array.isArray(initialValue)) {
        expect(initialValue.length).toBeGreaterThan(0);
      } else {
        expect(initialValue).not.toBe("");
      }

      if (mode === "mouse") {
        const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);

        if (expectedBehavior === "clear") {
          await expect.element(clearButton).toBeInTheDocument();
          await userEvent.click(clearButton);
        } else {
          await expect.element(clearButton).not.toBeInTheDocument();
        }
      } else {
        const combobox = page.getBySelector("calcite-combobox");
        const input = page.getBySelector("calcite-combobox input");
        const changeHandler = vi.fn();
        combobox.element().addEventListener("calciteComboboxChange", changeHandler);
        const keyDownHandler = vi.fn();
        el.addEventListener("keydown", keyDownHandler);

        await expect.element(combobox).toBeInTheDocument();
        await expect.element(input).toBeInTheDocument();

        await userEvent.keyboard("{Tab}{Escape}");

        if (expectedBehavior === "clear") {
          expect(changeHandler).toHaveBeenCalled();
          expect(keyDownHandler.mock.lastCall![0]).toHaveProperty("defaultPrevented", true);
        } else {
          expect(changeHandler).not.toHaveBeenCalled();
          expect(keyDownHandler.mock.lastCall![0]).toHaveProperty("defaultPrevented", false);
        }
      }

      if (expectedBehavior === "clear") {
        expect(el.value).toBe("");
      } else {
        expect(el.value).toEqual(initialValue);
      }
    }

    describe("enabled", () => {
      describe("via mouse", () => {
        selectionModes.forEach((selectionMode) => {
          if (selectionMode === "single-persist") {
            it(`does not clear the value in ${selectionMode}-selection mode`, () =>
              assertValueClearing(selectionMode, false, "mouse", "no-clear"));
          } else {
            it(`clears the value in ${selectionMode}-selection mode`, () =>
              assertValueClearing(selectionMode, false, "mouse", "clear"));
          }
        });
      });

      describe("via keyboard", () => {
        selectionModes.forEach((selectionMode) => {
          if (selectionMode === "single-persist") {
            it(`does not clear the value in ${selectionMode}-selection mode`, () =>
              assertValueClearing(selectionMode, false, "keyboard", "no-clear"));
          } else {
            it(`clears the value in ${selectionMode}-selection mode`, () =>
              assertValueClearing(selectionMode, false, "keyboard", "clear"));
          }
        });
      });
    });

    describe("disabled", () => {
      describe("via mouse", () => {
        selectionModes.forEach((selectionMode) => {
          it(`does not clear the value in ${selectionMode}-selection mode`, () =>
            assertValueClearing(selectionMode, true, "mouse", "no-clear"));
        });
      });

      describe("via keyboard", () => {
        test.for(selectionModes)("does not clear the value in %s selection mode", (selectionMode) =>
          assertValueClearing(selectionMode, true, "keyboard", "no-clear"),
        );
      });
    });
  });
});

describe("keyboard interaction", () => {
  it(`remains focused after toggling`, async () => {
    const { el } = await mount<Combobox>(() => (
      <calcite-combobox>
        <calcite-combobox-item value="one" />
      </calcite-combobox>
    ));
    const floatingUI = await page.getBySelector(`calcite-combobox .${CSS.floatingUIContainer}`);
    const keyDownHandler = vi.fn();
    el.addEventListener("keydown", keyDownHandler);
    const openEvent = waitForEvent(el, "calciteComboboxOpen");

    await userEvent.keyboard("{Tab}{Escape}");

    expect(keyDownHandler.mock.lastCall![0]).toHaveProperty("defaultPrevented", false);

    await userEvent.keyboard("{Space}");
    await openEvent;

    await expect.element(floatingUI).toBeVisible();

    const closeEvent = waitForEvent(el, "calciteComboboxClose");
    await userEvent.keyboard("{Escape}");
    await closeEvent;

    await expect.element(floatingUI).not.toBeVisible();
    await expect.element(el).toHaveFocus();
    expect(keyDownHandler.mock.lastCall![0]).toHaveProperty("defaultPrevented", true);
  });

  it("Escape close + Space reopen keeps Select All active after toggling selection", async () => {
    await mount<Combobox>(() => (
      <calcite-combobox select-all-enabled selection-mode="multiple">
        <calcite-combobox-item heading="one" id="one" value="one" />
        <calcite-combobox-item heading="two" id="two" value="two" />
        <calcite-combobox-item heading="three" id="three" value="three" />
      </calcite-combobox>
    ));

    const floatingUI = page.getBySelector(`calcite-combobox .${CSS.floatingUIContainer}`);
    await userEvent.keyboard("{Tab}{Space}");
    await expect.element(floatingUI).toBeVisible();

    let activeItem = page.getBySelector("calcite-combobox-item[active]");
    await expect.element(activeItem).toHaveProperty("label", "Select all");

    await userEvent.keyboard("{Enter}");

    await expect.element(page.getBySelector("#one")).toHaveProperty("selected", true);
    await expect.element(page.getBySelector("#two")).toHaveProperty("selected", true);
    await expect.element(page.getBySelector("#three")).toHaveProperty("selected", true);

    await userEvent.keyboard("{Escape}");
    await expect.element(floatingUI).not.toBeVisible();

    await userEvent.keyboard("{Space}");
    await expect.element(floatingUI).toBeVisible();

    activeItem = page.getBySelector("calcite-combobox-item[active]");
    await expect.element(activeItem).toHaveProperty("label", "Select all");

    await userEvent.keyboard("{Enter}");

    await expect.element(page.getBySelector("#one")).toHaveProperty("selected", false);
    await expect.element(page.getBySelector("#two")).toHaveProperty("selected", false);
    await expect.element(page.getBySelector("#three")).toHaveProperty("selected", false);
  });

  it("Escape close + Space reopen keeps long-list scroll location and active item", async () => {
    const items = Array.from({ length: 60 }, (_, i) => (
      <calcite-combobox-item
        heading={`item-${i + 1}`}
        id={`item-${i + 1}`}
        value={`item-${i + 1}`}
      />
    ));

    await mount<Combobox>(() => (
      <calcite-combobox selection-mode="multiple">{items}</calcite-combobox>
    ));

    const floatingUI = page.getBySelector(`calcite-combobox .${CSS.floatingUIContainer}`);
    await userEvent.keyboard("{Tab}{Space}");
    await expect.element(floatingUI).toBeVisible();

    for (let i = 0; i < 30; i++) {
      await userEvent.keyboard("{ArrowDown}");
    }

    const listContainer = page
      .getBySelector(`calcite-combobox .${CSS.listContainer}`)
      .element() as HTMLDivElement;
    const activeValueBeforeClose = (
      page.getBySelector("calcite-combobox-item[active]").element() as ComboboxItem["el"]
    ).value;
    const scrollTopBeforeClose = listContainer.scrollTop;

    expect(scrollTopBeforeClose).toBeGreaterThan(0);

    const activeValueAfterReopen = (
      page.getBySelector("calcite-combobox-item[active]").element() as ComboboxItem["el"]
    ).value;
    const scrollTopAfterReopen = listContainer.scrollTop;

    expect(activeValueAfterReopen).toBe(activeValueBeforeClose);
    expect(Math.abs(scrollTopAfterReopen - scrollTopBeforeClose)).toBeLessThanOrEqual(1);
  });
});
