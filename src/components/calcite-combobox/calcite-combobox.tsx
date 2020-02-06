import {
  Component,
  h,
  Host,
  Prop,
  State,
  Listen,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";

import 'focus-within-polyfill';
import { filter } from "../../utils/filter";

@Component({
  tag: "calcite-combobox",
  styleUrl: "calcite-combobox.scss",
  shadow: true
})
export class CalciteCombobox {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  @Prop() disabled = false;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLElement;

  @State() selectedItems = [];

  textInput: HTMLElement = null;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  @Event() calciteLookupChange: EventEmitter;

  @Listen("calciteItemChange") calciteItemChangeHandler(event: CustomEvent) {
    this.toggleSelection(event.detail);
  }

  @Listen("calciteChipDismiss") calciteChipDismissHandler(event: CustomEvent) {
    const value = event.detail.value;
    this.textInput.focus();
    this.deselectItem(value);
    this.toggleSelection({value, selected: false});
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  inputHandler = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const data = this.getItemData();
    const results = filter(data, target.value);
    console.log(results);
  }

  toggleSelection(item): void {
    if (!item.selected) {
      this.selectedItems = this.selectedItems.filter( currentValue => {
        return currentValue !== item.value;
      });
    } else {
      this.selectedItems = [...this.selectedItems, item.value];
    }
    this.calciteLookupChange.emit(this.selectedItems);
  }

  deselectItem(value): void {
    const comboboxItem = this.el.querySelector(`calcite-combobox-item[value=${value}]`) as HTMLCalciteComboboxItemElement;
    comboboxItem.toggleSelected(false);
  }

  getItemData() {
    const result = [];
    this.el.querySelectorAll("calcite-combobox-item").forEach( item => {
      result.push({
        label: item.textLabel,
        value: item.value
      });
    });
    return result;
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render() {
    const listBoxId = 'listbox';
    return (
      <Host>
        <div role="combobox" aria-expanded="false" aria-owns={listBoxId} aria-haspopup="listbox">
          <span class="selections">
            {
              this.selectedItems.map( (item) => {
                return <calcite-chip value={item}>{item}</calcite-chip>
              })
            }
          </span>
          <input type="text" aria-autocomplete="list" aria-controls={listBoxId}
            onInput={this.inputHandler}
            disabled={this.disabled}
            ref={(el) => this.textInput = el as HTMLInputElement} />
        </div>
        <ul id={listBoxId} role="listbox" class={{"list": true}} tabindex="0" aria-multiselectable="true">
          <slot />
        </ul>
      </Host>
    );
  }
}
