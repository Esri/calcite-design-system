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
import { CSS, SLOTS } from "./resources";

// todo: static property?
let totalOpenDialogs: number = 0;
let initialDocumentOverflowStyle: string = "";

/**
 * @slot content - TODO
 * @slot content-top - A slot for adding content to the component's sticky header, where content remains at the top of the component when scrolling up and down.
 * @slot content-bottom - A slot for adding content to the component's sticky footer, where content remains at the bottom of the component when scrolling up and down.
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
  @Prop() beforeClose: (el: HTMLCalciteDialogElement) => Promise<void>;

  /** A description for the component. */
  @Prop() description: string;

  /**
   *  When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  // todo: remove?
  /** When `true`, disables the default close on escape behavior. */
  @Prop({ reflect: true }) escapeDisabled = false;

  /**
   * When `true`, prevents focus trapping.
   */
  @Prop({ reflect: true }) focusTrapDisabled = false;

  @Watch("focusTrapDisabled")
  handleFocusTrapDisabled(focusTrapDisabled: boolean): void {
    if (!this.open) {
      return;
    }

    focusTrapDisabled ? deactivateFocusTrap(this) : activateFocusTrap(this);
  }

  // todo: do we need to still say this?
  /** Sets the component to always be fullscreen. Overrides `widthScale` and `--calcite-dialog-width` / `--calcite-dialog-height`. */
  @Prop({ reflect: true }) fullscreen: boolean;

  /**
   * The component header text.
   */
  @Prop() heading: string;

  /**
   * Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /** Specifies the kind of the component, which will apply to top border. */
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

  /** When `true`, displays and positions the component.  */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * We use an internal property to handle styles for when a dialog is actually opened, not just when the open attribute is applied. This is a property because we need to apply styles to the host element and to keep the styles present while beforeClose is.
   *
   * @internal
   */
  @Prop({ mutable: true, reflect: true }) opened = false;

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

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * This internal property, managed by a containing calcite-shell, is used
   * to inform the component if special configuration or styles are needed
   *
   * @internal
   */
  @Prop({ mutable: true }) slottedInShell: boolean;

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
    // todo: still needed?
    if (this.open) {
      this.openDialog();
    }
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.cssVarObserver?.observe(this.el, { attributeFilter: ["style"] });
    this.updateSizeCssVars();
    connectLocalized(this);
    connectMessages(this);
    connectFocusTrap(this);
  }

  disconnectedCallback(): void {
    this.removeOverflowHiddenClass();
    this.mutationObserver?.disconnect();
    this.cssVarObserver?.disconnect();
    deactivateFocusTrap(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    this.slottedInShell = false;
  }

  render(): VNode {
    const { description, heading, opened } = this;
    return (
      <Host
        aria-describedby={description}
        aria-labelledby={heading}
        aria-modal={toAriaBoolean(this.modal)}
        role="dialog"
      >
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerOpen]: opened,
            [CSS.slottedInShell]: this.slottedInShell,
          }}
        >
          {this.modal ? (
            <calcite-scrim class={CSS.scrim} onClick={this.handleOutsideClose} />
          ) : null}
          {this.renderStyle()}
          <div class={CSS.dialog} ref={this.setTransitionEl}>
            <slot name={SLOTS.content}>
              <calcite-panel
                closable
                closed={!opened}
                description={description}
                disabled={this.disabled}
                heading={heading}
                headingLevel={this.headingLevel}
                loading={this.loading}
                menuOpen={this.menuOpen}
                messageOverrides={this.messageOverrides}
                onCalcitePanelClose={this.handleCloseClick}
                onCalcitePanelScroll={this.handleScroll}
                overlayPositioning={this.overlayPositioning}
                ref={(el) => (this.panelEl = el)}
                scale={this.scale}
              />
              <slot name={SLOTS.actionBar} slot={PANEL_SLOTS.actionBar} />
              <slot name={SLOTS.headerActionsStart} slot={PANEL_SLOTS.headerActionsStart} />
              <slot name={SLOTS.headerActionsEnd} slot={PANEL_SLOTS.headerActionsEnd} />
              <slot name={SLOTS.headerContent} slot={PANEL_SLOTS.headerContent} />
              <slot name={SLOTS.headerMenuActions} slot={PANEL_SLOTS.headerMenuActions} />
              <slot name={SLOTS.fab} slot={PANEL_SLOTS.fab} />
              <slot name={SLOTS.contentTop} slot={PANEL_SLOTS.contentTop} />
              <slot name={SLOTS.contentBottom} slot={PANEL_SLOTS.contentBottom} />
              <slot name={SLOTS.footer} slot={PANEL_SLOTS.footer} />
              <slot name={SLOTS.footerActions} slot={PANEL_SLOTS.footerActions} />
              <slot />
            </slot>
          </div>
        </div>
      </Host>
    );
  }

  // todo: why are we doing this? why not just use a css class?
  renderStyle(): VNode {
    if (!this.fullscreen && (this.cssWidth || this.cssHeight)) {
      return (
        <style>
          {`.${CSS.dialog} {
              block-size: ${this.cssHeight ? this.cssHeight : "auto"} !important;
              ${this.cssWidth ? `inline-size: ${this.cssWidth} !important;` : ""}
              ${this.cssWidth ? `max-inline-size: ${this.cssWidth} !important;` : ""}
            }
            @media screen and (max-width: ${this.cssWidth}) {
              .${CSS.dialog} {
                max-block-size: 100% !important;
                inline-size: 100% !important;
                max-inline-size: 100% !important;
                min-inline-size: 100% !important;
                margin: 0 !important;
              }
            }
          `}
        </style>
      );
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties/ State
  //
  //--------------------------------------------------------------------------

  panelEl: HTMLCalcitePanelElement;

  ignoreOpenChange = false;

  @Element() el: HTMLCalciteDialogElement;

  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.handleMutationObserver(),
  );

  private cssVarObserver: MutationObserver = createObserver("mutation", () => {
    this.updateSizeCssVars();
  });

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  focusTrap: FocusTrap;

  @State() cssWidth: string | number;

  @State() cssHeight: string | number;

  @State() hasFooter = true;

  @State() hasContentTop = false;

  @State() hasContentBottom = false;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: DialogMessages;

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
   */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    const { panelEl } = this;

    if (panelEl) {
      panelEl?.setFocus();
    } else {
      focusFirstTabbable(this.el);
    }
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

  private setTransitionEl = (el: HTMLDivElement): void => {
    this.transitionEl = el;
  };

  onBeforeOpen(): void {
    this.transitionEl.classList.add(CSS.openingActive);
    this.calciteDialogBeforeOpen.emit();
  }

  onOpen(): void {
    this.transitionEl.classList.remove(CSS.openingIdle, CSS.openingActive);
    this.calciteDialogOpen.emit();
    activateFocusTrap(this);
  }

  onBeforeClose(): void {
    this.transitionEl.classList.add(CSS.closingActive);
    this.calciteDialogBeforeClose.emit();
  }

  onClose(): void {
    this.transitionEl.classList.remove(CSS.closingIdle, CSS.closingActive);
    this.calciteDialogClose.emit();
    deactivateFocusTrap(this);
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
    const idleClass = value ? CSS.openingIdle : CSS.closingIdle;
    this.transitionEl.classList.add(idleClass);
    onToggleOpenCloseComponent(this);
  }

  private openEnd = (): void => {
    this.setFocus();
    this.el.removeEventListener("calciteDialogOpen", this.openEnd);
  };

  private handleScroll = (): void => {
    this.calciteDialogScroll.emit();
  };

  private handleCloseClick = () => {
    this.open = false;
  };

  private async openDialog(): Promise<void> {
    await componentOnReady(this.el);
    this.el.addEventListener("calciteDialogOpen", this.openEnd);
    this.opened = true;

    if (!this.slottedInShell) {
      if (totalOpenDialogs === 0) {
        initialDocumentOverflowStyle = document.documentElement.style.overflow;
      }

      totalOpenDialogs++;
      // use an inline style instead of a utility class to avoid global class declarations.
      document.documentElement.style.setProperty("overflow", "hidden");
    }
  }

  private handleOutsideClose = (): void => {
    if (this.outsideCloseDisabled) {
      return;
    }

    this.open = false;
  };

  closeDialog = async (): Promise<void> => {
    if (this.beforeClose) {
      try {
        await this.beforeClose(this.el);
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
    this.removeOverflowHiddenClass();
  };

  private removeOverflowHiddenClass(): void {
    document.documentElement.style.setProperty("overflow", initialDocumentOverflowStyle);
  }

  private handleMutationObserver = (): void => {
    this.updateFocusTrapElements();
  };

  // todo
  private updateSizeCssVars = (): void => {
    this.cssWidth = getComputedStyle(this.el).getPropertyValue("--calcite-dialog-width");
    this.cssHeight = getComputedStyle(this.el).getPropertyValue("--calcite-dialog-height");
  };
}
