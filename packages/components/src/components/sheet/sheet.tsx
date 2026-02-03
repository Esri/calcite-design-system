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
import { createRef } from "lit/directives/ref.js";
import { ensureId, getElementDir, getStylePixelValue } from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { toggleOpenClose } from "../../utils/openCloseComponent";
import { getDimensionClass } from "../../utils/dynamicClasses";
import { Height, LogicalFlowPosition, Scale, Width } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { useT9n } from "../../controllers/useT9n";
import { usePreventDocumentScroll } from "../../controllers/usePreventDocumentScroll";
import { FocusTrapOptions, useFocusTrap } from "../../controllers/useFocusTrap";
import { useSizeOverride } from "../../controllers/useSizeOverride";
import { resizeStep, resizeShiftStep } from "../../utils/resources";
import { useSetFocus } from "../../controllers/useSetFocus";
import { IconName } from "../icon/interfaces";
import { ResizeValues } from "../interfaces";
import { useTopLayer } from "../../controllers/useTopLayer";
import { CSS, ICONS, IDS } from "./resources";
import { DisplayMode } from "./interfaces";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./sheet.scss";

declare global {
  interface DeclareElements {
    "calcite-sheet": Sheet;
  }
}

/** @slot - A slot for adding custom content. */
export class Sheet extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private contentId: string;

  private contentRef = createRef<HTMLDivElement>();

  focusTrap = useFocusTrap<this>({
    triggerProp: "open",
    focusTrapOptions: {
      // scrim closes on click, so we let it take over
      clickOutsideDeactivates: () => this.embedded,
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

  messages = useT9n<typeof T9nStrings>();

  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.handleMutationObserver(),
  );

  private _open = false;

  openProp = "opened";

  transitionProp = "opacity" as const;

  private resizeHandleEl: HTMLDivElement;

  transitionRef = createRef<HTMLDivElement>();

  private focusSetter = useSetFocus<this>()(this);

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

  private sizeOverride = useSizeOverride({
    targetElement: this.contentRef,
    getBounds: () => ({
      inline: { min: this.resizeValues.minInlineSize, max: this.resizeValues.maxInlineSize },
      block: { min: this.resizeValues.minBlockSize, max: this.resizeValues.maxBlockSize },
    }),
  });

  private topLayer = useTopLayer<this>({
    disabledOverride: () => this.embedded,
    target: this.transitionRef,
  })(this);

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

  get preventDocumentScroll(): boolean {
    return !this.embedded;
  }

  //#endregion

  //#region Public Properties

  /**
   * Passes a function to run before the component closes.
   */
  @property() beforeClose: (el: Sheet["el"]) => Promise<void>;

  /**
   * Specifies the display mode - `"float"` separates content from main layout,
   * and `"overlay"` displays on top of center content.
   */
  @property({ reflect: true }) displayMode: DisplayMode = "overlay";

  /**
   * This internal property, managed by a containing calcite-shell, is used
   * to inform the component if special configuration or styles are needed
   *
   * @private
   */
  @property({ reflect: true }) embedded = false;

  /** When `true`, disables the default close on escape behavior. */
  @property({ reflect: true }) escapeDisabled = false;

  /** When `true`, prevents focus trapping. */
  @property({ reflect: true }) focusTrapDisabled = false;

  /**
   * Specifies custom focus trap configuration on the component, where
   *
   * `"allowOutsideClick"` allows outside clicks,
   * `"initialFocus"` enables initial focus,
   * `"returnFocusOnDeactivate"` returns focus when not active,
   * `"extraContainers"` specifies additional focusable elements external to the trap, such as 3rd-party components appending elements to the document body, and
   * `"setReturnFocus"` customizes the element to which focus is returned when the trap is deactivated. Return `false` to prevent focus return, or `undefined` to use the default behavior (returning focus to the element focused before activation).
   */
  @property() focusTrapOptions: Partial<FocusTrapOptions>;

  /**
   * When `position` is `"block-start"` or `"block-end"`, specifies the component's height.
   *
   * @deprecated in v3.0.0, removal target v6.0.0 - Use the `height` property instead.
   */
  @property({ reflect: true }) heightScale: Scale = "m";

  /** Specifies the component's height. */
  @property({ reflect: true }) height: Height;

  /**
   * Specifies an accessible label for the component.
   *
   * @required
   */
  @property() label: string;

  /** Overrides individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

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

  /**
   * We use an internal property to handle styles for when a modal is actually opened, not just when the open attribute is applied. This is a property because we need to apply styles to the host element and to keep the styles present while beforeClose is .
   *
   * @private
   */
  @property({ reflect: true }) opened = false;

  /** When `true`, disables closing the component when the area outside of the component is clicked. */
  @property({ reflect: true }) outsideCloseDisabled = false;

  /** Determines where the component will be positioned. */
  @property({ reflect: true }) position: LogicalFlowPosition = "inline-start";

  /** When `true`, the component is resizable. */
  @property({ reflect: true }) resizable = false;

  /**
   * When `true` and the component is `open`, disables top layer placement.
   *
   * Only set this if you need complex z-index control or if top layer placement causes conflicts with third-party components.
   *
   * @mdn [Top Layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
   */
  @property({ reflect: true }) topLayerDisabled = false;

  /**
   * When `position` is `"inline-start"` or `"inline-end"`, specifies the component's width.
   *
   * @deprecated in v3.0.0, removal target v6.0.0 - Use the `width` property instead.
   */
  @property({ reflect: true }) widthScale: Scale = "m";

  /** Specifies the components width. */
  @property({ reflect: true }) width: Extract<Width, Scale>;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component's "close" button - the first focusable item.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.el, options);
  }

  /**
   * Updates the element(s) that are included in the component's focus-trap.
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
   * Use this method to programmatically override the components's width (inline) and/or height (block).
   * Pass `null` to clear the override and revert to the default or CSS variable size.
   */
  @method()
  async updateSize(size: { inline?: number | null; block?: number | null }): Promise<void> {
    this.updateSizeInternal(size);
  }

  //#endregion

  //#region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteSheetBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteSheetBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteSheetClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteSheetOpen = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.keyDownHandler);
  }

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.setupInteractions();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      changes.has("opened") &&
      (this.hasUpdated || this.opened !== false) &&
      this.transitionRef.value
    ) {
      toggleOpenClose(this);
    }

    if (
      (changes.has("open") && (this.hasUpdated || this.open !== false)) ||
      (changes.has("position") && (this.hasUpdated || this.position !== "inline-start")) ||
      (changes.has("resizable") && (this.hasUpdated || this.resizable !== false))
    ) {
      this.setupInteractions();
    }

    if (this.contentRef.value) {
      this.contentId = ensureId(this.contentRef.value);
    }
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.embedded = false;
    this.cleanupInteractions();
  }

  //#endregion

  //#region Private Methods

  private async setOpenState(value: boolean): Promise<void> {
    if (this.beforeClose && !value) {
      try {
        await this.beforeClose?.(this.el);
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

  private getResizeIcon(): IconName {
    const { position } = this;

    return position === "block-start" || position === "block-end"
      ? ICONS.dragVertical
      : ICONS.dragHorizontal;
  }

  private getContentRefDOMRect(): DOMRect {
    return this.contentRef.value?.getBoundingClientRect();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const { key, defaultPrevented, shiftKey } = event;
    const {
      contentRef,
      position,
      resizable,
      el,
      resizeValues: { maxBlockSize, maxInlineSize, minBlockSize, minInlineSize },
    } = this;

    const arrowKeys =
      position === "block-end" || position === "block-start"
        ? ["ArrowUp", "ArrowDown"]
        : ["ArrowLeft", "ArrowRight"];

    const keys = [...arrowKeys, "Home", "End"];

    if (!resizable || !contentRef.value || defaultPrevented || !keys.includes(key)) {
      return;
    }

    const rect = this.getContentRefDOMRect();
    const invertRTL = getElementDir(el) === "rtl" ? -1 : 1;
    const stepValue = shiftKey ? resizeShiftStep : resizeStep;

    switch (key) {
      case "ArrowUp":
        this.updateSizeInternal({
          block: rect.height + (position === "block-end" ? stepValue : -stepValue),
        });
        event.preventDefault();
        break;
      case "ArrowDown":
        this.updateSizeInternal({
          block: rect.height + (position === "block-end" ? -stepValue : stepValue),
        });
        event.preventDefault();
        break;
      case "ArrowLeft":
        this.updateSizeInternal({
          inline: rect.width + (position === "inline-end" ? stepValue : -stepValue) * invertRTL,
        });
        event.preventDefault();
        break;
      case "ArrowRight":
        this.updateSizeInternal({
          inline: rect.width + (position === "inline-end" ? -stepValue : stepValue) * invertRTL,
        });
        event.preventDefault();
        break;
      case "Home":
        this.updateSizeInternal(
          position === "block-start" || position === "block-end"
            ? { block: minBlockSize }
            : { inline: minInlineSize },
        );
        event.preventDefault();
        break;
      case "End":
        this.updateSizeInternal(
          position === "block-start" || position === "block-end"
            ? { block: maxBlockSize }
            : { inline: maxInlineSize },
        );
        event.preventDefault();
        break;
    }
  }

  /** Internal synchronous size-override update — calls the controller directly to avoid promise wrapping. */
  private updateSizeInternal(size: { inline?: number | null; block?: number | null }): void {
    if (!this.contentRef.value) {
      return;
    }

    const appliedSize = this.sizeOverride.resize(size);

    this.resizeValues = {
      ...this.resizeValues,
      ...(appliedSize.inline !== undefined && {
        inlineSize: appliedSize.inline,
      }),
      ...(appliedSize.block !== undefined && {
        blockSize: appliedSize.block,
      }),
    };
  }

  private cleanupInteractions(): void {
    this.interaction?.unset();
    this.updateSizeInternal({
      inline: null,
      block: null,
    });
  }

  private async setupInteractions(): Promise<void> {
    this.cleanupInteractions();

    const { contentRef, el, resizable, position, open, resizeHandleEl } = this;

    if (!contentRef.value || !open || !resizable || !resizeHandleEl) {
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
          this.updateSizeInternal(isBlock ? { block: rect.height } : { inline: rect.width });
        },
      },
    });
  }

  onBeforeOpen(): void {
    this.calciteSheetBeforeOpen.emit();
    this.topLayer.show();
  }

  onOpen(): void {
    if (this.focusTrapDisabled) {
      this.setFocus();
    }
    this.focusTrap.activate();
    this.calciteSheetOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteSheetBeforeClose.emit();
  }

  onClose(): void {
    this.calciteSheetClose.emit();
    this.focusTrap.deactivate();
    this.topLayer.hide();
  }

  private setResizeHandleEl(el: HTMLDivElement): void {
    this.resizeHandleEl = el;
    this.setupInteractions();
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
        popover={!this.embedded ? "manual" : null}
        ref={this.transitionRef}
      >
        <calcite-scrim class={CSS.scrim} onClick={this.handleOutsideClose} />
        <div class={CSS.content} id={IDS.sheetContent} ref={this.contentRef}>
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

  //#endregion
}
