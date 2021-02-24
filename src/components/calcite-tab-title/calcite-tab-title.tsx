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
  VNode
} from "@stencil/core";
import { TabChangeEventDetail } from "../calcite-tab/interfaces";
import { guid } from "../../utils/guid";
import { getElementDir } from "../../utils/dom";
import { getKey } from "../../utils/key";
import { TabID, TabLayout, TabPosition } from "../calcite-tabs/interfaces";
import { FlipContext } from "../interfaces";

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

  /** @internal Parent tabs component position value */
  @Prop({ reflect: true, mutable: true }) position: TabPosition;

  /**
   * Optionally include a unique name for the tab title,
   * be sure to also set this name on the associated tab.
   */
  @Prop({ reflect: true }) tab?: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.setupTextContentObserver();
    this.parentTabNavEl = this.el.closest("calcite-tab-nav");
  }

  disconnectedCallback(): void {
    this.observer.disconnect();
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
    this.layout = this.el.closest("calcite-tabs")?.layout;
    this.position = this.el.closest("calcite-tabs")?.position;
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    const id = this.el.id || this.guid;
    const Tag = this.disabled ? "span" : "a";

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
        dir={dir}
        hasText={this.hasText}
        id={id}
        role="tab"
        tabindex={this.disabled ? "-1" : "0"}
      >
        <Tag class={{ rtl: dir === "rtl" }}>
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
   * Fires when a specific tab is activated. `event.details`: [TabChangeEventDetail](../../interfaces/TabChange.ts)
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
  private observer: MutationObserver;

  @State() private controls: string;

  /** determine if there is slotted text for styling purposes */
  @State() private hasText?: boolean = false;

  /**
   * @internal
   */
  private parentTabNavEl: HTMLCalciteTabNavElement;

  private updateHasText(): void {
    this.hasText = this.el.textContent.trim().length > 0;
  }

  private setupTextContentObserver(): void {
    if (Build.isBrowser) {
      this.observer = new MutationObserver(() => {
        this.updateHasText();
      });
      this.observer.observe(this.el, { childList: true, subtree: true });
    }
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
