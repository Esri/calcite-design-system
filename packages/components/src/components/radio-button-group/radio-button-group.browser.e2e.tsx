import { Fragment, h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";

import {
  accessible,
  defaults,
  focusable,
  hidden,
  internalLabel,
  reflects,
  renders,
  scalePropagates,
  t9n,
  themed,
} from "../../tests/common";
import type { RadioButton } from "../radio-button/radio-button";
import type { RadioButtonGroup } from "./radio-button-group";
import { CSS } from "./resources";

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-radio-button-group>
        <calcite-label>
          <calcite-radio-button />
          Label
        </calcite-label>
      </calcite-radio-button-group>,
    ),
  );
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-radio-button-group"),
    [
      { propertyName: "layout", defaultValue: "horizontal" },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "status", defaultValue: "idle" },
      { propertyName: "validationIcon", defaultValue: undefined },
      { propertyName: "validationMessage", defaultValue: undefined },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-radio-button-group"),
    [
      { propertyName: "disabled", value: true },
      { propertyName: "hidden", value: true },
      { propertyName: "layout", value: "horizontal" },
      { propertyName: "name", value: "reflects-name" },
      { propertyName: "required", value: true },
      { propertyName: "scale", value: "m" },
      { propertyName: "status", value: "invalid" },
      { propertyName: "validationIcon", value: true },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-radio-button-group"));

  it("honors hidden attribute when navigating", async () => {
    const { container } = await mount<RadioButtonGroup>(
      <>
        <calcite-radio-button-group name="first">
          <calcite-label>
            1-1
            <calcite-radio-button value="first" />
          </calcite-label>
          <calcite-label>
            1-2
            <calcite-radio-button value="second" />
          </calcite-label>
          <calcite-label>
            1-3
            <calcite-radio-button value="third" />
          </calcite-label>
        </calcite-radio-button-group>
        <calcite-radio-button-group hidden name="second">
          <calcite-label>
            2-1
            <calcite-radio-button value="first" />
          </calcite-label>
          <calcite-label>
            2-2
            <calcite-radio-button value="second" />
          </calcite-label>
          <calcite-label>
            2-3
            <calcite-radio-button value="third" />
          </calcite-label>
        </calcite-radio-button-group>
        <calcite-radio-button-group name="third">
          <calcite-label>
            3-1
            <calcite-radio-button value="first" />
          </calcite-label>
          <calcite-label>
            3-2
            <calcite-radio-button value="second" />
          </calcite-label>
          <calcite-label>
            3-3
            <calcite-radio-button value="third" />
          </calcite-label>
        </calcite-radio-button-group>
      </>,
    );

    const firstElement = container.querySelector("calcite-radio-button")!;
    await userEvent.click(firstElement);
    await userEvent.tab();

    const selected = container.querySelector<RadioButton["el"]>("calcite-radio-button[focused]")!;
    const { name, value } = selected;

    expect(name).toBe("third");
    expect(value).toBe("first");
  });
});

describe("propagates", () => {
  scalePropagates(
    (mountOptions) =>
      mount(
        <calcite-radio-button-group>
          <calcite-label>
            <calcite-radio-button />
          </calcite-label>
          <calcite-label>
            <calcite-radio-button />
          </calcite-label>
        </calcite-radio-button-group>,
        mountOptions,
      ),
    { targetSelector: "calcite-radio-button" },
  );
});

describe("internal label", () => {
  internalLabel(() => mount(`calcite-radio-button-group`));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-radio-button-group>
          <calcite-label>
            <calcite-radio-button value="one" />
            One
          </calcite-label>
        </calcite-radio-button-group>,
      ),
    { display: "flex" },
  );
});

describe("is focusable", () => {
  focusable(
    () =>
      mount(
        <calcite-radio-button-group layout="vertical" name="Options">
          <calcite-label layout="inline">
            <calcite-radio-button disabled value="flowers" />
            Flowers
          </calcite-label>
          <calcite-label layout="inline">
            <calcite-radio-button value="trees" />
            Trees
          </calcite-label>
        </calcite-radio-button-group>,
      ),
    { focusTargetSelector: "calcite-radio-button" },
  );
});

