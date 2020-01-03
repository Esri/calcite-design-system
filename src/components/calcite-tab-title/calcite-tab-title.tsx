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
  State
} from "@stencil/core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
import { guid } from "../../utils/guid";
import { SPACE, ENTER, LEFT, RIGHT } from "../../utils/keys";
import { getElementDir } from "../../utils/dom";

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

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Optionally include a unique name for the tab title,
   * be sure to also set this name on the associated tab.
   */
  @Prop({
    reflectToAttr: true,
    mutable: true
  })
  tab?: string;

  /**
   * Show this tab title as selected
   */
  @Prop({
    reflectToAttr: true,
    mutable: true
  })
  isActive: boolean = false;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad() {
    if (this.tab && this.isActive) {
      this.calciteTabsActivate.emit({
        tab: this.tab
      });
    }
  }

  render() {
    const id = this.el.id || this.guid;

    return (
      <Host
        id={id}
        aria-controls={this.controls}
        aria-expanded={this.isActive.toString()}
        role="tab"
        tabindex="0"
      >
        <a>
          <slot />
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
      this.isActive = this.tab === event.detail.tab;
    } else {
      this.getTabIndex().then(index => {
        this.isActive = index === event.detail.tab;
      });
    }
  }

  @Listen("click") onClick() {
    this.calciteTabsActivate.emit({
      tab: this.tab
    });
  }

  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    switch (e.keyCode) {
      case SPACE:
      case ENTER:
        this.calciteTabsActivate.emit({
          tab: this.tab
        });
        e.preventDefault();
        break;
      case RIGHT:
        if (getElementDir(this.el) === "ltr") {
          this.calciteTabsFocusNext.emit();
        } else {
          this.calciteTabsFocusPrevious.emit();
        }
        break;
      case LEFT:
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
  @Method() async updateAriaInfo(
    tabIds: string[] = [],
    titleIds: string[] = []
  ) {
    this.controls = tabIds[titleIds.indexOf(this.el.id)] || null;
    return Promise.resolve();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @State() private controls: string;

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
