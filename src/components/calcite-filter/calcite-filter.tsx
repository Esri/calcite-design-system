import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  h,
  VNode,
  Method,
  Fragment,
  Watch
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

  /**
   * Filter value.
   */
  @Prop({ mutable: true }) value?: string;

  @Watch("value")
  valueHandler(value: string): void {
    this.filter(value);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteFilterElement;

  textInput: HTMLCalciteInputElement;

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

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.textInput);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  @Watch("data")
  watchDataHandler(): void {
    this.filter(this.value);
  }

  filter = debounce((value: string): void => {
    const regex = new RegExp(value, "i");

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

  inputHandler = (event: CustomEvent): void => {
    const target = event.target as HTMLCalciteInputElement;
    this.value = target.value;
  };

  keyDownHandler = ({ key }: KeyboardEvent): void => {
    if (key === "Escape") {
      this.clear();
    }
  };

  clear = (): void => {
    this.value = "";
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
      <Fragment>
        {disabled ? <calcite-scrim /> : null}
        <div class={CSS.container}>
          <label class={rtl ? CSS_UTILITY.rtl : null}>
            <calcite-input
              aria-label={this.intlLabel || TEXT.filterLabel}
              class={rtl ? CSS_UTILITY.rtl : null}
              disabled={this.disabled}
              icon={ICONS.search}
              onCalciteInputInput={this.inputHandler}
              onKeyDown={this.keyDownHandler}
              placeholder={this.placeholder}
              ref={(el): void => {
                this.textInput = el;
              }}
              type="text"
              value={this.value}
            />
          </label>
          {this.value ? (
            <button
              aria-label={this.intlClear || TEXT.clear}
              class={CSS.clearButton}
              onClick={this.clear}
            >
              <calcite-icon icon={ICONS.close} />
            </button>
          ) : null}
        </div>
      </Fragment>
    );
  }
}
