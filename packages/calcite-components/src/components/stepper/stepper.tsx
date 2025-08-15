// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { createRef } from "lit-html/directives/ref.js";
import { focusElementInGroup, slotChangeGetAssignedElements } from "../../utils/dom";
import { Position, Scale } from "../interfaces";
import { createObserver } from "../../utils/observers";
import { guid } from "../../utils/guid";
import { NumberingSystem } from "../../utils/locale";
import { useT9n } from "../../controllers/useT9n";
import type { StepperItem } from "../stepper-item/stepper-item";
import type { Action } from "../action/action";
import { isHidden } from "../../utils/component";
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

/** @slot - A slot for adding `calcite-stepper-item` elements. */
export class Stepper extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private containerEl = createRef<HTMLDivElement>();

  private enabledItems: StepperItem["el"][] = [];

  private guid = guid();

  private itemMap = new Map<StepperItem["el"], { position: number; content: Node[] }>();

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

  /** Defines the layout of the component. */
  @property({ reflect: true }) layout: StepperLayout = "horizontal";

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** When `true`, displays the step number in the `calcite-stepper-item` heading. */
  @property({ reflect: true }) numbered = false;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property({ reflect: true }) numberingSystem?: NumberingSystem;

  /** Specifies the size of the component. */
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
    const enabledStepIndex = this.getEnabledStepIndex(this.items.length - 1, "previous");

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

  /**
   * Fires when the active `calcite-stepper-item` changes.
   *
   * @deprecated use `calciteStepperChange` instead or `calciteStepperItemChange` on items instead.
   */
  calciteStepperItemChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalStepperItemKeyEvent", this.calciteInternalStepperItemKeyEvent);
    this.listen("calciteInternalStepperItemRegister", this.registerItem);
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
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("icon") && (this.hasUpdated || this.icon !== false)) ||
      (changes.has("layout") && (this.hasUpdated || this.layout !== "horizontal")) ||
      (changes.has("numbered") && (this.hasUpdated || this.numbered !== false)) ||
      (changes.has("scale") && (this.hasUpdated || this.scale !== "m"))
    ) {
      this.updateItems();
      this.determineActiveStepper();
    }

    if (changes.has("numberingSystem")) {
      this.setStepperItemNumberingSystem();
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

  private registerItem(event: CustomEvent): void {
    const item = event.target as StepperItem["el"];
    const { content, position } = event.detail;

    this.itemMap.set(item, { position, content });
    this.enabledItems = this.filterItems();
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
    this.calciteStepperItemChange.emit();
    this.calciteStepperChange.emit();
  }

  private updateItems(): void {
    this.el.querySelectorAll("calcite-stepper-item").forEach((item) => {
      item.icon = this.icon;
      item.numbered = this.numbered;
      item.layout = this.layout;
      item.scale = this.scale;
    });
  }

  private determineActiveStepper(): void {
    const { items } = this;

    if (items.length < 2) {
      return;
    }

    const { currentActivePosition, layout } = this;

    this.multipleViewMode = layout !== "horizontal-single";
    items.forEach((item, index) => {
      item.itemHidden = layout === "horizontal-single" && index !== (currentActivePosition || 0);
    });
  }

  private getEnabledStepIndex(
    startIndex: number,
    direction: "next" | "previous" = "next",
  ): number | null {
    const { items, currentActivePosition } = this;

    let newIndex = startIndex;
    while (newIndex >= 0 && newIndex < items.length && items[newIndex]?.disabled) {
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

  private filterItems(): StepperItem["el"][] {
    return this.items.filter((item) => !item.disabled && !isHidden(item));
  }

  private setStepperItemNumberingSystem(): void {
    this.items.forEach((item: StepperItem["el"]) => {
      item.numberingSystem = this.numberingSystem;
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
      !this.items[this.currentActivePosition].disabled
    ) {
      this.emitItemSelect();
    }
  }

  private getFirstEnabledStepperPosition(): number {
    const enabledStepIndex = this.items.findIndex((item) => !item.disabled);

    if (enabledStepIndex > -1) {
      return enabledStepIndex;
    }
    return 0;
  }

  private handleDefaultSlotChange(event: Event): void {
    const items = slotChangeGetAssignedElements(event).filter(
      (el): el is StepperItem["el"] =>
        el?.tagName === "CALCITE-STEPPER-ITEM" && !isHidden(el as StepperItem["el"]),
    );
    this.items = items;
    const spacing = Array(items.length).fill("1fr").join(" ");
    if (this.containerEl.value) {
      this.containerEl.value.style.gridTemplateAreas = spacing;
      this.containerEl.value.style.gridTemplateColumns = spacing;
    }
    this.setStepperItemNumberingSystem();
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
        ref={this.containerEl}
      >
        {this.layout === "horizontal-single" && (
          <div class={{ [CSS.stepBarContainer]: true }}>
            {this.items.map((item, index) => (
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
        appearance="transparent"
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
