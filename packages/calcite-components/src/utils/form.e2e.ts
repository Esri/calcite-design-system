import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../support/formatting";
import { componentsWithInputEvent } from "./form";

describe("form", () => {
  describe("constraint validation", () => {
    describe("required property", () => {
      const requiredValidationMessage = "Please fill out this field.";

      const getInputEventName = (component: string): string =>
        component
          .split("-")
          .map((part: string, index: number) => (index === 0 ? part : `${part[0].toUpperCase()}${part.slice(1)}`))
          .join("")
          .concat("Input");

      for (const component of ["calcite-input", "calcite-input-number", "calcite-input-text"]) {
        it(`${component} - enter to submit`, async () => {
          const page = await newE2EPage();
          await page.setContent(html`
          <form>
            <${component} required name="${component}"></${component}>
          </form>
        `);

          const element = await page.find(component);

          const clearValidationEventName = getInputEventName(component);
          const inputEvent = await page.spyOnEvent(clearValidationEventName);

          await element.callMethod("setFocus");
          await page.waitForChanges();

          await page.keyboard.press("Enter");
          await page.waitForChanges();

          expect(await element.getProperty("status")).toBe("invalid");
          expect(await element.getProperty("validationMessage")).toBe(requiredValidationMessage);
          expect(await element.getProperty("validationIcon")).toBe(true);

          await page.keyboard.press("1");
          await page.waitForChanges();

          expect(inputEvent).toHaveReceivedEventTimes(1);
          expect(await element.getProperty("value")).toBe("1");
          expect(await element.getProperty("status")).toBe("idle");
          expect(await element.getProperty("validationMessage")).toBe("");
          expect(await element.getProperty("validationIcon")).toBe(false);
        });
      }

      for (const component of componentsWithInputEvent) {
        it(`${component}`, async () => {
          const page = await newE2EPage();
          await page.setContent(html`
          <form>
            <${component} required name="${component}"></${component}>
            <calcite-button type="submit">Submit</calcite-button>
          </form>
        `);

          const submitButton = await page.find("calcite-button");
          const element = await page.find(component);

          const clearValidationEventName = getInputEventName(component);
          const inputEvent = await page.spyOnEvent(clearValidationEventName);

          await submitButton.click();
          await page.waitForChanges();

          expect(await element.getProperty("status")).toBe("invalid");
          expect(await element.getProperty("validationMessage")).toBe(requiredValidationMessage);
          expect(await element.getProperty("validationIcon")).toBe(true);

          await element.callMethod("setFocus");
          await page.waitForChanges();

          await page.keyboard.press("1");
          await page.waitForChanges();

          expect(inputEvent).toHaveReceivedEventTimes(1);
          expect(await element.getProperty("value")).toBe("1");
          expect(await element.getProperty("status")).toBe("idle");
          expect(await element.getProperty("validationMessage")).toBe("");
          expect(await element.getProperty("validationIcon")).toBe(false);
        });
      }

      it(`calcite-input-date-picker`, async () => {
        const page = await newE2EPage();
        await page.setContent(html`
          <form>
            <calcite-input-date-picker name="birthday" required></calcite-input-date-picker>
            <calcite-button type="submit">Submit</calcite-button>
          </form>
        `);

        const submitButton = await page.find("calcite-button");
        const element = await page.find("calcite-input-date-picker");
        const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");

        await submitButton.click();
        await page.waitForChanges();

        expect(await element.getProperty("status")).toBe("invalid");
        expect(await element.getProperty("validationMessage")).toBe(requiredValidationMessage);
        expect(await element.getProperty("validationIcon")).toBe(true);

        await element.callMethod("setFocus");
        await page.waitForChanges();

        await element.click();
        await page.waitForChanges();

        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        await page.keyboard.press("Enter");
        await page.waitForChanges();

        expect(changeEvent).toHaveReceivedEventTimes(1);
        expect(await element.getProperty("status")).toBe("idle");
        expect(await element.getProperty("validationMessage")).toBe("");
        expect(await element.getProperty("validationIcon")).toBe(false);
      });

      it(`calcite-input-time-picker`, async () => {
        const page = await newE2EPage();
        await page.setContent(html`
          <form>
            <calcite-input-time-picker name="noon" required></calcite-input-time-picker>
            <calcite-button type="submit">Submit</calcite-button>
          </form>
        `);

        const submitButton = await page.find("calcite-button");
        const element = await page.find("calcite-input-time-picker");
        const changeEvent = await page.spyOnEvent("calciteInputTimePickerChange");

        await submitButton.click();
        await page.waitForChanges();

        expect(await element.getProperty("status")).toBe("invalid");
        expect(await element.getProperty("validationMessage")).toBe(requiredValidationMessage);
        expect(await element.getProperty("validationIcon")).toBe(true);

        await element.callMethod("setFocus");
        await page.waitForChanges();

        await page.keyboard.type("12:00 PM");
        await page.keyboard.press("Enter");
        await page.waitForChanges();

        expect(changeEvent).toHaveReceivedEventTimes(1);
        expect(await element.getProperty("value")).toBe("12:00");
        expect(await element.getProperty("status")).toBe("idle");
        expect(await element.getProperty("validationMessage")).toBe("");
        expect(await element.getProperty("validationIcon")).toBe(false);
      });

      it(`calcite-select`, async () => {
        const page = await newE2EPage();
        await page.setContent(html`
          <form>
            <calcite-select name="numbers" required>
              <calcite-option value=""></calcite-option>
              <calcite-option value="uno">uno</calcite-option>
              <calcite-option value="dos">dos</calcite-option>
              <calcite-option value="tres">tres</calcite-option>
            </calcite-select>
            <calcite-button type="submit">Submit</calcite-button>
          </form>
        `);

        const submitButton = await page.find("calcite-button");
        const element = await page.find("calcite-select");
        const changeEvent = await page.spyOnEvent("calciteSelectChange");

        await submitButton.click();
        await page.waitForChanges();

        expect(await element.getProperty("status")).toBe("invalid");
        expect(await element.getProperty("validationMessage")).toBe(requiredValidationMessage);
        expect(await element.getProperty("validationIcon")).toBe(true);

        await element.callMethod("setFocus");
        await page.waitForChanges();

        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();

        expect(changeEvent).toHaveReceivedEventTimes(1);
        expect(await element.getProperty("value")).toBe("uno");
        expect(await element.getProperty("status")).toBe("idle");
        expect(await element.getProperty("validationMessage")).toBe("");
        expect(await element.getProperty("validationIcon")).toBe(false);
      });

      it(`calcite-combobox`, async () => {
        const page = await newE2EPage();
        await page.setContent(html`
          <form>
            <calcite-combobox required name="Trees" label="Trees" value="Trees">
              <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
            </calcite-combobox>
            <calcite-button type="submit">Submit</calcite-button>
          </form>
        `);

        const submitButton = await page.find("calcite-button");
        const element = await page.find("calcite-combobox");
        const changeEvent = await page.spyOnEvent("calciteComboboxChange");

        await submitButton.click();
        await page.waitForChanges();

        expect(await element.getProperty("status")).toBe("invalid");
        expect(await element.getProperty("validationMessage")).toBe(requiredValidationMessage);
        expect(await element.getProperty("validationIcon")).toBe(true);

        await element.callMethod("setFocus");
        await page.waitForChanges();

        await page.keyboard.press("Space");
        await page.keyboard.press("Enter");
        await page.waitForChanges();

        expect(changeEvent).toHaveReceivedEventTimes(1);
        expect(await element.getProperty("value")).toBe("Pine");
        expect(await element.getProperty("status")).toBe("idle");
        expect(await element.getProperty("validationMessage")).toBe("");
        expect(await element.getProperty("validationIcon")).toBe(false);
      });
    });
  });
});
