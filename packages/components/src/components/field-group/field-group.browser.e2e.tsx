import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects, renders, themed } from "../../tests/common";
import { CSS } from "./resources";

type UpdatableElement = HTMLElement & {
  prefixAutoWidth?: boolean;
  prefixText?: string;
  suffixAutoWidth?: boolean;
  suffixText?: string;
  updateComplete?: Promise<unknown>;
};

async function waitForUpdate(element: UpdatableElement): Promise<void> {
  await element.updateComplete;
}

function getAffixWidth(element: Element, affix: "prefix" | "suffix"): string {
  const affixElement = getAffixElement(element, affix);

  return affixElement ? getComputedStyle(affixElement).width : "";
}

function getAffixElement(element: Element, affix: "prefix" | "suffix"): HTMLElement | undefined {
  const input = element.matches("calcite-autocomplete")
    ? element.shadowRoot?.querySelector("calcite-input")
    : element;

  return input?.shadowRoot?.querySelector<HTMLElement>(`.${affix}`) ?? undefined;
}

function getInputNumberButtonWrapper(element: Element): HTMLElement | undefined {
  return element.matches("calcite-input-number")
    ? (element.shadowRoot?.querySelector<HTMLElement>(".number-button-wrapper") ?? undefined)
    : undefined;
}

function getSuffixFootprintWidth(element: Element): number {
  return Math.ceil(
    (getAffixElement(element, "suffix")?.getBoundingClientRect().width ?? 0) +
      (getInputNumberButtonWrapper(element)?.getBoundingClientRect().width ?? 0),
  );
}

describe("defaults", () => {
  defaults(() => mount("calcite-field-group"), {
    columns: undefined,
    layout: "vertical",
    prefixAutoWidth: false,
    suffixAutoWidth: false,
  });
});

