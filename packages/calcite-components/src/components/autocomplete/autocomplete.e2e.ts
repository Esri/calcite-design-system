import { beforeEach, describe, expect, it } from "vitest";
import { E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import {
  accessible,
  defaults,
  disabled,
  floatingUIOwner,
  focusable,
  formAssociated,
  hidden,
  labelable,
  openClose,
  reflects,
  renders,
  slots,
  t9n,
  themed,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { defaultMenuPlacement } from "../../utils/floating-ui";
import { Input } from "../input/input";
import { findAll, isElementFocused, skipAnimations } from "../../tests/utils/puppeteer";
import { CSS, SLOTS } from "./resources";
import { Autocomplete } from "./autocomplete";

const emptyAutocompleteHTML = html`<calcite-autocomplete label="Item list" id="myAutocomplete"></calcite-autocomplete>`;

const simpleHTML = html`
  <calcite-autocomplete label="Item list" id="myAutocomplete">
    <calcite-autocomplete-item label="Item one" value="one" heading="Item one"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Item two" value="two" heading="Item two"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Item three" value="three" heading="Item three"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Item four" value="four" heading="Item four"></calcite-autocomplete-item>
    <calcite-autocomplete-item disabled label="Item five" value="five" heading="Item five"></calcite-autocomplete-item>
  </calcite-autocomplete>
`;

export const simpleFormHTML = html`<form>
  <calcite-autocomplete name="test" label="Item list" id="myAutocomplete">
    <calcite-autocomplete-item label="Item one" value="one" heading="Item one"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Item two" value="two" heading="Item two"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Item three" value="three" heading="Item three"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Item four" value="four" heading="Item four"></calcite-autocomplete-item>
    <calcite-autocomplete-item disabled label="Item five" value="five" heading="Item five"></calcite-autocomplete-item>
  </calcite-autocomplete>
</form>`;

const simpleHTMLDisabledItems = html`
  <calcite-autocomplete label="Item list" id="myAutocomplete">
    <calcite-autocomplete-item label="Item one" value="one" heading="Item one"></calcite-autocomplete-item>
    <calcite-autocomplete-item disabled label="Item two" value="two" heading="Item two"></calcite-autocomplete-item>
    <calcite-autocomplete-item
      disabled
      label="Item three"
      value="three"
      heading="Item three"
    ></calcite-autocomplete-item>
    <calcite-autocomplete-item disabled label="Item four" value="four" heading="Item four"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Item five" value="five" heading="Item five"></calcite-autocomplete-item>
  </calcite-autocomplete>
`;

const scrollHTML = html`<calcite-autocomplete label="Item list" id="myAutocomplete">
  <calcite-autocomplete-item label="Item one" value="one" heading="Item one"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item two" value="two" heading="Item two"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item three" value="three" heading="Item three"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item four" value="four" heading="Item four"></calcite-autocomplete-item>
  <calcite-autocomplete-item disabled label="Item five" value="five" heading="Item five"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item six" value="six" heading="Item six"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item seven" value="seven" heading="Item seven"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item eight" value="eight" heading="Item eight"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item nine" value="nine" heading="Item nine"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item ten" value="ten" heading="Item ten"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item eleven" value="eleven" heading="Item eleven"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item twelve" value="twelve" heading="Item twelve"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item thirteen" value="thirteen" heading="Item thirteen"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item fourteen" value="fourteen" heading="Item fourteen"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item fifteen" value="fifteen" heading="Item fifteen"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item sixteen" value="sixteen" heading="Item sixteen"></calcite-autocomplete-item>
  <calcite-autocomplete-item
    label="Item seventeen"
    value="seventeen"
    heading="Item seventeen"
  ></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item eighteen" value="eighteen" heading="Item eighteen"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item nineteen" value="nineteen" heading="Item nineteen"></calcite-autocomplete-item>
  <calcite-autocomplete-item label="Item twenty" value="twenty" heading="Item twenty"></calcite-autocomplete-item>
</calcite-autocomplete>`;

const simpleGroupHTML = html`
  <calcite-autocomplete label="Pets">
    <calcite-autocomplete-item-group heading="Dogs">
      <calcite-autocomplete-item label="Rover" value="rover" heading="Rover"></calcite-autocomplete-item>
      <calcite-autocomplete-item label="Fido" value="one" heading="Fido"></calcite-autocomplete-item>
    </calcite-autocomplete-item-group>
    <calcite-autocomplete-item-group heading="Cats">
      <calcite-autocomplete-item label="Felix" value="felix" heading="Felix"></calcite-autocomplete-item>
      <calcite-autocomplete-item label="Garfield" value="garfield" heading="Garfield"></calcite-autocomplete-item>
    </calcite-autocomplete-item-group>
  </calcite-autocomplete>
`;

describe("calcite-autocomplete", () => {
  describe("renders", () => {
    renders("calcite-autocomplete", { display: "block" });
  });

  describe("defaults", () => {
    defaults("calcite-autocomplete", [
      {
        propertyName: "alignment",
        defaultValue: "start",
      },
      {
        propertyName: "autocomplete",
        defaultValue: undefined,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "form",
        defaultValue: undefined,
      },
      {
        propertyName: "icon",
        defaultValue: undefined,
      },
      {
        propertyName: "iconFlipRtl",
        defaultValue: false,
      },
      {
        propertyName: "inputValue",
        defaultValue: undefined,
      },
      {
        propertyName: "label",
        defaultValue: undefined,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "maxLength",
        defaultValue: undefined,
      },
      {
        propertyName: "minLength",
        defaultValue: undefined,
      },
      {
        propertyName: "name",
        defaultValue: undefined,
      },
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "pattern",
        defaultValue: undefined,
      },
      {
        propertyName: "placeholder",
        defaultValue: undefined,
      },
      {
        propertyName: "placement",
        defaultValue: defaultMenuPlacement,
      },
      {
        propertyName: "prefixText",
        defaultValue: undefined,
      },
      {
        propertyName: "readOnly",
        defaultValue: false,
      },
      {
        propertyName: "required",
        defaultValue: false,
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
        propertyName: "suffixText",
        defaultValue: undefined,
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
        defaultValue: {
          badInput: false,
          customError: false,
          patternMismatch: false,
          rangeOverflow: false,
          rangeUnderflow: false,
          stepMismatch: false,
          tooLong: false,
          tooShort: false,
          typeMismatch: false,
          valid: false,
          valueMissing: false,
        },
      },
      {
        propertyName: "value",
        defaultValue: "",
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-autocomplete", [
      {
        propertyName: "alignment",
        value: "start",
      },
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "form",
        value: "test-form",
      },
      {
        propertyName: "icon",
        value: "banana",
      },
      {
        propertyName: "iconFlipRtl",
        value: true,
      },
      {
        propertyName: "loading",
        value: true,
      },
      {
        propertyName: "maxLength",
        value: 2,
      },
      {
        propertyName: "minLength",
        value: 2,
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
        propertyName: "overlayPositioning",
        value: "absolute",
      },
      {
        propertyName: "placement",
        value: "bottom",
      },
      {
        propertyName: "readOnly",
        value: true,
      },
      {
        propertyName: "required",
        value: true,
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "status",
        value: "invalid",
      },
      {
        propertyName: "validationIcon",
        value: true,
      },
    ]);
  });

  describe("translation support", () => {
    t9n("calcite-autocomplete");
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-autocomplete");
  });

  describe("slots", () => {
    slots("calcite-autocomplete", SLOTS);
  });

  describe("theme", () => {
    themed("calcite-autocomplete", {
      "--calcite-autocomplete-background-color": {
        shadowSelector: `.${CSS.contentAnimation}`,
        targetProp: "backgroundColor",
      },
      "--calcite-autocomplete-corner-radius": {
        shadowSelector: `.${CSS.contentAnimation}`,
        targetProp: "borderRadius",
      },
      "--calcite-autocomplete-text-color": {
        shadowSelector: `.${CSS.contentAnimation}`,
        targetProp: "color",
      },
      "--calcite-autocomplete-input-prefix-size": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-prefix-size",
      },
      "--calcite-autocomplete-input-suffix-size": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-suffix-size",
      },
      "--calcite-autocomplete-input-background-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-background-color",
      },
      "--calcite-autocomplete-input-border-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-border-color",
      },
      "--calcite-autocomplete-input-corner-radius": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-corner-radius",
      },
      "--calcite-autocomplete-input-shadow": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-shadow",
      },
      "--calcite-autocomplete-input-icon-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-icon-color",
      },
      "--calcite-autocomplete-input-text-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-text-color",
      },
      "--calcite-autocomplete-input-placeholder-text-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-placeholder-text-color",
      },
      "--calcite-autocomplete-input-actions-background-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-actions-background-color",
      },
      "--calcite-autocomplete-input-actions-background-color-hover": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-actions-background-color-hover",
      },
      "--calcite-autocomplete-input-actions-background-color-press": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-actions-background-color-press",
      },
      "--calcite-autocomplete-input-actions-icon-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-actions-icon-color",
      },
      "--calcite-autocomplete-input-actions-icon-color-hover": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-actions-icon-color-hover",
      },
      "--calcite-autocomplete-input-actions-icon-color-press": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-actions-icon-color-press",
      },
      "--calcite-autocomplete-input-loading-background-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-loading-background-color",
      },
      "--calcite-autocomplete-input-loading-fill-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-loading-fill-color",
      },
      "--calcite-autocomplete-input-prefix-background-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-prefix-background-color",
      },
      "--calcite-autocomplete-input-prefix-text-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-prefix-text-color",
      },
      "--calcite-autocomplete-input-suffix-background-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-suffix-background-color",
      },
      "--calcite-autocomplete-input-suffix-text-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-suffix-text-color",
      },
    });
  });

  describe("accessible", () => {
    accessible(simpleHTML);
    accessible(simpleFormHTML);
    accessible(simpleGroupHTML);
    accessible(simpleGroupHTML);
  });

  describe("labelable", () => {
    labelable("calcite-autocomplete");
  });

  describe("disabled", () => {
    disabled("calcite-autocomplete");
  });

  describe("openClose", () => {
    openClose(simpleHTML);
  });

  describe("is form-associated", () => {
    formAssociated(simpleHTML, {
      testValue: "two",
      submitsOnEnter: true,
    });
  });

  describe("owns a floating-ui", () => {
    floatingUIOwner(simpleHTML, "open", { shadowSelector: `.${CSS.floatingUIContainer}` });
  });

  describe("is focusable", () => {
    focusable("calcite-autocomplete");
  });

  it("should be able to remove icon", async () => {
    const page = await newE2EPage();
    await page.setContent(simpleHTML);

    const autocomplete = await page.find("calcite-autocomplete");
    const input = await page.find("calcite-autocomplete >>> calcite-input");

    expect(await input.getProperty("icon")).toBe(true);

    autocomplete.setProperty("icon", false);
    await page.waitForChanges();

    expect(await input.getProperty("icon")).toBe(false);
  });

  describe("keyboard navigation", () => {
    let page: E2EPage;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(simpleHTML);
    });

    it("should open on focus", async () => {
      const page = await newE2EPage();
      await page.setContent(simpleHTML);

      const autocomplete = await page.find("calcite-autocomplete");
      autocomplete.callMethod("setFocus");
      await page.waitForChanges();

      expect(await autocomplete.getProperty("open")).toBe(true);
    });

    it("should close on tab", async () => {
      const page = await newE2EPage();
      await page.setContent(simpleHTML);

      const autocomplete = await page.find("calcite-autocomplete");
      autocomplete.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("Tab");
      expect(await autocomplete.getProperty("open")).toBe(false);
    });

    it("should close on escape", async () => {
      const page = await newE2EPage();
      await page.setContent(simpleHTML);

      const autocomplete = await page.find("calcite-autocomplete");
      autocomplete.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("Escape");
      expect(await autocomplete.getProperty("open")).toBe(false);
    });

    it.each(["ArrowUp", "ArrowDown"])("should set active with %s key", async (key) => {
      const page = await newE2EPage();
      await page.setContent(simpleHTML);

      const autocomplete = await page.find("calcite-autocomplete");

      await page.$eval(
        "calcite-autocomplete >>> calcite-input",
        (input: Input["el"], key) => {
          input.dispatchEvent(new KeyboardEvent("keydown", { key: `${key}`, bubbles: true }));
        },
        key,
      );
      await page.waitForChanges();

      expect(await autocomplete.getProperty("open")).toBe(true);

      const items = await findAll(page, "calcite-autocomplete-item");

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(key === "ArrowUp" ? items.length - 2 === i : i === 0);
      }
    });

    it("should navigate with arrow keys", async () => {
      const page = await newE2EPage();
      await page.setContent(simpleHTML);

      const autocomplete = await page.find("calcite-autocomplete");
      autocomplete.callMethod("setFocus");
      await page.waitForChanges();

      expect(await autocomplete.getProperty("open")).toBe(true);

      const items = await findAll(page, "calcite-autocomplete-item");

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(false);
      }

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(i === 0);
      }

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(i === 1);
      }

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(i === 0);
      }
    });

    it("should navigate with arrow keys and mostly disabled items", async () => {
      const page = await newE2EPage();
      await page.setContent(simpleHTMLDisabledItems);

      const autocomplete = await page.find("calcite-autocomplete");
      autocomplete.callMethod("setFocus");
      await page.waitForChanges();

      expect(await autocomplete.getProperty("open")).toBe(true);

      const items = await findAll(page, "calcite-autocomplete-item");

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(false);
      }

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(i === 0);
      }

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(i === items.length - 1);
      }

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(i === 0);
      }
    });

    it("should navigate with home/end keys", async () => {
      const page = await newE2EPage();
      await page.setContent(simpleHTML);

      const autocomplete = await page.find("calcite-autocomplete");
      autocomplete.callMethod("setFocus");
      await page.waitForChanges();

      expect(await autocomplete.getProperty("open")).toBe(true);

      const items = await findAll(page, "calcite-autocomplete-item");

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(false);
      }

      await page.keyboard.press("End");
      await page.waitForChanges();

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(i === items.length - 2);
      }

      await page.keyboard.press("Home");
      await page.waitForChanges();

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(i === 0);
      }
    });

    it("should navigate with home/end key and mostly disabled items", async () => {
      const page = await newE2EPage();
      await page.setContent(simpleHTMLDisabledItems);

      const autocomplete = await page.find("calcite-autocomplete");
      autocomplete.callMethod("setFocus");
      await page.waitForChanges();

      expect(await autocomplete.getProperty("open")).toBe(true);

      const items = await findAll(page, "calcite-autocomplete-item");

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(false);
      }

      await page.keyboard.press("End");
      await page.waitForChanges();

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(i === items.length - 1);
      }

      await page.keyboard.press("Home");
      await page.waitForChanges();

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(i === 0);
      }
    });
  });

  it("should close when document is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`${simpleHTML}<div id="test">test</div>`);

    const autocomplete = await page.find("calcite-autocomplete");
    await autocomplete.click();
    await page.waitForChanges();

    expect(await autocomplete.getProperty("open")).toBe(true);

    const testDiv = await page.find("#test");
    await testDiv.click();
    await page.waitForChanges();

    expect(await autocomplete.getProperty("open")).toBe(false);
  });

  it("should open when input is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`${simpleHTML}<div id="test">test</div>`);

    const input = await page.find("calcite-autocomplete >>> calcite-input");
    await input.click();
    await page.waitForChanges();

    const autocomplete = await page.find("calcite-autocomplete");

    expect(await autocomplete.getProperty("open")).toBe(true);
  });

  it("should set value, close, and emit calciteAutocompleteChange when item is selected via mouse", async () => {
    const page = await newE2EPage();
    await page.setContent(simpleHTML);

    const autocomplete = await page.find("calcite-autocomplete");
    autocomplete.setProperty("open", true);
    await page.waitForChanges();

    const changeEvent = await autocomplete.spyOnEvent("calciteAutocompleteChange");

    const item = await page.find("calcite-autocomplete-item[value='two']");
    await item.click();
    await page.waitForChanges();

    expect(await autocomplete.getProperty("value")).toBe("two");
    expect(await autocomplete.getProperty("open")).toBe(false);
    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(await isElementFocused(page, "#myAutocomplete")).toBe(true);
  });

  it("handles scrollContentTo method", async () => {
    const page = await newE2EPage();
    await page.setContent(scrollHTML);

    const autocomplete = await page.find("calcite-autocomplete");
    autocomplete.setProperty("open", true);

    await page.waitForChanges();

    const scrollEl = await page.find(`calcite-autocomplete >>> .${CSS.contentAnimation}`);

    expect(await scrollEl.getProperty("scrollTop")).toBe(0);

    await page.$eval("calcite-autocomplete", async (autocomplete: Autocomplete["el"]) => {
      await autocomplete.scrollContentTo({ top: 100 });
    });

    expect(await scrollEl.getProperty("scrollTop")).toBe(100);
  });

  it("should set value, close, and emit calciteAutocompleteChange when item is selected via keyboard", async () => {
    const page = await newE2EPage();
    await page.setContent(simpleHTML);

    const autocomplete = await page.find("calcite-autocomplete");
    autocomplete.callMethod("setFocus");
    await page.waitForChanges();

    const changeEvent = await autocomplete.spyOnEvent("calciteAutocompleteChange");

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    expect(await autocomplete.getProperty("value")).toBe("one");
    expect(await autocomplete.getProperty("open")).toBe(false);
    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("should not throw error when enter is pressed after arrow key", async () => {
    const page = await newE2EPage();
    await page.setContent(emptyAutocompleteHTML);

    const autocomplete = await page.find("calcite-autocomplete");
    autocomplete.callMethod("setFocus");
    await page.waitForChanges();

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
  });

  it("should set scale on items and item groups", async () => {
    const page = await newE2EPage();
    await page.setContent(simpleGroupHTML);

    const items = await findAll(page, "calcite-autocomplete-item");
    const groups = await findAll(page, "calcite-autocomplete-item-group");

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].getProperty("scale")).toBe("m");
    }

    for (let i = 0; i < groups.length; i++) {
      expect(await groups[i].getProperty("scale")).toBe("m");
    }

    const autocomplete = await page.find("calcite-autocomplete");
    autocomplete.setProperty("scale", "l");
    await page.waitForChanges();

    for (let i = 0; i < items.length; i++) {
      expect(await items[i].getProperty("scale")).toBe("l");
    }

    for (let i = 0; i < groups.length; i++) {
      expect(await groups[i].getProperty("scale")).toBe("l");
    }
  });

  it("should only display when open and content is present", async () => {
    const page = await newE2EPage();
    await page.setContent(simpleHTML);
    await skipAnimations(page);

    const animationContainer = await page.find(`calcite-autocomplete >>> .${CSS.contentAnimation}`);
    const autocomplete = await page.find("calcite-autocomplete");
    autocomplete.setProperty("open", true);
    await page.waitForChanges();

    expect(await animationContainer.isVisible()).toBe(true);

    autocomplete.setProperty("open", false);
    await page.waitForChanges();
    expect(await animationContainer.isVisible()).toBe(false);

    await page.$eval("calcite-autocomplete", (autocomplete: Autocomplete["el"]) => {
      autocomplete.innerHTML = "";
    });
    autocomplete.setProperty("open", true);
    await page.waitForChanges();
    expect(await animationContainer.isVisible()).toBe(false);
  });

  it("should emit calciteAutocompleteTextChange", async () => {
    const page = await newE2EPage();
    await page.setContent(`${simpleHTML}<button>test</button>`);

    const autocomplete = await page.find("calcite-autocomplete");
    autocomplete.callMethod("setFocus");
    await page.waitForChanges();

    const textChangeEvent = await autocomplete.spyOnEvent("calciteAutocompleteTextChange");

    await page.keyboard.type("test");
    await page.waitForChanges();

    const button = await page.find("button");
    await button.focus();

    expect(textChangeEvent).toHaveReceivedEventTimes(1);
  });

  it("should emit calciteAutocompleteTextInput", async () => {
    const page = await newE2EPage();
    await page.setContent(simpleHTML);

    const autocomplete = await page.find("calcite-autocomplete");
    autocomplete.callMethod("setFocus");
    await page.waitForChanges();

    const inputEvent = await autocomplete.spyOnEvent("calciteAutocompleteTextInput");

    await page.keyboard.type("test");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(4);
  });
});
