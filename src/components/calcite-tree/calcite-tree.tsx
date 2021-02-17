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
import { nodeListToArray } from "../../utils/dom";
import { TreeItemSelectDetail } from "../calcite-tree-item/interfaces";
import { TreeSelectDetail, TreeSelectionMode } from "./interfaces";
import { Scale, Theme } from "../interfaces";

@Component({
  tag: "calcite-tree",
  styleUrl: "calcite-tree.scss",
  shadow: true
})
export class CalciteTree {
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

  /** Display indentation guide lines */
  @Prop({ mutable: true, reflect: true }) lines = false;

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: Theme;

  /** @internal If this tree is nested within another tree, set to false */
  @Prop({ reflect: true, mutable: true }) root = true;

  /** Specify the scale of the tree, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: Extract<"s" | "m", Scale> = "m";

  /** Customize how tree selection works (single, multi, children, multi-children) */
  @Prop({ mutable: true, reflect: true })
  selectionMode: TreeSelectionMode = TreeSelectionMode.Single;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillRender(): void {
    const parent: HTMLCalciteTreeElement = this.el.parentElement.closest("calcite-tree");
    // this.theme = getElementTheme(this.el);
    this.lines = parent ? parent.lines : this.lines;
    this.scale = parent ? parent.scale : this.scale;
    this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
    this.root = parent ? false : true;
  }

  render(): VNode {
    return (
      <Host
        aria-multiselectable={
          this.selectionMode === TreeSelectionMode.Multi ||
          this.selectionMode === TreeSelectionMode.MultiChildren
        }
        role={this.root ? "tree" : undefined}
        tabindex={this.root ? "0" : undefined}
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
    if (this.root) {
      const selectedNode = this.el.querySelector(
        "calcite-tree-item[selected]"
      ) as HTMLCalciteTreeItemElement;
      const firstNode = this.el.querySelector("calcite-tree-item") as HTMLCalciteTreeItemElement;

      (selectedNode || firstNode).focus();
    }
  }

  @Listen("calciteTreeItemSelect")
  onClick(e: CustomEvent<TreeItemSelectDetail>): void {
    const target = e.target as HTMLCalciteTreeItemElement;
    const childItems = nodeListToArray(
      target.querySelectorAll("calcite-tree-item")
    ) as HTMLCalciteTreeItemElement[];

    const shouldSelect =
      this.selectionMode !== null &&
      (!target.hasChildren ||
        (target.hasChildren &&
          (this.selectionMode === TreeSelectionMode.Children ||
            this.selectionMode === TreeSelectionMode.MultiChildren)));

    const shouldModifyToCurrentSelection =
      e.detail.modifyCurrentSelection &&
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

    if (this.root) {
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

      if (shouldExpandTarget && !e.detail.forceToggle) {
        target.expanded = true;
      }

      if (shouldModifyToCurrentSelection) {
        window.getSelection().removeAllRanges();
      }

      if (
        (shouldModifyToCurrentSelection && target.selected) ||
        (shouldSelectChildren && e.detail.forceToggle)
      ) {
        targetItems.forEach((treeItem) => {
          treeItem.selected = false;
        });
      } else {
        targetItems.forEach((treeItem) => {
          treeItem.selected = true;
        });
      }
    }

    if (this.root) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.calciteTreeSelect.emit({
      selected: (nodeListToArray(
        this.el.querySelectorAll("calcite-tree-item")
      ) as HTMLCalciteTreeItemElement[]).filter((i) => i.selected)
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteTreeSelect: EventEmitter<TreeSelectDetail>;
}
