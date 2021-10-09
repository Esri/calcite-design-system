import Sortable from "sortablejs";
import {
  Component,
  Element,
  Event,
  EventEmitter,
  Listen,
  Prop,
  State,
  h,
  VNode
} from "@stencil/core";
import { createObserver } from "../../utils/observers";
import { Layout } from "../interfaces";
import { CSS } from "./resources";

/**
 * @slot - A slot for adding sortable items.
 */
@Component({
  tag: "calcite-sortable-list",
  styleUrl: "calcite-sortable-list.scss",
  shadow: true
})
export class CalciteSortableList {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Specifies which items inside the element should be draggable.
   */
  @Prop() dragSelector?: string;

  /**
   * The list's group identifier.
   *
   * To drag elements from one list into another, both lists must have the same group value.
   */
  @Prop() group?: string;

  /**
   * The selector for the handle elements.
   */
  @Prop() handleSelector = "calcite-handle";

  /**
   * Indicates the horizontal or vertical orientation of the component.
   */
  @Prop() layout: Layout = "vertical";

  /**
   * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteSortableListElement;

  @State() handleActivated = false;

  items: Element[] = [];

  mutationObserver = createObserver("mutation", () => {
    this.cleanUpDragAndDrop();
    this.items = Array.from(this.el.children);
    this.setUpDragAndDrop();
  });

  sortable: Sortable;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.items = Array.from(this.el.children);
    this.setUpDragAndDrop();
    this.beginObserving();
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.cleanUpDragAndDrop();
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when the order of the list has changed.
   */
  @Event() calciteListOrderChange: EventEmitter;

  @Listen("calciteHandleNudge")
  calciteHandleNudgeHandler(event: CustomEvent): void {
    const sortItem = this.items.find((item) => {
      return item.contains(event.detail.handle) || event.composedPath().includes(item);
    });

    const lastIndex = this.items.length - 1;
    const startingIndex = this.items.indexOf(sortItem);
    let appendInstead = false;
    let buddyIndex;
    switch (event.detail.direction) {
      case "up":
        event.preventDefault();
        if (startingIndex === 0) {
          appendInstead = true;
        } else {
          buddyIndex = startingIndex - 1;
        }
        break;
      case "down":
        event.preventDefault();
        if (startingIndex === lastIndex) {
          buddyIndex = 0;
        } else if (startingIndex === lastIndex - 1) {
          appendInstead = true;
        } else {
          buddyIndex = startingIndex + 2;
        }
        break;
      default:
        return;
    }
    this.mutationObserver?.disconnect();

    if (appendInstead) {
      sortItem.parentElement.appendChild(sortItem);
    } else {
      sortItem.parentElement.insertBefore(sortItem, this.items[buddyIndex]);
    }

    this.items = Array.from(this.el.children);

    event.detail.handle.activated = true;
    event.detail.handle.setFocus();
    this.beginObserving();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  setUpDragAndDrop(): void {
    this.cleanUpDragAndDrop();

    const options: Sortable.Options = {
      dataIdAttr: "id",
      group: this.group,
      handle: this.handleSelector,
      // Changed sorting within list
      onUpdate: () => {
        this.items = Array.from(this.el.children);
        this.calciteListOrderChange.emit();
      },
      // Element dragging started
      onStart: () => {
        this.mutationObserver?.disconnect();
      },
      // Element dragging ended
      onEnd: () => {
        this.beginObserving();
      }
    };

    if (this.dragSelector) {
      options.draggable = this.dragSelector;
    }

    this.sortable = Sortable.create(this.el, options);
  }

  cleanUpDragAndDrop(): void {
    this.sortable?.destroy();
    this.sortable = null;
  }

  beginObserving(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { layout } = this;
    const horizontal = layout === "horizontal" || false;

    return (
      <div
        class={{
          [CSS.container]: true,
          [CSS.containerVertical]: !horizontal,
          [CSS.containerHorizontal]: horizontal
        }}
      >
        <slot />
      </div>
    );
  }
}
