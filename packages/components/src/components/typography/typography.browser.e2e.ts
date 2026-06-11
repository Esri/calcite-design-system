import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects, renders } from "../../tests/commonTests/browser";

describe("defaults", () => {
  defaults(() => mount("calcite-typography"), [{ propertyName: "truncatePosition", defaultValue: "end" }]);
});

describe("hidden", () => {
  hidden(() => mount("calcite-typography"));
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-typography"),
    [
      { propertyName: "maxLines", value: 2 },
      { propertyName: "truncatePosition", value: "middle" },
    ],
  );
});

describe("renders", () => {
  renders(() => mount("calcite-typography"), { display: "block", visible: false });
});
