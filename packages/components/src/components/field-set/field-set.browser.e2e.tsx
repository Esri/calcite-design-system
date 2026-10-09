import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, vi } from "vitest";
import { defaults, hidden, reflects, renders, themed } from "../../tests/common";
import { CSS } from "./resources";

type UpdatableElement = HTMLElement & {
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
    legend: undefined,
  });
});

describe("reflects", () => {
  reflects(() => mount("calcite-field-set"), {});
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
        shadowSelector: `.${CSS.fieldWrapper}`,
        targetProp: "gap",
      },
      "--calcite-field-set-legend-text-color": {
        shadowSelector: `.${CSS.legend}`,
        targetProp: "color",
      },
    },
  );
});
