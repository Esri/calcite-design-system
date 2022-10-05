import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Listen,
  h,
  VNode
} from "@stencil/core";
import { focusElement, getRootNode, nodeListToArray } from "../../utils/dom";
import { TreeItemSelectDetail } from "../tree-item/interfaces";
import { TreeSelectDetail, TreeSelectionMode } from "./interfaces";
import { Scale } from "../interfaces";

/**
 * @slot - A slot for `calcite-tree-item` elements.
 */
@Component({
  tag: "calcite-tree",
  styleUrl: "tree.scss",
  shadow: true
})
export class Tree {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTreeElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Displays indentation guide lines. */
  @Prop({ mutable: true, reflect: true }) lines = false;

  /**
   * Display input
   *
   * @deprecated Use `selectionMode="ancestors"` for checkbox input.
   */
  @Prop() inputEnabled = false;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) child: boolean;

  /** Specifies the size of the component. */
  @Prop({ mutable: true, reflect: true }) scale: Scale = "m";

  /**
   * Customize how the component's selection works.
   *
   * @default "single"
   * @see [TreeSelectionMode](https://github.com/Esri/calcite-components/blob/master/src/components/tree/interfaces.ts#L5)
   */
  @Prop({ mutable: true, reflect: true }) selectionMode: TreeSelectionMode =
    TreeSelectionMode.Single;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillRender(): void {
    const parent: HTMLCalciteTreeElement = this.el.parentElement.closest("calcite-tree");
    this.lines = parent ? parent.lines : this.lines;
    this.scale = parent ? parent.scale : this.scale;
    this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
    this.child = !!parent;
  }

  render(): VNode {
    return (
      <Host
        aria-multiselectable={
          this.child
            ? undefined
            : (
                this.selectionMode === TreeSelectionMode.Multi ||
                this.selectionMode === TreeSelectionMode.MultiChildren
              ).toString()
        }
        role={!this.child ? "tree" : undefined}
        tabIndex={this.getRootTabIndex()}
      >
        <slot />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("focus") onFocus(): void {
    if (!this.child) {
      const focusTarget =
        this.el.querySelector<HTMLCalciteTreeItemElement>("calcite-tree-item[selected]") ||
        this.el.querySelector<HTMLCalciteTreeItemElement>("calcite-tree-item");

      focusElement(focusTarget);
    }
  }

  @Listen("focusin") onFocusIn(event: FocusEvent): void {
    const focusedFromRootOrOutsideTree =
      event.relatedTarget === this.el || !this.el.contains(event.relatedTarget as HTMLElement);

    if (focusedFromRootOrOutsideTree) {
      // gives user the ability to tab into external elements (modifying tabindex property will not work in firefox)
      this.el.removeAttribute("tabindex");
    }
  }

  @Listen("focusout") onFocusOut(event: FocusEvent): void {
    const willFocusOutsideTree = !this.el.contains(event.relatedTarget as HTMLElement);

    if (willFocusOutsideTree) {
      this.el.tabIndex = this.getRootTabIndex();
    }
  }

  @Listen("calciteInternalTreeItemSelect")
  onClick(event: CustomEvent<TreeItemSelectDetail>): void {
    const target = event.target as HTMLCalciteTreeItemElement;
    const childItems = nodeListToArray(
      target.querySelectorAll("calcite-tree-item")
    ) as HTMLCalciteTreeItemElement[];

    if (this.child) {
      return;
    }

    if (!this.child) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.selectionMode === TreeSelectionMode.Ancestors && !this.child) {
      this.updateAncestorTree(event);
      return;
    }

    const isNoneSelectionMode = this.selectionMode === TreeSelectionMode.None;

    const shouldSelect =
      this.selectionMode !== null &&
      (!target.hasChildren ||
        (target.hasChildren &&
          (this.selectionMode === TreeSelectionMode.Children ||
            this.selectionMode === TreeSelectionMode.MultiChildren)));

    const shouldModifyToCurrentSelection =
      !isNoneSelectionMode &&
      event.detail.modifyCurrentSelection &&
      (this.selectionMode === TreeSelectionMode.Multi ||
        this.selectionMode === TreeSelectionMode.MultiChildren);

    const shouldSelectChildren =
      this.selectionMode === TreeSelectionMode.MultiChildren ||
      this.selectionMode === TreeSelectionMode.Children;

    const shouldClearCurrentSelection =
      !shouldModifyToCurrentSelection &&
      (((this.selectionMode === TreeSelectionMode.Single ||
        this.selectionMode === TreeSelectionMode.Multi) &&
        childItems.length <= 0) ||
        this.selectionMode === TreeSelectionMode.Children ||
        this.selectionMode === TreeSelectionMode.MultiChildren);

    const shouldExpandTarget =
      this.selectionMode === TreeSelectionMode.Children ||
      this.selectionMode === TreeSelectionMode.MultiChildren;

    if (!this.child) {
      const targetItems = [];

      if (shouldSelect) {
        targetItems.push(target);
      }

      if (shouldSelectChildren) {
        childItems.forEach((treeItem) => {
          targetItems.push(treeItem);
        });
      }

      if (shouldClearCurrentSelection) {
        const selectedItems = nodeListToArray(
          this.el.querySelectorAll("calcite-tree-item[selected]")
        ) as HTMLCalciteTreeItemElement[];

        selectedItems.forEach((treeItem) => {
          if (!targetItems.includes(treeItem)) {
            treeItem.selected = false;
          }
        });
      }

      if (shouldExpandTarget && !event.detail.forceToggle) {
        target.expanded = true;
      }

      if (shouldModifyToCurrentSelection) {
        window.getSelection().removeAllRanges();
      }

      if (
        (shouldModifyToCurrentSelection && target.selected) ||
        (shouldSelectChildren && event.detail.forceToggle)
      ) {
        targetItems.forEach((treeItem) => {
          treeItem.selected = false;
        });
      } else if (!isNoneSelectionMode) {
        targetItems.forEach((treeItem) => {
          treeItem.selected = true;
        });
      }
    }

    const selected = isNoneSelectionMode
      ? [target]
      : (nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter(
          (i) => i.selected
        ) as HTMLCalciteTreeItemElement[]);

    this.calciteTreeSelect.emit({ selected });

    event.stopPropagation();
  }

  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
    const root = this.el.closest("calcite-tree:not([child])") as HTMLCalciteTreeElement;
    const target = event.target as HTMLCalciteTreeItemElement;

    if (root === this.el && target.tagName === "CALCITE-TREE-ITEM" && this.el.contains(target)) {
      switch (event.key) {
        case "ArrowDown":
          const next = target.nextElementSibling as HTMLCalciteTreeItemElement;
          if (next && next.matches("calcite-tree-item")) {
            next.focus();
            event.preventDefault();
          }
          break;
        case "ArrowLeft":
          // When focus is on an open node, closes the node.
          if (target.hasChildren && target.expanded) {
            target.expanded = false;
            event.preventDefault();
            break;
          }

          // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
          const parentItem = target.parentElement.closest("calcite-tree-item");

          if (parentItem && (!target.hasChildren || target.expanded === false)) {
            parentItem.focus();
            event.preventDefault();
            break;
          }

          // When focus is on a root node that is also either an end node or a closed node, does nothing.
          break;
        case "ArrowRight":
          if (!target.hasChildren) {
            break;
          }
          if (target.expanded && getRootNode(this.el).activeElement === target) {
            // When focus is on an open node, moves focus to the first child node.
            target.querySelector("calcite-tree-item")?.focus();
            event.preventDefault();
          } else {
            // When focus is on a closed node, opens the node; focus does not move.
            target.expanded = true;
            event.preventDefault();
          }
          // When focus is on an end node, does nothing.
          break;
        case "ArrowUp":
          const previous = target.previousElementSibling as HTMLCalciteTreeItemElement;
          if (previous && previous.matches("calcite-tree-item")) {
            previous.focus();
            event.preventDefault();
          }
          break;
      }
    }
  }

  updateAncestorTree(event: CustomEvent<TreeItemSelectDetail>): void {
    const item = event.target as HTMLCalciteTreeItemElement;
    const children = item.querySelectorAll("calcite-tree-item");
    const ancestors: HTMLCalciteTreeItemElement[] = [];
    let parent = item.parentElement.closest("calcite-tree-item");
    while (parent) {
      ancestors.push(parent);
      parent = parent.parentElement.closest("calcite-tree-item");
    }

    item.selected = !item.selected;
    item.indeterminate = false;
    if (children?.length) {
      children.forEach((el) => {
        el.selected = item.selected;
        el.indeterminate = false;
      });
    }

    if (ancestors) {
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
    }

    this.calciteTreeSelect.emit({
      selected: (
        nodeListToArray(
          this.el.querySelectorAll("calcite-tree-item")
        ) as HTMLCalciteTreeItemElement[]
      ).filter((i) => i.selected)
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the user selects/deselects `calcite-tree-items`. An object including an array of selected items will be passed in the event's "detail" property.
   *
   * @see [TreeSelectDetail](https://github.com/Esri/calcite-components/blob/master/src/components/tree/interfaces.ts#L1)
   */
  @Event({ cancelable: false }) calciteTreeSelect: EventEmitter<TreeSelectDetail>;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  getRootTabIndex(): number {
    return !this.child ? 0 : -1;
  }
}
