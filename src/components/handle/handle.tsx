import { Component, Element, Event, EventEmitter, Method, Prop, h, VNode } from "@stencil/core";
import { toAriaBoolean } from "../../utils/dom";
import { CSS, ICONS } from "./resources";
import {
  setUpLoadableComponent,
  setComponentLoaded,
  LoadableComponent,
  componentLoaded
} from "../../utils/loadable";

@Component({
  tag: "calcite-handle",
  styleUrl: "handle.scss",
  shadow: true
})
export class Handle implements LoadableComponent {
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
   * Emitted when the handle is activated and the up arrow key is pressed.
   */
  @Event({ cancelable: false }) calciteHandleNudgePrevious: EventEmitter<void>;

  /**
   * Emitted when the handle is activated and down arrow key is pressed.
   */
  @Event({ cancelable: false }) calciteHandleNudgeNext: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);

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
        event.preventDefault();
        break;
      case "ArrowUp":
        if (!this.activated) {
          return;
        }
        event.preventDefault();
        this.calciteHandleNudgePrevious.emit();
        break;
      case "ArrowDown":
        if (!this.activated) {
          return;
        }
        event.preventDefault();
        this.calciteHandleNudgeNext.emit();
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
