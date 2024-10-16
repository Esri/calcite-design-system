import { getDepth, hasListItemChildren, openAncestors, updateListItemChildren } from "./utils";

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

  describe("hasListItemChildren", () => {
    it("identifies when there are list item children", () => {
      const slot = document.createElement("slot");

      expect(hasListItemChildren(slot)).toBe(false);

      const listItem = document.createElement("calcite-list-item");
      slot.assign(listItem);

      expect(hasListItemChildren(slot)).toBe(true);
    });
  });

  describe("updateListItemChildren", () => {
    it("updates the position and size of list item children", () => {
      const slot = document.createElement("slot");
      const listItem1 = document.createElement("calcite-list-item");
      const listItem2 = document.createElement("calcite-list-item");
      slot.assign(listItem1);
      slot.assign(listItem2);

      updateListItemChildren(slot);

      expect(listItem1.setPosition).toBe(1);
      expect(listItem1.setSize).toBe(2);
      expect(listItem2.setPosition).toBe(2);
      expect(listItem2.setSize).toBe(2);
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
