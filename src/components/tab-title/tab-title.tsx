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
import { TabChangeEventDetail } from "../tab/interfaces";
import { guid } from "../../utils/guid";
import { getElementDir, getElementProp, toAriaBoolean } from "../../utils/dom";
import { TabID, TabLayout, TabPosition } from "../tabs/interfaces";
import { FlipContext, Scale } from "../interfaces";
import { createObserver } from "../../utils/observers";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";

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

  /** Show this tab title as selected */
  @Prop({ reflect: true, mutable: true }) active = false;

  /** Disable this tab title  */
  @Prop({ reflect: true }) disabled = false;

  /** optionally pass an icon to display at the end of a tab title - accepts calcite ui icon names  */
  @Prop({ reflect: true }) iconEnd?: string;

  /** flip the icon(s) in rtl */
  @Prop({ reflect: true }) iconFlipRtl?: FlipContext;

  /** optionally pass an icon to display at the start of a tab title - accepts calcite ui icon names  */
  @Prop({ reflect: true }) iconStart?: string;

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
   * Optionally include a unique name for the tab title,
   * be sure to also set this name on the associated tab.
   */
  @Prop({ reflect: true }) tab?: string;

  @Watch("active")
  activeTabChanged(): void {
    if (this.active) {
      this.emitActiveTab(false);
    }
  }

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
  }

  componentWillLoad(): void {
    if (Build.isBrowser) {
      this.updateHasText();
    }
    if (this.tab && this.active) {
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
        class="calcite-tab-title--icon icon-start"
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale="s"
      />
    );

    const iconEndEl = (
      <calcite-icon
        class="calcite-tab-title--icon icon-end"
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale="s"
      />
    );

    return (
      <Host
        aria-controls={this.controls}
        aria-selected={toAriaBoolean(this.active)}
        id={id}
        role="tab"
        tabIndex={this.active ? 0 : -1}
      >
        <div
          class={{
            container: true,
            "container--has-text": this.hasText
          }}
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
      return this.active;
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
      this.active = this.tab === event.detail.tab;
    } else {
      this.getTabIndex().then((index) => {
        this.active = index === event.detail.tab;
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
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when a specific tab is activated. Emits the "tab" property or the index position.
   *
   * @see [TabChangeEventDetail](https://github.com/Esri/calcite-components/blob/master/src/components/tab/interfaces.ts#L1)
   */
  @Event() calciteTabsActivate: EventEmitter<TabChangeEventDetail>;

  /**
   * Fires when a specific tab is activated (`event.details`)
   *
   * @see [TabChangeEventDetail](https://github.com/Esri/calcite-components/blob/master/src/components/tab/interfaces.ts#L1)
   * @internal
   */
  @Event() calciteInternalTabsActivate: EventEmitter<TabChangeEventDetail>;

  /**
   * @internal
   */
  @Event() calciteInternalTabsFocusNext: EventEmitter<void>;

  /**
   * @internal
   */
  @Event() calciteInternalTabsFocusPrevious: EventEmitter<void>;

  /**
   * @internal
   */
  @Event() calciteInternalTabTitleRegister: EventEmitter<TabID>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Return the index of this title within the nav
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
      this.calciteTabsActivate.emit(payload);
    }
  }

  guid = `calcite-tab-title-${guid()}`;
}
