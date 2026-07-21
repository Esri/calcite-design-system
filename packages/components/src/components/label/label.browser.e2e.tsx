import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, themed } from "../../tests/commonTests/browser";

import { CSS } from "./resources";

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-label"));
});

describe("renders", () => {
  renders(() => mount("calcite-label"), { display: "flex" });
});

describe("theme", () => {
  describe("default", () => {
    themed(
      () =>
        mount(
          <calcite-label>
            Label text
            <calcite-input />
          </calcite-label>,
        ),
      {
        "--calcite-label-margin-bottom": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "marginBlockEnd",
        },
        "--calcite-label-text-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "color",
        },
      },
    );
  });
});

describe("disabled", () => {
  it("applies disabled styling to the label container", async () => {
    const { el } = await mount<"calcite-label">(
      <calcite-label disabled>
        Label text
        <calcite-input />
      </calcite-label>,
    );
    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;

    expect(getComputedStyle(container).opacity).not.toBe("1");
  });
});
