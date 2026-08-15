import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  renders,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { CSS } from "./resources";

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

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-fab"), {
      "--calcite-fab-background-color": {
        targetProp: "--calcite-button-background-color",
        shadowSelector: `.${CSS.button}`,
      },
      "--calcite-fab-border-color": {
        targetProp: "--calcite-button-border-color",
        shadowSelector: `.${CSS.button}`,
      },
      "--calcite-fab-corner-radius": {
        targetProp: "--calcite-button-corner-radius",
        shadowSelector: `.${CSS.button}`,
      },
      "--calcite-fab-text-color": {
        targetProp: "--calcite-button-text-color",
        shadowSelector: `.${CSS.button}`,
      },
      "--calcite-fab-shadow": {
        targetProp: "boxShadow",
        shadowSelector: `.${CSS.button}`,
      },
    });
  });

  describe("loader", () => {
    themed(() => mount(<calcite-fab loading />), {
      "--calcite-fab-loader-color": {
        targetProp: "--calcite-button-loader-color",
        shadowSelector: `.${CSS.button}`,
      },
    });
  });
});
