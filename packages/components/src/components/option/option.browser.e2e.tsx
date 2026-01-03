import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, accessible } from "../../tests/commonTests/browser";

describe("calcite-option", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-option"),
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
      () => mount("calcite-option"),
      [
        {
          propertyName: "disabled",
          value: true,
        },
        {
          propertyName: "selected",
          value: true,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-option"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-option"), { display: "inline", visible: false });
  });

  describe("accessible", () => {
    accessible(() => mount("calcite-option"));
  });
});
