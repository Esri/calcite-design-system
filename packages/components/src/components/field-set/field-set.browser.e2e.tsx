import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

type UpdatableElement = HTMLElement & {
  disabled?: boolean;
  prefixAutoWidth?: boolean;
  scale?: string;
  suffixAutoWidth?: boolean;
  updateComplete?: Promise<unknown>;
};

type FieldSetElement = UpdatableElement & {
  shadowRoot: ShadowRoot;
};

async function waitForUpdate(element: UpdatableElement): Promise<void> {
  await element.updateComplete;
}

function getStyleProperty(element: Element, propertyName: string): string {
  return getComputedStyle(element).getPropertyValue(propertyName).trim();
}

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-field-set"));
});

describe("renders", () => {
  renders(() => mount("calcite-field-set"), { display: "block" });
});

describe("structure", () => {
  it("renders a fieldset with a legend", async () => {
    const { el } = await mount<"calcite-field-set">(<calcite-field-set />);
    const container = el.shadowRoot.querySelector<HTMLElement>(".container")!;
    const legend = el.shadowRoot.querySelector<HTMLElement>(".legend")!;

    expect(legend.tagName).toBe("LEGEND");
    expect(container.tagName).toBe("FIELDSET");
  });
});

describe("layout", () => {
  it("applies a layout class based on the layout prop", async () => {
    const { el } = await mount<"calcite-field-set">(<calcite-field-set layout="horizontal" />);
    const fieldWrapper = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.fieldWrapper}`)!;

    expect(fieldWrapper.classList.contains(CSS.fieldWrapperHorizontal)).toBe(true);
    expect(fieldWrapper.classList.contains(CSS.fieldWrapperVertical)).toBe(false);
  });

  it("applies the grid layout class and column count when requested", async () => {
    const { el } = await mount(<calcite-field-set columns={4} layout="grid" />);
    const fieldSet = el as unknown as FieldSetElement;
    const fieldWrapper = fieldSet.shadowRoot.querySelector<HTMLElement>(`.${CSS.fieldWrapper}`)!;

    expect(fieldWrapper.classList.contains(CSS.fieldWrapperGrid)).toBe(true);
    expect(getStyleProperty(fieldSet, "--calcite-internal-field-set-columns")).toBe("4");
  });
});

describe("propagation", () => {
  it("propagates scale to slotted inputs", async () => {
    const { el } = await mount(
      <calcite-field-set scale="s">
        <calcite-input id="direct" />
        <calcite-label>
          Label
          <calcite-input id="nested" />
        </calcite-label>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const inputs = Array.from(fieldSet.querySelectorAll<UpdatableElement>("calcite-input"));

    await Promise.all(inputs.map(waitForUpdate));

    expect(inputs.map((input) => input.scale)).toEqual(["s", "s"]);
  });

  it("disables slotted inputs and restores their prior disabled state", async () => {
    const { el } = await mount(
      <calcite-field-set>
        <calcite-input id="enabled" />
        <calcite-input disabled id="disabled" />
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const enabledInput = fieldSet.querySelector<UpdatableElement>("#enabled")!;
    const disabledInput = fieldSet.querySelector<UpdatableElement>("#disabled")!;

    fieldSet.disabled = true;
    await waitForUpdate(fieldSet);
    await Promise.all([waitForUpdate(enabledInput), waitForUpdate(disabledInput)]);

    expect(enabledInput.disabled).toBe(true);
    expect(disabledInput.disabled).toBe(true);

    fieldSet.disabled = false;
    await waitForUpdate(fieldSet);
    await Promise.all([waitForUpdate(enabledInput), waitForUpdate(disabledInput)]);

    expect(enabledInput.disabled).toBe(false);
    expect(disabledInput.disabled).toBe(true);
  });
});

describe("styling", () => {
  it("applies legend text color from the CSS custom property", async () => {
    const { el } = await mount(
      <calcite-field-set style="--calcite-field-set-legend-text-color: rgb(0, 0, 255);">
        <div slot="legend">Legend text</div>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const legend = fieldSet.shadowRoot.querySelector<HTMLElement>(`.${CSS.legend}`)!;

    expect(getComputedStyle(legend).color).toBe("rgb(0, 0, 255)");
  });

  it("applies spacing from the CSS custom property", async () => {
    const { el } = await mount(<calcite-field-set style="--calcite-field-set-space: 40px;" />);
    const fieldSet = el as unknown as FieldSetElement;
    const fieldWrapper = fieldSet.shadowRoot.querySelector<HTMLElement>(`.${CSS.fieldWrapper}`)!;
    const computedStyle = getComputedStyle(fieldWrapper);

    expect(computedStyle.columnGap).toBe("40px");
    expect(computedStyle.rowGap).toBe("40px");
  });
});

describe("affix width coordination", () => {
  it("syncs prefix width only for label-contained inputs when prefix auto width is enabled", async () => {
    const { el } = await mount(
      <calcite-field-set prefix-auto-width>
        <calcite-input id="direct" prefix-text="ignored" />
        <calcite-label>
          One
          <calcite-input id="short-prefix" prefix-text="pre" suffix-text="px" />
        </calcite-label>
        <calcite-label>
          Two
          <calcite-input id="long-prefix" prefix-text="longer prefix" suffix-text="px" />
        </calcite-label>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const directInput = fieldSet.querySelector<HTMLElement>("#direct")!;
    const shortPrefixInput = fieldSet.querySelector<HTMLElement>("#short-prefix")!;
    const longPrefixInput = fieldSet.querySelector<HTMLElement>("#long-prefix")!;
    const inputs = [directInput, shortPrefixInput, longPrefixInput] as UpdatableElement[];

    await Promise.all(inputs.map(waitForUpdate));

    await vi.waitFor(() => {
      const shortPrefixWidth = getStyleProperty(shortPrefixInput, "--calcite-input-prefix-size");
      const longPrefixWidth = getStyleProperty(longPrefixInput, "--calcite-input-prefix-size");

      expect(shortPrefixWidth).toMatch(/^\d+px$/);
      expect(longPrefixWidth).toBe(shortPrefixWidth);
    });

    expect(getStyleProperty(directInput, "--calcite-input-prefix-size")).toBe("");
    expect(getStyleProperty(shortPrefixInput, "--calcite-input-suffix-size")).toBe("");
  });

  it("clears synced prefix widths when prefix auto width is turned off after mount", async () => {
    const { el } = await mount(
      <calcite-field-set prefix-auto-width>
        <calcite-label>
          One
          <calcite-input id="short-prefix" prefix-text="pre" />
        </calcite-label>
        <calcite-label>
          Two
          <calcite-input id="long-prefix" prefix-text="longer prefix" />
        </calcite-label>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const shortPrefixInput = fieldSet.querySelector<UpdatableElement>("#short-prefix")!;
    const longPrefixInput = fieldSet.querySelector<UpdatableElement>("#long-prefix")!;

    await Promise.all([waitForUpdate(shortPrefixInput), waitForUpdate(longPrefixInput)]);

    await vi.waitFor(() => {
      expect(getStyleProperty(shortPrefixInput, "--calcite-input-prefix-size")).toMatch(/^\d+px$/);
      expect(getStyleProperty(longPrefixInput, "--calcite-input-prefix-size")).toMatch(/^\d+px$/);
    });

    fieldSet.prefixAutoWidth = false;
    await waitForUpdate(fieldSet);
    await Promise.all([waitForUpdate(shortPrefixInput), waitForUpdate(longPrefixInput)]);

    await vi.waitFor(() => {
      expect(getStyleProperty(shortPrefixInput, "--calcite-input-prefix-size")).toBe("");
      expect(getStyleProperty(longPrefixInput, "--calcite-input-prefix-size")).toBe("");
    });
  });

  it("syncs suffix width only for label-contained inputs when suffix auto width is enabled", async () => {
    const { el } = await mount(
      <calcite-field-set suffix-auto-width>
        <calcite-input id="direct" suffix-text="ignored" />
        <calcite-label>
          One
          <calcite-input id="short-suffix" prefix-text="pre" suffix-text="px" />
        </calcite-label>
        <calcite-label>
          Two
          <calcite-input id="long-suffix" prefix-text="pre" suffix-text="centimeters" />
        </calcite-label>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const directInput = fieldSet.querySelector<HTMLElement>("#direct")!;
    const shortSuffixInput = fieldSet.querySelector<HTMLElement>("#short-suffix")!;
    const longSuffixInput = fieldSet.querySelector<HTMLElement>("#long-suffix")!;
    const inputs = [directInput, shortSuffixInput, longSuffixInput] as UpdatableElement[];

    await Promise.all(inputs.map(waitForUpdate));

    await vi.waitFor(() => {
      const shortSuffixWidth = getStyleProperty(shortSuffixInput, "--calcite-input-suffix-size");
      const longSuffixWidth = getStyleProperty(longSuffixInput, "--calcite-input-suffix-size");

      expect(shortSuffixWidth).toMatch(/^\d+px$/);
      expect(longSuffixWidth).toBe(shortSuffixWidth);
    });

    expect(getStyleProperty(directInput, "--calcite-input-suffix-size")).toBe("");
    expect(getStyleProperty(shortSuffixInput, "--calcite-input-prefix-size")).toBe("");
  });

  it("clears synced suffix widths when suffix auto width is turned off after mount", async () => {
    const { el } = await mount(
      <calcite-field-set suffix-auto-width>
        <calcite-label>
          One
          <calcite-input id="short-suffix" suffix-text="px" />
        </calcite-label>
        <calcite-label>
          Two
          <calcite-input id="long-suffix" suffix-text="centimeters" />
        </calcite-label>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const shortSuffixInput = fieldSet.querySelector<UpdatableElement>("#short-suffix")!;
    const longSuffixInput = fieldSet.querySelector<UpdatableElement>("#long-suffix")!;

    await Promise.all([waitForUpdate(shortSuffixInput), waitForUpdate(longSuffixInput)]);

    await vi.waitFor(() => {
      expect(getStyleProperty(shortSuffixInput, "--calcite-input-suffix-size")).toMatch(/^\d+px$/);
      expect(getStyleProperty(longSuffixInput, "--calcite-input-suffix-size")).toMatch(/^\d+px$/);
    });

    fieldSet.suffixAutoWidth = false;
    await waitForUpdate(fieldSet);
    await Promise.all([waitForUpdate(shortSuffixInput), waitForUpdate(longSuffixInput)]);

    await vi.waitFor(() => {
      expect(getStyleProperty(shortSuffixInput, "--calcite-input-suffix-size")).toBe("");
      expect(getStyleProperty(longSuffixInput, "--calcite-input-suffix-size")).toBe("");
    });
  });
});
