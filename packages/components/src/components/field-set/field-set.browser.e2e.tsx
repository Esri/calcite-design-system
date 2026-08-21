import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects, renders, themed } from "../../tests/commonTests/browser";
import { CSS as FieldRowCSS } from "../field-row/resources";
import { CSS } from "./resources";

type UpdatableElement = HTMLElement & {
  disabled?: boolean;
  prefixAutoWidth?: boolean;
  scale?: string;
  suffixAutoWidth?: boolean;
  updateComplete?: Promise<unknown>;
};

type FieldSetElement = UpdatableElement & {
  disabled?: boolean;
  shadowRoot: ShadowRoot;
};

async function waitForUpdate(element: UpdatableElement): Promise<void> {
  await element.updateComplete;
}

function getStyleProperty(element: Element, propertyName: string): string {
  return getComputedStyle(element).getPropertyValue(propertyName).trim();
}

describe("defaults", () => {
  defaults(() => mount("calcite-field-set"), {
    layout: "vertical",
    legend: undefined,
    prefixAutoWidth: false,
    scale: "m",
    suffixAutoWidth: false,
  });
});

describe("reflects", () => {
  reflects(() => mount("calcite-field-set"), {
    columns: 4,
    layout: "columns",
    prefixAutoWidth: true,
    scale: "s",
    suffixAutoWidth: true,
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-field-set"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-field-set legend="Legend text">
          <calcite-input />
        </calcite-field-set>,
      ),
    { display: "block" },
  );
});

