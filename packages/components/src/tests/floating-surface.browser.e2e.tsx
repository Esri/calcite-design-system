import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { html } from "../../support/formatting";
import { mockConsole } from "./utils/logging";
import { CSS as AutocompleteCSS } from "../components/autocomplete/resources";
import { CSS as ComboboxCSS } from "../components/combobox/resources";
import { CSS as DropdownCSS } from "../components/dropdown/resources";
import { CSS as DatePickerCSS } from "../components/input-date-picker/resources";
import { CSS as PopoverCSS } from "../components/popover/resources";
import { CSS as TooltipCSS } from "../components/tooltip/resources";

mockConsole();

const floatingSurfaceStyles = {
  borderColor: "rgb(1, 2, 3)",
  borderRadius: "11px",
  borderWidth: "7px",
};

function setFloatingSurfaceTokens(host: HTMLElement): void {
  host.style.setProperty("--calcite-border-width-sm", floatingSurfaceStyles.borderWidth);
  host.style.setProperty("--calcite-color-border-3", floatingSurfaceStyles.borderColor);
  host.style.setProperty("--calcite-corner-radius-sm", floatingSurfaceStyles.borderRadius);
}

function expectFloatingSurface(shadowRoot: ShadowRoot, selector: string): void {
  const floatingSurface = shadowRoot.querySelector<HTMLElement>(selector);

  if (!floatingSurface) {
    throw new Error(`Expected floating surface ${selector} to exist`);
  }

  const styles = getComputedStyle(floatingSurface);

  expect(styles.borderTopWidth).toBe(floatingSurfaceStyles.borderWidth);
  expect(styles.borderTopColor).toBe(floatingSurfaceStyles.borderColor);
  expect(styles.borderRadius).toBe(floatingSurfaceStyles.borderRadius);
}

describe("floating surface styling", () => {
  it("uses the shared border tokens for dropdowns", async () => {
    const { el, component } = await mount(
      html`<calcite-dropdown open>
        <calcite-button slot="trigger">Open dropdown</calcite-button>
        <calcite-dropdown-group>
          <calcite-dropdown-item>Item 1</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>`,
    );

    setFloatingSurfaceTokens(el);
    await component.updateComplete;

    expectFloatingSurface(el.shadowRoot, `.${DropdownCSS.wrapper} .calcite-floating-ui-anim`);
  });

  it("uses the shared border tokens for comboboxes", async () => {
    const { el, component } = await mount(
      html`<calcite-combobox open>
        <calcite-combobox-item heading="One" value="one"></calcite-combobox-item>
        <calcite-combobox-item heading="Two" value="two"></calcite-combobox-item>
      </calcite-combobox>`,
    );

    setFloatingSurfaceTokens(el);
    await component.updateComplete;

    expectFloatingSurface(
      el.shadowRoot,
      `.${ComboboxCSS.floatingUIContainer} .calcite-floating-ui-anim`,
    );
  });

  it("uses the shared border tokens for input date pickers", async () => {
    const { el, component } = await mount(
      html`<calcite-input-date-picker open></calcite-input-date-picker>`,
    );

    setFloatingSurfaceTokens(el);
    await component.updateComplete;

    expectFloatingSurface(el.shadowRoot, `.${DatePickerCSS.menu} .calcite-floating-ui-anim`);
  });

  it("uses the shared border tokens for popovers", async () => {
    const { el, component } = await mount(
      html`<>
        <calcite-popover open reference-element="reference-element">Content</calcite-popover>
        <button id="reference-element">Reference element</button>
      </>`,
    );

    setFloatingSurfaceTokens(el);
    await component.updateComplete;

    expectFloatingSurface(
      el.shadowRoot,
      `.${PopoverCSS.positionContainer} .calcite-floating-ui-anim`,
    );
  });

  it("uses the shared border tokens for tooltips", async () => {
    const { el, component } = await mount(
      html`<>
        <calcite-tooltip open reference-element="reference-element">Content</calcite-tooltip>
        <button id="reference-element">Reference element</button>
      </>`,
    );

    setFloatingSurfaceTokens(el);
    await component.updateComplete;

    expectFloatingSurface(
      el.shadowRoot,
      `.${TooltipCSS.positionContainer} .calcite-floating-ui-anim`,
    );
  });

  it("uses the shared border tokens for autocomplete menus", async () => {
    const { el, component } = await mount(
      html`<calcite-autocomplete open>
        <calcite-autocomplete-item
          heading="One"
          label="One"
          value="one"
        ></calcite-autocomplete-item>
        <calcite-autocomplete-item
          heading="Two"
          label="Two"
          value="two"
        ></calcite-autocomplete-item>
      </calcite-autocomplete>`,
    );

    setFloatingSurfaceTokens(el);
    await component.updateComplete;

    expectFloatingSurface(
      el.shadowRoot,
      `.${AutocompleteCSS.floatingUIContainer} .calcite-floating-ui-anim`,
    );
  });

  it("uses the shared border tokens for time picker popovers", async () => {
    const { el, component } = await mount(
      html`<calcite-input-time-picker open></calcite-input-time-picker>`,
    );

    setFloatingSurfaceTokens(el);
    await component.updateComplete;

    const popover = el.shadowRoot.querySelector<HTMLDivElement>("calcite-popover");

    if (!popover?.shadowRoot) {
      throw new Error("Expected input time picker popover to exist");
    }

    expectFloatingSurface(
      popover.shadowRoot,
      `.${PopoverCSS.positionContainer} .calcite-floating-ui-anim`,
    );
  });
});
