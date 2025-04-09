// @ts-strict-ignore
import Sortable from "sortablejs";
import { debounce } from "lodash-es";
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { createObserver } from "../../utils/observers";
import {
  connectSortableComponent,
  disconnectSortableComponent,
  SortableComponent,
} from "../../utils/sortableComponent";
import { componentFocusable } from "../../utils/component";
import { MoveEventDetail, MoveTo, ReorderEventDetail } from "../sort-handle/interfaces";
import { DEBOUNCE } from "../../utils/resources";
import { Block } from "../block/block";
import { focusFirstTabbable, getRootNode } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { isBlock } from "../block/utils";
import { blockGroupSelector, blockSelector, CSS } from "./resources";
import { styles } from "./block-group.scss";
import { BlockDragDetail } from "./interfaces";
import { updateBlockChildren } from "./utils";

declare global {
  interface DeclareElements {
    "calcite-block-group": BlockGroup;
  }
}

/**
 * @slot - A slot for adding `calcite-block` elements.
 */
export class BlockGroup extends LitElement implements InteractiveComponent, SortableComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  dragSelector = blockSelector;

  handleSelector = "calcite-sort-handle";

  mutationObserver = createObserver("mutation", () => {
    this.updateBlockItems();
  });

  private parentBlockGroupEl: BlockGroup["el"];

  sortable: Sortable;

  private updateBlockItems = debounce((): void => {
    this.updateGroupItems();
    const { dragEnabled, el, moveToItems } = this;

    const items = Array.from(this.el.querySelectorAll(blockSelector));

    items.forEach((item) => {
      if (item.closest(blockGroupSelector) === el) {
        item.moveToItems = moveToItems.filter(
          (moveToItem) => moveToItem.element !== el && !item.contains(moveToItem.element),
        );
        item.dragHandle = dragEnabled;
      }
    });

    this.setUpSorting();
  }, DEBOUNCE.nextTick);

  // #endregion

  // #region State Properties

  @state() assistiveText: string;

  @state() moveToItems: MoveTo[] = [];

  // #endregion

  // #region Public Properties

  /** When provided, the method will be called to determine whether the element can move from the component. */
  @property() canPull: (detail: BlockDragDetail) => boolean;

  /** When provided, the method will be called to determine whether the element can be added from another component. */
  @property() canPut: (detail: BlockDragDetail) => boolean;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, `calcite-block`s are sortable via a draggable button. */
  @property({ reflect: true }) dragEnabled = false;

  /**
   * The block-group's group identifier.
   *
   * To drag elements from one group into another, both groups must have the same group value.
   */
  @property({ reflect: true }) group?: string;

  /**
   * Specifies an accessible name for the component.
   *
   * When `dragEnabled` is `true` and multiple group sorting is enabled with `group`, specifies the component's name for dragging between groups.
   *
   * @required
   */
  @property() label: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  // #endregion

  // #region Public Methods

  /**
   * Sets focus on the component's first focusable element.
   *
   * @returns {Promise<void>}
   */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    focusFirstTabbable(this.el);
  }

  /**
   * Emits a `calciteBlockGroupMoveHalt` event.
   *
   * @private
   * @param dragDetail
   */
  @method()
  putFailed(dragDetail: BlockDragDetail): void {
    this.calciteBlockGroupMoveHalt.emit(dragDetail);
  }

  // #endregion

  // #region Events

  /** Fires when the component's dragging has ended. */
  calciteBlockGroupDragEnd = createEvent<BlockDragDetail>({ cancelable: false });

  /** Fires when the component's dragging has started. */
  calciteBlockGroupDragStart = createEvent<BlockDragDetail>({ cancelable: false });

  /** Fires when the component's item order changes. */
  calciteBlockGroupOrderChange = createEvent<BlockDragDetail>({ cancelable: false });

  /** Fires when a user attempts to move an element using the sort menu and 'canPut' or 'canPull' returns falsy. */
  calciteBlockGroupMoveHalt = createEvent<BlockDragDetail>({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();

    this.listen(
      "calciteInternalAssistiveTextChange",
      this.handleCalciteInternalAssistiveTextChange,
    );
    this.listen("calciteSortHandleReorder", this.handleSortReorder);
    this.listen("calciteSortHandleMove", this.handleSortMove);
  }

  override connectedCallback(): void {
    this.connectObserver();
    this.updateBlockItems();
    this.setUpSorting();
    this.setParentBlockGroup();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (
      changes.has("group") ||
      (changes.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== false))
    ) {
      this.updateBlockItems();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  override disconnectedCallback(): void {
    this.disconnectObserver();
    disconnectSortableComponent(this);
  }

  // #endregion

  // #region Private Methods

  private updateGroupItems(): void {
    const { el, group } = this;

    const rootNode = getRootNode(el);

    const blockGroups = group
      ? Array.from(
          rootNode.querySelectorAll<BlockGroup["el"]>(`${blockGroupSelector}[group="${group}"]`),
        ).filter((blockGroup) => !blockGroup.disabled && blockGroup.dragEnabled)
      : [];

    this.moveToItems = blockGroups.map((element) => ({
      element,
      label: element.label ?? element.id,
      id: guid(),
    }));
  }

  private handleCalciteInternalAssistiveTextChange(event: CustomEvent): void {
    this.assistiveText = event.detail.message;
    event.stopPropagation();
  }

  private handleSortReorder(event: CustomEvent<ReorderEventDetail>): void {
    if (this.parentBlockGroupEl) {
      return;
    }

    event.stopPropagation();
    this.handleReorder(event);
  }

  private handleSortMove(event: CustomEvent<MoveEventDetail>): void {
    if (this.parentBlockGroupEl) {
      return;
    }

    event.stopPropagation();
    this.handleMove(event);
  }

  private connectObserver(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  private disconnectObserver(): void {
    this.mutationObserver?.disconnect();
  }

  private setUpSorting(): void {
    const { dragEnabled } = this;

    if (!dragEnabled) {
      return;
    }

    connectSortableComponent(this);
  }

  onGlobalDragStart(): void {
    this.disconnectObserver();
  }

  onGlobalDragEnd(): void {
    this.connectObserver();
  }

  onDragEnd(detail: BlockDragDetail): void {
    this.calciteBlockGroupDragEnd.emit(detail);
  }

  onDragStart(detail: BlockDragDetail): void {
    detail.dragEl.sortHandleOpen = false;
    this.calciteBlockGroupDragStart.emit(detail);
  }

  onDragSort(detail: BlockDragDetail): void {
    this.setParentBlockGroup();
    this.updateBlockItems();

    this.calciteBlockGroupOrderChange.emit(detail);
  }

  private setParentBlockGroup(): void {
    this.parentBlockGroupEl = this.el.parentElement?.closest(blockGroupSelector);
  }

  private handleDefaultSlotChange(event: Event): void {
    updateBlockChildren(event.target as HTMLSlotElement);
  }

  private handleMove(event: CustomEvent<MoveEventDetail>): void {
    const { moveTo } = event.detail;

    const dragEl = event.target as Block["el"];
    const fromEl = dragEl?.parentElement as BlockGroup["el"];
    const toEl = moveTo.element as BlockGroup["el"];
    const fromElItems = Array.from(fromEl.children).filter(isBlock);
    const oldIndex = fromElItems.indexOf(dragEl);
    const newIndex = 0;

    if (!fromEl) {
      return;
    }

    if (
      fromEl.canPull?.({
        toEl,
        fromEl,
        dragEl,
        newIndex,
        oldIndex,
      }) === false
    ) {
      this.calciteBlockGroupMoveHalt.emit({ toEl, fromEl, dragEl, oldIndex, newIndex });
      return;
    }

    if (
      toEl.canPut?.({
        toEl,
        fromEl,
        dragEl,
        newIndex,
        oldIndex,
      }) === false
    ) {
      toEl.putFailed({ toEl, fromEl, dragEl, oldIndex, newIndex });
      return;
    }

    dragEl.sortHandleOpen = false;

    this.disconnectObserver();

    toEl.prepend(dragEl);

    this.updateBlockItems();
    this.connectObserver();

    this.calciteBlockGroupOrderChange.emit({
      dragEl,
      fromEl,
      toEl,
      newIndex,
      oldIndex,
    });
  }

  private handleReorder(event: CustomEvent<ReorderEventDetail>): void {
    const { reorder } = event.detail;

    const dragEl = event.target as Block["el"];
    const parentEl = dragEl?.parentElement as BlockGroup["el"];

    if (!parentEl) {
      return;
    }

    dragEl.sortHandleOpen = false;

    const sameParentItems = Array.from(parentEl.children).filter(isBlock);

    const lastIndex = sameParentItems.length - 1;
    const oldIndex = sameParentItems.indexOf(dragEl);
    let newIndex: number = oldIndex;

    switch (reorder) {
      case "top":
        newIndex = 0;
        break;
      case "bottom":
        newIndex = lastIndex;
        break;
      case "up":
        newIndex = oldIndex === 0 ? 0 : oldIndex - 1;
        break;
      case "down":
        newIndex = oldIndex === lastIndex ? lastIndex : oldIndex + 1;
        break;
    }

    this.disconnectObserver();

    const referenceEl =
      reorder === "up" || reorder === "top"
        ? sameParentItems[newIndex]
        : sameParentItems[newIndex].nextSibling;

    parentEl.insertBefore(dragEl, referenceEl);

    this.updateBlockItems();
    this.connectObserver();

    this.calciteBlockGroupOrderChange.emit({
      dragEl,
      fromEl: parentEl,
      toEl: parentEl,
      newIndex,
      oldIndex,
    });
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { loading, label } = this;
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div class={CSS.container}>
          {this.dragEnabled ? (
            <span ariaLive="assertive" class={CSS.assistiveText}>
              {this.assistiveText}
            </span>
          ) : null}
          {loading ? <calcite-scrim class={CSS.scrim} loading={loading} /> : null}
          <div ariaBusy={loading} ariaLabel={label || ""} class={CSS.groupContainer} role="group">
            <slot onSlotChange={this.handleDefaultSlotChange} />
          </div>
        </div>
      </InteractiveContainer>
    );
  }

  // #endregion
}
