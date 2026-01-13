import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  disabled,
  focusable,
  hidden,
  internalLabel,
  t9n,
  accessible,
} from "../../tests/commonTests/browser";

describe("calcite-checkbox", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-checkbox"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-checkbox`));
  });

  describe("is focusable", () => {
    focusable(() => mount("calcite-checkbox"), {
      shadowFocusTargetSelector: ".toggle",
    });

    describe("translation support", () => {
      t9n(() => mount("calcite-checkbox"));
    });
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-checkbox"), {
      focusTarget: {
        tab: "calcite-checkbox",
        click: {
          pointer: "calcite-checkbox",
          method: "body",
        },
      },
    });
  });

  describe("accessible", () => {
    describe("default", () => {
      accessible(() =>
        mount(<calcite-checkbox id="example" label="label" name="example" value="one" />),
      );
    });

    describe("with label", () => {
      accessible(() =>
        mount(
          <calcite-label>
            <calcite-checkbox id="example" name="example" value="one" /> label
          </calcite-label>,
        ),
      );
    });
  });
});
