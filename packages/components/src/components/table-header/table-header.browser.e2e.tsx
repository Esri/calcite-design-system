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
  it("preserves off announcements independently of host aria-live", async () => {
    const { el, reRender } = await mount(TableHeader);
    el.selectionCell = true;
    await reRender();

    const assistiveText = page
      .getBySelector(`calcite-table-header .${CSS_UTILITY.screenReaderText}`)
      .first()
      .element() as HTMLElement;

    expect(assistiveText).toBeDefined();
    expect(assistiveText.getAttribute("aria-live")).toBe("off");

    el.ariaLive = "assertive";
    await expect.element(page.elementLocator(assistiveText)).toHaveAttribute("aria-live", "off");

    el.ariaLive = "invalid";
    await expect.element(page.elementLocator(assistiveText)).toHaveAttribute("aria-live", "off");
  });
});
