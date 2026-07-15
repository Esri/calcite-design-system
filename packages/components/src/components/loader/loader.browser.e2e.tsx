import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, themed } from "../../tests/commonTests/browser";

import { CSS } from "./resources";

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-loader"));
});

describe("renders", () => {
  renders(() => mount("calcite-loader"), { display: "flex", visible: true });

  describe("inline", () => {
    renders(() => mount(<calcite-loader inline />), { display: "flex", visible: true });
  });
});

describe("themed", () => {
  describe("default", () => {
    themed(() => mount("calcite-loader"), {
      "--calcite-loader-track-color": {
        shadowSelector: `.${CSS.trackRing}`,
        targetProp: "stroke",
      },
      "--calcite-loader-progress-color": {
        shadowSelector: `.${CSS.progressRing}`,
        targetProp: "stroke",
      },
    });
  });

  describe("text", () => {
    describe("text color", () => {
      themed(() => mount(<calcite-loader label="loading" scale="l" text="Themed loader" />), {
        "--calcite-loader-text-color": {
          shadowSelector: `.${CSS.text}`,
          targetProp: "color",
        },
      });
    });
    describe("percentage text size", () => {
      themed(() => mount(<calcite-loader label="loading" scale="l" type="determinate-value" />), {
        "--calcite-loader-font-size": {
          shadowSelector: `.${CSS.percentage}`,
          targetProp: "fontSize",
        },
      });
    });
    describe("percentage text color", () => {
      themed(
        () =>
          mount(
            <calcite-loader
              label="loading"
              scale="l"
              text="Themed loader"
              type="determinate-value"
              value={30}
            />,
          ),
        {
          "--calcite-loader-text-color": {
            shadowSelector: `.${CSS.percentage}`,
            targetProp: "color",
          },
        },
      );
    });
  });

  describe("size", () => {
    describe("loader size", () => {
      themed(() => mount(<calcite-loader label="loading" scale="l" />), {
        "--calcite-loader-size": {
          shadowSelector: `.${CSS.ring}`,
          targetProp: "blockSize",
        },
      });
    });
    describe("inline loader size", () => {
      themed(() => mount(<calcite-loader inline label="loading" scale="l" />), {
        "--calcite-loader-size-inline": {
          shadowSelector: `.${CSS.ring}`,
          targetProp: "inlineSize",
        },
      });
    });
  });

  describe("inline color", () => {
    themed(() => mount(<calcite-loader inline />), {
      "--calcite-loader-progress-color-inline": {
        shadowSelector: `.${CSS.progressRing}`,
        targetProp: "stroke",
      },
    });
  });
});
