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

describe("a11y attributes", () => {
  it("preserves off announcements independently of host aria-live", async () => {
    const { el, reRender } = await mount(TableCell);
    el.selectionCell = true;
    await reRender();

    const assistiveText = page
      .getBySelector(`calcite-table-cell .${CSS_UTILITY.screenReaderText}`)
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
