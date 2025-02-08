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
import { getElementDir, toAriaBoolean, nodeListToArray } from "../../utils/dom";
import { guid } from "../../utils/guid";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { createObserver } from "../../utils/observers";
import { FlipContext, Scale } from "../interfaces";
import { TabChangeEventDetail, TabCloseEventDetail } from "../tab/interfaces";
import { TabID, TabLayout, TabPosition } from "../tabs/interfaces";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { getIconScale } from "../../utils/component";
import { IconNameOrString } from "../icon/interfaces";
import { isBrowser } from "../../utils/browser";
import { TabTitleMessages } from "./assets/tab-title/t9n";
import { CSS, ICONS } from "./resources";

/**
 * Tab-titles are optionally individually closable.
 *
 * @slot - A slot for adding text.
 */
@Component({
  tag: "calcite-tab-title",
  styleUrl: "tab-title.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class TabTitle implements InteractiveComponent, LocalizedComponent, T9nComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, the component and its respective `calcite-tab` contents are selected.
   *
   * Only one tab can be selected within the `calcite-tabs` parent.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  @Watch("selected")
  selectedHandler(): void {
    if (this.selected) {
      this.activateTab(false);
    }
  }

  /** When `true`, a close button is added to the component. */
  @Prop({ reflect: true }) closable = false;

  /** When `true`, does not display or position the component. */
  @Prop({ reflect: true, mutable: true }) closed = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity.  */
  @Prop({ reflect: true }) disabled = false;

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: IconNameOrString;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: IconNameOrString;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) layout: TabLayout;

  /**
   * Specifies the position of `calcite-tab-nav` and `calcite-tab-title` components in relation to, and is inherited from the parent `calcite-tabs`, defaults to `top`.
   *
   *  @internal
   */
  @Prop() position: TabPosition = "top";

  /**
   * Specifies the size of the component inherited from the parent `calcite-tabs`, defaults to `m`.
   *
   * @internal
   */
  @Prop() scale: Scale = "m";

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) bordered = false;

  /**
   * Specifies a unique name for the component.
   *
   * When specified, use the same value on the `calcite-tab`.
   */
  @Prop({ reflect: true }) tab: string;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: TabTitleMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<TabTitleMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    this.setupTextContentObserver();
    this.parentTabsEl = this.el.closest("calcite-tabs");
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
    document.body?.dispatchEvent(
      new CustomEvent("calciteTabTitleUnregister", {
        detail: this.el,
      }),
    );
    this.resizeObserver?.disconnect();
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
    if (isBrowser()) {
      this.updateHasText();
    }
    if (this.tab && this.selected) {
      this.activateTab(false);
    }
  }

  componentWillRender(): void {
    if (this.parentTabsEl) {
      this.layout = this.parentTabsEl.layout;
      this.bordered = this.parentTabsEl.bordered;
    }
  }

  render(): VNode {
    const { el, closed } = this;
    const id = el.id || this.guid;

    const iconStartEl = (
      <calcite-icon
        class={{ [CSS.titleIcon]: true, [CSS.iconStart]: true }}
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale={getIconScale(this.scale)}
      />
    );

    const iconEndEl = (
      <calcite-icon
        class={{ [CSS.titleIcon]: true, [CSS.iconEnd]: true }}
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale={getIconScale(this.scale)}
      />
    );

    return (
      <Host
        aria-controls={this.controls}
        aria-selected={toAriaBoolean(this.selected)}
        id={id}
        role="tab"
        tabIndex={this.selected && !this.disabled ? 0 : -1}
      >
        <InteractiveContainer disabled={this.disabled}>
          <div
            class={{
              [CSS.container]: true,
              [CSS.containerBottom]: this.position === "bottom",
              [CSS.iconPresent]: !!this.iconStart || !!this.iconEnd,
              [CSS.scale(this.scale)]: true,
            }}
            hidden={closed}
            ref={(el) => (el ? this.resizeObserver?.observe(el) : null)}
          >
            <div class={{ [CSS.content]: true, [CSS.contentHasText]: this.hasText }}>
              {this.iconStart ? iconStartEl : null}
              <slot />
              {this.iconEnd ? iconEndEl : null}
            </div>
            {this.renderCloseButton()}
            <div class={CSS.selectedIndicator} />
          </div>
        </InteractiveContainer>
      </Host>
    );
  }

  renderCloseButton(): VNode {
    const { closable, messages } = this;

    return closable ? (
      <button
        aria-label={messages.close}
        class={CSS.closeButton}
        disabled={false}
        key={CSS.closeButton}
        onClick={this.closeClickHandler}
        ref={(el) => (this.closeButtonEl = el)}
        title={messages.close}
        type="button"
      >
        <calcite-icon icon={ICONS.close} scale={getIconScale(this.scale)} />
      </button>
    ) : null;
  }

  async componentDidLoad(): Promise<void> {
    this.calciteInternalTabTitleRegister.emit(await this.getTabIdentifier());
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalTabChange", { target: "body" })
  internalTabChangeHandler(event: CustomEvent<TabChangeEventDetail>): void {
    const targetTabsEl = event
      .composedPath()
      .find((el: HTMLElement) => el.tagName === "CALCITE-TABS");

    if (targetTabsEl !== this.parentTabsEl) {
      return;
    }

    if (this.tab) {
      this.selected = this.tab === event.detail.tab;
    } else {
      this.getTabIndex().then((index) => {
        this.selected = index === event.detail.tab;
      });
    }

    event.stopPropagation();
  }

  @Listen("click")
  onClick(): void {
    this.activateTab();
  }

  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case " ":
      case "Enter":
        if (!event.composedPath().includes(this.closeButtonEl)) {
          this.activateTab();
          event.preventDefault();
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (getElementDir(this.el) === "ltr") {
          this.calciteInternalTabsFocusNext.emit();
        } else {
          this.calciteInternalTabsFocusPrevious.emit();
        }
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (getElementDir(this.el) === "ltr") {
          this.calciteInternalTabsFocusPrevious.emit();
        } else {
          this.calciteInternalTabsFocusNext.emit();
        }
        break;
      case "Home":
        event.preventDefault();
        this.calciteInternalTabsFocusFirst.emit();
        break;
      case "End":
        event.preventDefault();
        this.calciteInternalTabsFocusLast.emit();
        break;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when a `calcite-tab` is selected.
   */
  @Event({ cancelable: false }) calciteTabsActivate: EventEmitter<void>;

  /**
   * Fires when a `calcite-tab` is selected (`event.details`).
   *
   * @see [TabChangeEventDetail](https://github.com/Esri/calcite-design-system/blob/dev/src/components/tab/interfaces.ts#L1)
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalTabsActivate: EventEmitter<TabChangeEventDetail>;

  /**
   * Fires when a `calcite-tab` is closed.
   */
  @Event({ cancelable: false }) calciteTabsClose: EventEmitter<void>;

  /**
   * Fires when `calcite-tab` is closed (`event.details`).
   *
   * @see [TabChangeEventDetail](https://github.com/Esri/calcite-design-system/blob/dev/src/components/tab/interfaces.ts)
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalTabsClose: EventEmitter<TabCloseEventDetail>;
  /**
   * @internal
   */

  @Event({ cancelable: false }) calciteInternalTabsFocusNext: EventEmitter<void>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalTabsFocusPrevious: EventEmitter<void>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalTabsFocusFirst: EventEmitter<void>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalTabsFocusLast: EventEmitter<void>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalTabTitleRegister: EventEmitter<TabID>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalTabIconChanged: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Returns the index of the title within the `calcite-tab-nav`.
   */
  @Method()
  async getTabIndex(): Promise<number> {
    return Array.prototype.indexOf.call(
      nodeListToArray(this.el.parentElement.children).filter((el) =>
        el.matches("calcite-tab-title"),
      ),
      this.el,
    );
  }

  /**
   * @internal
   */
  @Method()
  async getTabIdentifier(): Promise<TabID> {
    return this.tab ? this.tab : this.getTabIndex();
  }

  /**
   * @param tabIds
   * @param titleIds
   * @internal
   */
  @Method()
  async updateAriaInfo(tabIds: string[] = [], titleIds: string[] = []): Promise<void> {
    this.controls = tabIds[titleIds.indexOf(this.el.id)] || null;
  }

  /**
   * This activates a tab in order for it and its associated tab-title be selected.
   *
   * @param userTriggered - when `true`, user-interaction events will be emitted in addition to internal events
   * @internal
   */
  @Method()
  async activateTab(userTriggered = true): Promise<void> {
    if (this.disabled || this.closed) {
      return;
    }
    const payload = { tab: this.tab };
    this.calciteInternalTabsActivate.emit(payload);

    if (userTriggered) {
      // emit in the next frame to let internal events sync up
      requestAnimationFrame(() => this.calciteTabsActivate.emit());
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private closeClickHandler = (): void => {
    this.closeTabTitleAndNotify();
  };

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTabTitleElement;

  /** watches for changing text content */
  mutationObserver: MutationObserver = createObserver("mutation", () => this.updateHasText());

  @State() controls: string;

  @State() defaultMessages: TabTitleMessages;

  @State() effectiveLocale: "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  /** determine if there is slotted text for styling purposes */
  @State() hasText = false;

  closeButtonEl: HTMLButtonElement;

  parentTabsEl: HTMLCalciteTabsElement;

  resizeObserver = createObserver("resize", () => {
    this.calciteInternalTabIconChanged.emit();
  });

  updateHasText(): void {
    this.hasText = this.el.textContent.trim().length > 0;
  }

  setupTextContentObserver(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  closeTabTitleAndNotify(): void {
    this.closed = true;
    this.calciteInternalTabsClose.emit({ tab: this.tab });
    this.calciteTabsClose.emit();
  }

  guid = `calcite-tab-title-${guid()}`;
}
