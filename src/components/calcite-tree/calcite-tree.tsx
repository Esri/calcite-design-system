import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Listen,
  h
} from "@stencil/core";
import {
  nodeListToArray,
  getElementTheme
} from "../../utils/dom";
import { TreeSelectionMode } from "../../interfaces/TreeSelectionMode";
import { TreeItemSelectDetail } from "../../interfaces/TreeItemSelect";
import { TreeSelectDetail } from "../../interfaces/TreeSelect";

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
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark";
  @Prop({ mutable: true, reflect: true }) size: "s" | "m" = "m";
  @Prop({ mutable: true, reflect: true })
  selectionMode: TreeSelectionMode = TreeSelectionMode.Single;

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

    return (
      <Host
        tabindex={this.root ? "1" : undefined}

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

  @Listen("focus") onFocus() {
    if (this.root) {
      const selectedNode = this.el.querySelector(
        "calcite-tree-item[selected]"
      ) as HTMLCalciteTreeItemElement;
      const firstNode = this.el.querySelector(
        "calcite-tree-item"
      ) as HTMLCalciteTreeItemElement;

      (selectedNode || firstNode).focus();
    }
  }

  @Listen("calciteTreeItemSelect")
  onClick(e: CustomEvent<TreeItemSelectDetail>) {
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
        targetItems.forEach(treeItem => {
          treeItem.selected = false;
        });
      } else {
        targetItems.forEach(treeItem => {
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
      ) as HTMLCalciteTreeItemElement[]).filter(i => i.selected)
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteTreeSelect: EventEmitter<TreeSelectDetail>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
}
