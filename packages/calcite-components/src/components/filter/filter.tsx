import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { debounce } from "lodash-es";
import { filter } from "../../utils/filter";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { Scale } from "../interfaces";
import { FilterMessages } from "./assets/filter/t9n";
import { CSS, DEBOUNCE_TIMEOUT, ICONS } from "./resources";

@Component({
  tag: "calcite-filter",
  styleUrl: "filter.scss",
  shadow: {
    delegatesFocus: true,
  },
  assetsDirs: ["assets"],
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
  @Prop() items: object[] = [];

  @Watch("items")
  watchItemsHandler(): void {
    this.filterDebounced(this.value);
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
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: FilterMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<FilterMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  @Watch("value")
  valueHandler(value: string): void {
    this.filterDebounced(value);
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
    await setUpMessages(this);
  }

  connectedCallback(): void {
    connectInteractive(this);
    connectLocalized(this);
    connectMessages(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    this.filterDebounced.cancel();
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Performs a filter on the component.
   *
   * This method can be useful because filtering is delayed and asynchronous.
   *
   * @param {string} value - The filter text value.
   * @returns {Promise<void>}
   */
  @Method()
  async filter(value: string = this.value): Promise<void> {
    return new Promise((resolve) => {
      this.value = value;
      this.filterDebounced(value, false, resolve);
    });
  }

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    this.el?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private filterDebounced = debounce(
    (value: string, emit = false, onFilter?: () => void): void =>
      this.updateFiltered(filter(this.items, value), emit, onFilter),
    DEBOUNCE_TIMEOUT
  );

  inputHandler = (event: CustomEvent): void => {
    const target = event.target as HTMLCalciteInputElement;
    this.value = target.value;
    this.filterDebounced(target.value, true);
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
    this.filterDebounced("", true);
    this.setFocus();
  };

  updateFiltered(filtered: object[], emit = false, callback?: () => void): void {
    this.filteredItems = filtered;
    if (emit) {
      this.calciteFilterChange.emit();
    }
    callback?.();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { disabled, scale } = this;

    return (
      <InteractiveContainer disabled={disabled}>
        <div class={CSS.container}>
          <label>
            <calcite-input
              clearable={true}
              disabled={disabled}
              icon={ICONS.search}
              label={this.messages.label}
              messageOverrides={{ clear: this.messages.clear }}
              onCalciteInputInput={this.inputHandler}
              onKeyDown={this.keyDownHandler}
              placeholder={this.placeholder}
              scale={scale}
              type="text"
              value={this.value}
              // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
              ref={(el): void => {
                this.textInput = el;
              }}
            />
          </label>
        </div>
      </InteractiveContainer>
    );
  }
}
