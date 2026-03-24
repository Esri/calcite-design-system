// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { focusElementInGroup, slotChangeGetAssignedElements } from "../../utils/dom";
import { Position, Scale } from "../interfaces";
import { createObserver } from "../../utils/observers";
import { guid } from "../../utils/guid";
import { NumberingSystem } from "../../utils/locale";
import { useT9n } from "../../controllers/useT9n";
import type { StepperItem } from "../stepper-item/stepper-item";
import type { Action } from "../action/action";
import { CSS, ICONS, IDS } from "./resources";
import { StepBar } from "./functional/step-bar";
import {
  StepperItemChangeEventDetail,
  StepperItemKeyEventDetail,
  StepperLayout,
} from "./interfaces";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./stepper.scss";

declare global {
  interface DeclareElements {
    "calcite-stepper": Stepper;
  }
}

/** @slot - A slot for adding `calcite-stepper-item`s. */
export class Stepper extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private containerRef = createRef<HTMLDivElement>();

  private visibleItems: StepperItem["el"][] = [];

  private focusableItems: StepperItem["el"][] = [];

  private guid = guid();

  private items: StepperItem["el"][] = [];

  /** Specifies if the user is viewing one `stepper-item` at a time when the page width is less than sum of min-width of each item. */
  private multipleViewMode = false;

  private mutationObserver = createObserver("mutation", () => this.updateItems());

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  //#endregion

  //#region State Properties

  @state() currentActivePosition: number;

  //#endregion

  //#region Public Properties

  /** When `true`, displays a status icon in the `calcite-stepper-item` heading. */
  @property({ reflect: true }) icon = false;

  /** Defines the component's layout. */
  @property({ reflect: true }) layout: StepperLayout = "horizontal";

  /** Overrides individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** When `true`, displays the step number in the `calcite-stepper-item` heading. */
  @property({ reflect: true }) numbered = false;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property({ reflect: true }) numberingSystem?: NumberingSystem;

  /** Specifies the component's size. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the component's selected item.
   *
   * @readonly
   */
  @property() selectedItem: StepperItem["el"] = null;

  //#endregion

  //#region Public Methods

  /** Set the last `calcite-stepper-item` as active. */
  @method()
  async endStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(this.visibleItems.length - 1, "previous");

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
  @method()
  async goToStep(step: number): Promise<void> {
    const position = step - 1;

    if (this.currentActivePosition !== position) {
      this.updateStep(position);
    }
  }

  /** Set the next `calcite-stepper-item` as active. */
  @method()
  async nextStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(this.currentActivePosition + 1, "next");

    if (typeof enabledStepIndex !== "number") {
      return;
    }

    this.updateStep(enabledStepIndex);
  }

  /** Set the previous `calcite-stepper-item` as active. */
  @method()
  async prevStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(this.currentActivePosition - 1, "previous");

    if (typeof enabledStepIndex !== "number") {
      return;
    }

    this.updateStep(enabledStepIndex);
  }

  /** Set the first `calcite-stepper-item` as active. */
  @method()
  async startStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(0, "next");

    if (typeof enabledStepIndex !== "number") {
      return;
    }

    this.updateStep(enabledStepIndex);
  }

  //#endregion

  //#region Events

  /**
   * Fires when the active `calcite-stepper-item` changes.
   *
   * @private
   */
  calciteInternalStepperItemChange = createEvent<StepperItemChangeEventDetail>({
    cancelable: false,
  });

  /** Fires when the active `calcite-stepper-item` changes. */
  calciteStepperChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalStepperItemKeyEvent", this.calciteInternalStepperItemKeyEvent);
    this.listen("calciteInternalStepperItemUpdate", (event: Event): void => {
      event.stopPropagation();
      this.updateItems();
    });
    this.listen("calciteInternalStepperItemSelect", this.updateItem);
    this.listen("calciteStepperItemSelect", this.handleItemSelect);
  }

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true });
    this.updateItems();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("layout") && (this.hasUpdated || this.layout !== "horizontal")) ||
      (changes.has("icon") && (this.hasUpdated || this.icon !== false)) ||
      (changes.has("numbered") && (this.hasUpdated || this.numbered !== false)) ||
      (changes.has("scale") && (this.hasUpdated || this.scale !== "m")) ||
      (changes.has("numberingSystem") && (this.hasUpdated || this.numberingSystem !== undefined))
    ) {
      this.updateItems();
    }

    if (changes.has("currentActivePosition")) {
      requestAnimationFrame((): void => {
        this.determineActiveStepper();
      });
    }
  }

  loaded(): void {
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

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private calciteInternalStepperItemKeyEvent(event: CustomEvent<StepperItemKeyEventDetail>): void {
    const item = event.detail.item;
    const itemToFocus = event.target as StepperItem["el"];

    switch (item.key) {
      case "ArrowDown":
      case "ArrowRight":
        focusElementInGroup(this.focusableItems, itemToFocus, "next");
        break;
      case "ArrowUp":
      case "ArrowLeft":
        focusElementInGroup(this.focusableItems, itemToFocus, "previous");
        break;
      case "Home":
        focusElementInGroup(this.focusableItems, itemToFocus, "first");
        break;
      case "End":
        focusElementInGroup(this.focusableItems, itemToFocus, "last");
        break;
    }
    event.stopPropagation();
  }

  private updateItem(event: CustomEvent): void {
    const { position } = event.detail;
    if (typeof position === "number") {
      this.currentActivePosition = position;
      this.selectedItem = event.target as StepperItem["el"];
    }

    this.calciteInternalStepperItemChange.emit({
      position,
    });
  }

  private handleItemSelect(): void {
    this.emitItemSelect();
  }

  private emitItemSelect(): void {
    this.calciteStepperChange.emit();
  }

  private updateItems(): void {
    this.visibleItems = this.items.filter((item) => !item.hidden);
    this.determineActiveStepper();
    this.focusableItems = this.visibleItems.filter((item) => !item.disabled && !item.itemHidden);
    this.items.forEach((item) => {
      item.icon = this.icon;
      item.numbered = this.numbered;
      item.layout = this.layout;
      item.scale = this.scale;
      item.numberingSystem = this.numberingSystem;
    });
  }

  private determineActiveStepper(): void {
    const { visibleItems } = this;

    if (visibleItems.length < 2) {
      return;
    }

    const { currentActivePosition, layout } = this;

    this.multipleViewMode = layout !== "horizontal-single";
    visibleItems.forEach((item, index) => {
      item.itemHidden = layout === "horizontal-single" && index !== (currentActivePosition || 0);
    });
  }

  private getEnabledStepIndex(
    startIndex: number,
    direction: "next" | "previous" = "next",
  ): number | null {
    const { visibleItems, currentActivePosition } = this;

    let newIndex = startIndex;
    while (newIndex >= 0 && newIndex < visibleItems.length && visibleItems[newIndex]?.disabled) {
      newIndex = newIndex + (direction === "previous" ? -1 : 1);
    }

    return newIndex !== currentActivePosition && newIndex < visibleItems.length && newIndex >= 0
      ? newIndex
      : null;
  }

  private updateStep(position: number): void {
    this.currentActivePosition = position;
    this.calciteInternalStepperItemChange.emit({
      position,
    });
  }

  private handleActionClick(event: MouseEvent): void {
    const currentActivePosition = this.currentActivePosition;
    const target = event.target as Action["el"];
    if (target.getAttribute("data-position") === "start") {
      this.prevStep();
    } else {
      this.nextStep();
    }

    if (
      typeof this.currentActivePosition === "number" &&
      currentActivePosition !== this.currentActivePosition &&
      this.visibleItems[this.currentActivePosition] &&
      !this.visibleItems[this.currentActivePosition].disabled
    ) {
      this.emitItemSelect();
    }
  }

  private getFirstEnabledStepperPosition(): number {
    const enabledStepIndex = this.visibleItems.findIndex((item) => !item.disabled);

    if (enabledStepIndex > -1) {
      return enabledStepIndex;
    }
    return 0;
  }

  private handleDefaultSlotChange(event: Event): void {
    const items = slotChangeGetAssignedElements(event).filter(
      (el): el is StepperItem["el"] => el?.tagName === "CALCITE-STEPPER-ITEM",
    );
    this.items = items;
    this.updateItems();
    const spacing = Array(this.visibleItems.length).fill("1fr").join(" ");
    this.containerRef.value.style.gridTemplateAreas = spacing;
    this.containerRef.value.style.gridTemplateColumns = spacing;
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLabel = this.messages.label;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "region";
    return (
      <div
        class={{ container: true, [CSS.singleView]: this.layout === "horizontal-single" }}
        ref={this.containerRef}
      >
        {this.layout === "horizontal-single" && (
          <div class={{ [CSS.stepBarContainer]: true }}>
            {this.visibleItems.map((item, index) => (
              <StepBar
                active={index === this.currentActivePosition}
                complete={item.complete && index !== this.currentActivePosition && !item.error}
                disabled={item.disabled && index !== this.currentActivePosition}
                error={item.error && index !== this.currentActivePosition}
              />
            ))}
          </div>
        )}
        {this.layout === "horizontal-single" && (
          <div class={{ [CSS.actionContainer]: true }}>
            {this.renderAction("start")}
            {this.renderAction("end")}
          </div>
        )}
        <slot onSlotChange={this.handleDefaultSlotChange} />
      </div>
    );
  }

  private renderAction(position: Position): JsxNode {
    const isPositionStart = position === "start";
    const path = isPositionStart ? ICONS.chevronLeft : ICONS.chevronRight;
    const { currentActivePosition, multipleViewMode, layout } = this;
    const id = IDS.position(this.guid, isPositionStart);
    const offset = isPositionStart ? -1 : 1;
    const direction = isPositionStart ? "previous" : "next";
    const disabled = this.getEnabledStepIndex(currentActivePosition + offset, direction) === null;

    return layout === "horizontal-single" && !multipleViewMode ? (
      <calcite-action
        alignment="center"
        class={{
          [CSS.actionIcon]: true,
        }}
        compact={true}
        data-position={position}
        disabled={disabled}
        icon={path}
        iconFlipRtl={true}
        id={id}
        onClick={this.handleActionClick}
        scale={this.scale}
        text={isPositionStart ? this.messages.previousStep : this.messages.nextStep}
      />
    ) : null;
  }

  //#endregion
}
