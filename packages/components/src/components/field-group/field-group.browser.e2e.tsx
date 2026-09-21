import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects, renders, themed } from "../../tests/common";
import { CSS } from "./resources";

type UpdatableElement = HTMLElement & {
  disabled?: boolean;
  prefixAutoWidth?: boolean;
  prefixText?: string;
  scale?: string;
  suffixAutoWidth?: boolean;
  suffixText?: string;
  updateComplete?: Promise<unknown>;
};

async function waitForUpdate(element: UpdatableElement): Promise<void> {
  await element.updateComplete;
}

function getStyleProperty(element: Element, propertyName: string): string {
  return getComputedStyle(element).getPropertyValue(propertyName).trim();
}

describe("defaults", () => {
  defaults(() => mount("calcite-field-group"), {
    columns: undefined,
    disabled: false,
    layout: "vertical",
    prefixAutoWidth: false,
    scale: "m",
    suffixAutoWidth: false,
  });
});

describe("reflects", () => {
  reflects(() => mount("calcite-field-group"), {
    columns: 2,
    disabled: true,
    layout: "columns",
    prefixAutoWidth: true,
    scale: "s",
    suffixAutoWidth: true,
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-field-group"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-field-group>
          <calcite-field-set>
            <calcite-input />
          </calcite-field-set>
        </calcite-field-group>,
      ),
    { display: "block" },
  );
});

describe("layout", () => {
  it("applies layout classes and the column count", async () => {
    const { el } = await mount(
      <calcite-field-group columns={2} layout="columns">
        <calcite-input />
        <calcite-input />
      </calcite-field-group>,
    );
    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;

    expect(container.classList.contains(CSS.containerColumns)).toBe(true);
    expect(container.style.getPropertyValue("--calcite-internal-field-group-columns")).toBe("2");
  });

  it("uses the public columns custom property", async () => {
    const { el } = await mount(
      <calcite-field-group layout="columns" style={{ "--calcite-field-group-columns": "3" }}>
        <calcite-input />
        <calcite-input />
        <calcite-input />
      </calcite-field-group>,
    );
    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;

    expect(getComputedStyle(container).gridTemplateColumns.split(" ")).toHaveLength(3);
  });

  it("places slotted field sets on the same row in horizontal layout", async () => {
    const { el } = await mount(
      <calcite-field-group layout="horizontal">
        <calcite-field-set id="first" legend="First">
          <calcite-input />
        </calcite-field-set>
        <calcite-field-set id="second" legend="Second">
          <calcite-input />
        </calcite-field-set>
      </calcite-field-group>,
    );
    const first = el.querySelector<HTMLElement>("#first")!.getBoundingClientRect();
    const second = el.querySelector<HTMLElement>("#second")!.getBoundingClientRect();

    expect(second.top).toBe(first.top);
    expect(second.left).toBeGreaterThan(first.left);
  });
});

describe("scale propagation", () => {
  it("propagates scale through nested field groups", async () => {
    const { el } = await mount(
      <calcite-field-group scale="s">
        <calcite-field-group id="direct">
          <calcite-field-set />
        </calcite-field-group>
        <calcite-field-set id="direct-field-set" />
        <calcite-field-group>
          <calcite-field-set id="nested" />
        </calcite-field-group>
      </calcite-field-group>,
    );
    const direct = el.querySelector<UpdatableElement>("#direct")!;
    const nested = el.querySelector<UpdatableElement>("#nested")!;

    expect(direct.scale).toBe("s");
    expect(nested.scale).toBe("s");
  });

  it("updates the scale of slotted field sets when the field group scale changes", async () => {
    const { el } = await mount(
      <calcite-field-group>
        <calcite-input id="direct-input" />
        <calcite-field-set id="direct" />
        <calcite-field-group>
          <calcite-field-set id="nested" />
        </calcite-field-group>
      </calcite-field-group>,
    );
    const fieldGroup = el as UpdatableElement;
    const directInput = el.querySelector<UpdatableElement>("#direct-input")!;
    const direct = el.querySelector<UpdatableElement>("#direct")!;
    const nested = el.querySelector<UpdatableElement>("#nested")!;

    fieldGroup.scale = "l";

    await waitForUpdate(fieldGroup);
    await Promise.all([waitForUpdate(directInput), waitForUpdate(direct), waitForUpdate(nested)]);

    expect(directInput.scale).toBe("l");
    expect(direct.scale).toBe("l");
    expect(nested.scale).toBe("l");
  });
});

