import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-form"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-form>
          <calcite-field-set />
        </calcite-form>,
      ),
    { display: "block" },
  );
});

describe("structure", () => {
  it("renders slotted field sets inside the form container", async () => {
    const { el } = await mount(
      <calcite-form>
        <calcite-field-set />
        <calcite-field-set />
      </calcite-form>,
    );

    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;
    const fieldSets = el.querySelectorAll("calcite-field-set");

    expect(container.tagName).toBe("DIV");
    expect(fieldSets).toHaveLength(2);
  });
});
