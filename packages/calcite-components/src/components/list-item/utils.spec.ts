import { getDepth, openAncestors } from "./utils";

describe("list-item utils", () => {
  describe("openAncestors", () => {
    it("opens ancestor elements", () => {
      const grandparent = document.createElement("calcite-list-item");

      const parent = document.createElement("calcite-list-item");
      grandparent.appendChild(parent);

      const child = document.createElement("calcite-list-item");
      parent.appendChild(child);

      expect(parent.open).toBe(false);
      expect(grandparent.open).toBe(false);

      openAncestors(child);

      expect(parent.open).toBe(true);
      expect(grandparent.open).toBe(true);
    });
  });

  describe("getDepth", () => {
    it("calculates the depth of an element", () => {
      const ancestor = document.createElement("calcite-list-item");
      const child = document.createElement("calcite-list-item");
      ancestor.appendChild(child);
      document.body.appendChild(ancestor);

      expect(getDepth(child)).toBe(1);
    });
  });
});
