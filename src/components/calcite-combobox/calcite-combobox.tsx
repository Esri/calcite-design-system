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

import { debounce, forIn } from "lodash-es";
import 'focus-within-polyfill';
// import { listItem } from "./interfaces";

const filterDebounceInMs = 250;

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

  filter = debounce((data: Array<object>, value: string): void => {
    const regex = new RegExp(value, "ig");

    if (data.length === 0) {
      // console.warn(`No data was passed to calcite-filter.
      // The data property expects an array of objects`);
    }

    const find = (input: object, RE: RegExp) => {
      let found = false;
      forIn(input, (val) => {
        if (typeof val === "function") {
          return;
        }
        if (Array.isArray(val) || (typeof val === "object" && val !== null)) {
          if (find(val, RE)) {
            found = true;
          }
        } else if (RE.test(val)) {
          found = true;
        }
      });
      return found;
    };

    const result = data.filter((item) => {
      return find(item, regex);
    });

    console.log(result);
    // this.filteredList = result;
    // this.calciteFilterChange.emit(result);
  }, filterDebounceInMs);

  inputHandler = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
  }

  toggleSelection(item) {
    if (!item.selected) {
      this.selectedItems = this.selectedItems.filter( currentValue => {
        return currentValue !== item.value;
      });
    } else {
      this.selectedItems = [...this.selectedItems, item.value];
    }
    this.calciteLookupChange.emit(this.selectedItems);
  }

  deselectItem(value) {
    const comboboxItem = this.el.querySelector(`calcite-combobox-item[value=${value}]`) as HTMLCalciteComboboxItemElement;
    comboboxItem.toggleSelected(false);
  }

  itemSelectHandler = (event: Event): void => {
    console.log('item selected');
    const target = event.target as HTMLCalciteComboboxItemElement;
    this.selectedItems = [...this.selectedItems, target.value];
    // this.selectedItems.add(target.getAttribute("value"));
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render() {
    // console.log(this.filteredList);
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
        <ul id={listBoxId} role="listbox" class={{"list": true}}>
          <slot />
        </ul>
      </Host>
    );
  }
}
