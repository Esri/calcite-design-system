import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { useDirection } from "@arcgis/lumina/controllers";
import { HeadingLevel } from "../functional/Heading";
import { SLOTS as PANEL_SLOTS } from "../panel/resources";
import { OverlayPositioning } from "../../utils/floating-ui";
import { CollapseDirection, Scale } from "../types";
import { useT9n } from "../../controllers/useT9n";
import type { Panel } from "../panel/panel";
import type { Action } from "../action/action";
import { IconName } from "../icon/types";
import { useInteractive } from "../../controllers/useInteractive";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS, SLOTS } from "./resources";
import { styles } from "./flow-item.scss";
import { FocusTrapOptions } from "../../controllers/useFocusTrap";

declare global {
  interface DeclareElements {
    "calcite-flow-item": FlowItem;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the padding of the component's footer.
     *
     * @deprecated in v3.0.0, removal target v6.0.0 - Use `--calcite-flow-footer-space` instead.
     */
    "--calcite-flow-item-footer-padding": "*";
    /**
     * Specifies the component header's block end border.
     *
     * @deprecated in v3.0.0, removal target v6.0.0 - Use `--calcite-flow-border-color` instead.
     */
    "--calcite-flow-item-header-border-block-end": "*";
    /**
     * Specifies the component's corner radius.
     */
    "--calcite-flow-corner-radius": "*";
    /**
     * Specifies the text color of the component's `heading`.
     */
    "--calcite-flow-heading-text-color": "*";
    /**
     * Specifies the color of the component's `icon`.
     */
    "--calcite-flow-icon-color": "*";
    /**
     * Specifies the text color of the component's `description`.
     */
    "--calcite-flow-description-text-color": "*";
    /**
     * Specifies the component's border color.
     */
    "--calcite-flow-border-color": "*";
    /**
     * Specifies the component's background color.
     */
    "--calcite-flow-background-color": "*";
    /**
     * Specifies the padding of the component's `content-top` slot.
     */
    "--calcite-flow-content-top-space": "*";
    /**
     * Specifies the padding of the component's `content-bottom` slot.
     */
    "--calcite-flow-content-bottom-space": "*";
    /**
     * Specifies the padding of the component's `header-top` slot.
     */
    "--calcite-flow-header-top-space": "*";
    /**
     * Specifies the background color of the component's header.
     */
    "--calcite-flow-header-background-color": "*";
    /**
     * Specifies the background color of the component's footer.
     */
    "--calcite-flow-footer-background-color": "*";
    /**
     * Specifies the padding of the component's `unnamed (default)` slot.
     */
    "--calcite-flow-space": "*";
    /**
     * Specifies the padding of the component's `header-content` slot.
     */
    "--calcite-flow-header-content-space": "*";
    /**
     * Specifies the padding of the component's footer.
     */
    "--calcite-flow-footer-space": "*";
    /**
     * Specifies the background color of the component's `closable`, `collapsible`, and `back` `calcite-action`s. Applies to any slotted `calcite-action`s.
     */
    "--calcite-action-background-color": "*";
    /**
     * Specifies the background color of the component's `closable`, `collapsible`, and `back` `calcite-action`s when hovered. Applies to any slotted `calcite-action`s.
     */
    "--calcite-action-background-color-hover": "*";
    /**
     * Specifies the background color of the component's `closable`, `collapsible`, and `back` `calcite-action`s when pressed. Applies to any slotted `calcite-action`s.
     */
    "--calcite-action-background-color-pressed": "*";
    /**
     * Specifies the text and icon color of the component's `closable`, `collapsible`, and `back` `calcite-action`s when hovered. Applies to any slotted `calcite-action`s.
     */
    "--calcite-action-text-color-hover": "*";
    /**
     * Specifies the text and icon color of the component's `closable`, `collapsible`, and `back` `calcite-action`s when pressed. Applies to any slotted `calcite-action`s.
     */
    "--calcite-action-text-color-pressed": "*";
    /**
     * Specifies the border color of the component's internally rendered `calcite-popover`, which is rendered within a `calcite-action` menu when slotted `calcite-action`s are present in the `header-actions-end` slot. Applies to any slotted `calcite-popover`s.
     */
    "--calcite-popover-border-color": "*";
    /**
     * Specifies the background color of any `calcite-action`s in the component's header when hovered.
     */
    "--calcite-flow-header-action-background-color-hover": "*";
    /**
     * Specifies the background color of any `calcite-action`s in the component's header when pressed.
     */
    "--calcite-flow-header-action-background-color-press": "*";
    /**
     * Specifies the background color of any `calcite-action`s in the component's header.
     */
    "--calcite-flow-header-action-background-color": "*";
    /**
     * Specifies the color of any `calcite-action`s indicator in the component's header.
     */
    "--calcite-flow-header-action-indicator-color": "*";
    /**
     * Specifies the text color of any `calcite-action`s in the component's header when pressed.
     */
    "--calcite-flow-header-action-text-color-press": "*";
    /**
     * Specifies the text color of any `calcite-action`s in the component's header.
     */
    "--calcite-flow-header-action-text-color": "*";
  }
}