describe("translation support", () => {
  t9n(() => mount("calcite-radio-button-group"));
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-radio-button-group"), {
      "--calcite-radio-button-group-gap": {
        targetProp: "columnGap",
        shadowSelector: `.${CSS.itemWrapper}`,
      },
    });
  });
  describe("validation", () => {
    themed(() => mount(<calcite-radio-button-group status="invalid" validation-message="help" />), {
      "--calcite-radio-button-input-message-spacing": {
        targetProp: "--calcite-input-message-spacing",
        shadowSelector: "calcite-input-message",
      },
    });
  });
});

it("does not require an item to be checked", async () => {
  await mount<RadioButtonGroup>(
    <calcite-radio-button-group name="none-checked">
      <calcite-label>
        1
        <calcite-radio-button value="1" />
      </calcite-label>
      <calcite-label>
        2
        <calcite-radio-button value="2" />
      </calcite-label>
      <calcite-label>
        3
        <calcite-radio-button value="3" />
      </calcite-label>
    </calcite-radio-button-group>,
  );
  const radioButtons = page.getBySelector("calcite-radio-button");

  expect(radioButtons).toHaveLength(3);

  for (let i = 0; i < radioButtons.length; i++) {
    await expect.element(radioButtons.nth(i)).toHaveProperty("checked", false);
  }
});

it("when multiple items are checked, last one wins", async () => {
  await mount<RadioButtonGroup>(
    <calcite-radio-button-group name="multiple-checked">
      <calcite-label>
        1
        <calcite-radio-button checked value="1" />
      </calcite-label>
      <calcite-label>
        2
        <calcite-radio-button checked value="2" />
      </calcite-label>
      <calcite-label>
        3
        <calcite-radio-button checked value="3" />
      </calcite-label>
    </calcite-radio-button-group>,
  );
  const selected = page.getBySelector("calcite-radio-button[checked]");

  expect(selected).toHaveLength(1);
  await expect.element(selected).toHaveValue("3");
});

it("selects item with left and arrow keys", async () => {
  await mount(
    <calcite-radio-button-group name="keyboard">
      <calcite-label>
        1
        <calcite-radio-button checked value="1" />
      </calcite-label>
      <calcite-label>
        2
        <calcite-radio-button value="2" />
      </calcite-label>
      <calcite-label>
        3
        <calcite-radio-button value="3" />
      </calcite-label>
    </calcite-radio-button-group>,
  );
  const selected = page.getBySelector("calcite-radio-button[checked]");

  await selected.click();
  await userEvent.keyboard("{ArrowRight}");

  await expect.element(selected).toHaveValue("2");

  await userEvent.keyboard("{ArrowRight}");
  await expect.element(selected).toHaveValue("3");

  await userEvent.keyboard("{ArrowRight}");
  await expect.element(selected).toHaveValue("1");

  await userEvent.keyboard("{ArrowLeft}");
  await expect.element(selected).toHaveValue("3");

  await userEvent.keyboard("{ArrowLeft}");
  await expect.element(selected).toHaveValue("2");

  await userEvent.keyboard("{ArrowLeft}");
  await expect.element(selected).toHaveValue("1");
});

it("selects item with up and down keys", async () => {
  await mount(
    <calcite-radio-button-group name="up-down-keys">
      <calcite-label>
        1
        <calcite-radio-button checked value="1" />
      </calcite-label>
      <calcite-label>
        2
        <calcite-radio-button value="2" />
      </calcite-label>
      <calcite-label>
        3
        <calcite-radio-button value="3" />
      </calcite-label>
    </calcite-radio-button-group>,
  );
  const selected = page.getBySelector("calcite-radio-button[checked]");

  await selected.click();
  await userEvent.keyboard("{ArrowDown}");
  await expect.element(selected).toHaveValue("2");

  await userEvent.keyboard("{ArrowDown}");
  await expect.element(selected).toHaveValue("3");

  await userEvent.keyboard("{ArrowDown}");
  await expect.element(selected).toHaveValue("1");

  await userEvent.keyboard("{ArrowUp}");
  await expect.element(selected).toHaveValue("3");

  await userEvent.keyboard("{ArrowUp}");
  await expect.element(selected).toHaveValue("2");

  await userEvent.keyboard("{ArrowUp}");
  await expect.element(selected).toHaveValue("1");
});

