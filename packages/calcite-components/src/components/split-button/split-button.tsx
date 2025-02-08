import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import { FlipPlacement, MenuPlacement, OverlayPositioning } from "../../utils/floating-ui";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { DropdownIconType } from "../button/interfaces";
import { Appearance, FlipContext, Kind, Scale, Width } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";
import { focusFirstTabbable } from "../../utils/dom";
import { CSS } from "./resources";
import { styles } from "./split-button.scss";

declare global {
  interface DeclareElements {
    "calcite-split-button": SplitButton;
  }
}

/** @slot - A slot for adding `calcite-dropdown` content. */
export class SplitButton extends LitElement implements InteractiveComponent, LoadableComponent {
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private get dropdownIcon(): string {
    return this.dropdownIconType === "chevron"
      ? "chevronDown"
      : this.dropdownIconType === "caret"
        ? "caretDown"
        : this.dropdownIconType === "ellipsis"
          ? "ellipsis"
          : "handle-vertical";
  }

  // #endregion

  // #region Public Properties

  /**
   * When `true`, the component is active.
   *
   * @private
   */
  @property({ reflect: true }) active = false;

  /** Specifies the appearance style of the component. */
  @property({ reflect: true }) appearance: Extract<
    "outline" | "outline-fill" | "solid" | "transparent",
    Appearance
  > = "solid";

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** Specifies the icon used for the dropdown menu. */
  @property({ reflect: true }) dropdownIconType: DropdownIconType = "chevron";

  /** Accessible name for the dropdown menu. */
  @property({ reflect: true }) dropdownLabel: string;

  /** Specifies the component's fallback slotted content `placement` when it's initial or specified `placement` has insufficient space available. */
  @property() flipPlacements: FlipPlacement[];

  /** Specifies the kind of the component, which will apply to border and background, if applicable. */
  @property({ reflect: true }) kind: Extract<"brand" | "danger" | "inverse" | "neutral", Kind> =
    "brand";

  /** When `true`, a busy indicator is displayed on the primary button. */
  @property({ reflect: true }) loading = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines where the component will be positioned relative to the container element.
   *
   * @default "bottom-end"
   */
  @property({ reflect: true }) placement: MenuPlacement = "bottom-end";

  /** Specifies an icon to display at the end of the primary button. */
  @property({ reflect: true }) primaryIconEnd: IconNameOrString;

  /** Displays the `primaryIconStart` and/or `primaryIconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) primaryIconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the primary button. */
  @property({ reflect: true }) primaryIconStart: IconNameOrString;

  /** Accessible name for the primary button. */
  @property({ reflect: true }) primaryLabel: string;

  /** Text displayed in the primary button. */
  @property({ reflect: true }) primaryText: string;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the width of the component. */
  @property({ reflect: true }) width: Width = "auto";

  // #endregion

  // #region Public Methods

  /** Sets focus on the component's first focusable element. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.el);
  }

  // #endregion

  // #region Events

  /** Fires when the primary button is clicked. */
  calciteSplitButtonPrimaryClick = createEvent({ cancelable: false });

  /** Fires when the dropdown menu is clicked. */
  calciteSplitButtonSecondaryClick = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  load(): void {
    setUpLoadableComponent(this);
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    setComponentLoaded(this);
  }

  // #endregion

  // #region Private Methods
  private calciteSplitButtonPrimaryClickHandler(): void {
    this.calciteSplitButtonPrimaryClick.emit();
  }

  private calciteSplitButtonSecondaryClickHandler(): void {
    this.calciteSplitButtonSecondaryClick.emit();
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const buttonWidth = this.width === "auto" ? "auto" : "full";

    return (
      <InteractiveContainer disabled={this.disabled}>
        <div class={CSS.container}>
          <calcite-button
            appearance={this.appearance}
            disabled={this.disabled}
            iconEnd={this.primaryIconEnd ? this.primaryIconEnd : null}
            iconFlipRtl={this.primaryIconFlipRtl ? this.primaryIconFlipRtl : null}
            iconStart={this.primaryIconStart ? this.primaryIconStart : null}
            kind={this.kind}
            label={this.primaryLabel}
            loading={this.loading}
            onClick={this.calciteSplitButtonPrimaryClickHandler}
            scale={this.scale}
            splitChild={"primary"}
            type="button"
            width={buttonWidth}
          >
            {this.primaryText}
          </calcite-button>
          <div class={CSS.dividerContainer}>
            <div class={CSS.divider} />
          </div>
          <calcite-dropdown
            disabled={this.disabled}
            flipPlacements={this.flipPlacements}
            onClick={this.calciteSplitButtonSecondaryClickHandler}
            open={this.active}
            overlayPositioning={this.overlayPositioning}
            placement={this.placement}
            scale={this.scale}
            widthScale={this.scale}
          >
            <calcite-button
              appearance={this.appearance}
              disabled={this.disabled}
              iconStart={this.dropdownIcon}
              kind={this.kind}
              label={this.dropdownLabel}
              scale={this.scale}
              slot="trigger"
              splitChild={"secondary"}
              type="button"
            />
            <slot />
          </calcite-dropdown>
        </div>
      </InteractiveContainer>
    );
  }

  // #endregion
}
