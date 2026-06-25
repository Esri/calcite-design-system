import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import { accessible, hidden, renders } from "../../tests/commonTests/browser";

describe("accessible", () => {
  accessible(() => mount(<calcite-input-message>Text</calcite-input-message>));
});

describe("accessible with icon", () => {
  accessible(() => mount(<calcite-input-message icon>Text</calcite-input-message>));
});

describe("honors hidden attribute", () => {
  hidden(() => mount(<calcite-input-message>Text</calcite-input-message>));
});

describe("renders", () => {
  renders(() => mount(<calcite-input-message>content</calcite-input-message>), {
    display: "flex",
  });
});
