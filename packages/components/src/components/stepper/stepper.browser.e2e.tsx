import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, t9n } from "../../tests/commonTests/browser";

describe("calcite-stepper", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-stepper"),
      [
        {
          propertyName: "icon",
          defaultValue: false,
        },
        {
          propertyName: "layout",
          defaultValue: "horizontal",
        },
        {
          propertyName: "numbered",
          defaultValue: false,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-stepper"),
      [
        {
          propertyName: "icon",
          value: true,
        },
        {
          propertyName: "layout",
          value: "horizontal",
        },
        {
          propertyName: "numbered",
          value: true,
        },
        {
          propertyName: "scale",
          value: "m",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-stepper"));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-stepper>
            <calcite-stepper-item heading="Step 1" id="step-1">
              <div>Step 1 content</div>
            </calcite-stepper-item>
            <calcite-stepper-item heading="Step 2" id="step-2">
              <div>Step 2 content</div>
            </calcite-stepper-item>
            <calcite-stepper-item heading="Step 3" id="step-3">
              <div>Step 3 content</div>
            </calcite-stepper-item>
            <calcite-stepper-item heading="Step 4" id="step-4">
              <div>Step 4 content</div>
            </calcite-stepper-item>
          </calcite-stepper>,
        ),
      { display: "flex" },
    );
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-stepper"));
  });
});
