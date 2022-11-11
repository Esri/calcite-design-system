import { focusable, renders, hidden } from "../../tests/commonTests";

describe("calcite-dropdown-item", () => {
  it("renders", () => renders("calcite-dropdown-item", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-dropdown-item"));

  it("can be focused", async () => focusable(`calcite-dropdown-item`));
});
