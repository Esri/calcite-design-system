import {
  Component,
  Prop,
  Event,
  EventEmitter,
  Listen,
  Element,
  Method,
  h,
  Host,
  State,
  Build,
  VNode,
  Watch
} from "@stencil/core";
import { TabChangeEventDetail } from "../calcite-tab/interfaces";
import { guid } from "../../utils/guid";
import { getElementDir, getElementProp } from "../../utils/dom";
import { getKey } from "../../utils/key";
import { TabID, TabLayout, TabPosition } from "../calcite-tabs/interfaces";
import { FlipContext, Scale } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { createObserver } from "../../utils/observers";

/**
 * @slot - A slot for adding text.
 */
@Component({
  tag: "calcite-tab-title",
  styleUrl: "calcite-tab-title.scss",
  shadow: true
})
export class CalciteTabTitle {
  //--------------------------------------------------------------------------
  //
  //  Events
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

  /** @internal Parent tabs component layout value */
  @Prop({ reflect: true, mutable: true }) layout: TabLayout;

  /** @internal Parent tabs component or parent tab-nav component's position */
  @Prop({ reflect: true, mutable: true }) position: TabPosition;

  /** @internal Parent tabs component or parent tab-nav component's scale */
  @Prop({ reflect: true, mutable: true }) scale: Scale;

  /** @internal Parent tabs component bordered value */
  @Prop({ reflect: true, mutable: true }) bordered = false;

  /**
   * Optionally include a unique name for the tab title,
   * be sure to also set this name on the associated tab.
   */
  @Prop({ reflect: true }) tab?: string;

  @Watch("active")
  activeTabChanged(): void {
    if (this.active) {
      this.emitActiveTab();
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
      this.emitActiveTab();
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
    const dir = getElementDir(this.el);
    const id = this.el.id || this.guid;
    const Tag = this.disabled ? "span" : "a";
    const showSideBorders = this.bordered && !this.disabled && this.layout !== "center";

    const iconStartEl = (
      <calcite-icon
        class="calcite-tab-title--icon icon-start"
        dir={dir}
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale="s"
      />
    );

    const iconEndEl = (
      <calcite-icon
        class="calcite-tab-title--icon icon-end"
        dir={dir}
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale="s"
      />
    );

    return (
      <Host
        aria-controls={this.controls}
        aria-expanded={this.active.toString()}
        id={id}
        role="tab"
        tabindex={this.disabled ? "-1" : "0"}
      >
        <Tag
          class={{
            container: true,
            "container--has-text": this.hasText,
            [CSS_UTILITY.rtl]: dir === "rtl"
          }}
          style={showSideBorders && { width: `${this.parentTabNavEl.indicatorWidth}px` }}
        >
          {this.iconStart ? iconStartEl : null}
          <slot />
          {this.iconEnd ? iconEndEl : null}
        </Tag>
      </Host>
    );
  }

  async componentDidLoad(): Promise<void> {
    this.calciteTabTitleRegister.emit(await this.getTabIdentifier());
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteTabChange", { target: "body" })
  tabChangeHandler(event: CustomEvent<TabChangeEventDetail>): void {
    if (this.parentTabNavEl === event.target) {
      if (this.tab) {
        this.active = this.tab === event.detail.tab;
      } else {
        this.getTabIndex().then((index) => {
          this.active = index === event.detail.tab;
        });
      }
    }
  }

  @Listen("click")
  onClick(): void {
    this.emitActiveTab();
  }

  @Listen("keydown")
  keyDownHandler(e: KeyboardEvent): void {
    switch (getKey(e.key)) {
      case " ":
      case "Enter":
        this.emitActiveTab();
        e.preventDefault();
        break;
      case "ArrowRight":
        if (getElementDir(this.el) === "ltr") {
          this.calciteTabsFocusNext.emit();
        } else {
          this.calciteTabsFocusPrevious.emit();
        }
        break;
      case "ArrowLeft":
        if (getElementDir(this.el) === "ltr") {
          this.calciteTabsFocusPrevious.emit();
        } else {
          this.calciteTabsFocusNext.emit();
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
   * Fires when a specific tab is activated (`event.details`)
   * @see [TabChangeEventDetail](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-tab/interfaces.ts#L1)
   */
  @Event() calciteTabsActivate: EventEmitter<TabChangeEventDetail>;

  /**
   * @internal
   */
  @Event() calciteTabsFocusNext: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteTabsFocusPrevious: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteTabTitleRegister: EventEmitter<TabID>;

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

  /** watches for changing text content **/
  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.updateHasText()
  );

  @State() private controls: string;

  /** determine if there is slotted text for styling purposes */
  @State() private hasText = false;

  /**
   * @internal
   */
  private parentTabNavEl: HTMLCalciteTabNavElement;

  /**
   * @internal
   */
  private parentTabsEl: HTMLCalciteTabsElement;

  private updateHasText(): void {
    this.hasText = this.el.textContent.trim().length > 0;
  }

  private setupTextContentObserver(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  private emitActiveTab(): void {
    if (!this.disabled) {
      this.calciteTabsActivate.emit({
        tab: this.tab
      });
    }
  }

  /**
   * @internal
   */
  private guid = `calcite-tab-title-${guid()}`;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
}
