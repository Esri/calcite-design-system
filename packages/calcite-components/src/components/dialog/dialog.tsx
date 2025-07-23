// @ts-strict-ignore
import interact from "interactjs";
import type { DragEvent, Interactable, ResizeEvent } from "@interactjs/types";
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { createEvent, h, JsxNode, LitElement, method, property, state } from "@arcgis/lumina";
import { getStylePixelValue } from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { getDimensionClass } from "../../utils/dynamicClasses";
import { toggleOpenClose, OpenCloseComponent } from "../../utils/openCloseComponent";
import { Kind, Scale, Width } from "../interfaces";
import { SLOTS as PANEL_SLOTS } from "../panel/resources";
import { HeadingLevel } from "../functional/Heading";
import type { OverlayPositioning } from "../../utils/floating-ui";
import { useT9n } from "../../controllers/useT9n";
import type { Panel } from "../panel/panel";
import { FocusTrapOptions, useFocusTrap } from "../../controllers/useFocusTrap";
import { usePreventDocumentScroll } from "../../controllers/usePreventDocumentScroll";
import { resizeShiftStep } from "../../utils/resources";
import { useSetFocus } from "../../controllers/useSetFocus";
import { IconNameOrString } from "../icon/interfaces";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, initialDragPosition, initialResizePosition, SLOTS } from "./resources";
import { DialogDragPosition, DialogPlacement, DialogResizePosition } from "./interfaces";
import { styles } from "./dialog.scss";

declare global {
  interface DeclareElements {
    "calcite-dialog": Dialog;
  }
}

