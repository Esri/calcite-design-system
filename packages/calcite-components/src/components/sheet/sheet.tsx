// @ts-strict-ignore
import interact from "interactjs";
import type { Interactable, ResizeEvent } from "@interactjs/types";
import { PropertyValues } from "lit";
import {
  createEvent,
  h,
  method,
  state,
  JsxNode,
  LitElement,
  property,
  setAttribute,
} from "@arcgis/lumina";
import { ensureId, focusFirstTabbable, getElementDir, isPixelValue } from "../../utils/dom";
import { componentFocusable } from "../../utils/component";
import { createObserver } from "../../utils/observers";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { getDimensionClass } from "../../utils/dynamicClasses";
import { Height, LogicalFlowPosition, Scale, Width } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { clamp } from "../../utils/math";
import { useT9n } from "../../controllers/useT9n";
import { usePreventDocumentScroll } from "../../controllers/usePreventDocumentScroll";
import { FocusTrapOptions, useFocusTrap } from "../../controllers/useFocusTrap";
import { CSS, sheetResizeStep, sheetResizeShiftStep } from "./resources";
import { DisplayMode, ResizeValues } from "./interfaces";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./sheet.scss";

declare global {
  interface DeclareElements {
    "calcite-sheet": Sheet;
  }
}

