import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { defaults, hidden, reflects, renders, themed } from "../../tests/common";
import type { Input } from "../input/input";
import type { FieldSet } from "./field-set";
import { CSS } from "./resources";

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
  it("has no accessible name when no legend is provided", async () => {
    await mount<"calcite-field-set">(<calcite-field-set />);
    await expect.element(page.getByRole("group")).toHaveAccessibleName("");
  });

  it("updates the accessible name when the native legend changes", async () => {
    const { el } = await mount<"calcite-field-set">(<calcite-field-set legend="Initial legend" />);
    const fieldSet = el as FieldSet["el"];
    const group = page.getByRole("group");

    await expect.element(group).toHaveAccessibleName("Initial legend");

    fieldSet.legend = "Updated legend";

    await expect.element(group).toHaveAccessibleName("Updated legend");
  });

  it("uses the slotted legend as the accessible name", async () => {
    await mount(
      <calcite-field-set>
        <div slot="legend">Slotted legend</div>
      </calcite-field-set>,
    );

    await expect.element(page.getByRole("group")).toHaveAccessibleName("Slotted legend");
  });

  it("updates the accessible name when a slotted legend is added and removed", async () => {
    const { el } = await mount<"calcite-field-set">(<calcite-field-set />);
    const group = page.getByRole("group");
    const legend = document.createElement("div");
    legend.slot = "legend";
    legend.textContent = "Slotted legend";

    await expect.element(group).toHaveAccessibleName("");
    el.append(legend);
    await expect.element(group).toHaveAccessibleName("Slotted legend");
    legend.remove();
    await expect.element(group).toHaveAccessibleName("");
  });
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
        <calcite-field-set legend="Applicant details">
          {useLabel ? <calcite-label>First name{firstName}</calcite-label> : firstName}
          {useLabel ? <calcite-label>Last name{lastName}</calcite-label> : lastName}
        </calcite-field-set>
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
