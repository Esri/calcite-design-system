import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders } from "../../tests/commonTests/browser";

describe("defaults", () => {
  defaults(
    () => mount("calcite-avatar"),
    [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-avatar"));
});

describe("renders", () => {
  renders(() => mount("calcite-avatar"), { display: "inline-block" });
});
