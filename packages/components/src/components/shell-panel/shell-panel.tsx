import interact from "interactjs";
import type { Interactable, ResizeEvent } from "@interactjs/types";
import { type PropertyValues } from "lit";
import { createEvent, h, JsxNode, LitElement, method, property, state } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { useDirection } from "@arcgis/lumina/controllers";
import { Panel } from "../panel/panel";
import { HeadingLevel } from "../functional/Heading";
import { CSS_UTILITY, resizeShiftStep, resizeStep } from "../../utils/resources";
import {
  defaultEndMenuPlacement,
  FlipPlacement,
  LogicalPlacement,
  OverlayPositioning,
} from "../../utils/floating-ui";
import { SLOTS as PANEL_SLOTS } from "../panel/resources";
import { getStylePixelValue, slotChangeGetAssignedElements } from "../../utils/dom";
import { getDimensionClass } from "../../utils/dynamicClasses";
import { useInteractive } from "../../controllers/useInteractive";
import type {
  CollapseDirection,
  Height,
  Layout,
  Position,
  ResizeValues,
  Scale,
  Width,
} from "../types";
import { ariaValueFromSize } from "../../utils/aria";
import { useT9n } from "../../controllers/useT9n";
import { useSizeOverride } from "../../controllers/useSizeOverride";
import { type FocusTrapOptions, useFocusTrap } from "../../controllers/useFocusTrap";
import { useFocusable } from "../../controllers/useFocusable";
import type { ActionBar } from "../action-bar/action-bar";
import { isActionBar } from "../action-bar/resources";
import type { IconName } from "../icon/types";
import { styles as animationStyles } from "../../styles/component/animation.scss";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS, SLOTS } from "./resources";
import type { DisplayMode } from "./types";
import { styles } from "./shell-panel.scss";

export type ShellPanelSizingData = {
  availableSize: number;
};

type ShellSizingDataProvider = (axis: "inline" | "block") => ShellPanelSizingData | null;

declare global {
  interface DeclareElements {
    "calcite-shell-panel": ShellPanel;
  }
}

/**
 * @slot - A slot for adding content.
 * @slot custom-content - A slot for displaying custom content in place of the built-in panel.
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the component.
 * @slot panel-action-bar - A slot for adding a `calcite-action-bar` to the panel.
 * @slot alerts - A slot for adding `calcite-alert`s to the component.
 * @slot content-bottom - A slot for adding content below the unnamed (default) slot and - if populated - the `footer` slot.
 * @slot content-top - A slot for adding content above the unnamed (default) slot and - if populated - below the `panel-action-bar` slot.
 * @slot header-actions-start - A slot for adding actions or content to the starting side of the component's header.
 * @slot header-actions-end - A slot for adding actions or content to the ending side of the component's header.
 * @slot header-top - A slot for adding custom content above the header actions and content.
 * @slot heading - A slot for adding content to the heading area of the default header. Takes precedence over the `heading` property.
 * @slot description - A slot for adding content to the description area of the default header. Takes precedence over the `description` property.
 * @slot header-content - A slot for adding custom content to the component's header.
 * @slot header-menu-actions - A slot for adding an overflow menu with actions inside a `calcite-dropdown`.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer - A slot for adding custom content to the component's footer. Should not be used with the `"footer-start"` or `"footer-end"` slots.
 * @slot footer-end - A slot for adding a trailing footer custom content. Should not be used with the `"footer"` slot.
 * @slot footer-start - A slot for adding a leading footer custom content. Should not be used with the `"footer"` slot.
 */
declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the component's background color.
     */
    "--calcite-shell-panel-background-color": "*";
    /**
     * Specifies the component's border color.
     */
    "--calcite-shell-panel-border-color": "*";
    /**
     * Specifies the component's corner radius.
     */
    "--calcite-shell-panel-corner-radius": "*";
    /**
     * Specifies the border color of the component's action menu and slotted popovers.
     */
    "--calcite-shell-panel-action-menu-border-color": "*";
    /**
     * Specifies the padding of the component's `content-top` slot.
     */
    "--calcite-shell-panel-content-top-space": "*";
    /**
     * Specifies the padding of the component's `content-bottom` slot.
     */
    "--calcite-shell-panel-content-bottom-space": "*";
    /**
     * Specifies the text color of the component's `description`.
     */
    "--calcite-shell-panel-description-text-color": "*";
    /**
     * Specifies the background color of the component's footer.
     */
    "--calcite-shell-panel-footer-background-color": "*";
    /**
     * Specifies the padding of the component's footer.
     */
    "--calcite-shell-panel-footer-space": "*";
    /**
     * Specifies the background color of the component's header actions.
     */
    "--calcite-shell-panel-header-action-background-color": "*";
    /**
     * Specifies the background color of the component's header actions when hovered.
     */
    "--calcite-shell-panel-header-action-background-color-hover": "*";
    /**
     * Specifies the background color of the component's header actions when pressed.
     */
    "--calcite-shell-panel-header-action-background-color-press": "*";
    /**
     * Specifies the text color of the component's header actions.
     */
    "--calcite-shell-panel-header-action-text-color": "*";
    /**
     * Specifies the text color of the component's header actions when pressed or hovered.
     */
    "--calcite-shell-panel-header-action-text-color-press": "*";
    /**
     * Specifies the background color of the component's header.
     */
    "--calcite-shell-panel-header-background-color": "*";
    /**
     * Specifies the padding of the component's `header-content` slot.
     */
    "--calcite-shell-panel-header-content-space": "*";
    /**
     * Specifies the padding of the component's `header-top` slot.
     */
    "--calcite-shell-panel-header-top-space": "*";
    /**
     * Specifies the text color of the component's `heading`.
     */
    "--calcite-shell-panel-heading-text-color": "*";
    /**
     * Specifies the color of the component's icon.
     */
    "--calcite-shell-panel-icon-color": "*";
    /**
     * Specifies the padding of the component's unnamed (default) slot.
     */
    "--calcite-shell-panel-space": "*";
    /**
     * When `layout` is `horizontal`, or `layout` is `vertical` and `displayMode` is `float-content` or `float` or `float-all`, specifies the component's height.
     */
    "--calcite-shell-panel-height": "*";
    /**
     * When `layout` is `horizontal`, or `layout` is `vertical` and `displayMode` is `float-content` or `float`, specifies the component's maximum height.
     */
    "--calcite-shell-panel-max-height": "*";
    /**
     * When `layout` is `horizontal`, or `layout` is `vertical` and `displayMode` is `float-content` or `float`, specifies the component's minimum height.
     */
    "--calcite-shell-panel-min-height": "*";
    /**
     * Specifies the component's maximum width.
     */
    "--calcite-shell-panel-max-width": "*";
    /**
     * Specifies the resize handle's text color.
     */
    "--calcite-shell-panel-resize-icon-color": "*";
    /**
     * When `displayMode` is `float-all`, `float-content`, or `overlay`, specifies the component's shadow.
     */
    "--calcite-shell-panel-shadow": "*";
    /**
     * Specifies the component's text color.
     */
    "--calcite-shell-panel-text-color": "*";
    /**
     * Specifies the component's width.
     */
    "--calcite-shell-panel-width": "*";
    /**
     * Specifies the component's z-index value.
     */
    "--calcite-shell-panel-z-index": "*";
  }
}

interface ShellPanelSlots {
  /**
   * A slot for adding custom content.
   */
  "": Node[];
  /**
   * A slot for adding a `calcite-action-bar` to the component.
   */
  "action-bar": Node[];
  /**
   * A slot for displaying custom content in place of the built-in panel.
   */
  "custom-content": Node[];
  /**
   * A slot for adding a `calcite-action-bar` to the panel.
   */
  "panel-action-bar": Node[];
  /**
   * A slot for adding `calcite-alert`s to the component.
   */
  alerts: Node[];
  /**
   * A slot for adding content below the unnamed (default) slot and - if populated - the `footer` slot.
   */
  "content-bottom": Node[];
  /**
   * A slot for adding content above the unnamed (default) slot and - if populated - below the `panel-action-bar` slot.
   */
  "content-top": Node[];
  /**
   * A slot for adding actions or content to the starting side of the component's header.
   */
  "header-actions-start": Node[];
  /**
   * A slot for adding actions or content to the ending side of the component's header.
   */
  "header-actions-end": Node[];
  /**
   * A slot for adding custom content to the component's header.
   */
  "header-content": Node[];
  /**
   * A slot for adding custom content above the header actions and content.
   */
  "header-top": Node[];
  /**
   * A slot for adding an overflow menu with actions inside a `calcite-dropdown`.
   */
  "header-menu-actions": Node[];
  /**
   * A slot for adding a `calcite-fab` (floating action button) to perform an action.
   */
  fab: Node[];
  /**
   * A slot for adding content to the heading area of the default header. Takes precedence over the `heading` property.
   */
  heading: Node[];
  /**
   * A slot for adding content to the description area of the default header. Takes precedence over the `description` property.
   */
  description: Node[];
  /**
   * A slot for adding custom content to the component's footer. Should not be used with the `"footer-start"` or `"footer-end"` slots.
   */
  footer: Node[];
  /**
   * A slot for adding a trailing footer custom content. Should not be used with the `"footer"` slot.
   */
  "footer-end": Node[];
  /**
   * A slot for adding a leading footer custom content. Should not be used with the `"footer"` slot.
   */
  "footer-start": Node[];
}

