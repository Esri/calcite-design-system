import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  accessible,
  defaults,
  hidden,
  renders,
  scalePropagates,
  themed,
} from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("accessible", () => {
  describe("default", () => {
    accessible(() => mount("calcite-avatar"));
  });

  describe("with thumbnail", () => {
    accessible(() => mount(<calcite-avatar thumbnail="https://placehold.co/120x120" />));
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-avatar"),
    [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-avatar"));
});

describe("renders", () => {
  renders(() => mount("calcite-avatar"), { display: "inline-block" });
});

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-avatar />, mountOptions), {
    targetSelector: "calcite-icon",
  });
});

describe("theme", () => {
  describe("thumbnail", () => {
    themed(
      () =>
        mount(
          <calcite-avatar thumbnail="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII" />,
        ),
      {
        "--calcite-avatar-corner-radius": [
          {
            targetProp: "borderRadius",
          },
          {
            shadowSelector: `.${CSS.thumbnail}`,
            targetProp: "borderRadius",
          },
        ],
      },
    );
  });

  describe("icon", () => {
    themed(() => mount(<calcite-avatar user-id="umonti" />), {
      "--calcite-avatar-background-color": {
        shadowSelector: `.${CSS.background}`,
        targetProp: "backgroundColor",
      },
      "--calcite-avatar-color": {
        shadowSelector: `.${CSS.icon}`,
        targetProp: "color",
      },
      "--calcite-avatar-corner-radius": [
        {
          targetProp: "borderRadius",
        },
        {
          shadowSelector: `.${CSS.background}`,
          targetProp: "borderRadius",
        },
      ],
    });
  });

  describe("initials", () => {
    themed(() => mount(<calcite-avatar full-name="Urbano Monti" />), {
      "--calcite-avatar-background-color": {
        shadowSelector: `.${CSS.background}`,
        targetProp: "backgroundColor",
      },
      "--calcite-avatar-color": {
        shadowSelector: `.${CSS.initials}`,
        targetProp: "color",
      },
      "--calcite-avatar-corner-radius": {
        shadowSelector: `.${CSS.background}`,
        targetProp: "borderRadius",
      },
    });
  });
});
