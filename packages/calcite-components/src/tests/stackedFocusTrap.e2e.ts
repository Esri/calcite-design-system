import { E2EElement, newE2EPage, E2EPage } from "@stencil/core/testing";
import { html } from "../../support/formatting";
import { skipAnimations } from "../tests/utils";

describe("stacked focus-trap components", () => {
  const componentStack = html`
    <calcite-sheet id="example-sheet">
      <calcite-panel>
        <calcite-block open></calcite-block>
        <calcite-button>Open Modal from Sheet</calcite-button>
      </calcite-panel>
    </calcite-sheet>

    <calcite-modal id="example-modal">
      <div slot="content">
        <p>This is an example modal that opens from a Sheet.</p>
      </div>
      <calcite-button slot="back">Open Another Modal</calcite-button>
    </calcite-modal>

    <calcite-modal id="another-modal">
      <div slot="content">
        <p>
          This is an example of a another modal that opens from a modal. This modal an input date picker, a combobox, a
          dropdown, a popover and a tooltip.
        </p>
        <calcite-combobox>
          <calcite-combobox-item value="Grand 1" text-label="Grand 1">
            <calcite-combobox-item value="Parent 1" text-label="Parent 1">
              <calcite-combobox-item value="Child 1" text-label="Child 1"></calcite-combobox-item>
              <calcite-combobox-item value="Child 2" text-label="Child 2"></calcite-combobox-item>
            </calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox>
        <calcite-dropdown id="dropdown">
          <calcite-button slot="trigger">Dropdown</calcite-button>
          <calcite-dropdown-group group-title="View">
            <calcite-dropdown-item selected>List</calcite-dropdown-item>
            <calcite-dropdown-item>Grid</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
        <calcite-popover reference-element="popover-button" closable id="popover">
          <div>
            <p>Example Popover.</p>
            <calcite-label>
              Input Date Picker
              <calcite-input-date-picker id="input-date-picker"></calcite-input-date-picker>
            </calcite-label>
            <calcite-label>
              Input Time Picker
              <calcite-input-time-picker name="calcite-input-time-picker"></calcite-input-time-picker>
            </calcite-label>
          </div>
        </calcite-popover>
        <calcite-button id="popover-button">Example Popover</calcite-button>
        <calcite-tooltip reference-element="tooltip-auto-ref"> Example Tooltip </calcite-tooltip>
        <calcite-button id="tooltip-auto-ref">auto</calcite-button>
      </div>
    </calcite-modal>
  `;

  it("closes a stack of open components sequentially in visual order", async () => {
    const page = await newE2EPage();
    await page.setContent(componentStack);
    await skipAnimations(page);

    async function testStackEscapeSequence(page: E2EPage, pickerType: string) {
      async function openAndCheckVisibility(element: E2EElement) {
        element.setProperty("open", true);
        await page.waitForChanges();
        expect(await element.isVisible()).toBe(true);
      }

      const sheet = await page.find("calcite-sheet");
      const firstModal = await page.find("#example-modal");
      const secondModal = await page.find("#another-modal");
      const popover = await page.find("calcite-popover");
      const inputPicker = await page.find(pickerType);

      await openAndCheckVisibility(sheet);
      await openAndCheckVisibility(firstModal);
      await openAndCheckVisibility(secondModal);
      await openAndCheckVisibility(popover);

      await inputPicker.click();

      async function testEscapeAndAssertOpenState(elements: E2EElement[]): Promise<void> {
        for (let i = 0; i < elements.length; i++) {
          await page.keyboard.press("Escape");
          await page.waitForChanges();
          expect(await elements[i].getProperty("open")).toBe(false);

          for (let j = 0; j < elements.length; j++) {
            const expectedOpenState = j > i;
            expect(await elements[j].getProperty("open")).toBe(expectedOpenState);
          }
        }
      }

      await testEscapeAndAssertOpenState([inputPicker, popover, secondModal, firstModal, sheet]);
    }

    await testStackEscapeSequence(page, "calcite-input-time-picker");
    await testStackEscapeSequence(page, "calcite-input-date-picker");
  });
});
