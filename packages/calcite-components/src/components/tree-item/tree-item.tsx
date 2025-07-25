// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, createEvent, h, state, JsxNode, setAttribute } from "@arcgis/lumina";
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
import type { Tree } from "../tree/tree";
import { TreeItemSelectDetail } from "./interfaces";
import { CSS, ICONS, SLOTS } from "./resources";
import { styles } from "./tree-item.scss";

declare global {
  interface DeclareElements {
    "calcite-tree-item": TreeItem;
  }
}

/**
 * @slot - A slot for adding text.
 * @slot children - A slot for adding nested `calcite-tree` elements.
 * @slot actions-end - A slot for adding actions to the end of the component. It is recommended to use two or fewer actions.
 */
export class TreeItem extends LitElement implements InteractiveComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private actionSlotWrapper = createRef<HTMLDivElement>();

  private childTree: Tree["el"];

  private isSelectionMultiLike: boolean;

  private parentTreeItem?: TreeItem["el"];

  private userChangedValue = false;

  //#endregion

  //#region State Properties

  @state() private hasEndActions = false;

  /**
   * Used to make sure initially expanded tree-item can properly
   * transition and emit events from closed state when rendered.
   *
   * @private
   */
  @state() updateAfterInitialRender = false;

  //#endregion

  //#region Public Properties

  /** @private */
  @property({ reflect: true }) depth = -1;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, the component is expanded to show child components. */
  @property({ reflect: true }) expanded = false;

  /** @private */
  @property({ reflect: true }) get hasChildren(): boolean {
    return !!this.childTree;
  }

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @property({ reflect: true }) iconStart: IconNameOrString;

  /**
   * In ancestor selection mode, show as indeterminate when only some children are selected.
   *
   * @private
   */
  @property({ reflect: true }) indeterminate = false;

  /** Accessible name for the component. */
  @property() label: string;

  /** @private */
  @property({ reflect: true }) lines: boolean;

  /** @private */
  @property() parentExpanded = false;

  /** @private */
  @property({ reflect: true }) scale: Scale;

  /** When `true`, the component is selected. */
  @property({ reflect: true }) selected = false;

  /** @private */
  @property({ reflect: true }) selectionMode: SelectionMode;

  //#endregion

  //#region Events

  /** @private */
  calciteInternalTreeItemSelect = createEvent<TreeItemSelectDetail>({ cancelable: false });

  /** Fires when the component's content area is collapsed. */
  calciteTreeItemCollapsed = createEvent({ cancelable: false });

  /** Fires when the component's content area is expanded. */
  calciteTreeItemExpanded = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("click", this.onClick);
    this.listen("keydown", this.keyDownHandler);
  }

  override connectedCallback(): void {
    this.parentTreeItem = this.el.parentElement?.closest("calcite-tree-item");
  }

  load(): void {
    requestAnimationFrame(() => (this.updateAfterInitialRender = true));
  }

  override willUpdate(changes: PropertyValues<this>): void {
    this.preWillUpdate();
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("expanded") && this.hasUpdated) {
      if (this.expanded) {
        this.updateChildTree();
        this.calciteTreeItemExpanded.emit();
      } else {
        this.calciteTreeItemCollapsed.emit();
      }
    }

    if (changes.has("selected") && (this.hasUpdated || this.selected !== false)) {
      this.handleSelectedChange(this.selected);
    }

    if (changes.has("selectionMode")) {
      this.getSelectionMode();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    this.updateAncestorTree();
  }

  //#endregion

  //#region Private Methods

  private handleSelectedChange(value: boolean): void {
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

  private getSelectionMode(): void {
    this.isSelectionMultiLike =
      this.selectionMode === "multiple" || this.selectionMode === "multichildren";
  }

  private onClick(event: Event): void {
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

  private iconClickHandler(event: MouseEvent): void {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }

  private childrenClickHandler(event: MouseEvent): void {
    event.stopPropagation();
  }

  private keyDownHandler(event: KeyboardEvent): void {
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

  private updateChildTree(): void {
    const { childTree } = this;

    if (!childTree) {
      return;
    }

    childTree.parentExpanded = this.expanded;
  }

  private handleChildrenSlotChange(event: Event): void {
    const childTree = slotChangeGetAssignedElements(event).filter((el): el is Tree["el"] =>
      el.matches("calcite-tree"),
    )[0];

    this.childTree = childTree;
    this.requestUpdate("hasChildren");

    this.updateChildTree();
  }

  private isActionEndEvent(event: Event): boolean {
    const composedPath = event.composedPath();
    return composedPath.includes(this.actionSlotWrapper.value);
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
      const selectedSiblings = siblings.filter((child: TreeItem["el"]) => child.selected);

      if (siblings.length === selectedSiblings.length) {
        parentItem.selected = true;
        parentItem.indeterminate = false;
      } else if (selectedSiblings.length > 0) {
        parentItem.indeterminate = true;
      }

      const childItems = Array.from(
        this.el.querySelectorAll<TreeItem["el"]>("calcite-tree-item:not([disabled])"),
      );

      childItems.forEach((item: TreeItem["el"]) => {
        item.selected = true;
        item.indeterminate = false;
      });
    } else if (this.indeterminate) {
      const parentItem = this.parentTreeItem;
      parentItem.indeterminate = true;
    }
  }

  private actionsEndSlotChangeHandler(event: Event): void {
    this.hasEndActions = slotChangeHasAssignedElement(event);
  }

  preWillUpdate(): void {
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

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const rtl = getElementDir(this.el) === "rtl";
    const showBulletPoint =
      this.selectionMode === "single" ||
      this.selectionMode === "children" ||
      this.selectionMode === "single-persist";
    const showCheckmark =
      this.selectionMode === "multiple" || this.selectionMode === "multichildren";
    const showBlank = this.selectionMode === "none" && !this.hasChildren;
    const checkboxIsIndeterminate = this.hasChildren && this.indeterminate;

    const chevron =
      this.hasChildren || this.selectionMode === "ancestors" ? (
        <calcite-icon
          class={{
            [CSS.chevron]: true,
            [CSS_UTILITY.rtl]: rtl,
          }}
          data-test-id="icon"
          icon={this.hasChildren ? ICONS.chevronRight : ICONS.blank}
          onClick={this.iconClickHandler}
          scale={getIconScale(this.scale)}
        />
      ) : null;
    const defaultSlotNode: JsxNode = <slot key="default-slot" />;

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
        onSlotChange={this.actionsEndSlotChangeHandler}
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
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaChecked =
      this.selectionMode === "multiple" ||
      this.selectionMode === "multichildren" ||
      this.selectionMode === "ancestors"
        ? toAriaBoolean(this.selected)
        : undefined;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaExpanded = this.hasChildren ? toAriaBoolean(isExpanded) : undefined;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.inert = hidden;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLive = "polite";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaSelected =
      this.selectionMode === "single" ||
      this.selectionMode === "children" ||
      this.selectionMode === "single-persist"
        ? toAriaBoolean(this.selected)
        : undefined;
    this.el.toggleAttribute("calcite-hydrated-hidden", hidden);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "treeitem";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "tabIndex", this.disabled ? -1 : 0);

    return (
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
              {checkbox ? checkbox : null}
              {this.iconStart ? iconStartEl : null}
              {checkbox ? (
                <label class={CSS.checkboxLabel}>{defaultSlotNode}</label>
              ) : (
                defaultSlotNode
              )}
            </div>
            <div class={CSS.actionsEnd} hidden={!hasEndActions} ref={this.actionSlotWrapper}>
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
            <slot name={SLOTS.children} onSlotChange={this.handleChildrenSlotChange} />
          </div>
        </div>
      </InteractiveContainer>
    );
  }

  //#endregion
}
