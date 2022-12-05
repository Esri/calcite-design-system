import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Listen,
  Watch,
  h,
  VNode
} from "@stencil/core";
import { TreeItemSelectDetail } from "./interfaces";
import { TreeSelectionMode } from "../tree/interfaces";
import {
  nodeListToArray,
  getElementDir,
  filterDirectChildren,
  getSlotted,
  toAriaBoolean
} from "../../utils/dom";

import { Scale } from "../interfaces";
import { CSS, SLOTS, ICONS } from "./resources";
import { CSS_UTILITY } from "../../utils/resources";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";

/**
 * @slot - A slot for adding the component's content.
 * @slot children - A slot for adding nested `calcite-tree` elements.
 */
@Component({
  tag: "calcite-tree-item",
  styleUrl: "tree-item.scss",
  shadow: true
})
export class TreeItem implements ConditionalSlotComponent, InteractiveComponent {
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

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /** When `true`, the component is selected. */
  @Prop({ mutable: true, reflect: true }) selected = false;

  /** When `true`, the component is expanded. */
  @Prop({ mutable: true, reflect: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(newValue: boolean): void {
    this.updateParentIsExpanded(this.el, newValue);
  }

  /**
   * @internal
   */
  @Prop() parentExpanded = false;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) depth = -1;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) hasChildren: boolean = null;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) lines: boolean;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) scale: Scale;

  /**
   * In ancestor selection mode, show as indeterminate when only some children are selected.
   *
   * @internal
   */
  @Prop({ reflect: true }) indeterminate: boolean;

  /**
   * @internal
   */
  @Prop({ mutable: true, reflect: true }) selectionMode: TreeSelectionMode;

  @Watch("selectionMode")
  getselectionMode(): void {
    this.isSelectionMultiLike =
      this.selectionMode === "multiple" ||
      this.selectionMode === "multi" ||
      this.selectionMode === "multichildren";
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.parentTreeItem = this.el.parentElement?.closest("calcite-tree-item");
    if (this.parentTreeItem) {
      const { expanded } = this.parentTreeItem;
      this.updateParentIsExpanded(this.parentTreeItem, expanded);
    }
    connectConditionalSlotComponent(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }

  componentWillRender(): void {
    this.hasChildren = !!this.el.querySelector("calcite-tree");
    this.depth = 0;
    let parentTree = this.el.closest("calcite-tree");

    if (!parentTree) {
      return;
    }

    this.selectionMode = parentTree.selectionMode;
    this.scale = parentTree.scale || "m";
    this.lines = parentTree.lines;

    let nextParentTree;
    while (parentTree) {
      nextParentTree = parentTree.parentElement?.closest("calcite-tree");
      if (nextParentTree === parentTree) {
        break;
      } else {
        parentTree = nextParentTree;
        this.depth = this.depth + 1;
      }
    }
  }

  componentDidLoad(): void {
    this.updateAncestorTree();
  }

  componentDidRender(): void {
    updateHostInteraction(this, () => this.parentExpanded || this.depth === 1);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private isSelectionMultiLike: boolean;

  render(): VNode {
    const rtl = getElementDir(this.el) === "rtl";
    const showBulletPoint = this.selectionMode === "single" || this.selectionMode === "children";
    const showCheckmark =
      this.selectionMode === "multi" ||
      this.selectionMode === "multiple" ||
      this.selectionMode === "multichildren";
    const showBlank = this.selectionMode === "none" && !this.hasChildren;
    const chevron = this.hasChildren ? (
      <calcite-icon
        class={{
          [CSS.chevron]: true,
          [CSS_UTILITY.rtl]: rtl
        }}
        data-test-id="icon"
        icon={ICONS.chevronRight}
        onClick={this.iconClickHandler}
        scale="s"
      />
    ) : null;
    const defaultSlotNode: VNode = <slot key="default-slot" />;
    const checkbox =
      this.selectionMode === "ancestors" ? (
        <label class={CSS.checkboxLabel} key="checkbox-label">
          <calcite-checkbox
            checked={this.selected}
            class={CSS.checkbox}
            data-test-id="checkbox"
            indeterminate={this.hasChildren && this.indeterminate}
            scale={this.scale}
            tabIndex={-1}
          />
          {defaultSlotNode}
        </label>
      ) : null;
    const selectedIcon = showBulletPoint
      ? ICONS.bulletPoint
      : showCheckmark
      ? ICONS.checkmark
      : showBlank
      ? ICONS.blank
      : null;
    const itemIndicator = selectedIcon ? (
      <calcite-icon
        class={{
          [CSS.bulletPointIcon]: selectedIcon === ICONS.bulletPoint,
          [CSS.checkmarkIcon]: selectedIcon === ICONS.checkmark,
          [CSS_UTILITY.rtl]: rtl
        }}
        icon={selectedIcon}
        scale="s"
      />
    ) : null;

    const hidden = !(this.parentExpanded || this.depth === 1);

    return (
      <Host
        aria-expanded={this.hasChildren ? toAriaBoolean(this.expanded) : undefined}
        aria-hidden={toAriaBoolean(hidden)}
        aria-selected={this.selected ? "true" : showCheckmark ? "false" : undefined}
        calcite-hydrated-hidden={hidden}
        role="treeitem"
      >
        <div
          class={{
            [CSS.nodeContainer]: true,
            [CSS_UTILITY.rtl]: rtl
          }}
          data-selection-mode={this.selectionMode}
          ref={(el) => (this.defaultSlotWrapper = el as HTMLElement)}
        >
          {chevron}
          {itemIndicator}
          {checkbox ? checkbox : defaultSlotNode}
        </div>
        <div
          class={{
            [CSS.childrenContainer]: true,
            [CSS_UTILITY.rtl]: rtl
          }}
          data-test-id="calcite-tree-children"
          onClick={this.childrenClickHandler}
          ref={(el) => (this.childrenSlotWrapper = el as HTMLElement)}
          role={this.hasChildren ? "group" : undefined}
        >
          <slot name={SLOTS.children} />
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click")
  onClick(event: Event): void {
    // Solve for if the item is clicked somewhere outside the slotted anchor.
    // Anchor is triggered anywhere you click
    const [link] = filterDirectChildren<HTMLAnchorElement>(this.el, "a");
    if (link && (event.composedPath()[0] as any).tagName.toLowerCase() !== "a") {
      const target = link.target === "" ? "_self" : link.target;
      window.open(link.href, target);
    }
    this.calciteInternalTreeItemSelect.emit({
      modifyCurrentSelection: this.selectionMode === "ancestors" || this.isSelectionMultiLike,
      forceToggle: false
    });
  }

  iconClickHandler = (event: MouseEvent): void => {
    event.stopPropagation();
    this.expanded = !this.expanded;
  };

  childrenClickHandler = (event: MouseEvent): void => event.stopPropagation();

  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
    let root;

    switch (event.key) {
      case " ":
        if (this.selectionMode === "none") {
          return;
        }
        this.calciteInternalTreeItemSelect.emit({
          modifyCurrentSelection: this.isSelectionMultiLike,
          forceToggle: false
        });
        event.preventDefault();
        break;
      case "Enter":
        if (this.selectionMode === "none") {
          return;
        }
        // activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node. In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
        const link = nodeListToArray(this.el.children).find((el) =>
          el.matches("a")
        ) as HTMLAnchorElement;

        if (link) {
          link.click();
          this.selected = true;
        } else {
          this.calciteInternalTreeItemSelect.emit({
            modifyCurrentSelection: this.isSelectionMultiLike,
            forceToggle: false
          });
        }

        event.preventDefault();
        break;
      case "Home":
        root = this.el.closest("calcite-tree:not([child])") as HTMLCalciteTreeElement;

        const firstNode = root.querySelector("calcite-tree-item");

        firstNode?.focus();

        break;
      case "End":
        root = this.el.closest("calcite-tree:not([child])");

        let currentNode = root.children[root.children.length - 1]; // last child
        let currentTree = nodeListToArray(currentNode.children).find((el) =>
          el.matches("calcite-tree")
        );
        while (currentTree) {
          currentNode = currentTree.children[root.children.length - 1];
          currentTree = nodeListToArray(currentNode.children).find((el) =>
            el.matches("calcite-tree")
          );
        }
        currentNode?.focus();
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
  @Event({ cancelable: false }) calciteInternalTreeItemSelect: EventEmitter<TreeItemSelectDetail>;

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

  childrenSlotWrapper!: HTMLElement;

  defaultSlotWrapper!: HTMLElement;

  private parentTreeItem?: HTMLCalciteTreeItemElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private updateParentIsExpanded = (el: HTMLCalciteTreeItemElement, expanded: boolean): void => {
    const items = getSlotted<HTMLCalciteTreeItemElement>(el, SLOTS.children, {
      all: true,
      selector: "calcite-tree-item"
    });
    items.forEach((item) => (item.parentExpanded = expanded));
  };

  private updateAncestorTree = (): void => {
    if (this.selected && this.selectionMode === "ancestors") {
      const ancestors: HTMLCalciteTreeItemElement[] = [];
      let parent = this.parentTreeItem;
      while (parent) {
        ancestors.push(parent);
        parent = parent.parentElement?.closest("calcite-tree-item");
      }
      ancestors.forEach((item) => (item.indeterminate = true));
      return;
    }
  };
}