it("clicking a radio updates its checked status", async () => {
  await mount(
    <calcite-radio-button-group name="radio">
      <calcite-label>
        1
        <calcite-radio-button checked data-testid="first" value="one" />
      </calcite-label>
      <calcite-label>
        2
        <calcite-radio-button data-testid="second" value="two" />
      </calcite-label>
    </calcite-radio-button-group>,
  );
  const first = page.getByTestId("first");
  const second = page.getByTestId("second");

  await second.click();

  await expect.element(first).toHaveProperty("checked", false);
  await expect.element(second).toHaveProperty("checked", true);

  await first.click();

  await expect.element(first).toHaveProperty("checked", true);
  await expect.element(second).toHaveProperty("checked", false);
});

it("clicking outside of radio button or label text won't update checked status", async () => {
  await mount(
    <calcite-radio-button-group layout="vertical" name="radio">
      <calcite-label>
        1
        <calcite-radio-button data-testid="first" value="one" />
      </calcite-label>
      <calcite-label>
        2
        <calcite-radio-button checked data-testid="second" value="two" />
      </calcite-label>
    </calcite-radio-button-group>,
  );
  const first = page.getByTestId("first");
  const second = page.getByTestId("second");

  await userEvent.click(document.body, { position: { x: -1, y: -1 } });

  await expect.element(first).toHaveProperty("checked", false);
  await expect.element(second).toHaveProperty("checked", true);

  await userEvent.click(document.body, { position: { x: 10, y: 10 } });

  await expect.element(first).toHaveProperty("checked", true);
  await expect.element(second).toHaveProperty("checked", false);
});

it("programmatically checking a radio button updates the group's state correctly", async () => {
  const { reRender } = await mount(
    <calcite-radio-button-group name="radio">
      <calcite-label>
        1
        <calcite-radio-button checked data-testid="first" value="one" />
      </calcite-label>
      <calcite-label>
        2
        <calcite-radio-button data-testid="second" value="two" />
      </calcite-label>
      <calcite-label>
        3
        <calcite-radio-button data-testid="third" value="three" />
      </calcite-label>
    </calcite-radio-button-group>,
  );
  const second = page.getByTestId("second");
  const selected = page.getBySelector("calcite-radio-button[checked]");

  (second.element() as RadioButton["el"]).checked = true;
  await reRender();

  expect(selected).toHaveLength(1);
  await expect.element(selected).toHaveValue("two");
});

it("programmatically un-checking a radio button updates the group's state correctly", async () => {
  const { reRender } = await mount(
    <calcite-radio-button-group name="radio">
      <calcite-label>
        1
        <calcite-radio-button checked data-testid="first" value="one" />
      </calcite-label>
      <calcite-label>
        2
        <calcite-radio-button data-testid="second" value="two" />
      </calcite-label>
      <calcite-label>
        3
        <calcite-radio-button data-testid="third" value="three" />
      </calcite-label>
    </calcite-radio-button-group>,
  );
  const selected = page.getBySelector("calcite-radio-button[checked]");

  (selected.element() as RadioButton["el"]).checked = false;
  await reRender();

  expect(selected).toHaveLength(0);
});

it(`has a role of 'radiogroup'`, async () => {
  const { el } = await mount("calcite-radio-button-group");

  await expect.element(el).toHaveRole("radiogroup");
});

it("radio-buttons receive necessary props", async () => {
  await mount(
    <calcite-radio-button-group name="radio">
      <calcite-label>
        1
        <calcite-radio-button checked data-testid="first" value="one" />
      </calcite-label>
      <calcite-label>
        2
        <calcite-radio-button value="two" />
      </calcite-label>
    </calcite-radio-button-group>,
  );
  const radio = page.getByTestId("first");

  await expect.element(radio).toHaveProperty("name", "radio");
  await expect.element(radio).toHaveProperty("scale", "m");
  await expect.element(radio).toHaveProperty("required", false);
});

