import { createRef } from "lit/directives/ref.js";
import { queryAssignedElements } from "lit/decorators.js";
import {
  LitElement,
  property,
  h,
  method,
  JsxNode,
  Fragment,
  LuminaJsx,
  createEvent,
  state,
} from "@arcgis/lumina";
import { guid } from "../../utils/guid";
import { createObserver } from "../../utils/observers";
import { getIconScale } from "../../utils/component";
import { isActivationKey } from "../../utils/key";
import { submitForm, resetForm } from "../../utils/form";
import {
  Alignment,
  Appearance,
  AriaAttributesCamelCased,
  Scale,
  SelectionAppearance,
  Width,
} from "../interfaces";
import { IconName } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useInteractive } from "../../controllers/useInteractive";
import { useFormTrigger } from "../../controllers/useFormTrigger";
import type { Popover } from "../popover/popover";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS, IDS, SLOTS, isAction } from "./resources";
import { styles } from "./action.scss";

declare global {
  interface DeclareElements {
    "calcite-action": Action;
  }
}

type ActionButtonType = "overflow" | "split" | "menu";

/**
 * @slot - A slot for adding non-interactive content, such as a `calcite-icon`.
 * @slot menu - A slot for adding `calcite-action` or `calcite-action-group` as dropdown menu content.
 */
export class Action extends LitElement {
  //#region Static Members

  static formAssociated = true;

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private guid = guid();

  private buttonRef = createRef<HTMLButtonElement>();

  private secondaryButtonRef = createRef<HTMLButtonElement>();

  private buttonId = IDS.button(this.guid);

  private menuId = IDS.menu(this.guid);

  private mutationObserver = createObserver("mutation", () => this.requestUpdate());

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  private focusSetter = useSetFocus<this>()(this);

  private indicatorRef = createRef<HTMLDivElement>();

  private interactiveContainer = useInteractive(this);

  formTrigger = useFormTrigger()(this);

  @queryAssignedElements({ slot: SLOTS.menu })
  private menuElements!: HTMLElement[];

  /**
   * The associated form element.
   *
   * @private
   */
  formEl: HTMLFormElement | null = null;

  private get hasSlottedMenu(): boolean {
    return !!this.menuElements?.length;
  }

  private get isMenuType(): boolean {
    return this.buttonType === "menu";
  }

  private get isOverflowType(): boolean {
    return this.buttonType === "overflow";
  }

  private get isSplitType(): boolean {
    return this.buttonType === "split";
  }

  private get supportsMenu(): boolean {
    return this.isMenuType || this.isOverflowType || this.isSplitType;
  }

  private get menuButtonEl(): HTMLButtonElement {
    return this.isSplitType ? this.secondaryButtonRef.value : this.buttonRef.value;
  }

  private toggleOpen = (): void => {
    if (!this.supportsMenu || !this.hasSlottedMenu) {
      return;
    }

    this.open = !this.open;
  };

  private setPopoverEl = (el: Popover["el"]): void => {
    if (!el) {
      return;
    }

    el.open = this.open;
  };

  private handlePopoverOpen = (event: CustomEvent<void>): void => {
    event.stopPropagation();
    this.open = true;
  };

  private handlePopoverClose = (event: CustomEvent<void>): void => {
    event.stopPropagation();
    this.open = false;
  };

  private handleSplitSecondaryClick = (): void => {
    this.toggleOpen();
  };

  private handleSplitSecondaryKeyDown = (event: KeyboardEvent): void => {
    if (!isActivationKey(event.key)) {
      return;
    }

    event.preventDefault();
    this.toggleOpen();
  };

  private handleMenuItemClick = (event: MouseEvent): void => {
    if (!event.composedPath().some((element) => isAction(element as Element))) {
      return;
    }

    this.open = false;
    this.menuButtonEl?.focus();
  };

  //#endregion

  //#region State Properties

  @state() private _open = false;

  //#endregion

  //#region Public Properties

