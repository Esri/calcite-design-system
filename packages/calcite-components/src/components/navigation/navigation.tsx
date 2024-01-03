import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Host,
  Prop,
  State,
  VNode,
  Method,
} from "@stencil/core";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { CSS, ICONS, SLOTS } from "./resources";
import {
  LoadableComponent,
  componentFocusable,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";

/**
 * @slot logo - A slot for adding a `calcite-logo` component to the primary navigation level.
 * @slot user - A slot for adding a `calcite-user` component to the primary navigation level.
 * @slot progress - A slot for adding a `calcite-progress` component to the primary navigation level.
 * @slot navigation-action - A slot for adding a `calcite-action` component to the primary navigation level.
 * @slot content-start - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the start position of any navigation level.
 * @slot content-center - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the center position of the primary navigation level.
 * @slot content-end - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the end position of any navigation level.
 * @slot navigation-secondary - A slot for adding a `calcite-navigation` component in the secondary navigation level. Components rendered here will not display `calcite-navigation-logo` or `calcite-navigation-user` components.
 * @slot navigation-tertiary - A slot for adding a `calcite-navigation` component in the tertiary navigation level.  Components rendered here will not display `calcite-navigation-logo` or `calcite-navigation-user` components.
 */
@Component({
  tag: "calcite-navigation",
  styleUrl: "navigation.scss",
  shadow: true,
})
export class CalciteNavigation implements LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `navigationAction` is `true`, specifies the label of the `calcite-action`.
   */
  @Prop() label: string;

  /**
   * When `true`, displays a `calcite-action` and emits a `calciteNavActionSelect` event on selection change.
   */
  @Prop({ reflect: true }) navigationAction = false;

  //--------------------------------------------------------------------------
  //
  //  Private Properties/ State
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteNavigationElement;

  @State() logoSlotHasElements: boolean;

  @State() navigationActionSlotHasElements: boolean;

  @State() primaryContentCenterSlotHasElements: boolean;

  @State() primaryContentEndSlotHasElements: boolean;

  @State() primaryContentStartSlotHasElements: boolean;

  @State() progressSlotHasElement: boolean;

  @State() secondarySlotHasElements: boolean;

  @State() tertiarySlotHasElements: boolean;

  @State() userSlotHasElements: boolean;

  navigationActionEl: HTMLCalciteActionElement;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /** When `navigationAction` is `true`, emits when the displayed action selection changes. */
  @Event({ cancelable: false }) calciteNavigationActionSelect: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** When `navigationAction` is `true`, sets focus on the component's action element. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    return this.navigationActionEl?.setFocus();
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private actionClickHandler = () => {
    this.calciteNavigationActionSelect.emit();
  };

  private handleUserSlotChange = (event: Event): void => {
    if (this.isPrimaryLevel()) {
      this.userSlotHasElements = slotChangeHasAssignedElement(event);
    }
  };

  private handleLogoSlotChange = (event: Event): void => {
    if (this.isPrimaryLevel()) {
      this.logoSlotHasElements = slotChangeHasAssignedElement(event);
    }
  };

  private handleContentStartSlotChange = (event: Event): void => {
    if (this.isPrimaryLevel()) {
      this.primaryContentStartSlotHasElements = slotChangeHasAssignedElement(event);
    }
  };

  private handleContentEndSlotChange = (event: Event): void => {
    if (this.isPrimaryLevel()) {
      this.primaryContentEndSlotHasElements = slotChangeHasAssignedElement(event);
    }
  };

  private handleContentCenterSlotChange = (event: Event): void => {
    if (this.isPrimaryLevel()) {
      this.primaryContentCenterSlotHasElements = slotChangeHasAssignedElement(event);
    }
  };

  private handleSecondarySlotChange = (event: Event): void => {
    this.secondarySlotHasElements = slotChangeHasAssignedElement(event);
  };

  private handleTertiarySlotChange = (event: Event): void => {
    this.tertiarySlotHasElements = slotChangeHasAssignedElement(event);
  };

  private handleMenuActionSlotChange = (event: Event): void => {
    if (this.isPrimaryLevel()) {
      this.navigationActionSlotHasElements = slotChangeHasAssignedElement(event);
      if (this.navigationActionSlotHasElements) {
        this.navigationAction = false;
      }
    }
  };

  private handleProgressSlotChange = (event: Event): void => {
    if (this.isPrimaryLevel()) {
      this.progressSlotHasElement = slotChangeHasAssignedElement(event);
    }
  };

  private isPrimaryLevel(): boolean {
    return this.el.slot !== SLOTS.navSecondary && this.el.slot !== SLOTS.navTertiary;
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderMenuAction(): VNode {
    return (
      <slot name={SLOTS.navigationAction} onSlotchange={this.handleMenuActionSlotChange}>
        {this.navigationAction && (
          <calcite-action
            icon={ICONS.hamburger}
            onClick={this.actionClickHandler}
            text={this.label}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={(el: HTMLCalciteActionElement) => (this.navigationActionEl = el)}
          />
        )}
      </slot>
    );
  }

  render(): VNode {
    const primaryLevelHasElements =
      this.logoSlotHasElements ||
      this.userSlotHasElements ||
      this.navigationActionSlotHasElements ||
      this.primaryContentCenterSlotHasElements ||
      this.primaryContentEndSlotHasElements ||
      this.primaryContentStartSlotHasElements ||
      this.navigationAction;
    const slotName = this.el.slot;
    return (
      <Host>
        <div
          class={{
            [CSS.container]: true,
            [CSS.secondary]: slotName === SLOTS.navSecondary,
            [CSS.tertiary]: slotName === SLOTS.navTertiary,
            [CSS.primary]: primaryLevelHasElements,
          }}
        >
          <div class={{ [CSS.hide]: !this.progressSlotHasElement, [SLOTS.progress]: true }}>
            <slot name={SLOTS.progress} onSlotchange={this.handleProgressSlotChange} />
          </div>
          <div
            class={{ [CSS.containerContent]: true, [CSS.hasProgress]: this.progressSlotHasElement }}
          >
            {this.renderMenuAction()}
            <div class={{ [CSS.hide]: !this.logoSlotHasElements, [SLOTS.logo]: true }}>
              <slot name={SLOTS.logo} onSlotchange={this.handleLogoSlotChange} />
            </div>
            <slot name={SLOTS.contentStart} onSlotchange={this.handleContentStartSlotChange} />
            <slot name={SLOTS.contentCenter} onSlotchange={this.handleContentCenterSlotChange} />
            <slot name={SLOTS.contentEnd} onSlotchange={this.handleContentEndSlotChange} />
            <div class={{ [CSS.hide]: !this.userSlotHasElements, [SLOTS.user]: true }}>
              <slot name={SLOTS.user} onSlotchange={this.handleUserSlotChange} />
            </div>
          </div>
        </div>

        <Fragment>
          <slot name={SLOTS.navSecondary} onSlotchange={this.handleSecondarySlotChange} />
          <slot name={SLOTS.navTertiary} onSlotchange={this.handleTertiarySlotChange} />
        </Fragment>
      </Host>
    );
  }
}
