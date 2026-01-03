import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, accessible } from "../../tests/commonTests/browser";

describe("calcite-option-group", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-option-group"),
      [
        {
          propertyName: "disabled",
          defaultValue: false,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-option-group"),
      [
        {
          propertyName: "disabled",
          value: true,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-option-group"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-option-group"), { display: "inline", visible: false });
  });

  describe("accessible", () => {
    accessible(() => mount("calcite-option-group"));
  });
});