  /**
   * When specified, overrides or extends ARIA properties and attributes on the component's button. Refer to the component's accessibility section for configuration considerations.
   */
  @property() aria?: Partial<
    Pick<
      AriaAttributesCamelCased,
      | "controlsElements"
      | "describedByElements"
      | "expanded"
      | "hasPopup"
      | "labelledByElements"
      | "ownsElements"
      | "pressed"
      | "checked"
    > &
      Pick<LuminaJsx.HTMLAttributes, "role">
  >;

  /** When `true`, the component is highlighted. */
  @property({ reflect: true }) active = false;

  /**
   * When `true`, the component appears as if it is focused.
   * @private
   */
  @property({ reflect: true }) activeDescendant = false;

  /** Specifies the horizontal alignment of button elements with text content. */
  @property({ reflect: true }) alignment?: Alignment;

  /**
   * Specifies the appearance of the component.
   *
   * @deprecated in v5.0.0, removal target v6.0.0 - No longer necessary.
   */
  @property({ reflect: true }) appearance: Extract<"solid" | "transparent", Appearance> =
    "transparent";

  /**
   * When `true`, the side padding of the component is reduced.
   *
   * @deprecated in v2.11.0, removal target v5.0.0 - No longer necessary.
   */
  @property({ reflect: true }) compact = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * When `true`, the component is draggable.
   *
   * @private
   */
  @property({ reflect: true }) dragHandle = false;

  /**
   * Specifies the `id` of the component's associated form.
   *
   * When not set, the component is associated with its ancestor form element, if one exists.
   */
  @property({ reflect: true }) form: string | null = null;

  /** Specifies an icon to display. */
  @property({ type: String, reflect: true }) icon?: IconName;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** When `true`, displays a visual indicator. */
  @property({ reflect: true }) indicator = false;

  /** Specifies an accessible label for the component. If no label is provided, the label inherits what's provided for the `text` prop. */
  @property() label?: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** Overrides individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * When `full`, the component's width spans all its parent's available space
   *
   * @private
   */
  @property({ reflect: true }) width: Extract<"auto" | "full", Width> = "auto";

  /**
   * Specifies text that accompanies the icon.
   *
   * @required
   */
  @property() text!: string;

  /** Specifies the action type for menu-enabled interactions. */
  @property({ reflect: true }) buttonType: ActionButtonType;

  /** When `true`, displays `text` adjacent to the `icon`. */
  @property({ reflect: true }) textEnabled = false;

  /** When `true`, the component's slotted menu is open. */
  @property({ reflect: true })
  get open(): boolean {
    return this._open;
  }
  set open(value: boolean) {
    if (value === this._open) {
      return;
    }

    this._open = value;
    this.calciteActionOpen.emit();
  }

  /**
   * Specifies the default behavior of the component.
   *
   * @see [MDN - type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type)
   */
  @property({ reflect: true }) type: HTMLButtonElement["type"] = "button";

