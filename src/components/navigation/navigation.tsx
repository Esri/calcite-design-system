import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  VNode
} from "@stencil/core";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { CSS, ICONS, LEVEL, SLOTS } from "./resources";

type Level = "primary" | "secondary" | "tertiary";

@Component({
  tag: "calcite-navigation",
  styleUrl: "navigation.scss",
  shadow: {
    delegatesFocus: true
  }
})

/**
 * @slot logo - A slot for adding a `calcite-logo` component to the primary nav level.
 * @slot user - A slot for adding a `calcite-user` component to the primary nav level.
 * @slot progress - A slot for adding a `calcite-progress` component to the primary nav level.
 * @slot nav-action - A slot for adding a `calcite-action` component to the primary nav level.
 * @slot primary-content-start - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the start position of the primary nav level.
 * @slot primary-content-center - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the center position of the primary nav level.
 * @slot primary-content-end - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the end position of the primary nav level.
 * @slot secondary-content-start - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the start position of the secondary nav level.
 * @slot secondary-content-end - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the end position of the secondary nav level.
 * @slot tertiary-content-start - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the start position of the tertiary nav level.
 * @slot tertiary-content-end - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the end position of the tertiary nav level.
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

  @State() primarySlotHasElements: boolean;

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

  private handleContentSlotChange = (event: Event): void => {
    const element = event.target as Element;
    const level = element.getAttribute("data-level");
    if (level === LEVEL.secondary) {
      this.secondarySlotHasElements = slotChangeHasAssignedElement(event);
    } else if (level === LEVEL.tertiary) {
      this.tertiarySlotHasElements = slotChangeHasAssignedElement(event);
    } else {
      this.primarySlotHasElements = slotChangeHasAssignedElement(event);
    }
  };

  private handleUserSlotChange = (event: Event): void => {
    this.userSlotHasElements = slotChangeHasAssignedElement(event);
  };

  private handleLogoSlotChange = (event: Event): void => {
    this.logoSlotHasElements = slotChangeHasAssignedElement(event);
  };

  private handleMenuActionSlotChange = (event: Event): void => {
    const hasMenuAction = slotChangeHasAssignedElement(event);
    if (hasMenuAction) {
      this.navAction = false;
    }
  };

  private hasSlottedElements(level: Level): boolean {
    if (level === LEVEL.primary) {
      return (
        this.navAction ||
        this.userSlotHasElements ||
        this.logoSlotHasElements ||
        this.primarySlotHasElements
      );
    } else if (level === LEVEL.secondary) {
      return this.secondarySlotHasElements;
    } else {
      return this.tertiarySlotHasElements;
    }
  }

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

  renderNavLevel(level: Level): VNode {
    const hasElements = this.hasSlottedElements(level);
    const isPrimaryLevel = level === LEVEL.primary;
    return (
      <div
        class={{
          [CSS.container]: true,
          [level]: true,
          hide: !hasElements
        }}
      >
        <slot name={SLOTS.progress} />
        <div class={CSS.containerContent}>
          {isPrimaryLevel && this.renderMenuAction()}
          {isPrimaryLevel && <slot name={SLOTS.logo} onSlotchange={this.handleLogoSlotChange} />}
          <slot
            data-level={level}
            name={
              isPrimaryLevel
                ? SLOTS.primaryContentStart
                : level === LEVEL.secondary
                ? SLOTS.secondaryContentStart
                : SLOTS.tertiaryContentStart
            }
            onSlotchange={this.handleContentSlotChange}
          />
          {isPrimaryLevel && (
            <slot
              data-level={level}
              name={SLOTS.primaryContentCenter}
              onSlotchange={this.handleContentSlotChange}
            />
          )}
          <slot
            data-level={level}
            name={
              isPrimaryLevel
                ? SLOTS.primaryContentEnd
                : level === LEVEL.secondary
                ? SLOTS.secondaryContentEnd
                : SLOTS.tertiaryContentEnd
            }
            onSlotchange={this.handleContentSlotChange}
          />
          {isPrimaryLevel && <slot name={SLOTS.user} onSlotchange={this.handleUserSlotChange} />}
        </div>
      </div>
    );
  }

  render(): VNode {
    return (
      <Host>
        {this.renderNavLevel("primary")}
        {this.renderNavLevel("secondary")}
        {this.renderNavLevel("tertiary")}
      </Host>
    );
  }
}
