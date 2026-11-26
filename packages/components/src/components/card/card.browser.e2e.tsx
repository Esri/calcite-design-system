import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import {
  defaults,
  hidden,
  focusable,
  renders,
  slots,
  t9n,
  reflects,
  accessible,
  themed,
} from "../../tests/common";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { CSS, SLOTS } from "./resources";
const placeholder = placeholderImage({
  width: 350,
  height: 150,
});

describe("accessible", () => {
  describe("default", () => {
    accessible(() => mount("calcite-card"));
  });

  describe("when selection is enabled through a parent card group", () => {
    accessible(() =>
      mount(
        <calcite-card-group label="example-label-group" selection-mode="multiple">
          <calcite-card label="example-label">
            <img alt="Test image" slot="thumbnail" src={placeholder} />
          </calcite-card>
        </calcite-card-group>,
      ),
    );
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-card"),
    [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-card"),
    [
      {
        propertyName: "scale",
        value: "m",
      },
    ],
  );
});

describe("focusable", () => {
  describe("default", () => {
    focusable(() => mount("calcite-card"));
  });

  describe("with interactive children", () => {
    focusable(() =>
      mount(
        <calcite-card id="parent">
          <div tabIndex={0}>focusable child</div>
        </calcite-card>,
      ),
    );
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-card"));
});

describe("renders", () => {
  renders(() => mount("calcite-card"), { display: "block" });
});

describe("slots", () => {
  slots(() => mount("calcite-card"), SLOTS, true);
});

describe("translation support", () => {
  t9n(() => mount("calcite-card"));
});

describe("a11y attributes", () => {
  it("should omit aria-busy when not loading and set it when loading", async () => {
    const { reRender, el } = await mount("calcite-card");
    const container = page.getBySelector(`calcite-card .${CSS.container}`);

    await expect.element(container).not.toHaveAttribute("aria-busy");

    el.loading = true;
    await reRender();

    await expect.element(container).toHaveAttribute("aria-busy", "true");
  });
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-card"), {
      "--calcite-card-background-color": {
        shadowSelector: `.${CSS.contentWrapper}`,
        targetProp: "backgroundColor",
      },
      "--calcite-card-border-color": {
        shadowSelector: `.${CSS.contentWrapper}`,
        targetProp: "borderColor",
      },
      "--calcite-card-corner-radius": {
        shadowSelector: `.${CSS.contentWrapper}`,
        targetProp: "borderRadius",
      },
      "--calcite-card-shadow": {
        shadowSelector: `.${CSS.contentWrapper}`,
        targetProp: "boxShadow",
      },
    });
  });

  describe("selection", () => {
    describe("default", () => {
      themed(
        () =>
          mount(
            <calcite-card-group label="example-label-group" selection-mode="multiple">
              <calcite-card label="example-label">
                <h3 slot="heading">ArcGIS Online: Gallery and Organization pages</h3>
                <span slot="description">
                  A great example of a study description that might wrap to a line or two, but isn't
                  overly verbose.
                </span>
              </calcite-card>
            </calcite-card-group>,
          ),
        {
          "--calcite-card-selection-color": {
            selector: "calcite-card",
            shadowSelector: `.${CSS.checkboxWrapper}`,
            targetProp: "color",
          },
          "--calcite-card-selection-color-hover": {
            selector: "calcite-card",
            shadowSelector: `.${CSS.checkboxWrapper}`,
            targetProp: "color",
            state: "hover",
          },
          "--calcite-card-selection-background-color-hover": {
            selector: "calcite-card",
            shadowSelector: `.${CSS.checkboxWrapper}`,
            targetProp: "backgroundColor",
            state: "hover",
          },
          "--calcite-card-selection-background-color-press": {
            selector: "calcite-card",
            shadowSelector: `.${CSS.checkboxWrapper}`,
            targetProp: "backgroundColor",
            state: { press: { attribute: "class", value: CSS.checkboxWrapper } },
          },
        },
      );
    });
    describe("selected", () => {
      themed(
        () =>
          mount(
            <calcite-card-group label="example-label-group" selection-mode="multiple">
              <calcite-card label="example-label" selected>
                <h3 slot="heading">ArcGIS Online: Gallery and Organization pages</h3>
                <span slot="description">
                  A great example of a study description that might wrap to a line or two, but isn't
                  overly verbose.
                </span>
              </calcite-card>
            </calcite-card-group>,
          ),
        {
          "--calcite-card-accent-color-selected": {
            selector: "calcite-card",
            shadowSelector: `.${CSS.checkboxWrapper}`,
            targetProp: "color",
          },
        },
      );
    });
  });
});
