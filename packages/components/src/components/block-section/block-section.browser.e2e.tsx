import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";

import {
  defaults,
  focusable,
  reflects,
  hidden,
  renders,
  scalePropagates,
  t9n,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("accessible", () => {
  describe("default", () => {
    describe("expanded", () => {
      accessible(() =>
        mount(
          <calcite-block-section expanded text="text">
            <div>some content</div>
          </calcite-block-section>,
        ),
      );
    });

    describe("collapsed", () => {
      accessible(() =>
        mount(
          <calcite-block-section text="text">
            <div>some content</div>
          </calcite-block-section>,
        ),
      );
    });
  });

  describe("toggle-display = 'switch'", () => {
    describe("expanded", () => {
      accessible(() =>
        mount(
          <calcite-block-section expanded text="text" toggle-display="switch">
            <div>some content</div>
          </calcite-block-section>,
        ),
      );
    });

    describe("collapsed", () => {
      accessible(() =>
        mount(
          <calcite-block-section text="text" toggle-display="switch">
            <div>some content</div>
          </calcite-block-section>,
        ),
      );
    });
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-block-section"),
    [
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "expanded",
        defaultValue: false,
      },
      {
        propertyName: "toggleDisplay",
        defaultValue: "button",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("is focusable", () => {
  describe("focuses toggle switch", () => {
    focusable(
      () =>
        mount(
          <calcite-block-section expanded text="text" toggle-display="switch">
            <div>some content</div>
          </calcite-block-section>,
        ),
      {
        shadowFocusTargetSelector: `.${CSS.toggle}`,
      },
    );
  });

  describe("focuses toggle button", () => {
    focusable(
      () =>
        mount(
          <calcite-block-section expanded text="text" toggle-display="button">
            <div>some content</div>
          </calcite-block-section>,
        ),
      {
        shadowFocusTargetSelector: `.${CSS.toggle}`,
      },
    );
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-block-section"),
    [
      {
        propertyName: "open",
        value: true,
      },
      {
        propertyName: "expanded",
        value: true,
      },
      {
        propertyName: "scale",
        value: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-block-section"));
});

describe("renders", () => {
  renders(() => mount("calcite-block-section"), { display: "block" });
});

describe("scale propagation", () => {
  scalePropagates(
    (mountOptions) => mount(<calcite-block-section toggle-display="switch" />, mountOptions),
    { targetSelector: "calcite-switch" },
  );
});

describe("translation support", () => {
  t9n(() => mount("calcite-block-section"));
});

describe("theme", () => {
  describe("default", () => {
    themed(
      () =>
        mount(
          <calcite-block-section expanded icon-end="pen" icon-start="pen" text="a block-section">
            <p>Block section content</p>
          </calcite-block-section>,
        ),
      {
        "--calcite-block-section-border-color": {
          targetProp: "borderBlockEndColor",
        },
        "--calcite-block-section-background-color": {
          shadowSelector: `.${CSS.toggle}`,
          targetProp: "backgroundColor",
        },
        "--calcite-block-section-header-text-color": [
          {
            targetProp: "color",
          },
        ],
        "--calcite-block-section-text-color": [
          { shadowSelector: `.${CSS.chevronIcon}`, targetProp: "color" },
          { shadowSelector: `.${CSS.iconStart}`, targetProp: "color" },
          { shadowSelector: `.${CSS.iconEnd}`, targetProp: "color" },
        ],
        "--calcite-block-section-text-color-hover": [
          {
            shadowSelector: `.${CSS.toggle}`,
            targetProp: "color",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.chevronIcon}`,
            targetProp: "color",
            state: "hover",
          },
        ],
        "--calcite-block-section-content-space": {
          shadowSelector: `.${CSS.content}`,
          targetProp: "paddingBlock",
        },
      },
    );
  });
});
