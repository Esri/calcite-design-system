// import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-chip", () => {
  it("renders", async () => renders("calcite-chip"));
  it("honors hidden attribute", async () => hidden("calcite-chip"));

  it("is accessible", async () => accessible( `<calcite-chip></calcite-chip>` ));
});
