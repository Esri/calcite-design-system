import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-fab", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-fab"),
      [
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "appearance",
          defaultValue: "solid",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-fab"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-fab"), { display: "flex" });
  });
});
