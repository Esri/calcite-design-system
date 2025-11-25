import { mount } from "@arcgis/lumina-compiler/testing";
import { describe } from "vitest";
import { renders } from "../../tests/commonTests/browser";
import { DateLocaleData } from "../date-picker/utils";

describe("calcite-date-picker-month-header", () => {
  describe("renders", () => {
    renders(
      () =>
        mount("calcite-date-picker-month-header", {
          afterConnect: async (el) => {
            const messages = await import("../date-picker/assets/t9n/messages.json");
            const localeDataFixture: DateLocaleData = {
              "default-calendar": "gregorian",
              separator: "/",
              unitOrder: "DD/MM/YYYY",
              weekStart: 7,
              placeholder: "DD/MM/YYYY",
              days: {
                narrow: ["D", "L", "M", "M", "J", "V", "S"],
              },
              numerals: "0123456789",
              months: {
                abbreviated: [
                  "ene.",
                  "feb.",
                  "mar.",
                  "abr.",
                  "may.",
                  "jun.",
                  "jul.",
                  "ago.",
                  "sept.",
                  "oct.",
                  "nov.",
                  "dic.",
                ],
                narrow: ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                wide: [
                  "enero",
                  "febrero",
                  "marzo",
                  "abril",
                  "mayo",
                  "junio",
                  "julio",
                  "agosto",
                  "septiembre",
                  "octubre",
                  "noviembre",
                  "diciembre",
                ],
              },
            };

            el.activeDate = new Date();
            el.localeData = localeDataFixture;
            el.messages = messages;
            el.monthStyle = "wide";
          },
        }),
      { display: "block" },
    );
  });
});
