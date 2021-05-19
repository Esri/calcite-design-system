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

/**
 * @slot - A slot for adding sortable items
 */
@Component({
  tag: "calcite-sortable-list",
  shadow: true
})
export class CalciteSortableList {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * The class on the handle elements.
   */
  @Prop() handleSelector = "calcite-handle";

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

  observer = new MutationObserver(() => {
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
    this.observer.disconnect();
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
    this.observer.disconnect();

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
    this.sortable = Sortable.create(this.el, {
      handle: this.handleSelector,
      // Changed sorting within list
      onUpdate: () => {
        this.items = Array.from(this.el.children);
        this.calciteListOrderChange.emit();
      },
      // Element dragging started
      onStart: () => {
        this.observer.disconnect();
      },
      // Element dragging ended
      onEnd: () => {
        this.beginObserving();
      }
    });
  }

  cleanUpDragAndDrop(): void {
    this.sortable.destroy();
    this.sortable = null;
  }

  beginObserving(): void {
    this.observer.observe(this.el, { childList: true, subtree: true });
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return <slot />;
  }
}
