import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-field-set"));
});

describe("renders", () => {
  renders(() => mount("calcite-field-set"), { display: "block" });
});

describe("default styles", () => {
  it("renders a fieldset with a legend", async () => {
    const { el } = await mount<"calcite-field-set">(<calcite-field-set />);
    const container = el.shadowRoot.querySelector<HTMLElement>(".container")!;
    const legend = el.shadowRoot.querySelector<HTMLElement>(".legend")!;

    expect(legend.tagName).toBe("LEGEND");
    expect(container.tagName).toBe("FIELDSET");
  });

  it("applies a layout class based on the layout prop", async () => {
    const { el } = await mount<"calcite-field-set">(<calcite-field-set layout="horizontal" />);
    const fieldWrapper = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.fieldWrapper}`)!;

    expect(fieldWrapper.classList.contains(CSS.fieldWrapperHorizontal)).toBe(true);
    expect(fieldWrapper.classList.contains(CSS.fieldWrapperVertical)).toBe(false);
  });
});
