import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { focusable } from "../../tests/commonTests/browser";

describe("calcite-date-picker-day", () => {
  describe("is focusable", () => {
    focusable(() =>
      mount("calcite-date-picker-day", {
        afterConnect: (el) => {
          el.active = true;
          el.dateTimeFormat = new Intl.DateTimeFormat("en"); // options not needed as this is only needed for rendering
          el.day = 3;
        },
      }),
    );
  });
});
