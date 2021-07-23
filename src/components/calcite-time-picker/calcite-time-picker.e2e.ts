import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, reflects, renders } from "../../tests/commonTests";
import { formatTimePart } from "../../utils/time";
import { CSS } from "./resources";

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
  "z"
];

describe("calcite-time-picker", () => {
  it("renders", async () => renders("calcite-time-picker"));

  it("is accessible", async () => accessible(`<calcite-time-picker hour="00" minute="00"></calcite-time-picker>`));

  it("has defaults", async () =>
    defaults("calcite-time-picker", [
      { propertyName: "hour", defaultValue: null },
      { propertyName: "hourDisplayFormat", defaultValue: "12" },
      { propertyName: "minute", defaultValue: null },
      { propertyName: "second", defaultValue: null },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "step", defaultValue: 60 }
    ]));

  it("reflects", async () =>
    reflects("calcite-time-picker", [
      { propertyName: "hourDisplayFormat", value: "12" },
      { propertyName: "scale", value: "m" },
      { propertyName: "step", value: 60 }
    ]));

  it("should focus the first input when setFocus is called", async () =>
    focusable(`calcite-time-picker`, {
      shadowFocusTargetSelector: `.${CSS.hour}`
    }));

  describe("keyboard accessibility", () => {
    it("tabbing focuses each input in the correct sequence", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12" step="1"></calcite-time-picker>`
      });

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.hour}`
        )
      ).toBe(true);

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.minute}`
        )
      ).toBe(true);

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.second}`
        )
      ).toBe(true);

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.meridiem}`
        )
      ).toBe(true);
    });

    it("pressing right and left arrow keys focuses each input in the correct sequence", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12" step="1"></calcite-time-picker>`
      });

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.hour}`
        )
      ).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.minute}`
        )
      ).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.second}`
        )
      ).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.meridiem}`
        )
      ).toBe(true);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.second}`
        )
      ).toBe(true);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.minute}`
        )
      ).toBe(true);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          `.${CSS.hour}`
        )
      ).toBe(true);
    });

    it("ArrowUp key increments hour property and display hour correctly for 24-hour display format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="24"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);

      await hour.click();

      for (let i = 1; i < 24; i++) {
        await page.keyboard.press("ArrowUp");
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`${formatTimePart(i)}`);
        expect(hour.textContent).toBe(formatTimePart(i));
      }

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await timePicker.getProperty("hour")).toBe("00");
      expect(hour.textContent).toBe("00");
    });

    it("ArrowDown key decrements hour property and display hour correctly for 24-hour display format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="24"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);

      await hour.click();
      await page.keyboard.press("ArrowDown");

      expect(await timePicker.getProperty("hour")).toBe("00");

      for (let i = 23; i > 0; i--) {
        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`${formatTimePart(i)}`);
        expect(hour.textContent).toBe(formatTimePart(i));
      }
    });

    it("ArrowUp key increments hour property and display hour correctly for 12-hour display format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);

      await hour.click();

      for (let i = 1; i < 24; i++) {
        await page.keyboard.press("ArrowUp");
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`${formatTimePart(i)}`);
        expect(hour.textContent).toBe(i > 12 ? formatTimePart(i - 12) : formatTimePart(i));
      }

      await page.keyboard.press("ArrowUp");

      expect(await timePicker.getProperty("hour")).toBe("00");
    });

    it("ArrowDown key decrements hour property and display hour correctly for 12-hour display format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);

      await hour.click();
      await page.keyboard.press("ArrowDown");

      expect(await timePicker.getProperty("hour")).toBe("00");

      for (let i = 23; i > 0; i--) {
        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`${formatTimePart(i)}`);
        expect(hour.textContent).toBe(i > 12 ? formatTimePart(i - 12) : formatTimePart(i));
      }
    });

    it("ArrowUp key increments minute property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);

      await minute.click();

      for (let i = 0; i < 60; i++) {
        await page.keyboard.press("ArrowUp");
        expect(await timePicker.getProperty("minute")).toBe(`${formatTimePart(i)}`);
      }
      await page.keyboard.press("ArrowUp");
      expect(await timePicker.getProperty("minute")).toBe("00");
    });

    it("ArrowDown key decrements minute property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);

      await minute.click();

      for (let i = 59; i >= 0; i--) {
        await page.keyboard.press("ArrowDown");
        expect(await timePicker.getProperty("minute")).toBe(`${formatTimePart(i)}`);
      }
      await page.keyboard.press("ArrowDown");
      expect(await timePicker.getProperty("minute")).toBe("59");
    });

    it("ArrowUp key increments second property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      await second.click();

      for (let i = 0; i < 60; i++) {
        await page.keyboard.press("ArrowUp");
        expect(await timePicker.getProperty("second")).toBe(`${formatTimePart(i)}`);
      }
      await page.keyboard.press("ArrowUp");
      expect(await timePicker.getProperty("second")).toBe("00");
    });

    it("ArrowDown key decrements second property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      await second.click();

      for (let i = 59; i >= 0; i--) {
        await page.keyboard.press("ArrowDown");
        expect(await timePicker.getProperty("second")).toBe(`${formatTimePart(i)}`);
      }
      await page.keyboard.press("ArrowDown");
      expect(await timePicker.getProperty("second")).toBe("59");
    });

    it("ArrowUp key increments meridiem property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12"></calcite-time-picker>`
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
        html: `<calcite-time-picker hour-display-format="12"></calcite-time-picker>`
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
        html: `<calcite-time-picker hour-display-format="24" step="1"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      await hour.click();

      for (let i = 0; i >= letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i]);
        expect(await timePicker.getProperty("hour")).toBe(null);
        expect(hour.textContent).toBe("--");
      }

      await minute.click();

      for (let i = 0; i >= letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i]);
        expect(await timePicker.getProperty("minute")).toBe(null);
        expect(minute.textContent).toBe("--");
      }

      await second.click();

      for (let i = 0; i >= letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i]);
        expect(await timePicker.getProperty("second")).toBe(null);
        expect(second.textContent).toBe("--");
      }
    });

    it("typing letter keys changes nothing for hour, minute and second in 12-hour format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12" step="1"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      await hour.click();

      for (let i = 0; i >= letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i]);
        expect(await timePicker.getProperty("hour")).toBe(null);
        expect(hour.textContent).toBe("--");
      }

      await minute.click();

      for (let i = 0; i >= letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i]);
        expect(await timePicker.getProperty("minute")).toBe(null);
        expect(minute.textContent).toBe("--");
      }

      await second.click();

      for (let i = 0; i >= letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i]);
        expect(await timePicker.getProperty("second")).toBe(null);
        expect(second.textContent).toBe("--");
      }
    });

    it("allows typing single digit values for hour, minute and second and pads the value and display with a leading zero for 24-hour format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="24" step="1"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString());
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`0${i}`);
        expect(hour.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString());
        await page.waitForChanges();

        expect(await timePicker.getProperty("minute")).toBe(`0${i}`);
        expect(minute.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString());
        await page.waitForChanges();

        expect(await timePicker.getProperty("second")).toBe(`0${i}`);
        expect(second.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }
    });

    it("allows typing single digit values for hour, minute and second and pads the value and display with a leading zero for 12-hour format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12" step="1"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString());
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`0${i}`);
        expect(hour.textContent).toBe(i === 0 ? `12` : `0${i}`);

        await page.keyboard.press("Backspace");
      }

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString());
        await page.waitForChanges();

        expect(await timePicker.getProperty("minute")).toBe(`0${i}`);
        expect(minute.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString());
        await page.waitForChanges();

        expect(await timePicker.getProperty("second")).toBe(`0${i}`);
        expect(second.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }
    });

    it("restricts typing to valid hour values for 12-hour format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12" step="1"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);

      await hour.click();

      for (let i = 10; i < 13; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1);
        await page.keyboard.press(key2);
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`${key1}${key2}`);
        expect(hour.textContent).toBe(`${key1}${key2}`);
      }

      for (let i = 13; i < 100; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1);
        await page.keyboard.press(key2);
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`0${key2}`);
        expect(hour.textContent).toBe(key2 === "0" ? `12` : `0${key2}`);
      }
    });

    it("restricts typing to valid hour values for 24-hour format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="24" step="1"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);

      await hour.click();

      for (let i = 10; i < 24; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1);
        await page.keyboard.press(key2);
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`${key1}${key2}`);
        expect(hour.textContent).toBe(`${key1}${key2}`);
      }

      for (let i = 24; i < 100; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1);
        await page.keyboard.press(key2);
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`0${key2}`);
        expect(hour.textContent).toBe(`0${key2}`);
      }
    });

    it("restricts typing to valid minute values", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);

      await minute.click();

      for (let i = 10; i < 60; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1);
        await page.keyboard.press(key2);
        await page.waitForChanges();

        expect(await timePicker.getProperty("minute")).toBe(`${key1}${key2}`);
        expect(minute.textContent).toBe(`${key1}${key2}`);
      }

      for (let i = 60; i < 100; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1);
        await page.keyboard.press(key2);
        await page.waitForChanges();

        expect(await timePicker.getProperty("minute")).toBe(`0${key2}`);
        expect(minute.textContent).toBe(`0${key2}`);
      }
    });

    it("restricts typing to valid second values", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      await second.click();

      for (let i = 10; i < 60; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1);
        await page.keyboard.press(key2);
        await page.waitForChanges();

        expect(await timePicker.getProperty("second")).toBe(`${key1}${key2}`);
        expect(second.textContent).toBe(`${key1}${key2}`);
      }

      for (let i = 60; i < 100; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1);
        await page.keyboard.press(key2);
        await page.waitForChanges();

        expect(await timePicker.getProperty("second")).toBe(`0${key2}`);
        expect(second.textContent).toBe(`0${key2}`);
      }
    });

    it("allows typing AM and PM for 12-hour format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12" step="1" hour="00"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);

      await meridiem.click();
      await page.keyboard.press("a");
      await page.waitForChanges();

      expect(await timePicker.getProperty("hour")).toBe("00");
      expect(hour.textContent).toBe("12");
      expect(meridiem.textContent).toBe("AM");

      await page.keyboard.press("p");
      await page.waitForChanges();

      expect(await timePicker.getProperty("hour")).toBe("12");
      expect(hour.textContent).toBe("12");
      expect(meridiem.textContent).toBe("PM");
    });

    it("typing am and pm multiple times when they are already set doesn't affect the hour", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12" step="1" hour="00"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);

      await meridiem.click();
      await page.keyboard.press("a");
      await page.keyboard.press("a");
      await page.keyboard.press("a");
      await page.waitForChanges();

      expect(await timePicker.getProperty("hour")).toBe("00");
      expect(hour.textContent).toBe("12");
      expect(meridiem.textContent).toBe("AM");

      await page.keyboard.press("p");
      await page.keyboard.press("p");
      await page.keyboard.press("p");
      await page.waitForChanges();

      expect(await timePicker.getProperty("hour")).toBe("12");
      expect(hour.textContent).toBe("12");
      expect(meridiem.textContent).toBe("PM");
    });

    it("Delete key clears hour input", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1" hour="12"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);

      expect(await timePicker.getProperty("hour")).toBe("12");
      expect(hour.textContent).toBe("12");

      await hour.click();
      await page.keyboard.press("Delete");
      await page.waitForChanges();

      expect(await timePicker.getProperty("hour")).toBeNull();
      expect(hour.textContent).toBe("--");
    });

    it("Delete key clears minute input", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1" minute="59"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);

      expect(await timePicker.getProperty("minute")).toBe("59");
      expect(minute.textContent).toBe("59");

      await minute.click();
      await page.keyboard.press("Delete");
      await page.waitForChanges();

      expect(await timePicker.getProperty("minute")).toBeNull();
      expect(minute.textContent).toBe("--");
    });

    it("Delete key clears second input", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1" second="25"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);

      expect(await timePicker.getProperty("second")).toBe("25");
      expect(second.textContent).toBe("25");

      await second.click();
      await page.keyboard.press("Delete");
      await page.waitForChanges();

      expect(await timePicker.getProperty("second")).toBeNull();
      expect(second.textContent).toBe("--");
    });
  });

  describe("time behavior", () => {
    it("hour, display hour and AM/PM set correctly as hour changes for 12-hour display format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12" hour="00"></calcite-time-picker>`
      });

      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);

      expect(meridiem.textContent).toBe("AM");

      await hour.click();
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await timePicker.getProperty("hour")).toBe("23");
      expect(hour.textContent).toBe("11");
      expect(meridiem.textContent).toBe("PM");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await timePicker.getProperty("hour")).toBe("00");
      expect(hour.textContent).toBe("12");
      expect(meridiem.textContent).toBe("AM");
    });

    it("changing AM/PM updates hour property correctly for 12-hour display format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12" hour="00"></calcite-time-picker>`
      });

      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);

      expect(await timePicker.getProperty("hour")).toBe("00");
      expect(meridiem.textContent).toBe("AM");

      await meridiem.click();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await timePicker.getProperty("hour")).toBe("12");
      expect(hour.textContent).toBe("12");
      expect(meridiem.textContent).toBe("PM");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await timePicker.getProperty("hour")).toBe("00");
      expect(hour.textContent).toBe("12");
      expect(meridiem.textContent).toBe("AM");
    });

    it("hour-up button increments hour property and display hour correctly for 24-hour display format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="24"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const hourUp = await page.find(`calcite-time-picker >>> .${CSS.buttonHourUp}`);

      for (let i = 1; i < 24; i++) {
        await hourUp.click();
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`${formatTimePart(i)}`);
        expect(hour.textContent).toBe(formatTimePart(i));
      }

      await hourUp.click();
      await page.waitForChanges();

      expect(await timePicker.getProperty("hour")).toBe("00");
      expect(hour.textContent).toBe("00");
    });

    it("hour-down button decrements hour property and display hour correctly for 24-hour display format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="24"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const hourdown = await page.find(`calcite-time-picker >>> .${CSS.buttonHourDown}`);

      await hourdown.click();
      await page.waitForChanges();

      expect(await timePicker.getProperty("hour")).toBe("00");
      expect(hour.textContent).toBe("00");

      for (let i = 23; i > 0; i--) {
        await hourdown.click();
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`${formatTimePart(i)}`);
        expect(hour.textContent).toBe(formatTimePart(i));
      }
    });

    it("hour-up button increments hour property and display hour correctly for 12-hour display format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const hourup = await page.find(`calcite-time-picker >>> .${CSS.buttonHourUp}`);

      for (let i = 1; i < 24; i++) {
        await hourup.click();
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`${formatTimePart(i)}`);
        expect(hour.textContent).toBe(i > 12 ? formatTimePart(i - 12) : formatTimePart(i));
      }

      await hourup.click();

      expect(await timePicker.getProperty("hour")).toBe("00");
    });

    it("hour-down button decrements hour property and display hour correctly for 12-hour display format", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find(`calcite-time-picker >>> .${CSS.hour}`);
      const hourdown = await page.find(`calcite-time-picker >>> .${CSS.buttonHourDown}`);

      await hourdown.click();
      await page.waitForChanges();

      expect(await timePicker.getProperty("hour")).toBe("00");
      expect(hour.textContent).toBe("12");

      for (let i = 23; i > 0; i--) {
        await hourdown.click();
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`${formatTimePart(i)}`);
        expect(hour.textContent).toBe(i > 12 ? formatTimePart(i - 12) : formatTimePart(i));
      }
    });

    it("minute-up button increments minute property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const minuteup = await page.find(`calcite-time-picker >>> .${CSS.buttonMinuteUp}`);

      for (let i = 0; i < 60; i++) {
        await minuteup.click();
        await page.waitForChanges();

        expect(await timePicker.getProperty("minute")).toBe(`${formatTimePart(i)}`);
        expect(minute.textContent).toBe(`${formatTimePart(i)}`);
      }

      await minuteup.click();
      await page.waitForChanges();

      expect(await timePicker.getProperty("minute")).toBe("00");
      expect(minute.textContent).toBe("00");
    });

    it("minute-down button decrements minute property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const minute = await page.find(`calcite-time-picker >>> .${CSS.minute}`);
      const minutedown = await page.find(`calcite-time-picker >>> .${CSS.buttonMinuteDown}`);

      for (let i = 59; i >= 0; i--) {
        await minutedown.click();
        await page.waitForChanges();

        expect(await timePicker.getProperty("minute")).toBe(`${formatTimePart(i)}`);
        expect(minute.textContent).toBe(`${formatTimePart(i)}`);
      }

      await minutedown.click();
      await page.waitForChanges();

      expect(await timePicker.getProperty("minute")).toBe("59");
      expect(minute.textContent).toBe("59");
    });

    it("second-up button increments second property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);
      const secondup = await page.find(`calcite-time-picker >>> .${CSS.buttonSecondUp}`);

      for (let i = 0; i < 60; i++) {
        await secondup.click();
        await page.waitForChanges();

        expect(await timePicker.getProperty("second")).toBe(`${formatTimePart(i)}`);
        expect(second.textContent).toBe(`${formatTimePart(i)}`);
      }

      await secondup.click();
      await page.waitForChanges();

      expect(await timePicker.getProperty("second")).toBe("00");
      expect(second.textContent).toBe("00");
    });

    it("second-down button decrements second property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker step="1"></calcite-time-picker>`
      });
      const timePicker = await page.find("calcite-time-picker");
      const second = await page.find(`calcite-time-picker >>> .${CSS.second}`);
      const seconddown = await page.find(`calcite-time-picker >>> .${CSS.buttonSecondDown}`);

      for (let i = 59; i >= 0; i--) {
        await seconddown.click();
        await page.waitForChanges();

        expect(await timePicker.getProperty("second")).toBe(`${formatTimePart(i)}`);
        expect(second.textContent).toBe(`${formatTimePart(i)}`);
      }

      await seconddown.click();
      await page.waitForChanges();

      expect(await timePicker.getProperty("second")).toBe("59");
      expect(second.textContent).toBe("59");
    });

    it("meridiem-up button increments meridiem property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12"></calcite-time-picker>`
      });
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);
      const meridiemup = await page.find(`calcite-time-picker >>> .${CSS.buttonMeridiemUp}`);

      await meridiemup.click();
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("AM");

      await meridiemup.click();
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("PM");

      await meridiemup.click();
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("AM");
    });

    it("meridiem-down button decrements meridiem property correctly", async () => {
      const page = await newE2EPage({
        html: `<calcite-time-picker hour-display-format="12"></calcite-time-picker>`
      });
      const meridiem = await page.find(`calcite-time-picker >>> .${CSS.meridiem}`);
      const meridiemdown = await page.find(`calcite-time-picker >>> .${CSS.buttonMeridiemDown}`);

      await meridiemdown.click();
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("PM");

      await meridiemdown.click();
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("AM");

      await meridiemdown.click();
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("PM");
    });
  });
});
