import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { accessible, hidden, renders } from "../../tests/commonTests/browser";

describe("accessible", () => {
  accessible(() =>
    mount(`calcite-input-message`, { afterConnect: (el) => (el.textContent = "Text") }),
  );
});

describe("accessible with icon", () => {
  accessible(() =>
    mount(`calcite-input-message`, {
      afterConnect: (el) => {
        el.icon = true;
        el.textContent = "Text";
      },
    }),
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount(`calcite-input-message`, { afterConnect: (el) => (el.textContent = "Text") }));
});

describe("renders", () => {
  renders(
    () => mount(`calcite-input-message`, { afterConnect: (el) => (el.textContent = "content") }),
    {
      display: "flex",
    },
  );
});
