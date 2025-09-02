// @ts-strict-ignore
import Sortable from "sortablejs";
import { debounce } from "es-toolkit";
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
import {
  MoveEventDetail,
  SortMenuItem,
  ReorderEventDetail,
  AddEventDetail,
} from "../sort-handle/interfaces";
import { DEBOUNCE } from "../../utils/resources";
import { Block } from "../block/block";
import { getRootNode, slotChangeGetAssignedElements } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { isBlock } from "../block/utils";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useCancelable } from "../../controllers/useCancelable";
import { Scale } from "../interfaces";
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
    this.updateBlockItemsDebounced();
  });

  sortable: Sortable;

  private blockAndGroups: (Block["el"] | BlockGroup["el"])[] = [];

  private cancelable = useCancelable<this>()(this);

  private focusSetter = useSetFocus<this>()(this);

  private parentBlockGroupEl: BlockGroup["el"];

  private updateBlockItemsDebounced = debounce(this.updateBlockItems, DEBOUNCE.nextTick);

  // #endregion

  // #region State Properties

  @state() assistiveText: string;

  @state() sortHandleMenuItems: SortMenuItem[] = [];

  // #endregion

  // #region Public Properties

  /** When provided, the method will be called to determine whether the element can move from the component. */
  @property() canPull: (detail: BlockDragDetail) => boolean | "clone";

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

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, and a `group` is defined, `calcite-block`s are no longer sortable. */
  @property({ reflect: true }) sortDisabled = false;

  // #endregion

  // #region Public Methods

  /**
   * Sets focus on the component's first focusable element.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   * @returns {Promise<void>}
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.el;
    }, options);
  }

  /**
   * Emits the `calciteBlockGroupOrderChange` event.
   *
   * @private
   */
  @method()
  emitOrderChangeEvent(detail: BlockDragDetail): void {
    this.calciteBlockGroupOrderChange.emit(detail);
  }

  // #endregion

  // #region Events

  /** Fires when the component's dragging has ended. */
  calciteBlockGroupDragEnd = createEvent<BlockDragDetail>({ cancelable: false });

  /** Fires when the component's dragging has started. */
  calciteBlockGroupDragStart = createEvent<BlockDragDetail>({ cancelable: false });

  /** Fires when the component's item order changes. */
  calciteBlockGroupOrderChange = createEvent<BlockDragDetail>({ cancelable: false });

  /**
   * Fires when a user attempts to move an element using the sort menu and 'canPut' or 'canPull' returns falsy.
   *
   * @deprecated No longer necessary.
   */
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
    this.listen("calciteSortHandleAdd", this.handleSortAdd);
  }

  override connectedCallback(): void {
    this.connectObserver();
    this.updateBlockItemsDebounced();
    this.setUpSorting();
    this.setParentBlockGroup();
    this.cancelable.add(this.updateBlockItemsDebounced);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (
      changes.has("group") ||
      (changes.has("canPull") && this.hasUpdated) ||
      (changes.has("canPut") && this.hasUpdated) ||
      (changes.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== false)) ||
      (changes.has("sortDisabled") && (this.hasUpdated || this.sortDisabled !== false))
    ) {
      this.updateBlockItemsDebounced();
    }
    if (changes.has("scale") && this.hasUpdated) {
      this.updateBlockAndGroupScale();
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

  private updateBlockItems(): void {
    this.updateGroupItems();
    const { dragEnabled, el, sortDisabled, sortHandleMenuItems } = this;

    const items = Array.from(this.el.querySelectorAll(blockSelector));
    const fromEl = el;
    const fromElItems = Array.from(fromEl.children).filter(isBlock);

    items.forEach((item) => {
      if (item.closest(blockGroupSelector) === el) {
        item.moveToItems = sortHandleMenuItems.filter((moveToItem) =>
          this.validateSortMenuItem({
            type: "move",
            fromEl,
            toEl: moveToItem.element as BlockGroup["el"],
            dragEl: item,
            newIndex: 0,
            oldIndex: fromElItems.indexOf(item),
          }),
        );

        item.addToItems = this.sortHandleMenuItems.filter((moveToItem) =>
          this.validateSortMenuItem({
            type: "add",
            fromEl,
            toEl: moveToItem.element as BlockGroup["el"],
            dragEl: item,
            newIndex: 0,
            oldIndex: fromElItems.indexOf(item),
          }),
        );
        item.dragHandle = dragEnabled;
        item.sortDisabled = sortDisabled;
      }
    });

    this.setUpSorting();
  }

  private updateGroupItems(): void {
    const { el, group } = this;

    const rootNode = getRootNode(el);

    const blockGroups = group
      ? Array.from(
          rootNode.querySelectorAll<BlockGroup["el"]>(`${blockGroupSelector}[group="${group}"]`),
        ).filter((blockGroup) => !blockGroup.disabled && blockGroup.dragEnabled)
      : [];

    this.sortHandleMenuItems = blockGroups.map((element) => ({
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
    if (this.parentBlockGroupEl || event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    this.handleReorder(event);
  }

  private handleSortAdd(event: CustomEvent<AddEventDetail>): void {
    if (this.parentBlockGroupEl || event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    this.handleAdd(event);
  }

  private handleSortMove(event: CustomEvent<MoveEventDetail>): void {
    if (this.parentBlockGroupEl || event.defaultPrevented) {
      return;
    }

    event.preventDefault();
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
    this.updateBlockItemsDebounced();

    this.calciteBlockGroupOrderChange.emit(detail);
  }

  private setParentBlockGroup(): void {
    this.parentBlockGroupEl = this.el.parentElement?.closest(blockGroupSelector);
  }

  private handleDefaultSlotChange(event: Event): void {
    const blockChildren: Block["el"][] = [];

    this.blockAndGroups = slotChangeGetAssignedElements(event).filter(
      (el): el is Block["el"] | BlockGroup["el"] => {
        if (el.matches(blockSelector)) {
          blockChildren.push(el as Block["el"]);
        }
        return el.matches(blockSelector) || el.matches(blockGroupSelector);
      },
    );

    updateBlockChildren(blockChildren);
    this.updateBlockAndGroupScale();
  }

  private updateBlockAndGroupScale(): void {
    this.blockAndGroups.forEach((el) => {
      el.scale = this.scale;
    });
  }

  private validateSortMenuItem({
    fromEl,
    toEl,
    dragEl,
    newIndex,
    oldIndex,
    type,
  }: {
    fromEl?: BlockGroup["el"];
    toEl?: BlockGroup["el"];
    dragEl: Block["el"];
    newIndex: number;
    oldIndex: number;
    type: "move" | "add";
  }): boolean {
    if (!fromEl || !toEl || toEl === fromEl || dragEl.contains(toEl)) {
      return false;
    }

    const canPull =
      fromEl.canPull?.({
        toEl,
        fromEl,
        dragEl,
        newIndex,
        oldIndex,
      }) ?? true;

    const canPut =
      toEl.canPut?.({
        toEl,
        fromEl,
        dragEl,
        newIndex,
        oldIndex,
      }) ?? true;

    return (type === "add" ? canPull === "clone" : canPull === true) && canPut;
  }

  private handleAdd(event: CustomEvent<AddEventDetail>): void {
    const { addTo } = event.detail;

    const dragEl = event.target as Block["el"];
    const fromEl = dragEl?.parentElement as BlockGroup["el"];
    const toEl = addTo.element as BlockGroup["el"];
    const fromElItems = Array.from(fromEl.children).filter(isBlock);
    const oldIndex = fromElItems.indexOf(dragEl);
    const newIndex = 0;

    if (!this.validateSortMenuItem({ type: "add", fromEl, toEl, dragEl, newIndex, oldIndex })) {
      return;
    }

    dragEl.sortHandleOpen = false;

    this.disconnectObserver();

    const newEl = dragEl.cloneNode();
    toEl.prepend(newEl);
    this.updateBlockItemsDebounced();
    this.connectObserver();

    const eventDetail = {
      dragEl,
      fromEl,
      toEl,
      newIndex,
      oldIndex,
    };

    this.calciteBlockGroupOrderChange.emit(eventDetail);
    toEl.emitOrderChangeEvent(eventDetail);
  }

  private handleMove(event: CustomEvent<MoveEventDetail>): void {
    const { moveTo } = event.detail;

    const dragEl = event.target as Block["el"];
    const fromEl = dragEl?.parentElement as BlockGroup["el"];
    const toEl = moveTo.element as BlockGroup["el"];
    const fromElItems = Array.from(fromEl.children).filter(isBlock);
    const oldIndex = fromElItems.indexOf(dragEl);
    const newIndex = 0;

    if (!this.validateSortMenuItem({ type: "move", fromEl, toEl, dragEl, newIndex, oldIndex })) {
      return;
    }

    dragEl.sortHandleOpen = false;

    this.disconnectObserver();

    toEl.prepend(dragEl);

    this.updateBlockItemsDebounced();
    this.connectObserver();

    const eventDetail = {
      dragEl,
      fromEl,
      toEl,
      newIndex,
      oldIndex,
    };

    this.calciteBlockGroupOrderChange.emit(eventDetail);
    toEl.emitOrderChangeEvent(eventDetail);
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

    this.updateBlockItemsDebounced();
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
