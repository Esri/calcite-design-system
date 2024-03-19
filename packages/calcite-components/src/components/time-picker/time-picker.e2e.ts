import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, hidden, renders, t9n } from "../../tests/commonTests";
import { formatTimePart } from "../../utils/time";
import { CSS } from "./resources";
import { getElementXY, getFocusedElementProp } from "../../tests/utils";

const letterKeys = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
] as const;

export type NumericString = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

describe("calcite-time-picker", () => {
  describe("renders", () => {
    renders("calcite-time-picker", { display: "inline-block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-time-picker");
  });

  describe("accessible", () => {
    accessible(`<calcite-time-picker></calcite-time-picker>`);
  });

  describe("accessible using seconds", () => {
    accessible(`<calcite-time-picker step="1" value="00:00:00"></calcite-time-picker>`);
  });

  describe("defaults", () => {
    defaults("calcite-time-picker", [
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "step", defaultValue: 60 },
    ]);
  });

  describe("focusing", () => {
    it("should focus input when corresponding nudge up button is clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker step=".001"></calcite-time-picker>`);

      const minuteElAriaLabel = (await page.find(`calcite-time-picker >>> .${CSS.minute}`)).getAttribute("aria-label");
      const minuteUpEl = await page.find(`calcite-time-picker >>> .${CSS.buttonMinuteUp}`);

      await minuteUpEl.click();
      await page.waitForChanges();

      expect(await getFocusedElementProp(page, "ariaLabel", { shadow: true })).toEqual(minuteElAriaLabel);

      const secondElAriaLabel = (await page.find(`calcite-time-picker >>> .${CSS.second}`)).getAttribute("aria-label");
      const secondUpEl = await page.find(`calcite-time-picker >>> .${CSS.buttonSecondUp}`);

      await secondUpEl.click();
      await page.waitForChanges();

      expect(await getFocusedElementProp(page, "ariaLabel", { shadow: true })).toEqual(secondElAriaLabel);

      const fractionalSecondElAriaLabel = (
        await page.find(`calcite-time-picker >>> .${CSS.fractionalSecond}`)
      ).getAttribute("aria-label");
      const fractionalSecondUpEl = await page.find(`calcite-time-picker >>> .${CSS.buttonFractionalSecondUp}`);

      await fractionalSecondUpEl.click();
      await page.waitForChanges();

      expect(await getFocusedElementProp(page, "ariaLabel", { shadow: true })).toEqual(fractionalSecondElAriaLabel);

      const meridiemElAriaLabel = (await page.find(`calcite-time-picker >>> .${CSS.meridiem}`)).getAttribute(
        "aria-label",
      );
      const meridiemUpEl = await page.find(`calcite-time-picker >>> .${CSS.buttonMeridiemUp}`);

      await meridiemUpEl.click();
      await page.waitForChanges();

      expect(await getFocusedElementProp(page, "ariaLabel", { shadow: true })).toEqual(meridiemElAriaLabel);

      const hourElAriaLabel = (await page.find(`calcite-time-picker >>> .${CSS.hour}`)).getAttribute("aria-label");
      const hourUpEl = await page.find(`calcite-time-picker >>> .${CSS.buttonHourUp}`);

      await hourUpEl.click();
      await page.waitForChanges();

      expect(await getFocusedElementProp(page, "ariaLabel", { shadow: true })).toEqual(hourElAriaLabel);
    });

    it("should focus input when corresponding nudge down button is clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker step=".001"></calcite-time-picker>`);

      const minuteElAriaLabel = (await page.find(`calcite-time-picker >>> .${CSS.minute}`)).getAttribute("aria-label");
      const minuteDownEl = await page.find(`calcite-time-picker >>> .${CSS.buttonMinuteDown}`);

      await minuteDownEl.click();
      await page.waitForChanges();

      expect(await getFocusedElementProp(page, "ariaLabel", { shadow: true })).toEqual(minuteElAriaLabel);

      const secondElAriaLabel = (await page.find(`calcite-time-picker >>> .${CSS.second}`)).getAttribute("aria-label");
      const secondDownEl = await page.find(`calcite-time-picker >>> .${CSS.buttonSecondDown}`);

      await secondDownEl.click();
      await page.waitForChanges();

      expect(await getFocusedElementProp(page, "ariaLabel", { shadow: true })).toEqual(secondElAriaLabel);

      const fractionalSecondElAriaLabel = (
        await page.find(`calcite-time-picker >>> .${CSS.fractionalSecond}`)
      ).getAttribute("aria-label");
      const fractionalSecondDownEl = await page.find(`calcite-time-picker >>> .${CSS.buttonFractionalSecondDown}`);

      await fractionalSecondDownEl.click();
      await page.waitForChanges();

      expect(await getFocusedElementProp(page, "ariaLabel", { shadow: true })).toEqual(fractionalSecondElAriaLabel);

      const meridiemElAriaLabel = (await page.find(`calcite-time-picker >>> .${CSS.meridiem}`)).getAttribute(
        "aria-label",
      );
      const meridiemDownEl = await page.find(`calcite-time-picker >>> .${CSS.buttonMeridiemDown}`);

      await meridiemDownEl.click();
      await page.waitForChanges();

      expect(await getFocusedElementProp(page, "ariaLabel", { shadow: true })).toEqual(meridiemElAriaLabel);

      const hourElAriaLabel = (await page.find(`calcite-time-picker >>> .${CSS.hour}`)).getAttribute("aria-label");
      const hourDownEl = await page.find(`calcite-time-picker >>> .${CSS.buttonHourDown}`);

      await hourDownEl.click();
      await page.waitForChanges();

      expect(await getFocusedElementProp(page, "ariaLabel", { shadow: true })).toEqual(hourElAriaLabel);
    });
  });

  describe("should focus the first focusable element when setFocus is called (ltr)", () => {
    focusable(`calcite-time-picker`, {
      shadowFocusTargetSelector: `.${CSS.input}.${CSS.hour}`,
    });
  });

  describe("should focus the first focusable element when setFocus is called (rtl)", () => {
    focusable(`<calcite-time-picker dir="rtl" lang="ar"></calcite-time-picker>`, {
      shadowFocusTargetSelector: `.${CSS.input}.${CSS.hour}`,
    });
  });

  it("value displays correctly when value is programmatically changed", async () => {
    const originalValue = "11:00:00";
    const newValue = "14:30:40";
    const page = await newE2EPage({
      html: `<calcite-time-picker step="1" value="${originalValue}"></calcite-time-picker>`,
    });

    const timePicker = await page.find("calcite-time-picker");
    const hourEl = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
    const minuteEl = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
    const secondEl = await page.find(`calcite-time-picker >>> .${CSS.second}`);
    const meridiemEl = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);

    expect(await timePicker.getProperty("value")).toBe(originalValue);
    expect(hourEl.textContent).toBe("11");
    expect(minuteEl.textContent).toBe("00");
    expect(secondEl.textContent).toBe("00");
    expect(meridiemEl.textContent).toBe("AM");

    timePicker.setProperty("value", newValue);
    await page.waitForChanges();

    expect(await timePicker.getProperty("value")).toBe(newValue);
    expect(hourEl.textContent).toBe("02");
    expect(minuteEl.textContent).toBe("30");
    expect(secondEl.textContent).toBe("40");
    expect(meridiemEl.textContent).toBe("PM");
  });

  describe("keyboard accessibility", () => {
    it("tabbing focuses each input in the correct sequence", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`,
      });

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.hour}`,
        ),
      ).toBe(true);

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.minute}`,
        ),
      ).toBe(true);

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.second}`,
        ),
      ).toBe(true);

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.meridiem}`,
        ),
      ).toBe(true);
    });

    it("pressing right and left arrow keys focuses each input in the correct sequence", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`,
      });

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.hour}`,
        ),
      ).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.minute}`,
        ),
      ).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.second}`,
        ),
      ).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.meridiem}`,
        ),
      ).toBe(true);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.second}`,
        ),
      ).toBe(true);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.minute}`,
        ),
      ).toBe(true);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.hour}`,
        ),
      ).toBe(true);
    });

    it("ArrowUp key increments hour property and display hour correctly for fr lang (24-hour)", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker lang="fr"></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);

      await hour.click();

      for (let i = 1; i < 24; i++) {
        await page.keyboard.press("ArrowUp");
        await page.waitForChanges();

        expect(hour.textContent).toBe(formatTimePart(i));
      }

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(hour.textContent).toBe("00");
    });

    it("ArrowDown key decrements hour property and display hour correctly for fr lang (24-hour)", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker lang="fr"></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);

      await hour.click();
      await page.keyboard.press("ArrowDown");

      for (let i = 23; i > 0; i--) {
        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();

        expect(hour.textContent).toBe(formatTimePart(i));
      }
    });

    it("ArrowUp key increments hour property and display hour correctly for en lang (12-hour)", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);

      await hour.click();

      for (let i = 1; i < 24; i++) {
        await page.keyboard.press("ArrowUp");
        await page.waitForChanges();

        expect(hour.textContent).toBe(i > 12 ? formatTimePart(i - 12) : formatTimePart(i));
      }

      await page.keyboard.press("ArrowUp");
    });

    it("ArrowDown key decrements hour property and display hour correctly for en lang (12-hour)", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);

      await hour.click();
      await page.keyboard.press("ArrowDown");

      for (let i = 23; i > 0; i--) {
        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();

        expect(hour.textContent).toBe(i > 12 ? formatTimePart(i - 12) : formatTimePart(i));
      }
    });

    it("ArrowUp key increments minute property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`,
      });
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);

      await minute.click();

      for (let i = 0; i < 60; i++) {
        await page.keyboard.press("ArrowUp");
      }
      await page.keyboard.press("ArrowUp");
    });

    it("ArrowDown key decrements minute property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`,
      });
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);

      await minute.click();

      for (let i = 59; i >= 0; i--) {
        await page.keyboard.press("ArrowDown");
      }
      await page.keyboard.press("ArrowDown");
    });

    it("ArrowUp key increments second property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`,
      });
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      await second.click();

      for (let i = 0; i < 60; i++) {
        await page.keyboard.press("ArrowUp");
      }
      await page.keyboard.press("ArrowUp");
    });

    it("ArrowDown key decrements second property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`,
      });
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      await second.click();

      for (let i = 59; i >= 0; i--) {
        await page.keyboard.press("ArrowDown");
      }
      await page.keyboard.press("ArrowDown");
    });

    it("ArrowUp key increments meridiem property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`,
      });
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);

      await meridiem.click();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("AM");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("PM");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("AM");

      await page.keyboard.press("Backspace");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("--");
    });

    it("ArrowDown key decrements meridiem property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`,
      });
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);

      await meridiem.click();
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("PM");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("AM");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("PM");

      await page.keyboard.press("Backspace");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("--");
    });

    it("typing letter keys changes nothing for hour, minute and second in 24-hour format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker lang="fr" step="1"></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      await hour.click();

      for (let i = 0; i >= letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i]);
        expect(hour.textContent).toBe("--");
      }

      await minute.click();

      for (let i = 0; i >= letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i]);
        expect(minute.textContent).toBe("--");
      }

      await second.click();

      for (let i = 0; i >= letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i]);
        expect(second.textContent).toBe("--");
      }
    });

    it("typing letter keys changes nothing for hour, minute and second in 12-hour format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      await hour.click();

      for (let i = 0; i >= letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i]);
        expect(hour.textContent).toBe("--");
      }

      await minute.click();

      for (let i = 0; i >= letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i]);
        expect(minute.textContent).toBe("--");
      }

      await second.click();

      for (let i = 0; i >= letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i]);
        expect(second.textContent).toBe("--");
      }
    });

    it("allows typing single digit values for hour, minute and second and pads the value and display with a leading zero for 24-hour format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker lang="fr" step="1"></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString() as NumericString);
        await page.waitForChanges();

        expect(hour.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString() as NumericString);
        await page.waitForChanges();

        expect(minute.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString() as NumericString);
        await page.waitForChanges();

        expect(second.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }
    });

    it("allows typing single digit values for hour, minute and second and pads the value and display with a leading zero for 12-hour format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString() as NumericString);
        await page.waitForChanges();

        expect(hour.textContent).toBe(i === 0 ? `12` : `0${i}`);

        await page.keyboard.press("Backspace");
      }

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString() as NumericString);
        await page.waitForChanges();

        expect(minute.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString() as NumericString);
        await page.waitForChanges();

        expect(second.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }
    });

    it("restricts typing to valid hour values for 12-hour format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);

      await hour.click();

      for (let i = 10; i < 13; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as NumericString);
        await page.keyboard.press(key2 as NumericString);
        await page.waitForChanges();

        expect(hour.textContent).toBe(`${key1}${key2}`);
      }

      for (let i = 13; i < 100; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as NumericString);
        await page.keyboard.press(key2 as NumericString);
        await page.waitForChanges();

        expect(hour.textContent).toBe(key2 === "0" ? `12` : `0${key2}`);
      }
    });

    it("restricts typing to valid hour values for 24-hour format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker lang="fr" step="1"></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);

      await hour.click();

      for (let i = 10; i < 24; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as NumericString);
        await page.keyboard.press(key2 as NumericString);
        await page.waitForChanges();

        expect(hour.textContent).toBe(`${key1}${key2}`);
      }

      for (let i = 24; i < 100; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as NumericString);
        await page.keyboard.press(key2 as NumericString);
        await page.waitForChanges();

        expect(hour.textContent).toBe(`0${key2}`);
      }
    });

    it("restricts typing to valid minute values", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`,
      });
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);

      await minute.click();

      for (let i = 10; i < 60; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as NumericString);
        await page.keyboard.press(key2 as NumericString);
        await page.waitForChanges();

        expect(minute.textContent).toBe(`${key1}${key2}`);
      }

      for (let i = 60; i < 100; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as NumericString);
        await page.keyboard.press(key2 as NumericString);
        await page.waitForChanges();

        expect(minute.textContent).toBe(`0${key2}`);
      }
    });

    it("restricts typing to valid second values", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`,
      });
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      await second.click();

      for (let i = 10; i < 60; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as NumericString);
        await page.keyboard.press(key2 as NumericString);
        await page.waitForChanges();

        expect(second.textContent).toBe(`${key1}${key2}`);
      }

      for (let i = 60; i < 100; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as NumericString);
        await page.keyboard.press(key2 as NumericString);
        await page.waitForChanges();

        expect(second.textContent).toBe(`0${key2}`);
      }
    });

    it("allows typing AM and PM for en lang (12-hour)", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`,
      });
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);

      await meridiem.click();
      await page.keyboard.press("a");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("AM");

      await page.keyboard.press("p");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("PM");
    });

    it("typing am and pm multiple times when they are already set doesn't affect the hour", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker value="00:00"></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);

      await meridiem.click();
      await page.keyboard.press("a");
      await page.keyboard.press("a");
      await page.keyboard.press("a");
      await page.waitForChanges();

      expect(hour.textContent).toBe("12");
      expect(meridiem.textContent).toBe("AM");

      await page.keyboard.press("p");
      await page.keyboard.press("p");
      await page.keyboard.press("p");
      await page.waitForChanges();

      expect(hour.textContent).toBe("12");
      expect(meridiem.textContent).toBe("PM");
    });

    it("Pressing delete when hour is focused clears the whole value", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1" value="00:00:00"></calcite-time-picker>`,
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);

      expect(await timePicker.getProperty("value")).toBe("00:00:00");
      expect(hour.textContent).toBe("12");
      expect(minute.textContent).toBe("00");
      expect(second.textContent).toBe("00");
      expect(meridiem.textContent).toBe("AM");

      await hour.click();
      await page.keyboard.press("Delete");
      await page.waitForChanges();

      expect(await timePicker.getProperty("value")).toBeNull();
      expect(hour.textContent).toBe("--");
      expect(minute.textContent).toBe("--");
      expect(second.textContent).toBe("--");
      expect(meridiem.textContent).toBe("--");
    });

    it("Pressing delete when minute is focused clears the whole value", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1" value="00:00:00"></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);

      expect(hour.textContent).toBe("12");
      expect(minute.textContent).toBe("00");
      expect(second.textContent).toBe("00");
      expect(meridiem.textContent).toBe("AM");

      await minute.click();
      await page.keyboard.press("Delete");
      await page.waitForChanges();

      expect(hour.textContent).toBe("--");
      expect(minute.textContent).toBe("--");
      expect(second.textContent).toBe("--");
      expect(meridiem.textContent).toBe("--");
    });

    it("Pressing delete when second is focused just clears seconds", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1" value="00:00:00"></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);

      expect(hour.textContent).toBe("12");
      expect(minute.textContent).toBe("00");
      expect(second.textContent).toBe("00");
      expect(meridiem.textContent).toBe("AM");

      await second.click();
      await page.keyboard.press("Delete");
      await page.waitForChanges();

      expect(hour.textContent).toBe("12");
      expect(minute.textContent).toBe("00");
      expect(second.textContent).toBe("--");
      expect(meridiem.textContent).toBe("AM");
    });
  });

  describe("time behavior", () => {
    it("hour, display hour and AM/PM set correctly as hour changes for en lang (12-hour)", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker value="00:00:00"></calcite-time-picker>`,
      });

      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);

      expect(meridiem.textContent).toBe("AM");

      await hour.click();
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(hour.textContent).toBe("11");
      expect(meridiem.textContent).toBe("PM");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(hour.textContent).toBe("12");
      expect(meridiem.textContent).toBe("AM");
    });

    it("changing AM/PM updates value property correctly for en lang (12-hour)", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker value="00:00:00" step="1"></calcite-time-picker>`,
      });

      const timePicker = await page.find(`calcite-time-picker`);
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);

      expect(hour.textContent).toBe("12");

      await meridiem.click();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(hour.textContent).toBe("12");
      expect(meridiem.textContent).toBe("PM");
      expect(await timePicker.getProperty("value")).toBe("12:00:00");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(hour.textContent).toBe("12");
      expect(meridiem.textContent).toBe("AM");
      expect(await timePicker.getProperty("value")).toBe("00:00:00");
    });

    it("hour-up button increments hour property and display hour correctly for fr lang (24-hour)", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker lang="fr"></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const hourUp = await page.find(`calcite-time-picker >>> .${CSS.buttonHourUp}`);

      for (let i = 1; i < 24; i++) {
        await hourUp.click();
        await page.waitForChanges();

        expect(hour.textContent).toBe(formatTimePart(i));
      }

      await hourUp.click();
      await page.waitForChanges();

      expect(hour.textContent).toBe("00");
    });

    it("hour-down button decrements hour property and display hour correctly for fr lang (24-hour)", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker lang="fr"></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const hourDown = await page.find(`calcite-time-picker >>> .${CSS.buttonHourDown}`);

      await hourDown.click();
      await page.waitForChanges();

      expect(hour.textContent).toBe("00");

      for (let i = 23; i > 0; i--) {
        await hourDown.click();
        await page.waitForChanges();

        expect(hour.textContent).toBe(formatTimePart(i));
      }
    });

    it("hour-up button increments hour property and display hour correctly for en lang (12-hour)", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const hourUp = await page.find(`calcite-time-picker >>> .${CSS.buttonHourUp}`);

      for (let i = 1; i <= 24; i++) {
        await hourUp.click();
        await page.waitForChanges();

        expect(hour.textContent).toBe(i > 12 ? formatTimePart(i - 12) : formatTimePart(i));
      }
    });

    it("hour-down button decrements hour property and display hour correctly for en lang (12-hour)", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`,
      });
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const hourDown = await page.find(`calcite-time-picker >>> .${CSS.buttonHourDown}`);

      await hourDown.click();
      await page.waitForChanges();

      expect(hour.textContent).toBe("12");

      for (let i = 23; i > 0; i--) {
        await hourDown.click();
        await page.waitForChanges();

        expect(hour.textContent).toBe(i > 12 ? formatTimePart(i - 12) : formatTimePart(i));
      }
    });

    it("minute-up button increments minute property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`,
      });
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const minuteUp = await page.find(`calcite-time-picker >>> .${CSS.buttonMinuteUp}`);

      for (let i = 0; i < 60; i++) {
        await minuteUp.click();
        await page.waitForChanges();

        expect(minute.textContent).toBe(`${formatTimePart(i)}`);
      }

      await minuteUp.click();
      await page.waitForChanges();

      expect(minute.textContent).toBe("00");
    });

    it("minute-down button decrements minute property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`,
      });
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const minuteDown = await page.find(`calcite-time-picker >>> .${CSS.buttonMinuteDown}`);

      for (let i = 59; i >= 0; i--) {
        await minuteDown.click();
        await page.waitForChanges();

        expect(minute.textContent).toBe(`${formatTimePart(i)}`);
      }

      await minuteDown.click();
      await page.waitForChanges();

      expect(minute.textContent).toBe("59");
    });

    it("second-up button increments second property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`,
      });
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);
      const secondUp = await page.find(`calcite-time-picker >>> .${CSS.buttonSecondUp}`);

      for (let i = 0; i < 60; i++) {
        await secondUp.click();
        await page.waitForChanges();

        expect(second.textContent).toBe(`${formatTimePart(i)}`);
      }

      await secondUp.click();
      await page.waitForChanges();

      expect(second.textContent).toBe("00");
    });

    it("second-down button decrements second property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`,
      });
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);
      const secondDown = await page.find(`calcite-time-picker >>> .${CSS.buttonSecondDown}`);

      for (let i = 59; i >= 0; i--) {
        await secondDown.click();
        await page.waitForChanges();

        expect(second.textContent).toBe(`${formatTimePart(i)}`);
      }

      await secondDown.click();
      await page.waitForChanges();

      expect(second.textContent).toBe("59");
    });

    it("meridiem-up button increments meridiem property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`,
      });
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);
      const meridiemUp = await page.find(`calcite-time-picker >>> .${CSS.buttonMeridiemUp}`);

      await meridiemUp.click();
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("AM");

      await meridiemUp.click();
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("PM");

      await meridiemUp.click();
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("AM");
    });

    it("meridiem-down button decrements meridiem property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`,
      });
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);
      const meridiemDown = await page.find(`calcite-time-picker >>> .${CSS.buttonMeridiemDown}`);

      await meridiemDown.click();
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("PM");

      await meridiemDown.click();
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("AM");

      await meridiemDown.click();
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("PM");
    });

    it("time picker container direction is ltr when set to rtl on host", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker dir="rtl" ></calcite-time-picker>`,
      });
      const timePicker = await page.find(`calcite-time-picker >>> .${CSS.timePicker}`);
      const timePickerDir = await timePicker.getAttribute("dir");
      expect(timePickerDir).toBe("ltr");
    });

    it("meridiem is at the start of the time for arabic locale", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker lang="ar" dir="rtl"></calcite-time-picker>`,
      });

      const meridiemStart = await page.find(`calcite-time-picker >>> .${CSS.meridiemStart}`);
      expect(meridiemStart).toBeTruthy();
    });
  });

  describe("translation support", () => {
    t9n("<calcite-time-picker></calcite-time-picker>");
  });

  it("toggles seconds display when step is < 60", async () => {
    const page = await newE2EPage({
      html: `<calcite-time-picker value="11:00:00"></calcite-time-picker>`,
    });
    const timePicker = await page.find("calcite-time-picker");

    expect(await page.find(`calcite-time-picker >>> .${CSS.second}`)).toBeNull();

    timePicker.setProperty("step", 1);
    await page.waitForChanges();

    expect(await page.find(`calcite-time-picker >>> .${CSS.second}`)).not.toBeNull();

    timePicker.setProperty("step", 60);
    await page.waitForChanges();

    expect(await page.find(`calcite-time-picker >>> .${CSS.second}`)).toBeNull();
  });

  describe("fractional second support", () => {
    it("upward nudge of empty fractional second sets to 0 for step=0.1", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker step="0.1"></calcite-time-picker>`);
      const [buttonUpLocationX, buttonUpLocationY] = await getElementXY(
        page,
        "calcite-time-picker",
        ".button--fractionalSecond-up",
      );
      await page.mouse.click(buttonUpLocationX, buttonUpLocationY);
      await page.waitForChanges();
      const fractionalSecondEl = await page.find(`calcite-time-picker >>> .input.fractionalSecond`);
      expect(fractionalSecondEl.innerHTML).toEqual("0");
    });

    it("upward nudge of empty fractional second sets to 00 for step=0.01", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker step="0.01"></calcite-time-picker>`);
      const [buttonUpLocationX, buttonUpLocationY] = await getElementXY(
        page,
        "calcite-time-picker",
        ".button--fractionalSecond-up",
      );
      await page.mouse.click(buttonUpLocationX, buttonUpLocationY);
      await page.waitForChanges();
      const fractionalSecondEl = await page.find(`calcite-time-picker >>> .input.fractionalSecond`);
      expect(fractionalSecondEl.innerHTML).toEqual("00");
    });

    it("upward nudge of empty fractional second sets to 000 for step=0.001", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker step="0.001"></calcite-time-picker>`);
      const [buttonUpLocationX, buttonUpLocationY] = await getElementXY(
        page,
        "calcite-time-picker",
        ".button--fractionalSecond-up",
      );
      await page.mouse.click(buttonUpLocationX, buttonUpLocationY);
      await page.waitForChanges();
      const fractionalSecondEl = await page.find(`calcite-time-picker >>> .input.fractionalSecond`);
      expect(fractionalSecondEl.innerHTML).toEqual("000");
    });
  });
});
