import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  renders,
  accessible,
} from "../../tests/commonTests/browser";

describe("accessible", () => {
  describe("default", () => {
    accessible(() => mount(<calcite-fab label="hello world" text="hello world" />));
  });

  describe("disabled text-enabled", () => {
    accessible(() =>
      mount(<calcite-fab disabled label="hello world" text="hello world" text-enabled />),
    );
  });
});

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

describe("focusable", () => {
  focusable(() => mount("calcite-fab"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-fab"));
});
