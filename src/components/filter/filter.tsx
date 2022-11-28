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
import {
  setUpLoadableComponent,
  setComponentLoaded,
  LoadableComponent,
  componentLoaded
} from "../../utils/loadable";

@Component({
  tag: "calcite-filter",
  styleUrl: "filter.scss",
  shadow: true
})
export class Filter implements InteractiveComponent, LoadableComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Defines the items to filter. The component uses the values as the starting point, and returns items
   *
   * that contain the string entered in the input, using a partial match and recursive search.
   *
   * This property is needed to conduct filtering.
   *
   */
  @Prop({ mutable: true }) items: object[] = [];

  @Watch("items")
  watchItemsHandler(): void {
    this.filter(this.value);
  }

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The component's resulting items after filtering.
   *
   * @readonly
   */
  @Prop({ mutable: true }) filteredItems: object[] = [];

  /**
   * Accessible name for the component's clear button.
   */
  @Prop() intlClear: string;

  /**
   * Accessible name for the component.
   */
  @Prop() intlLabel: string;

  /**
   * Specifies placeholder text for the input element.
   */
  @Prop() placeholder: string;

  /**
   * Specifies the size of the component.
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * The component's value.
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

  componentWillLoad(): void {
    setUpLoadableComponent(this);

    this.updateFiltered(filter(this.items, this.value));
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Fires when the component's text changes.
   */
  @Event({ cancelable: false }) calciteFilterChange: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);

    focusElement(this.textInput);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private filter = debounce(
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
      event.preventDefault();
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
