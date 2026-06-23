import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { accessible, defaults, hidden, reflects, renders } from "../../tests/commonTests/browser";

describe("accessible", () => {
  accessible(() => mount("calcite-option-group"));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-option-group"),
    [
      {
        propertyName: "disabled",
        defaultValue: false,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-option-group"),
    [
      {
        propertyName: "disabled",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-option-group"));
});

describe("renders", () => {
  renders(() => mount("calcite-option-group"), { display: "inline", visible: false });
});

it("has a label", async () => {
  await mount(`calcite-option-group`, { afterConnect: (el) => (el.label = "test-group") });
  const label = page.getByText("test-group");

  await expect.element(label).toBeVisible();
});