describe("disabled propagation", () => {
  it("propagates disabled to slotted field sets and restores their original state", async () => {
    const { el } = await mount(
      <calcite-field-group disabled>
        <calcite-input id="direct-input" />
        <calcite-field-set id="enabled-field-set" />
        <calcite-field-set disabled id="pre-disabled-field-set" />
      </calcite-field-group>,
    );
    const fieldGroup = el as UpdatableElement;
    const directInput = el.querySelector<UpdatableElement>("#direct-input")!;
    const enabledFieldSet = el.querySelector<UpdatableElement>("#enabled-field-set")!;
    const preDisabledFieldSet = el.querySelector<UpdatableElement>("#pre-disabled-field-set")!;

    await vi.waitFor(() => expect(directInput.disabled).toBe(true));

    expect(enabledFieldSet.disabled).toBe(true);
    expect(preDisabledFieldSet.disabled).toBe(true);

    fieldGroup.disabled = false;
    await waitForUpdate(fieldGroup);
    await Promise.all([waitForUpdate(enabledFieldSet), waitForUpdate(preDisabledFieldSet)]);

    expect(directInput.disabled).toBe(false);
    expect(enabledFieldSet.disabled).toBe(false);
    expect(preDisabledFieldSet.disabled).toBe(true);
  });
});