export class ShellPanel extends LitElement {
  //#region Type-only metadata members

  override ["@slots"]!: ShellPanelSlots;

  //#endregion

  //#region Static Members

  static override styles = [styles, animationStyles];

  //#endregion

  //#region Private Properties

  direction = useDirection();

  private resizeHandleRef = createRef<HTMLDivElement>();

  private interaction?: Interactable;

  private interactiveContainer = useInteractive(this);

  private actionBars: ActionBar["el"][] = [];

  private actionBarContainerEl?: HTMLDivElement;

  private contentRef = createRef<HTMLDivElement>();

  private panelRef = createRef<Panel["el"]>();

  private containerRef = createRef<HTMLDivElement>();

  private focusTrap = useFocusTrap<this>({
    focusTrapOptions: {
      fallbackFocus: () => this.containerRef.value!,
      checkCanFocusTrap: async () => {
        await this.updateComplete;
      },
      escapeDeactivates: (event) => {
        this.keyDownHandler(event);
        return false;
      },
    },
  })(this);

  private focusSetter = useFocusable<this>()(this);

  private keyDownHandler = (event: KeyboardEvent): void => {
    if (
      event.key !== "Escape" ||
      event.defaultPrevented ||
      this.collapsed ||
      this.collapseDisabled ||
      this.disabled
    ) {
      return;
    }

    event.preventDefault();
    this.collapsed = true;
  };

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private sizeOverride = useSizeOverride({
    targetElement: this.contentRef,
    getBounds: () => ({
      inline: { min: this.resizeValues.minInlineSize, max: this.getMaxInlineSize() },
      block: { min: this.resizeValues.minBlockSize, max: this.getMaxBlockSize() },
    }),
    onResize: () => this.updateResizeValues(),
  });

  //#endregion

  //#region State Properties

  @state() resizeValues: ResizeValues = {
    inlineSize: null,
    blockSize: null,
    minInlineSize: null,
    minBlockSize: null,
    maxInlineSize: null,
    maxBlockSize: null,
  };

  //#endregion

  //#region Public Properties

  /** When `true`, disables focus trapping and the internal panel's close button, which collapses the component's content area. */
  @property({ reflect: true }) collapseDisabled = false;

  /** When `panelCollapsible` is `true`, specifies the direction of the internal panel's collapse icon. */
  @property() panelCollapseDirection: CollapseDirection = "down";

  /** When `true`, hides the internal panel's content area. */
  @property({ reflect: true }) panelCollapsed = false;

  /** When `true`, the internal panel is collapsible. */
  @property({ reflect: true }) panelCollapsible = false;

  /** A description for the component. */
  @property() description?: string;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, prevents focus trapping. */
  @property({ reflect: true }) focusTrapDisabled = false;

  /**
   * Specifies custom focus trap configuration on the component.
   *
   * - `"allowOutsideClick"` allows outside clicks.
   * - `"initialFocus"` enables initial focus.
   * - `"returnFocusOnDeactivate"` returns focus when not active.
   * - `"extraContainers"` specifies additional focusable elements external to the trap, such as 3rd-party components appending elements to the document body.
   * - `"setReturnFocus"` customizes the element to which focus is returned when the trap is deactivated. Return `false` to prevent focus return, or `undefined` to use the default behavior (returning focus to the element focused before activation).
   */
  @property() focusTrapOptions?: Partial<FocusTrapOptions>;

  /** The component header text. */
  @property() heading?: string;

  /** Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling. */
  @property({ type: Number, reflect: true }) headingLevel?: HeadingLevel;

