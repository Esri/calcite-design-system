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
import { CSS, ICONS } from "./resources";
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
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
    disconnectLocalized(this);
    disconnectMessages(this);
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

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  async effectiveLocaleChange(): Promise<void> {
    await updateMessages(this, this.effectiveLocale);
  }

  @State() containerId = "";

  private container: HTMLDivElement;

  @Watch("container")
  onContainerRefChange(): void {
    this.containerId = this.container?.id;
  }

  private tabList: HTMLDivElement;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /** Fires when the selected `calcite-carousel-item` changes. */
  @Event({ cancelable: false }) calciteCarouselChange: EventEmitter<void>;

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
    this.items?.forEach((el, index) => {
      const isMatch = requestedIndex === index;
      el.selected = isMatch;
      if (isMatch) {
        this.selectedItem = el;
        this.selectedIndex = index;
      }
    });

    if (emit) {
      this.calciteCarouselChange.emit();
    }
  };

  private nextItem = (): void => {
    const nextIndex = this.selectedIndex === this.items?.length - 1 ? 0 : this.selectedIndex + 1;
    this.setSelectedItem(true, nextIndex);
  };

  private previousItem = (): void => {
    const prevIndex = this.selectedIndex === 0 ? this.items?.length - 1 : this.selectedIndex - 1;
    this.setSelectedItem(true, prevIndex);
  };

  private handleItemSelection = (event: MouseEvent): void => {
    const item = event.target as HTMLCalciteActionElement;
    const requestedPosition = parseInt(item.dataset.index);
    this.setSelectedItem(true, requestedPosition);
  };

  private containerKeyDownHandler = (event: KeyboardEvent): void => {
    if (event.target !== this.container) {
      return;
    }

    switch (event.key) {
      case "ArrowRight":
        this.direction = "advancing";
        this.nextItem();
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

  private storeTabListRef = (el: HTMLDivElement): void => {
    this.tabList = el;
  };

  private storeContainerRef = (el: HTMLDivElement): void => {
    this.container = el;
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderPagination(): VNode {
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
  }

  renderArrow = (direction: "previous" | "next"): VNode => {
    const dir = getElementDir(this.el);
    const scale = this.arrowType === "edges" ? "m" : "s";
    const css = direction === "previous" ? CSS.pagePrevious : CSS.pageNext;
    const navigateFx = direction === "previous" ? this.previousItem : this.nextItem;
    const title = direction === "previous" ? this.messages.previous : this.messages.next;
    const iconRtl = direction === "previous" ? ICONS.chevronRight : ICONS.chevronLeft;
    const iconLtr = direction === "previous" ? ICONS.chevronLeft : ICONS.chevronRight;
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
    const containerId = `calcite-carousel-container-${guid()}`;
    return (
      <Host>
        <InteractiveContainer disabled={this.disabled}>
          <div
            class={{
              [CSS.container]: true,
              [CSS.isOverlay]: this.controlOverlay,
              [CSS.isEdges]: this.arrowType === "edges",
            }}
          >
            <section
              aria-label={this.label}
              aria-roledescription="carousel"
              class={{
                [CSS.itemContainer]: true,
                [CSS.itemContainerAdvancing]: direction === "advancing",
                [CSS.itemContainerRetreating]: direction === "retreating",
              }}
              id={containerId}
              onKeyDown={this.containerKeyDownHandler}
              role="group"
              tabIndex={0}
              // eslint-disable-next-line react/jsx-sort-props
              ref={this.storeContainerRef}
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