describe("structure", () => {
  it("renders a fieldset with a legend", async () => {
    const { el } = await mount<"calcite-field-set">(<calcite-field-set />);
    const container = el.shadowRoot.querySelector<HTMLElement>(".container")!;
    const legendWrapper = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.legendWrapper}`)!;

    expect(container.tagName).toBe("FIELDSET");
    expect(legendWrapper.hidden).toBe(true);
  });

  it("renders a native legend when the legend property is populated", async () => {
    const { el } = await mount<"calcite-field-set">(<calcite-field-set legend="Legend text" />);
    const fieldSet = el as unknown as FieldSetElement;
    const legend = fieldSet.shadowRoot.querySelector<HTMLElement>(".legend")!;

    await vi.waitFor(() => {
      expect(legend.tagName).toBe("LEGEND");
      expect(legend.textContent).toBe("Legend text");
      expect(legend.parentElement!.hidden).toBe(false);
    });
  });
});

describe("layout", () => {
  it("applies a layout class based on the layout prop", async () => {
    const { el } = await mount<"calcite-field-set">(<calcite-field-set layout="horizontal" />);
    const fieldWrapper = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.fieldWrapper}`)!;

    expect(fieldWrapper.classList.contains(CSS.fieldWrapperHorizontal)).toBe(true);
    expect(fieldWrapper.classList.contains(CSS.fieldWrapperVertical)).toBe(false);
  });

  it("applies the 'columns' layout class and column count when requested", async () => {
    const { el } = await mount(<calcite-field-set columns={4} layout="columns" />);
    const fieldSet = el as unknown as FieldSetElement;
    const fieldWrapper = fieldSet.shadowRoot.querySelector<HTMLElement>(`.${CSS.fieldWrapper}`)!;

    expect(fieldWrapper.classList.contains(CSS.fieldWrapperColumns)).toBe(true);
    expect(getStyleProperty(fieldSet, "--calcite-internal-field-set-columns")).toBe("4");
  });

  it("supports rows that control the layout of their slotted inputs", async () => {
    const { el } = await mount(
      <calcite-field-set scale="s">
        <calcite-field-row columns={2} id="columns-row" layout="columns">
          <calcite-input id="first" />
          <calcite-input id="second" />
        </calcite-field-row>
        <calcite-field-row id="vertical-row">
          <calcite-input id="third" />
        </calcite-field-row>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const columnsRow = fieldSet.querySelector<HTMLElement>("#columns-row")!;
    const verticalRow = fieldSet.querySelector<HTMLElement>("#vertical-row")!;
    const columnsRowContainer = columnsRow.shadowRoot!.querySelector<HTMLElement>(
      `.${FieldRowCSS.container}`,
    )!;
    const verticalRowContainer = verticalRow.shadowRoot!.querySelector<HTMLElement>(
      `.${FieldRowCSS.container}`,
    )!;

    expect(columnsRowContainer.classList.contains(FieldRowCSS.containerColumns)).toBe(true);
    expect(verticalRowContainer.classList.contains(FieldRowCSS.containerVertical)).toBe(true);
  });

  it("supports a row and directly slotted inputs", async () => {
    const { el } = await mount(
      <calcite-field-set>
        <calcite-field-row columns={2} id="columns-row" layout="columns">
          <calcite-input />
          <calcite-input />
        </calcite-field-row>
        <calcite-input id="direct-input" />
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const fieldWrapper = fieldSet.shadowRoot.querySelector<HTMLElement>(`.${CSS.fieldWrapper}`)!;
    const columnsRow = fieldSet.querySelector<HTMLElement>("#columns-row")!;
    const columnsRowContainer = columnsRow.shadowRoot!.querySelector<HTMLElement>(
      `.${FieldRowCSS.container}`,
    )!;

    expect(fieldWrapper.classList.contains(CSS.fieldWrapperVertical)).toBe(true);
    expect(columnsRowContainer.classList.contains(FieldRowCSS.containerColumns)).toBe(true);
    expect(fieldSet.querySelector("#direct-input")).not.toBeNull();
  });

  it("supports a columns Field Set containing rows with independent layouts", async () => {
    const { el } = await mount(
      <calcite-field-set columns={2} layout="columns">
        <calcite-field-row columns={2} id="columns-row" layout="columns">
          <calcite-input />
          <calcite-input />
        </calcite-field-row>
        <calcite-field-row id="vertical-row">
          <calcite-input />
        </calcite-field-row>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const fieldWrapper = fieldSet.shadowRoot.querySelector<HTMLElement>(`.${CSS.fieldWrapper}`)!;
    const columnsRow = fieldSet.querySelector<HTMLElement>("#columns-row")!;
    const verticalRow = fieldSet.querySelector<HTMLElement>("#vertical-row")!;
    const columnsRowContainer = columnsRow.shadowRoot!.querySelector<HTMLElement>(
      `.${FieldRowCSS.container}`,
    )!;
    const verticalRowContainer = verticalRow.shadowRoot!.querySelector<HTMLElement>(
      `.${FieldRowCSS.container}`,
    )!;

    expect(fieldWrapper.classList.contains(CSS.fieldWrapperColumns)).toBe(true);
    expect(getStyleProperty(fieldSet, "--calcite-internal-field-set-columns")).toBe("2");
    expect(columnsRowContainer.classList.contains(FieldRowCSS.containerColumns)).toBe(true);
    expect(verticalRowContainer.classList.contains(FieldRowCSS.containerVertical)).toBe(true);
  });
});

describe("propagation", () => {
  it("supports inputs", async () => {
    const { el } = await mount(
      <calcite-field-set scale="s">
        <calcite-input id="direct" />
        <div>
          <calcite-input id="nested" />
        </div>
        <calcite-input id="trailing" />
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const directInput = fieldSet.querySelector<UpdatableElement>("#direct")!;
    const nestedInput = fieldSet.querySelector<UpdatableElement>("#nested")!;
    const trailingInput = fieldSet.querySelector<UpdatableElement>("#trailing")!;

    await Promise.all([directInput, nestedInput, trailingInput].map(waitForUpdate));

    expect(directInput).not.toBeNull();
    expect(nestedInput).not.toBeNull();
    expect(trailingInput).not.toBeNull();
  });

  it("propagates disabled to slotted components and restores each component's original disabled state", async () => {
    const { el } = await mount(
      <calcite-field-set disabled>
        <calcite-input id="enabled-input" />
        <div>
          <calcite-input disabled id="pre-disabled-input" />
        </div>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const enabledInput = fieldSet.querySelector<UpdatableElement>("#enabled-input")!;
    const preDisabledInput = fieldSet.querySelector<UpdatableElement>("#pre-disabled-input")!;

    await Promise.all([waitForUpdate(enabledInput), waitForUpdate(preDisabledInput)]);

    await vi.waitFor(() => {
      expect(enabledInput.disabled).toBe(true);
      expect(preDisabledInput.disabled).toBe(true);
    });

    fieldSet.disabled = false;
    await waitForUpdate(fieldSet);
    await Promise.all([waitForUpdate(enabledInput), waitForUpdate(preDisabledInput)]);

    await vi.waitFor(() => {
      expect(enabledInput.disabled).toBe(false);
      expect(preDisabledInput.disabled).toBe(true);
    });
  });

  it("propagates disabled to controls nested in slotted calcite-labels and restores original disabled state", async () => {
    const { el } = await mount(
      <calcite-field-set disabled>
        <calcite-label>
          Label
          <calcite-input id="label-enabled-input" />
        </calcite-label>
        <calcite-label>
          Label
          <calcite-input disabled id="label-pre-disabled-input" />
        </calcite-label>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const labelEnabledInput = fieldSet.querySelector<UpdatableElement>("#label-enabled-input")!;
    const labelPreDisabledInput = fieldSet.querySelector<UpdatableElement>(
      "#label-pre-disabled-input",
    )!;

    await Promise.all([waitForUpdate(labelEnabledInput), waitForUpdate(labelPreDisabledInput)]);

    await vi.waitFor(() => {
      expect(labelEnabledInput.disabled).toBe(true);
      expect(labelPreDisabledInput.disabled).toBe(true);
    });

    fieldSet.disabled = false;
    await waitForUpdate(fieldSet);
    await Promise.all([waitForUpdate(labelEnabledInput), waitForUpdate(labelPreDisabledInput)]);

    await vi.waitFor(() => {
      expect(labelEnabledInput.disabled).toBe(false);
      expect(labelPreDisabledInput.disabled).toBe(true);
    });
  });
});

describe("theme", () => {
  themed(
    () =>
      mount(
        <calcite-field-set>
          <calcite-input />
        </calcite-field-set>,
      ),
    {
      "--calcite-field-set-gap": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "gap",
      },
      "--calcite-field-set-input-gap": {
        shadowSelector: `.${CSS.fieldWrapper}`,
        targetProp: "gap",
      },
      "--calcite-field-set-legend-text-color": {
        shadowSelector: `.${CSS.legend}`,
        targetProp: "color",
      },
    },
  );

  themed(
    () =>
      mount(
        <calcite-field-set columns={2} layout="columns">
          <calcite-input />
          <calcite-input />
        </calcite-field-set>,
      ),
    {
      "--calcite-field-set-column-gap": {
        shadowSelector: `.${CSS.fieldWrapper}`,
        targetProp: "columnGap",
      },
    },
  );
});

describe("affix width coordination", () => {
  it("syncs prefix width for direct slotted and wrapped inputs when prefix auto width is enabled", async () => {
    const { el } = await mount(
      <calcite-field-set prefix-auto-width>
        <calcite-input id="direct" prefix-text="ignored direct prefix" />
        <calcite-label>
          One
          <calcite-input id="short-prefix" prefix-text="pre" suffix-text="px" />
        </calcite-label>
        <div>
          <calcite-input id="long-prefix" prefix-text="longer wrapped prefix" suffix-text="px" />
        </div>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const directInput = fieldSet.querySelector<HTMLElement>("#direct")!;
    const shortPrefixInput = fieldSet.querySelector<HTMLElement>("#short-prefix")!;
    const longPrefixInput = fieldSet.querySelector<HTMLElement>("#long-prefix")!;
    const inputs = [directInput, shortPrefixInput, longPrefixInput] as UpdatableElement[];

    await Promise.all(inputs.map(waitForUpdate));

    await vi.waitFor(() => {
      const directPrefixWidth = getStyleProperty(directInput, "--calcite-input-prefix-size");
      const shortPrefixWidth = getStyleProperty(shortPrefixInput, "--calcite-input-prefix-size");
      const longPrefixWidth = getStyleProperty(longPrefixInput, "--calcite-input-prefix-size");

      expect(directPrefixWidth).toMatch(/^\d+px$/);
      expect(shortPrefixWidth).toMatch(/^\d+px$/);
      expect(shortPrefixWidth).toBe(directPrefixWidth);
      expect(longPrefixWidth).toBe(shortPrefixWidth);
    });

    expect(getStyleProperty(shortPrefixInput, "--calcite-input-suffix-size")).toBe("");
  });

  it("clears synced prefix widths when prefix auto width is turned off after mount", async () => {
    const { el } = await mount(
      <calcite-field-set prefix-auto-width>
        <calcite-input id="short-prefix" prefix-text="pre" />
        <div>
          <calcite-input id="long-prefix" prefix-text="longer wrapped prefix" />
        </div>
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

  it("syncs suffix width for direct slotted and wrapped inputs when suffix auto width is enabled", async () => {
    const { el } = await mount(
      <calcite-field-set suffix-auto-width>
        <calcite-input id="direct" suffix-text="very long direct suffix" />
        <calcite-label>
          One
          <calcite-input id="short-suffix" prefix-text="pre" suffix-text="px" />
        </calcite-label>
        <div>
          <calcite-input id="long-suffix" prefix-text="pre" suffix-text="wrapped centimeters" />
        </div>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const directInput = fieldSet.querySelector<HTMLElement>("#direct")!;
    const shortSuffixInput = fieldSet.querySelector<HTMLElement>("#short-suffix")!;
    const longSuffixInput = fieldSet.querySelector<HTMLElement>("#long-suffix")!;
    const inputs = [directInput, shortSuffixInput, longSuffixInput] as UpdatableElement[];

    await Promise.all(inputs.map(waitForUpdate));

    await vi.waitFor(() => {
      const directSuffixWidth = getStyleProperty(directInput, "--calcite-input-suffix-size");
      const shortSuffixWidth = getStyleProperty(shortSuffixInput, "--calcite-input-suffix-size");
      const longSuffixWidth = getStyleProperty(longSuffixInput, "--calcite-input-suffix-size");

      expect(directSuffixWidth).toMatch(/^\d+px$/);
      expect(shortSuffixWidth).toMatch(/^\d+px$/);
      expect(shortSuffixWidth).toBe(directSuffixWidth);
      expect(longSuffixWidth).toBe(shortSuffixWidth);
    });

    expect(getStyleProperty(shortSuffixInput, "--calcite-input-prefix-size")).toBe("");
  });

  it("clears synced suffix widths when suffix auto width is turned off after mount", async () => {
    const { el } = await mount(
      <calcite-field-set suffix-auto-width>
        <calcite-input id="short-suffix" suffix-text="px" />
        <div>
          <calcite-input id="long-suffix" suffix-text="wrapped centimeters" />
        </div>
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
