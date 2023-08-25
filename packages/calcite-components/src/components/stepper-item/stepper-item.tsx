import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { getElementProp, toAriaBoolean } from "../../utils/dom";
import { Layout, Scale } from "../interfaces";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  updateHostInteraction,
} from "../../utils/interactive";
import {
  StepperItemChangeEventDetail,
  StepperItemEventDetail,
  StepperItemKeyEventDetail,
} from "../stepper/interfaces";
import {
  numberStringFormatter,
  LocalizedComponent,
  disconnectLocalized,
  connectLocalized,
  NumberingSystem,
} from "../../utils/locale";
import {
  setUpLoadableComponent,
  setComponentLoaded,
  LoadableComponent,
  componentFocusable,
} from "../../utils/loadable";

/**
 * @slot - A slot for adding custom content.
 */
@Component({
  tag: "calcite-stepper-item",
  styleUrl: "stepper-item.scss",
  shadow: true,
})
export class StepperItem implements InteractiveComponent, LocalizedComponent, LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, the component is selected.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  @Watch("selected")
  selectedHandler(): void {
    if (this.selected) {
      this.emitRequestedItem();
    }
  }

  /** When `true`, the step has been completed. */
  @Prop({ reflect: true }) complete = false;

  /** When `true`, the component contains an error that requires resolution from the user. */
  @Prop({ reflect: true }) error = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /** The component header text. */
  @Prop() heading: string;

  /** A description for the component. Displays below the header text. */
  @Prop() description: string;

  // internal props inherited from wrapping calcite-stepper
  /** Defines the layout of the component. */
  /** @internal */
  @Prop({ reflect: true, mutable: true }) layout: Extract<"horizontal" | "vertical", Layout> =
    "horizontal";

  /** When `true`, displays a status icon in the component's heading. */
  /** @internal */
  @Prop({ mutable: true }) icon = false;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /** When `true`, displays the step number in the component's heading. */
  /** @internal */
  @Prop({ mutable: true }) numbered = false;

  /** Specifies the size of the component. */
  /** @internal */
  @Prop({ reflect: true, mutable: true }) scale: Scale = "m";

  /**
   * @internal
   */
  @Prop() numberingSystem: NumberingSystem;

  // watch for removal of disabled to register step
  @Watch("disabled")
  disabledWatcher(): void {
    this.registerStepperItem();
  }

  //--------------------------------------------------------------------------
  //
  //  Internal State/Props
  //
  //--------------------------------------------------------------------------

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleWatcher(locale: string): void {
    numberStringFormatter.numberFormatOptions = {
      locale,
      numberingSystem: this.numberingSystem,
      useGrouping: false,
    };
  }

  headerEl: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event({ cancelable: false })
  calciteInternalStepperItemKeyEvent: EventEmitter<StepperItemKeyEventDetail>;

  /**
   * @internal
   */
  @Event({ cancelable: false })
  calciteInternalStepperItemSelect: EventEmitter<StepperItemEventDetail>;

  /**
   * @internal
   */
  @Event({ cancelable: false })
  calciteInternalUserRequestedStepperItemSelect: EventEmitter<StepperItemChangeEventDetail>;

  /**
   * @internal
   */
  @Event({ cancelable: false })
  calciteInternalStepperItemRegister: EventEmitter<StepperItemEventDetail>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
    connectLocalized(this);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
    this.icon = getElementProp(this.el, "icon", false);
    this.numbered = getElementProp(this.el, "numbered", false);
    this.layout = getElementProp(this.el, "layout", false);
    this.scale = getElementProp(this.el, "scale", "m");
    this.parentStepperEl = this.el.parentElement as HTMLCalciteStepperElement;
    this.itemPosition = this.getItemPosition();
    this.registerStepperItem();

    if (this.selected) {
      this.emitRequestedItem();
    }
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this, true);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
    disconnectLocalized(this);
  }

  render(): VNode {
    return (
      <Host
        aria-expanded={toAriaBoolean(this.selected)}
        onClick={this.handleItemClick}
        onKeyDown={this.keyDownHandler}
      >
        <div class="container">
          <div
            class="stepper-item-header"
            tabIndex={
              /* additional tab index logic needed because of display: contents */
              this.layout === "horizontal" && !this.disabled ? 0 : null
            }
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={(el) => (this.headerEl = el)}
          >
            {this.icon ? this.renderIcon() : null}
            {this.numbered ? <div class="stepper-item-number">{this.renderNumbers()}.</div> : null}
            <div class="stepper-item-header-text">
              <span class="stepper-item-heading">{this.heading}</span>
              <span class="stepper-item-description">{this.description}</span>
            </div>
          </div>
          <div class="stepper-item-content">
            <slot />
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalStepperItemChange", { target: "body" })
  updateActiveItemOnChange(event: CustomEvent<StepperItemChangeEventDetail>): void {
    if (
      event.target === this.parentStepperEl ||
      event.composedPath().includes(this.parentStepperEl)
    ) {
      this.selectedPosition = event.detail.position;
      this.determineSelectedItem();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    (this.layout === "vertical" ? this.el : this.headerEl)?.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteStepperItemElement;

  /** position within parent */
  private itemPosition: number;

  /** the latest requested item position*/
  private selectedPosition: number;

  /** the parent stepper component */
  private parentStepperEl: HTMLCalciteStepperElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private keyDownHandler = (event: KeyboardEvent): void => {
    if (!this.disabled && event.target === this.el) {
      switch (event.key) {
        case " ":
        case "Enter":
          this.emitUserRequestedItem();
          event.preventDefault();
          break;
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
        case "Home":
        case "End":
          this.calciteInternalStepperItemKeyEvent.emit({ item: event });
          event.preventDefault();
          break;
      }
    }
  };

  private renderIcon(): VNode {
    const path = this.selected
      ? "circleF"
      : this.error
      ? "exclamationMarkCircleF"
      : this.complete
      ? "checkCircleF"
      : "circle";

    return (
      <calcite-icon class="stepper-item-icon" flipRtl={this.iconFlipRtl} icon={path} scale="s" />
    );
  }

  private determineSelectedItem(): void {
    this.selected = !this.disabled && this.itemPosition === this.selectedPosition;
  }

  private registerStepperItem(): void {
    this.calciteInternalStepperItemRegister.emit({
      position: this.itemPosition,
    });
  }

  private handleItemClick = (event: MouseEvent): void => {
    if (
      this.disabled ||
      (this.layout === "horizontal" &&
        event
          .composedPath()
          .some((el) => (el as HTMLElement).classList?.contains("stepper-item-content")))
    ) {
      return;
    }

    this.emitUserRequestedItem();
  };

  private emitUserRequestedItem = (): void => {
    this.emitRequestedItem();
    if (!this.disabled) {
      const position = this.itemPosition;

      this.calciteInternalUserRequestedStepperItemSelect.emit({
        position,
      });
    }
  };

  private emitRequestedItem = (): void => {
    if (!this.disabled) {
      const position = this.itemPosition;

      this.calciteInternalStepperItemSelect.emit({
        position,
      });
    }
  };

  private getItemPosition(): number {
    return Array.from(this.parentStepperEl?.querySelectorAll("calcite-stepper-item")).indexOf(
      this.el
    );
  }

  renderNumbers(): string {
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      useGrouping: false,
    };
    return numberStringFormatter.numberFormatter.format(this.itemPosition + 1);
  }
}
