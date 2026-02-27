// @ts-strict-ignore
import interact from "interactjs";
import type { Interactable, ResizeEvent } from "@interactjs/types";
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, state, JsxNode, method } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { Panel } from "../panel/panel";
import { HeadingLevel } from "../functional/Heading";
import { CSS_UTILITY } from "../../utils/resources";
import { OverlayPositioning } from "../../utils/floating-ui";
import { SLOTS as PANEL_SLOTS } from "../panel/resources";
import { getElementDir, getStylePixelValue, slotChangeGetAssignedElements } from "../../utils/dom";
import { getDimensionClass } from "../../utils/dynamicClasses";
import { Height, Layout, Position, Scale, Width } from "../interfaces";
import { ariaValueFromSize } from "../../utils/aria";
import { useT9n } from "../../controllers/useT9n";
import { useSizeOverride } from "../../controllers/useSizeOverride";
import type { ActionBar } from "../action-bar/action-bar";
import { resizeStep, resizeShiftStep } from "../../utils/resources";
import { IconName } from "../icon/interfaces";
import { styles as animationStyles } from "../../styles/component/animation.scss";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS, SLOTS } from "./resources";
import { DisplayMode, ResizeValues } from "./interfaces";
import { styles } from "./shell-panel.scss";

declare global {
  interface DeclareElements {
    "calcite-shell-panel": ShellPanel;
  }
}

/**
 * @slot - A slot for adding content.
 * @slot custom-content - A slot for displaying custom content. Will prevent the rendering of any default Dialog UI, except for `box-shadow` and `corner-radius`.
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the component.
 * @slot panel-action-bar - A slot for adding a `calcite-action-bar` to the panel.
 * @slot alerts - A slot for adding `calcite-alert`s to the component.
 * @slot content-bottom - A slot for adding content below the unnamed (default) slot and - if populated - the `footer` slot.
 * @slot content-top - A slot for adding content above the unnamed (default) slot and - if populated - below the `action-bar` slot.
 * @slot header-actions-start - A slot for adding actions or content to the starting side of the component's header.
 * @slot header-actions-end - A slot for adding actions or content to the ending side of the component's header.
 * @slot header-content - A slot for adding custom content to the component's header.
 * @slot header-menu-actions - A slot for adding an overflow menu with actions inside a `calcite-dropdown`.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer - A slot for adding custom content to the component's footer. Should not be used with the `"footer-start"` or `"footer-end"` slots.
 * @slot footer-end - A slot for adding a trailing footer custom content. Should not be used with the `"footer"` slot.
 * @slot footer-start - A slot for adding a leading footer custom content. Should not be used with the `"footer"` slot.
 */
export class ShellPanel extends LitElement {
  //#region Static Members

  static override styles = [styles, animationStyles];

  //#endregion

  //#region Private Properties

  private resizeHandleEl: HTMLDivElement;

  private interaction: Interactable;

  private actionBars: ActionBar["el"][] = [];

  private contentRef = createRef<HTMLDivElement>();

