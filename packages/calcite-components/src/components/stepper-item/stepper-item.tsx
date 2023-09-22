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
import { Layout, Position, Scale } from "../interfaces";
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
import { CSS } from "./resources";

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

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /**
   * @internal
   */
  @Prop() numberingSystem: NumberingSystem;

  // watch for removal of disabled to register step
  @Watch("disabled")
  disabledWatcher(): void {
    this.registerStepperItem();
  }

  /**
   * When `true`, displays a status icon in the `calcite-stepper-item` heading inherited from parent `calcite-stepper`.
   *
   * @internal
   */
  @Prop() icon = false;

  /**
   * Specifies the layout of the `calcite-stepper-item` inherited from parent `calcite-stepper`, defaults to `horizontal`.
   *
   * @internal
   */
  @Prop({ reflect: true }) layout: Extract<"horizontal" | "vertical", Layout>;

  /**
   * When `true`, displays the step number in the `calcite-stepper-item` heading inherited from parent `calcite-stepper`.
   *
   * @internal
   */
  @Prop() numbered = false;

  /**
   * Specifies the size of the component inherited from the `calcite-stepper`, defaults to `m`.
   *
   * @internal
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * @internal
   */
  @Prop({ reflect: true }) responsiveMode = false;

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

  /**
   * @internal
   */
  @Event({ cancelable: false })
  calciteInternalStepperItemNext: EventEmitter<void>;

  /**
   * @internal
   */
  @Event({ cancelable: false })
  calciteInternalStepperItemPrevious: EventEmitter<void>;

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
    this.parentStepperEl = this.el.parentElement as HTMLCalciteStepperElement;
    this.getItemPositionAndTotalItems();
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
        aria-current={this.selected ? "step" : "false"}
        onClick={this.handleItemClick}
        onKeyDown={this.keyDownHandler}
      >
        <div class={CSS.container}>
          {this.complete && (
            <span aria-live="polite" class={CSS.visuallyHidden}>
              {"Completed step"}
            </span>
          )}
          <div
            class={CSS.stepperItemHeader}
            tabIndex={
              /* additional tab index logic needed because of display: contents */
              this.layout === "horizontal" && !this.disabled ? 0 : null
            }
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={(el) => (this.headerEl = el)}
          >
            {this.renderActionIcon("start")}
            {this.icon ? this.renderIcon() : null}
            {this.numbered ? (
              <div class={CSS.stepperItemNumber}>{this.renderNumbers()}.</div>
            ) : null}
            <div class={CSS.stepperItemHeaderText}>
              <span class={CSS.stepperItemHeading}>{this.heading}</span>
              <span class={CSS.stepperItemDescription}>{this.description}</span>
            </div>
            {this.renderActionIcon("end")}
          </div>
          <div class={CSS.stepperItemContent}>
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

  /** total number of stepper-item elements slotted in parent stepper element*/
  private totalItems: number;

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

  private renderActionIcon(position: Position): VNode {
    const isPositionStart = position === "start";
    const path = isPositionStart ? "chevron-left" : "chevron-right";
    const { itemPosition, totalItems, responsiveMode, layout, iconFlipRtl } = this;

    return layout === "horizontal" && responsiveMode ? (
      <calcite-action
        appearance="transparent"
        class={{
          [CSS.actionIcon]: true,
          [CSS.actionIconStart]: isPositionStart,
          [CSS.actionIconEnd]: !isPositionStart,
        }}
        disabled={
          (itemPosition === 0 && isPositionStart) ||
          (itemPosition === totalItems - 1 && !isPositionStart)
        }
        icon={path}
        iconFlipRtl={iconFlipRtl}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={(event) => this.handleActionClick(event, position)}
        scale={this.scale}
        text="next Step"
      />
    ) : null;
  }

  private handleActionClick(event: MouseEvent, position: Position): void {
    event.stopPropagation();
    if (position === "start") {
      this.calciteInternalStepperItemPrevious.emit();
    } else {
      this.calciteInternalStepperItemNext.emit();
    }
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

  private getItemPositionAndTotalItems(): void {
    const items = Array.from(this.parentStepperEl?.querySelectorAll("calcite-stepper-item"));
    this.itemPosition = items.indexOf(this.el);
    this.totalItems = items.length;
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
