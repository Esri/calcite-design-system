import { Fragment, h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent } from "@vitest/browser/context";
import { internalLabel, renders, focusable } from "../../tests/commonTests/browser";
import { defaults, reflects, hidden } from "../../tests/commonTests/browser";
import { RadioButton } from "../radio-button/radio-button";
import { RadioButtonGroup } from "./radio-button-group";

describe("calcite-radio-button-group", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-radio-button-group"),
      [
        { propertyName: "layout", defaultValue: "horizontal" },
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "status", defaultValue: "idle" },
        { propertyName: "validationIcon", defaultValue: undefined },
        { propertyName: "validationMessage", defaultValue: undefined },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-radio-button-group"),
      [
        { propertyName: "disabled", value: true },
        { propertyName: "hidden", value: true },
        { propertyName: "layout", value: "horizontal" },
        { propertyName: "name", value: "reflects-name" },
        { propertyName: "required", value: true },
        { propertyName: "scale", value: "m" },
        { propertyName: "status", value: "invalid" },
        { propertyName: "validationIcon", value: true },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-radio-button-group"));

    it("honors hidden attribute when navigating", async () => {
      const { container } = await mount<RadioButtonGroup>(
        <Fragment>
          <calcite-radio-button-group name="first">
            <calcite-label>
              1-1
              <calcite-radio-button value="first" />
            </calcite-label>
            <calcite-label>
              1-2
              <calcite-radio-button value="second" />
            </calcite-label>
            <calcite-label>
              1-3
              <calcite-radio-button value="third" />
            </calcite-label>
          </calcite-radio-button-group>
          <calcite-radio-button-group hidden name="second">
            <calcite-label>
              2-1
              <calcite-radio-button value="first" />
            </calcite-label>
            <calcite-label>
              2-2
              <calcite-radio-button value="second" />
            </calcite-label>
            <calcite-label>
              2-3
              <calcite-radio-button value="third" />
            </calcite-label>
          </calcite-radio-button-group>
          <calcite-radio-button-group name="third">
            <calcite-label>
              3-1
              <calcite-radio-button value="first" />
            </calcite-label>
            <calcite-label>
              3-2
              <calcite-radio-button value="second" />
            </calcite-label>
            <calcite-label>
              3-3
              <calcite-radio-button value="third" />
            </calcite-label>
          </calcite-radio-button-group>
        </Fragment>,
      );

      const firstElement = container.querySelector("calcite-radio-button")!;
      await userEvent.click(firstElement);
      await userEvent.tab();

      const selected = container.querySelector<RadioButton["el"]>("calcite-radio-button[focused]")!;
      const { name, value } = selected;

      expect(name).toBe("third");
      expect(value).toBe("first");
    });
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-radio-button-group`));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-radio-button-group>
            <calcite-label>
              <calcite-radio-button value="one" />
              One
            </calcite-label>
          </calcite-radio-button-group>,
        ),
      { display: "flex" },
    );
  });

  describe("is focusable", () => {
    focusable(
      () =>
        mount(
          <calcite-radio-button-group layout="vertical" name="Options">
            <calcite-label layout="inline">
              <calcite-radio-button disabled value="flowers" />
              Flowers
            </calcite-label>
            <calcite-label layout="inline">
              <calcite-radio-button value="trees" />
              Trees
            </calcite-label>
          </calcite-radio-button-group>,
        ),
      { focusTargetSelector: "calcite-radio-button" },
    );
  });
});
