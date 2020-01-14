import {
  Component,
  h,
  Host,
  Prop,
  State,
  Watch
} from "@stencil/core";

import { debounce, forIn } from "lodash-es";
// import { listItem } from "./interfaces";

const filterDebounceInMs = 250;

@Component({
  tag: "calcite-combobox",
  styleUrl: "calcite-combobox.scss",
  shadow: true
})
export class CalcitePagination {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  @Prop() disabled = false;

  @Prop() data:Array<any> = null;

  @Watch("data") dataWatchHandler(oldValue, newValue) {

  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @State() showList = true;

  @State() filteredList = this.data;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  filter = debounce((value: string): void => {
    const regex = new RegExp(value, "ig");

    if (this.data.length === 0) {
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

    const result = this.data.filter((item) => {
      return find(item, regex);
    });

    this.filteredList = result;
    // this.calciteFilterChange.emit(result);
  }, filterDebounceInMs);

  inputHandler = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render() {
    console.log(this.filteredList);
    const listBoxId = 'listbox';
    return (
      <Host>
        <div role="combobox" aria-expanded={this.showList} aria-owns={listBoxId} aria-haspopup="true">
          <input type="text" aria-autocomplete="list" aria-controls={listBoxId} onInput={this.inputHandler} disabled={this.disabled} />
        </div>
        <ul id={listBoxId} role="listbox" class={{"list": true, "hidden": this.showList}}>
          {
            this.filteredList.forEach( (item) => {
              return <li>{item.label}</li>
            })
          }
        </ul>
      </Host>
    );
  }
}
