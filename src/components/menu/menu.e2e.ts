import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-menu", () => {
  it("renders", async () => renders("calcite-menu", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-menu"));

  it("is accessible", () => accessible("calcite-menu"));
});
