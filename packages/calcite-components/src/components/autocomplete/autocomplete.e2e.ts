import { describe, it, beforeEach, expect } from "vitest";
import { E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import {
  accessible,
  defaults,
  disabled,
  hidden,
  floatingUIOwner,
  formAssociated,
  labelable,
  openClose,
  reflects,
  renders,
  t9n,
  themed,
  focusable,
  slots,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { defaultMenuPlacement } from "../../utils/floating-ui";
import { Input } from "../input/input";
import { skipAnimations } from "../../tests/utils";
import { CSS, SLOTS } from "./resources";
import { Autocomplete } from "./autocomplete";

const simpleHTML = html`
  <calcite-autocomplete label="Item list" id="myAutocomplete">
    <calcite-autocomplete-item label="Item one" value="one" heading="Item one"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Item two" value="two" heading="Item two"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Item three" value="three" heading="Item three"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Item four" value="four" heading="Item four"></calcite-autocomplete-item>
    <calcite-autocomplete-item disabled label="Item five" value="five" heading="Item five"></calcite-autocomplete-item>
  </calcite-autocomplete>
`;

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
        defaultValue: undefined,
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
      "--calcite-autocomplete-background-color": [
        {
          shadowSelector: `.${CSS.contentContainer}`,
          targetProp: "backgroundColor",
        },
        {
          shadowSelector: `.${CSS.contentAnimation}`,
          targetProp: "backgroundColor",
        },
      ],
      "--calcite-autocomplete-text-color": {
        shadowSelector: `.${CSS.contentContainer}`,
        targetProp: "color",
      },
    });
  });

  describe("accessible", () => {
    accessible(simpleHTML);
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

    it("should set active with up arrow key", async () => {
      const page = await newE2EPage();
      await page.setContent(simpleHTML);

      const autocomplete = await page.find("calcite-autocomplete");

      await page.$eval("calcite-autocomplete >>> calcite-input", (input: Input["el"]) => {
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
      });
      await page.waitForChanges();

      expect(await autocomplete.getProperty("open")).toBe(true);

      const items = await page.findAll("calcite-autocomplete-item");

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(i === 0);
      }
    });

    it("should set active with up arrow key", async () => {
      const page = await newE2EPage();
      await page.setContent(simpleHTML);

      const autocomplete = await page.find("calcite-autocomplete");

      await page.$eval("calcite-autocomplete >>> calcite-input", (input: Input["el"]) => {
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));
      });
      await page.waitForChanges();

      expect(await autocomplete.getProperty("open")).toBe(true);

      const items = await page.findAll("calcite-autocomplete-item");

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].getProperty("active")).toBe(items.length - 2 === i);
      }
    });

    it("should navigate with arrow keys", async () => {
      const page = await newE2EPage();
      await page.setContent(simpleHTML);

      const autocomplete = await page.find("calcite-autocomplete");
      autocomplete.callMethod("setFocus");
      await page.waitForChanges();

      expect(await autocomplete.getProperty("open")).toBe(true);

      const items = await page.findAll("calcite-autocomplete-item");

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

    it("should navigate with home/end keys", async () => {
      const page = await newE2EPage();
      await page.setContent(simpleHTML);

      const autocomplete = await page.find("calcite-autocomplete");
      autocomplete.callMethod("setFocus");
      await page.waitForChanges();

      expect(await autocomplete.getProperty("open")).toBe(true);

      const items = await page.findAll("calcite-autocomplete-item");

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

  it("should set scale on items and item groups", async () => {
    const page = await newE2EPage();
    await page.setContent(simpleGroupHTML);

    const items = await page.findAll("calcite-autocomplete-item");
    const groups = await page.findAll("calcite-autocomplete-item-group");

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
