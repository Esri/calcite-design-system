// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import {
  focusElementInGroup,
  getElementDir,
  slotChangeGetAssignedElements,
  whenAnimationDone,
} from "../../utils/dom";
import { guid } from "../../utils/guid";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { componentFocusable } from "../../utils/component";
import { createObserver } from "../../utils/observers";
import { breakpoints } from "../../utils/responsive";
import { getRoundRobinIndex } from "../../utils/array";
import { useT9n } from "../../controllers/useT9n";
import type { Action } from "../action/action";
import type { CarouselItem } from "../carousel-item/carousel-item";
import { centerItemsByBreakpoint, CSS, DURATION, ICONS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { ArrowType, AutoplayType } from "./interfaces";
import { styles } from "./carousel.scss";

declare global {
  interface DeclareElements {
    "calcite-carousel": Carousel;
  }
}

/** @slot - A slot for adding `calcite-carousel-item`s. */
export class Carousel extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private autoplayHandler = (): void => {
    this.clearIntervals();
    this.slideDurationInterval = setInterval(this.timer, this.autoplayDuration / 100);
  };

  private container: HTMLDivElement;

  private containerId = `calcite-carousel-container-${guid()}`;

  private itemContainer: HTMLDivElement;

  private resizeHandler = ({ contentRect: { width } }: ResizeObserverEntry): void => {
    this.setMaxItemsToBreakpoint(width);
  };

  private resizeObserver = createObserver("resize", (entries) =>
    entries.forEach(this.resizeHandler),
  );

  private slideDurationInterval = null;

  private slideInterval = null;

  private tabList: HTMLDivElement;

  private timer = (): void => {
    let time = this.slideDurationRemaining;
    const notSuspended =
      (!this.suspendedDueToFocus && !this.suspendedDueToHover) || this.userPreventsSuspend;
    if (notSuspended) {
      if (time <= 0.01) {
        time = 1;
        this.direction = "forward";
        this.nextItem(false);
      } else {
        time = time - 0.01;
      }
    }
    if (time > 0) {
      this.slideDurationRemaining = time;
    }
  };

  // #endregion

  // #region State Properties

  @state() direction: "forward" | "backward" | "standby" = "standby";

  @state() items: CarouselItem["el"][] = [];

  @state() maxItems = centerItemsByBreakpoint.xxsmall;

  @state() playing = false;

  @state() selectedIndex: number;

  @state() slideDurationRemaining = 1;

  @state() suspendedDueToFocus = false;

  @state() suspendedDueToHover = false;

  @state() suspendedSlideDurationRemaining = 1;

  @state() userPreventsSuspend = false;

  // #endregion

  // #region Public Properties

  /** Specifies how and if the "previous" and "next" arrows are displayed. */
  @property({ reflect: true }) arrowType: ArrowType = "inline";

  /** When `true`, the carousel will autoplay and controls will be displayed. When "paused" at time of initialization, the carousel will not autoplay, but controls will be displayed. */
  @property({ reflect: true }) autoplay: AutoplayType = false;

  /** When `autoplay` is `true`, specifies in milliseconds the length of time to display each Carousel Item. */
  @property({ type: Number, reflect: true }) autoplayDuration = DURATION;

  /** Specifies if the component's controls are positioned absolutely on top of slotted Carousel Items. */
  @property({ reflect: true }) controlOverlay = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Accessible name for the component.
   *
   * @required
   */
  @property() label: string;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  @property() paused: boolean;

  /**
   * The component's selected `calcite-carousel-item`.
   *
   * @readonly
   */
  @property() selectedItem: CarouselItem["el"];

  // #endregion

  // #region Public Methods

  /** Play the carousel. If `autoplay` is not enabled (initialized either to `true` or `"paused"`), these methods will have no effect. */
  @method()
  async play(): Promise<void> {
    /* When the 'autoplay' property of type 'boolean | string' is set to true, the value is "". */
    if (this.playing || (this.autoplay !== "" && !this.autoplay && this.autoplay !== "paused")) {
      return;
    }
    this.handlePlay(true);
  }

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.container?.focus();
  }

  /** Stop the carousel. If `autoplay` is not enabled (initialized either to `true` or `"paused"`), these methods will have no effect. */
  @method()
  async stop(): Promise<void> {
    if (!this.playing) {
      return;
    }
    this.handlePause(true);
  }

  // #endregion

  // #region Events

  /** Fires when the selected `calcite-carousel-item` changes. */
  calciteCarouselChange = createEvent({ cancelable: false });

  /** Fires when the carousel autoplay state pauses due to a user hovering over the component or focusing on the component or slotted content */
  calciteCarouselPause = createEvent({ cancelable: false });

  /** Fires when the carousel autoplay is invoked by the user. */
  calciteCarouselPlay = createEvent({ cancelable: false });

  /** Fires when the carousel autoplay state resumes due to a user no longer hovering over the component or focusing on the component or slotted content */
  calciteCarouselResume = createEvent({ cancelable: false });

  /** Fires when the carousel autoplay state is stopped by a user. */
  calciteCarouselStop = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    this.resizeObserver?.observe(this.el);
  }

  async load(): Promise<void> {
    /* When the 'autoplay' property of type 'boolean | string' is set to true, the value is "". */
    if ((this.autoplay === "" || this.autoplay) && this.autoplay !== "paused") {
      this.handlePlay(false);
    } else if (this.autoplay === "paused") {
      this.paused = true;
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("autoplay") && this.hasUpdated) {
      this.autoplayWatcher(this.autoplay);
    }

    if (changes.has("direction") && (this.hasUpdated || this.direction !== "standby")) {
      this.directionWatcher(this.direction);
    }

    if (changes.has("playing") && (this.hasUpdated || this.playing !== false)) {
      this.paused = !this.playing;
    }

    if (
      (changes.has("suspendedDueToFocus") &&
        (this.hasUpdated || this.suspendedDueToFocus !== false)) ||
      (changes.has("suspendedDueToHover") &&
        (this.hasUpdated || this.suspendedDueToHover !== false))
    ) {
      this.suspendWatcher();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  override disconnectedCallback(): void {
    this.clearIntervals();
    this.resizeObserver?.disconnect();
  }

  // #endregion

  // #region Private Methods

  private autoplayWatcher(autoplay: AutoplayType): void {
    if (!autoplay) {
      this.handlePause(false);
    }
  }

  private async directionWatcher(direction: "forward" | "backward" | "standby"): Promise<void> {
    if (direction === "standby" || !this.itemContainer) {
      return;
    }

    await whenAnimationDone(
      this.itemContainer,
      direction === "forward" ? "item-forward" : "item-backward",
    );
    this.direction = "standby";
  }

  private suspendWatcher(): void {
    if (!this.suspendedDueToFocus && !this.suspendedDueToHover) {
      this.suspendEnd();
    } else {
      this.suspendStart();
    }
  }

  private setMaxItemsToBreakpoint(width: number): void {
    if (!width) {
      return;
    }

    if (width >= breakpoints.width.small) {
      this.maxItems = centerItemsByBreakpoint.medium;
      return;
    }

    if (width >= breakpoints.width.xsmall) {
      this.maxItems = centerItemsByBreakpoint.small;
      return;
    }

    if (width >= breakpoints.width.xxsmall) {
      this.maxItems = centerItemsByBreakpoint.xsmall;
      return;
    }

    this.maxItems = centerItemsByBreakpoint.xxsmall;
  }

  private clearIntervals() {
    clearInterval(this.slideDurationInterval);
    clearInterval(this.slideInterval);
  }

  private nextItem(emit: boolean) {
    if (this.playing && emit) {
      this.playing = false;
    }
    const nextIndex = getRoundRobinIndex(this.selectedIndex + 1, this.items.length);
    this.setSelectedItem(nextIndex, emit);
  }

  private previousItem() {
    this.playing = false;
    const prevIndex = getRoundRobinIndex(Math.max(this.selectedIndex - 1, -1), this.items.length);
    this.setSelectedItem(prevIndex, true);
  }

  private handlePlay(emit: boolean) {
    this.playing = true;
    this.autoplayHandler();
    this.slideInterval = setInterval(this.autoplayHandler, this.autoplayDuration);
    if (emit) {
      this.calciteCarouselPlay.emit();
    }
  }

  private handlePause(emit: boolean) {
    this.playing = false;
    this.clearIntervals();
    this.slideDurationRemaining = 1;
    this.suspendedSlideDurationRemaining = 1;
    if (emit) {
      this.calciteCarouselStop.emit();
    }
  }

  private suspendStart() {
    this.suspendedSlideDurationRemaining = this.slideDurationRemaining;
  }

  private suspendEnd() {
    this.slideDurationRemaining = this.suspendedSlideDurationRemaining;
  }

  private handleSlotChange(event: Event): void {
    const items = slotChangeGetAssignedElements<CarouselItem["el"]>(event);

    if (items.length < 1) {
      return;
    }

    const activeItemIndex = items.findIndex((item) => item.selected);
    const requestedSelectedIndex = activeItemIndex > -1 ? activeItemIndex : 0;

    this.items = items;

    this.setSelectedItem(requestedSelectedIndex, false);
  }

  private setSelectedItem(requestedIndex: number, emit: boolean): void {
    const previousSelected = this.selectedIndex;

    this.items.forEach((el, index) => {
      const match = requestedIndex === index;
      el.selected = match;
      if (match) {
        this.selectedItem = el;
        this.selectedIndex = index;
      }
    });

    if (emit) {
      this.playing = false;
      if (previousSelected !== this.selectedIndex) {
        this.calciteCarouselChange.emit();
      }
    }
  }

  private handleArrowClick(event: MouseEvent): void {
    const direction = (event.target as HTMLDivElement).dataset.direction;

    if (this.playing) {
      this.handlePause(true);
    }

    if (direction === "next") {
      this.direction = "forward";
      this.nextItem(true);
    } else if (direction === "previous") {
      this.direction = "backward";
      this.previousItem();
    }
  }

  private handleItemSelection(event: MouseEvent): void {
    const item = event.target as Action["el"];
    const requestedPosition = parseInt(item.dataset.index);

    if (requestedPosition === this.selectedIndex) {
      return;
    }

    if (this.playing) {
      this.handlePause(true);
    }

    this.direction = requestedPosition > this.selectedIndex ? "forward" : "backward";
    this.setSelectedItem(requestedPosition, true);
  }

  private toggleRotation(): void {
    this.userPreventsSuspend = true;
    if (this.playing) {
      this.handlePause(true);
    } else {
      this.handlePlay(true);
    }
  }

  private handleFocusIn(): void {
    const isPlaying = this.playing;

    if (isPlaying) {
      this.suspendedDueToFocus = true;
    }
    if ((!this.suspendedDueToFocus || !this.suspendedDueToHover) && isPlaying) {
      this.calciteCarouselPause.emit();
    }
  }

  private handleMouseIn(): void {
    const isPlaying = this.playing;

    if (isPlaying) {
      this.suspendedDueToHover = true;
    }
    if ((!this.suspendedDueToFocus || !this.suspendedDueToHover) && isPlaying) {
      this.calciteCarouselPause.emit();
    }
  }

  private handleMouseOut(event: MouseEvent): void {
    const leavingComponent = !this.el.contains(event.relatedTarget as HTMLElement);
    const isPlaying = this.playing;

    if (leavingComponent && isPlaying) {
      this.suspendedDueToHover = false;
    }
    if (leavingComponent && isPlaying && !this.suspendedDueToFocus) {
      this.userPreventsSuspend = false;
      this.calciteCarouselResume.emit();
    }
  }

  private handleFocusOut(event: FocusEvent): void {
    const leavingComponent = !event.composedPath().includes(event.relatedTarget as HTMLElement);
    const isPlaying = this.playing;

    if (leavingComponent && isPlaying) {
      this.suspendedDueToFocus = false;
    }
    if (leavingComponent && isPlaying && !this.suspendedDueToHover) {
      this.userPreventsSuspend = false;
      this.calciteCarouselResume.emit();
    }
  }

  private containerKeyDownHandler(event: KeyboardEvent): void {
    if (event.target !== this.container) {
      return;
    }

    const lastItem = this.items.length - 1;

    switch (event.key) {
      case " ":
      case "Enter":
        event.preventDefault();
        if (this.autoplay === "" || this.autoplay || this.autoplay === "paused") {
          this.toggleRotation();
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        this.direction = "forward";
        this.nextItem(true);
        break;
      case "ArrowLeft":
        event.preventDefault();
        this.direction = "backward";
        this.previousItem();
        break;
      case "Home":
        event.preventDefault();
        if (this.selectedIndex === 0) {
          return;
        }
        this.direction = "backward";
        this.setSelectedItem(0, true);
        break;
      case "End":
        event.preventDefault();
        if (this.selectedIndex === lastItem) {
          return;
        }
        this.direction = "forward";
        this.setSelectedItem(lastItem, true);
        break;
    }
  }

  private tabListKeyDownHandler(event: KeyboardEvent): void {
    const visiblePaginationEls = Array(
      ...this.tabList.querySelectorAll(`button:not(.${CSS.paginationItemOutOfRange})`),
    );
    const currentEl = event.target as Action["el"];
    switch (event.key) {
      case "ArrowRight":
        focusElementInGroup(visiblePaginationEls, currentEl, "next");
        break;
      case "ArrowLeft":
        focusElementInGroup(visiblePaginationEls, currentEl, "previous");
        break;
      case "Home":
        event.preventDefault();
        focusElementInGroup(visiblePaginationEls, currentEl, "first");
        break;
      case "End":
        event.preventDefault();
        focusElementInGroup(visiblePaginationEls, currentEl, "last");
        break;
    }
  }

  private storeTabListRef(el: HTMLDivElement): void {
    if (!el) {
      return;
    }

    this.tabList = el;
  }

  private storeContainerRef(el: HTMLDivElement): void {
    if (!el) {
      return;
    }

    this.container = el;
  }

  private storeItemContainerRef(el: HTMLDivElement): void {
    if (!el) {
      return;
    }

    this.itemContainer = el;
  }

  // #endregion

  // #region Rendering

  private renderRotationControl(): JsxNode {
    const text = this.playing ? this.messages.pause : this.messages.play;
    const formattedValue = this.slideDurationRemaining * 100;
    return (
      <button
        ariaLabel={text}
        class={{
          [CSS.paginationItem]: true,
          [CSS.autoplayControl]: true,
        }}
        onClick={this.toggleRotation}
        title={text}
      >
        <calcite-icon icon={this.playing ? ICONS.pause : ICONS.play} scale="s" />
        {this.playing && (
          <calcite-progress
            class={CSS.autoplayProgress}
            label={this.messages.carouselItemProgress}
            value={formattedValue}
          />
        )}
      </button>
    );
  }

  private renderPaginationArea(): JsxNode {
    return (
      <div
        class={{
          [CSS.pagination]: true,
          [CSS.containerOverlaid]: this.controlOverlay,
        }}
        onKeyDown={this.tabListKeyDownHandler}
        ref={this.storeTabListRef}
      >
        {(this.playing || this.autoplay === "" || this.autoplay || this.autoplay === "paused") &&
          this.renderRotationControl()}
        {this.arrowType === "inline" && this.renderArrow("previous")}
        {this.renderPaginationItems()}
        {this.arrowType === "inline" && this.renderArrow("next")}
      </div>
    );
  }

  private renderPaginationItems(): JsxNode {
    const { selectedIndex, maxItems, items, label, handleItemSelection } = this;
    return (
      <div ariaLabel={label} class={CSS.paginationItems} role="tablist">
        {items.map((item, index) => {
          const itemCount = items.length;
          const match = index === selectedIndex;
          const first = index === 0;
          const last = index === itemCount - 1;
          const endRangeStart = itemCount - maxItems - 1;
          const inStartRange = selectedIndex < maxItems;
          const inEndRange = selectedIndex >= endRangeStart;
          const rangeStart = inStartRange ? 0 : selectedIndex - Math.floor(maxItems / 2);
          const rangeEnd = inEndRange ? itemCount : rangeStart + maxItems;
          const low = inStartRange ? 0 : inEndRange ? endRangeStart : rangeStart;
          const high = inStartRange ? maxItems + 1 : rangeEnd;
          const isEdge = !first && !last && !match && (index === low - 1 || index === high);
          const visible = match || (index <= high && index >= low - 1);
          const overflowActive = itemCount - 1 <= maxItems;
          const icon = match ? ICONS.active : ICONS.inactive;

          return (
            <button
              aria-controls={!match ? item.id : undefined}
              ariaSelected={match}
              class={{
                [CSS.paginationItem]: true,
                [CSS.paginationItemIndividual]: true,
                [CSS.paginationItemSelected]: match,
                [CSS.paginationItemRangeEdge]: itemCount - 1 > maxItems && isEdge,
                [CSS.paginationItemOutOfRange]: !(overflowActive || visible),
                [CSS.paginationItemVisible]: overflowActive || visible,
              }}
              data-index={index}
              key={item.id}
              onClick={handleItemSelection}
              role="tab"
              title={item.label}
            >
              <calcite-icon icon={icon} scale="l" />
            </button>
          );
        })}
      </div>
    );
  }

  private renderArrow(direction: "previous" | "next"): JsxNode {
    const isPrev = direction === "previous";
    const dir = getElementDir(this.el);
    const scale = this.arrowType === "edge" ? "m" : "s";
    const css = isPrev ? CSS.pagePrevious : CSS.pageNext;
    const title = isPrev ? this.messages.previous : this.messages.next;
    const icon = isPrev ? ICONS.chevronLeft : ICONS.chevronRight;
    return (
      <button
        aria-controls={this.containerId}
        class={{ [CSS.paginationItem]: true, [css]: true }}
        data-direction={direction}
        onClick={this.handleArrowClick}
        title={title}
      >
        <calcite-icon flipRtl={dir === "rtl"} icon={icon} scale={scale} />
      </button>
    );
  }

  override render(): JsxNode {
    const { direction } = this;
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          ariaLabel={this.label}
          ariaLive={this.playing ? "off" : "polite"}
          ariaRoleDescription={this.messages.carousel}
          class={{
            [CSS.container]: true,
            [CSS.containerOverlaid]: this.controlOverlay,
            [CSS.containerEdged]: this.arrowType === "edge",
          }}
          onFocusIn={this.handleFocusIn}
          onFocusOut={this.handleFocusOut}
          onKeyDown={this.containerKeyDownHandler}
          onMouseEnter={this.handleMouseIn}
          onMouseLeave={this.handleMouseOut}
          ref={this.storeContainerRef}
          role="group"
          tabIndex={0}
        >
          <section
            class={{
              [CSS.itemContainer]: true,
              [CSS.itemContainerForward]: direction === "forward",
              [CSS.itemContainerBackward]: direction === "backward",
            }}
            id={this.containerId}
            ref={this.storeItemContainerRef}
          >
            <slot onSlotChange={this.handleSlotChange} />
          </section>
          {this.items.length > 1 && this.renderPaginationArea()}
          {this.arrowType === "edge" && this.renderArrow("previous")}
          {this.arrowType === "edge" && this.renderArrow("next")}
        </div>
      </InteractiveContainer>
    );
  }

  // #endregion
}
