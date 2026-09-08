import { PropertyValues } from "lit";
import { createRef } from "lit/directives/ref.js";
import {
  createEvent,
  h,
  JsxNode,
  LitElement,
  method,
  property,
  setAttribute,
  state,
} from "@arcgis/lumina";
import { Scale } from "../types";
import {
  StepperItemChangeEventDetail,
  StepperItemEventDetail,
  StepperLayout,
} from "../stepper/types";
import { NumberingSystem, numberStringFormatter } from "../../utils/locale";
import { IconName } from "../icon/types";
import { useT9n } from "../../controllers/useT9n";
import type { Stepper } from "../stepper/stepper";
import { isHidden } from "../../utils/component";
import { useSetFocus } from "../../controllers/useSetFocus";
import { slotChangeHasContent } from "../../utils/dom";
import { useInteractive } from "../../controllers/useInteractive";
import { CSS, ICONS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./stepper-item.scss";
import { isActivationKey } from "../../utils/key";

declare global {
  interface DeclareElements {
    "calcite-stepper-item": StepperItem;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the component's background-color when active.
     */
    "--calcite-stepper-item-background-color-press": "*";
    /**
     * Specifies the component's header text color.
     */
    "--calcite-stepper-item-header-text-color": "*";
    /**
     * Specifies the component's header text color when hovered or focused.
     */
    "--calcite-stepper-item-header-text-color-hover": "*";
    /**
     * When `selected`, specifies the component's header text color.
     */
    "--calcite-stepper-item-selected-header-text-color": "*";
    /**
     * Specifies the component's icon color.
     */
    "--calcite-stepper-item-icon-color": "*";
    /**
     * When `complete`, specifies the component's icon color.
     */
    "--calcite-stepper-item-complete-icon-color": "*";
    /**
     * When `error`, specifies the component's icon and number color.
     */
    "--calcite-stepper-item-error-icon-color": "*";
    /**
     * When `selected`, specifies the component's icon and number color.
     */
    "--calcite-stepper-item-selected-icon-color": "*";
    /**
     * Specifies the component's description and number text color.
     */
    "--calcite-stepper-item-description-text-color": "*";
    /**
     * When `selected`, hovered, or focused, specifies the component's description text color.
     */
    "--calcite-stepper-item-description-text-color-hover": "*";
    /**
     * Specifies the component's bottom spacing.
     */
    "--calcite-stepper-bar-gap": "*";
    /**
     * Specifies the component's fill color.
     */
    "--calcite-stepper-bar-fill-color": "*";
    /**
     * Specifies the component's fill color when hovered or focused.
     */
    "--calcite-stepper-bar-fill-color-hover": "*";
    /**
     * When `complete`, specifies the component's fill color.
     */
    "--calcite-stepper-bar-complete-fill-color": "*";
    /**
     * When `complete`, specifies the component's fill color when hovered or focused.
     */
    "--calcite-stepper-bar-complete-fill-color-hover": "*";
    /**
     * When `error`, specifies the component's fill color.
     */
    "--calcite-stepper-bar-error-fill-color": "*";
    /**
     * When `error`, specifies the component's fill color when hovered or focused.
     */
    "--calcite-stepper-bar-error-fill-color-hover": "*";
    /**
     * When `selected`, specifies the component's fill color.
     */
    "--calcite-stepper-bar-selected-fill-color": "*";
  }
}

interface StepperItemSlots {
  /**
   * A slot for adding custom content.
   */
  "": Node[];
}

export class StepperItem extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  override ["@slots"]!: StepperItemSlots;

  private headerRef = createRef<HTMLDivElement>();

  /** position within parent */
  private itemPosition = 0;

  /** the parent stepper component */
  private parentStepperEl?: Stepper["el"];

  /** the latest requested item position */
  private selectedPosition = 0;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region State Properties

  @state() stepperItemHasContent = false;

  //#endregion

  //#region Public Properties

  /** When `true`, completes the step. */
  @property({ reflect: true }) complete = false;

  /** @copyDoc */
  @property() description?: string;

  /** When `true`, prevents interaction and decreases the component's opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, the component contains an error that requires resolution from the user. */
  @property({ reflect: true }) error = false;

  /** @copyDoc */
  @property() heading?: string;

  /**
   * When `true`, displays a status icon in the `calcite-stepper-item` heading inherited from parent `calcite-stepper`.
   *
   * @private
   */
  @property() icon = false;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /**
   * When `true`, the item will be hidden.
   *
   * @private
   *  */
  @property({ reflect: true }) itemHidden = false;

  /**
   * Specifies the layout of the `calcite-stepper-item` inherited from parent `calcite-stepper`, defaults to `horizontal`.
   *
   * @private
   */
  @property({ reflect: true }) layout!: StepperLayout;

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * When `true`, displays the step number in the `calcite-stepper-item` heading inherited from parent `calcite-stepper`.
   *
   * @private
   */
  @property() numbered = false;

  /** @private */
  @property() numberingSystem?: NumberingSystem;

  /**
   * Specifies the size of the component inherited from the `calcite-stepper`, defaults to `m`.
   *
   * @private
   */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, the component is selected. */
  @property({ reflect: true }) selected = false;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(
      () => (this.layout === "vertical" ? this.el : this.headerRef.value),
      options,
    );
  }

  //#endregion

  //#region Events

  /** @private */
  calciteInternalStepperItemSelect = createEvent<StepperItemEventDetail>({ cancelable: false });

  /** @private */
  calciteInternalStepperItemUpdate = createEvent<void>({ cancelable: false });

  /** Fires when the active `calcite-stepper-item` changes. */
  calciteStepperItemSelect = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

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

    if (this.selected) {
      this.emitRequestedItem();
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("selected") && (this.hasUpdated || this.selected !== false)) {
      this.selectedHandler();
    }

    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      this.calciteInternalStepperItemUpdate.emit();
    }

    if (changes.has("messages")) {
      this.effectiveLocaleWatcher(this.messages._lang);
    }
  }

  override updated(): void {
    setAttribute(this.el, "tabindex", this.disabled || this.layout === "horizontal" ? null : 0);
  }

  //#endregion

  //#region Private Methods

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
      event.composedPath().includes(this.parentStepperEl!)
    ) {
      this.selectedPosition = event.detail.position;
      this.determineSelectedItem();
    }
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (!this.disabled && event.target === this.el && isActivationKey(event.key)) {
      this.emitUserRequestedItem();
      event.preventDefault();
    }
  }

  private determineSelectedItem(): void {
    this.selected = !this.disabled && this.itemPosition === this.selectedPosition;
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
    const stepperItems = this.parentStepperEl?.querySelectorAll<StepperItem["el"]>(
      "calcite-stepper-item:not([hidden]):not([item-hidden])",
    );

    return stepperItems ? Array.from(stepperItems).indexOf(this.el) : -1;
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaCurrent = this.selected ? "step" : "false";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */

    return (
      <this.interactiveContainer disabled={this.disabled}>
        <div class={CSS.container}>
          {this.complete && (
            <span ariaLive="polite" class={CSS.visuallyHidden}>
              {this.messages.complete}
            </span>
          )}
          <div
            class={CSS.stepperItemHeader}
            ref={this.headerRef}
            tabIndex={
              // additional tab index logic needed because of display: contents for horizontal layout
              this.layout === "horizontal" && !this.disabled ? 0 : undefined
            }
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
          <div
            class={{
              [CSS.stepperItemContent]: true,
              [CSS.hasSlottedContent]: this.stepperItemHasContent,
            }}
          >
            <slot
              onSlotChange={(event) => (this.stepperItemHasContent = slotChangeHasContent(event))}
            />
          </div>
        </div>
      </this.interactiveContainer>
    );
  }

  private renderIcon(): JsxNode {
    let path: IconName = ICONS.circle;

    if (this.selected && (this.layout !== "horizontal-single" || (!this.error && !this.complete))) {
      path = ICONS.circleF;
    } else if (this.error) {
      path = ICONS.exclamationMarkCircleF;
    } else if (this.complete) {
      path = ICONS.checkCircleF;
    }

    return (
      <calcite-icon class={CSS.stepperItemIcon} flipRtl={this.iconFlipRtl} icon={path} scale="s" />
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

  //#endregion
}
