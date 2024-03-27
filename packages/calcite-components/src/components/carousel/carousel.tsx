import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Host,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { guid } from "../../utils/guid";
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
   * Specify if the controls are overlaid on top of the content.
   */
  @Prop() controlOverlay?: boolean;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

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
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteCarouselElement;

  @State() activeIndex: number;

  @Watch("activeIndex")
  activeChangeHandler(): void {
    this.showSelectedItem();
  }

  @State() items: HTMLCalciteCarouselItemElement[];

  @State() itemsAvailable: HTMLCalciteCarouselItemElement[];

  @State() total: number;

  @State() direction: "advancing" | "retreating";

  @State() defaultMessages: CarouselMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  async effectiveLocaleChange(): Promise<void> {
    await updateMessages(this, this.effectiveLocale);
  }

  private slotRefEl: HTMLSlotElement;

  private container: HTMLDivElement;

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

  private updateItems = (event?: Event): void => {
    const target = event ? (event.target as HTMLSlotElement) : this.slotRefEl;
    const items = target
      ?.assignedElements({ flatten: true })
      .filter((el) => el?.matches("calcite-carousel-item")) as HTMLCalciteCarouselItemElement[];

    if (items?.length < 1) {
      return;
    }

    this.total = items?.length;

    const selectedItem = this.el?.querySelector<HTMLCalciteCarouselItemElement>(
      "calcite-carousel-item[active]",
    );

    this.items = items;
    this.activeIndex = selectedItem ? items?.indexOf(selectedItem) : 0;

    if (event) {
      this.showSelectedItem();
    }
  };

  private showSelectedItem(): void {
    this.items?.forEach((item, index) => {
      const isActive = this.activeIndex === index;
      item.active = isActive;

      if (isActive) {
        this.selectedItem = item;
      }
    });

    if (this.selectedItem) {
      this.calciteCarouselChange.emit();
    }
  }

  private nextItem(): void {
    this.direction = "advancing";
    const nextIndex = this.activeIndex + 1;
    this.activeIndex = (nextIndex + this.total) % this.total;
  }

  private previousItem(): void {
    this.direction = "retreating";
    const previousIndex = this.activeIndex - 1;
    this.activeIndex = (previousIndex + this.total) % this.total;
  }

  private goToItem = (step: number): void => {
    this.activeIndex = step;
  };

  private previousClicked = (): void => {
    this.previousItem();
  };

  private nextClicked = (): void => {
    this.nextItem();
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
        this.activeIndex = 0;
        break;
      case "End":
        event.preventDefault();
        this.activeIndex = this.total - 1;
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
    const { activeIndex } = this;
    const itemGuid = guid();
    return (
      <div
        class={{
          [CSS.pagination]: true,
          [CSS.isOverlay]: this.controlOverlay,
        }}
      >
        {this.renderPreviousArrow()}
        {this.items?.map((item, index) => (
          <Fragment>
            <calcite-action
              appearance={this.controlOverlay ? "solid" : "transparent"}
              class={`pagination-item${index === activeIndex ? " active-icon" : ""}`}
              icon={index === activeIndex ? ICONS.active : ICONS.inactive}
              id={`${itemGuid}-${index}`}
              label={item.label}
              onClick={() => this.goToItem(index)}
              scale="s"
              text={item.label}
            />
            <calcite-tooltip placement="bottom" reference-element={`${itemGuid}-${index}`}>
              {item.label}
            </calcite-tooltip>
          </Fragment>
        ))}
        {this.renderNextArrow()}
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
        onClick={this.previousClicked}
        scale="s"
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
        onClick={this.nextClicked}
        scale="s"
        text={this.messages.next}
      />
    );
  }

  render(): VNode {
    const { direction, activeIndex } = this;
    return (
      <Host>
        <InteractiveContainer disabled={this.disabled}>
          <div
            class={{ [CSS.container]: true, [CSS.isOverlay]: this.controlOverlay }}
            onKeyDown={this.keyDownHandler}
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
              key={activeIndex}
            >
              <slot
                onSlotchange={this.updateItems}
                ref={(el) => (this.slotRefEl = el as HTMLSlotElement)}
              />
            </div>
            {this.items?.length > 1 && this.renderPagination()}
          </div>
        </InteractiveContainer>
      </Host>
    );
  }
}
