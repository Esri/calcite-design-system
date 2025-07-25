import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  state,
  JsxNode,
  Fragment,
} from "@arcgis/lumina";
import Color, { ColorInstance } from "color";
import { getModeName, slotChangeHasAssignedElement } from "../../utils/dom";
import { Scale, SelectionMode } from "../interfaces";
import { componentFocusable } from "../../utils/component";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import type { SwatchGroup } from "../swatch-group/swatch-group";
import { hexify } from "../color-picker/utils";
import { COLORS, CHECKER_DIMENSIONS } from "../color-picker-swatch/resources";
import { CSS, SLOTS, IDS } from "./resources";
import { styles } from "./swatch.scss";

declare global {
  interface DeclareElements {
    "calcite-swatch": Swatch;
  }
}

export class Swatch extends LitElement implements InteractiveComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private internalColor: ColorInstance;

  private containerEl = createRef<HTMLDivElement>();

  //#endregion

  //#region State Properties

  @state() private hasImage = false;

  //#endregion

  //#region Public Properties

  /**
   * The color value.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   */
  @property() color: string | null;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * When true, enables the swatch to be focused, and allows the `calciteSwatchSelect` to emit.
   * This is set to `true` by a parent Swatch Group component.
   *
   * @private
   */
  @property() interactive = false;

  /**
   * Accessible name for the component.
   *
   * @required
   */
  @property() label: string;

  /** @private */
  @property() parentSwatchGroup: SwatchGroup["el"];

  /** Specifies the size of the component. When contained in a parent `calcite-swatch-group` inherits the parent's `scale` value. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, the component is selected. */
  @property({ reflect: true }) selected = false;

  /**
   * This internal property, managed by a containing `calcite-swatch-group`, is
   * conditionally set based on the `selectionMode` of the parent
   *
   * @private
   */
  @property() selectionMode: Extract<
    "multiple" | "single" | "single-persist" | "none",
    SelectionMode
  > = "none";

  /** The component's value. */
  @property() value: any;

  //#endregion

  //#region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    if (!this.disabled && this.interactive) {
      this.containerEl.value?.focus();
    }
  }

  //#endregion

  //#region Events

  /** @private */
  calciteInternalSwatchKeyEvent = createEvent<KeyboardEvent>({ cancelable: false });

  /** @private */
  calciteInternalSwatchSelect = createEvent({ cancelable: false });

  /** @private */
  calciteInternalSyncSelectedSwatches = createEvent({ cancelable: false });

  /** Fires when the selected state of the component changes. */
  calciteSwatchSelect = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.keyDownHandler);
  }

  async load(): Promise<void> {
    this.handleColorChange(this.color);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("selected") && this.hasUpdated) {
      this.watchSelected(this.selected);
    }
    if (changes.has("color")) {
      this.handleColorChange(this.color);
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    if (this.selectionMode !== "none" && this.interactive && this.selected) {
      this.handleSelectionPropertyChange(this.selected);
    }
  }

  //#endregion

  //#region Private Methods

  private watchSelected(selected: boolean): void {
    if (this.selectionMode === "none") {
      return;
    }
    this.handleSelectionPropertyChange(selected);
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (event.target === this.el) {
      switch (event.key) {
        case " ":
        case "Enter":
          this.handleEmittingEvent();
          event.preventDefault();
          break;
        case "ArrowRight":
        case "ArrowLeft":
        case "Home":
        case "End":
          this.calciteInternalSwatchKeyEvent.emit(event);
          event.preventDefault();
          break;
      }
    }
  }

  private handleSlotImageChange(event: Event): void {
    this.hasImage = slotChangeHasAssignedElement(event);
  }

  private handleEmittingEvent(): void {
    if (this.interactive) {
      this.calciteSwatchSelect.emit();
    }
  }

  private handleSelectionPropertyChange(selected: boolean): void {
    if (this.selectionMode === "single") {
      this.calciteInternalSyncSelectedSwatches.emit();
    }
    const selectedInParent = this.parentSwatchGroup.selectedItems.includes(this.el);

    if (!selectedInParent && selected && this.selectionMode !== "multiple") {
      this.calciteInternalSwatchSelect.emit();
    }
    if (this.selectionMode !== "single") {
      this.calciteInternalSyncSelectedSwatches.emit();
    }
  }

  private handleColorChange(color: string | null): void {
    this.internalColor = color ? Color(color) : null;
  }

  private getFormattedColor(): JsxNode {
    const { internalColor } = this;

    const alpha = internalColor.alpha();
    //  const hex = hexify(internalColor);
    const hexa = hexify(internalColor, alpha < 1);
    // todo if hexa render opacity grid behind
    return hexa;
  }

  //#endregion

  //#region Rendering

  private renderSwatchImage(): JsxNode {
    return (
      <div class={CSS.imageContainer}>
        <slot name={SLOTS.image} onSlotChange={this.handleSlotImageChange} />
      </div>
    );
  }

  private renderEmptyDisplay(): JsxNode {
    const scale = this.scale === "s" ? "12" : this.scale === "m" ? "24" : "32";

    return (
      <div class={CSS.emptyContainer}>
        <svg
          fill="none"
          height={scale}
          viewBox={`0 0 ${scale} ${scale}`}
          width={scale}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={`M${scale} 0L0 ${scale}`} stroke="#D83020" stroke-width="3" />
        </svg>
      </div>
    );
  }

  private renderDisabledDisplay(): JsxNode {
    const scale = this.scale === "s" ? "12" : this.scale === "m" ? "16" : "20";
    return (
      <div class={CSS.disabledContainer}>
        <svg
          fill="none"
          height={scale}
          viewBox={`0 0 ${scale} ${scale}`}
          width={scale}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 0.5C10.5899 0.5 13.5 3.41015 13.5 7C13.5 10.5899 10.5899 13.5 7 13.5C3.41015 13.5 0.5 10.5899 0.5 7C0.5 3.41015 3.41015 0.5 7 0.5ZM4.78906 10.917C5.44221 11.2866 6.19529 11.5 7 11.5C9.48528 11.5 11.5 9.48528 11.5 7C11.5 6.19529 11.2866 5.44221 10.917 4.78906L4.78906 10.917ZM7 2.5C4.51472 2.5 2.5 4.51472 2.5 7C2.5 7.95644 2.79808 8.84235 3.30664 9.57129L9.57129 3.30664C8.84235 2.79808 7.95644 2.5 7 2.5Z"
            fill="white"
            stroke="#6A6A6A"
          />
        </svg>
      </div>
    );
  }

  private renderSwatch(): JsxNode {
    const { el, internalColor } = this;
    const borderRadius = "0";
    const theme = getModeName(el);
    const borderColor = theme === "light" ? COLORS.borderLight : COLORS.borderDark;
    const isEmpty = !internalColor;
    const commonSwatchProps = {
      height: "100%",
      rx: borderRadius,
      stroke: borderColor,
      strokeWidth: "2",
      width: "100%",
    };

    if (isEmpty) {
      return (
        <>
          <clipPath id={IDS.shape}>
            <rect height="100%" rx={borderRadius} width="100%" />
          </clipPath>
          {this.renderSwatchRect({
            clipPath: `inset(0 round ${borderRadius})`,
            ...commonSwatchProps,
          })}
          <line clip-path="url(#shape)" stroke-width="3" x1="100%" x2="0" y1="0" y2="100%" />
        </>
      );
    }

    const alpha = internalColor.alpha();
    const hex = hexify(internalColor);
    const hexa = hexify(internalColor, alpha < 1);

    return (
      <>
        <title>{hexa}</title>
        <defs>
          <pattern
            height={CHECKER_DIMENSIONS.size}
            id={IDS.checker}
            patternUnits="userSpaceOnUse"
            width={CHECKER_DIMENSIONS.size}
            x="0"
            y="0"
          >
            <rect
              class={CSS.checker}
              height={CHECKER_DIMENSIONS.squareSize}
              width={CHECKER_DIMENSIONS.squareSize}
              x="0"
              y="0"
            />
            <rect
              class={CSS.checker}
              height={CHECKER_DIMENSIONS.squareSize}
              width={CHECKER_DIMENSIONS.squareSize}
              x={CHECKER_DIMENSIONS.squareSize}
              y={CHECKER_DIMENSIONS.squareSize}
            />
          </pattern>
        </defs>
        {this.renderSwatchRect({
          fill: "url(#checker)",
          rx: commonSwatchProps.rx,
          height: commonSwatchProps.height,
          width: commonSwatchProps.width,
        })}
        {this.renderSwatchRect({
          clipPath: alpha < 1 ? "polygon(100% 0, 0 0, 0 100%)" : `inset(0 round ${borderRadius})`,
          fill: hex,
          ...commonSwatchProps,
        })}
        {alpha < 1
          ? this.renderSwatchRect({
              clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
              fill: hexa,
              key: "opacity-fill",
              ...commonSwatchProps,
            })
          : null}
      </>
    );
  }

  private renderSwatchRect({
    clipPath,
    fill,
    height,
    key,
    rx,
    stroke,
    strokeWidth,
    width,
  }: {
    clipPath?: string;
    fill?: string;
    height: string;
    key?: string;
    rx: string;

    // note: stroke-width and clip-path are needed to hide overflowing portion of stroke
    // @see https://stackoverflow.com/a/7273346/194216
    stroke?: string;
    strokeWidth?: string;

    width: string;
  }): JsxNode {
    return (
      <rect
        clip-path={clipPath}
        fill={fill}
        height={height}
        key={key}
        rx={rx}
        stroke={stroke}
        stroke-width={strokeWidth}
        width={width}
      />
    );
  }

  override render(): JsxNode {
    const { disabled } = this;
    const disableInteraction = disabled || (!disabled && !this.interactive);
    const role =
      this.selectionMode === "multiple" && this.interactive
        ? "checkbox"
        : this.selectionMode !== "none" && this.interactive
          ? "radio"
          : this.interactive
            ? "button"
            : "presentation";

    const isEmpty = !this.internalColor;

    const classes = {
      [CSS.swatch]: true,
      [CSS.noColorSwatch]: isEmpty || (this.hasImage && !this.internalColor),
    };

    return (
      <InteractiveContainer disabled={disabled}>
        <div
          ariaChecked={
            this.selectionMode !== "none" && this.interactive ? this.selected : undefined
          }
          ariaLabel={this.label}
          class={{
            [CSS.container]: true,
            [CSS.selectable]: this.selectionMode !== "none",
            [CSS.selected]: this.selected,
            [CSS.nonInteractive]: !this.interactive,
          }}
          onClick={this.handleEmittingEvent}
          ref={this.containerEl}
          role={role}
          tabIndex={disableInteraction ? -1 : 0}
        >
          {this.renderSwatchImage()}
          {!this.internalColor && !this.hasImage && this.renderEmptyDisplay()}
          {this.disabled && this.renderDisabledDisplay()}
          <svg class={classes} role="presentation" xmlns="http://www.w3.org/2000/svg">
            {this.renderSwatch()}
          </svg>
        </div>
      </InteractiveContainer>
    );
  }

  //#endregion
}