interface FlowItemSlots {
  /**
   * A slot for adding custom content.
   */
  "": Node[];
  /**
   * A slot for adding a `calcite-action-bar` to the component.
   */
  "action-bar": Node[];
  /**
   * A slot for adding `calcite-alert`s to the component.
   */
  alerts: Node[];
  /**
   * A slot for adding content above the unnamed (default) slot and below the action-bar slot (if populated).
   */
  "content-top": Node[];
  /**
   * A slot for adding content below the unnamed (default) slot and above the footer slot (if populated)
   */
  "content-bottom": Node[];
  /**
   * A slot for adding custom content above the header actions and content.
   */
  "header-top": Node[];
  /**
   * A slot for adding `calcite-action`s or content to the start side of the component's header.
   */
  "header-actions-start": Node[];
  /**
   * A slot for adding `calcite-action`s or content to the end side of the component's header.
   */
  "header-actions-end": Node[];
  /**
   * A slot for adding custom content to the component's header.
   */
  "header-content": Node[];
  /**
   * A slot for adding an overflow menu with `calcite-action`s inside a `calcite-dropdown`.
   */
  "header-menu-actions": Node[];
  /**
   * A slot for adding content to the heading area of the default header. Takes precedence over the `heading` property.
   */
  heading: Node[];
  /**
   * A slot for adding content to the description area of the default header. Takes precedence over the `description` property.
   */
  description: Node[];
  /**
   * A slot for adding a `calcite-fab` (floating action button) to perform an action.
   */
  fab: Node[];
  /**
   * A slot for adding custom content to the component's footer. Should not be used with the `footer-start` or `footer-end` slots.
   */
  footer: Node[];
  /**
   * A slot for adding a trailing footer custom content. Should not be used with the `footer` slot.
   */
  "footer-end": Node[];
  /**
   * A slot for adding a leading footer custom content. Should not be used with the `footer` slot.
   */
  "footer-start": Node[];
}

