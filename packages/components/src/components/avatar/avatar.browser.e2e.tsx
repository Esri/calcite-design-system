import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import { accessible, defaults, hidden, renders } from "../../tests/commonTests/browser";

describe("accessible", () => {
  accessible(() => mount("calcite-avatar"));
  accessible(() => mount(<calcite-avatar thumbnail="https://placehold.co/120x120" />));
});

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
