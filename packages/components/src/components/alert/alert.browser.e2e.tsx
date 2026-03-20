import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  t9n,
  topLayer,
  openClose,
} from "../../tests/commonTests/browser";

describe("defaults", () => {
  defaults(
    () => mount("calcite-alert"),
    [
      {
        propertyName: "autoCloseDuration",
        defaultValue: "medium",
      },
      {
        propertyName: "embedded",
        defaultValue: false,
      },
      {
        propertyName: "queue",
        defaultValue: "last",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-alert"),
    [
      {
        propertyName: "queue",
        value: "last",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount(<calcite-alert open />));
});

describe("openClose", () => {
  openClose(() => mount("calcite-alert"));
});

describe("renders", () => {
  renders(() => mount("calcite-alert"), { visible: false, display: "block" });
});

describe("top layer placement", () => {
  topLayer(() => mount("calcite-alert"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-alert"));
});
