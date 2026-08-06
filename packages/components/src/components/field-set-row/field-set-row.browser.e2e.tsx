import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects, renders } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("defaults", () => {
  defaults(() => mount("calcite-field-set-row"), {
    layout: "vertical",
  });
});

describe("reflects", () => {
  reflects(() => mount("calcite-field-set-row"), {
    columns: 2,
    layout: "columns",
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-field-set-row"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-field-set-row>
          <calcite-input />
        </calcite-field-set-row>,
      ),
    { display: "block" },
  );
});

describe("layout", () => {
  it("applies the requested layout to its slotted content", async () => {
    const { el } = await mount(
      <calcite-field-set-row columns={2} layout="columns">
        <calcite-input />
        <calcite-input />
      </calcite-field-set-row>,
    );
    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;

    expect(container.classList.contains(CSS.containerColumns)).toBe(true);
    expect(container.style.getPropertyValue("--calcite-internal-field-set-row-columns")).toBe("2");
  });

  it("uses the vertical layout by default", async () => {
    const { el } = await mount(
      <calcite-field-set-row>
        <calcite-input />
      </calcite-field-set-row>,
    );
    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;

    expect(container.classList.contains(CSS.containerVertical)).toBe(true);
  });
});
