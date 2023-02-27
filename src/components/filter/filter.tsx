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
import { filter } from "../../utils/filter";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { Scale } from "../interfaces";
import { FilterMessages } from "./assets/filter/t9n";
import { CSS, DEBOUNCE_TIMEOUT, ICONS } from "./resources";

@Component({
  tag: "calcite-filter",
  styleUrl: "filter.scss",
  shadow: {
    delegatesFocus: true
  },
  assetsDirs: ["assets"]
})
export class Filter
  implements InteractiveComponent, LoadableComponent, LocalizedComponent, T9nComponent
{
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

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  @Prop({ mutable: true }) messages: FilterMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  @Prop({ mutable: true }) messageOverrides: Partial<FilterMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
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

  @State() defaultMessages: FilterMessages;

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
    setUpLoadableComponent(this);
    this.updateFiltered(filter(this.items, this.value));
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

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);

    this.el?.focus();
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
              messageOverrides={{ clear: this.messages.clear }}
              onCalciteInputInput={this.inputHandler}
              onKeyDown={this.keyDownHandler}
              placeholder={this.placeholder}
              scale={scale}
              type="text"
              value={this.value}
              // eslint-disable-next-line react/jsx-sort-props
              ref={(el): void => {
                this.textInput = el;
              }}
            />
          </label>
        </div>
      </Fragment>
    );
  }
}
