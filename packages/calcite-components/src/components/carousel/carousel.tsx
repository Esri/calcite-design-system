import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  h,
  Host,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import {
  focusElementInGroup,
  getElementDir,
  slotChangeGetAssignedElements,
  toAriaBoolean,
  whenAnimationDone,
} from "../../utils/dom";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import { guid } from "../../utils/guid";
import {
  updateHostInteraction,
  InteractiveComponent,
  InteractiveContainer,
} from "../../utils/interactive";
import {
  LoadableComponent,
  componentFocusable,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { createObserver } from "../../utils/observers";
import { breakpoints } from "../../utils/responsive";
import { getRoundRobinIndex } from "../../utils/array";
import { CSS, DURATION, ICONS, centerItemsByBreakpoint } from "./resources";
import { CarouselMessages } from "./assets/carousel/t9n";
import { ArrowType, AutoplayType } from "./interfaces";

/**
 * @slot - A slot for adding `calcite-carousel-item`s.
 */
@Component({
  tag: "calcite-carousel",
  styleUrl: "carousel.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Carousel
  implements InteractiveComponent, LoadableComponent, LocalizedComponent, T9nComponent
{
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, the carousel will autoplay and controls will be displayed. When "paused" at time of initialization, the carousel will not autoplay, but controls will be displayed.
   */
  @Prop({ reflect: true }) autoplay: AutoplayType = false;

  @Watch("autoplay")
  autoplayWatcher(autoplay: boolean): void {
    if (!autoplay) {
      this.handlePause(false);
    }
  }

  /**
   * Specifies how and if the "previous" and "next" arrows are displayed.
   */
  @Prop({ reflect: true }) arrowType: ArrowType = "inline";

  /**
   *  When `autoplay` is `true`, specifies in milliseconds the length of time to display each Carousel Item.
   */
  @Prop({ reflect: true }) autoplayDuration = DURATION;

  /**
   * Specifies if the component's controls are positioned absolutely on top of slotted Carousel Items.
   */
  @Prop({ reflect: true }) controlOverlay = false;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Accessible name for the component.
   */
  @Prop() label!: string;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: CarouselMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<CarouselMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  @Prop({ mutable: true }) paused: boolean;

  /**
   * The component's selected `calcite-carousel-item`.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItem: HTMLCalciteCarouselItemElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    this.resizeObserver?.observe(this.el);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
    this.clearIntervals();
    this.resizeObserver?.disconnect();
  }

  async componentWillLoad(): Promise<void> {
    /* When the 'autoplay' property of type 'boolean | string' is set to true, the value is "". */
    if ((this.autoplay === "" || this.autoplay) && this.autoplay !== "paused") {
      this.handlePlay(false);
    } else if (this.autoplay === "paused") {
      this.paused = true;
    }
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.container?.focus();
  }

  /** Play the carousel. If `autoplay` is not enabled (initialized either to `true` or `"paused"`), these methods will have no effect. */
  @Method()
  async play(): Promise<void> {
    /* When the 'autoplay' property of type 'boolean | string' is set to true, the value is "". */
    if (this.playing || (this.autoplay !== "" && !this.autoplay && this.autoplay !== "paused")) {
      return;
    }
    this.handlePlay(true);
  }

  /** Stop the carousel. If `autoplay` is not enabled (initialized either to `true` or `"paused"`), these methods will have no effect. */
  @Method()
  async stop(): Promise<void> {
    if (!this.playing) {
      return;
    }
    this.handlePause(true);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteCarouselElement;

  @State() selectedIndex: number;

  @State() items: HTMLCalciteCarouselItemElement[] = [];

  @State() direction: "forward" | "backward" | "standby" = "standby";

  @Watch("direction")
  async directionWatcher(direction: string): Promise<void> {
    if (direction === "standby") {
      return;
    }

    await whenAnimationDone(
      this.itemContainer,
      direction === "forward" ? "item-forward" : "item-backward",
    );
    this.direction = "standby";
  }

  @State() defaultMessages: CarouselMessages;

  @State() playing = false;

  @Watch("playing")
  playingWatcher(): void {
    this.paused = !this.playing;
  }

  @State() suspendedDueToFocus = false;

  @State() suspendedDueToHover = false;

  @Watch("suspendedDueToFocus")
  @Watch("suspendedDueToHover")
  suspendWatcher(): void {
    if (!this.suspendedDueToFocus && !this.suspendedDueToHover) {
      this.suspendEnd();
    } else {
      this.suspendStart();
    }
  }

  @State() userPreventsSuspend = false;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  async effectiveLocaleChange(): Promise<void> {
    await updateMessages(this, this.effectiveLocale);
  }

  @State() suspendedSlideDurationRemaining = 1;

  @State() slideDurationRemaining = 1;

  @State() maxItems = centerItemsByBreakpoint.xxsmall;

  private container: HTMLDivElement;

  private containerId = `calcite-carousel-container-${guid()}`;

  private itemContainer: HTMLDivElement;

  private slideDurationInterval = null;

  private slideInterval = null;

  private tabList: HTMLDivElement;

  private resizeObserver = createObserver("resize", (entries) =>
    entries.forEach(this.resizeHandler),
  );

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /** Fires when the selected `calcite-carousel-item` changes. */
  @Event({ cancelable: false }) calciteCarouselChange: EventEmitter<void>;

  /** Fires when the carousel autoplay is invoked by the user. */
  @Event({ cancelable: false }) calciteCarouselPlay: EventEmitter<void>;

  /** Fires when the carousel autoplay state is stopped by a user. */
  @Event({ cancelable: false }) calciteCarouselStop: EventEmitter<void>;

  /** Fires when the carousel autoplay state pauses due to a user hovering over the component or focusing on the component or slotted content */
  @Event({ cancelable: false }) calciteCarouselPause: EventEmitter<void>;

  /** Fires when the carousel autoplay state resumes due to a user no longer hovering over the component or focusing on the component or slotted content */
  @Event({ cancelable: false }) calciteCarouselResume: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

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

  private resizeHandler = ({ contentRect: { width } }: ResizeObserverEntry): void => {
    this.setMaxItemsToBreakpoint(width);
  };

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

  private autoplayHandler = (): void => {
    this.clearIntervals();
    this.slideDurationInterval = setInterval(this.timer, this.autoplayDuration / 100);
  };

  private timer = (): void => {
    let time = this.slideDurationRemaining;
    const notSuspended =
      (!this.suspendedDueToFocus && !this.suspendedDueToHover) || this.userPreventsSuspend;
    if (notSuspended) {
      if (time <= 0.01) {
        time = 1;
        this.nextItem(false);
      } else {
        time = time - 0.01;
      }
    }
    if (time > 0) {
      this.slideDurationRemaining = time;
    }
  };

  private handleSlotChange = (event: Event): void => {
    const items = slotChangeGetAssignedElements<HTMLCalciteCarouselItemElement>(event);

    if (items.length < 1) {
      return;
    }

    const activeItemIndex = items.findIndex((item) => item.selected);
    const requestedSelectedIndex = activeItemIndex > -1 ? activeItemIndex : 0;

    this.items = items;

    this.setSelectedItem(requestedSelectedIndex, false);
  };

  private setSelectedItem = (requestedIndex: number, emit: boolean): void => {
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
  };

  private handleArrowClick = (event: MouseEvent): void => {
    const direction = (event.target as HTMLDivElement).dataset.direction;
    if (direction === "next") {
      this.direction = "forward";
      this.nextItem(true);
    } else if (direction === "previous") {
      this.direction = "backward";
      this.previousItem();
    }
  };

  private handleItemSelection = (event: MouseEvent): void => {
    const item = event.target as HTMLCalciteActionElement;
    const requestedPosition = parseInt(item.dataset.index);

    if (requestedPosition === this.selectedIndex) {
      return;
    }

    if (this.playing) {
      this.handlePause(true);
    }

    this.direction = requestedPosition > this.selectedIndex ? "forward" : "backward";
    this.setSelectedItem(requestedPosition, true);
  };

  private toggleRotation = (): void => {
    this.userPreventsSuspend = true;
    if (this.playing) {
      this.handlePause(true);
    } else {
      this.handlePlay(true);
    }
  };

  private handleFocusIn = (): void => {
    const isPlaying = this.playing;

    if (isPlaying) {
      this.suspendedDueToFocus = true;
    }
    if ((!this.suspendedDueToFocus || !this.suspendedDueToHover) && isPlaying) {
      this.calciteCarouselPause.emit();
    }
  };

  private handleMouseIn = (): void => {
    const isPlaying = this.playing;

    if (isPlaying) {
      this.suspendedDueToHover = true;
    }
    if ((!this.suspendedDueToFocus || !this.suspendedDueToHover) && isPlaying) {
      this.calciteCarouselPause.emit();
    }
  };

  private handleMouseOut = (event: MouseEvent): void => {
    const leavingComponent = !this.el.contains(event.relatedTarget as HTMLElement);
    const isPlaying = this.playing;

    if (leavingComponent && isPlaying) {
      this.suspendedDueToHover = false;
    }
    if (leavingComponent && isPlaying && !this.suspendedDueToFocus) {
      this.userPreventsSuspend = false;
      this.calciteCarouselResume.emit();
    }
  };

  private handleFocusOut = (event: FocusEvent): void => {
    const leavingComponent = !event.composedPath().includes(event.relatedTarget as HTMLElement);
    const isPlaying = this.playing;

    if (leavingComponent && isPlaying) {
      this.suspendedDueToFocus = false;
    }
    if (leavingComponent && isPlaying && !this.suspendedDueToHover) {
      this.userPreventsSuspend = false;
      this.calciteCarouselResume.emit();
    }
  };

  private containerKeyDownHandler = (event: KeyboardEvent): void => {
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
  };

  private tabListKeyDownHandler = (event: KeyboardEvent): void => {
    const visiblePaginationEls = Array(
      ...this.tabList.querySelectorAll(`button:not(.${CSS.paginationItemOutOfRange})`),
    );
    const currentEl = event.target as HTMLCalciteActionElement;
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
  };

  private storeTabListRef = (el: HTMLDivElement): void => {
    this.tabList = el;
  };

  private storeContainerRef = (el: HTMLDivElement): void => {
    this.container = el;
  };

  private storeItemContainerRef = (el: HTMLDivElement): void => {
    this.itemContainer = el;
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderRotationControl = (): VNode => {
    const text = this.playing ? this.messages.pause : this.messages.play;
    return (
      <button
        aria-label={text}
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
            value={this.slideDurationRemaining}
          />
        )}
      </button>
    );
  };

  renderPaginationArea = (): VNode => (
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

  renderPaginationItems = (): VNode => {
    const { selectedIndex, maxItems, items, label, handleItemSelection } = this;
    return (
      <div aria-label={label} class={CSS.paginationItems} role="tablist">
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
              aria-selected={toAriaBoolean(match)}
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
  };

  renderArrow = (direction: "previous" | "next"): VNode => {
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
  };

  render(): VNode {
    const { direction } = this;
    return (
      <Host>
        <InteractiveContainer disabled={this.disabled}>
          <div
            aria-label={this.label}
            aria-live={this.playing ? "off" : "polite"}
            aria-roledescription={this.messages.carousel}
            class={{
              [CSS.container]: true,
              [CSS.containerOverlaid]: this.controlOverlay,
              [CSS.containerEdged]: this.arrowType === "edge",
            }}
            onFocusin={this.handleFocusIn}
            onFocusout={this.handleFocusOut}
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
              // eslint-disable-next-line react/jsx-sort-props -- auto-generated by @esri/calcite-components/enforce-ref-last-prop
              ref={this.storeItemContainerRef}
            >
              <slot onSlotchange={this.handleSlotChange} />
            </section>
            {this.items.length > 1 && this.renderPaginationArea()}
            {this.arrowType === "edge" && this.renderArrow("previous")}
            {this.arrowType === "edge" && this.renderArrow("next")}
          </div>
        </InteractiveContainer>
      </Host>
    );
  }
}
