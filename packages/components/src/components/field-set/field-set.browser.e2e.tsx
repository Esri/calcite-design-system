import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { defaults, hidden, reflects, renders, themed } from "../../tests/common";
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
