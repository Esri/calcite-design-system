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
  readTask,
} from "@stencil/core";
import { focusElementInGroup, slotChangeGetAssignedElements } from "../../utils/dom";
import { Position, Scale } from "../interfaces";
import {
  StepperItemChangeEventDetail,
  StepperItemKeyEventDetail,
  StepperLayout,
} from "./interfaces";
import { createObserver } from "../../utils/observers";
import { StepBar } from "./functional/step-bar";
import { ITEM_MIN_WIDTH, CSS } from "./resources";
import { guid } from "../../utils/guid";

import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
} from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { StepperMessages } from "./assets/stepper/t9n";

/**
 * @slot - A slot for adding `calcite-stepper-item` elements.
 */
@Component({
  tag: "calcite-stepper",
  styleUrl: "stepper.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Stepper implements LocalizedComponent, T9nComponent {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, displays a status icon in the `calcite-stepper-item` heading. */
  @Prop({ reflect: true }) icon = false;

  /** Defines the layout of the component. */
  @Prop({ reflect: true }) layout: StepperLayout = "horizontal";

  /** When `true`, displays the step number in the `calcite-stepper-item` heading. */
  @Prop({ reflect: true }) numbered = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Watch("icon")
  @Watch("layout")
  @Watch("numbered")
  @Watch("scale")
  handleItemPropChange(): void {
    this.updateItems();
  }

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: StepperMessages;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop({ reflect: true }) numberingSystem?: NumberingSystem;

  @Watch("numberingSystem")
  numberingSystemChange(): void {
    this.setStepperItemNumberingSystem();
  }

  /**
   * Specifies the component's selected item.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItem: HTMLCalciteStepperItemElement = null;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<StepperMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the active `calcite-stepper-item` changes.
   *
   */
  @Event({ cancelable: false }) calciteStepperItemChange: EventEmitter<void>;

  /**
   * Fires when the active `calcite-stepper-item` changes.
   *
   * @internal
   */
  @Event({ cancelable: false })
  calciteInternalStepperItemChange: EventEmitter<StepperItemChangeEventDetail>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true });
    this.updateItems();
    connectMessages(this);
    connectLocalized(this);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    this.resizeObserver?.observe(this.containerEl);
    // if no stepper items are set as active, default to the first one
    if (typeof this.currentActivePosition !== "number") {
      const enabledStepIndex = this.getFirstEnabledStepperPosition();

      if (enabledStepIndex === 0) {
        this.currentActivePosition = enabledStepIndex;
      }

      this.calciteInternalStepperItemChange.emit({
        position: enabledStepIndex,
      });
    }
  }

  disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
    disconnectMessages(this);
    disconnectLocalized(this);
    this.mutationObserver?.disconnect();
  }

  render(): VNode {
    return (
      <Host aria-label={this.messages.label} role="region">
        <div
          class={{ container: true, [CSS.singleView]: !this.multipleViewMode }}
          ref={this.setContainerEl}
        >
          {!this.multipleViewMode && this.layout === "horizontal" && (
            <div class={{ [CSS.stepBarContainer]: true }}>
              {this.items.map((item, index) => (
                <StepBar
                  active={index === this.currentActivePosition}
                  complete={item.complete && index !== this.currentActivePosition && !item.error}
                  disabled={item.disabled && index !== this.currentActivePosition}
                  error={item.error && index !== this.currentActivePosition}
                  key={index}
                />
              ))}
            </div>
          )}
          <div class={{ [CSS.actionContainer]: true }}>
            {this.renderAction("start")}
            {this.renderAction("end")}
          </div>
          <slot onSlotchange={this.handleDefaultSlotChange} />
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalStepperItemKeyEvent")
  calciteInternalStepperItemKeyEvent(event: CustomEvent<StepperItemKeyEventDetail>): void {
    const item = event.detail.item;
    const itemToFocus = event.target as HTMLCalciteStepperItemElement;

    switch (item.key) {
      case "ArrowDown":
      case "ArrowRight":
        focusElementInGroup(this.enabledItems, itemToFocus, "next");
        break;
      case "ArrowUp":
      case "ArrowLeft":
        focusElementInGroup(this.enabledItems, itemToFocus, "previous");
        break;
      case "Home":
        focusElementInGroup(this.enabledItems, itemToFocus, "first");
        break;
      case "End":
        focusElementInGroup(this.enabledItems, itemToFocus, "last");
        break;
    }
    event.stopPropagation();
  }

  @Listen("calciteInternalStepperItemRegister")
  registerItem(event: CustomEvent): void {
    const item = event.target as HTMLCalciteStepperItemElement;
    const { content, position } = event.detail;

    this.itemMap.set(item, { position, content });
    this.enabledItems = this.filterItems();
    event.stopPropagation();
  }

  @Listen("calciteInternalStepperItemSelect")
  updateItem(event: CustomEvent): void {
    const { position } = event.detail;
    if (typeof position === "number") {
      this.currentActivePosition = position;
      this.selectedItem = event.target as HTMLCalciteStepperItemElement;
    }

    this.calciteInternalStepperItemChange.emit({
      position,
    });
  }

  @Listen("calciteInternalUserRequestedStepperItemSelect")
  handleUserRequestedStepperItemSelect(): void {
    this.calciteStepperItemChange.emit();
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Set the next `calcite-stepper-item` as active. */
  @Method()
  async nextStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(this.currentActivePosition + 1, "next");

    if (typeof enabledStepIndex !== "number") {
      return;
    }

    this.updateStep(enabledStepIndex);
  }

  /** Set the previous `calcite-stepper-item` as active. */
  @Method()
  async prevStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(this.currentActivePosition - 1, "previous");

    if (typeof enabledStepIndex !== "number") {
      return;
    }

    this.updateStep(enabledStepIndex);
  }

  /**
   * Set a specified `calcite-stepper-item` as active.
   *
   * @param step
   */
  @Method()
  async goToStep(step: number): Promise<void> {
    const position = step - 1;

    if (this.currentActivePosition !== position) {
      this.updateStep(position);
    }
  }

  /** Set the first `calcite-stepper-item` as active. */
  @Method()
  async startStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(0, "next");

    if (typeof enabledStepIndex !== "number") {
      return;
    }

    this.updateStep(enabledStepIndex);
  }

  /** Set the last `calcite-stepper-item` as active. */
  @Method()
  async endStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(this.items.length - 1, "previous");

    if (typeof enabledStepIndex !== "number") {
      return;
    }

    this.updateStep(enabledStepIndex);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteStepperElement;

  @State() defaultMessages: StepperMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() currentActivePosition: number;

  @Watch("currentActivePosition")
  handlePositionChange(): void {
    readTask((): void => {
      this.determineActiveStepper(true);
    });
  }

  @State() elWidth: number;

  @Watch("elWidth")
  handleElWidthChange(): void {
    readTask((): void => {
      this.determineActiveStepper();
    });
  }

  private enabledItems: HTMLCalciteStepperItemElement[] = [];

  private itemMap = new Map<HTMLCalciteStepperItemElement, { position: number; content: Node[] }>();

  private items: HTMLCalciteStepperItemElement[] = [];

  private mutationObserver = createObserver("mutation", () => this.updateItems());

  /** Specifies if the user is viewing one `stepper-item` at a time when the page width is less than sum of min-width of each item. */
  private multipleViewMode = false;

  private guid = `calcite-stepper-action-${guid()}`;

  private containerEl: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private resizeObserver = createObserver(
    "resize",
    (entries) => (this.elWidth = entries[0].contentRect.width),
  );

  private updateItems(): void {
    this.el.querySelectorAll("calcite-stepper-item").forEach((item) => {
      item.icon = this.icon;
      item.numbered = this.numbered;
      item.layout = this.layout;
      item.scale = this.scale;
    });
  }

  private determineActiveStepper(currentActivePositionChanged = false): void {
    const totalItems = this.items.length;
    if (!this.elWidth || !totalItems || this.layout !== "horizontal" || totalItems === 1) {
      return;
    }

    const activePosition = this.currentActivePosition || 0;

    if (this.layout === "horizontal") {
      if (this.multipleViewMode && !currentActivePositionChanged) {
        return;
      }
      this.multipleViewMode = true;
      this.setGridTemplateColumns(this.items);
      this.items.forEach((item: HTMLCalciteStepperItemElement) => {
        item.hidden = false;
        item.multipleViewMode = true;
      });
    } else {
      this.multipleViewMode = false;
      this.items.forEach((item: HTMLCalciteStepperItemElement, index) => {
        if (index !== activePosition) {
          item.hidden = true;
        } else {
          item.hidden = false;
          item.multipleViewMode = false;
        }
      });
    }
  }

  private getEnabledStepIndex(
    startIndex: number,
    direction: "next" | "previous" = "next",
  ): number | null {
    const { items, currentActivePosition } = this;

    let newIndex = startIndex;

    while (items[newIndex]?.disabled && this.multipleViewMode) {
      newIndex = newIndex + (direction === "previous" ? -1 : 1);
    }

    return newIndex !== currentActivePosition && newIndex < items.length && newIndex >= 0
      ? newIndex
      : null;
  }

  private updateStep(position: number): void {
    this.currentActivePosition = position;
    this.calciteInternalStepperItemChange.emit({
      position,
    });
  }

  private filterItems(): HTMLCalciteStepperItemElement[] {
    return this.items.filter((item) => !item.disabled);
  }

  private setStepperItemNumberingSystem(): void {
    this.items.forEach((item: HTMLCalciteStepperItemElement) => {
      item.numberingSystem = this.numberingSystem;
    });
  }

  private renderAction(position: Position): VNode {
    const isPositionStart = position === "start";
    const path = isPositionStart ? "chevron-left" : "chevron-right";
    const { currentActivePosition, multipleViewMode, layout } = this;
    const totalItems = this.items.length;
    const id = `${this.guid}-${isPositionStart ? "start" : "end"}`;

    return layout === "horizontal" && !multipleViewMode ? (
      <calcite-action
        alignment="center"
        appearance="transparent"
        class={{
          [CSS.actionIcon]: true,
        }}
        compact={true}
        data-position={position}
        disabled={
          (currentActivePosition === 0 && isPositionStart) ||
          (currentActivePosition === totalItems - 1 && !isPositionStart)
        }
        icon={path}
        iconFlipRtl={true}
        id={id}
        onClick={this.handleActionClick}
        scale={this.scale}
        text={isPositionStart ? this.messages.previousStep : this.messages.nextStep}
      />
    ) : null;
  }

  private handleActionClick = (event: MouseEvent): void => {
    const currentActivePosition = this.currentActivePosition;
    const target = event.target as HTMLCalciteActionElement;
    if (target.getAttribute("data-position") === "start") {
      this.prevStep();
    } else {
      this.nextStep();
    }

    if (
      typeof this.currentActivePosition === "number" &&
      currentActivePosition !== this.currentActivePosition &&
      !this.items[this.currentActivePosition].disabled
    ) {
      this.calciteStepperItemChange.emit();
    }
  };

  private getFirstEnabledStepperPosition(): number {
    const enabledStepIndex = this.items.findIndex((item) => !item.disabled);

    if (enabledStepIndex > -1) {
      return enabledStepIndex;
    }

    return 0;
  }

  private setContainerEl = (el: HTMLDivElement): void => {
    this.containerEl = el;
  };

  handleDefaultSlotChange = (event: Event): void => {
    const items = slotChangeGetAssignedElements(event).filter(
      (el) => el?.tagName === "CALCITE-STEPPER-ITEM",
    );
    this.items = items as HTMLCalciteStepperItemElement[];
    this.setGridTemplateColumns(items);
    this.setStepperItemNumberingSystem();
  };

  private setGridTemplateColumns(items: Element[]): void {
    const minWidth = this.getMinWidthOfStepperItem();
    const spacing = Array(items.length).fill(`minmax(${minWidth}px, 1fr)`).join(" ");
    this.containerEl.style.gridTemplateAreas = spacing;
    this.containerEl.style.gridTemplateColumns = spacing;
  }

  private getMinWidthOfStepperItem(): number {
    return ITEM_MIN_WIDTH[this.scale];
  }
}
