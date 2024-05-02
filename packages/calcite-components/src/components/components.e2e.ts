import { E2EElement, newE2EPage, E2EPage } from "@stencil/core/testing";
import { html } from "../../support/formatting";
import { skipAnimations } from "../tests/utils";

describe("stacked focus-trap components", () => {
  const componentStack = html`
    <calcite-sheet id="example-sheet" label="libero nunc" position="inline-start" display-mode="overlay">
      <calcite-panel closable>
        <calcite-block open heading="Preview Sheet options"> </calcite-block>
        <calcite-button onClick="openComponent('example-modal')"> Open Modal from Sheet</calcite-button>
      </calcite-panel>
    </calcite-sheet>

    <calcite-modal id="example-modal">
      <div slot="content">
        <p>This is an example modal that opens from a Sheet.</p>
      </div>
      <calcite-button slot="back" width="full" onClick="openComponent('another-modal')"
        >Open Another Modal</calcite-button
      >
    </calcite-modal>

    <calcite-modal id="another-modal">
      <div slot="content" style="display: flex; flex-direction: column; gap: 12px; margin: 100px"">
        <p>
          This is an example of a another modal that opens from a modal. This modal an input date picker, a combobox, a
          dropdown, a popover and a tooltip.
        </p>
        <calcite-combobox
          label="test"
          placeholder="placeholder"
          max-items="8"
          selection-mode="ancestors"
          style="width: 200px"
          id="combobox"
        >
          <calcite-combobox-item value="Grand 1" text-label="Grand 1">
            <calcite-combobox-item value="Parent 1" text-label="Parent 1">
              <calcite-combobox-item value="Child 1" text-label="Child 1"></calcite-combobox-item>
              <calcite-combobox-item value="Child 2" text-label="Child 2"></calcite-combobox-item>
            </calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox>
        <calcite-dropdown scale="s" width-scale="s" id="dropdown">
          <calcite-button icon-end="hamburger" appearance="outline" slot="trigger">Scale S</calcite-button>
          <calcite-dropdown-group group-title="View">
            <calcite-dropdown-item icon-end="list-bullet" selected>List</calcite-dropdown-item>
            <calcite-dropdown-item icon-end="grid">Grid</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
        <calcite-popover
          heading="Heading"
          label="right end popover"
          reference-element="popover-button"
          placement="right-end"
          id="popover-heading"
          closable
          style="width: 25vw"
          id="popover"
        >
          <div style="padding: 0.5rem 1rem 0.75rem">
            <p style="margin-top: 0">Example Popover.</p>
            <calcite-label>
              Input Date Picker
              <calcite-input-date-picker value="2023-03-07" id="input-date-picker"></calcite-input-date-picker>
            </calcite-label>
            <calcite-label>
              Input Time Picker
              <calcite-input-time-picker name="calcite-input-time-picker"></calcite-input-time-picker>
            </calcite-label>
          </div>
        </calcite-popover>
        <calcite-button appearance="outline" id="popover-button" icon-start="popup">Example Popover</calcite-button>
        <calcite-tooltip placement="auto" reference-element="tooltip-auto-ref"> Example Tooltip </calcite-tooltip>
        <calcite-button appearance="outline" id="tooltip-auto-ref">auto</calcite-button>
      </div>
    </calcite-modal>
    <calcite-button onClick="openComponent('example-sheet')"> Open Sheet </calcite-button>
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
      await openAndCheckVisibility(sheet);

      const firstModal = await page.find("#example-modal");
      await openAndCheckVisibility(firstModal);

      const secondModal = await page.find("#another-modal");
      await openAndCheckVisibility(secondModal);

      const popover = await page.find("calcite-popover");
      await openAndCheckVisibility(popover);

      const inputPicker = await page.find(pickerType);
      inputPicker.click();
      await page.waitForChanges();
      expect(await inputPicker.getProperty("open")).toBe(true);

      async function testEscapeAndCheckOpenState(elements: E2EElement[]) {
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

      await testEscapeAndCheckOpenState([inputPicker, popover, secondModal, firstModal, sheet]);
    }

    await testStackEscapeSequence(page, "calcite-input-date-picker");
    await testStackEscapeSequence(page, "calcite-input-time-picker");
  });
});
