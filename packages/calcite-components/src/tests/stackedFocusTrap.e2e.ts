import { camelCase } from "change-case";
import { newE2EPage, E2EPage, E2EElement } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../support/formatting";
import { IDS } from "../components/panel/resources";
import { CSS } from "../components/input-time-picker/resources";
import { skipAnimations, waitForAnimationFrame } from "./utils/puppeteer";
import { mockConsole } from "./utils/logging";

describe("stacked focus-trap components", () => {
  mockConsole();

  const componentStack = html`
    <calcite-sheet id="sheet">
      <calcite-panel>
        <calcite-block open></calcite-block>
        <calcite-button id="sheet-button">Open Modal from Sheet</calcite-button>
      </calcite-panel>
    </calcite-sheet>

    <calcite-dialog id="dialog" width-scale="s" scale="s" heading="small scale dialog" description="My description">
      <p>The small dialog is perfect for short confirmation dialogs or very compact interfaces with few elements.</p>
      <calcite-button>Back</calcite-button>
    </calcite-dialog>

    <calcite-modal id="example-modal">
      <div slot="content">
        <p>This is an example modal that opens from a Sheet.</p>
      </div>
      <calcite-button slot="back">Open Another Modal</calcite-button>
    </calcite-modal>

    <calcite-modal id="another-modal">
      <div slot="content">
        <p>
          This is an example of a another modal that opens from a modal. This modal an input date picker, a popover and
          a tooltip.
        </p>
        <calcite-popover placement="auto" reference-element="popover-button" closable id="popover">
          <div>
            <p>Example Popover.</p>
            <calcite-label>
              Input Date Picker
              <calcite-input-date-picker id="input-date-picker"></calcite-input-date-picker>
            </calcite-label>
            <calcite-label>
              Input Time Picker
              <calcite-input-time-picker
                name="calcite-input-time-picker"
                id="input-time-picker"
              ></calcite-input-time-picker>
            </calcite-label>
          </div>
        </calcite-popover>
        <calcite-button id="popover-button">Example Popover</calcite-button>
        <calcite-button id="tooltip-auto-ref">auto</calcite-button>
      </div>
    </calcite-modal>
  `;

  it("closes a stack of open components sequentially in visual order", async () => {
    const page = await newE2EPage();
    await page.setContent(componentStack);
    await skipAnimations(page);

    async function testStackEscapeSequence(
      page: E2EPage,
      pickerType: "calcite-input-date-picker" | "calcite-input-time-picker",
    ): Promise<void> {
      async function openAndCheckVisibility(element: E2EElement): Promise<void> {
        const elTagNameCamelCased = camelCase(element.tagName);
        const openEventSpy = await page.spyOnEvent(`${elTagNameCamelCased}Open`);

        element.setProperty("open", true);
        await page.waitForChanges();
        await openEventSpy.next();
      }

      async function testEscapeAndAssertOpenState(focusTrapOrderElements: E2EElement[]): Promise<void> {
        for (let i = 0; i < focusTrapOrderElements.length; i++) {
          const elTagNameCamelCased = camelCase(focusTrapOrderElements[i].tagName);
          const closeEventSpy = await page.spyOnEvent(`${elTagNameCamelCased}Close`);

          const activeElementId = await page.evaluate(() => document.activeElement?.id);

          // 'input-time-picker', 'input-date-picker' retain focus after pressing esc
          if (activeElementId) {
            if (activeElementId === "input-time-picker") {
              await page.keyboard.press("Tab");
              await page.keyboard.press("Tab");
              await page.keyboard.press("Tab");
            } else if (activeElementId === "input-date-picker") {
              await page.keyboard.down("Shift");
              await page.keyboard.press("Tab");
            }
          }
          await page.waitForChanges();

          const activeElementIdAfterTab = await page.evaluate(() => document.activeElement?.id);

          // sheet itself is not focusable, so we check for `sheet-button` as the element focus returns to it after closing the previous component
          const expectedElementId =
            focusTrapOrderElements[i].id === "sheet"
              ? "sheet-button"
              : focusTrapOrderElements[i].id || document.body.id;
          expect(activeElementIdAfterTab).toBe(expectedElementId);

          await page.keyboard.press("Escape");
          await page.waitForChanges();
          await closeEventSpy.next();

          expect(await focusTrapOrderElements[i].getProperty("open")).toBe(false);

          for (let j = 0; j < focusTrapOrderElements.length; j++) {
            const expectedOpenState = j > i;
            expect(await focusTrapOrderElements[j].getProperty("open")).toBe(expectedOpenState);
          }
        }
      }

      const sheet = await page.find("#sheet");
      const dialog = await page.find("#dialog");
      const firstModal = await page.find("#example-modal");
      const secondModal = await page.find("#another-modal");
      const popover = await page.find("#popover");
      const inputTimeOrDatePicker = await page.find(pickerType);

      await openAndCheckVisibility(sheet);
      await openAndCheckVisibility(dialog);
      await openAndCheckVisibility(firstModal);
      await openAndCheckVisibility(secondModal);
      await openAndCheckVisibility(popover);

      const clickTarget =
        pickerType === "calcite-input-time-picker"
          ? await page.find(`calcite-input-time-picker >>> .${CSS.toggleIcon}`)
          : inputTimeOrDatePicker;
      await clickTarget.click();
      await page.waitForChanges();
      // intentional double wait waitForAnimationFrame to ensure focus shift
      await waitForAnimationFrame(page);
      await waitForAnimationFrame(page);

      await testEscapeAndAssertOpenState([inputTimeOrDatePicker, popover, secondModal, firstModal, dialog, sheet]);
    }

    await testStackEscapeSequence(page, "calcite-input-time-picker");
    await testStackEscapeSequence(page, "calcite-input-date-picker");
  });
});

