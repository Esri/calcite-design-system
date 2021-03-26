import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  h,
  VNode,
  Method
} from "@stencil/core";
import { debounce, forIn } from "lodash-es";
import { CSS, ICONS, TEXT } from "./resources";
import { CSS_UTILITY } from "../../utils/resources";
import { focusElement, getElementDir } from "../../utils/dom";

const filterDebounceInMs = 250;

@Component({
  tag: "calcite-filter",
  styleUrl: "calcite-filter.scss",
  shadow: true
})
export class CalciteFilter {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * The input data. The filter uses this as the starting point, and returns items
   * that contain the string entered in the input, using a partial match and recursive search.
   */
  @Prop() data: object[];

  /**
   * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * A text label that will appear on the clear button.
   */
  @Prop() intlClear?: string;

  /**
   * A text label that will appear next to the input field.
   */
  @Prop() intlLabel?: string;

  /**
   * Placeholder text for the input element's placeholder attribute
   */
  @Prop() placeholder?: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteFilterElement;

  @State() empty = true;

  textInput: HTMLInputElement;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * This event fires when the filter text changes.
   */
  @Event() calciteFilterChange: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Focuses the filter input.
   */
  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.textInput);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  filter = debounce((value: string): void => {
    const regex = new RegExp(value, "ig");

    if (this.data.length === 0) {
      console.warn(`No data was passed to calcite-filter.
      The data property expects an array of objects`);
      this.calciteFilterChange.emit([]);
      return;
    }

    const find = (input: object, RE: RegExp): any => {
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

    this.calciteFilterChange.emit(result);
  }, filterDebounceInMs);

  inputHandler = (event: InputEvent): void => {
    const target = event.target as HTMLInputElement;
    this.empty = target.value === "";
    this.filter(target.value);
  };

  keyDownHandler = ({ key }: KeyboardEvent): void => {
    if (key === "Escape") {
      this.clear();
    }
  };

  clear = (): void => {
    this.textInput.value = "";
    this.empty = true;
    this.calciteFilterChange.emit(this.data);
    this.setFocus();
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const rtl = getElementDir(this.el) === "rtl";
    const { disabled } = this;

    return (
      <Host>
        {disabled ? <calcite-scrim /> : null}
        <div class={CSS.container}>
          <label class={rtl ? CSS_UTILITY.rtl : null}>
            <input
              aria-label={this.intlLabel || TEXT.filterLabel}
              disabled={this.disabled}
              onInput={this.inputHandler}
              onKeyDown={this.keyDownHandler}
              placeholder={this.placeholder}
              ref={(el): void => {
                this.textInput = el;
              }}
              type="text"
              value=""
            />
            <div class={CSS.searchIcon}>
              <calcite-icon icon={ICONS.search} scale="s" />
            </div>
          </label>
          {!this.empty ? (
            <button
              aria-label={this.intlClear || TEXT.clear}
              class={CSS.clearButton}
              onClick={this.clear}
            >
              <calcite-icon icon={ICONS.close} />
            </button>
          ) : null}
        </div>
      </Host>
    );
  }
}
