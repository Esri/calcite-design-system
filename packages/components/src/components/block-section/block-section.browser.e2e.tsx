import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, t9n } from "../../tests/commonTests/browser";

describe("calcite-block-section", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-block-section"),
      [
        {
          propertyName: "open",
          defaultValue: false,
        },
        {
          propertyName: "expanded",
          defaultValue: false,
        },
        {
          propertyName: "toggleDisplay",
          defaultValue: "button",
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
      () => mount("calcite-block-section"),
      [
        {
          propertyName: "open",
          value: true,
        },
        {
          propertyName: "expanded",
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
    hidden(() => mount("calcite-block-section"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-block-section"), { display: "block" });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-block-section"));
  });
});
