import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import { focusable } from "../../tests/commonTests/browser";
import { TableCell } from "./table-cell";

describe("focusable", () => {
  focusable(() => mount("calcite-table-cell"));
});

describe("aria-live", () => {
  it("sets assistive text aria-live only when host value is valid", async () => {
    const { el, reRender } = await mount(TableCell);
    el.selectionCell = true;
    await reRender();

    const assistiveText = page
      .getBySelector("calcite-table-cell .assistive-text")
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
