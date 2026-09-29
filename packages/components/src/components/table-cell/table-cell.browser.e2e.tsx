import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import { TableCell } from "./table-cell";
import { defaults, focusable } from "../../tests/common";
import { CSS_UTILITY } from "../../utils/resources";

describe("defaults", () => {
  defaults(() => mount("calcite-table-cell"), [{ propertyName: "scale", defaultValue: "m" }]);
});

describe("focusable", () => {
  focusable(() => mount("calcite-table-cell"));
});

describe("aria-live", () => {
  it("sets assistive text aria-live only when host value is valid", async () => {
    const { el, reRender } = await mount(TableCell);
    el.selectionCell = true;
    await reRender();

    const assistiveText = page
      .getBySelector(`calcite-table-cell .${CSS_UTILITY.screenReaderText}`)
      .first()
      .element() as HTMLElement;

    expect(assistiveText).toBeDefined();
    expect(assistiveText.getAttribute("aria-live")).toBe(null);

    el.ariaLive = "polite";
    await reRender();

    expect(assistiveText.getAttribute("aria-live")).toBe("polite");

    el.ariaLive = "invalid";
    await reRender();

    expect(assistiveText.getAttribute("aria-live")).toBe(null);
  });
});
