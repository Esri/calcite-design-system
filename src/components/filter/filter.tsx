import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Method,
  Prop,
  VNode,
  Watch
} from "@stencil/core";
import { debounce } from "lodash-es";
import { CSS, DEBOUNCE_TIMEOUT, ICONS, TEXT } from "./resources";
import { Scale } from "../interfaces";
import { focusElement } from "../../utils/dom";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { filter } from "../../utils/filter";

@Component({
  tag: "calcite-filter",
  styleUrl: "filter.scss",
  shadow: true
})
export class Filter implements InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * The items to filter through. The filter uses this as the starting point, and returns items
   * that contain the string entered in the input, using a partial match and recursive search.
   *
   * This property is required.
   */
  @Prop({ mutable: true }) items: object[] = [];

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
  @Prop({ mutable: true }) filteredItems: object[] = [];

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

  /** specify the scale of filter, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * Filter value.
   */
  @Prop({ mutable: true }) value = "";

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

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * This event fires when the filter text changes.
   */
  @Event({ cancelable: false }) calciteFilterChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    this.filter(this.value);
  }

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

  filter = debounce(
    (value: string, emit = false): void => this.updateFiltered(filter(this.items, value), emit),
    DEBOUNCE_TIMEOUT
  );

  inputHandler = (event: CustomEvent): void => {
    const target = event.target as HTMLCalciteInputElement;
    this.value = target.value;
    this.filter(target.value, true);
  };

  keyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.clear();
    }

    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  clear = (): void => {
    this.value = "";
    this.filter("", true);
    this.setFocus();
  };

  updateFiltered(filtered: any[], emit = false): void {
    this.filteredItems.length = 0;
    this.filteredItems = this.filteredItems.concat(filtered);
    if (emit) {
      this.calciteFilterChange.emit();
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { disabled, scale } = this;

    return (
      <Fragment>
        <div class={CSS.container}>
          <label>
            <calcite-input
              aria-label={this.intlLabel || TEXT.filterLabel}
              clearable={true}
              disabled={disabled}
              icon={ICONS.search}
              intlClear={this.intlClear || TEXT.clear}
              onCalciteInputInput={this.inputHandler}
              onKeyDown={this.keyDownHandler}
              placeholder={this.placeholder}
              ref={(el): void => {
                this.textInput = el;
              }}
              scale={scale}
              type="text"
              value={this.value}
            />
          </label>
        </div>
      </Fragment>
    );
  }
}
