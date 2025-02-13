// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  JsxNode,
  setAttribute,
} from "@arcgis/lumina";
import { Scale } from "../interfaces";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import {
  StepperItemChangeEventDetail,
  StepperItemEventDetail,
  StepperItemKeyEventDetail,
  StepperLayout,
} from "../stepper/interfaces";
import { NumberingSystem, numberStringFormatter } from "../../utils/locale";
import { componentFocusable } from "../../utils/component";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { Stepper } from "../stepper/stepper";
import { isHidden } from "../../utils/component";
import { CSS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./stepper-item.scss";

declare global {
  interface DeclareElements {
    "calcite-stepper-item": StepperItem;
  }
}

/** @slot - A slot for adding custom content. */
export class StepperItem extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private headerEl = createRef<HTMLDivElement>();

  /** position within parent */
  private itemPosition: number;

  /** the parent stepper component */
  private parentStepperEl: Stepper["el"];

  /** the latest requested item position */
  private selectedPosition: number;

  // #endregion

  // #region Public Properties

  /** When `true`, the step has been completed. */
  @property({ reflect: true }) complete = false;

  /** A description for the component. Displays below the header text. */
  @property() description: string;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, the component contains an error that requires resolution from the user. */
  @property({ reflect: true }) error = false;

  /** The component header text. */
  @property() heading: string;

  /**
   * When `true`, displays a status icon in the `calcite-stepper-item` heading inherited from parent `calcite-stepper`.
   *
   * @private
   */
  @property() icon = false;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /**
   * When `true`, the item will be hidden
   *
   * @private
   *  */
  @property({ reflect: true }) itemHidden = false;

  /**
   * Specifies the layout of the `calcite-stepper-item` inherited from parent `calcite-stepper`, defaults to `horizontal`.
   *
   * @private
   */
  @property({ reflect: true }) layout: StepperLayout;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  /**
   * When `true`, displays the step number in the `calcite-stepper-item` heading inherited from parent `calcite-stepper`.
   *
   * @private
   */
  @property() numbered = false;

  /** @private */
  @property() numberingSystem: NumberingSystem;

  /**
   * Specifies the size of the component inherited from the `calcite-stepper`, defaults to `m`.
   *
   * @private
   */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, the component is selected. */
  @property({ reflect: true }) selected = false;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    (this.layout === "vertical" ? this.el : this.headerEl.value)?.focus();
  }

  // #endregion

  // #region Events

  /** @private */
  calciteInternalStepperItemKeyEvent = createEvent<StepperItemKeyEventDetail>({
    cancelable: false,
  });

  /** @private */
  calciteInternalStepperItemRegister = createEvent<StepperItemEventDetail>({ cancelable: false });

  /** @private */
  calciteInternalStepperItemSelect = createEvent<StepperItemEventDetail>({ cancelable: false });

  /** Fires when the active `calcite-stepper-item` changes. */
  calciteStepperItemSelect = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listenOn<CustomEvent<StepperItemChangeEventDetail>>(
      document.body,
      "calciteInternalStepperItemChange",
      this.updateActiveItemOnChange,
    );
    this.listen("click", this.handleItemClick);
    this.listen("keydown", this.keyDownHandler);
  }

  async load(): Promise<void> {
    this.parentStepperEl = this.el.parentElement as Stepper["el"];
    this.itemPosition = this.getItemPosition();
    this.registerStepperItem();

    if (this.selected) {
      this.emitRequestedItem();
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("selected") && (this.hasUpdated || this.selected !== false)) {
      this.selectedHandler();
    }

    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      this.registerStepperItem();
    }

    if (changes.has("messages")) {
      this.effectiveLocaleWatcher(this.messages._lang);
    }
  }

  override updated(): void {
    updateHostInteraction(this);
    setAttribute(this.el, "tabindex", this.disabled || this.layout === "horizontal" ? null : 0);
  }

  // #endregion

  // #region Private Methods

  private selectedHandler(): void {
    if (this.selected) {
      this.emitRequestedItem();
    }
  }

  // watch for removal of disabled to register step
  private effectiveLocaleWatcher(locale: string): void {
    numberStringFormatter.numberFormatOptions = {
      locale,
      numberingSystem: this.numberingSystem,
      useGrouping: false,
    };
  }

  private updateActiveItemOnChange(event: CustomEvent<StepperItemChangeEventDetail>): void {
    if (
      event.target === this.parentStepperEl ||
      event.composedPath().includes(this.parentStepperEl)
    ) {
      this.selectedPosition = event.detail.position;
      this.determineSelectedItem();
    }
  }

  private keyDownHandler(event: KeyboardEvent): void {
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
  }

  private determineSelectedItem(): void {
    this.selected = !this.disabled && this.itemPosition === this.selectedPosition;
  }

  private registerStepperItem(): void {
    this.calciteInternalStepperItemRegister.emit({
      position: this.itemPosition,
    });
  }

  private handleItemClick(event: MouseEvent): void {
    if (
      this.disabled ||
      isHidden(this.el) ||
      (this.layout === "horizontal" &&
        event
          .composedPath()
          .some((el) => (el as HTMLElement).classList?.contains("stepper-item-content")))
    ) {
      return;
    }

    this.emitUserRequestedItem();
  }

  private emitUserRequestedItem(): void {
    this.emitRequestedItem();
    if (!this.disabled) {
      this.calciteStepperItemSelect.emit();
    }
  }

  private emitRequestedItem(): void {
    if (!this.disabled) {
      const position = this.itemPosition;

      this.calciteInternalStepperItemSelect.emit({
        position,
      });
    }
  }

  private getItemPosition(): number {
    return Array.from(
      this.parentStepperEl?.querySelectorAll(
        "calcite-stepper-item:not([hidden]):not([item-hidden])",
      ),
    ).indexOf(this.el);
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaCurrent = this.selected ? "step" : "false";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */

    // use local var to bypass logic-changing compiler transformation
    const innerDisplayContextTabIndex =
      /* additional tab index logic needed because of display: contents for horizontal layout */
      this.layout === "horizontal" && !this.disabled ? 0 : null;

    return (
      <InteractiveContainer disabled={this.disabled}>
        <div class={CSS.container}>
          {this.complete && (
            <span ariaLive="polite" class={CSS.visuallyHidden}>
              {this.messages.complete}
            </span>
          )}
          <div
            class={CSS.stepperItemHeader}
            ref={this.headerEl}
            tabIndex={innerDisplayContextTabIndex}
          >
            {this.icon ? this.renderIcon() : null}
            {this.numbered ? (
              <div class={CSS.stepperItemNumber}>{this.renderNumbers()}.</div>
            ) : null}
            <div class={CSS.stepperItemHeaderText}>
              <span class={CSS.stepperItemHeading}>{this.heading}</span>
              <span class={CSS.stepperItemDescription}>{this.description}</span>
            </div>
          </div>
          <div class={CSS.stepperItemContent}>
            <slot />
          </div>
        </div>
      </InteractiveContainer>
    );
  }

  private renderIcon(): JsxNode {
    let path: IconNameOrString = "circle";

    if (this.selected && (this.layout !== "horizontal-single" || (!this.error && !this.complete))) {
      path = "circleF";
    } else if (this.error) {
      path = "exclamationMarkCircleF";
    } else if (this.complete) {
      path = "checkCircleF";
    }

    return (
      <calcite-icon class="stepper-item-icon" flipRtl={this.iconFlipRtl} icon={path} scale="s" />
    );
  }

  private renderNumbers(): string {
    numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: false,
    };
    return numberStringFormatter.numberFormatter.format(this.itemPosition + 1);
  }

  // #endregion
}
