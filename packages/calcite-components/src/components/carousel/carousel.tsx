import {
  Component,
  Element,
  Event,
  EventEmitter,
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
import { CSS, DURATION, ICONS } from "./resources";
import { CarouselMessages } from "./assets/carousel/t9n";
import { ArrowType } from "./interfaces";

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
   * Specifies how and if the "previous" and "next" arrows are displayed.
   */
  @Prop({ reflect: true }) arrowType: ArrowType = "inline";

  /**
   * Specifies if the component's controls are placed on top of the content.
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
   * When `true`, the rotation control is displayed.
   */
  @Prop({ reflect: true }) rotation = false;

  /**
   *  When `rotation` is `true`, specifies in seconds the length of time to display each Carousel Item
   */
  @Prop({ reflect: true }) rotationDuration = DURATION;

  /**
   * When `true`, and `rotation` is `true`, the carousel will auto-rotate.
   */
  @Prop({ reflect: true, mutable: true }) rotating = false;

  @Watch("rotating")
  handleIsRotatingChange(): void {
    this.setRotationInterval();
  }

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
    this.setRotationInterval();
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    clearTimeout(this.slideInterval);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteCarouselElement;

  @State() selectedIndex: number;

  @State() items: HTMLCalciteCarouselItemElement[];

  @State() direction: "advancing" | "retreating";

  @State() defaultMessages: CarouselMessages;

  @State() swipeStartPosition: number;

  @State() swipeTolerance = 100;

  @State() slideDurationRemaining = 1;

  @State() pausedDueToInteraction = false;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  async effectiveLocaleChange(): Promise<void> {
    await updateMessages(this, this.effectiveLocale);
  }

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

  /** Fires when the carousel rotation state changes. */
  @Event({ cancelable: false }) calciteCarouselRotatingChange: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private updateItems = (event: Event): void => {
    const items = slotChangeGetAssignedElements(event) as HTMLCalciteCarouselItemElement[];

    if (items.length < 1) {
      return;
    }

    const activeItemIndex = items?.findIndex((item) => item.selected);
    const requestedSelectedIndex = activeItemIndex > -1 ? activeItemIndex : 0;

    this.items = items;
    this.setSelectedItem(false, requestedSelectedIndex);
  };

  private setSelectedItem = (emit: boolean, requestedIndex: number): void => {
    const previousSelected = this.selectedIndex;
    this.items?.forEach((el, index) => {
      const isMatch = requestedIndex === index;
      el.selected = isMatch;
      if (isMatch) {
        this.selectedItem = el;
        this.selectedIndex = index;
      }
    });

    if (emit) {
      if (this.rotating) {
        this.rotating = false;
        this.calciteCarouselRotatingChange.emit();
      }

      if (previousSelected !== this.selectedIndex) {
        this.calciteCarouselChange.emit();
      }
    }
  };

  private nextItem = (emit: boolean): void => {
    if (this.rotating && emit) {
      this.setIsRotating();
    }
    const nextIndex = this.selectedIndex === this.items?.length - 1 ? 0 : this.selectedIndex + 1;
    this.setSelectedItem(emit, nextIndex);
  };

  private previousItem = (): void => {
    if (this.rotating) {
      this.setIsRotating();
    }
    const prevIndex = this.selectedIndex === 0 ? this.items?.length - 1 : this.selectedIndex - 1;
    this.setSelectedItem(true, prevIndex);
  };

  private handleItemSelection = (event: MouseEvent): void => {
    if (this.rotating) {
      this.setIsRotating();
    }
    const item = event.target as HTMLCalciteActionElement;
    const requestedPosition = parseInt(item.dataset.index);
    this.direction = requestedPosition > this.selectedIndex ? "advancing" : "retreating";
    this.setSelectedItem(true, requestedPosition);
  };

  private handleSwipeStart = (event: MouseEvent): void => {
    this.swipeStartPosition = event.pageX;
  };

  private handleSwipeEnd = (event: MouseEvent): void => {
    const pagePosition = event.pageX;
    const diffX = Math.abs(event.pageX - this.swipeStartPosition);
    const thresholdMet = diffX > this.swipeTolerance;

    if (thresholdMet && pagePosition > this.swipeStartPosition) {
      this.direction = "retreating";
      this.previousItem();
    } else if (thresholdMet) {
      this.direction = "advancing";
      this.nextItem(true);
    }
  };

  private setRotationInterval = (): void => {
    clearInterval(this.slideInterval);
    if (this.rotation && this.rotating) {
      this.rotationHandler();
      this.slideInterval = setInterval(this.rotationHandler, this.rotationDuration);
    }
  };

  private rotationHandler = (): void => {
    clearInterval(this.slideDurationInterval);
    this.slideDurationInterval = setInterval(this.timer, this.rotationDuration);
  };

  private timer = (time?: number): void => {
    time = time || this.slideDurationRemaining;
    if (time <= 0.01) {
      time = 1;
      this.nextItem(false);
    } else {
      time = time - 0.01;
    }
    this.slideDurationRemaining = time;
  };

  private setIsRotating = (): void => {
    if (this.rotating) {
      clearInterval(this.slideInterval);
      clearInterval(this.slideDurationInterval);
      this.slideDurationRemaining = 1;
    }

    this.rotating = !this.rotating;
    this.calciteCarouselRotatingChange.emit();
  };

  private handleRotationControlClick = (): void => {
    this.setIsRotating();
  };

  private storeTabListRef = (el: HTMLDivElement): void => {
    this.tabList = el;
  };

  private storeContainerRef = (el: HTMLDivElement): void => {
    this.container = el;
  };

  private containerKeyDownHandler = (event: KeyboardEvent): void => {
    if (event.target !== this.container) {
      return;
    }

    switch (event.key) {
      case " ":
      case "Enter":
        event.preventDefault();
        this.setIsRotating();
        break;
      case "ArrowRight":
        this.direction = "advancing";
        this.nextItem(true);
        break;
      case "ArrowLeft":
        this.direction = "retreating";
        this.previousItem();
        break;
      case "Home":
        event.preventDefault();
        this.direction = "retreating";
        this.setSelectedItem(true, 0);
        break;
      case "End":
        event.preventDefault();
        this.direction = "advancing";
        this.setSelectedItem(true, this.items?.length - 1);
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

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderRotationControl = (): VNode => {
    const text = this.rotating ? this.messages.pause : this.messages.play;

    return (
      <button
        aria-label={text}
        class={{
          [CSS.paginationItem]: true,
          [CSS.rotationControl]: true,
        }}
        onClick={this.handleRotationControlClick}
        title={text}
      >
        <calcite-icon icon={this.rotating ? ICONS.pause : ICONS.play} scale="s" />
        {this.rotating && (
          <calcite-progress
            class={CSS.rotatingProgress}
            label={"Slide progress"}
            value={this.slideDurationRemaining}
          />
        )}
      </button>
    );
  };

  renderPagination = (): VNode => {
    const { selectedIndex } = this;
    return (
      <div
        class={{
          [CSS.pagination]: true,
          [CSS.isOverlay]: this.controlOverlay,
        }}
        onKeyDown={this.tabListKeyDownHandler}
        // eslint-disable-next-line react/jsx-sort-props
        ref={this.storeTabListRef}
      >
        {this.rotation && this.renderRotationControl()}
        {this.arrowType === "inline" && this.renderArrow("previous")}
        <div aria-label={this.label} class={CSS.paginationItems} role="tablist" tabIndex={-1}>
          {this.items?.map((item, index) => {
            const isMatch = index === selectedIndex;
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
                <calcite-icon icon={isMatch ? ICONS.active : ICONS.inactive} scale="s" />
              </button>
            );
          })}
        </div>
        {this.arrowType === "inline" && this.renderArrow("next")}
      </div>
    );
  };

  renderArrow = (direction: "previous" | "next"): VNode => {
    const isPrev = direction === "previous";
    const dir = getElementDir(this.el);
    const scale = this.arrowType === "edges" ? "m" : "s";
    const css = isPrev ? CSS.pagePrevious : CSS.pageNext;
    const navigateFx = isPrev ? this.previousItem : () => this.nextItem(true);
    const title = isPrev ? this.messages.previous : this.messages.next;
    const iconRtl = isPrev ? ICONS.chevronRight : ICONS.chevronLeft;
    const iconLtr = isPrev ? ICONS.chevronLeft : ICONS.chevronRight;
    return (
      <button
        aria-controls={this.containerId}
        class={{
          [CSS.paginationItem]: true,
          [css]: true,
        }}
        onClick={navigateFx}
        title={title}
      >
        <calcite-icon icon={dir === "rtl" ? iconRtl : iconLtr} scale={scale} />
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
            aria-live={this.rotating ? "off" : "polite"}
            aria-roledescription="carousel"
            class={{
              [CSS.container]: true,
              [CSS.isOverlay]: this.controlOverlay,
              [CSS.isEdges]: this.arrowType === "edges",
            }}
            onKeyDown={this.containerKeyDownHandler}
            onPointerDown={this.handleSwipeStart}
            onPointerUp={this.handleSwipeEnd}
            role="group"
            tabIndex={0}
            // eslint-disable-next-line react/jsx-sort-props
            ref={this.storeContainerRef}
          >
            <section
              class={{
                [CSS.itemContainer]: true,
                [CSS.itemContainerAdvancing]: direction === "advancing",
                [CSS.itemContainerRetreating]: direction === "retreating",
              }}
              id={this.containerId}
            >
              <slot onSlotchange={this.updateItems} />
            </section>
            {this.items?.length > 1 && this.renderPagination()}
            {this.arrowType === "edges" && this.renderArrow("previous")}
            {this.arrowType === "edges" && this.renderArrow("next")}
          </div>
        </InteractiveContainer>
      </Host>
    );
  }
}
