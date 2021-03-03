import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, reflects, renders } from "../../tests/commonTests";
import { formatNumberAsTimeString } from "./utils";

describe("calcite-time-picker", () => {
  it("renders", async () => renders("calcite-time-picker"));

  it("is accessible", async () => accessible(`<calcite-time-picker hour="00" minute="00"></calcite-time-picker>`));

  it("has defaults", async () =>
    defaults("calcite-time-picker", [
      { propertyName: "hour", defaultValue: "--" },
      { propertyName: "hourDisplayFormat", defaultValue: "12" },
      { propertyName: "minute", defaultValue: "--" },
      { propertyName: "second", defaultValue: "--" },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "step", defaultValue: 60 },
      { propertyName: "theme", defaultValue: "light" }
    ]));

  it("reflects", async () =>
    reflects("calcite-time-picker", [
      { propertyName: "hour", value: "--" },
      { propertyName: "minute", value: "--" },
      { propertyName: "second", value: "--" },
      { propertyName: "scale", value: "m" },
      { propertyName: "step", value: 60 },
      { propertyName: "theme", value: "light" }
    ]));

  it("should focus the first input when setFocus is called", async () =>
    focusable(`calcite-time-picker`, {
      shadowFocusTargetSelector: "span.hour"
    }));

  describe("keyboard accessibility", () => {
    it("tabbing focuses each input in the correct sequence", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker hour-display-format="12" step="1"></calcite-time-picker>`);

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          "span.hour"
        )
      ).toBe(true);

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          "span.minute"
        )
      ).toBe(true);

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          "span.second"
        )
      ).toBe(true);

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          "span.ampm"
        )
      ).toBe(true);
    });

    it("pressing right and left arrow keys focuses each input in the correct sequence", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker hour-display-format="12" step="1"></calcite-time-picker>`);

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          "span.hour"
        )
      ).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          "span.minute"
        )
      ).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          "span.second"
        )
      ).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          "span.ampm"
        )
      ).toBe(true);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          "span.second"
        )
      ).toBe(true);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          "span.minute"
        )
      ).toBe(true);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(
        await page.$eval(
          "calcite-time-picker",
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
          "span.hour"
        )
      ).toBe(true);
    });

    it("ArrowUp key increments hour property and display hour correctly for 24-hour display format", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker hour-display-format="24"></calcite-time-picker>`);
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find("calcite-time-picker >>> span.hour");

      await hour.click();

      for (let i = 1; i < 24; i++) {
        await page.keyboard.press("ArrowUp");
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`${formatNumberAsTimeString(i)}`);
        expect(hour.textContent).toBe(formatNumberAsTimeString(i));
      }

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await timePicker.getProperty("hour")).toBe("00");
      expect(hour.textContent).toBe("00");
    });

    it("ArrowDown key decrements hour property and display hour correctly for 24-hour display format", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker hour-display-format="24"></calcite-time-picker>`);
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find("calcite-time-picker >>> span.hour");

      await hour.click();
      await page.keyboard.press("ArrowDown");

      expect(await timePicker.getProperty("hour")).toBe("00");

      for (let i = 23; i > 0; i--) {
        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`${formatNumberAsTimeString(i)}`);
        expect(hour.textContent).toBe(formatNumberAsTimeString(i));
      }
    });

    it("ArrowUp key increments hour property and display hour correctly for 12-hour display format", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker hour-display-format="12"></calcite-time-picker>`);
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find("calcite-time-picker >>> span.hour");

      await hour.click();

      for (let i = 1; i < 24; i++) {
        await page.keyboard.press("ArrowUp");
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`${formatNumberAsTimeString(i)}`);
        expect(hour.textContent).toBe(i > 12 ? formatNumberAsTimeString(i - 12) : formatNumberAsTimeString(i));
      }

      await page.keyboard.press("ArrowUp");

      expect(await timePicker.getProperty("hour")).toBe("00");
    });

    it("ArrowDown key decrements hour property and display hour correctly for 12-hour display format", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker hour-display-format="12"></calcite-time-picker>`);
      const timePicker = await page.find("calcite-time-picker");
      const hour = await page.find("calcite-time-picker >>> span.hour");

      await hour.click();
      await page.keyboard.press("ArrowDown");

      expect(await timePicker.getProperty("hour")).toBe("00");

      for (let i = 23; i > 0; i--) {
        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();

        expect(await timePicker.getProperty("hour")).toBe(`${formatNumberAsTimeString(i)}`);
        expect(hour.textContent).toBe(i > 12 ? formatNumberAsTimeString(i - 12) : formatNumberAsTimeString(i));
      }
    });

    it("ArrowUp key increments minute property correctly", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker></calcite-time-picker>`);
      const timePicker = await page.find("calcite-time-picker");
      const minute = await page.find("calcite-time-picker >>> span.minute");

      await minute.click();

      for (let i = 0; i < 60; i++) {
        await page.keyboard.press("ArrowUp");
        expect(await timePicker.getProperty("minute")).toBe(`${formatNumberAsTimeString(i)}`);
      }
      await page.keyboard.press("ArrowUp");
      expect(await timePicker.getProperty("minute")).toBe("00");
    });

    it("ArrowDown key decrements minute property correctly", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker></calcite-time-picker>`);
      const timePicker = await page.find("calcite-time-picker");
      const minute = await page.find("calcite-time-picker >>> span.minute");

      await minute.click();

      for (let i = 59; i >= 0; i--) {
        await page.keyboard.press("ArrowDown");
        expect(await timePicker.getProperty("minute")).toBe(`${formatNumberAsTimeString(i)}`);
      }
      await page.keyboard.press("ArrowDown");
      expect(await timePicker.getProperty("minute")).toBe("59");
    });

    it("ArrowUp key increments second property correctly", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker step="1"></calcite-time-picker>`);
      const timePicker = await page.find("calcite-time-picker");
      const second = await page.find("calcite-time-picker >>> span.second");

      await second.click();

      for (let i = 0; i < 60; i++) {
        await page.keyboard.press("ArrowUp");
        expect(await timePicker.getProperty("second")).toBe(`${formatNumberAsTimeString(i)}`);
      }
      await page.keyboard.press("ArrowUp");
      expect(await timePicker.getProperty("second")).toBe("00");
    });

    it("ArrowDown key decrements second property correctly", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker step="1"></calcite-time-picker>`);
      const timePicker = await page.find("calcite-time-picker");
      const second = await page.find("calcite-time-picker >>> span.second");

      await second.click();

      for (let i = 59; i >= 0; i--) {
        await page.keyboard.press("ArrowDown");
        expect(await timePicker.getProperty("second")).toBe(`${formatNumberAsTimeString(i)}`);
      }
      await page.keyboard.press("ArrowDown");
      expect(await timePicker.getProperty("second")).toBe("59");
    });

    it("ArrowUp key increments ampm property correctly", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker hour-display-format="12"></calcite-time-picker>`);
      const ampm = await page.find("calcite-time-picker >>> span.ampm");

      await ampm.click();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(ampm.textContent).toBe("AM");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(ampm.textContent).toBe("PM");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(ampm.textContent).toBe("AM");

      await page.keyboard.press("Backspace");
      await page.waitForChanges();

      expect(ampm.textContent).toBe("--");
    });

    it("ArrowDown key decrements ampm property correctly", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-time-picker hour-display-format="12"></calcite-time-picker>`);
      const ampm = await page.find("calcite-time-picker >>> span.ampm");

      await ampm.click();
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(ampm.textContent).toBe("PM");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(ampm.textContent).toBe("AM");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(ampm.textContent).toBe("PM");

      await page.keyboard.press("Backspace");
      await page.waitForChanges();

      expect(ampm.textContent).toBe("--");
    });
  });
});
