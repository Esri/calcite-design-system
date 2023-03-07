import {
  Build,
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
  Watch
} from "@stencil/core";
import { getElementDir, getElementProp, toAriaBoolean } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { createObserver } from "../../utils/observers";
import { FlipContext, Scale } from "../interfaces";
import { TabChangeEventDetail } from "../tab/interfaces";
import { CSS } from "./resources";
import { TabID, TabLayout, TabPosition } from "../tabs/interfaces";

/**
 * @slot - A slot for adding text.
 */
@Component({
  tag: "calcite-tab-title",
  styleUrl: "tab-title.scss",
  shadow: true
})
export class TabTitle implements InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTabTitleElement;

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
      this.emitActiveTab(false);
    }
  }

  /** When `true`, interaction is prevented and the component is displayed with lower opacity.  */
  @Prop({ reflect: true }) disabled = false;

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: string;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: string;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) layout: TabLayout;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) position: TabPosition;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) scale: Scale;

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

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.setupTextContentObserver();
    this.parentTabNavEl = this.el.closest("calcite-tab-nav");
    this.parentTabsEl = this.el.closest("calcite-tabs");
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
    document.body?.dispatchEvent(
      new CustomEvent("calciteTabTitleUnregister", {
        detail: this.el
      })
    );
    this.resizeObserver?.disconnect();
  }

  componentWillLoad(): void {
    if (Build.isBrowser) {
      this.updateHasText();
    }
    if (this.tab && this.selected) {
      this.emitActiveTab(false);
    }
  }

  componentWillRender(): void {
    if (this.parentTabsEl) {
      this.layout = this.parentTabsEl.layout;
      this.position = this.parentTabsEl.position;
      this.scale = this.parentTabsEl.scale;
      this.bordered = this.parentTabsEl.bordered;
    }
    // handle case when tab-nav is only parent
    if (!this.parentTabsEl && this.parentTabNavEl) {
      this.position = getElementProp(this.parentTabNavEl, "position", this.position);
      this.scale = getElementProp(this.parentTabNavEl, "scale", this.scale);
    }
  }

  render(): VNode {
    const id = this.el.id || this.guid;

    const iconStartEl = (
      <calcite-icon
        class={{ [CSS.titleIcon]: true, [CSS.iconStart]: true }}
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale={this.scale === "l" ? "m" : "s"}
      />
    );

    const iconEndEl = (
      <calcite-icon
        class={{ [CSS.titleIcon]: true, [CSS.iconEnd]: true }}
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale={this.scale === "l" ? "m" : "s"}
      />
    );

    return (
      <Host
        aria-controls={this.controls}
        aria-selected={toAriaBoolean(this.selected)}
        id={id}
        role="tab"
        tabIndex={this.selected ? 0 : -1}
      >
        <div
          class={{
            container: true,
            [CSS.iconPresent]: this.iconStart || this.iconEnd ? true : null,
            [CSS.containerHasText]: this.hasText
          }}
          // eslint-disable-next-line react/jsx-sort-props
          ref={(el) => this.resizeObserver?.observe(el)}
        >
          {this.iconStart ? iconStartEl : null}
          <slot />
          {this.iconEnd ? iconEndEl : null}
        </div>
      </Host>
    );
  }

  async componentDidLoad(): Promise<void> {
    this.calciteInternalTabTitleRegister.emit(await this.getTabIdentifier());
  }

  componentDidRender(): void {
    updateHostInteraction(this, () => {
      return this.selected;
    });
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
    this.emitActiveTab();
  }

  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case " ":
      case "Enter":
        this.emitActiveTab();
        event.preventDefault();
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
   * @see [TabChangeEventDetail](https://github.com/Esri/calcite-components/blob/master/src/components/tab/interfaces.ts#L1)
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalTabsActivate: EventEmitter<TabChangeEventDetail>;

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
      this.el.parentElement.querySelectorAll("calcite-tab-title"),
      this.el
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

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** watches for changing text content */
  mutationObserver: MutationObserver = createObserver("mutation", () => this.updateHasText());

  @State() controls: string;

  /** determine if there is slotted text for styling purposes */
  @State() hasText = false;

  parentTabNavEl: HTMLCalciteTabNavElement;

  parentTabsEl: HTMLCalciteTabsElement;

  containerEl: HTMLDivElement;

  resizeObserver = createObserver("resize", () => {
    this.calciteInternalTabIconChanged.emit();
  });

  updateHasText(): void {
    this.hasText = this.el.textContent.trim().length > 0;
  }

  setupTextContentObserver(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  emitActiveTab(userTriggered = true): void {
    if (this.disabled) {
      return;
    }

    const payload = { tab: this.tab };

    this.calciteInternalTabsActivate.emit(payload);

    if (userTriggered) {
      this.calciteTabsActivate.emit();
    }
  }

  guid = `calcite-tab-title-${guid()}`;
}
