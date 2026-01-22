import { describe, expect, it } from "vitest";
import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  internalLabel,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import { NUDGE_DELAY_IN_MS } from "../input/resources";
import { Input } from "./input";

describe("calcite-input", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-input"),
      [
        {
          propertyName: "status",
          defaultValue: "idle",
        },
        {
          propertyName: "alignment",
          defaultValue: "start",
        },
        {
          propertyName: "numberButtonType",
          defaultValue: "vertical",
        },
        {
          propertyName: "type",
          defaultValue: "text",
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "value",
          defaultValue: "",
        },
        {
          propertyName: "validationIcon",
          defaultValue: undefined,
        },
        {
          propertyName: "validationMessage",
          defaultValue: undefined,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-input"),
      [
        {
          propertyName: "status",
          value: "valid",
        },
        {
          propertyName: "alignment",
          value: "center",
        },
        {
          propertyName: "numberButtonType",
          value: "horizontal",
        },
        {
          propertyName: "type",
          value: "color",
        },
        {
          propertyName: "scale",
          value: "s",
        },
        {
          propertyName: "validationIcon",
          value: true,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-input"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-input`));
  });

  describe("renders", () => {
    renders(() => mount("calcite-input"), { display: "block" });
  });

  describe("is focusable", () => {
    focusable(() => mount(`calcite-input`), {
      shadowFocusTargetSelector: "input",
    });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-input"));
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-input"));
  });

  describe("nudging", () => {
    function nudgeReadOnlyToggle(el: Input["el"]): Promise<void> {
      return new Promise<void>((resolve) => {
        el.addEventListener(
          "calciteInputInput",
          () => {
            el.readOnly = true;
            window.setTimeout(() => {
              el.readOnly = false;
              resolve();
            }, NUDGE_DELAY_IN_MS * 2);
          },
          { once: true },
        );
      });
    }

    it("stops nudging if readOnly is modified", async () => {
      const { el } = await mount<Input>(<calcite-input type="number" />);

      const nudgeUpReadOnlyToggle = nudgeReadOnlyToggle(el);
      const nudgeUpButton = page.getByTestId("number-button-up");
      await userEvent.click(nudgeUpButton);
      await nudgeUpReadOnlyToggle;

      expect(el.value).toBe("1");

      const nudgeDownReadOnlyToggle = nudgeReadOnlyToggle(el);

      const nudgeDownButton = page.getByTestId("number-button-down");
      await userEvent.click(nudgeDownButton);
      await nudgeDownReadOnlyToggle;

      expect(el.value).toBe("0");
    });
  });
});
