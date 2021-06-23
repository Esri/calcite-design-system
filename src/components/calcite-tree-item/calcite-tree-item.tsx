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
  h,
  VNode
} from "@stencil/core";
import { TreeItemSelectDetail } from "./interfaces";
import { TreeSelectionMode } from "../calcite-tree/interfaces";

import { nodeListToArray, getElementDir, filterDirectChildren, getSlotted } from "../../utils/dom";
import { getKey } from "../../utils/key";

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

  @Element() el: HTMLCalciteTreeItemElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Is the item currently selected */
  @Prop({ mutable: true, reflect: true }) selected = false;

  /** True if the item is in an expanded state */
  @Prop({ mutable: true, reflect: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(newValue: boolean): void {
    const items = getSlotted<HTMLCalciteTreeItemElement>(this.el, "children", {
      all: true,
      selector: "calcite-tree-item"
    });

    items.forEach((item) => (item.parentExpanded = newValue));
  }

  /** @internal Is the parent of this item expanded? */
  @Prop() parentExpanded = false;

  /** @internal What level of depth is this item at? */
  @Prop({ reflect: true, mutable: true }) depth = -1;

  /** @internal Does this tree item have a tree inside it? */
  @Prop({ reflect: true, mutable: true }) hasChildren: boolean = null;

  /** @internal Draw lines (set on parent) */
  @Prop({ reflect: true, mutable: true }) lines: boolean;

  /** @internal Display checkboxes (set on parent) */
  @Prop({ reflect: true, mutable: true }) inputEnabled: boolean;

  /** @internal Scale of the parent tree, defaults to m */
  @Prop({ reflect: true, mutable: true }) scale: "s" | "m";

  /**
   * @internal
   * In ancestor selection mode using inputEnabled,
   * show as indeterminate when only some children are selected
   **/
  @Prop({ reflect: true }) indeterminate: boolean;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.expandedHandler(this.expanded);
  }

  componentWillRender(): void {
    this.hasChildren = !!this.el.querySelector("calcite-tree");
    this.depth = 0;
    this.el.dir = getElementDir(this.el);

    let parentTree = this.el.closest("calcite-tree");

    if (!parentTree) {
      return;
    }

    this.selectionMode = parentTree.selectionMode;
    this.scale = parentTree.scale || "m";
    this.lines = parentTree.lines;
    this.inputEnabled = parentTree.inputEnabled;

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

  render(): VNode {
    const icon = this.hasChildren ? (
      <calcite-icon
        class="calcite-tree-chevron"
        data-test-id="icon"
        icon="chevron-right"
        onClick={this.iconClickHandler}
        scale="s"
      />
    ) : null;
    const checkbox = this.inputEnabled ? (
      <label class="calcite-tree-label">
        <calcite-checkbox
          checked={this.selected}
          class="calcite-tree-checkbox"
          data-test-id="checkbox"
          indeterminate={this.hasChildren && this.indeterminate}
          onClick={this.checkboxClickHandler}
          scale={this.scale}
          tabIndex={-1}
        />
        <slot />
      </label>
    ) : null;

    const hidden = !(this.parentExpanded || this.depth === 1);

    return (
      <Host
        aria-expanded={this.hasChildren ? this.expanded.toString() : undefined}
        aria-hidden={hidden.toString()}
        aria-selected={
          this.selected
            ? "true"
            : this.selectionMode === TreeSelectionMode.Multi ||
              this.selectionMode === TreeSelectionMode.MultiChildren
            ? "false"
            : undefined
        }
        calcite-hydrated-hidden={hidden}
        role="treeitem"
        tabindex={this.parentExpanded || this.depth === 1 ? "0" : "-1"}
      >
        <div class="calcite-tree-node" ref={(el) => (this.defaultSlotWrapper = el as HTMLElement)}>
          {icon}
          {checkbox ? checkbox : <slot />}
        </div>
        <div
          class="calcite-tree-children"
          data-test-id="calcite-tree-children"
          onClick={this.childrenClickHandler}
          ref={(el) => (this.childrenSlotWrapper = el as HTMLElement)}
          role={this.hasChildren ? "group" : undefined}
        >
          <slot name="children" />
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click") onClick(e: Event): void {
    // Solve for if the item is clicked somewhere outside the slotted anchor.
    // Anchor is triggered anywhere you click
    const [link] = filterDirectChildren<HTMLAnchorElement>(this.el, "a");
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

  iconClickHandler = (event: MouseEvent): void => {
    event.stopPropagation();
    this.expanded = !this.expanded;
    if (!this.inputEnabled) {
      this.calciteTreeItemSelect.emit({
        modifyCurrentSelection: event.shiftKey,
        forceToggle: true
      });
    }
  };

  childrenClickHandler = (event: MouseEvent): void => event.stopPropagation();

  checkboxClickHandler = (event: Event): void => {
    event.stopPropagation();
    this.calciteTreeItemSelect.emit({
      modifyCurrentSelection: (event as any).shiftKey,
      forceToggle: true
    });
    this.el.focus();
  };

  @Listen("keydown") keyDownHandler(e: KeyboardEvent): void {
    let root;

    switch (getKey(e.key)) {
      case " ":
        this.calciteTreeItemSelect.emit({
          modifyCurrentSelection: e.shiftKey,
          forceToggle: true
        });

        e.preventDefault();
        e.stopPropagation();
        break;
      case "Enter":
        // activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node. In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
        const link = nodeListToArray(this.el.children).find((e) =>
          e.matches("a")
        ) as HTMLAnchorElement;

        if (link) {
          link.click();
          this.selected = true;
        } else {
          this.calciteTreeItemSelect.emit({
            modifyCurrentSelection: e.shiftKey,
            forceToggle: true
          });
        }

        e.preventDefault();
        e.stopPropagation();
        break;
      case "ArrowLeft":
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
      case "ArrowRight":
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
      case "ArrowUp":
        const previous = this.el.previousElementSibling as HTMLCalciteTreeItemElement;
        if (previous && previous.matches("calcite-tree-item")) {
          previous.focus();
        }
        break;
      case "ArrowDown":
        const next = this.el.nextElementSibling as HTMLCalciteTreeItemElement;
        if (next && next.matches("calcite-tree-item")) {
          next.focus();
        }
        break;
      case "Home":
        root = this.el.closest("calcite-tree:not([child])") as HTMLCalciteTreeElement;

        const firstNode = root.querySelector("calcite-tree-item");

        firstNode.focus();

        break;
      case "End":
        root = this.el.closest("calcite-tree:not([child])");

        let currentNode = root.children[root.children.length - 1]; // last child
        let currentTree = nodeListToArray(currentNode.children).find((e) =>
          e.matches("calcite-tree")
        );
        while (currentTree) {
          currentNode = currentTree.children[root.children.length - 1];
          currentTree = nodeListToArray(currentNode.children).find((e) =>
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

  /**
   * @internal
   */
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