it("appropriately triggers the custom change event", async () => {
  const changeHandler = vi.fn();
  const { el } = await mount<RadioButtonGroup>(
    <calcite-radio-button-group name="changeEvent" oncalciteRadioButtonGroupChange={changeHandler}>
      <calcite-label>
        1
        <calcite-radio-button checked value="one" />
      </calcite-label>
      <calcite-label>
        2
        <calcite-radio-button value="two" />
      </calcite-label>
      <calcite-label>
        3
        <calcite-radio-button value="three" />
      </calcite-label>
    </calcite-radio-button-group>,
  );
  const radioButtons = page.getBySelector("calcite-radio-button");

  expect(changeHandler).toHaveBeenCalledTimes(0);

  await radioButtons.nth(0).click();
  expect(changeHandler).toHaveBeenCalledTimes(0);
  await expect.element(el).toHaveProperty("selectedItem.value", "one");

  await radioButtons.nth(1).click();
  expect(changeHandler).toHaveBeenCalledTimes(1);
  await expect.element(el).toHaveProperty("selectedItem.value", "two");

  await radioButtons.nth(2).click();
  expect(changeHandler).toHaveBeenCalledTimes(2);
  await expect.element(el).toHaveProperty("selectedItem.value", "three");
});

it("should focus the checked radio-button on setFocus()", async () => {
  const { el } = await mount<RadioButtonGroup>(
    <calcite-radio-button-group layout="vertical" name="Options">
      <calcite-label layout="inline">
        <calcite-radio-button data-testid="trees" disabled value="trees" />
        Trees
      </calcite-label>
      <calcite-label layout="inline">
        <calcite-radio-button data-testid="shrubs" value="shrubs" />
        Shrubs
      </calcite-label>
      <calcite-label layout="inline">
        <calcite-radio-button checked data-testid="flowers" value="flowers" />
        Flowers
      </calcite-label>
    </calcite-radio-button-group>,
  );
  const flowers = page.getByTestId("flowers");

  await el.setFocus();

  await expect.element(flowers).toHaveFocus();
});

it("should focus the first focusable radio-button on setFocus()", async () => {
  const { el } = await mount<RadioButtonGroup>(
    <calcite-radio-button-group layout="vertical" name="Options">
      <calcite-label layout="inline">
        <calcite-radio-button data-testid="trees" disabled value="trees" />
        Trees
      </calcite-label>
      <calcite-label layout="inline">
        <calcite-radio-button data-testid="shrubs" value="shrubs" />
        Shrubs
      </calcite-label>
      <calcite-label layout="inline">
        <calcite-radio-button data-testid="flowers" value="flowers" />
        Flowers
      </calcite-label>
    </calcite-radio-button-group>,
  );
  const shrubs = page.getByTestId("shrubs");

  await el.setFocus();

  await expect.element(shrubs).toHaveFocus();
});

it("syncs disabled states when toggling the group or an individual radio-button", async () => {
  const { el, reRender } = await mount<RadioButtonGroup>(
    <calcite-radio-button-group layout="vertical" name="Options">
      <calcite-label layout="inline">
        <calcite-radio-button data-testid="trees" value="trees" />
        Trees
      </calcite-label>
      <calcite-label layout="inline">
        <calcite-radio-button data-testid="shrubs" value="shrubs" />
        Shrubs
      </calcite-label>
    </calcite-radio-button-group>,
  );
  const trees = page.getByTestId("trees");
  const shrubs = page.getByTestId("shrubs");

  async function toggleGroup(): Promise<void> {
    el.disabled = !el.disabled;
    await reRender();
  }

  async function toggleIndividual(): Promise<void> {
    const radioButton = trees.element() as RadioButton["el"];
    radioButton.disabled = !radioButton.disabled;
    await reRender();
  }

  await toggleGroup();
  await expect.element(trees).toHaveProperty("disabled", true);
  await expect.element(shrubs).toHaveProperty("disabled", true);

  await toggleGroup();
  await expect.element(trees).toHaveProperty("disabled", false);
  await expect.element(shrubs).toHaveProperty("disabled", false);

  await toggleIndividual();
  await expect.element(trees).toHaveProperty("disabled", true);
  await expect.element(shrubs).toHaveProperty("disabled", false);

  await toggleIndividual();
  await expect.element(trees).toHaveProperty("disabled", false);
  await expect.element(shrubs).toHaveProperty("disabled", false);
});
