import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  State,
  VNode
} from "@stencil/core";
import Sortable from "sortablejs";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { createObserver } from "../../utils/observers";
import { HandleNudge } from "../handle/interfaces";
import { Layout } from "../interfaces";
import { CSS } from "./resources";
import {
  connectSortableComponent,
  disconnectSortableComponent,
  onSortingStart,
  SortableComponent,
  onSortingEnd
} from "../../utils/sortableComponent";
import { focusElement } from "../../utils/dom";

/**
 * @slot - A slot for adding sortable items.
 */
@Component({
  tag: "calcite-sortable-list",
  styleUrl: "sortable-list.scss",
  shadow: true
})
export class SortableList implements InteractiveComponent, SortableComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Specifies which items inside the element should be draggable.
   */
  @Prop({ reflect: true }) dragSelector?: string;

  /**
   * The list's group identifier.
   *
   * To drag elements from one list into another, both lists must have the same group value.
   */
  @Prop({ reflect: true }) group?: string;

  /**
   * The selector for the handle elements.
   */
  @Prop({ reflect: true }) handleSelector = "calcite-handle";

  /**
   * Indicates the horizontal or vertical orientation of the component.
   */
  @Prop({ reflect: true }) layout: Layout = "vertical";

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
    this.setUpSorting();
  });

  sortable: Sortable;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectSortableComponent(this);
    this.setUpSorting();
    this.beginObserving();
  }

  disconnectedCallback(): void {
    disconnectSortableComponent(this);
    this.mutationObserver?.disconnect();
    this.cleanUpSorting();
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when the order of the list has changed.
   */
  @Event({ cancelable: false }) calciteListOrderChange: EventEmitter<void>;

  @Listen("calciteHandleNudge")
  calciteHandleNudgeNextHandler(event: CustomEvent<HandleNudge>): void {
    this.handleNudgeEvent(event);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  handleNudgeEvent(event: CustomEvent<HandleNudge>): void {
    const { direction } = event.detail;
    const handle = event.target as HTMLCalciteHandleElement;

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

    this.mutationObserver?.disconnect();

    if (appendInstead) {
      sortItem.parentElement.appendChild(sortItem);
    } else {
      sortItem.parentElement.insertBefore(sortItem, this.items[buddyIndex]);
    }

    this.items = Array.from(this.el.children);

    handle.activated = true;
    focusElement(handle);
    this.beginObserving();
  }

  setUpSorting(): void {
    this.cleanUpSorting();

    this.items = Array.from(this.el.children);

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
        onSortingStart(this);
      },
      // Element dragging ended
      onEnd: () => {
        onSortingEnd(this);
        this.beginObserving();
      }
    };

    if (this.dragSelector) {
      options.draggable = this.dragSelector;
    }

    this.sortable = Sortable.create(this.el, options);
  }

  cleanUpSorting(): void {
    this.sortable?.destroy();
    this.sortable = null;
  }

  beginObserving(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  onSortingEnabled = (): void => {
    this.beginObserving();
  };

  onSortingDisabled = (): void => {
    this.mutationObserver?.disconnect();
  };

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
