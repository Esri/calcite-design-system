import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects, renders, themed } from "../../tests/commonTests/browser";
import { CSS as FieldSetRowCSS } from "../field-set-row/resources";
import { CSS } from "./resources";

type UpdatableElement = HTMLElement & {
  disabled?: boolean;
  prefixAutoWidth?: boolean;
  readOnly?: boolean;
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
    disabled: false,
    layout: "vertical",
    legend: undefined,
    prefixAutoWidth: false,
    readOnly: false,
    scale: "m",
    suffixAutoWidth: false,
  });
});

describe("reflects", () => {
  reflects(() => mount("calcite-field-set"), {
    columns: 4,
    disabled: true,
    layout: "columns",
    prefixAutoWidth: true,
    readOnly: true,
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
        <calcite-field-set-row columns={2} id="columns-row" layout="columns">
          <calcite-input id="first" />
          <calcite-input id="second" />
        </calcite-field-set-row>
        <calcite-field-set-row id="vertical-row">
          <calcite-input id="third" />
        </calcite-field-set-row>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const columnsRow = fieldSet.querySelector<HTMLElement>("#columns-row")!;
    const verticalRow = fieldSet.querySelector<HTMLElement>("#vertical-row")!;
    const columnsRowContainer = columnsRow.shadowRoot!.querySelector<HTMLElement>(
      `.${FieldSetRowCSS.container}`,
    )!;
    const verticalRowContainer = verticalRow.shadowRoot!.querySelector<HTMLElement>(
      `.${FieldSetRowCSS.container}`,
    )!;
    const inputs = Array.from(fieldSet.querySelectorAll<UpdatableElement>("calcite-input"));

    await Promise.all(inputs.map(waitForUpdate));

    expect(columnsRowContainer.classList.contains(FieldSetRowCSS.containerColumns)).toBe(true);
    expect(verticalRowContainer.classList.contains(FieldSetRowCSS.containerVertical)).toBe(true);
    expect(inputs.map((input) => input.scale)).toEqual(["s", "s", "s"]);
  });

  it("supports a row and directly slotted inputs", async () => {
    const { el } = await mount(
      <calcite-field-set>
        <calcite-field-set-row columns={2} id="columns-row" layout="columns">
          <calcite-input />
          <calcite-input />
        </calcite-field-set-row>
        <calcite-input id="direct-input" />
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const fieldWrapper = fieldSet.shadowRoot.querySelector<HTMLElement>(`.${CSS.fieldWrapper}`)!;
    const columnsRow = fieldSet.querySelector<HTMLElement>("#columns-row")!;
    const columnsRowContainer = columnsRow.shadowRoot!.querySelector<HTMLElement>(
      `.${FieldSetRowCSS.container}`,
    )!;

    expect(fieldWrapper.classList.contains(CSS.fieldWrapperVertical)).toBe(true);
    expect(columnsRowContainer.classList.contains(FieldSetRowCSS.containerColumns)).toBe(true);
    expect(fieldSet.querySelector("#direct-input")).not.toBeNull();
  });

  it("supports a columns Field Set containing rows with independent layouts", async () => {
    const { el } = await mount(
      <calcite-field-set columns={2} layout="columns">
        <calcite-field-set-row columns={2} id="columns-row" layout="columns">
          <calcite-input />
          <calcite-input />
        </calcite-field-set-row>
        <calcite-field-set-row id="vertical-row">
          <calcite-input />
        </calcite-field-set-row>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const fieldWrapper = fieldSet.shadowRoot.querySelector<HTMLElement>(`.${CSS.fieldWrapper}`)!;
    const columnsRow = fieldSet.querySelector<HTMLElement>("#columns-row")!;
    const verticalRow = fieldSet.querySelector<HTMLElement>("#vertical-row")!;
    const columnsRowContainer = columnsRow.shadowRoot!.querySelector<HTMLElement>(
      `.${FieldSetRowCSS.container}`,
    )!;
    const verticalRowContainer = verticalRow.shadowRoot!.querySelector<HTMLElement>(
      `.${FieldSetRowCSS.container}`,
    )!;

    expect(fieldWrapper.classList.contains(CSS.fieldWrapperColumns)).toBe(true);
    expect(getStyleProperty(fieldSet, "--calcite-internal-field-set-columns")).toBe("2");
    expect(columnsRowContainer.classList.contains(FieldSetRowCSS.containerColumns)).toBe(true);
    expect(verticalRowContainer.classList.contains(FieldSetRowCSS.containerVertical)).toBe(true);
  });
});

describe("propagation", () => {
  it("propagates scale to slotted Input component", async () => {
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
    const inputs = Array.from(fieldSet.querySelectorAll<UpdatableElement>("calcite-input"));

    await Promise.all([...inputs].map(waitForUpdate));

    expect(inputs.map((input) => input.scale)).toEqual(["s", "s", "s"]);
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

  it("sets slotted inputs to read-only and restores their prior read-only state", async () => {
    const { el } = await mount(
      <calcite-field-set>
        <calcite-input id="editable" />
        <calcite-input id="read-only" readOnly />
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const editableInput = fieldSet.querySelector<UpdatableElement>("#editable")!;
    const readOnlyInput = fieldSet.querySelector<UpdatableElement>("#read-only")!;

    fieldSet.readOnly = true;
    await waitForUpdate(fieldSet);
    await Promise.all([waitForUpdate(editableInput), waitForUpdate(readOnlyInput)]);

    expect(editableInput.readOnly).toBe(true);
    expect(readOnlyInput.readOnly).toBe(true);

    fieldSet.readOnly = false;
    await waitForUpdate(fieldSet);
    await Promise.all([waitForUpdate(editableInput), waitForUpdate(readOnlyInput)]);

    expect(editableInput.readOnly).toBe(false);
    expect(readOnlyInput.readOnly).toBe(true);
  });

  it("propagates to compatible controls while leaving composite descendants to their owner", async () => {
    const { el } = await mount(
      <calcite-field-set scale="s">
        <calcite-checkbox id="checkbox" />
        <calcite-radio-button id="radio-button" value="standalone" />
        <calcite-radio-button-group id="radio-button-group" name="framework">
          <calcite-radio-button id="grouped-radio-button" value="react" />
        </calcite-radio-button-group>
        <calcite-switch id="switch" />
        <calcite-select id="select">
          <calcite-option label="Option" value="option" />
        </calcite-select>
        <calcite-combobox id="combobox">
          <calcite-combobox-item heading="Option" value="option" />
        </calcite-combobox>
        <calcite-slider id="slider" max={100} min={0} value={50} />
        <calcite-segmented-control id="segmented-control">
          <calcite-segmented-control-item checked value="option">
            Option
          </calcite-segmented-control-item>
        </calcite-segmented-control>
        <calcite-field-set id="nested-field-set" scale="l">
          <calcite-checkbox id="nested-checkbox" />
        </calcite-field-set>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const controls = [
      "checkbox",
      "radio-button",
      "radio-button-group",
      "switch",
      "select",
      "combobox",
      "slider",
      "segmented-control",
    ].map((id) => fieldSet.querySelector<UpdatableElement>(`#${id}`)!);
    const groupedRadioButton = fieldSet.querySelector<UpdatableElement>("#grouped-radio-button")!;
    const nestedFieldSet = fieldSet.querySelector<UpdatableElement>("#nested-field-set")!;
    const nestedCheckbox = fieldSet.querySelector<UpdatableElement>("#nested-checkbox")!;

    await Promise.all(
      [...controls, groupedRadioButton, nestedFieldSet, nestedCheckbox].map(waitForUpdate),
    );

    expect(controls.map((control) => control.scale)).toEqual(Array(controls.length).fill("s"));
    expect(groupedRadioButton.scale).toBe("s");
    expect(nestedFieldSet.scale).toBe("l");
    expect(nestedCheckbox.scale).toBe("l");

    fieldSet.disabled = true;
    await waitForUpdate(fieldSet);
    await Promise.all([...controls, groupedRadioButton].map(waitForUpdate));

    expect(controls.map((control) => control.disabled)).toEqual(Array(controls.length).fill(true));
    expect(groupedRadioButton.disabled).toBe(true);

    fieldSet.disabled = false;
    await waitForUpdate(fieldSet);
    await Promise.all(controls.map(waitForUpdate));

    expect(controls.map((control) => control.disabled)).toEqual(Array(controls.length).fill(false));
  });
});

describe("Label propagation", () => {
  it("propagates scale to inputs wrapped by Label components", async () => {
    const { el } = await mount(
      <calcite-field-set scale="s">
        <calcite-label>
          First label
          <calcite-input id="first" />
        </calcite-label>
        <calcite-label>
          Second label
          <calcite-input id="second" />
        </calcite-label>
        <calcite-label>
          Third label
          <calcite-input id="third" />
        </calcite-label>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const inputs = Array.from(fieldSet.querySelectorAll<UpdatableElement>("calcite-input"));

    await Promise.all(inputs.map(waitForUpdate));

    expect(inputs.map((input) => input.scale)).toEqual(["s", "s", "s"]);
  });

  it("disables inputs wrapped by Label components and restores their prior disabled state", async () => {
    const { el } = await mount(
      <calcite-field-set>
        <calcite-label>
          Enabled label
          <calcite-input id="enabled" />
        </calcite-label>
        <calcite-label>
          Disabled label
          <calcite-input disabled id="disabled" />
        </calcite-label>
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

  it("sets inputs wrapped by Label components to read-only and restores their prior read-only state", async () => {
    const { el } = await mount(
      <calcite-field-set>
        <calcite-label>
          Editable label
          <calcite-input id="editable" />
        </calcite-label>
        <calcite-label>
          Read-only label
          <calcite-input id="read-only" readOnly />
        </calcite-label>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const editableInput = fieldSet.querySelector<UpdatableElement>("#editable")!;
    const readOnlyInput = fieldSet.querySelector<UpdatableElement>("#read-only")!;

    fieldSet.readOnly = true;
    await waitForUpdate(fieldSet);
    await Promise.all([waitForUpdate(editableInput), waitForUpdate(readOnlyInput)]);

    expect(editableInput.readOnly).toBe(true);
    expect(readOnlyInput.readOnly).toBe(true);

    fieldSet.readOnly = false;
    await waitForUpdate(fieldSet);
    await Promise.all([waitForUpdate(editableInput), waitForUpdate(readOnlyInput)]);

    expect(editableInput.readOnly).toBe(false);
    expect(readOnlyInput.readOnly).toBe(true);
  });

  it("propagates scale and read-only state to Text Areas wrapped by Label components", async () => {
    const { el } = await mount(
      <calcite-field-set scale="s">
        <calcite-label>
          Editable label
          <calcite-text-area id="editable" />
        </calcite-label>
        <calcite-label>
          Read-only label
          <calcite-text-area id="read-only" readOnly />
        </calcite-label>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const editableTextArea = fieldSet.querySelector<UpdatableElement>("#editable")!;
    const readOnlyTextArea = fieldSet.querySelector<UpdatableElement>("#read-only")!;

    await Promise.all([waitForUpdate(editableTextArea), waitForUpdate(readOnlyTextArea)]);

    expect(editableTextArea.scale).toBe("s");
    expect(readOnlyTextArea.scale).toBe("s");

    fieldSet.readOnly = true;
    await waitForUpdate(fieldSet);
    await Promise.all([waitForUpdate(editableTextArea), waitForUpdate(readOnlyTextArea)]);

    expect(editableTextArea.readOnly).toBe(true);
    expect(readOnlyTextArea.readOnly).toBe(true);

    fieldSet.readOnly = false;
    await waitForUpdate(fieldSet);
    await Promise.all([waitForUpdate(editableTextArea), waitForUpdate(readOnlyTextArea)]);

    expect(editableTextArea.readOnly).toBe(false);
    expect(readOnlyTextArea.readOnly).toBe(true);
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
