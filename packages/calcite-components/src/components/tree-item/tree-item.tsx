import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import {
  filterDirectChildren,
  getElementDir,
  slotChangeGetAssignedElements,
  slotChangeHasAssignedElement,
  toAriaBoolean,
} from "../../utils/dom";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { CSS_UTILITY } from "../../utils/resources";
import { FlipContext, Scale, SelectionMode } from "../interfaces";
import { getIconScale } from "../../utils/component";
import { IconNameOrString } from "../icon/interfaces";
import { TreeItemSelectDetail } from "./interfaces";
import { CSS, ICONS, SLOTS } from "./resources";

/**
 * @slot - A slot for adding text.
 * @slot children - A slot for adding nested `calcite-tree` elements.
 * @slot actions-end - A slot for adding actions to the end of the component. It is recommended to use two or fewer actions.
 */
@Component({
  tag: "calcite-tree-item",
  styleUrl: "tree-item.scss",
  shadow: true,
})
export class TreeItem implements InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /** Accessible name for the component. */
  @Prop() label: string;

  /** When `true`, the component is expanded. */
  @Prop({ mutable: true, reflect: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(): void {
    this.updateChildTree();
  }

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: IconNameOrString;

  /** When `true`, the component is selected. */
  @Prop({ mutable: true, reflect: true }) selected = false;

  @Watch("selected")
  handleSelectedChange(value: boolean): void {
    if (this.selectionMode === "ancestors" && !this.userChangedValue) {
      if (value) {
        this.indeterminate = false;
      }
      this.calciteInternalTreeItemSelect.emit({
        modifyCurrentSelection: true,
        updateItem: false,
      });
    }
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
  // eslint-disable-next-line @stencil-community/strict-mutable -- ignoring until https://github.com/stencil-community/stencil-eslint/issues/111 is fixed
  @Prop({ reflect: true, mutable: true }) indeterminate = false;

  /**
   * @internal
   */
  @Prop({ mutable: true, reflect: true }) selectionMode: SelectionMode;

  @Watch("selectionMode")
  getSelectionMode(): void {
    this.isSelectionMultiLike =
      this.selectionMode === "multiple" || this.selectionMode === "multichildren";
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.parentTreeItem = this.el.parentElement?.closest("calcite-tree-item");
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

  componentWillLoad(): void {
    requestAnimationFrame(() => (this.updateAfterInitialRender = true));
  }

  componentDidLoad(): void {
    this.updateAncestorTree();
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTreeItemElement;

  private isSelectionMultiLike: boolean;

  render(): VNode {
    const rtl = getElementDir(this.el) === "rtl";
    const showBulletPoint =
      this.selectionMode === "single" ||
      this.selectionMode === "children" ||
      this.selectionMode === "single-persist";
    const showCheckmark =
      this.selectionMode === "multiple" || this.selectionMode === "multichildren";
    const showBlank = this.selectionMode === "none" && !this.hasChildren;
    const checkboxIsIndeterminate = this.hasChildren && this.indeterminate;

    const chevron = this.hasChildren ? (
      <calcite-icon
        class={{
          [CSS.chevron]: true,
          [CSS_UTILITY.rtl]: rtl,
        }}
        data-test-id="icon"
        icon={ICONS.chevronRight}
        onClick={this.iconClickHandler}
        scale={getIconScale(this.scale)}
      />
    ) : null;
    const defaultSlotNode: VNode = <slot key="default-slot" />;

    const checkbox =
      this.selectionMode === "ancestors" ? (
        <div class={CSS.checkboxContainer}>
          <calcite-icon
            class={CSS.checkbox}
            icon={
              this.selected
                ? ICONS.checkSquareF
                : checkboxIsIndeterminate
                  ? ICONS.minusSquareF
                  : ICONS.square
            }
            scale={getIconScale(this.scale)}
          />
          <label class={CSS.checkboxLabel}>{defaultSlotNode}</label>
        </div>
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
          [CSS_UTILITY.rtl]: rtl,
        }}
        icon={selectedIcon}
        scale={getIconScale(this.scale)}
      />
    ) : null;

    const hidden = !(this.parentExpanded || this.depth === 1);
    const isExpanded = this.updateAfterInitialRender && this.expanded;
    const { hasEndActions } = this;
    const slotNode = (
      <slot
        key="actionsEndSlot"
        name={SLOTS.actionsEnd}
        onSlotchange={this.actionsEndSlotChangeHandler}
      />
    );

    const iconStartEl = (
      <calcite-icon
        class={CSS.iconStart}
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale={getIconScale(this.scale)}
      />
    );

    return (
      <Host
        aria-checked={
          this.selectionMode === "multiple" ||
          this.selectionMode === "multichildren" ||
          this.selectionMode === "ancestors"
            ? toAriaBoolean(this.selected)
            : undefined
        }
        aria-expanded={this.hasChildren ? toAriaBoolean(isExpanded) : undefined}
        aria-hidden={toAriaBoolean(hidden)}
        aria-live="polite"
        aria-selected={
          this.selectionMode === "single" ||
          this.selectionMode === "children" ||
          this.selectionMode === "single-persist"
            ? toAriaBoolean(this.selected)
            : undefined
        }
        calcite-hydrated-hidden={hidden}
        role="treeitem"
        tabIndex={this.disabled ? -1 : 0}
      >
        <InteractiveContainer disabled={this.disabled}>
          <div class={{ [CSS.itemExpanded]: isExpanded }}>
            <div class={CSS.nodeAndActionsContainer}>
              <div
                class={{
                  [CSS.nodeContainer]: true,
                  [CSS_UTILITY.rtl]: rtl,
                }}
                data-selection-mode={this.selectionMode}
              >
                {chevron}
                {itemIndicator}
                {this.iconStart ? iconStartEl : null}
                {checkbox ? checkbox : defaultSlotNode}
              </div>
              <div
                class={CSS.actionsEnd}
                hidden={!hasEndActions}
                ref={(el) => (this.actionSlotWrapper = el as HTMLElement)}
              >
                {slotNode}
              </div>
            </div>

            <div
              class={{
                [CSS.childrenContainer]: true,
                [CSS_UTILITY.rtl]: rtl,
              }}
              data-test-id="calcite-tree-children"
              onClick={this.childrenClickHandler}
              role={this.hasChildren ? "group" : undefined}
            >
              <slot name={SLOTS.children} onSlotchange={this.handleChildrenSlotChange} />
            </div>
          </div>
        </InteractiveContainer>
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
    if (this.disabled || this.isActionEndEvent(event)) {
      return;
    }

    // Solve for if the item is clicked somewhere outside the slotted anchor.
    // Anchor is triggered anywhere you click
    const [link] = filterDirectChildren<HTMLAnchorElement>(this.el, "a");
    if (link && (event.composedPath()[0] as any).tagName.toLowerCase() !== "a") {
      const target = link.target === "" ? "_self" : link.target;
      window.open(link.href, target);
    }
    this.calciteInternalTreeItemSelect.emit({
      modifyCurrentSelection: this.selectionMode === "ancestors" || this.isSelectionMultiLike,
      updateItem: true,
    });
    this.userChangedValue = true;
  }

  private iconClickHandler = (event: MouseEvent): void => {
    event.stopPropagation();
    this.expanded = !this.expanded;
  };

  private childrenClickHandler = (event: MouseEvent): void => event.stopPropagation();

  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
    if (this.isActionEndEvent(event) || event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case " ":
        this.userChangedValue = true;
        this.calciteInternalTreeItemSelect.emit({
          modifyCurrentSelection: this.isSelectionMultiLike,
          updateItem: true,
        });
        event.preventDefault();
        break;
      case "Enter": {
        // activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node. In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
        const link = Array.from(this.el.children).find((el) =>
          el.matches("a"),
        ) as HTMLAnchorElement;

        this.userChangedValue = true;

        if (link) {
          link.click();
          this.selected = true;
        } else {
          this.calciteInternalTreeItemSelect.emit({
            modifyCurrentSelection: this.isSelectionMultiLike,
            updateItem: true,
          });
        }
        event.preventDefault();
      }
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

  @State() hasEndActions = false;

  /**
   * Used to make sure initially expanded tree-item can properly
   * transition and emit events from closed state when rendered.
   *
   * @private
   */
  @State() updateAfterInitialRender = false;

  actionSlotWrapper!: HTMLElement;

  private parentTreeItem?: HTMLCalciteTreeItemElement;

  private userChangedValue = false;

  private childTree: HTMLCalciteTreeElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private updateChildTree(): void {
    const { childTree } = this;

    if (!childTree) {
      return;
    }

    childTree.parentExpanded = this.expanded;
  }

  private handleChildrenSlotChange = (event: Event): void => {
    const childTree = slotChangeGetAssignedElements(event).filter(
      (el): el is HTMLCalciteTreeElement => el.matches("calcite-tree"),
    )[0];

    this.childTree = childTree;

    this.updateChildTree();
  };

  private isActionEndEvent(event: Event): boolean {
    const composedPath = event.composedPath();
    return composedPath.includes(this.actionSlotWrapper);
  }

  /**
   * This is meant to be called in `componentDidLoad` in order to take advantage of the hierarchical component lifecycle
   * and help check for item selection as items are initialized
   *
   * @private
   */
  private updateAncestorTree(): void {
    const parentItem = this.parentTreeItem;
    if (this.selectionMode !== "ancestors" || !parentItem) {
      return;
    }

    if (this.selected) {
      const parentTree = this.el.parentElement;
      const siblings = Array.from(parentTree?.children);
      const selectedSiblings = siblings.filter(
        (child: HTMLCalciteTreeItemElement) => child.selected,
      );

      if (siblings.length === selectedSiblings.length) {
        parentItem.selected = true;
        parentItem.indeterminate = false;
      } else if (selectedSiblings.length > 0) {
        parentItem.indeterminate = true;
      }

      const childItems = Array.from(
        this.el.querySelectorAll<HTMLCalciteTreeItemElement>("calcite-tree-item:not([disabled])"),
      );

      childItems.forEach((item: HTMLCalciteTreeItemElement) => {
        item.selected = true;
        item.indeterminate = false;
      });
    } else if (this.indeterminate) {
      const parentItem = this.parentTreeItem;
      parentItem.indeterminate = true;
    }
  }

  private actionsEndSlotChangeHandler = (event: Event): void => {
    this.hasEndActions = slotChangeHasAssignedElement(event);
  };
}
