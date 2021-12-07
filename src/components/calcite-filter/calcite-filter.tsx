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
   *
   * @deprecated use `items` instead.
   */
  @Prop() data: object[];

  @Watch("data")
  watchDataHandler(value: object[]): void {
    this.items = value;
  }

  /**
   * The items to filter through. The filter uses this as the starting point, and returns items
   * that contain the string entered in the input, using a partial match and recursive search.
   *
   * This property is required.
   */
  @Prop({ mutable: true }) items: object[];

  @Watch("items")
  watchItemsHandler(): void {
    this.filter(this.value);
  }

  /**
   * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The resulting items after filtering.
   *
   * @readonly
   */
  @Prop({ mutable: true }) filteredItems: CalciteFilter["items"] = [];

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

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    if (this.data && !this.items) {
      this.items = this.data;
    }
  }

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

  filter = debounce((value: string): void => {
    const regex = new RegExp(value, "i");

    if (this.items.length === 0) {
      this.updateFiltered([]);
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

    const result = this.items.filter((item) => {
      return find(item, regex);
    });

    this.updateFiltered(result);
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
    this.setFocus();
  };

  updateFiltered(filtered: any[]): void {
    this.filteredItems.length = 0;
    this.filteredItems = this.filteredItems.concat(filtered);
    this.calciteFilterChange.emit(filtered);
  }

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
