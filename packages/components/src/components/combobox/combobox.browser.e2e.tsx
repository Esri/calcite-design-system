import { Fragment, h, JsxNode } from "@arcgis/lumina";
import { describe, expect, it, test, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { Locator, page, userEvent } from "vitest/browser";
import { commands } from "../../tests/browser/commands";
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
  scalePropagates,
  t9n,
  themed,
  topLayer,
  accessible,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { defaultMenuPlacement } from "../../utils/floating-ui";
import { DEBOUNCE } from "../../utils/resources";
import { waitForEvent } from "../../tests/commonTests/browser/utils";
import type { ComboboxItem } from "../combobox-item/combobox-item";
import { CSS as ClearButtonCSS } from "../functional/ClearButton";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import { CSS } from "./resources";
import type { Combobox } from "./combobox";

mockConsole();

describe("accessible", () => {
  describe("default", () => {
    accessible(() =>
      mount(
        <calcite-combobox label="Trees" value="Trees">
          <calcite-combobox-item heading="Pine" value="Pine" />
        </calcite-combobox>,
      ),
    );
  });

  describe("with item group", () => {
    accessible(() =>
      mount(
        <calcite-combobox label="Trees" value="Trees">
          <calcite-combobox-item-group label="Conifers">
            <calcite-combobox-item heading="Pine" value="Pine" />
          </calcite-combobox-item-group>
        </calcite-combobox>,
      ),
    );
  });

  // depends on https://github.com/dequelabs/axe-core/issues/4943 to properly resolve accessible labels
  describe.skip("with open selected items", () => {
    accessible(() =>
      mount(
        <calcite-combobox label="Trees" open value="Trees">
          <calcite-combobox-item-group label="Conifers">
            <calcite-combobox-item heading="Pine" selected value="Pine" />
            <calcite-combobox-item heading="Spruce" selected value="Spruce" />
          </calcite-combobox-item-group>
        </calcite-combobox>,
      ),
    );
  });

  describe("with highlight selection appearance", () => {
    accessible(() =>
      mount(
        <calcite-combobox label="Trees" selection-appearance="highlight">
          <calcite-combobox-item heading="Pine" value="Pine" />
          <calcite-combobox-item heading="Spruce" value="Spruce" />
          <calcite-combobox-item heading="Fir" value="Fir" />
        </calcite-combobox>,
      ),
    );
  });
});

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

describe("propagates", () => {
  scalePropagates(
    (mountOptions) =>
      mount(
        <calcite-combobox>
          <calcite-combobox-item-group>
            <calcite-combobox-item value="item" />
          </calcite-combobox-item-group>
        </calcite-combobox>,
        mountOptions,
      ),
    { targetSelector: "calcite-combobox-item, calcite-combobox-item-group" },
  );
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
      mount<Combobox>(
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

  it("renders compact indicator chip count for fit display with long placeholder", async () => {
    await mount<Combobox>(
      <calcite-combobox
        placeholder="this is an unusually long string of placeholder text"
        selection-display="fit"
        selection-mode="multiple"
        style="width: 240px;"
      >
        <calcite-combobox-item heading="Very long selected item one" selected />
        <calcite-combobox-item heading="Very long selected item two" selected />
        <calcite-combobox-item disabled heading="Very long selected item three" selected />
      </calcite-combobox>,
    );

    const selectedChipCount = page.getByTestId("selected-chip-count");

    await expect.element(selectedChipCount).toHaveProperty("label", "3");
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

  it("should not select children when parent is selected in ancestor selection mode", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox selection-mode="ancestors">
        <calcite-combobox-item heading="parent" value="parent">
          <calcite-combobox-item heading="child1" value="child1" />
          <calcite-combobox-item heading="child2" value="child2" />
        </calcite-combobox-item>
      </calcite-combobox>,
    );

    const parent = page.getBySelector("calcite-combobox-item[value=parent]");
    const child1 = page.getBySelector("calcite-combobox-item[value=child1]");
    const child2 = page.getBySelector("calcite-combobox-item[value=child2]");

    const openEvent = waitForEvent(el, "calciteComboboxOpen");
    await userEvent.click(el);
    await openEvent;
    await userEvent.click(parent.getByText("parent"));

    const chips = page.getBySelector("calcite-chip");
    expect(chips).toHaveLength(1);
    await expect.element(parent).toHaveProperty("selected", true);
    await expect.element(child1).toHaveProperty("selected", false);
    await expect.element(child2).toHaveProperty("selected", false);
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
    expect(el.value).toEqual("K");
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

    const items = page.getBySelector("calcite-combobox-item");
    const chips = page.getBySelector("calcite-chip");

    expect(el.selectedItems.map((item) => item.value)).toEqual(["K"]);
    expect(el.value).toEqual("K");
    expect(comboboxChangeHandler).toHaveBeenCalledTimes(1);

    expect(items).toHaveLength(4);
    await expect.element(items.nth(0)).toHaveProperty("heading", "K");
    await expect.element(items.nth(0)).toHaveProperty("selected", true);
    await expect.element(items.nth(1)).toHaveProperty("selected", false);
    await expect.element(items.nth(2)).toHaveProperty("selected", false);
    await expect.element(items.nth(3)).toHaveProperty("selected", false);

    expect(chips).toHaveLength(0);
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

    const items = page.getBySelector("calcite-combobox-item");
    const chips = page.getBySelector("calcite-chip");

    expect(el.selectedItems.map((item) => item.value)).toEqual(["one", "two", "K"]);
    expect(el.value).toEqual(["one", "two", "K"]);
    expect(comboboxChangeHandler).toHaveBeenCalledTimes(1);

    expect(items).toHaveLength(4);
    await expect.element(items.nth(0)).toHaveProperty("heading", "K");
    await expect.element(items.nth(0)).toHaveProperty("selected", true);
    await expect.element(items.nth(1)).toHaveProperty("selected", true);
    await expect.element(items.nth(2)).toHaveProperty("selected", true);
    await expect.element(items.nth(3)).toHaveProperty("selected", false);

    expect(chips).toHaveLength(3);
    await expect.element(chips.nth(0)).toHaveTextContent("one");
    await expect.element(chips.nth(1)).toHaveTextContent("two");
    await expect.element(chips.nth(2)).toHaveTextContent("K");
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
      const secondSelectedItem = page
        .getBySelector("calcite-combobox-item")
        .filter({ hasText: "Rocks" });

      await expect.element(firstSelectedItem).toBeInViewport();
      await expect.element(firstSelectedItem).toHaveProperty("selected", true);

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
    await mount<Combobox>(() => (
      <calcite-combobox selection-mode="multiple">
        {Array.from({ length: 60 }, (_, i) => (
          <calcite-combobox-item heading={`item-${i + 1}`} />
        ))}
      </calcite-combobox>
    ));

    const floatingUI = page.getBySelector(`calcite-combobox .${CSS.floatingUIContainer}`);
    await userEvent.keyboard("{Tab}{Space}");
    await expect.element(floatingUI).toBeVisible();

    await userEvent.keyboard("{ArrowDown>30}");

    const listContainer = page
      .getBySelector(`calcite-combobox .${CSS.listContainer}`)
      .element() as HTMLDivElement;
    const activeItem = page.getBySelector("calcite-combobox-item[active]");
    const activeValueBeforeClose = (activeItem.element() as ComboboxItem["el"]).value;
    const scrollTopBeforeClose = listContainer.scrollTop;

    expect(scrollTopBeforeClose).toBeGreaterThan(0);

    await userEvent.keyboard("{Escape}");
    await expect.element(floatingUI).not.toBeVisible();

    await userEvent.keyboard("{Space}");
    await expect.element(floatingUI).toBeVisible();

    const activeValueAfterReopen = (activeItem.element() as ComboboxItem["el"]).value;
    const scrollTopAfterReopen = listContainer.scrollTop;

    expect(activeValueAfterReopen).toBe(activeValueBeforeClose);
    expect(Math.abs(scrollTopAfterReopen - scrollTopBeforeClose)).toBeLessThanOrEqual(1);
  });
});

describe("filtering", () => {
  type FilterUpdate = {
    type: "keyboard" | "property";

    /**
     * For `keyboard`, keys to type into the combobox input.
     * For `property`, the value assigned to `combobox.filterText`.
     */
    value: string;
  };

  async function updateFilter(
    combobox: Combobox["el"],
    update: FilterUpdate,
    waitForFilterChange = true,
  ): Promise<void> {
    if (update.type === "keyboard") {
      await (update.value
        ? userEvent.keyboard(update.value)
        : userEvent.clear(page.elementLocator(combobox).getByRole("combobox")));
    } else {
      combobox.filterText = update.value;
    }

    if (waitForFilterChange) {
      await waitForEvent(combobox, "calciteComboboxFilterChange");
    }
  }

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
    await vi.waitFor(() => {
      expect(el.filteredItems).toHaveLength(0);
    });
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
      await updateFilter(combobox, { type: "keyboard", value: text });
    }
  });

  it("should toggle the combobox when typing within the input", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox>
        <calcite-combobox-item heading="Raising Arizona" value="Raising Arizona" />
        <calcite-combobox-item heading="Miller's Crossing" value="Miller's Crossing" />
        <calcite-combobox-item heading="The Hudsucker Proxy" value="The Hudsucker Proxy" />
        <calcite-combobox-item heading="Inside Llewyn Davis" value="Inside Llewyn Davis" />
      </calcite-combobox>,
    );

    await el.setFocus();
    expect(el).toHaveProperty("open", false);

    const text = "Arizona";

    const openEvent = waitForEvent(el, "calciteComboboxOpen");
    await updateFilter(el, { type: "keyboard", value: text });
    await openEvent;

    expect(el).toHaveProperty("open", true);

    const closeEvent = waitForEvent(el, "calciteComboboxClose");
    await updateFilter(el, {
      type: "keyboard",
      value: "",
    });
    await closeEvent;
    expect(el).toHaveProperty("open", false);
  });

  it("should open the combobox and show the no matches placeholder when typing yields no results", async () => {
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

    await updateFilter(el, { type: "keyboard", value: text });

    expect(el).toHaveProperty("open", true);
    await expect
      .element(page.getBySelector(`calcite-combobox li.${CSS.noMatchesPlaceholder}`))
      .toBeVisible();
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
    await updateFilter(el, { type: "keyboard", value: "undefined" });

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
    await updateFilter(el, { type: "keyboard", value: "Algeria" });

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
    await updateFilter(el, { type: "keyboard", value: "two" });

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

    const visibleItemsAndGroups = page.getBySelector(
      "calcite-combobox-item:not([item-hidden]), calcite-combobox-item-group:not([item-hidden])",
    );
    const expectedVisibleItemAndGroupIds = [
      "group-1",
      "item-1-2",
      "subgroup-1-1",
      "subgroup-1-1-2",
      "item-1-1-2-1",
      "item-1-1-2-2",
      "group-2",
      "item-2-1",
      "item-2-1-2",
    ];

    await vi.waitFor(() => {
      const visibleItemAndGroupIds = visibleItemsAndGroups.elements().map((item) => item.id);
      expect(visibleItemAndGroupIds).toEqual(expectedVisibleItemAndGroupIds);
    });
  });

  it("should display all groups/items when filter is cleared", async () => {
    const { el } = await mount<Combobox>(
      <calcite-combobox>{renderNestedComboboxChildren()}</calcite-combobox>,
    );

    await updateFilter(el, { type: "property", value: "1.2" });

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

    await updateFilter(el, { type: "property", value: "" });

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

    await updateFilter(el, { type: "property", value: "foo" });

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
    await updateFilter(el, { type: "keyboard", value: "group" });

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

    await updateFilter(el, { type: "keyboard", value: "1" });

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
    await updateFilter(el, { type: "keyboard", value: "an" });

    await expect.element(items.nth(0)).not.toBeVisible();
    await expect.element(items.nth(1)).not.toBeVisible();
    await expect.element(items.nth(2)).toBeVisible();

    await updateFilter(el, { type: "keyboard", value: "m" });

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
    await vi.waitFor(() => {
      expect(el.filteredItems).toHaveLength(1);
    });

    const visibleItems = page.getBySelector(
      "calcite-combobox-item:not([hidden]):not([item-hidden])",
    );

    expect(visibleItems.elements().map((item) => item.id)).toEqual(["description-match"]);
  });
});

