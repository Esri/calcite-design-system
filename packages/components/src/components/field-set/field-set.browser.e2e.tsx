import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, vi } from "vitest";
import { defaults, hidden, reflects, renders, themed } from "../../tests/common";
import { CSS } from "./resources";

type UpdatableElement = HTMLElement & {
  disabled?: boolean;
  scale?: string;
  updateComplete?: Promise<unknown>;
};

type FieldSetElement = UpdatableElement & {
  legend?: string;
  shadowRoot: ShadowRoot;
};

async function waitForUpdate(element: UpdatableElement): Promise<void> {
  await element.updateComplete;
}

describe("defaults", () => {
  defaults(() => mount("calcite-field-set"), {
    disabled: false,
    legend: undefined,
    scale: "m",
  });
});

describe("reflects", () => {
  reflects(() => mount("calcite-field-set"), {
    disabled: true,
    scale: "s",
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
  it("renders a fieldset with a hidden legend when no legend is provided", async () => {
    const { el } = await mount<"calcite-field-set">(<calcite-field-set />);
    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;
    const legend = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.legend}`)!;

    expect(container.tagName).toBe("FIELDSET");
    expect(legend.hidden).toBe(true);
  });

  it("renders and updates a native legend", async () => {
    const { el } = await mount<"calcite-field-set">(<calcite-field-set legend="Initial legend" />);
    const fieldSet = el as unknown as FieldSetElement;
    const legend = fieldSet.shadowRoot.querySelector<HTMLElement>(`.${CSS.legend}`)!;

    expect(legend.tagName).toBe("LEGEND");
    expect(legend.textContent).toBe("Initial legend");

    fieldSet.legend = "Updated legend";
    await waitForUpdate(fieldSet);

    expect(legend.textContent).toBe("Updated legend");
  });

  it("renders a slotted legend", async () => {
    const { el } = await mount(
      <calcite-field-set>
        <div slot="legend">Slotted legend</div>
      </calcite-field-set>,
    );
    const legend = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.legend}`)!;

    await vi.waitFor(() => expect(legend.hidden).toBe(false));
    expect(el.querySelector('[slot="legend"]')?.textContent).toBe("Slotted legend");
  });

  it("stacks controls and field groups vertically", async () => {
    const { el } = await mount(
      <calcite-field-set>
        <calcite-input />
        <calcite-field-group />
      </calcite-field-set>,
    );
    const fieldWrapper = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.fieldWrapper}`)!;

    expect(getComputedStyle(fieldWrapper).flexDirection).toBe("column");
  });
});

describe("scale gap values", () => {
  it.each([
    ["s", "8px"],
    ["m", "12px"],
    ["l", "16px"],
  ] as const)("uses the expected gaps at scale %s", async (scale, expectedGap) => {
    const { el } = await mount<"calcite-field-set">(<calcite-field-set scale={scale} />);
    const legend = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.legend}`)!;

    expect(getComputedStyle(legend).marginBottom).toBe(expectedGap);
  });
});

describe("propagation", () => {
  it("propagates scale to direct controls and nested field groups", async () => {
    const { el } = await mount(
      <calcite-field-set scale="s">
        <calcite-input id="input" />
        <calcite-field-group id="group">
          <calcite-input id="nested-input" />
        </calcite-field-group>
      </calcite-field-set>,
    );
    const input = el.querySelector<UpdatableElement>("#input")!;
    const group = el.querySelector<UpdatableElement>("#group")!;
    const nestedInput = el.querySelector<UpdatableElement>("#nested-input")!;

    await Promise.all([input, group, nestedInput].map(waitForUpdate));

    expect(input.scale).toBe("s");
    expect(group.scale).toBe("s");
    expect(nestedInput.scale).toBe("s");
  });

  it("propagates disabled and restores each control's original state", async () => {
    const { el } = await mount(
      <calcite-field-set disabled>
        <calcite-input id="enabled-input" />
        <calcite-input disabled id="pre-disabled-input" />
        <calcite-field-group id="group">
          <calcite-input id="nested-input" />
        </calcite-field-group>
      </calcite-field-set>,
    );
    const fieldSet = el as unknown as FieldSetElement;
    const enabledInput = el.querySelector<UpdatableElement>("#enabled-input")!;
    const preDisabledInput = el.querySelector<UpdatableElement>("#pre-disabled-input")!;
    const group = el.querySelector<UpdatableElement>("#group")!;
    const nestedInput = el.querySelector<UpdatableElement>("#nested-input")!;

    await vi.waitFor(() => {
      expect(enabledInput.disabled).toBe(true);
      expect(preDisabledInput.disabled).toBe(true);
      expect(group.disabled).toBe(true);
      expect(nestedInput.disabled).toBe(true);
    });

    fieldSet.disabled = false;
    await waitForUpdate(fieldSet);

    await vi.waitFor(() => {
      expect(enabledInput.disabled).toBe(false);
      expect(preDisabledInput.disabled).toBe(true);
      expect(group.disabled).toBe(false);
      expect(nestedInput.disabled).toBe(false);
    });
  });

  it("propagates disabled to controls nested in labels", async () => {
    const { el } = await mount(
      <calcite-field-set disabled>
        <calcite-label>
          Label
          <calcite-input id="input" />
        </calcite-label>
      </calcite-field-set>,
    );
    const input = el.querySelector<UpdatableElement>("#input")!;

    await vi.waitFor(() => expect(input.disabled).toBe(true));
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
      "--calcite-field-set-input-gap": {
        shadowSelector: `.${CSS.fieldWrapper}`,
        targetProp: "gap",
      },
      "--calcite-field-set-legend-gap": {
        shadowSelector: `.${CSS.legend}`,
        targetProp: "marginBottom",
      },
      "--calcite-field-set-legend-text-color": {
        shadowSelector: `.${CSS.legend}`,
        targetProp: "color",
      },
    },
  );
});
