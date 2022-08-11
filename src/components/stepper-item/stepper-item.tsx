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
  VNode,
  Watch
} from "@stencil/core";
import { getElementProp, toAriaBoolean } from "../../utils/dom";
import { Layout, Scale } from "../interfaces";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import {
  StepperItemChangeEventDetail,
  StepperItemEventDetail,
  StepperItemKeyEventDetail
} from "../stepper/interfaces";

/**
 * @slot - A slot for adding custom content.
 */
@Component({
  tag: "calcite-stepper-item",
  styleUrl: "stepper-item.scss",
  shadow: true
})
export class StepperItem implements InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteStepperItemElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** When true, the component is active. */
  @Prop({ reflect: true, mutable: true }) active = false;

  /** When true, the component's workflow has been completed. */
  @Prop({ reflect: true }) complete = false;

  /** When true, the component contains an error that requires resolution from the user. */
  @Prop() error = false;

  /** When true, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The component header text.
   *
   * @deprecated use "heading" instead.
   */
  @Prop() itemTitle?: string;

  /** The component header text. */
  @Prop() heading?: string;

  /**
   * A description for the component. Displays below the header text.
   *
   * @deprecated use "description" instead.
   */
  @Prop() itemSubtitle?: string;

  /** A description for the component. Displays below the header text. */
  @Prop() description: string;

  // internal props inherited from wrapping calcite-stepper
  /** Defines the layout of the component. */
  /** @internal */
  @Prop({ reflect: true, mutable: true }) layout?: Extract<"horizontal" | "vertical", Layout> =
    "horizontal";

  /** When true, displays a status icon in the `calcite-stepper-item` heading. */
  /** @internal */
  @Prop({ mutable: true }) icon = false;

  /** When true, displays the step number in the `calcite-stepper-item` heading. */
  /** @internal */
  @Prop({ mutable: true }) numbered = false;

  /** Specifies the size of the component. */
  /** @internal */
  @Prop({ reflect: true, mutable: true }) scale: Scale = "m";

  // watch for removal of disabled to register step
  @Watch("disabled")
  disabledWatcher(): void {
    this.registerStepperItem();
  }

  @Watch("active")
  activeWatcher(active: boolean): void {
    if (active) {
      this.emitRequestedItem();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Internal State/Props
  //
  //--------------------------------------------------------------------------

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

  componentWillLoad(): void {
    this.icon = getElementProp(this.el, "icon", false);
    this.numbered = getElementProp(this.el, "numbered", false);
    this.layout = getElementProp(this.el, "layout", false);
    this.scale = getElementProp(this.el, "scale", "m");
    this.parentStepperEl = this.el.parentElement as HTMLCalciteStepperElement;
    this.itemPosition = this.getItemPosition();
    this.registerStepperItem();

    if (this.active) {
      this.emitRequestedItem();
    }
  }

  componentDidRender(): void {
    updateHostInteraction(this, true);
  }

  render(): VNode {
    return (
      <Host
        aria-expanded={toAriaBoolean(this.active)}
        onClick={this.emitUserRequestedItem}
        onKeyDown={this.keyDownHandler}
      >
        <div class="container">
          <div
            class="stepper-item-header"
            ref={(el) => (this.headerEl = el)}
            tabIndex={
              /* additional tab index logic needed because of display: contents */
              this.layout === "horizontal" && !this.disabled ? 0 : null
            }
          >
            {this.icon ? this.renderIcon() : null}
            {this.numbered ? <div class="stepper-item-number">{this.itemPosition + 1}.</div> : null}
            <div class="stepper-item-header-text">
              <span class="stepper-item-heading">{this.heading || this.itemTitle}</span>
              <span class="stepper-item-description">{this.description || this.itemSubtitle}</span>
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
      this.activePosition = event.detail.position;
      this.determineActiveItem();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async setFocus(): Promise<void> {
    (this.layout === "vertical" ? this.el : this.headerEl)?.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  /** position within parent */
  private itemPosition: number;

  /** the latest requested item position */
  private activePosition: number;

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
    const path = this.active
      ? "circleF"
      : this.error
      ? "exclamationMarkCircleF"
      : this.complete
      ? "checkCircleF"
      : "circle";

    return <calcite-icon class="stepper-item-icon" icon={path} scale="s" />;
  }

  private determineActiveItem(): void {
    this.active = !this.disabled && this.itemPosition === this.activePosition;
  }

  private registerStepperItem(): void {
    this.calciteInternalStepperItemRegister.emit({
      position: this.itemPosition
    });
  }

  private emitUserRequestedItem = (): void => {
    this.emitRequestedItem();
    if (!this.disabled) {
      const position = this.itemPosition;

      this.calciteInternalUserRequestedStepperItemSelect.emit({
        position
      });
    }
  };

  private emitRequestedItem = (): void => {
    if (!this.disabled) {
      const position = this.itemPosition;

      this.calciteInternalStepperItemSelect.emit({
        position
      });
    }
  };

  private getItemPosition(): number {
    return Array.from(this.parentStepperEl?.querySelectorAll("calcite-stepper-item")).indexOf(
      this.el
    );
  }
}
