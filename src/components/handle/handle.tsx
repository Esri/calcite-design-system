import { Component, Element, Event, EventEmitter, Method, Prop, h, VNode } from "@stencil/core";
import { toAriaBoolean } from "../../utils/dom";
import { CSS, ICONS } from "./resources";
import { DeprecatedEventPayload } from "../interfaces";

@Component({
  tag: "calcite-handle",
  styleUrl: "handle.scss",
  shadow: true
})
export class Handle {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * @internal
   */
  @Prop({ mutable: true, reflect: true }) activated = false;

  /**
   * Value for the button title attribute
   */
  @Prop({ reflect: true }) textTitle = "handle";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteHandleElement;

  handleButton: HTMLElement;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when the the handle is activated and the up or down arrow key is pressed.
   *
   * **Note:**: The `handle` event payload prop is deprecated, please use the event's target/currentTarget instead
   */
  @Event() calciteHandleNudge: EventEmitter<DeprecatedEventPayload>;

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.handleButton?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  handleKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case " ":
        this.activated = !this.activated;
        break;
      case "ArrowUp":
      case "ArrowDown":
        if (!this.activated) {
          return;
        }
        const direction = event.key.toLowerCase().replace("arrow", "");
        this.calciteHandleNudge.emit({ handle: this.el, direction });
        break;
    }
  };

  handleBlur = (): void => {
    this.activated = false;
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      // Needs to be a span because of https://github.com/SortableJS/Sortable/issues/1486
      <span
        aria-pressed={toAriaBoolean(this.activated)}
        class={{ [CSS.handle]: true, [CSS.handleActivated]: this.activated }}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        ref={(el): void => {
          this.handleButton = el;
        }}
        role="button"
        tabindex="0"
        title={this.textTitle}
      >
        <calcite-icon icon={ICONS.drag} scale="s" />
      </span>
    );
  }
}
