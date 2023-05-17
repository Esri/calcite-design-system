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
  VNode
} from "@stencil/core";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { CSS, ICONS, SLOTS } from "./resources";

@Component({
  tag: "calcite-navigation",
  styleUrl: "navigation.scss",
  shadow: {
    delegatesFocus: true
  }
})

/**
 * @slot logo - A slot for adding a `calcite-logo` component to the primary navigation level.
 * @slot user - A slot for adding a `calcite-user` component to the primary navigation level.
 * @slot progress - A slot for adding a `calcite-progress` component to the primary navigation level.
 * @slot nav-action - A slot for adding a `calcite-action` component to the primary navigation level.
 * @slot content-start - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the start position of any navigation level.
 * @slot content-center - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the center position of the primary navigation level.
 * @slot content-end - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the end position of any navigation level.
 * @slot navigation-secondary - A slot for adding a `calcite-navigation` component in the secondary navigation level. Components rendered here will not display `calcite-navigation-logo` or `calcite-navigation-user` components.
 * @slot navigation-tertiary - A slot for adding a `calcite-navigation` component in the tertiary navigation level.  Components rendered here will not display `calcite-navigation-logo` or `calcite-navigation-user` components.
 */
export class CalciteNavigation {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteNavigationElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `navAction` is `true`, specifies the label of the `calcite-action`.
   */
  @Prop() label!: string;

  /**
   * When `true`, displays a `calcite-action` and emits a `calciteNavActionSelect` event on selection change.
   */
  @Prop({ reflect: true }) navAction = false;

  //--------------------------------------------------------------------------
  //
  //  Private Properties/ State
  //
  //--------------------------------------------------------------------------

  @State() logoSlotHasElements: boolean;

  @State() userSlotHasElements: boolean;

  @State() contentStartSlotHasElements: boolean;

  @State() contentCenterSlotHasElements: boolean;

  @State() contentEndSlotHasElements: boolean;

  @State() secondarySlotHasElements: boolean;

  @State() tertiarySlotHasElements: boolean;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /** When navAction is true, emits when the displayed action selection changes.*/
  @Event({ cancelable: false }) calciteNavActionSelect: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private clickHandler = () => {
    this.calciteNavActionSelect.emit();
  };

  private handleUserSlotChange = (event: Event): void => {
    this.userSlotHasElements = slotChangeHasAssignedElement(event);
  };

  private handleLogoSlotChange = (event: Event): void => {
    this.logoSlotHasElements = slotChangeHasAssignedElement(event);
  };

  private handleContentStartSlotChange = (event: Event): void => {
    this.contentStartSlotHasElements = slotChangeHasAssignedElement(event);
  };

  private handleContentEndSlotChange = (event: Event): void => {
    this.contentEndSlotHasElements = slotChangeHasAssignedElement(event);
  };

  private handleContentCenterSlotChange = (event: Event): void => {
    this.contentCenterSlotHasElements = slotChangeHasAssignedElement(event);
  };

  private handleSecondaryNavSlotChange = (event: Event): void => {
    this.secondarySlotHasElements = slotChangeHasAssignedElement(event);
  };

  private handleTertiaryNavSlotChange = (event: Event): void => {
    this.tertiarySlotHasElements = slotChangeHasAssignedElement(event);
  };

  private handleMenuActionSlotChange = (event: Event): void => {
    const hasMenuAction = slotChangeHasAssignedElement(event);
    if (hasMenuAction) {
      this.navAction = false;
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderMenuAction(): VNode {
    return (
      <slot name={SLOTS.navAction} onSlotchange={this.handleMenuActionSlotChange}>
        {this.navAction && (
          <calcite-action icon={ICONS.hamburger} onClick={this.clickHandler} text={this.label} />
        )}
      </slot>
    );
  }

  render(): VNode {
    const isPrimaryLevel =
      this.el.slot !== SLOTS.navSecondary && this.el.slot !== SLOTS.navTertiary;
    return (
      <Host>
        <div
          class={{
            [CSS.container]: true,
            [SLOTS.navSecondary]: this.el.slot === SLOTS.navSecondary,
            [SLOTS.navTertiary]: this.el.slot === SLOTS.navTertiary
          }}
        >
          {isPrimaryLevel && <slot name={SLOTS.progress} />}
          <div class={CSS.containerContent}>
            {isPrimaryLevel && this.renderMenuAction()}
            {isPrimaryLevel && <slot name={SLOTS.logo} onSlotchange={this.handleLogoSlotChange} />}
            <slot name={SLOTS.contentStart} onSlotchange={this.handleContentStartSlotChange} />
            {isPrimaryLevel && (
              <slot name={SLOTS.contentCenter} onSlotchange={this.handleContentCenterSlotChange} />
            )}
            <slot name={SLOTS.contentEnd} onSlotchange={this.handleContentEndSlotChange} />
            {isPrimaryLevel && <slot name={SLOTS.user} onSlotchange={this.handleUserSlotChange} />}
          </div>
        </div>

        {isPrimaryLevel && (
          <Fragment>
            <slot name={SLOTS.navSecondary} onSlotchange={this.handleSecondaryNavSlotChange} />
            <slot name={SLOTS.navTertiary} onSlotchange={this.handleTertiaryNavSlotChange} />
          </Fragment>
        )}
      </Host>
    );
  }
}