export class FlowItem extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  override ["@slots"]!: FlowItemSlots;

  private backButtonRef = createRef<Action["el"]>();

  private containerRef = createRef<Panel["el"]>();

  private direction = useDirection();

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region Public Properties

  /** Specifies a function to run before the component is removed from its parent `calcite-flow`. */
  @property() beforeBack?: () => Promise<void>;

  /** Specifies a function to run before the component closes. */
  @property() beforeClose?: () => Promise<void>;

  /** @copyDoc */
  @property({ reflect: true }) closable = false;

  /** @copyDoc */
  @property({ reflect: true }) closed = false;

  /** When `collapsible` is `true`, specifies the direction of the collapse icon. */
  @property() collapseDirection: CollapseDirection = "down";

  /** When `true`, hides the component's content area. */
  @property({ reflect: true }) collapsed = false;

  /** When `true`, the component is collapsible. */
  @property({ reflect: true }) collapsible = false;

  /** @copyDoc */
  @property() description?: string;

  /** When `true`, prevents interaction and decreases the component's opacity. */
  @property({ reflect: true }) disabled = false;

  /** @copyDoc */
  @property() heading?: string;

  /** @copyDoc */
  @property({ type: Number, reflect: true }) headingLevel?: HeadingLevel;

  /** Specifies an icon to display. */
  @property({ reflect: true }) icon?: IconName;

  /** When `true` and the element direction is right-to-left (`"rtl"`), flips the component`s `icon`. */
  @property({ reflect: true }) iconFlipRtl = false;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /**
   * When `true`, enables focus trapping. Focus trapping is also prevented when `closed` or when `closable` is `false`.
   * @private
   */
  @property({ reflect: true }) focusTrapEnabled = false;

  /**
   * Specifies custom focus trap configuration on the component.
   *
   * - `"allowOutsideClick"` allows outside clicks.
   * - `"initialFocus"` enables initial focus.
   * - `"returnFocusOnDeactivate"` returns focus when not active.
   * - `"extraContainers"` specifies additional focusable elements external to the trap, such as 3rd-party components appending elements to the document body.
   * - `"setReturnFocus"` customizes the element to which focus is returned when the trap is deactivated. Return `false` to prevent focus return, or `undefined` to use the default behavior (returning focus to the element focused before activation).
   * @private
   */
  @property() focusTrapOptions?: Partial<FocusTrapOptions>;

  /** When `true`, the action menu items in the `header-menu-actions` slot are open. */
  @property({ reflect: true }) menuOpen = false;

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides & Panel["messageOverrides"];

  /** @copyDoc */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, the component is displayed within a parent `calcite-flow`. */
  @property({ reflect: true }) selected = false;

  /**
   * When `true`, displays a back button in the component's header.
   *
   * @internal
   */
  @property() showBackButton = false;

  /**
   * @copyDoc
   *
   * @see [MDN - Top Layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
   */
  @property({ reflect: true }) topLayerDisabled = false;

  //#endregion

  //#region Public Methods

  /**
   * Scrolls the component's content to a specified set of coordinates.
   *
   * @example
   * myCalciteFlowItem.scrollContentTo({
   *   left: 0, // Specifies the number of pixels along the X axis to scroll the window or element.
   *   top: 0, // Specifies the number of pixels along the Y axis to scroll the window or element
   *   behavior: "auto" // Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto, the default value).
   * });
   * @param options - allows specific coordinates to be defined.
   * @returns promise that resolves once the content is scrolled to.
   */
  @method()
  async scrollContentTo(options?: ScrollToOptions): Promise<void> {
    await this.containerRef.value?.scrollContentTo(options);
  }

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   * @returns promise.
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.containerRef.value?.setFocus(options);
  }

  /**
   * Updates the element(s) that are included in the focus-trap of the component.
   *
   * @param extraContainers - Additional elements to include in the focus trap. This is useful for including elements that may have related parts rendered outside the main focus trapping element.
   * @private
   */
  @method()
  async updateFocusTrapElements(
    extraContainers?: FocusTrapOptions["extraContainers"],
  ): Promise<void> {
    this.containerRef.value?.updateFocusTrapElements(extraContainers);
  }

  //#endregion

  //#region Events

  /** Fires when the component's back button is clicked. */
  calciteFlowItemBack = createEvent();

  /** Fires when the component's close button is clicked. */
  calciteFlowItemClose = createEvent({ cancelable: false });

  /** Fires when the component's content area is collapsed. */
  calciteFlowItemCollapse = createEvent({ cancelable: false });

  /** Fires when the component's content area is expanded. */
  calciteFlowItemExpand = createEvent({ cancelable: false });

  /** Fires when the component's content is scrolled. */
  calciteFlowItemScroll = createEvent({ cancelable: false });

  /** Fires when the component's collapse button is clicked. */
  calciteFlowItemToggle = createEvent({ cancelable: false });

  /** @private */
  calciteInternalFlowItemChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("selected") && (this.hasUpdated || this.selected !== false)) {
      this.calciteInternalFlowItemChange.emit();
    }
    if (changes.has("collapsed") && this.hasUpdated) {
      if (this.collapsed) {
        this.calciteFlowItemCollapse.emit();
      } else {
        this.calciteFlowItemExpand.emit();
      }
    }
  }

  //#endregion

  //#region Private Methods

  private handleInternalPanelScroll(event: CustomEvent<void>): void {
    if (event.target !== this.containerRef.value) {
      return;
    }

    event.stopPropagation();
    this.calciteFlowItemScroll.emit();
  }

  private handleInternalPanelClose(event: CustomEvent<void>): void {
    if (event.target !== this.containerRef.value) {
      return;
    }

    event.stopPropagation();
    this.closed = true;
    this.calciteFlowItemClose.emit();
  }

  private handleInternalPanelToggle(event: CustomEvent<void>): void {
    if (event.target !== this.containerRef.value) {
      return;
    }

    event.stopPropagation();
    this.collapsed = (event.target as Panel["el"]).collapsed;
    this.calciteFlowItemToggle.emit();
  }

  private backButtonClick(): void {
    this.calciteFlowItemBack.emit();
  }

  //#endregion

  //#region Rendering

  private renderBackButton(): JsxNode {
    const rtl = this.direction === "rtl";
    const { showBackButton, backButtonClick, messages } = this;
    const label = messages.back;
    const icon = rtl ? ICONS.backRight : ICONS.backLeft;

    return showBackButton ? (
      <calcite-action
        class={CSS.backButton}
        icon={icon}
        key="flow-back-button"
        onClick={backButtonClick}
        ref={this.backButtonRef}
        scale={this.scale}
        slot={SLOTS.headerActionsStart}
        text={label}
        title={label}
      />
    ) : null;
  }

  override render(): JsxNode {
    const {
      collapsed,
      collapseDirection,
      collapsible,
      closable,
      closed,
      description,
      disabled,
      heading,
      headingLevel,
      loading,
      menuOpen,
      messageOverrides,
      overlayPositioning,
      beforeClose,
      icon,
      iconFlipRtl,
      focusTrapEnabled,
      focusTrapOptions,
    } = this;
    return (
      <this.interactiveContainer disabled={disabled}>
        <calcite-panel
          beforeClose={beforeClose}
          closable={closable}
          closed={closed}
          collapsed={collapsed}
          collapseDirection={collapseDirection}
          collapsible={collapsible}
          description={description}
          disabled={disabled}
          focusTrapEnabled={focusTrapEnabled}
          focusTrapOptions={focusTrapOptions}
          heading={heading}
          headingLevel={headingLevel}
          icon={icon}
          iconFlipRtl={iconFlipRtl}
          loading={loading}
          menuOpen={menuOpen}
          messageOverrides={messageOverrides}
          oncalcitePanelClose={this.handleInternalPanelClose}
          oncalcitePanelScroll={this.handleInternalPanelScroll}
          oncalcitePanelToggle={this.handleInternalPanelToggle}
          overlayPositioning={overlayPositioning}
          ref={this.containerRef}
          scale={this.scale}
          topLayerDisabled={this.topLayerDisabled}
        >
          {this.renderBackButton()}
          <slot name={SLOTS.actionBar} slot={PANEL_SLOTS.actionBar} />
          <slot name={SLOTS.alerts} slot={PANEL_SLOTS.alerts} />
          <slot name={SLOTS.headerActionsStart} slot={PANEL_SLOTS.headerActionsStart} />
          <slot name={SLOTS.headerActionsEnd} slot={PANEL_SLOTS.headerActionsEnd} />
          <slot name={SLOTS.headerTop} slot={PANEL_SLOTS.headerTop} />
          <slot name={SLOTS.description} slot={PANEL_SLOTS.description} />
          <slot name={SLOTS.heading} slot={PANEL_SLOTS.heading} />
          <slot name={SLOTS.headerContent} slot={PANEL_SLOTS.headerContent} />
          <slot name={SLOTS.headerMenuActions} slot={PANEL_SLOTS.headerMenuActions} />
          <slot name={SLOTS.fab} slot={PANEL_SLOTS.fab} />
          <slot name={SLOTS.contentTop} slot={PANEL_SLOTS.contentTop} />
          <slot name={SLOTS.contentBottom} slot={PANEL_SLOTS.contentBottom} />
          <slot name={SLOTS.footerStart} slot={PANEL_SLOTS.footerStart} />
          <slot name={SLOTS.footer} slot={PANEL_SLOTS.footer} />
          <slot name={SLOTS.footerEnd} slot={PANEL_SLOTS.footerEnd} />
          <slot />
        </calcite-panel>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
