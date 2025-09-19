// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, JsxNode, setAttribute } from "@arcgis/lumina";
import {
  focusElement,
  nodeListToArray,
  slotChangeGetAssignedElements,
  toAriaBoolean,
} from "../../utils/dom";
import { Scale, SelectionMode } from "../interfaces";
import { TreeItemSelectDetail } from "../tree-item/interfaces";
import type { TreeItem } from "../tree-item/tree-item";
import { getTraversableItems, isTreeItem } from "./utils";
import { styles } from "./tree.scss";

declare global {
  interface DeclareElements {
    "calcite-tree": Tree;
  }
}

/** @slot - A slot for `calcite-tree-item` elements. */
export class Tree extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private items: TreeItem["el"][] = [];

  // #endregion

  // #region Public Properties

  /** @private */
  @property({ reflect: true }) child: boolean;

  /** When present, displays indentation guide lines. */
  @property({ reflect: true }) lines = false;

  /** @private */
  @property() parentExpanded = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @property() selectedItems: TreeItem["el"][] = [];

  /**
   * Specifies the selection mode of the component, where:
   *
   * `"ancestors"` displays with a checkbox and allows any number of selections from corresponding parent and child selections,
   *
   * `"children"` allows any number of selections from one parent from corresponding parent and child selections,
   *
   * `"multichildren"` allows any number of selections from corresponding parent and child selections,
   *
   * `"multiple"` allows any number of selections,
   *
   * `"none"` allows no selections,
   *
   * `"single"` allows one selection, and
   *
   * `"single-persist"` allows and requires one selection.
   *
   * @default "single"
   */
  @property({ reflect: true }) selectionMode: SelectionMode = "single";

  // #endregion

  // #region Events

  /** Fires when the user selects/deselects `calcite-tree-items`. */
  calciteTreeSelect = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("focus", this.onFocus);
    this.listen("focusin", this.onFocusIn);
    this.listen("focusout", this.onFocusOut);
    this.listen("calciteInternalTreeItemSelect", this.onInternalTreeItemSelect);
    this.listen("keydown", this.keyDownHandler);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("parentExpanded") && (this.hasUpdated || this.parentExpanded !== false)) {
      this.updateItems();
    }

    const parent: Tree["el"] = this.el.parentElement?.closest("calcite-tree");
    this.lines = parent ? parent.lines : this.lines;
    this.scale = parent ? parent.scale : this.scale;
    this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
    this.child = !!parent;
  }

  // #endregion

  // #region Private Methods
  private onFocus(): void {
    if (!this.child) {
      const focusTarget =
        this.el.querySelector<TreeItem["el"]>("calcite-tree-item[selected]:not([disabled])") ||
        this.el.querySelector<TreeItem["el"]>("calcite-tree-item:not([disabled])");

      focusElement(focusTarget);
    }
  }

  private onFocusIn(event: FocusEvent): void {
    const focusedFromRootOrOutsideTree =
      event.relatedTarget === this.el || !this.el.contains(event.relatedTarget as HTMLElement);

    if (focusedFromRootOrOutsideTree) {
      // gives user the ability to tab into external elements (modifying tabindex property will not work in firefox)
      this.el.removeAttribute("tabindex");
    }
  }

  private onFocusOut(event: FocusEvent): void {
    const willFocusOutsideTree = !this.el.contains(event.relatedTarget as HTMLElement);

    if (willFocusOutsideTree) {
      this.el.tabIndex = this.getRootTabIndex();
    }
  }

  private onInternalTreeItemSelect(event: CustomEvent<TreeItemSelectDetail>): void {
    if (this.child) {
      return;
    }

    const target = event.target as TreeItem["el"];
    const childItems = nodeListToArray(target.querySelectorAll("calcite-tree-item"));

    event.preventDefault();
    event.stopPropagation();

    if (this.selectionMode === "ancestors") {
      this.updateAncestorTree(event);
      return;
    }

    const isNoneSelectionMode = this.selectionMode === "none";

    const shouldSelect =
      this.selectionMode !== null &&
      (!target.hasChildren ||
        (target.hasChildren &&
          (this.selectionMode === "children" || this.selectionMode === "multichildren")));

    const shouldDeselectAllChildren = this.selectionMode === "multichildren" && target.hasChildren;

    const shouldModifyToCurrentSelection =
      !isNoneSelectionMode &&
      event.detail.modifyCurrentSelection &&
      (this.selectionMode === "multiple" || this.selectionMode === "multichildren");

    const shouldClearCurrentSelection =
      !shouldModifyToCurrentSelection &&
      (((this.selectionMode === "single" || this.selectionMode === "multiple") &&
        childItems.length <= 0) ||
        this.selectionMode === "children" ||
        this.selectionMode === "multichildren" ||
        (this.selectionMode === "single-persist" && !target.hasChildren));

    const shouldUpdateExpand =
      ["multiple", "none", "single", "single-persist"].includes(this.selectionMode) &&
      target.hasChildren;

    const targetItems: TreeItem["el"][] = [];

    if (shouldSelect) {
      targetItems.push(target);
    }

    if (shouldClearCurrentSelection) {
      const selectedItems = nodeListToArray(
        this.el.querySelectorAll<TreeItem["el"]>("calcite-tree-item[selected]"),
      );

      selectedItems.forEach((treeItem) => {
        if (!targetItems.includes(treeItem)) {
          treeItem.selected = false;
        }
      });
    }

    if (
      shouldUpdateExpand &&
      ["multiple", "none", "single", "single-persist"].includes(this.selectionMode)
    ) {
      target.expanded = !target.expanded;
    }

    if (shouldDeselectAllChildren) {
      childItems.forEach((item) => {
        item.selected = false;
        if (item.hasChildren) {
          item.expanded = false;
        }
      });
    }

    if (shouldModifyToCurrentSelection) {
      window.getSelection().removeAllRanges();
    }

    if (shouldModifyToCurrentSelection && target.selected) {
      targetItems.forEach((treeItem) => {
        if (!treeItem.disabled) {
          treeItem.selected = false;
        }
      });
    } else if (!isNoneSelectionMode) {
      targetItems.forEach((treeItem) => {
        if (!treeItem.disabled) {
          treeItem.selected = this.selectionMode !== "single" || !treeItem.selected;
        }
      });
    }

    this.selectedItems = isNoneSelectionMode
      ? []
      : nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter((i) => i.selected);

    this.calciteTreeSelect.emit();

    event.stopPropagation();
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (this.child) {
      return;
    }

    const root = this.el;
    const target = event.target as TreeItem["el"];

    const supportedKeys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End", "Tab"];

    if (!(isTreeItem(target) && this.el.contains(target)) || !supportedKeys.includes(event.key)) {
      return;
    }

    const traversableItems = getTraversableItems(root);

    if (event.key === "Tab") {
      // root tabindex will be restored when blurred/focused
      traversableItems.forEach((item) => (item.tabIndex = -1));
      return;
    }

    if (event.key === "ArrowDown") {
      const currentItemIndex = traversableItems.indexOf(target);
      const nextItem = traversableItems[currentItemIndex + 1];
      nextItem?.focus();
      event.preventDefault();
      return;
    }

    if (event.key === "ArrowUp") {
      const currentItemIndex = traversableItems.indexOf(target);
      const previousItem = traversableItems[currentItemIndex - 1];
      previousItem?.focus();
      event.preventDefault();
      return;
    }

    if (event.key === "ArrowLeft") {
      if (target.hasChildren && target.expanded) {
        target.expanded = false;
        event.preventDefault();
        return;
      }

      const rootToItemPath = traversableItems.slice(0, traversableItems.indexOf(target)).reverse();
      const parentItem = rootToItemPath.find((item) => item.depth === target.depth - 1);

      parentItem?.focus();
      event.preventDefault();

      return;
    }

    if (event.key === "ArrowRight") {
      if (!target.disabled && target.hasChildren) {
        if (!target.expanded) {
          target.expanded = true;
          event.preventDefault();
        } else {
          const currentItemIndex = traversableItems.indexOf(target);
          const nextItem = traversableItems[currentItemIndex + 1];
          nextItem?.focus();
          event.preventDefault();
        }
      }

      return;
    }

    if (event.key === "Home") {
      const firstNode = traversableItems.shift();
      if (firstNode) {
        firstNode.focus();
        event.preventDefault();
      }
      return;
    }

    if (event.key === "End") {
      const lastNode = traversableItems.pop();
      if (lastNode) {
        lastNode.focus();
        event.preventDefault();
      }
      return;
    }
  }

  private updateAncestorTree(event: CustomEvent<TreeItemSelectDetail>): void {
    const item = event.target as TreeItem["el"];
    const updateItem = event.detail.updateItem;

    if (item.disabled || (item.indeterminate && !updateItem)) {
      return;
    }

    const ancestors: TreeItem["el"][] = [];
    let parent = item.parentElement.closest<TreeItem["el"]>("calcite-tree-item");
    while (parent) {
      ancestors.push(parent);
      parent = parent.parentElement.closest<TreeItem["el"]>("calcite-tree-item");
    }

    const childItems = Array.from(
      item.querySelectorAll<TreeItem["el"]>("calcite-tree-item:not([disabled])"),
    );
    const childItemsWithNoChildren = childItems.filter((child) => !child.hasChildren);
    const childItemsWithChildren = childItems.filter((child) => child.hasChildren);

    let futureSelected;
    if (updateItem) {
      futureSelected = item.hasChildren ? !(item.selected || item.indeterminate) : !item.selected;
    } else {
      futureSelected = item.selected;
    }

    childItemsWithNoChildren.forEach((el) => {
      el.selected = futureSelected;
      el.indeterminate = false;
    });

    function updateItemState(childItems: TreeItem["el"][], item: TreeItem["el"]): void {
      const selected = childItems.filter((child) => child.selected);
      const unselected = childItems.filter((child) => !child.selected);

      item.selected = selected.length === childItems.length;
      item.indeterminate = selected.length > 0 && unselected.length > 0;
    }

    childItemsWithChildren.reverse().forEach((el) => {
      const directChildItems = Array.from(
        el.querySelectorAll<TreeItem["el"]>(":scope > calcite-tree > calcite-tree-item"),
      );

      updateItemState(directChildItems, el);
    });

    if (updateItem) {
      if (item.hasChildren) {
        updateItemState(childItems, item);
      } else {
        item.selected = futureSelected;
        item.indeterminate = false;
      }
    }

    ancestors.forEach((ancestor) => {
      const descendants = nodeListToArray(ancestor.querySelectorAll("calcite-tree-item"));
      const activeDescendants = descendants.filter((el) => el.selected);
      if (activeDescendants.length === 0) {
        ancestor.selected = false;
        ancestor.indeterminate = false;
        return;
      }

      const indeterminate = activeDescendants.length < descendants.length;
      ancestor.indeterminate = indeterminate;
      ancestor.selected = !indeterminate;
    });

    this.selectedItems = nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter(
      (i) => i.selected,
    );

    if (updateItem) {
      this.calciteTreeSelect.emit();
    }
  }

  private updateItems(): void {
    this.items.forEach((item) => (item.parentExpanded = this.parentExpanded));
  }

  private handleDefaultSlotChange(event: Event): void {
    const items = slotChangeGetAssignedElements(event).filter((el): el is TreeItem["el"] =>
      el.matches("calcite-tree-item"),
    );

    this.items = items;
    this.updateItems();
  }

  private getRootTabIndex(): number {
    return !this.child ? 0 : -1;
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaMultiSelectable = this.child
      ? undefined
      : toAriaBoolean(this.selectionMode === "multiple" || this.selectionMode === "multichildren");
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = !this.child ? "tree" : undefined;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "tabIndex", this.getRootTabIndex());
    return <slot onSlotChange={this.handleDefaultSlotChange} />;
  }

  // #endregion
}
