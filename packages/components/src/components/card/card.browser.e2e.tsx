import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  hidden,
  focusable,
  renders,
  slots,
  t9n,
  reflects,
  accessible,
  themed
} from "../../tests/commonTests/browser";
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

  describe("when selectable (deprecated)", () => {
    accessible(() =>
      mount(
        <calcite-card label="example-label" selectable>
          <img alt="Test image" slot="thumbnail" src={placeholder} />
        </calcite-card>,
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
  describe("selectable", () => {
    describe("default", () => {
      themed(
        () =>
          mount(
            <calcite-card label="example-label" selectable>
              <h3 slot="heading">ArcGIS Online: Gallery and Organization pages</h3>
              <span slot="description">
                A great example of a study description that might wrap to a line or two, but isn't
                overly verbose.
              </span>
            </calcite-card>,
          ),
        {
          "--calcite-card-selection-background-color-hover": {
            shadowSelector: `.${CSS.checkboxWrapperDeprecated}`,
            targetProp: "backgroundColor",
            state: "hover",
          },
          "--calcite-card-selection-background-color-press": {
            shadowSelector: `.${CSS.checkboxWrapperDeprecated}`,
            targetProp: "backgroundColor",
            state: { press: { attribute: "class", value: CSS.checkboxWrapperDeprecated } },
          },
          "--calcite-card-selection-color": {
            shadowSelector: `.${CSS.checkboxWrapperDeprecated}`,
            targetProp: "color",
          },
          "--calcite-card-selection-color-hover": {
            shadowSelector: `.${CSS.checkboxWrapperDeprecated}`,
            targetProp: "color",
            state: "hover",
          },
        },
      );
    });
    describe("selected", () => {
      themed(
        () =>
          mount(
            <calcite-card label="example-label" selectable selected>
              <h3 slot="heading">ArcGIS Online: Gallery and Organization pages</h3>
              <span slot="description">
                A great example of a study description that might wrap to a line or two, but isn't
                overly verbose.
              </span>
            </calcite-card>,
          ),
        {
          "--calcite-card-accent-color-selected": {
            shadowSelector: `.${CSS.checkboxWrapperDeprecated}`,
            targetProp: "color",
          },
        },
      );
    });
  });
});
