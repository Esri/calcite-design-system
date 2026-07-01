import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { accessible, hidden, renders } from "../../tests/commonTests/browser";

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
