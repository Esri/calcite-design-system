import { h, Fragment, JsxNode } from "@arcgis/lumina";
import { camelCase } from "change-case";
import { mount } from "@arcgis/lumina-compiler/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { page, userEvent } from "vitest/browser";
import { IDS } from "../components/panel/resources";
import { CSS } from "../components/input-time-picker/resources";
import { waitForEvent } from "./commonTests/browser/utils";
import { mockConsole } from "./utils/logging";
import { afterFocusShiftDelay } from "./utils/focus-trap";

type OpenableElement = HTMLElement & { open: boolean };

beforeEach(async () => {
  await page.viewport(1200, 800);
});

function renderReturnFocusStack(): JsxNode {
  return (
    <>
      <calcite-dialog heading="small scale dialog" id="dialog">
        <p>
          The small dialog is perfect for short confirmation dialogs or very compact interfaces with
          few elements.
        </p>
        <calcite-button>Back</calcite-button>
      </calcite-dialog>
      <input id="first-input" />
      <input id="second-input" />
    </>
  );
}

async function ensureOpen(
  element: OpenableElement,
  strategy: "prop" | "click" = "prop",
  toggleShadowSelector?: string,
): Promise<void> {
  const eventName = `${camelCase(element.tagName)}Open`;
  const eventPromise = waitForEvent(element, eventName);
  const toggleTarget = toggleShadowSelector
    ? page.elementLocator(element).getBySelector(toggleShadowSelector)
    : element;

  if (strategy === "click") {
    await userEvent.click(toggleTarget);
  } else {
    element.open = true;
  }

  await eventPromise;
}

async function testEscapeAndAssertOpenState(
  focusTrapOrderElements: OpenableElement[],
): Promise<void> {
  for (let i = 0; i < focusTrapOrderElements.length; i++) {
    const focusTrapOrderEl = focusTrapOrderElements[i];
    const eventName = `${camelCase(focusTrapOrderEl.tagName)}Close`;
    const closeEventPromise = waitForEvent(focusTrapOrderEl, eventName);
    const activeElementId = document.activeElement?.id;

    // input pickers can retain internal focus after Escape and require tabbing to realign visual order checks
    if (activeElementId === "input-time-picker") {
      await userEvent.keyboard("{Tab}{Tab}{Tab}");
    } else if (activeElementId === "input-date-picker") {
      await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
    }

    // sheet itself is not focusable, so focus should return to sheet-button before sheet closes
    const expectedElement =
      focusTrapOrderEl.id === "sheet" ? page.getBySelector("#sheet-button") : focusTrapOrderEl;
    await expect.element(expectedElement).toHaveFocus();

    await userEvent.keyboard("{Escape}");
    await closeEventPromise;
    await afterFocusShiftDelay();

    expect(focusTrapOrderEl.open).toBe(false);

    for (let j = 0; j < focusTrapOrderElements.length; j++) {
      const expectedOpenState = j > i;
      expect(focusTrapOrderElements[j].open).toBe(expectedOpenState);
    }
  }
}

