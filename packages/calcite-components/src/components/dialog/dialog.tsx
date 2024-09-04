import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import interact from "interactjs";
import type { Interactable, ResizeEvent, DragEvent } from "@interactjs/types";
import { focusFirstTabbable, toAriaBoolean } from "../../utils/dom";
import {
  activateFocusTrap,
  connectFocusTrap,
  deactivateFocusTrap,
  FocusTrap,
  FocusTrapComponent,
  updateFocusTrapElements,
} from "../../utils/focusTrapComponent";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { createObserver } from "../../utils/observers";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { Kind, Scale } from "../interfaces";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { componentOnReady } from "../../utils/component";
import { SLOTS as PANEL_SLOTS } from "../panel/resources";
import { HeadingLevel } from "../functional/Heading";
import { OverlayPositioning } from "../../components";
import { DialogMessages } from "./assets/dialog/t9n";
import {
  CSS,
  dialogResizeStep,
  dialogDragStep,
  SLOTS,
  initialDragPosition,
  initialResizePosition,
} from "./resources";
import { DialogDragPosition, DialogPlacement, DialogResizePosition } from "./interfaces";

let totalOpenDialogs: number = 0;
let initialDocumentOverflowStyle: string = "";

/**
 * @slot - A slot for adding content.
 * @slot content - A slot for adding custom content.
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

@Component({
  tag: "calcite-dialog",
  styleUrl: "dialog.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Dialog
  implements
    OpenCloseComponent,
    FocusTrapComponent,
    LoadableComponent,
    LocalizedComponent,
    T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Passes a function to run before the component closes. */
  @Prop() beforeClose: () => Promise<void>;

  /** A description for the component. */
  @Prop() description: string;

  /**
   * When `true`, the component is draggable.
   */
  @Prop({ reflect: true }) dragEnabled = false;

  /** When `true`, disables the component's close button. */
  @Prop({ reflect: true }) closeDisabled = false;

  /**
   * This internal property, managed by a containing calcite-shell, is used
   * to inform the component if special configuration or styles are needed
   *
   * @internal
   */
  @Prop({ mutable: true }) embedded = false;

  /**
   * When `true`, disables the default close on escape behavior.
   *
   * By default, an open dialog can be dismissed by pressing the Esc key.
   *
   * @see [Dialog Accessibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility)
   */
  @Prop({ reflect: true }) escapeDisabled = false;

  /**
   * The component header text.
   */
  @Prop() heading: string;

  /**
   * Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /** Specifies the kind of the component, which will style the top border. */
  @Prop({ reflect: true }) kind: Extract<"brand" | "danger" | "info" | "success" | "warning", Kind>;

  /**
   * When `true`, a busy indicator is displayed.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * When `true`, the action menu items in the `header-menu-actions` slot are open.
   */
  @Prop({ reflect: true }) menuOpen = false;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: DialogMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<DialogMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /** When `true`, displays a scrim blocking interaction underneath the component.  */
  @Prop({ reflect: true }) modal = false;

  @Watch("modal")
  onModalChange(): void {
    this.updateOverflowHiddenClass();
  }

  /** When `true`, displays and positions the component. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** When `true`, disables the closing of the component when clicked outside. */
  @Prop({ reflect: true }) outsideCloseDisabled = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   *
   */
  @Prop({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Specifies the placement of the dialog.
   */
  @Prop({ reflect: true }) placement: DialogPlacement = "center";

  /**
   * When `true`, the component is resizable.
   */
  @Prop({ reflect: true }) resizable = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the width of the component. */
  @Prop({ reflect: true }) widthScale: Scale = "m";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
    setUpLoadableComponent(this);
    // when dialog initially renders, if active was set we need to open as watcher doesn't fire
    if (this.open) {
      this.openDialog();
    }
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    connectLocalized(this);
    connectMessages(this);
    connectFocusTrap(this, {
      focusTrapOptions: {
        clickOutsideDeactivates: !this.outsideCloseDisabled,
      },
    });
    connectFocusTrap(this);
    this.setupInteractions();
  }

  disconnectedCallback(): void {
    this.removeOverflowHiddenClass();
    this.mutationObserver?.disconnect();
    deactivateFocusTrap(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    this.embedded = false;
    this.cleanupInteractions();
  }

  render(): VNode {
    const { assistiveText, description, heading, opened } = this;
    return (
      <Host>
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerOpen]: opened,
            [CSS.containerEmbedded]: this.embedded,
          }}
          ref={this.setContainerEl}
        >
          {this.modal ? (
            <calcite-scrim class={CSS.scrim} onClick={this.handleOutsideClose} />
          ) : null}
          <div
            aria-description={description}
            aria-label={heading}
            aria-modal={toAriaBoolean(this.modal)}
            class={CSS.dialog}
            onKeyDown={this.handleKeyDown}
            ref={this.setTransitionEl}
            role="dialog"
          >
            {assistiveText ? (
              <div aria-live="polite" class={CSS.assistiveText} key="assistive-text">
                {assistiveText}
              </div>
            ) : null}
            <slot name={SLOTS.content}>
              <calcite-panel
                beforeClose={this.beforeClose}
                class={CSS.panel}
                closable={!this.closeDisabled}
                closed={!opened}
                description={description}
                heading={heading}
                headingLevel={this.headingLevel}
                loading={this.loading}
                menuOpen={this.menuOpen}
                messageOverrides={this.messageOverrides}
                onCalcitePanelClose={this.handleInternalPanelCloseClick}
                onCalcitePanelScroll={this.handleInternalPanelScroll}
                onKeyDown={this.handlePanelKeyDown}
                overlayPositioning={this.overlayPositioning}
                ref={(el) => (this.panelEl = el)}
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
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties/ State
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDialogElement;

  @State() opened = false;

  @State() hasFooter = true;

  @State() hasContentTop = false;

  @State() hasContentBottom = false;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: DialogMessages;

  @State() assistiveText: string | null = null;

  @Watch("open")
  @Watch("placement")
  @Watch("resizable")
  @Watch("dragEnabled")
  handleInteractionChange(): void {
    this.setupInteractions();
  }

  @Watch("messages")
  @Watch("dragEnabled")
  @Watch("resizable")
  updateAssistiveText(): void {
    const { messages } = this;
    this.assistiveText =
      messages && (this.dragEnabled || this.resizable)
        ? `${this.dragEnabled ? messages.dragEnabled : ""} ${this.resizable ? messages.resizeEnabled : ""}`
        : null;
  }

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  containerEl: HTMLDivElement;

  focusTrap: FocusTrap;

  private resizePosition: DialogResizePosition = { ...initialResizePosition };

  private dragPosition: DialogDragPosition = { ...initialDragPosition };

  private interaction: Interactable;

  private panelEl: HTMLCalcitePanelElement;

  private ignoreOpenChange = false;

  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.handleMutationObserver(),
  );

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keydown", { target: "window" })
  handleEscape(event: KeyboardEvent): void {
    if (this.open && !this.escapeDisabled && event.key === "Escape" && !event.defaultPrevented) {
      this.open = false;
      event.preventDefault();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event({ cancelable: false }) calciteDialogBeforeClose: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calciteDialogClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calciteDialogBeforeOpen: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calciteDialogOpen: EventEmitter<void>;

  /** Fires when the content is scrolled. */
  @Event({ cancelable: false }) calciteDialogScroll: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Sets focus on the component's "close" button (the first focusable item).
   *
   * @returns {Promise<void>} - A promise that is resolved when the operation has completed.
   */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    return this.panelEl?.setFocus() ?? focusFirstTabbable(this.el);
  }

  /**
   * Updates the element(s) that are used within the focus-trap of the component.
   */
  @Method()
  async updateFocusTrapElements(): Promise<void> {
    updateFocusTrapElements(this);
  }

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
   * @returns - promise that resolves once the content is scrolled to.
   */
  @Method()
  async scrollContentTo(options?: ScrollToOptions): Promise<void> {
    await this.panelEl?.scrollContentTo(options);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onBeforeOpen(): void {
    this.calciteDialogBeforeOpen.emit();
  }

  onOpen(): void {
    this.calciteDialogOpen.emit();
    activateFocusTrap(this);
  }

  onBeforeClose(): void {
    this.calciteDialogBeforeClose.emit();
  }

  onClose(): void {
    this.calciteDialogClose.emit();
    deactivateFocusTrap(this);
  }

  onFocusTrapDeactivate(): void {
    this.open = false;
  }

  @Watch("open")
  toggleDialog(value: boolean): void {
    if (this.ignoreOpenChange) {
      return;
    }

    if (value) {
      this.openDialog();
    } else {
      this.closeDialog();
    }
  }

  @Watch("opened")
  handleOpenedChange(value: boolean): void {
    this.transitionEl.classList.toggle(CSS.openingActive, value);
    onToggleOpenCloseComponent(this);
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

  private handleKeyDown = (event: KeyboardEvent): void => {
    const { key, shiftKey, defaultPrevented } = event;
    const { dragEnabled, resizable, resizePosition, dragPosition, transitionEl } = this;

    const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    if (defaultPrevented || !keys.includes(key)) {
      return;
    }

    switch (key) {
      case "ArrowUp":
        if (shiftKey && resizable && transitionEl) {
          this.updateSize({
            size: this.getTransitionElDOMRect().height - dialogResizeStep,
            type: "blockSize",
          });
          resizePosition.bottom -= dialogResizeStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        } else if (dragEnabled) {
          dragPosition.y -= dialogDragStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        }
        break;
      case "ArrowDown":
        if (shiftKey && resizable && transitionEl) {
          this.updateSize({
            size: this.getTransitionElDOMRect().height + dialogResizeStep,
            type: "blockSize",
          });
          resizePosition.bottom += dialogResizeStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        } else if (dragEnabled) {
          dragPosition.y += dialogDragStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        }
        break;
      case "ArrowLeft":
        if (shiftKey && resizable && transitionEl) {
          this.updateSize({
            size: this.getTransitionElDOMRect().width - dialogResizeStep,
            type: "inlineSize",
          });
          resizePosition.right -= dialogResizeStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        } else if (dragEnabled) {
          dragPosition.x -= dialogDragStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        }
        break;
      case "ArrowRight":
        if (shiftKey && resizable && transitionEl) {
          this.updateSize({
            size: this.getTransitionElDOMRect().width + dialogResizeStep,
            type: "inlineSize",
          });
          resizePosition.right += dialogResizeStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        } else if (dragEnabled) {
          dragPosition.x += dialogDragStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        }
        break;
    }
  };

  private updateTransform(): void {
    const {
      dragPosition: { x, y },
      resizePosition,
      transitionEl,
    } = this;

    if (!transitionEl) {
      return;
    }

    const { top, right, bottom, left } = this.getAdjustedResizePosition(resizePosition);

    const translateX = Math.round(x + left + right);
    const translateY = Math.round(y + top + bottom);

    transitionEl.style.transform = `translate(${translateX}px, ${translateY}px)`;
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

  private setupInteractions(): void {
    this.cleanupInteractions();

    const { el, transitionEl, resizable, dragEnabled, resizePosition, dragPosition } = this;

    if (!transitionEl || !this.open) {
      return;
    }

    if (resizable || dragEnabled) {
      this.interaction = interact(transitionEl, { context: el.ownerDocument });
    }

    if (resizable) {
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
              width: this.isPixelValue(minInlineSize) ? parseInt(minInlineSize, 10) : 0,
              height: this.isPixelValue(minBlockSize) ? parseInt(minBlockSize, 10) : 0,
            },
            max: {
              width: this.isPixelValue(maxInlineSize)
                ? parseInt(maxInlineSize, 10)
                : window.innerWidth,
              height: this.isPixelValue(maxBlockSize)
                ? parseInt(maxBlockSize, 10)
                : window.innerHeight,
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

  private isPixelValue(value: string): boolean {
    return value.indexOf("px") !== -1;
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

  private setContainerEl = (el: HTMLDivElement): void => {
    this.containerEl = el;
  };

  private setTransitionEl = (el: HTMLDivElement): void => {
    this.transitionEl = el;
    this.setupInteractions();
  };

  private openEnd = (): void => {
    this.setFocus();
    this.el.removeEventListener("calciteDialogOpen", this.openEnd);
  };

  private handleInternalPanelScroll = (event: CustomEvent<void>): void => {
    if (event.target !== this.panelEl) {
      return;
    }

    event.stopPropagation();
    this.calciteDialogScroll.emit();
  };

  private handleInternalPanelCloseClick = (event: CustomEvent<void>): void => {
    if (event.target !== this.panelEl) {
      return;
    }

    event.stopPropagation();
    this.open = false;
  };

  private handlePanelKeyDown = (event: KeyboardEvent): void => {
    if (this.escapeDisabled) {
      event.preventDefault();
    }
  };

  private async openDialog(): Promise<void> {
    await componentOnReady(this.el);
    this.el.addEventListener("calciteDialogOpen", this.openEnd);
    this.opened = true;
    this.updateOverflowHiddenClass();
  }

  private handleOutsideClose = (): void => {
    if (this.outsideCloseDisabled) {
      return;
    }

    this.open = false;
  };

  private closeDialog = async (): Promise<void> => {
    if (this.beforeClose) {
      try {
        await this.beforeClose();
      } catch (_error) {
        // close prevented
        requestAnimationFrame(() => {
          this.ignoreOpenChange = true;
          this.open = true;
          this.ignoreOpenChange = false;
        });
        return;
      }
    }

    totalOpenDialogs--;
    this.opened = false;
    this.updateOverflowHiddenClass();
  };

  private updateOverflowHiddenClass = (): void => {
    this.opened && !this.embedded && this.modal
      ? this.addOverflowHiddenClass()
      : this.removeOverflowHiddenClass();
  };

  private addOverflowHiddenClass(): void {
    if (totalOpenDialogs === 0) {
      initialDocumentOverflowStyle = document.documentElement.style.overflow;
    }

    totalOpenDialogs++;
    // use an inline style instead of a utility class to avoid global class declarations.
    document.documentElement.style.setProperty("overflow", "hidden");
  }

  private removeOverflowHiddenClass(): void {
    document.documentElement.style.setProperty("overflow", initialDocumentOverflowStyle);
  }

  private handleMutationObserver = (): void => {
    this.updateFocusTrapElements();
  };
}
