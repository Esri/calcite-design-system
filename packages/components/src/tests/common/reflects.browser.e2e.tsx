import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { Action } from "../../components/action/action";
import { reflects } from "./reflects";

describe(reflects, () => {
  describe("declarations", () => {
    beforeEach(() => {
      vi.spyOn(document, "createElement").mockImplementation(() => {
        throw new Error("Reflection declaration checks must not create elements");
      });
    });

    describe("property names", () => {
      reflects(Action, ["active", "iconFlipRtl"]);
    });

    describe("reflection flags", () => {
      reflects(Action, { active: true, text: false });
    });

    describe("inherited properties", () => {
      class DerivedAction extends Action {}

      reflects(DerivedAction, ["active"]);
    });
  });

  it("allows mounting after inspecting declarations", async () => {
    const { el } = await mount("calcite-action");
    el.active = true;
    await expect.element(el).toHaveAttribute("active", "");
    el.active = false;
    await expect.element(el).not.toHaveAttribute("active");
  });
});