describe("stacked focus-trap components", () => {
  mockConsole();

  it.for(["calcite-input-date-picker", "calcite-input-time-picker"] as const)(
    "closes a stack of open components sequentially in visual order (%s)",
    async (pickerType) => {
      await mount(
        <>
          <calcite-sheet id="sheet">
            <calcite-panel>
              <calcite-block open />
              <calcite-button id="sheet-button">Open Dialog from Sheet</calcite-button>
            </calcite-panel>
          </calcite-sheet>

          <calcite-dialog heading="Dialog" id="dialog">
            <p>
              The small dialog is perfect for short confirmation dialogs or very compact interfaces
              with few elements.
            </p>
            <calcite-button id="dialog-button" slot="footer">
              OK
            </calcite-button>
          </calcite-dialog>

          <calcite-dialog heading="Example Dialog" id="example-dialog">
            <p>This is an example dialog that opens from a Sheet.</p>
          </calcite-dialog>

          <calcite-dialog heading="Another Dialog" id="another-dialog">
            <p>This is an example of a another dialog that opens from a dialog.</p>
            <calcite-popover
              closable
              heading="Popover"
              id="popover"
              reference-element="popover-button"
            >
              <calcite-label>
                Input Date Picker
                <calcite-input-date-picker id="input-date-picker" />
              </calcite-label>
              <calcite-label>
                Input Time Picker
                <calcite-input-time-picker id="input-time-picker" />
              </calcite-label>
            </calcite-popover>
            <calcite-button id="popover-button">Example Popover</calcite-button>
          </calcite-dialog>
        </>,
      );

      const sheet = document.querySelector<OpenableElement>("#sheet")!;
      const dialog = document.querySelector<OpenableElement>("#dialog")!;
      const firstDialog = document.querySelector<OpenableElement>("#example-dialog")!;
      const secondDialog = document.querySelector<OpenableElement>("#another-dialog")!;
      const popover = document.querySelector<OpenableElement>("#popover")!;
      const inputTimeOrDatePicker = document.querySelector<OpenableElement>(pickerType)!;

      await ensureOpen(sheet);
      await ensureOpen(dialog);
      await ensureOpen(firstDialog);
      await ensureOpen(secondDialog);
      await ensureOpen(popover);
      await ensureOpen(inputTimeOrDatePicker, "click", `.${CSS.toggleIcon}`);
      await afterFocusShiftDelay();

      await testEscapeAndAssertOpenState([
        inputTimeOrDatePicker,
        popover,
        secondDialog,
        firstDialog,
        dialog,
        sheet,
      ]);
    },
  );
});

describe("returning focus after deactivation", () => {
  mockConsole();

  it("returns focus to the initialFocus element when deactivating via Escape key", async () => {
    await mount(renderReturnFocusStack);

    const firstInput = page.getBySelector("#first-input");
    await userEvent.click(firstInput);

    const dialog = document.querySelector<OpenableElement>("#dialog")!;
    const openEventPromise = waitForEvent(dialog, `${camelCase(dialog.tagName)}Open`);
    dialog.open = true;
    await openEventPromise;
    await afterFocusShiftDelay();

    const closeEventPromise = waitForEvent(dialog, `${camelCase(dialog.tagName)}Close`);
    await userEvent.keyboard("{Escape}");
    await closeEventPromise;
    await afterFocusShiftDelay();

    await expect.element(firstInput).toHaveFocus();
    expect(dialog.open).toBe(false);
  });

  it("returns focus to the initialFocus element when deactivating via close button inside the focus trap", async () => {
    await mount(renderReturnFocusStack);

    const firstInput = page.getBySelector("#first-input");
    await userEvent.click(firstInput);

    const dialog = document.querySelector<OpenableElement>("#dialog")!;
    const openEventPromise = waitForEvent(dialog, `${camelCase(dialog.tagName)}Open`);
    dialog.open = true;
    await openEventPromise;
    await afterFocusShiftDelay();

    const closeEventPromise = waitForEvent(dialog, `${camelCase(dialog.tagName)}Close`);
    const closeButton = page.elementLocator(dialog).getBySelector(`calcite-panel #${IDS.close}`);
    await userEvent.click(closeButton);
    await closeEventPromise;
    await afterFocusShiftDelay();

    await expect.element(firstInput).toHaveFocus();
    expect(dialog.open).toBe(false);
  });

  it("focuses the element clicked outside of the focus trap when deactivated", async () => {
    await mount(renderReturnFocusStack);

    const firstInput = page.getBySelector("#first-input");
    await userEvent.click(firstInput);

    const dialog = document.querySelector<OpenableElement>("#dialog")!;
    const openEventPromise = waitForEvent(dialog, `${camelCase(dialog.tagName)}Open`);
    dialog.open = true;
    await openEventPromise;
    await afterFocusShiftDelay();

    const lastInput = page.getBySelector("#second-input");
    await userEvent.click(lastInput);
    await afterFocusShiftDelay();

    await expect.element(lastInput).toHaveFocus();
    expect(dialog.open).toBe(true);
  });
});
