import { Component, Host, h, Element, Prop, Watch } from "@stencil/core";
import { CSS, ICONS, TEXT } from "./resources";
import { focusElement } from "../../utils/dom";
import { VNode } from "@stencil/core/internal";
import { getRoundRobinIndex } from "../../utils/array";
import { PopperPlacement } from "../../utils/popper";
import { Placement } from "@popperjs/core";

const SUPPORTED_ARROW_KEYS = ["ArrowUp", "ArrowDown"];

@Component({
  tag: "calcite-action-menu",
  styleUrl: "calcite-action-menu.scss",
  shadow: true
})
/**
 * @slot - A slot for adding `calcite-action`s.
 */
export class CalciteActionMenu {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Indicates whether widget is expanded.
   */
  @Prop({ reflect: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(): void {
    this.open = false;
  }

  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  @Prop() flipPlacements?: Placement[];

  /**
   * 'Options' text string for the actions menu.
   */
  @Prop() intlOptions?: string;

  /**
   * 'Close' text string for the menu.
   */
  @Prop() intlClose?: string;

  /**
   * 'Open' text string for the menu.
   */
  @Prop() intlOpen?: string;

  /**
   * Offset the position of the menu away from the reference element.
   */
  @Prop({ reflect: true }) offsetDistance = 0;

  /**
   * Opens the action menu.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  /**
   * Determines where the component will be positioned relative to the referenceElement.
   */
  @Prop({ reflect: true }) placement: PopperPlacement = "auto";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteActionMenuElement;

  menuButtonEl: HTMLCalciteActionElement;

  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------

  renderMenuButton(): VNode {
    const { open, intlOpen, intlOptions, intlClose, expanded } = this;
    const closeLabel = intlClose || TEXT.close;
    const openLabel = intlOpen || TEXT.open;
    const optionsText = intlOptions || TEXT.options;
    const menuLabel = open ? closeLabel : openLabel;

    return (
      <calcite-action
        active={open}
        aria-label={menuLabel}
        class={CSS.menuButton}
        icon={ICONS.menu}
        label={menuLabel}
        onClick={this.toggleOpen}
        onKeyDown={this.menuButtonKeyDown}
        ref={this.setMenuButonRef}
        text={optionsText}
        textEnabled={expanded}
      />
    );
  }

  renderMenuItems(): VNode {
    const { open, menuButtonEl, intlOptions, offsetDistance, placement } = this;
    const label = intlOptions || TEXT.options;

    return (
      <calcite-popover
        disablePointer={true}
        label={label}
        offsetDistance={offsetDistance}
        onKeyDown={this.menuActionsKeydown}
        open={open}
        placement={placement}
        referenceElement={menuButtonEl}
      >
        <div class={CSS.menu}>
          <slot />
        </div>
      </calcite-popover>
    );
  }

  render(): VNode {
    return (
      <Host onBlur={this.onBlur}>
        <div class={CSS.menuContainer} onKeyDown={this.menuActionsContainerKeyDown}>
          {this.renderMenuButton()}
          {this.renderMenuItems()}
        </div>
      </Host>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  setMenuButonRef = (node: HTMLCalciteActionElement): void => {
    this.menuButtonEl = node;
  };

  // todo: fix. and a11y of elements
  queryActions(): HTMLCalciteActionElement[] {
    return this.el
      .querySelector("slot")
      .assignedElements({ flatten: true }) as HTMLCalciteActionElement[];
  }

  isValidKey(key: string, supportedKeys: string[]): boolean {
    return !!supportedKeys.find((k) => k === key);
  }

  menuActionsKeydown = (event: KeyboardEvent): void => {
    const { key, target } = event;

    if (!this.isValidKey(key, SUPPORTED_ARROW_KEYS)) {
      return;
    }

    const actions = this.queryActions();
    const { length } = actions;
    const currentIndex = actions.indexOf(target as HTMLCalciteActionElement);

    if (!length || currentIndex === -1) {
      return;
    }

    event.preventDefault();

    if (key === "ArrowUp") {
      const value = getRoundRobinIndex(currentIndex - 1, length);
      const previousAction = actions[value];
      focusElement(previousAction);
    }

    if (key === "ArrowDown") {
      const value = getRoundRobinIndex(currentIndex + 1, length);
      const nextAction = actions[value];
      focusElement(nextAction);
    }
  };

  menuActionsContainerKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;

    if (key === "Escape") {
      this.open = false;
    }
  };

  toggleOpen = (): void => {
    this.open = !this.open;
  };

  onBlur = (event: FocusEvent): void => {
    if (!this.open || event.composedPath().includes(this.el)) {
      return;
    }

    this.open = false;
  };

  menuButtonKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;
    const { open } = this;

    if (!this.isValidKey(key, SUPPORTED_ARROW_KEYS)) {
      return;
    }

    const actions = this.queryActions();
    const { length } = actions;

    if (!length) {
      return;
    }

    event.preventDefault();

    if (!open) {
      this.open = true;
    }

    if (key === "ArrowUp") {
      const lastAction = actions[length - 1];
      focusElement(lastAction);
    }

    if (key === "ArrowDown") {
      const firstAction = actions[0];
      focusElement(firstAction);
    }
  };
}
