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
  connectInteractive,
  updateHostInteraction,
  disconnectInteractive,
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
import { getRoundRobinIndex } from "../../utils/array";
import { ArrowType } from "../interfaces";
import { CSS, DURATION, ICONS } from "./resources";
import { CarouselMessages } from "./assets/carousel/t9n";
import { AutoplayType } from "./interfaces";

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
    connectInteractive(this);
    connectLocalized(this);
    connectMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    this.clearIntervals();
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

  private container: HTMLDivElement;

  private containerId = `calcite-carousel-container-${guid()}`;

  private slideDurationInterval = null;

  private slideInterval = null;

  private tabList: HTMLDivElement;

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
    const items = slotChangeGetAssignedElements(event) as HTMLCalciteCarouselItemElement[];

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
      const isMatch = requestedIndex === index;
      el.selected = isMatch;
      if (isMatch) {
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

    switch (event.key) {
      case " ":
      case "Enter":
        event.preventDefault();
        this.toggleRotation();
        break;
      case "ArrowRight":
        this.direction = "forward";
        this.nextItem(true);
        break;
      case "ArrowLeft":
        this.direction = "backward";
        this.previousItem();
        break;
      case "Home":
        event.preventDefault();
        this.direction = "backward";
        this.setSelectedItem(0, true);
        break;
      case "End":
        event.preventDefault();
        this.direction = "forward";
        this.setSelectedItem(this.items.length - 1, true);
        break;
    }
  };

  private tabListKeyDownHandler = (event: KeyboardEvent): void => {
    const interactiveItems = Array(...this.tabList.querySelectorAll("button"));
    const currentEl = event.target as HTMLCalciteActionElement;
    switch (event.key) {
      case "ArrowRight":
        focusElementInGroup(interactiveItems, currentEl, "next");
        break;
      case "ArrowLeft":
        focusElementInGroup(interactiveItems, currentEl, "previous");
        break;
      case "Home":
        event.preventDefault();
        focusElementInGroup(interactiveItems, currentEl, "first");
        break;
      case "End":
        event.preventDefault();
        focusElementInGroup(interactiveItems, currentEl, "last");
        break;
    }
  };

  private storeTabListRef = (el: HTMLDivElement): void => {
    this.tabList = el;
  };

  private storeContainerRef = (el: HTMLDivElement): void => {
    this.container = el;
  };

  private itemContainer: HTMLDivElement;

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

  renderPaginationItems = (): VNode => (
    <div aria-label={this.label} class={CSS.paginationItems} role="tablist">
      {this.items.map((item, index) => {
        const isMatch = index === this.selectedIndex;
        return (
          <button
            aria-controls={!isMatch ? item.id : undefined}
            aria-selected={toAriaBoolean(isMatch)}
            class={{
              [CSS.paginationItem]: true,
              [CSS.paginationItemIndividual]: true,
              [CSS.paginationItemSelected]: isMatch,
            }}
            data-index={index}
            key={item.id}
            onClick={this.handleItemSelection}
            role="tab"
            title={item.label}
          >
            <calcite-icon icon={isMatch ? ICONS.active : ICONS.inactive} scale="l" />
          </button>
        );
      })}
    </div>
  );

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