describe("returning focus after deactivation", () => {
  mockConsole();

  const componentStack = html`
    <calcite-dialog id="dialog" width-scale="s" scale="s" heading="small scale dialog" description="My description">
      <p>The small dialog is perfect for short confirmation dialogs or very compact interfaces with few elements.</p>
      <calcite-button>Back</calcite-button>
    </calcite-dialog>
    <button id="open-dialog">Open dialog</button>
    <button id="other-button">Something else</button>
  `;

  it("returns focus to the initialFocus element when deactivating via Escape key", async () => {
    const page = await newE2EPage();
    await page.setContent(componentStack);
    await skipAnimations(page);

    const openButton = await page.find("#open-dialog");
    await openButton.focus();

    const dialog = await page.find("#dialog");
    const elTagNameCamelCased = camelCase(dialog.tagName);
    const openEventSpy = await page.spyOnEvent(`${elTagNameCamelCased}Open`);

    dialog.setProperty("open", true);
    await page.waitForChanges();
    await openEventSpy.next();

    const closeEventSpy = await page.spyOnEvent(`${elTagNameCamelCased}Close`);
    dialog.press("Escape");
    await closeEventSpy.next();

    const activeElementId = await page.evaluate(() => document.activeElement?.id);
    expect(activeElementId).toBe(openButton.id);
    expect(await dialog.getProperty("open")).toBe(false);
  });

  it("returns focus to the initialFocus element when deactivating via close button inside the focus trap", async () => {
    const page = await newE2EPage();
    await page.setContent(componentStack);
    await skipAnimations(page);

    const openButton = await page.find("#open-dialog");
    await openButton.focus();

    const dialog = await page.find("#dialog");
    const elTagNameCamelCased = camelCase(dialog.tagName);
    const openEventSpy = await page.spyOnEvent(`${elTagNameCamelCased}Open`);

    dialog.setProperty("open", true);
    await page.waitForChanges();
    await openEventSpy.next();

    const closeEventSpy = await page.spyOnEvent(`${elTagNameCamelCased}Close`);
    const closeButton = await page.find(`calcite-dialog >>> calcite-panel >>> #${IDS.close}`);
    await closeButton.click();
    await closeEventSpy.next();

    const activeElementId = await page.evaluate(() => document.activeElement?.id);
    expect(activeElementId).toBe(openButton.id);
    expect(await dialog.getProperty("open")).toBe(false);
  });

  it("focuses the element clicked outside of the focus trap when deactivated", async () => {
    const page = await newE2EPage();
    await page.setContent(componentStack);
    await skipAnimations(page);

    const openButton = await page.find("#open-dialog");
    await openButton.focus();

    const dialog = await page.find("#dialog");
    const elTagNameCamelCased = camelCase(dialog.tagName);
    const openEventSpy = await page.spyOnEvent(`${elTagNameCamelCased}Open`);

    dialog.setProperty("open", true);
    await page.waitForChanges();
    await openEventSpy.next();

    const outsideButton = await page.find("#other-button");
    await outsideButton.click();
    await page.waitForChanges();

    const activeElementId = await page.evaluate(() => document.activeElement?.id);
    expect(activeElementId).toBe(outsideButton.id);
    expect(await dialog.getProperty("open")).toBe(true);
  });
});
