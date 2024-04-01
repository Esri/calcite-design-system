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
import { getElementDir, slotChangeGetAssignedElements } from "../../utils/dom";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { CarouselMessages } from "./assets/carousel/t9n";
import { CSS, ICONS } from "./resources";
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
   * Specify how and if the previous and next arrows are displayed.
   */
  @Prop({ reflect: true }) arrowType: ArrowType = "inline";

  /**
   * Specify if the controls are overlaid on top of the content.
   */
  @Prop({ reflect: true }) controlOverlay = false;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The component label text
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

  private container: HTMLDivElement;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /** Fires when the selected carousel item changes. */
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
    this.direction = "advancing";
    const nextIndex = this.selectedIndex === this.items?.length - 1 ? 0 : this.selectedIndex + 1;
    this.setSelectedItem(true, nextIndex);
  };

  private previousItem = (): void => {
    this.direction = "retreating";
    const prevIndex = this.selectedIndex === 0 ? this.items?.length - 1 : this.selectedIndex - 1;
    this.setSelectedItem(true, prevIndex);
  };

  private handleItemSelection = (event: MouseEvent): void => {
    const item = event.target as HTMLCalciteActionElement;
    const requestedPosition = parseInt(item.dataset.index);
    this.setSelectedItem(true, requestedPosition);
  };

  private keyDownHandler = (event: KeyboardEvent): void => {
    if (event.target !== this.container) {
      return;
    }

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        this.nextItem();
        break;
      case "ArrowLeft":
        event.preventDefault();
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
        role="tablist"
      >
        {this.arrowType === "inline" && this.renderPreviousArrow()}
        {this.items?.map((item, index) => (
          <calcite-action
            appearance={this.controlOverlay ? "solid" : "transparent"}
            class={{
              [CSS.paginationItem]: true,
              [CSS.paginationItemSelected]: index === selectedIndex,
            }}
            data-index={index}
            icon={index === selectedIndex ? ICONS.active : ICONS.inactive}
            label={item.label}
            onClick={this.handleItemSelection}
            role="tab"
            scale="s"
            text={item.label}
            title={item.label}
          />
        ))}
        {this.arrowType === "inline" && this.renderNextArrow()}
      </div>
    );
  }

  renderPreviousArrow(): VNode {
    const dir = getElementDir(this.el);
    return (
      <calcite-action
        appearance={this.controlOverlay ? "solid" : "transparent"}
        class={CSS.pagePrevious}
        icon={dir === "rtl" ? ICONS.chevronRight : ICONS.chevronLeft}
        onClick={this.previousItem}
        scale={this.arrowType === "edges" ? "m" : "s"}
        text={this.messages.previous}
      />
    );
  }

  renderNextArrow(): VNode {
    const dir = getElementDir(this.el);
    return (
      <calcite-action
        appearance={this.controlOverlay ? "solid" : "transparent"}
        class={CSS.pageNext}
        icon={dir === "rtl" ? ICONS.chevronLeft : ICONS.chevronRight}
        onClick={this.nextItem}
        scale={this.arrowType === "edges" ? "m" : "s"}
        text={this.messages.next}
      />
    );
  }

  render(): VNode {
    const { direction, selectedIndex } = this;
    return (
      <Host>
        <InteractiveContainer disabled={this.disabled}>
          <div
            aria-label={this.label}
            aria-roledescription="carousel"
            class={{
              [CSS.container]: true,
              [CSS.isOverlay]: this.controlOverlay,
              [CSS.isEdges]: this.arrowType === "edges",
            }}
            onKeyDown={this.keyDownHandler}
            role="group"
            tabIndex={0}
            // eslint-disable-next-line react/jsx-sort-props
            ref={this.storeContainerRef}
          >
            <div
              class={{
                [CSS.itemContainer]: true,
                [CSS.itemContainerAdvancing]: direction === "advancing",
                [CSS.itemContainerRetreating]: direction === "retreating",
              }}
              key={selectedIndex}
            >
              <slot onSlotchange={this.updateItems} />
            </div>
            {this.arrowType === "edges" && this.renderPreviousArrow()}
            {this.items?.length > 1 && this.renderPagination()}
            {this.arrowType === "edges" && this.renderNextArrow()}
          </div>
        </InteractiveContainer>
      </Host>
    );
  }
}
