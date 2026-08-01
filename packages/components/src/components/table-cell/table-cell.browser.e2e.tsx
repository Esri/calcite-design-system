import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { focusable } from "../../tests/commonTests/browser";

describe("focusable", () => {
  focusable(() => mount("calcite-table-cell"));
});
