import { newE2EPage } from "@stencil/core/testing";
import {
  accessible,
  disabled,
  focusable,
  formAssociated,
  HYDRATED_ATTR,
  labelable,
  hidden,
  themed,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { Scale } from "../interfaces";
import { Direction } from "../../utils/dom";

describe("calcite-checkbox", () => {
  describe("honors hidden attribute", () => {
    hidden("calcite-checkbox");
  });

  describe("accessible", () => {
    accessible(
      `<calcite-label><calcite-checkbox id="example" name="example" value="one"></calcite-checkbox> label</calcite-label>`,
    );
  });

  describe("accessible without calcite-label", () => {
    accessible(`<calcite-checkbox label="label" id="example" name="example" value="one"></calcite-checkbox>`);
  });

  describe("labelable", () => {
    labelable("calcite-checkbox", { propertyToToggle: "checked", shadowFocusTargetSelector: ".toggle" });
  });

  describe("is form-associated", () => {
    formAssociated("calcite-checkbox", { testValue: true, inputType: "checkbox" });
  });

  describe("disabled", () => {
    disabled("calcite-checkbox");
  });

  it("renders with correct default attributes", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox></calcite-checkbox>");

    const calciteCheckbox = await page.find("calcite-checkbox");

    expect(calciteCheckbox).toHaveAttribute(HYDRATED_ATTR);
    expect(calciteCheckbox).not.toHaveAttribute("checked");
    expect(calciteCheckbox).not.toHaveAttribute("indeterminate");
  });

  it("toggles the checked attributes appropriately when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox></calcite-checkbox>");

    const calciteCheckbox = await page.find("calcite-checkbox");

    expect(calciteCheckbox).not.toHaveAttribute("checked");
    expect(await calciteCheckbox.getProperty("checked")).toBe(false);

    await calciteCheckbox.click();
    await page.waitForChanges();

    expect(calciteCheckbox).toHaveAttribute("checked");
    expect(await calciteCheckbox.getProperty("checked")).toBe(true);

    // helps test click behavior via HTMLElement.click()
    await calciteCheckbox.callMethod("click");
    await page.waitForChanges();

    expect(calciteCheckbox).not.toHaveAttribute("checked");
    expect(await calciteCheckbox.getProperty("checked")).toBe(false);
  });

  it("appropriately triggers the custom change event", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-checkbox></calcite-checkbox>`);

    const calciteCheckbox = await page.find("calcite-checkbox");

    const changeEvent = await calciteCheckbox.spyOnEvent("calciteCheckboxChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await calciteCheckbox.click();

    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("doesn't emit when controlling checked attribute", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox value='test-value'></calcite-checkbox>");
    const element = await page.find("calcite-checkbox");
    const spy = await element.spyOnEvent("calciteCheckboxChange");

    await element.setProperty("checked", true);
    await page.waitForChanges();
    await element.setProperty("checked", false);
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(0);
  });

  it("removes the indeterminate attribute when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox indeterminate></calcite-checkbox>");

    const calciteCheckbox = await page.find("calcite-checkbox");

    expect(calciteCheckbox).toHaveAttribute("indeterminate");

    await calciteCheckbox.click();

    expect(calciteCheckbox).not.toHaveAttribute("indeterminate");
  });

  it("behaves as expected when wrapped in a calcite-label with inline layout mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label layout="inline"><calcite-checkbox></calcite-checkbox>Label</calcite-label>
    `);

    const checkboxes = await page.findAll("calcite-checkbox");
    expect(checkboxes.length).toEqual(1);
  });

  it("behaves as expected when wrapped in a calcite-label with inline-space-between layout mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label layout="inline-space-between"><calcite-checkbox></calcite-checkbox>Label</calcite-label>
    `);

    const checkboxes = await page.findAll("calcite-checkbox");
    expect(checkboxes.length).toEqual(1);
  });

  it("resets to initial value when form reset event is triggered", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <form>
        <calcite-checkbox id="unchecked"></calcite-checkbox>
        <calcite-checkbox id="checked" checked></calcite-checkbox>
      </form>
    `);

    const unchecked = await page.find("#unchecked");
    expect(await unchecked.getProperty("checked")).toBe(false);

    await unchecked.click();
    expect(await unchecked.getProperty("checked")).toBe(true);

    const checked = await page.find("#checked");
    expect(await checked.getProperty("checked")).toBe(true);

    await checked.click();
    expect(await checked.getProperty("checked")).toBe(false);

    await page.evaluate(() => {
      const form = document.querySelector("form");
      form.reset();
    });
    await page.waitForChanges();

    expect(await unchecked.getProperty("checked")).toBe(false);
    expect(await checked.getProperty("checked")).toBe(true);
  });

  describe("is focusable", () => {
    focusable("calcite-checkbox", {
      shadowFocusTargetSelector: ".toggle",
    });
  });

  describe("WCAG AA recommended minimum 24px click area", () => {
    const testCheckboxClick = async (scale: Scale, maxExtraPixels: number, direction: "ltr" | "rtl"): Promise<void> => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-checkbox dir="${direction}" scale="${scale}"></calcite-checkbox>`);
      const checkbox = await page.find("calcite-checkbox");
      const { left, top, right, bottom } = await page.evaluate(() =>
        document.querySelector("calcite-checkbox").getBoundingClientRect().toJSON(),
      );

      const testClick = async (x, y, expected) => {
        await page.mouse.click(x, y);
        await page.waitForChanges();
        expect(await checkbox.getProperty("checked")).toBe(expected);
      };

      await testClick(left - maxExtraPixels, top - maxExtraPixels, true);
      await testClick(right + maxExtraPixels, top + maxExtraPixels, false);
      await testClick(left - maxExtraPixels, bottom - maxExtraPixels, true);
      await testClick(right + maxExtraPixels, bottom + maxExtraPixels, false);
      await testClick(right + maxExtraPixels + 1, bottom + maxExtraPixels + 1, false);
    };

    const directions = ["ltr", "rtl"];

    directions.forEach((direction: Direction) => {
      describe(`${direction}`, () => {
        it("small checkbox allows clicks 5px around all sides", async () => {
          await testCheckboxClick("s", 5, direction);
        });

        it("medium checkbox allows clicks 4px around all sides", async () => {
          await testCheckboxClick("m", 4, direction);
        });

        it("large checkbox allows clicks 3px around all sides", async () => {
          await testCheckboxClick("l", 3, direction);
        });
      });
    });
  });

  describe("theme", () => {
    describe("default", () => {
      themed("calcite-checkbox", {
        "--calcite-checkbox-background-color": {
          shadowSelector: `.check-svg`,
          targetProp: "backgroundColor",
        },
        "--calcite-checkbox-icon-color": {
          shadowSelector: `.check-svg`,
          targetProp: "color",
        },
        "--calcite-checkbox-border-color": {
          shadowSelector: `.check-svg`,
          targetProp: "boxShadow",
        },
        "--calcite-checkbox-border-color-hover": {
          shadowSelector: `.check-svg`,
          targetProp: "boxShadow",
          state: "hover",
        },
        "--calcite-checkbox-size": [
          {
            shadowSelector: `.toggle`,
            targetProp: "inlineSize",
          },
          {
            shadowSelector: `.toggle`,
            targetProp: "blockSize",
          },
        ],
      });
    });

    describe("checked", () => {
      themed(html`<calcite-checkbox checked></calcite-checkbox>`, {
        "--calcite-checkbox-background-color-checked": {
          shadowSelector: `.check-svg`,
          targetProp: "backgroundColor",
        },
        "--calcite-checkbox-border-color-checked": {
          shadowSelector: `.check-svg`,
          targetProp: "boxShadow",
        },
      });
    });

    describe("invalid", () => {
      themed(html`<calcite-checkbox status="invalid"></calcite-checkbox>`, {
        "--calcite-checkbox-border-color-invalid": {
          shadowSelector: `.check-svg`,
          targetProp: "boxShadow",
        },
      });
    });
  });
});
