import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { accessible, hidden, renders, themed } from "../../tests/common";
import { CSS } from "./resources";

describe("accessible", () => {
  accessible(() => mount(<calcite-progress label="my progress" />));
});

describe("accessible with value", () => {
  accessible(() => mount(<calcite-progress text="percentage" type="indeterminate" value={50} />));
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-progress"));
});

describe("renders", () => {
  renders(() => mount(<calcite-progress value={20} />), { display: "block", visible: false });
});

describe("theme", () => {
  themed(() => mount(<calcite-progress text="optional text" type="determinate" value={50} />), {
    "--calcite-progress-background-color": {
      shadowSelector: `.${CSS.track}`,
      targetProp: "backgroundColor",
    },
    "--calcite-progress-fill-color": {
      shadowSelector: `.${CSS.bar}`,
      targetProp: "backgroundColor",
    },
    "--calcite-progress-text-color": {
      shadowSelector: `.${CSS.text}`,
      targetProp: "color",
    },
  });
});
