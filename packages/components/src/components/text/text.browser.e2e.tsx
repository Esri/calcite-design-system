import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders } from "../../tests/common";

describe("defaults", () => {
  defaults(() => mount("calcite-text"), [{ propertyName: "tooltipEnabled", defaultValue: false }]);
});

describe("hidden", () => {
  hidden(() => mount("calcite-text"));
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-text"),
    [
      { propertyName: "maxLines", value: 2 },
      { propertyName: "truncatePosition", value: "middle" },
    ],
  );
});

describe("renders", () => {
  renders(() => mount("calcite-text"), { display: "block", visible: false });
});
