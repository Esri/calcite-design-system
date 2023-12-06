import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { connectLabel, disconnectLabel, LabelableComponent } from "../../utils/label";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  SupportedLocale,
} from "../../utils/locale";
import { TimeZoneItem, TimeZoneMode } from "./interfaces";
import { Scale, Status } from "../interfaces";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { InputTimeZoneMessages } from "./assets/input-time-zone/t9n";
import { createTimeZoneItems, getUserTimeZoneName, getUserTimeZoneOffset } from "./utils";
import { OverlayPositioning } from "../../utils/floating-ui";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import {
  afterConnectDefaultValueSet,
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
} from "../../utils/form";

@Component({
  tag: "calcite-input-time-zone",
  styleUrl: "input-time-zone.scss",
  assetsDirs: ["assets"],
  shadow: {
    delegatesFocus: true,
  },
})
export class InputTimeZone
  implements
    FormComponent,
    InteractiveComponent,
    LabelableComponent,
    LoadableComponent,
    LocalizedComponent,
    T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The ID of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true }) form: string;

  /** Specifies the component's maximum number of options to display before displaying a scrollbar. */
  @Prop({ reflect: true }) maxItems = 0;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: InputTimeZoneMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<InputTimeZoneMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * This specifies the type of `value` and the associated options presented to the user:
   *
   * Using `"offset"` will provide options related
   *
   * @default "offset"
   */
  @Prop({ reflect: true }) mode: TimeZoneMode = "offset";

  @Watch("messages")
  @Watch("mode")
  @Watch("referenceDate")
  handleTimeZoneItemPropsChange(): void {
    this.updateTimeZoneItemsAndSelection();
  }

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @Prop({ reflect: true }) name: string;

  /** When `true`, displays and positions the component. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   *
   */
  @Prop({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * This date will be used as a reference to Daylight Savings Time when creating time zone item groups.
   *
   * It can be either a Date instance or a string in ISO format (YYYY-MM-DD, YYYY-MM-DDTHH:MM:SS.SSSZ)
   *
   * @see [Date.prototype.toISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
   */
  @Prop() referenceDate: Date | string;

  /**
   * When `true`, the component must have a value in order for the form to submit.
   *
   * @internal
   */
  @Prop({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @Prop({ reflect: true }) status: Status = "idle";

  /**
   * The component's value, where the value is the time zone offset or the difference, in minutes, between the selected time zone and UTC.
   *
   * If no value is provided, the user's time zone offset will be selected by default.
   *
   * @see https://www.w3.org/International/core/2005/09/timezone.html#:~:text=What%20is%20a%20%22zone%20offset,or%20%22%2D%22%20from%20UTC.
   */
  @Prop({ mutable: true }) value: string;

  @Watch("value")
  handleValueChange(value: string, oldValue: string): void {
    const timeZoneItem = this.findTimeZoneItem(value);

    if (!timeZoneItem) {
      this.value = oldValue;
      return;
    }

    this.selectedTimeZoneItem = timeZoneItem;
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    await this.comboboxEl.setFocus();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event({ cancelable: false }) calciteInputTimeZoneBeforeClose: EventEmitter<void>;

  @Event({ cancelable: false }) calciteInputTimeZoneBeforeOpen: EventEmitter<void>;

  @Event({ cancelable: false }) calciteInputTimeZoneChange: EventEmitter<void>;

  @Event({ cancelable: false }) calciteInputTimeZoneClose: EventEmitter<void>;

  @Event({ cancelable: false }) calciteInputTimeZoneOpen: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteInputTimeZoneElement;

  private comboboxEl: HTMLCalciteComboboxElement;

  @State() defaultMessages: InputTimeZoneMessages;

  defaultValue: InputTimeZone["value"];

  @State() effectiveLocale: SupportedLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleWatcher(): void {
    updateMessages(this, this.effectiveLocale);
  }

  formEl: HTMLFormElement;

  labelEl: HTMLCalciteLabelElement;

  private selectedTimeZoneItem: TimeZoneItem;

  private timeZoneItems: TimeZoneItem[];

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onLabelClick(): void {
    this.setFocus();
  }

  private setComboboxRef = (el: HTMLCalciteComboboxElement): void => {
    this.comboboxEl = el;
  };

  private onComboboxBeforeClose = (event: CustomEvent): void => {
    event.stopPropagation();
    this.calciteInputTimeZoneBeforeClose.emit();
  };

  private onComboboxBeforeOpen = (event: CustomEvent): void => {
    event.stopPropagation();
    this.calciteInputTimeZoneBeforeOpen.emit();
  };

  private onComboboxChange = (event: CustomEvent): void => {
    event.stopPropagation();
    const combobox = event.target as HTMLCalciteComboboxElement;
    const selected = this.findTimeZoneItem(combobox.selectedItems[0].getAttribute("data-value"));

    const selectedValue = `${selected.value}`;
    if (this.value === selectedValue) {
      return;
    }

    this.value = selectedValue;
    this.selectedTimeZoneItem = selected;
    this.calciteInputTimeZoneChange.emit();
  };

  private onComboboxClose = (event: CustomEvent): void => {
    event.stopPropagation();
    this.open = false;
    this.calciteInputTimeZoneClose.emit();
  };

  private onComboboxOpen = (event: CustomEvent): void => {
    this.open = true;
    event.stopPropagation();
    this.calciteInputTimeZoneOpen.emit();
  };

  private findTimeZoneItem(value: number | string): TimeZoneItem {
    const valueToMatch = value;

    return this.timeZoneItems.find(
      ({ value }) =>
        // intentional == to match string to number
        value == valueToMatch
    );
  }

  private async updateTimeZoneItemsAndSelection(): Promise<void> {
    this.timeZoneItems = await this.createTimeZoneItems();

    const fallbackValue = this.mode === "offset" ? getUserTimeZoneOffset() : getUserTimeZoneName();
    const valueToMatch = this.value ?? fallbackValue;

    this.selectedTimeZoneItem = this.findTimeZoneItem(valueToMatch);

    if (!this.selectedTimeZoneItem) {
      this.selectedTimeZoneItem = this.findTimeZoneItem(fallbackValue);
    }
  }

  private async createTimeZoneItems(): Promise<TimeZoneItem[]> {
    if (!this.effectiveLocale || !this.messages) {
      return [];
    }

    return createTimeZoneItems(
      this.effectiveLocale,
      this.messages,
      this.mode,
      this.referenceDate instanceof Date
        ? this.referenceDate
        : new Date(this.referenceDate ?? Date.now())
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectForm(this);
    connectLabel(this);
    connectLocalized(this);
    connectMessages(this);
  }

  disconnectedCallback(): void {
    disconnectForm(this);
    disconnectLabel(this);
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);

    await this.updateTimeZoneItemsAndSelection();

    const selectedValue = `${this.selectedTimeZoneItem.value}`;
    afterConnectDefaultValueSet(this, selectedValue);
    this.value = selectedValue;
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  render(): VNode {
    return (
      <Host>
        <InteractiveContainer disabled={this.disabled}>
          <calcite-combobox
            clearDisabled={true}
            disabled={this.disabled}
            label={this.messages.chooseTimeZone}
            lang={this.effectiveLocale}
            maxItems={this.maxItems}
            onCalciteComboboxBeforeClose={this.onComboboxBeforeClose}
            onCalciteComboboxBeforeOpen={this.onComboboxBeforeOpen}
            onCalciteComboboxChange={this.onComboboxChange}
            onCalciteComboboxClose={this.onComboboxClose}
            onCalciteComboboxOpen={this.onComboboxOpen}
            open={this.open}
            overlayPositioning={this.overlayPositioning}
            scale={this.scale}
            selectionMode="single-persist"
            status={this.status}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={this.setComboboxRef}
          >
            {this.timeZoneItems.map((group) => {
              const selected = this.selectedTimeZoneItem === group;
              const { label, value } = group;

              return (
                <calcite-combobox-item
                  data-value={value}
                  key={label}
                  selected={selected}
                  textLabel={label}
                  value={`${group.filterValue}`}
                />
              );
            })}
          </calcite-combobox>
          <HiddenFormInputSlot component={this} />
        </InteractiveContainer>
      </Host>
    );
  }
}
