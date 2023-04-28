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
import { CSS, SLOTS } from "./resources";

type Level = "primary" | "secondary" | "tertiary";

@Component({
  tag: "calcite-nav",
  styleUrl: "nav.scss",
  shadow: {
    delegatesFocus: true
  }
})

/**
 * @slot logo - A slot for adding a `calcite-logo` component to the primary nav level.
 * @slot user - A slot for adding a `calcite-user` component to the primary nav level.
 * @slot progress - A slot for adding a `calcite-progress` component to the primary nav level.
 * @slot menu-action - A slot for adding a `calcite-action` component to the primary nav level.
 * @slot primary-content-start - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the start position of the primary nav level.
 * @slot primary-content-center - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the center position of the primary nav level.
 * @slot primary-content-end - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the end position of the primary nav level.
 * @slot secondary-content-start - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the start position of the secondary nav level.
 * @slot secondary-content-end - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the end position of the secondary nav level.
 * @slot tertiary-content-start - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the start position of the tertiary nav level.
 * @slot tertiary-content-end - A slot for adding a `calcite-menu`, `calcite-action`, or other interactive elements in the end position of the tertiary nav level.
 */
export class CalciteNav {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteNavElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When true, display a hamburger `calcite-action` and emits `calciteNavMenuActionSelect` event on user interaction.
   */
  @Prop({ reflect: true }) menuAction = false;

  /**
   * Specifies the label of the hamburger icon.
   */
  @Prop() label!: string;

  //--------------------------------------------------------------------------
  //
  //  Private Properties/ State
  //
  //--------------------------------------------------------------------------

  @State() logoSlotHasElements: boolean;

  @State() userSlotHasElements: boolean;

  @State() primarySlotHasElements: boolean;

  @State() secondarySlotHasElements: boolean;

  @State() teritiarySlotHasElements: boolean;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emits whenever the component is selected or unselected.
   *
   */
  @Event() calciteNavMenuActionSelect: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private clickHandler = () => {
    this.calciteNavMenuActionSelect.emit();
  };

  private handleContentSlotChange = (event: Event, level: Level): void => {
    if (level === "secondary") {
      this.secondarySlotHasElements = slotChangeHasAssignedElement(event);
    } else if (level === "tertiary") {
      this.teritiarySlotHasElements = slotChangeHasAssignedElement(event);
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
      this.menuAction = false;
    }
  };

  private displayNav(level: Level): boolean {
    if (level === "primary") {
      return (
        this.menuAction ||
        this.userSlotHasElements ||
        this.logoSlotHasElements ||
        this.primarySlotHasElements
      );
    } else if (level === "secondary") {
      return this.secondarySlotHasElements;
    } else {
      return this.teritiarySlotHasElements;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderMenuAction(): VNode {
    return (
      <slot name={SLOTS.menuAction} onSlotchange={this.handleMenuActionSlotChange}>
        {this.menuAction && (
          <calcite-action icon="hamburger" onClick={this.clickHandler} text={this.label} />
        )}
      </slot>
    );
  }

  renderNavLevel(level: Level): VNode {
    const hideNav = !this.displayNav(level);
    return (
      <div
        class={{
          [CSS.navContainer]: true,
          [`nav-${level}`]: true,
          hide: hideNav
        }}
      >
        <slot name={SLOTS.progress} />
        <div class={CSS.navContainerContent}>
          {level === "primary" && this.renderMenuAction()}
          {level === "primary" && (
            <slot name={SLOTS.logo} onSlotchange={this.handleLogoSlotChange} />
          )}
          <slot
            name={`${level}-content-start`}
            onSlotchange={(event) => this.handleContentSlotChange(event, level)}
          />
          <slot
            name={`${level}-content-center`}
            onSlotchange={(event) => this.handleContentSlotChange(event, level)}
          />
          <slot
            name={`${level}-content-end`}
            onSlotchange={(event) => this.handleContentSlotChange(event, level)}
          />
          {level === "primary" ? (
            <slot name="user" onSlotchange={this.handleUserSlotChange} />
          ) : null}
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
