import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-input-time-zone", () => {
  mockConsole();

  // describe("defaults", () => {
  //   defaults(() => mount(simpleTestProvider), [
  //     { propertyName: "disabled", defaultValue: false },
  //     { propertyName: "maxItems", defaultValue: 0 },
  //     { propertyName: "messageOverrides", defaultValue: undefined },
  //     { propertyName: "mode", defaultValue: "offset" },
  //     { propertyName: "open", defaultValue: false },
  //     { propertyName: "overlayPositioning", defaultValue: "absolute" },
  //     { propertyName: "scale", defaultValue: "m" },
  //     { propertyName: "status", defaultValue: "idle" },
  //     { propertyName: "validationIcon", defaultValue: undefined },
  //     { propertyName: "validationMessage", defaultValue: undefined },
  //   ]);
  // });
  // describe("reflects", () => {
  //   reflects(() => mount(simpleTestProvider), [
  //     { propertyName: "disabled", value: true },
  //     { propertyName: "maxItems", value: 0 },
  //     { propertyName: "mode", value: "offset" },
  //     { propertyName: "open", value: true },
  //     { propertyName: "scale", value: "m" },
  //     { propertyName: "overlayPositioning", value: "absolute" },
  //     { propertyName: "status", value: "invalid" },
  //     { propertyName: "validationIcon", value: true },
  //   ]);
  // });

  describe("hidden", () => {
    hidden(() => mount("calcite-input-time-zone"));
  });
});