describe("reflects", () => {
  reflects(() => mount("calcite-field-group"), {
    columns: 2,
    layout: "columns",
    prefixAutoWidth: true,
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
      expect(getAffixWidth(direct, "prefix")).toMatch(/^\d+px$/);
      expect(getAffixWidth(fieldSetInput, "prefix")).toBe(getAffixWidth(direct, "prefix"));
      expect(getAffixWidth(fieldSetInput, "suffix")).toBe(getAffixWidth(direct, "suffix"));
    });

    expect(getAffixWidth(nested, "prefix")).not.toBe(getAffixWidth(direct, "prefix"));
    expect(getAffixWidth(nested, "suffix")).not.toBe(getAffixWidth(direct, "suffix"));
  });

  it("clears affix widths when auto width is disabled", async () => {
    const { el } = await mount(
      <calcite-field-group prefix-auto-width suffix-auto-width>
        <calcite-input id="short" prefix-text="a" suffix-text="b" />
        <calcite-input
          id="long"
          prefix-text="a much longer prefix"
          suffix-text="a much longer suffix"
        />
      </calcite-field-group>,
    );
    const fieldGroup = el as UpdatableElement;
    const shortInput = el.querySelector<UpdatableElement>("#short")!;
    const longInput = el.querySelector<UpdatableElement>("#long")!;

    await vi.waitFor(() => {
      expect(getAffixWidth(shortInput, "prefix")).toBe(getAffixWidth(longInput, "prefix"));
      expect(getAffixWidth(shortInput, "suffix")).toBe(getAffixWidth(longInput, "suffix"));
    });

    fieldGroup.prefixAutoWidth = false;
    fieldGroup.suffixAutoWidth = false;
    await waitForUpdate(fieldGroup);

    await vi.waitFor(() => {
      expect(getAffixWidth(shortInput, "prefix")).not.toBe(getAffixWidth(longInput, "prefix"));
      expect(getAffixWidth(shortInput, "suffix")).not.toBe(getAffixWidth(longInput, "suffix"));
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
    const [first, second] = Array.from(el.querySelectorAll<UpdatableElement>("calcite-input"));

    fieldGroup.prefixAutoWidth = false;

    await vi.waitFor(() => {
      expect(getAffixWidth(first, "prefix")).not.toBe(getAffixWidth(second, "prefix"));
    });

    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    expect(getAffixWidth(first, "prefix")).not.toBe(getAffixWidth(second, "prefix"));
  });

  it("honors the public affix size override once auto width is disabled", async () => {
    const { el } = await mount(
      <calcite-field-group>
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

    fieldGroup.prefixAutoWidth = true;
    fieldGroup.suffixAutoWidth = true;
    await waitForUpdate(fieldGroup);

    fieldGroup.prefixAutoWidth = false;
    fieldGroup.suffixAutoWidth = false;
    await waitForUpdate(fieldGroup);

    await vi.waitFor(() => {
      expect(getAffixWidth(input, "prefix")).toBe("24px");
      expect(getAffixWidth(input, "suffix")).toBe("32px");
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
      expect(getAffixWidth(inputs[0], "prefix")).toMatch(/^\d+px$/);
      expect(getAffixWidth(inputs[1], "prefix")).toBe(getAffixWidth(inputs[0], "prefix"));
    });

    fieldGroup.prefixAutoWidth = false;
    fieldGroup.suffixAutoWidth = false;
    await waitForUpdate(fieldGroup);

    await vi.waitFor(() => {
      expect(getAffixWidth(inputs[0], "prefix")).not.toBe(getAffixWidth(inputs[1], "prefix"));
      expect(getAffixWidth(inputs[1], "prefix")).not.toBe(getAffixWidth(inputs[2], "prefix"));
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
      expect(getAffixWidth(first, "prefix")).toMatch(/^\d+px$/);
    });

    first.prefixText = "a much longer prefix";

    await vi.waitFor(() => {
      expect(getAffixWidth(second, "prefix")).toBe(getAffixWidth(first, "prefix"));
    });
  });

  it("recalculates widths when a slotted input affix is removed", async () => {
    const { el } = await mount(
      <calcite-field-group prefix-auto-width>
        <calcite-input id="first" prefix-text="a much longer prefix" />
        <calcite-input id="second" prefix-text="medium" />
      </calcite-field-group>,
    );
    const first = el.querySelector<UpdatableElement>("#first")!;
    const second = el.querySelector<UpdatableElement>("#second")!;
    const secondIndividualWidth = Math.ceil(
      second.shadowRoot!.querySelector<HTMLElement>(".prefix")!.getBoundingClientRect().width,
    );

    await vi.waitFor(() => {
      expect(getAffixWidth(second, "prefix")).not.toBe(`${secondIndividualWidth}px`);
    });

    first.prefixText = undefined;

    await vi.waitFor(() => {
      expect(getAffixWidth(second, "prefix")).toBe(`${secondIndividualWidth}px`);
    });
  });

  it("coordinates prefix and suffix widths across supported input components", async () => {
    const { el } = await mount(
      <calcite-field-group prefix-auto-width suffix-auto-width>
        <calcite-input id="input" prefix-text="short" suffix-text="a" />
        <calcite-input-number id="input-number" prefix-text="medium" suffix-text="medium" />
        <calcite-input-text
          id="input-text"
          prefix-text="longer prefix"
          suffix-text="longer suffix"
        />
        <calcite-autocomplete id="autocomplete" prefix-text="short" suffix-text="result" />
      </calcite-field-group>,
    );
    const input = el.querySelector<UpdatableElement>("#input")!;
    const inputNumber = el.querySelector<UpdatableElement>("#input-number")!;
    const inputText = el.querySelector<UpdatableElement>("#input-text")!;
    const autocomplete = el.querySelector<UpdatableElement>("#autocomplete")!;

    await vi.waitFor(() => {
      const prefixWidth = getAffixWidth(input, "prefix");

      expect(prefixWidth).toMatch(/^\d+px$/);
      expect(getAffixWidth(inputNumber, "prefix")).toBe(prefixWidth);
      expect(getAffixWidth(inputText, "prefix")).toBe(prefixWidth);
      expect(getAffixWidth(autocomplete, "prefix")).toBe(prefixWidth);

      const suffixWidth = getAffixWidth(input, "suffix");

      expect(suffixWidth).toMatch(/^\d+px$/);
      expect(getSuffixFootprintWidth(inputNumber)).toBe(getSuffixFootprintWidth(input));
      expect(getSuffixFootprintWidth(inputText)).toBe(getSuffixFootprintWidth(input));
      expect(getSuffixFootprintWidth(autocomplete)).toBe(getSuffixFootprintWidth(input));
    });

    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    const suffixWidth = getAffixWidth(input, "suffix");

    expect(
      Number.parseInt(getAffixWidth(inputNumber, "suffix"), 10) +
        Math.ceil(getInputNumberButtonWrapper(inputNumber)!.getBoundingClientRect().width),
    ).toBe(Number.parseInt(suffixWidth, 10));
    expect(getAffixWidth(inputText, "suffix")).toBe(suffixWidth);
    expect(getAffixWidth(autocomplete, "suffix")).toBe(suffixWidth);
    expect(Math.ceil(getAffixElement(inputNumber, "suffix")!.getBoundingClientRect().width)).toBe(
      Number.parseInt(getAffixWidth(inputNumber, "suffix"), 10),
    );
    expect(Math.ceil(getAffixElement(autocomplete, "suffix")!.getBoundingClientRect().width)).toBe(
      Number.parseInt(suffixWidth, 10),
    );
    expect(Math.ceil(getAffixElement(inputNumber, "suffix")!.getBoundingClientRect().left)).toBe(
      Math.ceil(getAffixElement(input, "suffix")!.getBoundingClientRect().left),
    );
    expect(Math.ceil(getAffixElement(autocomplete, "suffix")!.getBoundingClientRect().left)).toBe(
      Math.ceil(getAffixElement(input, "suffix")!.getBoundingClientRect().left),
    );

    inputText.prefixText = "the longest prefix";

    await vi.waitFor(() => {
      const prefixWidth = getAffixWidth(inputText, "prefix");

      expect(getAffixWidth(input, "prefix")).toBe(prefixWidth);
      expect(getAffixWidth(inputNumber, "prefix")).toBe(prefixWidth);
    });
  });

  it("overrides deprecated affix size CSS custom properties across supported input components while coordinating", async () => {
    const { el } = await mount(
      <calcite-field-group prefix-auto-width suffix-auto-width>
        <calcite-input
          id="input"
          prefix-text="a very long prefix"
          style={{ "--calcite-input-prefix-size": "5px", "--calcite-input-suffix-size": "5px" }}
          suffix-text="a very long suffix"
        />
        <calcite-input-number
          id="input-number"
          prefix-text="a very long prefix"
          style={{ "--calcite-input-prefix-size": "5px", "--calcite-input-suffix-size": "5px" }}
          suffix-text="a very long suffix"
        />
        <calcite-input-text
          id="input-text"
          prefix-text="a very long prefix"
          style={{ "--calcite-input-prefix-size-x": "5px", "--calcite-input-suffix-size-x": "5px" }}
          suffix-text="a very long suffix"
        />
        <calcite-autocomplete
          id="autocomplete"
          prefix-text="a very long prefix"
          style={{
            "--calcite-autocomplete-input-prefix-size": "5px",
            "--calcite-autocomplete-input-suffix-size": "5px",
          }}
          suffix-text="a very long suffix"
        />
        <calcite-input
          id="unconstrained"
          prefix-text="a very long prefix"
          suffix-text="a very long suffix"
        />
      </calcite-field-group>,
    );
    const input = el.querySelector<UpdatableElement>("#input")!;
    const inputNumber = el.querySelector<UpdatableElement>("#input-number")!;
    const inputText = el.querySelector<UpdatableElement>("#input-text")!;
    const autocomplete = el.querySelector<UpdatableElement>("#autocomplete")!;
    const unconstrained = el.querySelector<UpdatableElement>("#unconstrained")!;

    await vi.waitFor(() => {
      const prefixWidth = getAffixWidth(unconstrained, "prefix");

      expect(prefixWidth).toMatch(/^\d+px$/);
      expect(prefixWidth).not.toBe("5px");
      expect(getAffixWidth(input, "prefix")).toBe(prefixWidth);
      expect(getAffixWidth(inputNumber, "prefix")).toBe(prefixWidth);
      expect(getAffixWidth(inputText, "prefix")).toBe(prefixWidth);
      expect(getAffixWidth(autocomplete, "prefix")).toBe(prefixWidth);

      const suffixFootprintWidth = getSuffixFootprintWidth(unconstrained);

      expect(getAffixWidth(unconstrained, "suffix")).not.toBe("5px");
      expect(getSuffixFootprintWidth(input)).toBe(suffixFootprintWidth);
      expect(getSuffixFootprintWidth(inputNumber)).toBe(suffixFootprintWidth);
      expect(getSuffixFootprintWidth(inputText)).toBe(suffixFootprintWidth);
      expect(getSuffixFootprintWidth(autocomplete)).toBe(suffixFootprintWidth);
    });
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
