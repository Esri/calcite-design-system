import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  JsxNode,
  stringOrBoolean,
} from "@arcgis/lumina";
import { FlipPlacement, LogicalPlacement, OverlayPositioning } from "../../utils/floating-ui";
import { DropdownIconType } from "../button/types";
import { Appearance, FlipContext, Kind, Scale, Width } from "../types";
import { IconName } from "../icon/types";
import { useFocusable } from "../../controllers/useFocusable";
import { useInteractive } from "../../controllers/useInteractive";
import { CSS, ICONS, SLOTS } from "./resources";
import { styles } from "./split-button.scss";

declare global {
  interface DeclareElements {
    "calcite-split-button": SplitButton;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the component's background color.
     *
     * @public
     */
    "--calcite-split-button-background-color": "*";
    /**
     * Specifies the component's background color when hovered.
     *
     * @public
     */
    "--calcite-split-button-background-color-hover": "*";
    /**
     * Specifies the component's background color when focused.
     *
     * @public
     */
    "--calcite-split-button-background-color-focus": "*";
    /**
     * Specifies the component's background color when active.
     *
     * @public
     */
    "--calcite-split-button-background-color-press": "*";
    /**
     * Specifies the component's border color.
     *
     * @public
     */
    "--calcite-split-button-border-color": "*";
    /**
     * Specifies the component's corner radius.
     *
     * @public
     */
    "--calcite-split-button-corner-radius": "*";
    /**
     * Specifies the component's `iconStart` and `iconEnd` color.
     *
     * @public
     */
    "--calcite-split-button-icon-color": "*";
    /**
     * Specifies the component's loader color.
     *
     * @public
     */
    "--calcite-split-button-loader-color": "*";
    /**
     * Specifies the component's text color.
     *
     * @public
     */
    "--calcite-split-button-text-color": "*";
    /**
     * Specifies the component's shadow.
     *
     * @public
     */
    "--calcite-split-button-shadow": "*";
    /**
     * Specifies the component's divider border color.
     *
     * @public
     */
    "--calcite-split-button-divider-border-color": "*";
    /**
     * Specifies the component's divider color.
     *
     * @public
     */
    "--calcite-split-button-divider-color": "*";
    /**
     * Specifies the width of the component's dropdown.
     *
     * @public
     */
    "--calcite-split-button-dropdown-width": "*";
    /**
     * Specifies the component's dropdown background color.
     *
     * @public
     */
    "--calcite-split-button-dropdown-background-color": "*";
  }
}

/** @public */
interface SplitButtonSlots {
  /**
   * A slot for adding `calcite-dropdown` content.
   *
   * @public
   */
  "": Node[];
}

/**
 * @public
 * @docGroup Buttons
 */
export class SplitButton extends LitElement {
  //#region Type-only metadata members

  /** @public */
  override ["@slots"]!: SplitButtonSlots;

  //#endregion

  //#region Static Members

  static override shadowRootOptions = {
    mode: "open" as const,
    delegatesFocus: true,
  };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private get dropdownIcon(): IconName {
    return this.dropdownIconType === "chevron"
      ? ICONS.chevronDown
      : this.dropdownIconType === "caret"
        ? ICONS.caretDown
        : this.dropdownIconType === "ellipsis"
          ? ICONS.ellipsis
          : ICONS.handleVertical;
  }

  private focusSetter = useFocusable<this>()(this);

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region Public Properties

  /**
   * When `true`, the component is active.
   * @internal
   */
  @property({ reflect: true }) active = false;

  /**
   * Specifies the appearance style of the component.
   *
   * @public
   */
  @property({ reflect: true }) appearance: Extract<
    "outline" | "outline-fill" | "solid" | "transparent",
    Appearance
  > = "solid";

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   *
   * @public
   */
  @property({ reflect: true }) disabled = false;

  /**
   * Prompts the user to save the linked URL instead of navigating to it. Can be used with or without a value:
   * Without a value, the browser will suggest a filename/extension.
   *
   * @public
   * @see [MDN - Global download attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).
   */
  @property({ reflect: true, converter: stringOrBoolean }) download: string | boolean = false;

  /**
   * Specifies the icon used for the dropdown menu.
   *
   * @public
   */
  @property({ reflect: true }) dropdownIconType: DropdownIconType = "chevron";

  /**
   * Accessible name for the dropdown menu.
   *
   * @public
   */
  @property({ reflect: true }) dropdownLabel?: string;

