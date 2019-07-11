import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Listen,
  h,
  Watch
} from "@stencil/core";
import { SPACE, ENTER } from "../../../../utils/keys";

@Component({
  tag: "calcite-date-day",
  styleUrl: "calcite-date-day.scss",
  shadow: true
})
export class CalciteDateDay {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Be sure to add a jsdoc comment describing your propery for the generated readme file.
   * If your property should be hidden from documentation, you can use the `@internal` tag
   */
  @Prop() day: number = 0;

  @Prop() enable: boolean = true;

  @Prop() selected: boolean = false;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

  render() {
    return (
      <Host>
        <span
          class={`${this.enable ? "enabled" : "disabled"} day ${
            this.selected ? "selected-day" : ""
          }`}
          role="gridcell"
          tabindex={this.selected ? 0 : -1}
        >
          {this.day}
        </span>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click") onClick() {
    this.selected = true;
  }

  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    if (e.keyCode === SPACE || e.keyCode === ENTER) {
      this.selected = true;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteDaySelect: EventEmitter;

  @Watch("selected") switchWatcher() {
    this.calciteDaySelect.emit();
  }
}
