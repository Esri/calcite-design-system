import { PropertyValues } from "lit";
import { createRef } from "lit/directives/ref.js";
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
import { getRoundRobinIndex } from "../../utils/array";
import { guid } from "../../utils/guid";
import { createObserver } from "../../utils/observers";
import { getIconScale } from "../../utils/component";
import { isActivationKey } from "../../utils/key";
import { FlipPlacement, LogicalPlacement, OverlayPositioning } from "../../utils/floating-ui";
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
import type { Tooltip } from "../tooltip/tooltip";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS, IDS, SLOTS, isAction } from "./resources";
import { styles } from "./action.scss";

declare global {
  interface DeclareElements {
    "calcite-action": Action;
  }
}

type ActionButtonType = "overflow" | "split" | "menu";

const SUPPORTED_MENU_NAV_KEYS = ["ArrowUp", "ArrowDown", "End", "Home"];

/**
 * Custom event for managing single-menu-open behavior across Action instances
 * Dispatched when a menu opens to close other Action menus globally
 */
const ACTION_MENU_OPEN_EVENT = "calcite-action-menu-open";

/**
 * @slot - A slot for adding non-interactive content, such as a `calcite-icon`.
 * @slot menuActions - A slot for adding `calcite-action` or `calcite-action-group` as dropdown menu content.
 * @slot tooltip - A slot for adding a tooltip for the menu.
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

  formTrigger = useFormTrigger({ disabled: () => this.isMenuTriggerType && this.hasSlottedMenu })(
    this,
  );

  private get hasSlottedMenu(): boolean {
    return !!this.el.querySelector(`[slot="${SLOTS.menuActions}"]`);
  }

  private get isMenuType(): boolean {
    return this.buttonType === "menu";
  }

  private get isOverflowType(): boolean {
    return this.buttonType === "overflow";
  }

  private get isMenuTriggerType(): boolean {
    return this.isMenuType || this.isOverflowType;
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

  private toggleOpen = (value = !this.menuOpen): void => {
    if (!this.supportsMenu || !this.hasSlottedMenu) {
      return;
    }

    this.menuOpen = value;

    // Emit event to close other action menus when opening
    if (value) {
      document.dispatchEvent(
        new CustomEvent<{ menuElement: HTMLElement }>(ACTION_MENU_OPEN_EVENT, {
          detail: { menuElement: this.el },
        }),
      );
    }
  };

  private setPopoverEl = (el: Popover["el"]): void => {
    if (!el) {
      return;
    }

    el.open = this.menuOpen;
  };

  private handlePopoverOpen = (event: CustomEvent<void>): void => {
    event.stopPropagation();
    this.menuOpen = true;
    this.menuButtonEl?.focus();
    // Emit event to close other action menus when opening
    document.dispatchEvent(
      new CustomEvent<{ menuElement: HTMLElement }>(ACTION_MENU_OPEN_EVENT, {
        detail: { menuElement: this.el },
      }),
    );
  };

  private handlePopoverClose = (event: CustomEvent<void>): void => {
    event.stopPropagation();
    this.menuOpen = false;
  };

  private handleSplitSecondaryClick = (event: MouseEvent): void => {
    event.stopPropagation();
    this.toggleOpen();
  };

  private handleMenuItemClick = (event: MouseEvent): void => {
    if (!event.composedPath().some((element) => isAction(element as Element))) {
      return;
    }

    this.menuOpen = false;
    this.menuButtonEl?.focus();
  };

  private tooltipEl: Tooltip["el"];

  private actionElements: Action["el"][] = [];

  private mouseDownHandler = (event: MouseEvent): void => {
    if (!event.composedPath().some((element) => isAction(element as Element))) {
      return;
    }

    this.activeMenuItemIndex = this.actionElements?.findIndex((action) => action === event.target);
  };

  private updateAction = (action: Action["el"], index: number): void => {
    const { guid, activeMenuItemIndex } = this;
    const id = IDS.action(guid, index);
    action.tabIndex = -1;
    action.setAttribute("role", "menuitem");
    action.textEnabled = true;

    if (!action.id) {
      action.id = id;
    }

    action.activeDescendant = index === activeMenuItemIndex;
  };

  private updateActions = (actions: Action["el"][]): void => {
    actions?.forEach(this.updateAction);
  };

  private handleMenuActionsSlotChange = async (event: Event): Promise<void> => {
    const actions = (event.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .reduce<Action["el"][]>((previousValue, currentValue) => {
        if (isAction(currentValue)) {
          previousValue.push(currentValue);
          return previousValue;
        }

        if (currentValue?.matches("calcite-action-group")) {
          return previousValue.concat(
            Array.from(currentValue.querySelectorAll<Action["el"]>("calcite-action")),
          );
        }

        return previousValue;
      }, []);

    await this.componentOnReady();
    this.actionElements = actions.filter((action) => !action.disabled && !action.hidden);
    this.updateActions(this.actionElements);
  };

  private updateTooltip = (event: Event): void => {
    const tooltips = (event.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter((el): el is Tooltip["el"] => el?.matches("calcite-tooltip"));

    this.tooltipEl = tooltips[0];
    this.setTooltipReferenceElement();
  };

  private setTooltipReferenceElement = (): void => {
    const { tooltipEl, menuOpen } = this;

    if (tooltipEl) {
      tooltipEl.referenceElement = !menuOpen ? this.menuButtonEl : null;
    }
  };

  private handleActionMenuOpen = (event: CustomEvent<{ menuElement: HTMLElement }>): void => {
    // Close this action's menu if another action's menu is opening
    if (event.detail.menuElement !== this.el) {
      this.menuOpen = false;
    }
  };

  private handleMenuKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;
    const { actionElements, activeMenuItemIndex, menuOpen } = this;

    if (!actionElements.length) {
      return;
    }

    if (isActivationKey(key)) {
      event.preventDefault();

      if (!menuOpen) {
        this.toggleOpen();
        return;
      }

      const action = actionElements[activeMenuItemIndex];
      if (action) {
        action.click();
      } else {
        this.toggleOpen(false);
      }

      return;
    }

    if (key === "Tab") {
      this.menuOpen = false;
      return;
    }

    if (key === "Escape") {
      this.toggleOpen(false);
      event.preventDefault();
      this.menuButtonEl?.focus();
      return;
    }

    this.handleActionNavigation(event, key, actionElements);
  };

  //#endregion

  //#region State Properties

  @state() private _menuOpen = false;

  @state() activeMenuItemIndex = -1;

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
  @property({ reflect: true }) form: string;

  /** Specifies an icon to display. */
  @property({ type: String, reflect: true }) icon?: IconName;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** When `true`, displays a visual indicator. */
  @property({ reflect: true }) indicator = false;

  /** Specifies the component's fallback `placement` for slotted content when it's initial or specified `placement` has insufficient space available. */
  @property() menuFlipPlacements?: FlipPlacement[];

  /** Specifies an accessible label for the component. If no label is provided, the label inherits what's provided for the `text` prop. */
  @property() label?: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** Overrides individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** Determines where the component will be positioned relative to the `referenceElement`. */
  @property({ reflect: true }) menuPlacement: LogicalPlacement = "bottom-start";

  /**
   * Specifies the type of positioning to use for overlaid content, where:
   *
   * `"absolute"` works for most cases - positioning the component inside of overflowing parent containers, which affects the container's layout, and
   *
   * `"fixed"` is used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

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
  @property({ reflect: true }) buttonType?: ActionButtonType;

  /** When `true`, displays `text` adjacent to the `icon`. */
  @property({ reflect: true }) textEnabled = false;

  /** When `true`, the component's slotted menu is open. */
  @property({ reflect: true })
  get menuOpen(): boolean {
    return this._menuOpen;
  }
  set menuOpen(value: boolean) {
    if (value === this._menuOpen) {
      return;
    }

    this._menuOpen = value;
    this.activeMenuItemIndex = value ? 0 : -1;
    this.calciteActionMenuOpen.emit();
    this.setTooltipReferenceElement();
  }

  /**
   * Specifies the default behavior of the component.
   *
   * @see [MDN - type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type)
   */
  @property({ reflect: true }) type: HTMLButtonElement["type"] = "button";

  /**
   * When `true` and the component is `menuOpen`, disables top layer placement.
   *
   * Only set this if you need complex z-index control or if top layer placement causes conflicts with third-party components.
   *
   * @see [MDN - Top Layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
   */
  @property({ reflect: true }) topLayerDisabled = false;

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

  /** Fires when the component's `menuOpen` property is toggled. */
  calciteActionMenuOpen = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.listen("mousedown", this.mouseDownHandler);
    document.addEventListener(ACTION_MENU_OPEN_EVENT, this.handleActionMenuOpen);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (!this.supportsMenu || !this.hasSlottedMenu) {
      this.menuOpen = false;
    }

    if (
      changes.has("activeMenuItemIndex") &&
      (this.hasUpdated || this.activeMenuItemIndex !== -1)
    ) {
      this.updateActions(this.actionElements);
    }
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    document.removeEventListener(ACTION_MENU_OPEN_EVENT, this.handleActionMenuOpen);
  }

  //#endregion

  //#region Private Methods

  private isValidKey(key: string, supportedKeys: string[]): boolean {
    return !!supportedKeys.find((k) => k === key);
  }

  private handleActionNavigation(event: KeyboardEvent, key: string, actions: Action["el"][]): void {
    if (!this.isValidKey(key, SUPPORTED_MENU_NAV_KEYS)) {
      return;
    }

    event.preventDefault();

    if (!this.menuOpen) {
      this.toggleOpen();

      if (key === "Home" || key === "ArrowDown") {
        this.activeMenuItemIndex = 0;
      }

      if (key === "End" || key === "ArrowUp") {
        this.activeMenuItemIndex = actions.length - 1;
      }

      return;
    }

    if (key === "Home") {
      this.activeMenuItemIndex = 0;
    }

    if (key === "End") {
      this.activeMenuItemIndex = actions.length - 1;
    }

    const currentIndex = this.activeMenuItemIndex;

    if (key === "ArrowUp") {
      this.activeMenuItemIndex = getRoundRobinIndex(Math.max(currentIndex - 1, -1), actions.length);
    }

    if (key === "ArrowDown") {
      this.activeMenuItemIndex = getRoundRobinIndex(currentIndex + 1, actions.length);
    }
  }

  private handleClick(event: MouseEvent): void {
    if (this.isMenuTriggerType && this.hasSlottedMenu) {
      event.stopPropagation();
      this.toggleOpen();
    }
  }

  private getMenuTriggerAriaExpanded(): boolean | "true" | "false" {
    return this.supportsMenu && this.hasSlottedMenu ? this.menuOpen : this.aria?.expanded;
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
      [CSS.buttonOverflowOpen]: this.isOverflowType && this.menuOpen,
      [CSS.buttonMenuOpen]: this.isMenuType && this.menuOpen,
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
        onKeyDown={menuTrigger ? this.handleMenuKeyDown : undefined}
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
      [CSS.buttonSplitSecondaryActive]: this.menuOpen,
    };

    return (
      <div class={CSS.buttonGroup}>
        {this.renderButton(this.buttonRef, true)}
        <button
          aria-controls={this.menuId}
          ariaExpanded={this.menuOpen}
          ariaHasPopup={this.hasSlottedMenu ? "menu" : null}
          ariaLabel={this.label || this.text || ""}
          class={secondaryButtonClasses}
          disabled={this.disabled}
          onClick={this.handleSplitSecondaryClick}
          onKeyDown={this.handleMenuKeyDown}
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
    if (!this.supportsMenu || !this.hasSlottedMenu) {
      return null;
    }

    const { actionElements, activeMenuItemIndex } = this;
    const activeAction = actionElements[activeMenuItemIndex];
    const activeDescendantId = activeAction?.id || null;

    return (
      <calcite-popover
        autoClose={true}
        flipPlacements={this.menuFlipPlacements}
        focusTrapDisabled={true}
        label={this.label || this.text}
        offsetDistance={0}
        oncalcitePopoverClose={this.handlePopoverClose}
        oncalcitePopoverOpen={this.handlePopoverOpen}
        open={this.menuOpen}
        overlayPositioning={this.overlayPositioning}
        placement={this.menuPlacement}
        pointerDisabled={true}
        ref={this.setPopoverEl}
        referenceElement={this.menuButtonEl ?? undefined}
        scale={this.scale}
        topLayerDisabled={this.topLayerDisabled}
        triggerDisabled={true}
      >
        <div
          aria-activedescendant={activeDescendantId}
          aria-labelledby={this.buttonId}
          class={CSS.menu}
          id={this.menuId}
          onClick={this.handleMenuItemClick}
          role="menu"
          tabIndex={-1}
        >
          <slot name={SLOTS.menuActions} onSlotChange={this.handleMenuActionsSlotChange} />
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
        <slot name={SLOTS.tooltip} onSlotChange={this.updateTooltip} />
      </this.interactiveContainer>
    );
  }

  //#endregion
}