describe("affix width coordination", () => {
  it("coordinates affixes inside field sets without crossing nested field groups", async () => {
    const { el } = await mount(
      <calcite-field-group prefix-auto-width suffix-auto-width>
        <calcite-input id="direct" prefix-text="P" suffix-text="px" />
        <calcite-field-set>
          <calcite-input id="field-set-input" prefix-text="Long prefix" suffix-text="centimeters" />
        </calcite-field-set>
        <calcite-field-group>
          <calcite-input id="nested" prefix-text="Nested prefix" suffix-text="nested suffix" />
        </calcite-field-group>
      </calcite-field-group>,
    );
    const direct = el.querySelector<UpdatableElement>("#direct")!;
    const fieldSetInput = el.querySelector<UpdatableElement>("#field-set-input")!;
    const nested = el.querySelector<UpdatableElement>("#nested")!;

    await vi.waitFor(() => {
      expect(getStyleProperty(direct, "--calcite-input-prefix-size")).toMatch(/^\d+px$/);
      expect(getStyleProperty(fieldSetInput, "--calcite-input-prefix-size")).toBe(
        getStyleProperty(direct, "--calcite-input-prefix-size"),
      );
      expect(getStyleProperty(fieldSetInput, "--calcite-input-suffix-size")).toBe(
        getStyleProperty(direct, "--calcite-input-suffix-size"),
      );
    });

    expect(getStyleProperty(nested, "--calcite-input-prefix-size")).toBe("");
    expect(getStyleProperty(nested, "--calcite-input-suffix-size")).toBe("");
  });

  it("clears coordinated affix widths when auto width is disabled", async () => {
    const { el } = await mount(
      <calcite-field-group prefix-auto-width suffix-auto-width>
        <calcite-input id="input" prefix-text="Prefix" suffix-text="Suffix" />
      </calcite-field-group>,
    );
    const fieldGroup = el as UpdatableElement;
    const input = el.querySelector<UpdatableElement>("#input")!;

    await vi.waitFor(() => {
      expect(getStyleProperty(input, "--calcite-input-prefix-size")).toMatch(/^\d+px$/);
      expect(getStyleProperty(input, "--calcite-input-suffix-size")).toMatch(/^\d+px$/);
    });

    fieldGroup.prefixAutoWidth = false;
    fieldGroup.suffixAutoWidth = false;
    await waitForUpdate(fieldGroup);

    await vi.waitFor(() => {
      expect(getStyleProperty(input, "--calcite-input-prefix-size")).toBe("");
      expect(getStyleProperty(input, "--calcite-input-suffix-size")).toBe("");
    });
  });

  it("does not reapply stale widths after auto width is disabled during measurement", async () => {
    const { el } = await mount(
      <calcite-field-group prefix-auto-width>
        <calcite-input prefix-text="prefix" />
        <calcite-input prefix-text="longer prefix" />
      </calcite-field-group>,
    );
    const fieldGroup = el as UpdatableElement;

    fieldGroup.prefixAutoWidth = false;

    await vi.waitFor(() => {
      expect(
        getStyleProperty(el.querySelector("calcite-input")!, "--calcite-input-prefix-size"),
      ).toBe("");
    });

    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    expect(
      getStyleProperty(el.querySelector("calcite-input")!, "--calcite-input-prefix-size"),
    ).toBe("");
  });

  it("restores consumer-provided inline affix widths when auto width is disabled", async () => {
    const { el } = await mount(
      <calcite-field-group prefix-auto-width suffix-auto-width>
        <calcite-input
          id="input"
          prefix-text="prefix"
          style={{ "--calcite-input-prefix-size": "24px", "--calcite-input-suffix-size": "32px" }}
          suffix-text="suffix"
        />
      </calcite-field-group>,
    );
    const fieldGroup = el as UpdatableElement;
    const input = el.querySelector<UpdatableElement>("#input")!;

    fieldGroup.prefixAutoWidth = false;
    fieldGroup.suffixAutoWidth = false;
    await waitForUpdate(fieldGroup);

    await vi.waitFor(() => {
      expect(getStyleProperty(input, "--calcite-input-prefix-size")).toBe("24px");
      expect(getStyleProperty(input, "--calcite-input-suffix-size")).toBe("32px");
    });
  });

  it("toggles coordinated widths for inputs inside a field set", async () => {
    const { el } = await mount(
      <calcite-field-group prefix-auto-width suffix-auto-width>
        <calcite-field-set>
          <calcite-input prefix-text="prefix" suffix-text="px" />
          <calcite-input prefix-text="longer prefix" suffix-text="pixels" />
          <calcite-input prefix-text="abc" suffix-text="centimeters" />
        </calcite-field-set>
      </calcite-field-group>,
    );
    const fieldGroup = el as UpdatableElement;
    const inputs = Array.from(el.querySelectorAll<UpdatableElement>("calcite-input"));

    await vi.waitFor(() => {
      expect(getStyleProperty(inputs[0], "--calcite-input-prefix-size")).toMatch(/^\d+px$/);
      expect(getStyleProperty(inputs[1], "--calcite-input-prefix-size")).toBe(
        getStyleProperty(inputs[0], "--calcite-input-prefix-size"),
      );
    });

    fieldGroup.prefixAutoWidth = false;
    fieldGroup.suffixAutoWidth = false;
    await waitForUpdate(fieldGroup);

    await vi.waitFor(() => {
      inputs.forEach((input) => {
        expect(getStyleProperty(input, "--calcite-input-prefix-size")).toBe("");
        expect(getStyleProperty(input, "--calcite-input-suffix-size")).toBe("");
      });
    });
  });

  it("recalculates widths when a slotted input affix changes", async () => {
    const { el } = await mount(
      <calcite-field-group prefix-auto-width>
        <calcite-input id="first" prefix-text="short" />
        <calcite-input id="second" prefix-text="medium" />
      </calcite-field-group>,
    );
    const first = el.querySelector<UpdatableElement>("#first")!;
    const second = el.querySelector<UpdatableElement>("#second")!;

    await vi.waitFor(() => {
      expect(getStyleProperty(first, "--calcite-input-prefix-size")).toMatch(/^\d+px$/);
    });

    first.prefixText = "a much longer prefix";

    await vi.waitFor(() => {
      expect(getStyleProperty(second, "--calcite-input-prefix-size")).toBe(
        getStyleProperty(first, "--calcite-input-prefix-size"),
      );
    });
  });
});

describe("scale gap values", () => {
  it.each([
    ["s", "8px"],
    ["m", "12px"],
    ["l", "16px"],
  ] as const)("uses the scale gap for column layouts at scale %s", async (scale, expectedGap) => {
    const { el } = await mount(
      <calcite-field-group columns={2} layout="columns" scale={scale}>
        <calcite-input />
        <calcite-input />
      </calcite-field-group>,
    );
    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;

    expect(getComputedStyle(container).columnGap).toBe(expectedGap);
  });
});

describe("theme", () => {
  themed(
    () =>
      mount(
        <calcite-field-group>
          <calcite-input />
        </calcite-field-group>,
      ),
    {
      "--calcite-field-group-gap": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "gap",
      },
    },
  );

  themed(
    () =>
      mount(
        <calcite-field-group columns={2} layout="columns">
          <calcite-input />
          <calcite-input />
        </calcite-field-group>,
      ),
    {
      "--calcite-field-group-column-gap": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "columnGap",
      },
    },
  );
});
