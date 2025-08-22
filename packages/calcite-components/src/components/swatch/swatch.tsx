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
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { Scale, SelectionMode } from "../interfaces";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { useSetFocus } from "../../controllers/useSetFocus";
import type { SwatchGroup } from "../swatch-group/swatch-group";
import { hexify } from "../color-picker/utils";
import { CSS, SLOTS, IDS, CHECKER_DIMENSIONS } from "./resources";
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

  private containerRef = createRef<HTMLDivElement>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region State Properties

  @state() private hasImage = false;

  //#endregion

  //#region Public Properties

  /**
   * Specifies the component's color
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   */
  @property() color: string;

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

  /**
   * Sets focus on the component.
   *
   * @param options
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.el;
    }, options);
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
    const scale = this.scale === "s" ? "12" : this.scale === "m" ? "16" : "20";

    return (
      <div class={CSS.internalSvgContainer}>
        <svg
          fill="none"
          height={scale}
          viewBox={`0 0 ${scale} ${scale}`}
          width={scale}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path class={CSS.internalSvgEmpty} d={`M${scale} 0L0 ${scale}`} />
        </svg>
      </div>
    );
  }

  private renderDisabledDisplay(): JsxNode {
    const svgSmMdPath = (
      <svg
        fill="none"
        height="14"
        viewBox="0 0 14 14"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class={CSS.internalSvgDisabled}
          d="M7 0.5C10.5899 0.5 13.5 3.41015 13.5 7C13.5 10.5899 10.5899 13.5 7 13.5C3.41015 13.5 0.5 10.5899 0.5 7C0.5 3.41015 3.41015 0.5 7 0.5ZM4.78906 10.917C5.44221 11.2866 6.19529 11.5 7 11.5C9.48528 11.5 11.5 9.48528 11.5 7C11.5 6.19529 11.2866 5.44221 10.917 4.78906L4.78906 10.917ZM7 2.5C4.51472 2.5 2.5 4.51472 2.5 7C2.5 7.95644 2.79808 8.84235 3.30664 9.57129L9.57129 3.30664C8.84235 2.79808 7.95644 2.5 7 2.5Z"
        />
      </svg>
    );

    const svgLgPath = (
      <svg
        fill="none"
        height="18"
        viewBox="0 0 18 18"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class={CSS.internalSvgDisabled}
          d="M9 0.5C13.6944 0.5 17.5 4.30558 17.5 9C17.5 13.6944 13.6944 17.5 9 17.5C4.30558 17.5 0.5 13.6944 0.5 9C0.5 4.30558 4.30558 0.5 9 0.5ZM5.78125 14.2588C6.71828 14.8337 7.81941 15.167 9 15.167C12.4058 15.167 15.167 12.4058 15.167 9C15.167 7.81941 14.8337 6.71828 14.2588 5.78125L5.78125 14.2588ZM9 2.83301C5.59424 2.83301 2.83301 5.59424 2.83301 9C2.83301 10.3817 3.28731 11.6565 4.05469 12.6846L12.6846 4.05469C11.6565 3.28731 10.3817 2.83301 9 2.83301Z"
        />
      </svg>
    );
    return (
      <div class={CSS.internalSvgContainer}>{this.scale === "l" ? svgLgPath : svgSmMdPath}</div>
    );
  }

  private renderSwatch(): JsxNode {
    const { internalColor } = this;
    const borderRadius = "0";
    const isEmpty = !internalColor;
    const commonSwatchProps = {
      height: "100%",
      rx: borderRadius,
      width: "100%",
    };

    if (isEmpty) {
      return (
        <>
          <clipPath id={IDS.shape}>
            <rect height="100%" rx={borderRadius} width="100%" />
          </clipPath>
          {this.renderSwatchRect({
            clipPath: `inset(0 round "${borderRadius}")`,
            ...commonSwatchProps,
          })}
          <line clip-path="url(#shape)" x1="100%" x2="0" y1="0" y2="100%" />
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
          clipPath: alpha < 1 ? "polygon(100% 0, 0 0, 0 100%)" : `inset(0 round "${borderRadius}")`,
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
        id={IDS.swatchRect}
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
          ariaLabel={role !== "presentation" ? this.label : ""}
          class={{
            [CSS.container]: true,
            [CSS.selectable]: this.selectionMode !== "none",
            [CSS.selected]: this.selected,
            [CSS.nonInteractive]: !this.interactive,
          }}
          onClick={this.handleEmittingEvent}
          ref={this.containerRef}
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