  /** Specifies an icon to display. */
  @property({ reflect: true, type: String }) icon?: IconName;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** @copyDoc */
  @property() menuFlipPlacements?: FlipPlacement[];

  /** When `true`, the action menu items in the `header-menu-actions` slot are open. */
  @property({ reflect: true }) menuOpen = false;

  /** Determines where the action menu will be positioned. */
  @property({ reflect: true }) menuPlacement: LogicalPlacement = defaultEndMenuPlacement;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * @copyDoc
   *
   * @see [MDN - Top Layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
   */
  @property({ reflect: true }) topLayerDisabled = false;

  /** When `true`, hides the component's content area. */
  @property({ reflect: true }) collapsed = false;

  /**
   * Specifies the component's display mode.
   *
   * - `"dock"` displays at full height adjacent to center content.
   * - `"overlay"` displays at full height on top of center content.
   * - `"float-content"` does not display at full height with content separately detached from `calcite-action-bar` on top of center content.
   * - `"float-all"` detaches the `calcite-panel` and `calcite-action-bar` on top of center content.
   * - `"float"` does not display at full height with content separately detached from `calcite-action-bar` on top of center content. [Deprecated] in v2.11.0, removal target v6.0.0 - use `"float-content"` instead.
   */
  @property({ reflect: true }) displayMode: DisplayMode = "dock";

  /**
   * When `layout` is `horizontal`, specifies the component's maximum height.
   *
   * @deprecated in v3.0.0, removal target v6.0.0 - Use the `height` property instead.
   */
  @property({ reflect: true }) heightScale?: Scale;

  /**
   * Specifies the component's direction.
   *
   * @deprecated in v5.0.0, removal target v6.0.0 -  No longer necessary.
   */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical", Layout> = "vertical";

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Specifies the component's position. Will be flipped when the element direction is right-to-left (`"rtl"`).
   *
   * @deprecated in v5.0.0, removal target v6.0.0 -  No longer necessary.
   */
  @property({ reflect: true }) position: Extract<"start" | "end", Position> = "start";

  /** When `true` and `displayMode` is `"dock"` or `"overlay"`, the component's content area is resizable. */
  @property({ reflect: true }) resizable = false;

  /** @internal */
  @property({ attribute: false }) shellSizingDataProvider?: ShellSizingDataProvider;

  /** @copyDoc */
  @property({ reflect: true }) height?: Height;

  /**
   * When `layout` is `vertical`, specifies the component's width.
   *
   * @deprecated in v3.0.0, removal target v6.0.0 -  Use the `width` property instead.
   */
  @property({ reflect: true }) widthScale: Scale = "m";

  /** Specifies the component's width. */
  @property({ reflect: true }) width?: Extract<Width, Scale>;

  //#endregion

  //#region Public Methods

  /**
   * Scrolls the component's content to a specified set of coordinates.
   *
   * @param options - Specifies the scroll coordinates and scrolling behavior.
   * @returns A promise that resolves after the scroll request is applied.
   */
  @method()
  async scrollContentTo(options?: ScrollToOptions): Promise<void> {
    await this.panelRef.value?.scrollContentTo(options);
  }

  /**
   * Sets focus on the component's first focusable element.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.el, options);
  }

  /**
   * Updates the element(s) that are included in the focus trap.
   *
   * @param extraContainers - Additional elements to include in the focus trap. This is useful for including elements that may have related parts rendered outside the main focus trapping element.
   */
  @method()
  async updateFocusTrapElements(
    extraContainers?: FocusTrapOptions["extraContainers"],
  ): Promise<void> {
    this.focusTrap.setExtraContainers(extraContainers);
    this.focusTrap.updateContainerElements();
  }

  /**
   * Updates the component's size by setting its inline and/or block dimensions.
   *
   * Use this method to programmatically override the component's width (inline) and/or height (block).
   * Pass `null` to clear the override and revert to the default or CSS variable size.
   */
  @method()
  async updateSize(size: { inline?: number | null; block?: number | null }): Promise<void> {
    this.updateSizeInternal(size);
  }

  //#endregion

  //#region Events

  /** @private */
  calciteInternalShellPanelResizeEnd = createEvent({ cancelable: false });

  /** @private */
  calciteInternalShellPanelResizeStart = createEvent({ cancelable: false });

  /** Fires when the component's content area is collapsed. */
  calciteShellPanelCollapse = createEvent({ cancelable: false });

  /** Fires when the component's content area is expanded. */
  calciteShellPanelExpand = createEvent({ cancelable: false });

  /** Fires when the content is scrolled. */
  calciteShellPanelScroll = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.keyDownHandler);
  }

  override connectedCallback(): void {
    if (this.hasUpdated) {
      this.refreshResize();
      this.updateFocusTrap();
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    let shouldRefreshResize = false;

    if (changes.has("layout") && (this.hasUpdated || this.layout !== "vertical")) {
      this.setActionBarsLayout(this.actionBars);
      this.updateSizeInternal({ inline: null, block: null }); // we clear sizing as it won't be applicable across axes
      shouldRefreshResize = true;
    }

    if (
      (changes.has("direction") && this.hasUpdated) ||
      (changes.has("position") && (this.hasUpdated || this.position !== "start"))
    ) {
      shouldRefreshResize = true;
    }

    if (
      (changes.has("collapsed") && (this.hasUpdated || this.collapsed !== false)) ||
      (changes.has("resizable") && (this.hasUpdated || this.resizable !== false)) ||
      changes.has("disabled")
    ) {
      shouldRefreshResize = !this.disabled && this.resizable && !this.collapsed;

      if (!shouldRefreshResize) {
        this.cleanUpInteractions();
      }
    }

    if (shouldRefreshResize) {
      this.refreshResize();
    }

    if (changes.has("collapsed") && this.hasUpdated) {
      if (this.collapsed) {
        this.calciteShellPanelCollapse.emit();
      } else {
        this.calciteShellPanelExpand.emit();
      }
    }
  }

  override updated(changes: PropertyValues<this>): void {
    if (
      changes.has("collapsed") ||
      changes.has("collapseDisabled") ||
      changes.has("disabled") ||
      changes.has("focusTrapDisabled")
    ) {
      this.updateFocusTrap();
    }
  }

  override disconnectedCallback(): void {
    this.cleanUpInteractions();
  }

  //#endregion

  //#region Private Methods

  focusTrapDisabledOverride(): boolean {
    return this.collapsed || this.collapseDisabled || this.disabled || this.focusTrapDisabled;
  }

  private updateFocusTrap(): void {
    if (this.focusTrapDisabledOverride()) {
      this.focusTrap.deactivate();
    } else {
      this.focusTrap.activate();
    }
  }

  private handleInternalPanelCloseClick(event: CustomEvent<void>): void {
    if (event.target !== this.panelRef.value) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.collapsed = true;
  }

  private handleInternalPanelToggle(event: CustomEvent<void>): void {
    const panel = this.panelRef.value;
    if (event.target !== panel) {
      return;
    }

    this.panelCollapsed = panel.collapsed;
  }

  private handleInternalPanelScroll(event: CustomEvent<void>): void {
    if (event.target !== this.panelRef.value) {
      return;
    }

    event.stopPropagation();
    this.calciteShellPanelScroll.emit();
  }

  /** Internal synchronous size-override update — calls the controller directly to avoid promise wrapping. */
  private updateSizeInternal(size: { inline?: number | null; block?: number | null }): void {
    if (!this.contentRef.value) {
      return;
    }
    this.sizeOverride.resize(size);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const { key, defaultPrevented, shiftKey } = event;
    const {
      position,
      layout,
      resizable,
      contentRef,
      resizeValues: { maxBlockSize, maxInlineSize, minBlockSize, minInlineSize },
    } = this;

    const arrowKeys =
      layout === "horizontal" ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"];

    const keys = [...arrowKeys, "Home", "End"];

    if (
      this.disabled ||
      !resizable ||
      !contentRef.value ||
      defaultPrevented ||
      !keys.includes(key)
    ) {
      return;
    }

    const rect = contentRef.value.getBoundingClientRect();
    const invertRTL = this.direction === "rtl" ? -1 : 1;
    const stepValue = shiftKey ? resizeShiftStep : resizeStep;

    switch (key) {
      case "ArrowUp":
        this.updateSizeInternal({
          block:
            rect.height + (layout === "horizontal" && position === "end" ? stepValue : -stepValue),
        });
        event.preventDefault();
        break;
      case "ArrowDown":
        this.updateSizeInternal({
          block:
            rect.height + (layout === "horizontal" && position === "end" ? -stepValue : stepValue),
        });
        event.preventDefault();
        break;
      case "ArrowLeft":
        this.updateSizeInternal({
          inline:
            rect.width +
            (layout === "vertical" && position === "end" ? stepValue : -stepValue) * invertRTL,
        });
        event.preventDefault();
        break;
      case "ArrowRight":
        this.updateSizeInternal({
          inline:
            rect.width +
            (layout === "vertical" && position === "end" ? -stepValue : stepValue) * invertRTL,
        });
        event.preventDefault();
        break;
      case "Home":
        this.updateSizeInternal(
          layout === "horizontal" ? { block: minBlockSize } : { inline: minInlineSize },
        );
        event.preventDefault();
        break;
      case "End":
        this.updateSizeInternal(
          layout === "horizontal" ? { block: maxBlockSize } : { inline: maxInlineSize },
        );
        event.preventDefault();
        break;
    }
  }

  private cleanUpInteractions(): void {
    this.interaction?.unset();
  }

  private updateResizeValues(): void {
    const { contentRef, layout } = this;

    if (!contentRef.value) {
      return;
    }

    const computedStyle = window.getComputedStyle(contentRef.value);
    const computedMaxInlineSize =
      getStylePixelValue(computedStyle.maxInlineSize) || window.innerWidth;
    const computedMaxBlockSize =
      getStylePixelValue(computedStyle.maxBlockSize) || window.innerHeight;
    const availableInlineSize = layout === "vertical" ? this.getAvailableInlineSize() : null;
    const availableBlockSize = layout === "horizontal" ? this.getAvailableBlockSize() : null;

    this.resizeValues = {
      inlineSize: getStylePixelValue(computedStyle.inlineSize),
      blockSize: getStylePixelValue(computedStyle.blockSize),
      minInlineSize: getStylePixelValue(computedStyle.minInlineSize),
      minBlockSize: getStylePixelValue(computedStyle.minBlockSize),
      maxInlineSize:
        availableInlineSize === null
          ? computedMaxInlineSize
          : Math.min(computedMaxInlineSize, availableInlineSize),
      maxBlockSize:
        availableBlockSize === null
          ? computedMaxBlockSize
          : Math.min(computedMaxBlockSize, availableBlockSize),
    };
  }

  private getAvailableBlockSize(): number | null {
    return this.getAvailableSize("block");
  }

  private getAvailableInlineSize(): number | null {
    return this.getAvailableSize("inline");
  }

  private getAvailableSize(axis: "inline" | "block"): number | null {
    const dimension = axis === "inline" ? "width" : "height";
    const shellSizingData = this.shellSizingDataProvider?.(axis);
    const actionBarContainerSize =
      this.actionBarContainerEl?.getBoundingClientRect()[dimension] ?? 0;
    const actionBarSize = Math.max(
      actionBarContainerSize,
      this.actionBars.reduce(
        (total, actionBar) => total + actionBar.getBoundingClientRect()[dimension],
        0,
      ),
    );

    if (!shellSizingData) {
      return null;
    }

    const { availableSize } = shellSizingData;
    const containerSpacingSize = this.getContainerSpacingSize(axis);
    const contentSpacingSize = this.getContentSpacingSize(axis);

    return Math.max(
      Math.floor(availableSize) -
        Math.ceil(actionBarSize) -
        Math.ceil(containerSpacingSize) -
        Math.ceil(contentSpacingSize),
      0,
    );
  }

  private getContentSpacingSize(axis: "inline" | "block"): number {
    const content = this.contentRef.value;

    if (!content) {
      return 0;
    }

    const computedStyle = window.getComputedStyle(content);

    return axis === "inline"
      ? getStylePixelValue(computedStyle.marginInlineStart) +
          getStylePixelValue(computedStyle.marginInlineEnd) +
          getStylePixelValue(computedStyle.borderInlineStartWidth) +
          getStylePixelValue(computedStyle.borderInlineEndWidth)
      : getStylePixelValue(computedStyle.marginBlockStart) +
          getStylePixelValue(computedStyle.marginBlockEnd) +
          getStylePixelValue(computedStyle.borderBlockStartWidth) +
          getStylePixelValue(computedStyle.borderBlockEndWidth);
  }

  private getContainerSpacingSize(axis: "inline" | "block"): number {
    const container = this.containerRef.value;

    if (!container) {
      return 0;
    }

    const computedStyle = window.getComputedStyle(container);

    return axis === "inline"
      ? getStylePixelValue(computedStyle.marginInlineStart) +
          getStylePixelValue(computedStyle.marginInlineEnd) +
          getStylePixelValue(computedStyle.borderInlineStartWidth) +
          getStylePixelValue(computedStyle.borderInlineEndWidth)
      : getStylePixelValue(computedStyle.marginBlockStart) +
          getStylePixelValue(computedStyle.marginBlockEnd) +
          getStylePixelValue(computedStyle.borderBlockStartWidth) +
          getStylePixelValue(computedStyle.borderBlockEndWidth);
  }

  private getMaxBlockSize(): number | null {
    const { layout, contentRef } = this;

    if (layout !== "horizontal") {
      return this.resizeValues.maxBlockSize;
    }

    if (!contentRef.value) {
      return this.resizeValues.maxBlockSize;
    }

    const computedStyle = window.getComputedStyle(contentRef.value);
    const cssMax = getStylePixelValue(computedStyle.maxBlockSize) || window.innerHeight;
    const availableBlockSize = this.getAvailableBlockSize();

    return availableBlockSize === null ? cssMax : Math.min(cssMax, availableBlockSize);
  }

  private getMaxInlineSize(): number | null {
    const { layout, contentRef } = this;

    if (layout !== "vertical") {
      return this.resizeValues.maxInlineSize;
    }

    if (!contentRef.value) {
      return this.resizeValues.maxInlineSize;
    }

    const computedStyle = window.getComputedStyle(contentRef.value);
    const cssMax = getStylePixelValue(computedStyle.maxInlineSize) || window.innerWidth;
    const availableInlineSize = this.getAvailableInlineSize();

    return availableInlineSize === null ? cssMax : Math.min(cssMax, availableInlineSize);
  }

  private async refreshResize(): Promise<void> {
    await this.componentOnReady();
    await this.updateComplete;
    this.updateResizeValues();
    this.setUpResizeInteractions();
  }

  private setUpResizeInteractions(): void {
    this.cleanUpInteractions();

    const { el, contentRef, resizable, position, collapsed, resizeHandleRef, layout } = this;
    const resizeHandle = resizeHandleRef.value;

    if (!contentRef.value || collapsed || this.disabled || !resizable || !resizeHandle) {
      return;
    }

    const rtl = this.direction === "rtl";
    const restrictSizeMin =
      this.resizeValues.minInlineSize === null || this.resizeValues.minBlockSize === null
        ? undefined
        : { width: this.resizeValues.minInlineSize, height: this.resizeValues.minBlockSize };

    this.interaction = interact(contentRef.value, { context: el.ownerDocument }).resizable({
      edges: {
        top: position === "end" && layout === "horizontal" ? resizeHandle : false,
        right: position === (rtl ? "end" : "start") && layout === "vertical" ? resizeHandle : false,
        bottom: position === "start" && layout === "horizontal" ? resizeHandle : false,
        left: position === (rtl ? "start" : "end") && layout === "vertical" ? resizeHandle : false,
      },
      modifiers: [interact.modifiers.restrictSize({ min: restrictSizeMin })],
      listeners: {
        resizestart: () => {
          this.calciteInternalShellPanelResizeStart.emit();
        },
        resizeend: () => {
          this.calciteInternalShellPanelResizeEnd.emit();
        },
        move: ({ rect }: ResizeEvent) => {
          const isBlock = layout === "horizontal";

          this.updateSize(isBlock ? { block: rect.height } : { inline: rect.width });
        },
      },
    });
  }

  private setActionBarsLayout(actionBars: ActionBar["el"][]): void {
    actionBars.forEach((actionBar) => (actionBar.layout = this.layout));
  }

  private handleActionBarSlotChange(event: Event): void {
    const actionBars = slotChangeGetAssignedElements(event).filter(isActionBar);

    this.actionBars = actionBars;
    this.setActionBarsLayout(actionBars);
  }

  private getResizeIcon(): IconName {
    const { layout } = this;

    return layout === "horizontal" ? ICONS.dragVertical : ICONS.dragHorizontal;
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const { collapsed, position, resizable, layout, displayMode, resizeValues } = this;

    const dir = this.direction;
    const isBlockPosition = layout === "horizontal";

    const separatorNode =
      !collapsed && resizable ? (
        <div
          ariaDisabled={this.disabled}
          ariaLabel={this.messages.resize}
          ariaOrientation={isBlockPosition ? "vertical" : "horizontal"}
          ariaValueMax={ariaValueFromSize(
            isBlockPosition ? "block" : "inline",
            resizeValues.maxBlockSize,
            resizeValues.maxInlineSize,
          )}
          ariaValueMin={ariaValueFromSize(
            isBlockPosition ? "block" : "inline",
            resizeValues.minBlockSize,
            resizeValues.minInlineSize,
          )}
          ariaValueNow={ariaValueFromSize(
            isBlockPosition ? "block" : "inline",
            resizeValues.blockSize,
            resizeValues.inlineSize,
          )}
          class={CSS.resizeHandle}
          key="resize-handle"
          onKeyDown={this.handleKeyDown}
          ref={this.resizeHandleRef}
          role="separator"
          tabIndex={this.disabled ? -1 : 0}
        >
          <div class={CSS.resizeHandleBar}>
            <calcite-icon icon={this.getResizeIcon()} scale="s" />
          </div>
        </div>
      ) : null;

    const getAnimationDir = (): string => {
      if (layout === "horizontal") {
        return position === "start"
          ? CSS_UTILITY.calciteAnimateInDown
          : CSS_UTILITY.calciteAnimateInUp;
      } else {
        const isStart =
          (dir === "ltr" && position === "end") || (dir === "rtl" && position === "start");
        return isStart ? CSS_UTILITY.calciteAnimateInLeft : CSS_UTILITY.calciteAnimateInRight;
      }
    };

    const contentNode = (
      <div class={CSS.contentContainer}>
        <div
          class={{
            [CSS_UTILITY.rtl]: dir === "rtl",
            [CSS.content]: true,
            [CSS.contentOverlay]: displayMode === "overlay",
            [CSS.floatContent]: displayMode === "float-content" || displayMode === "float",
            [CSS_UTILITY.calciteAnimate]: displayMode === "overlay",
            [getAnimationDir()]: displayMode === "overlay",
            [getDimensionClass("width", this.width, this.widthScale)]: !!(
              this.width || this.widthScale
            ),
            [getDimensionClass("height", this.height, this.heightScale)]: !!(
              this.height || this.heightScale
            ),
          }}
          hidden={collapsed}
          key="content"
          ref={this.contentRef}
        >
          <slot name={SLOTS.customContent}>
            <calcite-panel
              class={CSS.panel}
              closable={!this.collapseDisabled}
              closed={collapsed}
              collapsed={this.panelCollapsed}
              collapseDirection={this.panelCollapseDirection}
              collapsible={this.panelCollapsible}
              description={this.description}
              disabled={this.disabled}
              focusTrapDisabled={true}
              heading={this.heading}
              headingLevel={this.headingLevel}
              icon={this.icon}
              iconFlipRtl={this.iconFlipRtl}
              loading={this.loading}
              menuFlipPlacements={this.menuFlipPlacements}
              menuOpen={this.menuOpen}
              menuPlacement={this.menuPlacement}
              messageOverrides={this.messageOverrides}
              oncalcitePanelClose={this.handleInternalPanelCloseClick}
              oncalcitePanelScroll={this.handleInternalPanelScroll}
              oncalcitePanelToggle={this.handleInternalPanelToggle}
              overlayPositioning={this.overlayPositioning}
              ref={this.panelRef}
              scale={this.scale}
              topLayerDisabled={this.topLayerDisabled}
            >
              <slot name={SLOTS.panelActionBar} slot={PANEL_SLOTS.actionBar} />
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
          </slot>
          {separatorNode}
        </div>
      </div>
    );

    const actionBarNode = (
      <div class={CSS.actionBarContainer} key="action-bar-container">
        <slot name={SLOTS.actionBar} onSlotChange={this.handleActionBarSlotChange} />
      </div>
    );

    const mainNodes = [actionBarNode, contentNode];

    if (position === "end") {
      mainNodes.reverse();
    }

    return (
      <this.interactiveContainer disabled={this.disabled}>
        <div
          class={{ [CSS.container]: true, [CSS.floatAll]: displayMode === "float-all" }}
          ref={this.containerRef}
          tabIndex={-1}
        >
          {mainNodes}
        </div>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
