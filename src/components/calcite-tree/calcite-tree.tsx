import {
  Component,
  Element,
  Prop,
  Host,
  // Event,
  // EventEmitter,
  // Method,
  Listen,
  // State,
  h
} from "@stencil/core";
import { getElementDir, getElementTheme } from "../../utils/dom";
import { TreeSelectionMode } from "../../interfaces/TreeSelectionMode";
import { TreeItemSelectDetail } from "../../interfaces/TreeItemSelect";
import { nodeListToArray } from "../../utils/dom";
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

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Be sure to add a jsdoc comment describing your propery for the generated readme file.
   * If your property should be hidden from documentation, you can use the `@internal` tag
   */
  @Prop({ mutable: true, reflect: true }) lines: boolean = false;
  @Prop({ mutable: true, reflect: true }) root: boolean = true;
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";
  @Prop({ mutable: true, reflect: true }) size: "s" | "m" = "m";
  @Prop({ mutable: true, reflect: true })
  selectionMode: TreeSelectionMode = TreeSelectionMode.None;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

  componentWillRender() {
    const parent: HTMLCalciteTreeElement = this.el.parentElement.closest(
      "calcite-tree"
    );
    this.theme = getElementTheme(this.el);
    this.lines = parent ? parent.lines : this.lines;
    this.size = parent ? parent.size : this.size;
    this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
    this.root = parent ? false : true;
  }

  render() {
    const dir = getElementDir(this.el);

    return (
      <Host
        dir={dir}
        aria-role={this.root ? "tree" : undefined}
        aria-multiselectable={
          this.selectionMode === TreeSelectionMode.Multi ||
          this.selectionMode === TreeSelectionMode.MultiChildren
        }
      >
        <slot></slot>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteTreeItemSelect") onClick(
    e: CustomEvent<TreeItemSelectDetail>
  ) {
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
        (this.selectionMode === TreeSelectionMode.Children ||
          this.selectionMode === TreeSelectionMode.MultiChildren));

    const shouldExpandTarget =
      this.selectionMode === TreeSelectionMode.Children ||
      this.selectionMode === TreeSelectionMode.MultiChildren;

    if (this.root) {
      const targetItems = [];

      if (shouldSelect) {
        targetItems.push(target);
      }

      if (shouldSelectChildren) {
        childItems.forEach(treeItem => {
          targetItems.push(treeItem);
        });
      }

      if (shouldClearCurrentSelection) {
        const selectedItems = nodeListToArray(
          this.el.querySelectorAll("calcite-tree-item[selected]")
        ) as HTMLCalciteTreeItemElement[];

        selectedItems.forEach(treeItem => {
          if (!targetItems.includes(treeItem)) {
            treeItem.selected = false;
          }
        });
      }

      if (shouldExpandTarget && !e.detail.forceCollapse) {
        target.expanded = true;
      }

      if (shouldModifyToCurrentSelection) {
        window.getSelection().removeAllRanges();
      }

      if (
        (shouldModifyToCurrentSelection && target.selected) ||
        (shouldSelectChildren && e.detail.forceCollapse)
      ) {
        targetItems.forEach(treeItem => {
          treeItem.selected = false;
        });
      } else {
        targetItems.forEach(treeItem => {
          treeItem.selected = true;
        });
      }
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  // @Event() open: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Add a jsdoc comment describing your method and it's parameters (use `@param`).
   */

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  // @State() private currentSelection: HTMLCalciteTreeItemElement[] = [];

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
}
