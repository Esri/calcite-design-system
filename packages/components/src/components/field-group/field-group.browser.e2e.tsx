import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { Locator, page, userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects, renders, themed } from "../../tests/common";
import { afterNextFrame } from "../../tests/utils/timing";
import type { Autocomplete } from "../autocomplete/autocomplete";
import type { Input } from "../input/input";
import { CSS } from "./resources";
import type { FieldGroup } from "./field-group";

function getAffixWidth(input: Locator, affix: "prefix" | "suffix"): string {
  return getComputedStyle(getAffix(input, affix).element()).width;
}

function getAffix(input: Locator, affix: "prefix" | "suffix"): Locator {
  return input.getBySelector(`.${affix}`);
}

function getInputNumberButtonWrapper(input: Locator): Locator {
  return input.getBySelector(".number-button-wrapper");
}

function getSuffixFootprintWidth(input: Locator): number {
  const suffixWidth = getAffix(input, "suffix").element().getBoundingClientRect().width;

  return input.element().matches("calcite-input-number")
    ? suffixWidth + getInputNumberButtonWrapper(input).element().getBoundingClientRect().width
    : suffixWidth;
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
  renders(() => mount(<calcite-field-group>content</calcite-field-group>), { display: "block" });
});

describe.each([
  { labelStyle: "label-text", useLabel: false },
  { labelStyle: "calcite-label", useLabel: true },
])("native form support with $labelStyle", ({ useLabel }) => {
  function mountForm(required = false) {
    const firstName = (
      <calcite-input
        label={useLabel ? undefined : "First name"}
        labelText={useLabel ? undefined : "First name"}
        name="firstName"
        value="Alicia"
      />
    );
    const lastName = (
      <calcite-input
        label={useLabel ? undefined : "Last name"}
        labelText={useLabel ? undefined : "Last name"}
        name="lastName"
        required={required}
        value={required ? "" : "Ramos"}
      />
    );

    return mount(
      <form>
        <calcite-field-group>
          <calcite-field-set legend="Applicant details">
            {useLabel ? <calcite-label>First name{firstName}</calcite-label> : firstName}
            {useLabel ? <calcite-label>Last name{lastName}</calcite-label> : lastName}
          </calcite-field-set>
        </calcite-field-group>
        <calcite-button type="button">Preview</calcite-button>
        <calcite-button type="reset">Reset</calcite-button>
        <calcite-button type="submit">Submit</calcite-button>
      </form>,
    );
  }

  it("submits current values and resets to initial values", async () => {
    await mountForm();
    const form = document.querySelector("form")!;
    await expect
      .element(page.getBySelector('calcite-input[name="firstName"]').getByRole("textbox"))
      .toHaveAccessibleName("First name");
    await expect
      .element(page.getBySelector('calcite-input[name="lastName"]').getByRole("textbox"))
      .toHaveAccessibleName("Last name");
    expect(form.querySelector<Input["el"]>('calcite-input[name="firstName"]')!.labelText).toBe(
      useLabel ? undefined : "First name",
    );
    expect(form.querySelector<Input["el"]>('calcite-input[name="lastName"]')!.labelText).toBe(
      useLabel ? undefined : "Last name",
    );
    let submittedData: Record<string, FormDataEntryValue> | undefined;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      submittedData = Object.fromEntries(new FormData(form));
    });

    await userEvent.fill(page.getByRole("textbox", { name: "First name" }), "Maria");
    await userEvent.click(page.getByRole("button", { name: "Submit" }));
    expect(submittedData).toEqual({ firstName: "Maria", lastName: "Ramos" });

    await userEvent.fill(page.getByRole("textbox", { name: "Last name" }), "Lopez");
    await userEvent.click(page.getByRole("button", { name: "Reset" }));
    await vi.waitFor(() => {
      expect(Object.fromEntries(new FormData(form))).toEqual({
        firstName: "Alicia",
        lastName: "Ramos",
      });
    });
  });

  it("blocks submission until a required value is provided", async () => {
    await mountForm(true);
    const form = document.querySelector("form")!;
    const submit = vi.fn((event: Event) => event.preventDefault());
    form.addEventListener("submit", submit);

    await userEvent.click(page.getByRole("button", { name: "Submit" }));
    expect(submit).not.toHaveBeenCalled();

    await userEvent.fill(page.getByRole("textbox", { name: "Last name" }), "Ramos");
    await userEvent.click(page.getByRole("button", { name: "Submit" }));
    expect(submit).toHaveBeenCalledTimes(1);
  });

  it("previews current values without submitting", async () => {
    await mountForm();
    const form = document.querySelector("form")!;
    const submit = vi.fn((event: Event) => event.preventDefault());
    let previewData: Record<string, FormDataEntryValue> | undefined;
    form.addEventListener("submit", submit);
    form.querySelector('calcite-button[type="button"]')!.addEventListener("click", () => {
      previewData = Object.fromEntries(new FormData(form));
    });

    await userEvent.fill(page.getByRole("textbox", { name: "First name" }), "Maria");
    await userEvent.click(page.getByRole("button", { name: "Preview" }));
    expect(previewData).toEqual({ firstName: "Maria", lastName: "Ramos" });
    expect(submit).not.toHaveBeenCalled();
  });
});

