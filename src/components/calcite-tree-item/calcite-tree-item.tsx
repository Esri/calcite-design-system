import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  State,
  Listen,
  Watch,
  h
} from "@stencil/core";
import { TreeItemSelectDetail } from "../../interfaces/TreeItemSelect";
import { TreeSelectionMode } from "../../interfaces/TreeSelectionMode";
import { getElementDir } from "../../utils/dom";
import {
  SPACE,
  ENTER,
  LEFT,
  RIGHT,
  UP,
  DOWN,
  HOME,
  END
} from "../../utils/keys";
import { nodeListToArray, getSlottedElements } from "../../utils/dom";

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

  @Prop({ mutable: true, reflect: true }) selected: boolean = false;
  @Prop({ mutable: true, reflect: true }) depth: number = -1;
  @Prop({ mutable: true, reflect: true }) hasChildren: boolean = null;
  @Prop({ mutable: true, reflect: true }) expanded: boolean = false;
  @Prop({ mutable: true }) parentExpanded: boolean = false;

  @Watch("expanded")
  expandedHandler(newValue: boolean) {
    if (this.childrenSlotWrapper) {
      const [childTree] = getSlottedElements(
        this.childrenSlotWrapper,
        "calcite-tree"
      );
      if (childTree) {
        const items = getSlottedElements<HTMLCalciteTreeItemElement>(
          childTree,
          "calcite-tree-item"
        );
        items.forEach(item => (item.parentExpanded = newValue));
      }
    }
  }

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
    const dir = getElementDir(this.el);
    const icon = this.hasChildren ? (
      <calcite-icon
        class="calcite-tree-chevron"
        icon="chevron-right"
        scale="s"
        onClick={this.iconClickHandler}
        data-test-id="icon"
      ></calcite-icon>
    ) : null;

    return (
      <Host
        tabindex={this.parentExpanded || this.depth === 1 ? "0" : "-1"}
        dir={dir}
        aria-role="treeitem"
        aria-hidden={
          this.parentExpanded || this.depth === 1 ? undefined : "true"
        }
        aria-selected={
          this.selected
            ? "true"
            : this.selectionMode === TreeSelectionMode.Multi ||
              this.selectionMode === TreeSelectionMode.MultiChildren
            ? "false"
            : undefined
        }
        aria-expanded={this.hasChildren ? this.expanded.toString() : undefined}
      >
        <div
          class="calcite-tree-node"
          ref={el => (this.defaultSlotWrapper = el as HTMLElement)}
        >
          {icon}
          <slot></slot>
        </div>
        <div
          class="calcite-tree-children"
          data-test-id="calcite-tree-children"
          role={this.hasChildren ? "group" : undefined}
          ref={el => (this.childrenSlotWrapper = el as HTMLElement)}
          onClick={this.childrenClickHandler}
        >
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
    // Solve for if the item is clicked somewhere outside the slotted anchor.
    // Anchor is triggered anywhere you click
    const [link] = getSlottedElements(this.defaultSlotWrapper, "a");
    if (link && (e.composedPath()[0] as any).tagName.toLowerCase() !== "a") {
      const target = link.target === "" ? "_self" : link.target;
      window.open(link.href, target);
    }
    this.expanded = !this.expanded;
    this.calciteTreeItemSelect.emit({
      modifyCurrentSelection: (e as any).shiftKey,
      forceToggle: false
    });
  }

  iconClickHandler = (event: Event) => {
    event.stopPropagation();
    this.expanded = !this.expanded;
    this.calciteTreeItemSelect.emit({
      modifyCurrentSelection: (event as any).shiftKey,
      forceToggle: true
    });
  };
  childrenClickHandler = event => event.stopPropagation();

  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    let root;

    switch (e.keyCode) {
      case SPACE:
        this.selected = !this.selected;

        e.preventDefault();
        e.stopPropagation();
        break;
      case ENTER:
        // activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node. In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
        const link = nodeListToArray(this.el.children).find(e =>
          e.matches("a")
        ) as HTMLAnchorElement;

        if (link) {
          link.click();
          this.selected = true;
        } else {
          this.selected = !this.selected;
        }

        e.preventDefault();
        e.stopPropagation();
        break;
      case LEFT:
        // When focus is on an open node, closes the node.
        if (this.hasChildren && this.expanded) {
          this.expanded = false;

          e.preventDefault();
          e.stopPropagation();
          break;
        }

        // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
        const parentItem = this.el.parentElement.closest("calcite-tree-item");

        if (parentItem && (!this.hasChildren || this.expanded === false)) {
          parentItem.focus();

          e.preventDefault();
          e.stopPropagation();
          break;
        }

        // When focus is on a root node that is also either an end node or a closed node, does nothing.
        break;
      case RIGHT:
        // When focus is on a closed node, opens the node; focus does not move.
        if (this.hasChildren && this.expanded === false) {
          this.expanded = true;
          e.preventDefault();
          e.stopPropagation();
          break;
        }

        // When focus is on a open node, moves focus to the first child node.
        if (this.hasChildren && this.expanded) {
          this.el.querySelector("calcite-tree-item").focus();
          break;
        }

        // When focus is on an end node, does nothing.
        break;
      case UP:
        const previous = this.el
          .previousElementSibling as HTMLCalciteTreeItemElement;
        if (previous && previous.matches("calcite-tree-item")) {
          previous.focus();
        }
        break;
      case DOWN:
        const next = this.el.nextElementSibling as HTMLCalciteTreeItemElement;
        if (next && next.matches("calcite-tree-item")) {
          next.focus();
        }
        break;
      case HOME:
        root = this.el.closest("calcite-tree[root]") as HTMLCalciteTreeElement;

        const firstNode = root.querySelector("calcite-tree-item");

        firstNode.focus();

        break;
      case END:
        root = this.el.closest("calcite-tree[root]");

        let currentNode = root.children[root.children.length - 1]; // last child
        let currentTree = nodeListToArray(currentNode.children).find(e =>
          e.matches("calcite-tree")
        );
        while (currentTree) {
          currentNode = currentTree.children[root.children.length - 1];
          currentTree = nodeListToArray(currentNode.children).find(e =>
            e.matches("calcite-tree")
          );
        }
        currentNode.focus();
        break;
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

  childrenSlotWrapper!: HTMLElement;
  defaultSlotWrapper!: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
}
