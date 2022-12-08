import { Component, Element, Event, EventEmitter, Prop, h, VNode, Host } from "@stencil/core";

import { getElementDir, toAriaBoolean } from "../../utils/dom";
import { CSS, ICONS, TEXT } from "./resources";
import { BlockSectionToggleDisplay } from "./interfaces";
import { Status } from "../interfaces";
import { guid } from "../../utils/guid";
import { isActivationKey } from "../../utils/key";

/**
 * @slot - A slot for adding content to the component.
 */
@Component({
  tag: "calcite-block-section",
  styleUrl: "block-section.scss",
  shadow: true
})
export class BlockSection {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Accessible name for the component's collapse button.
   */
  @Prop() intlCollapse: string;

  /**
   * Accessible name for the component's expand button.
   */
  @Prop() intlExpand: string;

  /**
   * When `true`, expands the component and its contents.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  /**
   * Displays a status-related indicator icon.
   */
  @Prop({ reflect: true }) status: Status;

  /**
   * The component header text.
   */
  @Prop() text: string;

  /**
   * Specifies the component's toggle display -
   *
   * `"button"` (selectable header), or
   *
   * `"switch"` (toggle switch).
   */
  @Prop({ reflect: true }) toggleDisplay: BlockSectionToggleDisplay = "button";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteBlockSectionElement;

  private guid = guid();

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emits when the header has been clicked.
   */
  @Event({ cancelable: false }) calciteBlockSectionToggle: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  handleHeaderKeyDown = (event: KeyboardEvent): void => {
    if (isActivationKey(event.key)) {
      this.toggleSection();
      event.preventDefault();
      event.stopPropagation();
    }
  };

  toggleSection = (): void => {
    this.open = !this.open;
    this.calciteBlockSectionToggle.emit();
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderStatusIcon(): VNode[] {
    const { status } = this;
    const statusIcon = ICONS[status] ?? false;
    const statusIconClasses = {
      [CSS.statusIcon]: true,
      [CSS.valid]: status == "valid",
      [CSS.invalid]: status == "invalid"
    };

    return !!statusIcon ? (
      <calcite-icon class={statusIconClasses} icon={statusIcon} scale="s" />
    ) : null;
  }

  render(): VNode {
    const { el, intlCollapse, intlExpand, open, text, toggleDisplay } = this;
    const dir = getElementDir(el);
    const arrowIcon = open
      ? ICONS.menuOpen
      : dir === "rtl"
      ? ICONS.menuClosedLeft
      : ICONS.menuClosedRight;

    const toggleLabel = open ? intlCollapse || TEXT.collapse : intlExpand || TEXT.expand;

    const { guid } = this;
    const regionId = `${guid}-region`;
    const buttonId = `${guid}-button`;

    const headerNode =
      toggleDisplay === "switch" ? (
        <div
          aria-controls={regionId}
          aria-label={toggleLabel}
          class={{
            [CSS.toggle]: true,
            [CSS.toggleSwitch]: true
          }}
          id={buttonId}
          onClick={this.toggleSection}
          onKeyDown={this.handleHeaderKeyDown}
          tabIndex={0}
          title={toggleLabel}
        >
          <div class={CSS.toggleSwitchContent}>
            <span class={CSS.toggleSwitchText}>{text}</span>
          </div>
          <calcite-switch checked={open} label={toggleLabel} scale="s" tabIndex={-1} />
          {this.renderStatusIcon()}
        </div>
      ) : (
        <button
          aria-controls={regionId}
          aria-label={toggleLabel}
          class={{
            [CSS.sectionHeader]: true,
            [CSS.toggle]: true
          }}
          id={buttonId}
          name={toggleLabel}
          onClick={this.toggleSection}
        >
          <calcite-icon icon={arrowIcon} scale="s" />
          <span class={CSS.sectionHeaderText}>{text}</span>
          {this.renderStatusIcon()}
        </button>
      );

    return (
      <Host>
        {headerNode}
        <section
          aria-expanded={toAriaBoolean(open)}
          aria-labelledby={buttonId}
          class={CSS.content}
          hidden={!open}
          id={regionId}
        >
          <slot />
        </section>
      </Host>
    );
  }
}