describe("affix width coordination", () => {
  it("coordinates affixes inside field sets without crossing nested field groups", async () => {
    await mount(
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
    const group = page.getBySelector("calcite-field-group").first();
    const direct = group.getBySelector("#direct");
    const fieldSetInput = group.getBySelector("#field-set-input");
    const nested = group.getBySelector("#nested");

    await vi.waitFor(() => {
      expect(getAffixWidth(direct, "prefix")).toMatch(/^\d+px$/);
      expect(getAffixWidth(fieldSetInput, "prefix")).toBe(getAffixWidth(direct, "prefix"));
      expect(getAffixWidth(fieldSetInput, "suffix")).toBe(getAffixWidth(direct, "suffix"));
    });

    expect(getAffixWidth(nested, "prefix")).not.toBe(getAffixWidth(direct, "prefix"));
    expect(getAffixWidth(nested, "suffix")).not.toBe(getAffixWidth(direct, "suffix"));
  });

  it("clears affix widths when auto width is disabled", async () => {
    const { el: fieldGroup, reRender } = await mount<FieldGroup>(
      <calcite-field-group prefix-auto-width suffix-auto-width>
        <calcite-input id="short" prefix-text="a" suffix-text="b" />
        <calcite-input
          id="long"
          prefix-text="a much longer prefix"
          suffix-text="a much longer suffix"
        />
      </calcite-field-group>,
    );
    const group = page.getBySelector("calcite-field-group");
    const shortInput = group.getBySelector("#short");
    const longInput = group.getBySelector("#long");

    await vi.waitFor(() => {
      expect(getAffixWidth(shortInput, "prefix")).toBe(getAffixWidth(longInput, "prefix"));
      expect(getAffixWidth(shortInput, "suffix")).toBe(getAffixWidth(longInput, "suffix"));
    });

    fieldGroup.prefixAutoWidth = false;
    fieldGroup.suffixAutoWidth = false;
    await reRender();

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
    const fieldGroup = el as FieldGroup["el"];
    const inputs = page.getBySelector("calcite-field-group").getBySelector("calcite-input");
    const first = inputs.nth(0);
    const second = inputs.nth(1);

    fieldGroup.prefixAutoWidth = false;

    await vi.waitFor(() => {
      expect(getAffixWidth(first, "prefix")).not.toBe(getAffixWidth(second, "prefix"));
    });

    // Check again after a frame to catch late width updates.
    await afterNextFrame();

    expect(getAffixWidth(first, "prefix")).not.toBe(getAffixWidth(second, "prefix"));
  });

  it("uses the latest affix values after rapid auto width changes", async () => {
    const { el: fieldGroup, reRender } = await mount<FieldGroup>(
      <calcite-field-group prefix-auto-width suffix-auto-width>
        <calcite-input prefix-text="short" suffix-text="short" />
        <calcite-input prefix-text="long prefix" suffix-text="long suffix" />
      </calcite-field-group>,
    );
    const inputs = page.getBySelector("calcite-field-group").getBySelector("calcite-input");
    const first = inputs.nth(0);
    const second = inputs.nth(1);

    await vi.waitFor(() => {
      expect(getAffixWidth(first, "suffix")).toBe(getAffixWidth(second, "suffix"));
    });
    const originalWidth = parseFloat(getAffixWidth(first, "suffix"));

    fieldGroup.suffixAutoWidth = false;
    await reRender();
    (first.element() as Input["el"]).suffixText = "a considerably longer suffix";
    fieldGroup.suffixAutoWidth = true;

    await vi.waitFor(() => {
      expect(getAffixWidth(first, "suffix")).toBe(getAffixWidth(second, "suffix"));
      expect(parseFloat(getAffixWidth(first, "suffix"))).toBeGreaterThan(originalWidth);
      expect(getAffixWidth(first, "prefix")).toBe(getAffixWidth(second, "prefix"));
    });
  });

  it("recalculates affix widths when slotted inputs are added and removed", async () => {
    const { el } = await mount(
      <calcite-field-group prefix-auto-width>
        <calcite-input prefix-text="short" />
        <calcite-input prefix-text="medium prefix" />
      </calcite-field-group>,
    );
    const inputs = page.getBySelector("calcite-field-group").getBySelector("calcite-input");
    const first = inputs.nth(0);
    const second = inputs.nth(1);

    await vi.waitFor(() => {
      expect(getAffixWidth(first, "prefix")).toBe(getAffixWidth(second, "prefix"));
    });
    const originalWidth = parseFloat(getAffixWidth(first, "prefix"));
    const addedInput = document.createElement("calcite-input");
    addedInput.prefixText = "a considerably longer prefix";
    el.append(addedInput);
    const added = inputs.nth(2);

    await vi.waitFor(() => {
      expect(getAffixWidth(first, "prefix")).toBe(getAffixWidth(added, "prefix"));
      expect(parseFloat(getAffixWidth(first, "prefix"))).toBeGreaterThan(originalWidth);
    });

    addedInput.remove();

    await vi.waitFor(() => {
      expect(getAffixWidth(first, "prefix")).toBe(getAffixWidth(second, "prefix"));
      expect(parseFloat(getAffixWidth(first, "prefix"))).toBe(originalWidth);
    });
  });

  it("honors the public affix size override once auto width is disabled", async () => {
    const { el: fieldGroup, reRender } = await mount<FieldGroup>(
      <calcite-field-group>
        <calcite-input
          prefix-text="prefix"
          style={{ "--calcite-input-prefix-size": "24px", "--calcite-input-suffix-size": "32px" }}
          suffix-text="suffix"
        />
      </calcite-field-group>,
    );
    const input = page.getBySelector("calcite-field-group").getBySelector("calcite-input");

    fieldGroup.prefixAutoWidth = true;
    fieldGroup.suffixAutoWidth = true;
    await reRender();

    fieldGroup.prefixAutoWidth = false;
    fieldGroup.suffixAutoWidth = false;
    await reRender();

    await vi.waitFor(() => {
      expect(getAffixWidth(input, "prefix")).toBe("24px");
      expect(getAffixWidth(input, "suffix")).toBe("32px");
    });
  });

  it("toggles coordinated widths for inputs inside a field set", async () => {
    const { el: fieldGroup, reRender } = await mount<FieldGroup>(
      <calcite-field-group prefix-auto-width suffix-auto-width>
        <calcite-field-set>
          <calcite-input prefix-text="prefix" suffix-text="px" />
          <calcite-input prefix-text="longer prefix" suffix-text="pixels" />
          <calcite-input prefix-text="abc" suffix-text="centimeters" />
        </calcite-field-set>
      </calcite-field-group>,
    );
    const inputs = page.getBySelector("calcite-field-group").getBySelector("calcite-input");

    await vi.waitFor(() => {
      expect(getAffixWidth(inputs.nth(0), "prefix")).toMatch(/^\d+px$/);
      expect(getAffixWidth(inputs.nth(1), "prefix")).toBe(getAffixWidth(inputs.nth(0), "prefix"));
    });

    fieldGroup.prefixAutoWidth = false;
    fieldGroup.suffixAutoWidth = false;
    await reRender();

    await vi.waitFor(() => {
      expect(getAffixWidth(inputs.nth(0), "prefix")).not.toBe(
        getAffixWidth(inputs.nth(1), "prefix"),
      );
      expect(getAffixWidth(inputs.nth(1), "prefix")).not.toBe(
        getAffixWidth(inputs.nth(2), "prefix"),
      );
    });
  });

  it("recalculates widths when a slotted input affix changes", async () => {
    await mount(
      <calcite-field-group prefix-auto-width>
        <calcite-input id="first" prefix-text="short" />
        <calcite-input id="second" prefix-text="medium" />
      </calcite-field-group>,
    );
    const group = page.getBySelector("calcite-field-group");
    const first = group.getBySelector("#first");
    const second = group.getBySelector("#second");

    await vi.waitFor(() => {
      expect(getAffixWidth(first, "prefix")).toMatch(/^\d+px$/);
    });

    (first.element() as Input["el"]).prefixText = "a much longer prefix";

    await vi.waitFor(() => {
      expect(getAffixWidth(second, "prefix")).toBe(getAffixWidth(first, "prefix"));
    });
  });

  it("recalculates affix widths when a slotted input scale changes", async () => {
    await mount(
      <calcite-field-group prefix-auto-width suffix-auto-width>
        <calcite-input prefix-text="a longer prefix" scale="s" suffix-text="a longer suffix" />
        <calcite-input prefix-text="short" scale="s" suffix-text="short" />
      </calcite-field-group>,
    );
    const inputs = page.getBySelector("calcite-field-group").getBySelector("calcite-input");
    const first = inputs.nth(0);
    const second = inputs.nth(1);

    await vi.waitFor(() => {
      expect(getAffixWidth(first, "prefix")).toBe(getAffixWidth(second, "prefix"));
      expect(getAffixWidth(first, "suffix")).toBe(getAffixWidth(second, "suffix"));
    });
    const originalPrefixWidth = parseFloat(getAffixWidth(first, "prefix"));
    const originalSuffixWidth = parseFloat(getAffixWidth(first, "suffix"));

    (first.element() as Input["el"]).scale = "l";

    await vi.waitFor(() => {
      expect(parseFloat(getAffixWidth(first, "prefix"))).toBeGreaterThan(originalPrefixWidth);
      expect(parseFloat(getAffixWidth(first, "suffix"))).toBeGreaterThan(originalSuffixWidth);
      expect(getAffixWidth(second, "prefix")).toBe(getAffixWidth(first, "prefix"));
      expect(getAffixWidth(second, "suffix")).toBe(getAffixWidth(first, "suffix"));
    });
  });

  it("recalculates widths when a slotted input affix is removed", async () => {
    const { el } = await mount<FieldGroup>(
      <calcite-field-group>
        <calcite-input id="first" prefix-text="a much longer prefix" />
        <calcite-input id="second" prefix-text="medium" />
      </calcite-field-group>,
    );
    const group = page.getBySelector("calcite-field-group");
    const first = group.getBySelector("#first");
    const second = group.getBySelector("#second");
    const secondIndividualWidth = Math.ceil(
      getAffix(second, "prefix").element().getBoundingClientRect().width,
    );

    el.prefixAutoWidth = true;

    await vi.waitFor(() => {
      expect(getAffixWidth(second, "prefix")).not.toBe(`${secondIndividualWidth}px`);
    });

    (first.element() as Input["el"]).prefixText = undefined;

    await vi.waitFor(() => {
      expect(getAffixWidth(second, "prefix")).toBe(`${secondIndividualWidth}px`);
    });
  });

  it("coordinates prefix and suffix widths across supported input components", async () => {
    await mount(
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
    const group = page.getBySelector("calcite-field-group");
    const input = group.getBySelector("#input");
    const inputNumber = group.getBySelector("#input-number");
    const inputText = group.getBySelector("#input-text");
    const autocomplete = group.getBySelector("#autocomplete");

    await vi.waitFor(() => {
      const prefixWidth = getAffixWidth(input, "prefix");

      expect(prefixWidth).toMatch(/^\d+px$/);
      expect(getAffixWidth(inputNumber, "prefix")).toBe(prefixWidth);
      expect(getAffixWidth(inputText, "prefix")).toBe(prefixWidth);
      expect(getAffixWidth(autocomplete, "prefix")).toBe(prefixWidth);

      const suffixWidth = getAffixWidth(input, "suffix");

      expect(suffixWidth).toMatch(/^\d+px$/);
      expect(getSuffixFootprintWidth(inputNumber)).toBeCloseTo(getSuffixFootprintWidth(input));
      expect(getSuffixFootprintWidth(inputText)).toBeCloseTo(getSuffixFootprintWidth(input));
      expect(getSuffixFootprintWidth(autocomplete)).toBeCloseTo(getSuffixFootprintWidth(input));
    });

    await vi.waitFor(() => {
      const inputSuffixRect = getAffix(input, "suffix").element().getBoundingClientRect();
      const inputNumberSuffixRect = getAffix(inputNumber, "suffix")
        .element()
        .getBoundingClientRect();
      const inputTextSuffixRect = getAffix(inputText, "suffix").element().getBoundingClientRect();
      const autocompleteSuffixRect = getAffix(autocomplete, "suffix")
        .element()
        .getBoundingClientRect();

      expect(
        inputNumberSuffixRect.width +
          getInputNumberButtonWrapper(inputNumber).element().getBoundingClientRect().width,
      ).toBeCloseTo(inputSuffixRect.width);
      expect(inputTextSuffixRect.width).toBeCloseTo(inputSuffixRect.width);
      expect(autocompleteSuffixRect.width).toBeCloseTo(inputSuffixRect.width);
      expect(inputNumberSuffixRect.left).toBeCloseTo(inputSuffixRect.left);
      expect(autocompleteSuffixRect.left).toBeCloseTo(inputSuffixRect.left);
    });

    const originalPrefixWidth = parseFloat(getAffixWidth(autocomplete, "prefix"));
    const originalSuffixWidth = parseFloat(getAffixWidth(autocomplete, "suffix"));
    const autocompleteEl = autocomplete.element() as Autocomplete["el"];
    autocompleteEl.prefixText = "the longest autocomplete prefix";
    autocompleteEl.suffixText = "the longest autocomplete suffix";

    await vi.waitFor(() => {
      const prefixWidth = getAffixWidth(autocomplete, "prefix");
      const suffixWidth = getAffixWidth(autocomplete, "suffix");

      expect(parseFloat(prefixWidth)).toBeGreaterThan(originalPrefixWidth);
      expect(parseFloat(suffixWidth)).toBeGreaterThan(originalSuffixWidth);
      expect(getAffixWidth(input, "prefix")).toBe(prefixWidth);
      expect(getAffixWidth(inputNumber, "prefix")).toBe(prefixWidth);
      expect(getAffixWidth(inputText, "prefix")).toBe(prefixWidth);
      expect(getAffixWidth(input, "suffix")).toBe(suffixWidth);
      expect(getAffixWidth(inputText, "suffix")).toBe(suffixWidth);
    });
  });

  it("overrides deprecated affix size CSS custom properties across supported input components while coordinating", async () => {
    await mount(
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
    const group = page.getBySelector("calcite-field-group");
    const input = group.getBySelector("#input");
    const inputNumber = group.getBySelector("#input-number");
    const inputText = group.getBySelector("#input-text");
    const autocomplete = group.getBySelector("#autocomplete");
    const unconstrained = group.getBySelector("#unconstrained");

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
      expect(getSuffixFootprintWidth(input)).toBeCloseTo(suffixFootprintWidth);
      expect(getSuffixFootprintWidth(inputNumber)).toBeCloseTo(suffixFootprintWidth);
      expect(getSuffixFootprintWidth(inputText)).toBeCloseTo(suffixFootprintWidth);
      expect(getSuffixFootprintWidth(autocomplete)).toBeCloseTo(suffixFootprintWidth);
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
