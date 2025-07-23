// @ts-strict-ignore
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  JsxNode,
  stringOrBoolean,
} from "@arcgis/lumina";
import { FlipPlacement, MenuPlacement, OverlayPositioning } from "../../utils/floating-ui";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { DropdownIconType } from "../button/interfaces";
import { Appearance, FlipContext, Kind, Scale, Width } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS, ICONS, SLOTS } from "./resources";
import { styles } from "./split-button.scss";

declare global {
  interface DeclareElements {
    "calcite-split-button": SplitButton;
  }
}

/** @slot - A slot for adding `calcite-dropdown` content. */
export class SplitButton extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private get dropdownIcon(): string {
    return this.dropdownIconType === "chevron"
      ? ICONS.chevronDown
      : this.dropdownIconType === "caret"
        ? ICONS.caretDown
        : this.dropdownIconType === "ellipsis"
          ? ICONS.ellipsis
          : ICONS.handleVertical;
  }

  private focusSetter = useSetFocus<this>()(this);

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

  /**
   * Prompts the user to save the linked URL instead of navigating to it. Can be used with or without a value:
   * Without a value, the browser will suggest a filename/extension.
   *
   * @see [Global download attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).
   */
  @property({ reflect: true, converter: stringOrBoolean }) download: string | boolean = false;

  /** Specifies the icon used for the dropdown menu. */
  @property({ reflect: true }) dropdownIconType: DropdownIconType = "chevron";

  /** Accessible name for the dropdown menu. */
  @property({ reflect: true }) dropdownLabel: string;

  /** Specifies the component's fallback slotted content `placement` when it's initial or specified `placement` has insufficient space available. */
  @property() flipPlacements: FlipPlacement[];

  /** Specifies the URL of the linked resource, which can be set as an absolute or relative path. */
  @property({ reflect: true }) href: string;

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
   * Defines the relationship between the `href` value and the current document.
   *
   * @mdn [rel](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel)
   */
  @property({ reflect: true }) rel: string;

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

  /**
   * Specifies where to open the linked document defined in the `href` property.
   *
   * @mdn [target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   */
  @property({ reflect: true }) target: string;

  /** Specifies the width of the component. [Deprecated] The `"half"` value is deprecated, use `"full"` instead. */
  @property({ reflect: true }) width: Extract<Width, "auto" | "half" | "full"> = "auto";

  // #endregion

  // #region Public Methods

  /**
   * Sets focus on the component's first focusable element.
   *
   * @param options - Enables customization of focus behavior.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.el;
    }, options);
  }

  // #endregion

  // #region Events

  /** Fires when the primary button is clicked. */
  calciteSplitButtonPrimaryClick = createEvent({ cancelable: false });

  /** Fires when the dropdown menu is clicked. */
  calciteSplitButtonSecondaryClick = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override updated(): void {
    updateHostInteraction(this);
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
            download={this.download}
            href={this.href}
            iconEnd={this.primaryIconEnd ? this.primaryIconEnd : null}
            iconFlipRtl={this.primaryIconFlipRtl ? this.primaryIconFlipRtl : null}
            iconStart={this.primaryIconStart ? this.primaryIconStart : null}
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
      </InteractiveContainer>
    );
  }

  // #endregion
}
