import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects, renders, themed } from "../../tests/common";
import { nextFrame } from "../../utils/dom";
import type { Autocomplete } from "../autocomplete/autocomplete";
import type { Input } from "../input/input";
import type { InputNumber } from "../input-number/input-number";
import type { InputText } from "../input-text/input-text";
import { CSS } from "./resources";
import type { FieldGroup } from "./field-group";

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
  return (
    (getAffixElement(element, "suffix")?.getBoundingClientRect().width ?? 0) +
    (getInputNumberButtonWrapper(element)?.getBoundingClientRect().width ?? 0)
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
    const direct = el.querySelector<Input["el"]>("#direct")!;
    const fieldSetInput = el.querySelector<Input["el"]>("#field-set-input")!;
    const nested = el.querySelector<Input["el"]>("#nested")!;

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
    const fieldGroup = el as FieldGroup["el"];
    const shortInput = el.querySelector<Input["el"]>("#short")!;
    const longInput = el.querySelector<Input["el"]>("#long")!;

    await vi.waitFor(() => {
      expect(getAffixWidth(shortInput, "prefix")).toBe(getAffixWidth(longInput, "prefix"));
      expect(getAffixWidth(shortInput, "suffix")).toBe(getAffixWidth(longInput, "suffix"));
    });

    fieldGroup.prefixAutoWidth = false;
    fieldGroup.suffixAutoWidth = false;
    await nextFrame();

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
    const [first, second] = Array.from(el.querySelectorAll<Input["el"]>("calcite-input"));

    fieldGroup.prefixAutoWidth = false;

    await vi.waitFor(() => {
      expect(getAffixWidth(first, "prefix")).not.toBe(getAffixWidth(second, "prefix"));
    });

    await nextFrame();

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
    const fieldGroup = el as FieldGroup["el"];
    const input = el.querySelector<Input["el"]>("#input")!;

    fieldGroup.prefixAutoWidth = true;
    fieldGroup.suffixAutoWidth = true;
    await nextFrame();

    fieldGroup.prefixAutoWidth = false;
    fieldGroup.suffixAutoWidth = false;
    await nextFrame();

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
    const fieldGroup = el as FieldGroup["el"];
    const inputs = Array.from(el.querySelectorAll<Input["el"]>("calcite-input"));

    await vi.waitFor(() => {
      expect(getAffixWidth(inputs[0], "prefix")).toMatch(/^\d+px$/);
      expect(getAffixWidth(inputs[1], "prefix")).toBe(getAffixWidth(inputs[0], "prefix"));
    });

    fieldGroup.prefixAutoWidth = false;
    fieldGroup.suffixAutoWidth = false;
    await nextFrame();

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
    const first = el.querySelector<Input["el"]>("#first")!;
    const second = el.querySelector<Input["el"]>("#second")!;

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
    const first = el.querySelector<Input["el"]>("#first")!;
    const second = el.querySelector<Input["el"]>("#second")!;
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
    const input = el.querySelector<Input["el"]>("#input")!;
    const inputNumber = el.querySelector<InputNumber["el"]>("#input-number")!;
    const inputText = el.querySelector<InputText["el"]>("#input-text")!;
    const autocomplete = el.querySelector<Autocomplete["el"]>("#autocomplete")!;

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

    await nextFrame();

    const inputSuffixRect = getAffixElement(input, "suffix")!.getBoundingClientRect();
    const inputNumberSuffixRect = getAffixElement(inputNumber, "suffix")!.getBoundingClientRect();
    const inputTextSuffixRect = getAffixElement(inputText, "suffix")!.getBoundingClientRect();
    const autocompleteSuffixRect = getAffixElement(autocomplete, "suffix")!.getBoundingClientRect();

    expect(
      inputNumberSuffixRect.width +
        getInputNumberButtonWrapper(inputNumber)!.getBoundingClientRect().width,
    ).toBeCloseTo(inputSuffixRect.width);
    expect(inputTextSuffixRect.width).toBeCloseTo(inputSuffixRect.width);
    expect(autocompleteSuffixRect.width).toBeCloseTo(inputSuffixRect.width);
    expect(inputNumberSuffixRect.left).toBeCloseTo(inputSuffixRect.left);
    expect(autocompleteSuffixRect.left).toBeCloseTo(inputSuffixRect.left);

    autocomplete.prefixText = "the longest autocomplete prefix";
    autocomplete.suffixText = "the longest autocomplete suffix";

    await vi.waitFor(() => {
      const prefixWidth = getAffixWidth(autocomplete, "prefix");
      const suffixWidth = getAffixWidth(autocomplete, "suffix");

      expect(getAffixWidth(input, "prefix")).toBe(prefixWidth);
      expect(getAffixWidth(inputNumber, "prefix")).toBe(prefixWidth);
      expect(getAffixWidth(inputText, "prefix")).toBe(prefixWidth);
      expect(getAffixWidth(input, "suffix")).toBe(suffixWidth);
      expect(getAffixWidth(inputText, "suffix")).toBe(suffixWidth);
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
    const input = el.querySelector<Input["el"]>("#input")!;
    const inputNumber = el.querySelector<InputNumber["el"]>("#input-number")!;
    const inputText = el.querySelector<InputText["el"]>("#input-text")!;
    const autocomplete = el.querySelector<Autocomplete["el"]>("#autocomplete")!;
    const unconstrained = el.querySelector<Input["el"]>("#unconstrained")!;

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