/** @slot - A slot for adding custom content. */
export class Sheet extends LitElement implements OpenCloseComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private contentEl: HTMLDivElement;

  private contentId: string;

  focusTrap = useFocusTrap<this>({
    triggerProp: "open",
    focusTrapOptions: {
      // scrim closes on click, so we let it take over
      clickOutsideDeactivates: false,
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

  private ignoreOpenChange = false;

  private interaction: Interactable;

  messages = useT9n<typeof T9nStrings>();

  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.handleMutationObserver(),
  );

  private _open = false;

  private openEnd = (): void => {
    this.setFocus();
    this.el.removeEventListener(
      "calciteSheetOpen",
      this.openEnd,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
  };

  openProp = "opened";

  transitionProp = "opacity" as const;

  private resizeHandleEl: HTMLDivElement;

  transitionEl: HTMLDivElement;

  // #endregion

  // #region State Properties

  @state() resizeValues: ResizeValues = {
    inlineSize: 0,
    blockSize: 0,
    minInlineSize: 0,
    minBlockSize: 0,
    maxInlineSize: 0,
    maxBlockSize: 0,
  };

  @state() get preventDocumentScroll(): boolean {
    return !this.embedded;
  }

  // #endregion

  // #region Public Properties

  /**
   * Passes a function to run before the component closes.
   *
   * @returns {Promise<void>}
   */
  @property() beforeClose: (el: Sheet["el"]) => Promise<void>;

  /**
   * Specifies the display mode - `"float"` (content is separated detached),
   * or `"overlay"` (displays on top of center content).
   */
  @property({ reflect: true }) displayMode: DisplayMode = "overlay";

  /**
   * This internal property, managed by a containing calcite-shell, is used
   * to inform the component if special configuration or styles are needed
   *
   * @private
   */
  @property() embedded = false;

  /** When `true`, disables the default close on escape behavior. */
  @property({ reflect: true }) escapeDisabled = false;

  /** When `true`, prevents focus trapping. */
  @property({ reflect: true }) focusTrapDisabled = false;

  /**
   * Specifies custom focus trap configuration on the component, where
   *
   * `"allowOutsideClick`" allows outside clicks,
   * `"initialFocus"` enables initial focus,
   * `"returnFocusOnDeactivate"` returns focus when not active, and
   * `"extraContainers"` specifies additional focusable elements external to the trap (e.g., 3rd-party components appending elements to the document body).
   */
  @property() focusTrapOptions: Partial<FocusTrapOptions>;

  /**
   * When `position` is `"block-start"` or `"block-end"`, specifies the height of the component.
   *
   * @deprecated Use the `height` property instead.
   */
  @property({ reflect: true }) heightScale: Scale = "m";

  /** Specifies the height of the component. */
  @property({ reflect: true }) height: Height;

  /**
   * Specifies the label of the component.
   *
   * @required
   */
  @property() label: string;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** When `true`, displays and positions the component. */
  @property({ reflect: true })
  get open(): boolean {
    return this._open;
  }

  set open(open: boolean) {
    const oldOpen = this._open;
    if (open !== oldOpen) {
      this._open = open;
      this.toggleSheet(open);
    }
  }

  /**
   * We use an internal property to handle styles for when a modal is actually opened, not just when the open attribute is applied. This is a property because we need to apply styles to the host element and to keep the styles present while beforeClose is .
   *
   * @private
   */
  @property({ reflect: true }) opened = false;

  /** When `true`, disables the closing of the component when clicked outside. */
  @property({ reflect: true }) outsideCloseDisabled = false;

  /** Determines where the component will be positioned. */
  @property({ reflect: true }) position: LogicalFlowPosition = "inline-start";

  /** When `true`, the component is resizable. */
  @property({ reflect: true }) resizable = false;

  /** When `position` is `"inline-start"` or `"inline-end"`, specifies the width of the component. */

  /**
   * When `position` is `"inline-start"` or `"inline-end"`, specifies the width of the component.
   *
   * @deprecated Use the `width` property instead.
   */
  @property({ reflect: true }) widthScale: Scale = "m";

  /** Specifies the width of the component. */
  @property({ reflect: true }) width: Extract<Width, Scale>;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component's "close" button - the first focusable item. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.el);
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

  // #endregion

  // #region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteSheetBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteSheetBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteSheetClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteSheetOpen = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.keyDownHandler);
  }

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.setupInteractions();
  }

  load(): void {
    // when sheet initially renders, if active was set we need to open as watcher doesn't fire
    if (this.open) {
      this.openSheet();
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("opened") && (this.hasUpdated || this.opened !== false)) {
      onToggleOpenCloseComponent(this);
    }

    if (
      (changes.has("open") && (this.hasUpdated || this.open !== false)) ||
      (changes.has("position") && (this.hasUpdated || this.position !== "inline-start")) ||
      (changes.has("resizable") && (this.hasUpdated || this.resizable !== false))
    ) {
      this.setupInteractions();
    }
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.embedded = false;
    this.cleanupInteractions();
  }

  // #endregion

  // #region Private Methods

  private keyDownHandler = (event: KeyboardEvent): void => {
    const { defaultPrevented, key } = event;

    if (
      !defaultPrevented &&
      !this.escapeDisabled &&
      this.focusTrapDisabled &&
      this.open &&
      key === "Escape"
    ) {
      event.preventDefault();
      this.open = false;
    }
  };

  private toggleSheet(value: boolean): void {
    if (this.ignoreOpenChange) {
      return;
    }

    if (value) {
      this.openSheet();
    } else {
      this.closeSheet();
    }
  }

  private getResizeIcon(): string {
    const { position } = this;

    return position === "block-start" || position === "block-end"
      ? "drag-resize-vertical"
      : "drag-resize-horizontal";
  }

  private getContentElDOMRect(): DOMRect {
    return this.contentEl.getBoundingClientRect();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const { key, defaultPrevented, shiftKey } = event;
    const {
      position,
      resizable,
      contentEl,
      el,
      resizeValues: { maxBlockSize, maxInlineSize, minBlockSize, minInlineSize },
    } = this;

    const arrowKeys =
      position === "block-end" || position === "block-start"
        ? ["ArrowUp", "ArrowDown"]
        : ["ArrowLeft", "ArrowRight"];

    const keys = [...arrowKeys, "Home", "End"];

    if (!resizable || !contentEl || defaultPrevented || !keys.includes(key)) {
      return;
    }

    const rect = this.getContentElDOMRect();
    const invertRTL = getElementDir(el) === "rtl" ? -1 : 1;
    const stepValue = shiftKey ? sheetResizeShiftStep : sheetResizeStep;

    switch (key) {
      case "ArrowUp":
        this.updateSize({
          size: rect.height + (position === "block-end" ? stepValue : -stepValue),
          type: "blockSize",
        });
        event.preventDefault();
        break;
      case "ArrowDown":
        this.updateSize({
          size: rect.height + (position === "block-end" ? -stepValue : stepValue),
          type: "blockSize",
        });
        event.preventDefault();
        break;
      case "ArrowLeft":
        this.updateSize({
          size: rect.width + (position === "inline-end" ? stepValue : -stepValue) * invertRTL,
          type: "inlineSize",
        });
        event.preventDefault();
        break;
      case "ArrowRight":
        this.updateSize({
          size: rect.width + (position === "inline-end" ? -stepValue : stepValue) * invertRTL,
          type: "inlineSize",
        });
        event.preventDefault();
        break;
      case "Home":
        this.updateSize({
          size:
            position === "block-start" || position === "block-end" ? minBlockSize : minInlineSize,
          type: position === "block-start" || position === "block-end" ? "blockSize" : "inlineSize",
        });
        break;
      case "End":
        this.updateSize({
          size:
            position === "block-start" || position === "block-end" ? maxBlockSize : maxInlineSize,
          type: position === "block-start" || position === "block-end" ? "blockSize" : "inlineSize",
        });
        break;
    }
  }

  private updateSize({
    type,
    size,
  }: {
    type: "inlineSize" | "blockSize";
    size: number | null;
  }): void {
    const { contentEl, resizeValues } = this;

    if (!contentEl) {
      return;
    }

    const resizeMin = type === "blockSize" ? "minBlockSize" : "minInlineSize";
    const resizeMax = type === "blockSize" ? "maxBlockSize" : "maxInlineSize";

    const clamped =
      resizeValues[resizeMin] && resizeValues[resizeMax]
        ? clamp(size, resizeValues[resizeMin], resizeValues[resizeMax])
        : size;

    const rounded = Math.round(clamped);

    this.resizeValues = {
      ...resizeValues,
      [type]: rounded,
    };

    contentEl.style[type] = size !== null ? `${rounded}px` : null;
  }

  private cleanupInteractions(): void {
    this.interaction?.unset();
    this.updateSize({ size: null, type: "inlineSize" });
    this.updateSize({ size: null, type: "blockSize" });
  }

  private setupInteractions(): void {
    this.cleanupInteractions();

    const { el, contentEl, resizable, position, open, resizeHandleEl } = this;

    if (!contentEl || !open || !resizable || !resizeHandleEl) {
      return;
    }

    const { inlineSize, minInlineSize, blockSize, minBlockSize, maxInlineSize, maxBlockSize } =
      window.getComputedStyle(contentEl);

    const values: ResizeValues = {
      inlineSize: isPixelValue(inlineSize) ? parseInt(inlineSize) : 0,
      blockSize: isPixelValue(blockSize) ? parseInt(blockSize) : 0,
      minInlineSize: isPixelValue(minInlineSize) ? parseInt(minInlineSize) : 0,
      minBlockSize: isPixelValue(minBlockSize) ? parseInt(minBlockSize) : 0,
      maxInlineSize: isPixelValue(maxInlineSize) ? parseInt(maxInlineSize) : window.innerWidth,
      maxBlockSize: isPixelValue(maxBlockSize) ? parseInt(maxBlockSize) : window.innerHeight,
    };

    this.resizeValues = values;

    const rtl = getElementDir(el) === "rtl";

    this.interaction = interact(contentEl, { context: el.ownerDocument }).resizable({
      edges: {
        top: position === "block-end" ? resizeHandleEl : false,
        right: position === (rtl ? "inline-end" : "inline-start") ? resizeHandleEl : false,
        bottom: position === "block-start" ? resizeHandleEl : false,
        left: position === (rtl ? "inline-start" : "inline-end") ? resizeHandleEl : false,
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
        move: ({ rect }: ResizeEvent) => {
          const isBlock = position === "block-start" || position === "block-end";

          this.updateSize({
            size: isBlock ? rect.height : rect.width,
            type: isBlock ? "blockSize" : "inlineSize",
          });
        },
      },
    });
  }

  onBeforeOpen(): void {
    this.calciteSheetBeforeOpen.emit();
  }

  onOpen(): void {
    this.calciteSheetOpen.emit();
    this.focusTrap.activate();
  }

  onBeforeClose(): void {
    this.calciteSheetBeforeClose.emit();
  }

  onClose(): void {
    this.calciteSheetClose.emit();
    this.focusTrap.deactivate();
  }

  private setResizeHandleEl(el: HTMLDivElement): void {
    this.resizeHandleEl = el;
    this.setupInteractions();
  }

  private setContentEl(el: HTMLDivElement): void {
    this.contentEl = el;
    this.contentId = ensureId(el);
  }

  private setTransitionEl(el: HTMLDivElement): void {
    if (!el) {
      return;
    }

    this.transitionEl = el;
  }

  private async openSheet(): Promise<void> {
    await this.componentOnReady();
    this.el.addEventListener(
      "calciteSheetOpen",
      this.openEnd,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
    this.opened = true;
  }

  private handleOutsideClose(): void {
    if (this.outsideCloseDisabled) {
      return;
    }

    this.open = false;
  }

  private async closeSheet(): Promise<void> {
    if (this.beforeClose) {
      try {
        await this.beforeClose(this.el);
      } catch {
        // close prevented
        requestAnimationFrame(() => {
          this.ignoreOpenChange = true;
          this.open = true;
          this.ignoreOpenChange = false;
        });
        return;
      }
    }

    this.opened = false;
  }

  private handleMutationObserver(): void {
    this.focusTrap.updateContainerElements();
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { resizable, position, resizeValues } = this;
    const dir = getElementDir(this.el);
    const isBlockPosition = position === "block-start" || position === "block-end";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "aria-describedby", this.contentId);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLabel = this.label;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaModal = "true";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "dialog";

    return (
      <div
        class={{
          [CSS.container]: true,
          [CSS.containerOpen]: this.opened,
          [CSS.containerEmbedded]: this.embedded,
          [CSS_UTILITY.rtl]: dir === "rtl",
          [getDimensionClass("width", this.width, this.widthScale)]: !!(
            this.width || this.widthScale
          ),
          [getDimensionClass("height", this.height, this.heightScale)]: !!(
            this.height || this.heightScale
          ),
        }}
        ref={this.setTransitionEl}
      >
        <calcite-scrim class={CSS.scrim} onClick={this.handleOutsideClose} />
        <div class={CSS.content} ref={this.setContentEl}>
          <div class={CSS.contentContainer}>
            <slot />
          </div>
          {resizable ? (
            <div
              ariaLabel={this.messages.resizeEnabled}
              ariaOrientation={isBlockPosition ? "vertical" : "horizontal"}
              ariaValueMax={
                isBlockPosition ? resizeValues.maxBlockSize : resizeValues.maxInlineSize
              }
              ariaValueMin={
                isBlockPosition ? resizeValues.minBlockSize : resizeValues.minInlineSize
              }
              ariaValueNow={isBlockPosition ? resizeValues.blockSize : resizeValues.inlineSize}
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
          ) : null}
        </div>
      </div>
    );
  }

  // #endregion
}
