import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { focusable } from "../../tests/common";

describe("focusable", () => {
  focusable(() => mount("calcite-table-header"));
});
