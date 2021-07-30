import { focusable, renders } from "../../tests/commonTests";

describe("calcite-dropdown-item", () => {
  it("renders", () => renders("calcite-dropdown-item", { display: "flex" }));

  it("can be focused", async () => focusable(`calcite-dropdown-item`));
});
