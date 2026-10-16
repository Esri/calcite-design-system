import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import { TableHeader } from "./table-header";
import { focusable } from "../../tests/common";
import { CSS_UTILITY } from "../../utils/resources";

describe("focusable", () => {
  focusable(() => mount("calcite-table-header"));
});

describe("a11y attributes", () => {
  it("sets assistive text aria-live only when host value is valid", async () => {
    const { el, reRender } = await mount(TableHeader);
    el.selectionCell = true;
    await reRender();

    const assistiveText = page
      .getBySelector(`calcite-table-header .${CSS_UTILITY.screenReaderText}`)
      .first()
      .element() as HTMLElement;

    expect(assistiveText).toBeDefined();
    expect(assistiveText.getAttribute("aria-live")).toBe(null);

    el.ariaLive = "polite";
    await expect.element(page.elementLocator(assistiveText)).toHaveAttribute("aria-live", "polite");

    el.ariaLive = "invalid";
    await expect.element(page.elementLocator(assistiveText)).not.toHaveAttribute("aria-live");
  });
});
