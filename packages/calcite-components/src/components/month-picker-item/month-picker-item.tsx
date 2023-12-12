import { Component, Host, VNode, h, Element, Prop, EventEmitter, Event } from "@stencil/core";

@Component({
  tag: "calcite-month-picker-item",
  styleUrl: "month-picker-item.scss",
  shadow: true,
})
export class MonthPickerItem {
  @Element() el: HTMLCalciteMonthPickerItemElement;

  @Prop() value: string;

  @Prop() isActive: boolean;

  /**
   * Emits whenever the component is selected.
   *
   */
  @Event() calciteInternalMonthPickerItemSelect: EventEmitter<void>;

  private handleClick = (): void => {
    this.calciteInternalMonthPickerItemSelect.emit();
  };

  render(): VNode {
    return (
      <Host>
        <div
          class={{ "month-item": true, "month-item--active": this.isActive }}
          onClick={this.handleClick}
        >
          {this.value}
        </div>
      </Host>
    );
  }
}
