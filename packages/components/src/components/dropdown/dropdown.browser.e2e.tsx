import { mount } from "@arcgis/lumina-compiler/testing";
import { describe } from "vitest";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-dropdown", () => {
  describe("defaults", () => {
    defaults(() => mount("calcite-dropdown"), {
      offsetDistance: 0,
      offsetSkidding: 0,
      scale: "m",
      placement: "bottom-start",
    });
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-dropdown"),
      [
        {
          propertyName: "offsetDistance",
          value: 10,
        },
        {
          propertyName: "offsetSkidding",
          value: 10,
        },
        {
          propertyName: "scale",
          value: "m",
        },
        {
          propertyName: "widthScale",
          value: "m",
        },
        {
          propertyName: "width",
          value: "m",
        },
        {
          propertyName: "placement",
          value: "bottom-start",
        },
      ],
    );
  });
});
