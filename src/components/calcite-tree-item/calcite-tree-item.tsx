import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  // Method,
  State,
  Listen,
  h
} from "@stencil/core";
import { chevronRight16F } from "@esri/calcite-ui-icons";
import { TreeItemSelectDetail } from "../../interfaces/TreeItemSelect";
import { TreeSelectionMode } from "../../interfaces/TreeSelectionMode";

@Component({
  tag: "calcite-tree-item",
  styleUrl: "calcite-tree-item.scss",
  shadow: true
})
export class CalciteTreeItem {
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
   * Be sure to add a jsdoc comment describing your property for the generated readme file.
   * If your property should be hidden from documentation, you can use the `@internal` tag
   */
  @Prop({ mutable: true, reflect: true }) expanded: boolean = false;
  @Prop({ mutable: true, reflect: true }) selected: boolean = false;
  @Prop({ mutable: true, reflect: true }) depth: number = -1;
  @Prop({ mutable: true, reflect: true }) hasChildren: boolean = null;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillRender() {
    this.hasChildren = !!this.el.querySelector("calcite-tree");

    let parentTree = this.el.closest("calcite-tree");

    this.selectionMode = parentTree.selectionMode;

    this.depth = 0;
    let nextParentTree;
    while (parentTree) {
      nextParentTree = parentTree.parentElement.closest("calcite-tree");
      if (nextParentTree === parentTree) {
        break;
      } else {
        parentTree = nextParentTree;
        this.depth = this.depth + 1;
      }
    }
  }

  render() {
    const icon = this.hasChildren ? (
      <svg
        class="calcite-tree-chevron"
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="16"
        viewBox="0 0 16 16"
      >
        <path d={chevronRight16F} />
      </svg>
    ) : (
      <svg
        class="calcite-tree-indicator"
        height="16"
        width="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="3" />
      </svg>
    );

    return (
      <Host aria-role="treeitem" aria-selected={this.selected ? "true" : (this.selectionMode === TreeSelectionMode.Multi || this.selectionMode === TreeSelectionMode.MultiChildren) ? "false": undefined} aria-expanded={this.hasChildren ? this.expanded ? "true" : "false" : undefined}>
        <div class="calcite-tree-node">
          {icon}
          <slot></slot>
        </div>
        <div class="calcite-tree-children" role={this.hasChildren ? "group" : undefined}>
          <slot name="children"></slot>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click") onClick(e: Event) {
    const target = e.target as Element;
    const originalTarget = (e as any).originalTarget as Element;

    const shouldSelect =
      target.parentElement === this.el || this.el === e.target;

    if (shouldSelect && this.hasChildren) {
      this.expanded = !this.expanded;
    }

    if (shouldSelect) {
      this.calciteTreeItemSelect.emit({
        modifyCurrentSelection: (e as any).shiftKey,
        forceCollapse: originalTarget && !!originalTarget.closest("svg")
      });
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteTreeItemSelect: EventEmitter<TreeItemSelectDetail>;

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

  @State() private selectionMode: TreeSelectionMode;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
}