describe("theme", () => {
  describe("default", () => {
    const comboboxHTML = (
      <calcite-combobox label="test" max-items="6" open>
        <calcite-combobox-item-group label="Trees">
          <calcite-combobox-item heading="Pine" value="Pine">
            <calcite-combobox-item heading="Pine Nested" value="Pine Nested" />
          </calcite-combobox-item>
        </calcite-combobox-item-group>
        <calcite-combobox-item disabled heading="Sequoia" value="Sequoia" />
        <calcite-combobox-item heading="Douglas Fir" selected value="Douglas Fir" />
      </calcite-combobox>
    );

    themed(() => mount(comboboxHTML), {
      "--calcite-combobox-input-height": {
        shadowSelector: `.${CSS.input}`,
        selector: "calcite-combobox",
        targetProp: "height",
      },
      "--calcite-combobox-input-background-color": {
        shadowSelector: `.${CSS.wrapper}`,
        selector: "calcite-combobox",
        targetProp: "backgroundColor",
      },
      "--calcite-combobox-input-border-color": {
        shadowSelector: `.${CSS.wrapper}`,
        selector: "calcite-combobox",
        targetProp: "borderColor",
      },
      "--calcite-combobox-input-text-color": {
        shadowSelector: `.${CSS.wrapper}`,
        selector: "calcite-combobox",
        targetProp: "color",
      },
      "--calcite-combobox-icon-color": {
        shadowSelector: `.${CSS.icon}`,
        selector: "calcite-combobox",
        targetProp: "color",
      },
      "--calcite-combobox-icon-color-hover": {
        shadowSelector: `.${CSS.icon}`,
        selector: "calcite-combobox",
        targetProp: "color",
        state: "hover",
      },
      "--calcite-combobox-background-color": {
        shadowSelector: `.${CSS.listContainer}`,
        selector: "calcite-combobox",
        targetProp: "backgroundColor",
      },
      "--calcite-combobox-item-group-text-color": {
        selector: "calcite-combobox-item-group",
        shadowSelector: ".title",
        targetProp: "color",
      },
    });
  });

  describe("placeholder icon", () => {
    const comboboxWithPlaceHolderIconHTML = (
      <calcite-combobox label="test" placeholder="select element" placeholder-icon="layers">
        <calcite-combobox-item heading="Trees" value="Trees" />
        <calcite-combobox-item disabled heading="Sequoia" value="Sequoia" />
        <calcite-combobox-item heading="Douglas Fir" value="Douglas Fir" />
      </calcite-combobox>
    );

    themed(() => mount(comboboxWithPlaceHolderIconHTML), {
      "--calcite-combobox-icon-color": {
        shadowSelector: `.${CSS.placeholderIcon}`,
        selector: "calcite-combobox",
        targetProp: "color",
      },
    });
  });

  describe("single select", () => {
    const singleSelectComboboxHTML = (
      <calcite-combobox label="test" selection-mode="single">
        <calcite-combobox-item heading="Trees" value="Trees" />
        <calcite-combobox-item disabled heading="Sequoia" value="Sequoia" />
        <calcite-combobox-item heading="Douglas Fir" selected value="Douglas Fir" />
      </calcite-combobox>
    );

    themed(() => mount(singleSelectComboboxHTML), {
      "--calcite-combobox-input-text-color": {
        shadowSelector: `.${CSS.wrapper}`,
        selector: "calcite-combobox",
        targetProp: "color",
      },
    });
  });

  const comboboxSelectAllEnabledHTML = (
    <calcite-combobox select-all-enabled>
      <calcite-combobox-item heading="Pine" value="Pine" />
      <calcite-combobox-item heading="Not Pine" value="Not Pine" />
    </calcite-combobox>
  );

  describe("select-all-enabled", () => {
    themed(() => mount(comboboxSelectAllEnabledHTML), {
      "--calcite-combobox-divider-color": {
        shadowSelector: `.${CSS.selectAll}`,
        targetProp: "borderBlockEndColor",
      },
    });
  });

  describe("deprecated", () => {
    themed(() => mount(comboboxSelectAllEnabledHTML), {
      "--calcite-combobox-item-border-color": {
        shadowSelector: `.${CSS.selectAll}`,
        targetProp: "borderBlockEndColor",
      },
    });
  });

  describe("no-matches", () => {
    themed(
      async () => {
        const rendered = await mount<Combobox>(
          <calcite-combobox allow-custom-values open>
            <calcite-combobox-item heading="Pine" value="Pine" />
            <calcite-combobox-item heading="Maple" value="Maple" />
          </calcite-combobox>,
        );

        rendered.el.filterText = "Oak";
        await rendered.component.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.filter));

        return rendered;
      },
      {
        "--calcite-combobox-background-color": {
          shadowSelector: `.${CSS.noMatches}`,
          targetProp: "backgroundColor",
        },
        "--calcite-combobox-input-text-color": {
          shadowSelector: `.${CSS.noMatches} >>> mark`,
          targetProp: "color",
        },
      },
    );
  });

  describe("groups", () => {
    const comboboxGroupHTML = (
      <calcite-combobox label="test" placeholder="placeholder">
        <calcite-combobox-item-group label="Parent group">
          <calcite-combobox-item heading="group item 1" value="group item 1" />
          <calcite-combobox-item heading="group item 2" value="group item 2" />
          <calcite-combobox-item heading="group item 3" value="group item 3" />
          <calcite-combobox-item-group label="Nested group">
            <calcite-combobox-item heading="group item 4" value="group item 4" />
            <calcite-combobox-item heading="group item 5" value="group item 5" />
            <calcite-combobox-item heading="group item 6" value="group item 6" />
          </calcite-combobox-item-group>
        </calcite-combobox-item-group>
      </calcite-combobox>
    );

    themed(() => mount(comboboxGroupHTML), {
      "--calcite-combobox-item-group-border-color": {
        selector: "calcite-combobox-item-group",
        shadowSelector: ".separator",
        targetProp: "backgroundColor",
      },
    });
  });
});
