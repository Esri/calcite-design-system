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
  Build
} from "@stencil/core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
import { guid } from "../../utils/guid";
import { getElementDir } from "../../utils/dom";
import { getKey } from "../../utils/key";

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

  /**
   * Optionally include a unique name for the tab title,
   * be sure to also set this name on the associated tab.
   */
  @Prop({ reflect: true }) tab?: string;

  /** Show this tab title as selected */
  @Prop({ reflect: true, mutable: true }) active = false;

  /** optionally pass an icon to display at the start of a tab title - accepts calcite ui icon names  */
  @Prop({ reflect: true }) iconStart?: string;

  /** optionally pass an icon to display at the end of a tab title - accepts calcite ui icon names  */
  @Prop({ reflect: true }) iconEnd?: string;

  /** @internal Parent tabs component layout value */
  @Prop({ reflect: true, mutable: true }) layout: "center" | "inline";
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    this.setupTextContentObserver();
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  componentWillLoad() {
    if (Build.isBrowser) {
      this.updateHasText();
    }
    if (this.tab && this.active) {
      this.calciteTabsActivate.emit({
        tab: this.tab
      });
    }
  }

  componentWillRender() {
    this.layout = this.el.closest("calcite-tabs")?.layout;
  }

  render() {
    const id = this.el.id || this.guid;

    const iconStartEl = (
      <calcite-icon class="calcite-tab-title--icon icon-start" icon={this.iconStart} scale="s" />
    );

    const iconEndEl = (
      <calcite-icon class="calcite-tab-title--icon icon-end" icon={this.iconEnd} scale="s" />
    );

    return (
      <Host
        id={id}
        aria-controls={this.controls}
        aria-expanded={this.active.toString()}
        role="tab"
        tabindex="0"
        hasText={this.hasText}
      >
        <a>
          {this.iconStart ? iconStartEl : null}
          <slot />
          {this.iconEnd ? iconEndEl : null}
        </a>
      </Host>
    );
  }

  componentDidLoad() {
    this.calciteTabTitleRegister.emit();
  }

  componentDidUnload() {
    this.calciteTabTitleUnregister.emit();
  }

  //--------------------------------------------------------------------------
  //
  //  Events Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteTabChange", { target: "parent" }) tabChangeHandler(
    event: CustomEvent<TabChangeEventDetail>
  ) {
    if (this.tab) {
      this.active = this.tab === event.detail.tab;
    } else {
      this.getTabIndex().then((index) => {
        this.active = index === event.detail.tab;
      });
    }
  }

  @Listen("click") onClick() {
    this.calciteTabsActivate.emit({
      tab: this.tab
    });
  }

  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    switch (getKey(e.key)) {
      case " ":
      case "Enter":
        this.calciteTabsActivate.emit({
          tab: this.tab
        });
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
  @Event() calciteTabTitleRegister: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteTabTitleUnregister: EventEmitter;

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
    return Promise.resolve(
      Array.prototype.indexOf.call(
        this.el.parentElement.querySelectorAll("calcite-tab-title"),
        this.el
      )
    );
  }

  /**
   * @internal
   */
  @Method()
  async getTabIdentifier(): Promise<string | number> {
    return this.tab ? Promise.resolve(this.tab) : this.getTabIndex();
  }

  /**
   * @internal
   */
  @Method() async updateAriaInfo(tabIds: string[] = [], titleIds: string[] = []) {
    this.controls = tabIds[titleIds.indexOf(this.el.id)] || null;
    return Promise.resolve();
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

  private updateHasText() {
    this.hasText = this.el.textContent.trim().length > 0;
  }

  private setupTextContentObserver() {
    if (Build.isBrowser) {
      this.observer = new MutationObserver(() => {
        this.updateHasText();
      });
      this.observer.observe(this.el, { childList: true, subtree: true });
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
