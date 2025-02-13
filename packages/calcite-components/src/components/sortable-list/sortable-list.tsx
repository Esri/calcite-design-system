// @ts-strict-ignore
import Sortable from "sortablejs";
import { LitElement, property, createEvent, h, JsxNode } from "@arcgis/lumina";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { createObserver } from "../../utils/observers";
import { HandleNudge } from "../handle/interfaces";
import { Layout } from "../interfaces";
import {
  DragDetail,
  connectSortableComponent,
  disconnectSortableComponent,
  SortableComponent,
} from "../../utils/sortableComponent";
import { focusElement } from "../../utils/dom";
import { logger } from "../../utils/logger";
import { CSS } from "./resources";
import { styles } from "./sortable-list.scss";

declare global {
  interface DeclareElements {
    "calcite-sortable-list": SortableList;
  }
}

/**
 * @deprecated Use the `calcite-block-group` component instead.
 * @slot - A slot for adding sortable items.
 */
export class SortableList extends LitElement implements InteractiveComponent, SortableComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  dragEnabled = true;

  items: Element[] = [];

  mutationObserver = createObserver("mutation", () => {
    this.setUpSorting();
  });

  sortable: Sortable;

  // #endregion

  // #region Public Properties

  /** When provided, the method will be called to determine whether the element can  move from the list. */
  @property() canPull: (detail: DragDetail) => boolean;

  /** When provided, the method will be called to determine whether the element can be added from another list. */
  @property() canPut: (detail: DragDetail) => boolean;

  /** When true, disabled prevents interaction. This state shows items with lower opacity/grayed. */
  @property({ reflect: true }) disabled = false;

  /** Specifies which items inside the element should be draggable. */
  @property({ reflect: true }) dragSelector?: string;

  /**
   * The list's group identifier.
   *
   * To drag elements from one list into another, both lists must have the same group value.
   */
  @property({ reflect: true }) group?: string;

  /** The selector for the handle elements. */
  @property({ reflect: true }) handleSelector = "calcite-handle";

  /** Indicates the horizontal or vertical orientation of the component. */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical" | "grid", Layout> =
    "vertical";

  /** When true, content is waiting to be loaded. This state shows a busy indicator. */
  @property({ reflect: true }) loading = false;

  // #endregion

  // #region Events

  /** Emitted when the order of the list has changed. */
  calciteListOrderChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteHandleNudge", this.calciteHandleNudgeNextHandler);
  }

  override connectedCallback(): void {
    this.setUpSorting();
    this.beginObserving();
  }

  load(): void {
    logger.deprecated("component", {
      name: "sortable-list",
      removalVersion: 4,
      suggested: "block-group",
    });
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  override disconnectedCallback(): void {
    disconnectSortableComponent(this);
    this.endObserving();
  }

  // #endregion

  // #region Private Methods

  private calciteHandleNudgeNextHandler(event: CustomEvent<HandleNudge>): void {
    this.handleNudgeEvent(event);
  }

  onGlobalDragStart(): void {
    this.endObserving();
  }

  onGlobalDragEnd(): void {
    this.beginObserving();
  }

  onDragEnd(): void {}

  onDragStart(): void {}

  onDragSort(): void {
    this.items = Array.from(this.el.children);
    this.calciteListOrderChange.emit();
  }

  private handleNudgeEvent(event: CustomEvent<HandleNudge>): void {
    const { direction } = event.detail;

    const handle = event
      .composedPath()
      .find((el: HTMLElement) => el.matches(this.handleSelector)) as HTMLElement;

    const sortItem = this.items.find((item) => {
      return item.contains(handle) || event.composedPath().includes(item);
    });

    const lastIndex = this.items.length - 1;
    const startingIndex = this.items.indexOf(sortItem);
    let appendInstead = false;
    let buddyIndex: number;

    if (direction === "up") {
      if (startingIndex === 0) {
        appendInstead = true;
      } else {
        buddyIndex = startingIndex - 1;
      }
    } else {
      if (startingIndex === lastIndex) {
        buddyIndex = 0;
      } else if (startingIndex === lastIndex - 1) {
        appendInstead = true;
      } else {
        buddyIndex = startingIndex + 2;
      }
    }

    this.endObserving();

    if (appendInstead) {
      sortItem.parentElement.appendChild(sortItem);
    } else {
      sortItem.parentElement.insertBefore(sortItem, this.items[buddyIndex]);
    }

    this.items = Array.from(this.el.children);

    this.beginObserving();
    requestAnimationFrame(() => focusElement(handle));

    if ("selected" in handle) {
      handle.selected = true;
    }
  }

  private setUpSorting(): void {
    this.items = Array.from(this.el.children);
    connectSortableComponent(this);
  }

  private beginObserving(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  private endObserving(): void {
    this.mutationObserver?.disconnect();
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { disabled, layout } = this;
    const horizontal = layout === "horizontal" || false;

    return (
      <InteractiveContainer disabled={disabled}>
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerVertical]: !horizontal,
            [CSS.containerHorizontal]: horizontal,
          }}
        >
          <slot />
        </div>
      </InteractiveContainer>
    );
  }

  // #endregion
}
