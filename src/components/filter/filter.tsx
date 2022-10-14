import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Method,
  Prop,
  State,
  VNode,
  Watch
} from "@stencil/core";
import { debounce } from "lodash-es";
import { CSS, DEBOUNCE_TIMEOUT, ICONS } from "./resources";
import { Scale } from "../interfaces";
import { focusElement } from "../../utils/dom";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { filter } from "../../utils/filter";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { Messages } from "./assets/filter/t9n";

@Component({
  tag: "calcite-filter",
  styleUrl: "filter.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class Filter implements InteractiveComponent, LocalizedComponent, T9nComponent {
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
   *
   * @deprecated – translations are now built-in, if you need to override a string, please use `messageOverrides`.
   */
  @Prop() intlClear?: string;

  /**
   * A text label that will appear next to the input field.
   *
   * @deprecated – translations are now built-in, if you need to override a string, please use `messageOverrides`.
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

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  @Prop({ mutable: true }) messages: Messages;

  /**
   * Use this property to override individual strings used by the component.
   */
  @Prop({ mutable: true }) messageOverrides: Partial<Messages>;

  @Watch("intlClear")
  @Watch("intlLabel")
  @Watch("defaultMessages")
  @Watch("messageOverrides")
  onMessagesChange(): void {
    /** referred in t9n util */
  }

  @Watch("value")
  valueHandler(value: string): void {
    this.filter(value);
  }

  // --------------------------------------------------------------------------
  //
  //  Private State/Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteFilterElement;

  textInput: HTMLCalciteInputElement;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: Messages;

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

  async componentWillLoad(): Promise<void> {
    this.filter(this.value);
    await setUpMessages(this);
  }

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
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
              aria-label={this.messages.label}
              clearable={true}
              disabled={disabled}
              icon={ICONS.search}
              intlClear={this.messages.clear}
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
