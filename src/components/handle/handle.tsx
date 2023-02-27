import { Component, Element, Event, EventEmitter, h, Method, Prop, VNode } from "@stencil/core";
import { toAriaBoolean } from "../../utils/dom";
import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";
import { HandleNudge } from "./interfaces";
import { CSS, ICONS } from "./resources";

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
   * Emitted when the handle is activated and the up or down arrow key is pressed.
   */
  @Event({ cancelable: false }) calciteHandleNudge: EventEmitter<HandleNudge>;

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
        this.calciteHandleNudge.emit({ direction: "up" });
        break;
      case "ArrowDown":
        if (!this.activated) {
          return;
        }
        event.preventDefault();
        this.calciteHandleNudge.emit({ direction: "down" });
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
        role="button"
        tabindex="0"
        title={this.textTitle}
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el): void => {
          this.handleButton = el;
        }}
      >
        <calcite-icon icon={ICONS.drag} scale="s" />
      </span>
    );
  }
}