  /**
   * Specifies the selection appearance of the component. Inherited from `calcite-action-bar`.
   *
   * @private
   */
  @property({ reflect: true }) selectionAppearance?: Extract<
    "neutral" | "highlight",
    SelectionAppearance
  >;

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
    return this.focusSetter(() => this.buttonRef.value, options);
  }

  //#endregion

  //#region Events

  /** Fires when the component's `open` property is toggled. */
  calciteActionOpen = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  override willUpdate(): void {
    if (!this.supportsMenu || !this.hasSlottedMenu) {
      this.open = false;
    }
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private handleClick(): void {
    if ((this.isMenuType || this.isOverflowType) && this.hasSlottedMenu) {
      this.toggleOpen();
      return;
    }

    const { type } = this;
    if (type === "submit") {
      submitForm(this);
    } else if (type === "reset") {
      resetForm(this);
    }
  }

  private getMenuTriggerAriaExpanded(): boolean | "true" | "false" {
    return this.supportsMenu && this.hasSlottedMenu ? this.open : this.aria?.expanded;
  }

  private getMenuTriggerAriaHasPopup(): AriaAttributesCamelCased["hasPopup"] {
    return this.supportsMenu && this.hasSlottedMenu ? "menu" : this.aria?.hasPopup;
  }

  //#endregion

  //#region Rendering

  private renderTextContainer(textVisible = this.textEnabled): JsxNode {
    const { text } = this;

    const textContainerClasses = {
      [CSS.textContainer]: true,
      [CSS.textContainerVisible]: textVisible,
    };

    return text ? (
      <div class={textContainerClasses} key="text-container">
        {text}
      </div>
    ) : null;
  }

  private renderIndicatorText(): JsxNode {
    const { indicator, messages, buttonId } = this;
    return (
      <div
        aria-labelledby={buttonId}
        ariaLive="polite"
        class={CSS.indicatorText}
        ref={this.indicatorRef}
        role="region"
      >
        {indicator ? messages.indicator : null}
      </div>
    );
  }

  private renderIconContainer(iconOverride?: IconName, includeSlot = true): JsxNode {
    const { loading, icon, scale, el, iconFlipRtl, indicator } = this;
    const iconToRender = iconOverride || icon;
    const loaderScale = scale === "l" ? "l" : "m";
    const calciteLoaderNode = loading ? (
      <calcite-loader inline label={this.messages.loading} scale={loaderScale} />
    ) : null;
    const calciteIconNode = iconToRender ? (
      <calcite-icon
        class={{ [CSS.indicatorWithIcon]: indicator }}
        flipRtl={iconFlipRtl}
        icon={iconToRender}
        scale={getIconScale(this.scale)}
      />
    ) : null;
    const iconNode = calciteLoaderNode || calciteIconNode;
    const hasIconToDisplay = iconNode || (includeSlot && el.children?.length);

    const slotContainerNode = (
      <div
        class={{
          [CSS.slotContainer]: true,
          [CSS.slotContainerHidden]: loading,
        }}
      >
        {includeSlot ? <slot /> : null}
      </div>
    );

    return hasIconToDisplay ? (
      <div ariaHidden="true" class={CSS.iconContainer} key="icon-container">
        {iconNode}
        {slotContainerNode}
      </div>
    ) : null;
  }

  private renderButton(ref = this.buttonRef, isSplitPrimary = false): JsxNode {
    const {
      compact,
      disabled,
      icon,
      loading,
      textEnabled,
      label,
      text,
      indicator,
      indicatorRef,
      buttonId,
      messages,
    } = this;
    const textVisible = this.isOverflowType ? false : textEnabled;
    const iconOverride = this.isOverflowType && !icon ? ICONS.overflow : undefined;
    const menuTrigger = !isSplitPrimary && (this.isMenuType || this.isOverflowType);
    const labelFallback = label || text || "";

    const ariaLabel = indicator
      ? messages.indicatorLabel.replace("{label}", labelFallback)
      : labelFallback;

    const buttonClasses = {
      [CSS.button]: true,
      [CSS.buttonTextVisible]: textVisible,
      [CSS.buttonCompact]: compact,
      [CSS.menuTrigger]: menuTrigger,
      [CSS.buttonSplitPrimary]: isSplitPrimary,
      [CSS.buttonOverflowOpen]: this.isOverflowType && this.open,
      [CSS.buttonMenuOpen]: this.isMenuType && this.open,
    };

    const coreContent = (
      <>
        {this.renderIconContainer(iconOverride)}
        {this.renderTextContainer(textVisible)}
        {!icon && indicator && <div class={CSS.indicatorWithoutIcon} key="indicator-no-icon" />}
      </>
    );

    const buttonContent = this.isMenuType ? (
      <>
        <div class={CSS.menuContent}>{coreContent}</div>
        <calcite-icon
          class={CSS.menuChevron}
          icon={ICONS.chevronDown}
          scale={getIconScale(this.scale)}
        />
      </>
    ) : (
      coreContent
    );

    const internalControlsElements = indicator && indicatorRef.value ? [indicatorRef.value] : [];

    const ariaControlsElements = [
      ...(this.aria?.controlsElements ?? []),
      ...internalControlsElements,
    ];

    if (this.dragHandle) {
      return (
        // Needs to be a span because of https://github.com/SortableJS/Sortable/issues/1486 & https://bugzilla.mozilla.org/show_bug.cgi?id=568313
        <span
          ariaBusy={loading}
          ariaControlsElements={ariaControlsElements}
          ariaDescribedByElements={this.aria?.describedByElements}
          ariaExpanded={this.getMenuTriggerAriaExpanded()}
          ariaHasPopup={this.getMenuTriggerAriaHasPopup()}
          ariaLabel={ariaLabel}
          ariaLabelledByElements={this.aria?.labelledByElements}
          ariaOwnsElements={this.aria?.ownsElements}
          ariaPressed={this.aria?.pressed}
          class={buttonClasses}
          id={buttonId}
          ref={ref}
          role="button"
          tabIndex={this.disabled ? undefined : 0}
        >
          {buttonContent}
        </span>
      );
    }

    return (
      <button
        ariaBusy={loading}
        ariaChecked={this.aria?.checked}
        ariaControlsElements={ariaControlsElements}
        ariaDescribedByElements={this.aria?.describedByElements}
        ariaExpanded={this.getMenuTriggerAriaExpanded()}
        ariaHasPopup={this.getMenuTriggerAriaHasPopup()}
        ariaLabel={ariaLabel}
        ariaLabelledByElements={this.aria?.labelledByElements}
        ariaOwnsElements={this.aria?.ownsElements}
        ariaPressed={this.aria?.pressed}
        class={buttonClasses}
        disabled={disabled}
        id={buttonId}
        onClick={this.handleClick}
        ref={ref}
        role={this.aria?.role}
      >
        {buttonContent}
      </button>
    );
  }

  private renderSplitButton(): JsxNode {
    const secondaryButtonClasses = {
      [CSS.button]: true,
      [CSS.buttonSplitSecondary]: true,
      [CSS.menuTrigger]: true,
      [CSS.buttonSplitSecondaryActive]: this.open,
    };

    return (
      <div class={CSS.buttonGroup}>
        {this.renderButton(this.buttonRef, true)}
        <button
          ariaExpanded={this.open}
          ariaHasPopup={this.hasSlottedMenu ? "menu" : null}
          ariaLabel={this.label || this.text || ""}
          class={secondaryButtonClasses}
          disabled={this.disabled}
          onClick={this.handleSplitSecondaryClick}
          onKeyDown={this.handleSplitSecondaryKeyDown}
          ref={this.secondaryButtonRef}
          type="button"
        >
          <calcite-icon
            class={CSS.menuChevron}
            icon={ICONS.chevronDown}
            scale={getIconScale(this.scale)}
          />
        </button>
      </div>
    );
  }

  private renderMenu(): JsxNode {
    if (!this.supportsMenu) {
      return null;
    }

    return (
      <calcite-popover
        autoClose={true}
        focusTrapDisabled={true}
        label={this.label || this.text}
        offsetDistance={0}
        oncalcitePopoverClose={this.handlePopoverClose}
        oncalcitePopoverOpen={this.handlePopoverOpen}
        open={this.open}
        placement="bottom-start"
        pointerDisabled={true}
        ref={this.setPopoverEl}
        referenceElement={this.menuButtonEl}
        scale={this.scale}
        triggerDisabled={true}
      >
        <div
          class={CSS.menu}
          id={this.menuId}
          onClick={this.handleMenuItemClick}
          role="menu"
          tabIndex={-1}
        >
          <slot name={SLOTS.menu} />
        </div>
      </calcite-popover>
    );
  }

  override render(): JsxNode {
    return (
      <this.interactiveContainer disabled={this.disabled}>
        {this.isSplitType ? this.renderSplitButton() : this.renderButton()}
        {this.renderMenu()}
        {this.renderIndicatorText()}
      </this.interactiveContainer>
    );
  }

  //#endregion
}
