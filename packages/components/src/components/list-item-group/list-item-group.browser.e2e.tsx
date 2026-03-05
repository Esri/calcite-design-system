import { describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, disabled } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-list-item-group"),
    [
      {
        propertyName: "heading",
        defaultValue: undefined,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "filterHidden",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-list-item-group"));
});

describe("renders", () => {
  renders(() => mount("calcite-list-item-group"), { display: "flex" });
});

describe("disabled", () => {
  disabled(() => mount("calcite-list-item-group"), { focusTarget: "none" });
});

describe("sticky container", () => {
  it("applies sticky positioning styles to the container", async () => {
    const { el } = await mount("calcite-list-item-group");
    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;
    const computedStyle = getComputedStyle(container);

    expect(computedStyle.position).toBe("sticky");
    expect(computedStyle.top).toBe("0px");
    expect(computedStyle.zIndex).not.toBe("auto");
  });
});