  /**
   * @public
   * @copyDoc
   */
  @property() flipPlacements?: FlipPlacement[];

  /**
   * Specifies the URL of the linked resource, which can be set as an absolute or relative path.
   *
   * @public
   */
  @property({ reflect: true }) href?: string;

  /**
   * Specifies the kind of the component, which will apply to border and background, if applicable.
   *
   * @public
   */
  @property({ reflect: true }) kind: Extract<"brand" | "danger" | "inverse" | "neutral", Kind> =
    "brand";

  /**
   * When `true`, a busy indicator is displayed on the primary button.
   *
   * @public
   */
  @property({ reflect: true }) loading = false;

  /**
   * @public
   * @copyDoc
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Defines the relationship between the `href` value and the current document.
   *
   * @public
   * @see [MDN - rel](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel)
   */
  @property({ reflect: true }) rel?: string;

  /**
   * Determines where the component will be positioned relative to the container element.
   *
   * @public
   */
  @property({ reflect: true }) placement: LogicalPlacement = "bottom-end";

  /**
   * Specifies an icon to display at the end of the primary button.
   *
   * @public
   */
  @property({ reflect: true }) primaryIconEnd?: IconName;

  /**
   * Displays the `primaryIconStart` and/or `primaryIconEnd` as flipped when the element direction is right-to-left (`"rtl"`).
   *
   * @public
   */
  @property({ reflect: true }) primaryIconFlipRtl?: FlipContext;

  /**
   * Specifies an icon to display at the start of the primary button.
   *
   * @public
   */
  @property({ reflect: true }) primaryIconStart?: IconName;

  /**
   * Specifies an accessible name for the primary button.
   *
   * @public
   */
  @property({ reflect: true }) primaryLabel?: string;

  /**
   * Specifies the text displayed in the primary button.
   *
   * @public
   */
  @property({ reflect: true }) primaryText?: string;

  /**
   * Specifies the component's size.
   *
   * @public
   */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies where to open the linked document defined in the `href` property.
   *
   * @public
   * @see [MDN - target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   */
  @property({ reflect: true }) target?: string;

  /**
   * @public
   * @copyDoc
   * @see [MDN - Top Layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
   */
  @property({ reflect: true }) topLayerDisabled = false;

  /**
   * Specifies the width of the component.
   *
   * @public
   */
  @property({ reflect: true }) width: Extract<Width, "auto" | "full"> = "auto";

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component's first focusable element.
   *
   * @public
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.el, options);
  }

  //#endregion

  //#region Events

  /**
   * Fires when the primary button is clicked.
   *
   * @public
   */
  calciteSplitButtonPrimaryClick = createEvent({ cancelable: false });

  /**
   * Fires when the dropdown menu is clicked.
   *
   * @public
   */
  calciteSplitButtonSecondaryClick = createEvent({ cancelable: false });

  //#endregion

  //#region Private Methods

  private calciteSplitButtonPrimaryClickHandler(): void {
    this.calciteSplitButtonPrimaryClick.emit();
  }

  private calciteSplitButtonSecondaryClickHandler(): void {
    this.calciteSplitButtonSecondaryClick.emit();
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const buttonWidth = this.width === "auto" ? "auto" : "full";

    return (
      <this.interactiveContainer disabled={this.disabled}>
        <div class={CSS.container}>
          <calcite-button
            appearance={this.appearance}
            disabled={this.disabled}
            download={this.download}
            href={this.href}
            iconEnd={this.primaryIconEnd}
            iconFlipRtl={this.primaryIconFlipRtl}
            iconStart={this.primaryIconStart}
            kind={this.kind}
            label={this.primaryLabel}
            loading={this.loading}
            onClick={this.calciteSplitButtonPrimaryClickHandler}
            rel={this.rel}
            scale={this.scale}
            splitChild={"primary"}
            target={this.target}
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
            topLayerDisabled={this.topLayerDisabled}
            widthScale={this.scale}
          >
            <calcite-button
              appearance={this.appearance}
              disabled={this.disabled}
              iconStart={this.dropdownIcon}
              kind={this.kind}
              label={this.dropdownLabel}
              scale={this.scale}
              slot={SLOTS.trigger}
              splitChild={"secondary"}
              type="button"
            />
            <slot />
          </calcite-dropdown>
        </div>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