  private panelRef = createRef<Panel["el"]>();

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private sizeOverride = useSizeOverride({
    targetElement: this.contentRef,
    getBounds: () => ({
      inline: { min: this.resizeValues.minInlineSize, max: this.resizeValues.maxInlineSize },
      block: { min: this.resizeValues.minBlockSize, max: this.resizeValues.maxBlockSize },
    }),
    onResize: (resizeValues) => {
      this.resizeValues = resizeValues;
    },
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

  /** When `true`, disables the component's close button. */
  @property({ reflect: true }) closeDisabled = false;

  /** A description for the component. */
  @property() description: string;

  /** The component header text. */
  @property() heading: string;

  /** Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling. */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  /** Specifies an icon to display. */
  @property({ reflect: true, type: String }) icon: IconName;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** When `true`, the action menu items in the `header-menu-actions` slot are open. */
  @property({ reflect: true }) menuOpen = false;

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

  /** When `true`, hides the component's content area. */
  @property({ reflect: true }) collapsed = false;

  /**
   * Specifies the component's display mode, where:
   *
   * `"dock"` displays at full height adjacent to center content,
   *
   * `"overlay"` displays at full height on top of center content, and
   *
   * `"float"` [Deprecated] does not display at full height with content separately detached from `calcite-action-bar` on top of center content.
   *
   * `"float-content"` does not display at full height with content separately detached from `calcite-action-bar` on top of center content.
   *
   * `"float-all"` detaches the `calcite-panel` and `calcite-action-bar` on top of center content.
   */
  @property({ reflect: true }) displayMode: DisplayMode = "dock";

  /**
   * When `layout` is `horizontal`, specifies the component's maximum height.
   *
   * @deprecated in v3.0.0, removal target v6.0.0 - Use the `height` property instead.
   */
  @property({ reflect: true }) heightScale: Scale;

  /**
   * Specifies the component's direction.
   *
   * @deprecated in v4.0.0, removal target v6.0.0 -  No longer necessary.
   */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical", Layout> = "vertical";

  /** Overrides individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Specifies the component's position. Will be flipped when the element direction is right-to-left (`"rtl"`).
   *
   * @deprecated in v4.0.0, removal target v6.0.0 -  No longer necessary.
   */
  @property({ reflect: true }) position: Extract<"start" | "end", Position> = "start";

  /** When `true` and `displayMode` is `"dock"` or `"overlay"`, the component's content area is resizable. */
  @property({ reflect: true }) resizable = false;

  /** Specifies the component's height. */
  @property({ reflect: true }) height: Height;

  /**
   * When `layout` is `vertical`, specifies the component's width.
   *
   * @deprecated in v3.0.0, removal target v6.0.0 -  Use the `width` property instead.
   */
  @property({ reflect: true }) widthScale: Scale = "m";

  /** Specifies the component's width. */
  @property({ reflect: true }) width: Extract<Width, Scale>;

  //#endregion

  //#region Public Methods

  /**
   * Updates the component's size by setting its inline and/or block dimensions.
   *
   * Use this method to programmatically override the components's width (inline) and/or height (block).
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

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("layout") && (this.hasUpdated || this.layout !== "vertical")) {
      this.setActionBarsLayout(this.actionBars);
    }
    if (changes.has("collapsed") && this.hasUpdated) {
      if (this.collapsed) {
        this.calciteShellPanelCollapse.emit();
      } else {
        this.calciteShellPanelExpand.emit();
      }
    }
  }

  override disconnectedCallback(): void {
    this.cleanupInteractions();
  }

  //#endregion

  //#region Private Methods

  private handleInternalPanelCloseClick(event: CustomEvent<void>): void {
    if (event.target !== this.panelRef.value) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.collapsed = false;
  }

  private handleInternalPanelScroll(event: CustomEvent<void>): void {
    if (event.target !== this.panelRef.value) {
      return;
    }

    event.stopPropagation();
    this.calciteShellPanelScroll.emit();
  }

  private getContentElDOMRect(): DOMRect {
    return this.contentRef.value.getBoundingClientRect();
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
      el,
      resizeValues: { maxBlockSize, maxInlineSize, minBlockSize, minInlineSize },
    } = this;

    const arrowKeys =
      layout === "horizontal" ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"];

    const keys = [...arrowKeys, "Home", "End"];

    if (!resizable || !contentRef.value || defaultPrevented || !keys.includes(key)) {
      return;
    }

    const rect = this.getContentElDOMRect();
    const invertRTL = getElementDir(el) === "rtl" ? -1 : 1;
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

  private cleanupInteractions(): void {
    this.interaction?.unset();
  }

  private async setupInteractions(): Promise<void> {
    this.cleanupInteractions();

    const { el, contentRef, resizable, position, collapsed, resizeHandleEl, layout } = this;

    if (!contentRef.value || collapsed || !resizable || !resizeHandleEl) {
      return;
    }

    await this.el.componentOnReady();

    const { inlineSize, minInlineSize, blockSize, minBlockSize, maxInlineSize, maxBlockSize } =
      window.getComputedStyle(contentRef.value);

    const values: ResizeValues = {
      inlineSize: getStylePixelValue(inlineSize),
      blockSize: getStylePixelValue(blockSize),
      minInlineSize: getStylePixelValue(minInlineSize),
      minBlockSize: getStylePixelValue(minBlockSize),
      maxInlineSize: getStylePixelValue(maxInlineSize) || window.innerWidth,
      maxBlockSize: getStylePixelValue(maxBlockSize) || window.innerHeight,
    };

    this.resizeValues = values;

    const rtl = getElementDir(el) === "rtl";

    this.interaction = interact(contentRef.value, { context: el.ownerDocument }).resizable({
      edges: {
        top: position === "end" && layout === "horizontal" ? resizeHandleEl : false,
        right:
          position === (rtl ? "end" : "start") && layout === "vertical" ? resizeHandleEl : false,
        bottom: position === "start" && layout === "horizontal" ? resizeHandleEl : false,
        left:
          position === (rtl ? "start" : "end") && layout === "vertical" ? resizeHandleEl : false,
      },
      modifiers: [
        interact.modifiers.restrictSize({
          min: {
            width: values.minInlineSize,
            height: values.minBlockSize,
          },
          max: {
            width: values.maxInlineSize,
            height: values.maxBlockSize,
          },
        }),
      ],
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

  private setResizeHandleEl(el: HTMLDivElement): void {
    this.resizeHandleEl = el;
    this.setupInteractions();
  }

  private setActionBarsLayout(actionBars: ActionBar["el"][]): void {
    actionBars.forEach((actionBar) => (actionBar.layout = this.layout));
  }

  private handleActionBarSlotChange(event: Event): void {
    const actionBars = slotChangeGetAssignedElements(event).filter((el): el is ActionBar["el"] =>
      el?.matches("calcite-action-bar"),
    );

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

    const dir = getElementDir(this.el);
    const isBlockPosition = layout === "horizontal";

    const separatorNode =
      !collapsed && resizable ? (
        <div
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
          ref={this.setResizeHandleEl}
          role="separator"
          tabIndex={0}
          touch-action="none"
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
              closable={!this.closeDisabled}
              description={this.description}
              heading={this.heading}
              headingLevel={this.headingLevel}
              icon={this.icon}
              iconFlipRtl={this.iconFlipRtl}
              loading={this.loading}
              menuOpen={this.menuOpen}
              messageOverrides={this.messageOverrides}
              oncalcitePanelClose={this.handleInternalPanelCloseClick}
              oncalcitePanelScroll={this.handleInternalPanelScroll}
              overlayPositioning={this.overlayPositioning}
              ref={this.panelRef}
              scale={this.scale}
            >
              <slot name={SLOTS.panelActionBar} slot={PANEL_SLOTS.actionBar} />
              <slot name={SLOTS.alerts} slot={PANEL_SLOTS.alerts} />
              <slot name={SLOTS.headerActionsStart} slot={PANEL_SLOTS.headerActionsStart} />
              <slot name={SLOTS.headerActionsEnd} slot={PANEL_SLOTS.headerActionsEnd} />
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
      <div class={{ [CSS.container]: true, [CSS.floatAll]: displayMode === "float-all" }}>
        {mainNodes}
      </div>
    );
  }

  //#endregion
}