/**
 * @slot - A slot for adding content.
 * @slot content - [Deprecated] Use `custom-content` slot instead.
 * @slot custom-content - A slot for displaying custom content. Will prevent the rendering of any default Dialog UI, except for `box-shadow` and `corner-radius`.
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the component.
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
export class Dialog extends LitElement implements OpenCloseComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private dragPosition: DialogDragPosition = { ...initialDragPosition };

  focusTrap = useFocusTrap<this>({
    triggerProp: "open",
    focusTrapOptions: {
      // scrim closes on click, so we let it take over
      clickOutsideDeactivates: () => !this.modal || this.embedded,
      escapeDeactivates: (event) => {
        if (!event.defaultPrevented && !this.escapeDisabled) {
          this.open = false;
          event.preventDefault();
        }

        return false;
      },
    },
  })(this);

  usePreventDocumentScroll = usePreventDocumentScroll()(this);

  private interaction: Interactable;

  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.handleMutationObserver(),
  );

  private _open = false;

  openProp = "opened";

  transitionProp = "opacity" as const;

  private panelEl = createRef<Panel["el"]>();

  private resizePosition: DialogResizePosition = { ...initialResizePosition };

  transitionEl: HTMLDivElement;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region State Properties

  @state() assistiveText: string | null = null;

  @state() hasContentBottom = false;

  @state() hasContentTop = false;

  @state() hasFooter = true;

  @state() opened = false;

  @state() get preventDocumentScroll(): boolean {
    return !this.embedded && this.modal;
  }

  //#endregion

  //#region Public Properties

  /** Passes a function to run before the component closes. */
  @property() beforeClose: () => Promise<void>;

  /** When `true`, disables the component's close button. */
  @property({ reflect: true }) closeDisabled = false;

  /** A description for the component. */
  @property() description: string;

  /** When `true`, the component is draggable. */
  @property({ reflect: true }) dragEnabled = false;

  /**
   * This internal property, managed by a containing calcite-shell, is used
   * to inform the component if special configuration or styles are needed
   *
   * @private
   */
  @property() embedded = false;

  /**
   * When `true`, disables the default close on escape behavior.
   *
   * By default, an open dialog can be dismissed by pressing the Esc key.
   *
   * @see [Dialog Accessibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility).
   */
  @property({ reflect: true }) escapeDisabled = false;

  /**
   * Specifies custom focus trap configuration on the component, where
   *
   * `"allowOutsideClick`" allows outside clicks,
   * `"initialFocus"` enables initial focus,
   * `"returnFocusOnDeactivate"` returns focus when not active, and
   * `"extraContainers"` specifies additional focusable elements external to the trap (e.g., 3rd-party components appending elements to the document body).
   * `"setReturnFocus"` customizes the element to which focus is returned when the trap is deactivated. Return `false` to prevent focus return, or `undefined` to use the default behavior (returning focus to the element focused before activation).
   */
  @property() focusTrapOptions: Partial<FocusTrapOptions>;

  /** The component header text. */
  @property() heading: string;

  /** Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling. */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  /** Specifies the kind of the component, which will style the top border. */
  @property({ reflect: true }) kind: Extract<
    "brand" | "danger" | "info" | "success" | "warning",
    Kind
  >;

  /** Specifies an icon to display. */
  @property({ reflect: true }) icon: IconNameOrString;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** When `true`, the action menu items in the `header-menu-actions` slot are open. */
  @property({ reflect: true }) menuOpen = false;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** When `true`, displays a scrim blocking interaction underneath the component. */
  @property({ reflect: true }) modal = false;

  /** When `true` and `modal` is `false`, prevents focus trapping. */
  @property({ reflect: true }) focusTrapDisabled = false;

  /** When `true`, displays and positions the component. */
  @property({ reflect: true })
  get open(): boolean {
    return this._open;
  }
  set open(value: boolean) {
    const oldValue = this._open;
    if (value !== oldValue) {
      this.setOpenState(value);
    }
  }

  /** When `true`, disables the closing of the component when clicked outside. */
  @property({ reflect: true }) outsideCloseDisabled = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Specifies the placement of the dialog. */
  @property({ reflect: true }) placement: DialogPlacement = "center";

  /** When `true`, the component is resizable. */
  @property({ reflect: true }) resizable = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the width of the component.
   *
   * @deprecated Use the `width` property instead.
   */
  @property({ reflect: true }) widthScale: Scale = "m";

  /** Specifies the width of the component. */
  @property({ reflect: true }) width: Extract<Width, Scale>;

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
   * @param options
   * @returns - promise that resolves once the content is scrolled to.
   */
  @method()
  async scrollContentTo(options?: ScrollToOptions): Promise<void> {
    await this.panelEl.value?.scrollContentTo(options);
  }

  /**
   * Sets focus on the component's "close" button (the first focusable item).
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   * @returns {Promise<void>} - A promise that is resolved when the operation has completed.
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.panelEl.value ?? this.el;
    }, options);
  }

  /**
   * Updates the element(s) that are included in the focus-trap of the component.
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

  //#endregion

  //#region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteDialogBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteDialogBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteDialogClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteDialogOpen = createEvent({ cancelable: false });

  /** Fires when the content is scrolled. */
  calciteDialogScroll = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.setupInteractions();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */

    if (
      (changes.has("open") && (this.hasUpdated || this.open !== false)) ||
      (changes.has("placement") && (this.hasUpdated || this.placement !== "center")) ||
      (changes.has("resizable") && (this.hasUpdated || this.resizable !== false)) ||
      (changes.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== false))
    ) {
      this.setupInteractions();
    }

    if (
      changes.has("messages") ||
      (changes.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== false)) ||
      (changes.has("resizable") && (this.hasUpdated || this.resizable !== false))
    ) {
      this.updateAssistiveText();
    }

    if (changes.has("opened") && (this.hasUpdated || this.opened !== false)) {
      this.handleOpenedChange(this.opened);
    }
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.embedded = false;
    this.cleanupInteractions();
  }

  //#endregion

  //#region Private Methods

  /** When defined, provides a condition to disable focus trapping. When `true`, prevents focus trapping. */
  focusTrapDisabledOverride(): boolean {
    return !this.modal && this.focusTrapDisabled;
  }

  private updateAssistiveText(): void {
    const { messages } = this;
    this.assistiveText =
      messages && (this.dragEnabled || this.resizable)
        ? `${this.dragEnabled ? messages.dragEnabled : ""} ${this.resizable ? messages.resizeEnabled : ""}`
        : null;
  }

  onBeforeOpen(): void {
    this.calciteDialogBeforeOpen.emit();
  }

  onOpen(): void {
    if (this.focusTrapDisabled) {
      this.setFocus();
    }
    this.focusTrap.activate();
    this.calciteDialogOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteDialogBeforeClose.emit();
  }

  onClose(): void {
    this.focusTrap.deactivate();
    this.calciteDialogClose.emit();
  }

  private async setOpenState(value: boolean): Promise<void> {
    if (this.beforeClose && !value) {
      try {
        await this.beforeClose?.();
      } catch {
        return;
      }
    }

    this._open = value;

    if (value) {
      await this.componentOnReady();
    }

    this.opened = value;
  }

  private handleOpenedChange(value: boolean): void {
    const { transitionEl } = this;

    if (!transitionEl) {
      return;
    }

    transitionEl.classList.toggle(CSS.openingActive, value);
    toggleOpenClose(this);
  }

  private async triggerInteractModifiers(): Promise<void> {
    const { interaction } = this;

    if (!interaction) {
      return;
    }

    await interaction.reflow({
      name: "drag",
    });

    await interaction.reflow({
      name: "resize",
    });
  }

  private getTransitionElDOMRect(): DOMRect {
    return this.transitionEl.getBoundingClientRect();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const { key, shiftKey, defaultPrevented } = event;
    const { dragEnabled, resizable, resizePosition, dragPosition, transitionEl } = this;

    const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    if (defaultPrevented || !keys.includes(key)) {
      return;
    }

    switch (key) {
      case "ArrowUp":
        if (shiftKey && resizable && transitionEl) {
          const { minBlockSize } = window.getComputedStyle(transitionEl);
          const minHeight = getStylePixelValue(minBlockSize);
          const height = this.getTransitionElDOMRect().height;

          if (height <= minHeight) {
            return;
          }

          this.updateSize({
            size: height - resizeShiftStep,
            type: "blockSize",
          });
          resizePosition.bottom -= resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        } else if (dragEnabled) {
          dragPosition.y -= resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        }
        break;
      case "ArrowDown":
        if (shiftKey && resizable && transitionEl) {
          this.updateSize({
            size: this.getTransitionElDOMRect().height + resizeShiftStep,
            type: "blockSize",
          });
          resizePosition.bottom += resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        } else if (dragEnabled) {
          dragPosition.y += resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        }
        break;
      case "ArrowLeft":
        if (shiftKey && resizable && transitionEl) {
          const { minInlineSize } = window.getComputedStyle(transitionEl);
          const minWidth = getStylePixelValue(minInlineSize);
          const width = this.getTransitionElDOMRect().width;

          if (width <= minWidth) {
            return;
          }

          this.updateSize({
            size: width - resizeShiftStep,
            type: "inlineSize",
          });
          resizePosition.right -= resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        } else if (dragEnabled) {
          dragPosition.x -= resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        }
        break;
      case "ArrowRight":
        if (shiftKey && resizable && transitionEl) {
          this.updateSize({
            size: this.getTransitionElDOMRect().width + resizeShiftStep,
            type: "inlineSize",
          });
          resizePosition.right += resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        } else if (dragEnabled) {
          dragPosition.x += resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        }
        break;
    }
  }

  private updateTransform(): void {
    const {
      dragPosition: { x, y },
      resizePosition,
      transitionEl,
      dragEnabled,
      resizable,
    } = this;

    if (!transitionEl) {
      return;
    }

    if (!dragEnabled && !resizable) {
      transitionEl.style.transform = null;
      return;
    }

    const { top, right, bottom, left } = this.getAdjustedResizePosition(resizePosition);

    const translateX = Math.round(x + left + right);
    const translateY = Math.round(y + top + bottom);

    transitionEl.style.transform =
      translateX || translateY ? `translate(${translateX}px, ${translateY}px)` : null;
  }

  private updateSize({
    type,
    size,
  }: {
    type: "inlineSize" | "blockSize";
    size: number | null;
  }): void {
    const { transitionEl } = this;

    if (!transitionEl) {
      return;
    }

    transitionEl.style[type] = size !== null ? `${Math.round(size)}px` : null;
  }

  private cleanupInteractions(): void {
    this.interaction?.unset();
    this.updateSize({ size: null, type: "inlineSize" });
    this.updateSize({ size: null, type: "blockSize" });
    this.dragPosition = { ...initialDragPosition };
    this.resizePosition = { ...initialResizePosition };
    this.updateTransform();
  }

  private async setupInteractions(): Promise<void> {
    this.cleanupInteractions();

    const { el, transitionEl, resizable, dragEnabled, resizePosition, dragPosition } = this;

    if (!transitionEl || !this.open) {
      return;
    }

    if (resizable || dragEnabled) {
      this.interaction = interact(transitionEl, { context: el.ownerDocument });
    }

    if (resizable) {
      await this.el.componentOnReady();

      const { minInlineSize, minBlockSize, maxInlineSize, maxBlockSize } =
        window.getComputedStyle(transitionEl);

      this.interaction.resizable({
        edges: {
          top: true,
          right: true,
          bottom: true,
          left: true,
        },
        modifiers: [
          interact.modifiers.restrictSize({
            min: {
              width: getStylePixelValue(minInlineSize),
              height: getStylePixelValue(minBlockSize),
            },
            max: {
              width: getStylePixelValue(maxInlineSize) || window.innerWidth,
              height: getStylePixelValue(maxBlockSize) || window.innerHeight,
            },
          }),
          interact.modifiers.restrict({
            restriction: "parent",
          }),
        ],
        listeners: {
          move: ({ rect, deltaRect }: ResizeEvent) => {
            if (deltaRect) {
              resizePosition.top += deltaRect.top;
              resizePosition.right += deltaRect.right;
              resizePosition.bottom += deltaRect.bottom;
              resizePosition.left += deltaRect.left;
            }
            this.updateSize({ size: rect.width, type: "inlineSize" });
            this.updateSize({ size: rect.height, type: "blockSize" });
            this.updateTransform();
          },
        },
      });
    }

    if (dragEnabled) {
      this.interaction.draggable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
          }),
        ],
        listeners: {
          move: ({ dx, dy }: DragEvent) => {
            dragPosition.x += dx;
            dragPosition.y += dy;
            this.updateTransform();
          },
        },
      });
    }
  }

  private getAdjustedResizePosition({
    top,
    right,
    bottom,
    left,
  }: DialogResizePosition): DialogResizePosition {
    const halfTop = top / 2;
    const halfRight = right / 2;
    const halfBottom = bottom / 2;
    const halfLeft = left / 2;

    switch (this.placement) {
      case "top":
        return { top, right: halfRight, bottom: 0, left: halfLeft };
      case "top-start":
        return { top, right: 0, bottom: 0, left };
      case "top-end":
        return { top, right, bottom: 0, left: 0 };
      case "bottom":
        return { top: 0, right: halfRight, bottom, left: halfLeft };
      case "bottom-start":
        return { top: 0, right: 0, bottom, left };
      case "bottom-end":
        return { top: 0, right, bottom, left: 0 };
      case "cover":
      case "center":
      default:
        return {
          top: halfTop,
          right: halfRight,
          bottom: halfBottom,
          left: halfLeft,
        };
    }
  }

  private setTransitionEl(el: HTMLDivElement): void {
    if (!el) {
      return;
    }

    this.transitionEl = el;
    this.setupInteractions();
  }

  private handleInternalPanelScroll(event: CustomEvent<void>): void {
    if (event.target !== this.panelEl.value) {
      return;
    }

    event.stopPropagation();
    this.calciteDialogScroll.emit();
  }

  private handleInternalPanelCloseClick(event: CustomEvent<void>): void {
    if (event.target !== this.panelEl.value) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.open = false;
  }

  private handlePanelKeyDown(event: KeyboardEvent): void {
    if (this.escapeDisabled && event.key === "Escape") {
      event.preventDefault();
    }
  }

  private handleOutsideClose(): void {
    if (this.outsideCloseDisabled) {
      return;
    }

    this.open = false;
  }

  private handleMutationObserver(): void {
    this.focusTrap.updateContainerElements();
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const { assistiveText, description, heading, opened, icon, iconFlipRtl } = this;
    return (
      <div
        class={{
          [CSS.container]: true,
          [CSS.containerOpen]: opened,
          [CSS.containerEmbedded]: this.embedded,
        }}
      >
        {this.modal ? <calcite-scrim class={CSS.scrim} onClick={this.handleOutsideClose} /> : null}
        <div
          ariaDescription={description}
          ariaLabel={heading}
          ariaModal={this.modal}
          class={{
            [CSS.dialog]: true,
            [getDimensionClass("width", this.width, this.widthScale)]: !!(
              this.width || this.widthScale
            ),
          }}
          onKeyDown={this.handleKeyDown}
          ref={this.setTransitionEl}
          role="dialog"
        >
          {assistiveText ? (
            <div ariaLive="polite" class={CSS.assistiveText} key="assistive-text">
              {assistiveText}
            </div>
          ) : null}
          <slot name={SLOTS.customContent}>
            <slot name={SLOTS.content}>
              <calcite-panel
                class={CSS.panel}
                closable={!this.closeDisabled}
                description={description}
                heading={heading}
                headingLevel={this.headingLevel}
                icon={icon}
                iconFlipRtl={iconFlipRtl}
                loading={this.loading}
                menuOpen={this.menuOpen}
                messageOverrides={this.messageOverrides}
                onKeyDown={this.handlePanelKeyDown}
                oncalcitePanelClose={this.handleInternalPanelCloseClick}
                oncalcitePanelScroll={this.handleInternalPanelScroll}
                overlayPositioning={this.overlayPositioning}
                ref={this.panelEl}
                scale={this.scale}
              >
                <slot name={SLOTS.actionBar} slot={PANEL_SLOTS.actionBar} />
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
          </slot>
        </div>
      </div>
    );
  }

  //#endregion
}
