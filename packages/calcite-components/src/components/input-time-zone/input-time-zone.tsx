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
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  SupportedLocale,
} from "../../utils/locale";
import { BasicTimeZoneGroup } from "./interfaces";
import { Scale } from "../interfaces";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { InputTimeZoneMessages } from "./assets/input-time-zone/t9n";
import { generateTimeZoneGroups, getUserTimeZoneOffset } from "./utils";
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
   * When `true`, the component must have a value in order for the form to submit.
   *
   * @internal
   */
  @Prop({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * The component's value, where the value is the time zone offset or the difference, in minutes, between the selected time zone and UTC.
   *
   * If no value is provided, the user's time zone offset will be selected by default.
   *
   * @see https://www.w3.org/International/core/2005/09/timezone.html#:~:text=What%20is%20a%20%22zone%20offset,or%20%22%2D%22%20from%20UTC.
   */
  @Prop({ mutable: true }) value: string;

  @Watch("value")
  valueWatcher(value: string): void {
    if (this.comboboxEl && this.comboboxEl.value !== value) {
      this.comboboxEl.value = value;
    }
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

  private selectedTimeZoneGroup: BasicTimeZoneGroup;

  private timeZoneGroups: BasicTimeZoneGroup[];

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
    const selected = this.timeZoneGroups.find(
      ({ offsetValue }) => combobox.value === `${offsetValue}`
    );

    const selectedValue = `${selected.offsetValue}`;
    if (this.value === selectedValue) {
      return;
    }

    this.value = selectedValue;
    this.selectedTimeZoneGroup = selected;
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

    const timeZoneGroups = await generateTimeZoneGroups();
    this.timeZoneGroups = timeZoneGroups;
    const offsetToMatch = this.value ?? getUserTimeZoneOffset();
    this.selectedTimeZoneGroup = timeZoneGroups.find(
      ({ offsetValue }) =>
        // intentional == to match string to number
        offsetValue == offsetToMatch
    );
    const selectedValue = `${this.selectedTimeZoneGroup.offsetValue}`;
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
        <calcite-combobox
          clearDisabled={true}
          disabled={this.disabled}
          label={this.messages.chooseTimeZone}
          lang={this.effectiveLocale}
          onCalciteComboboxBeforeClose={this.onComboboxBeforeClose}
          onCalciteComboboxBeforeOpen={this.onComboboxBeforeOpen}
          onCalciteComboboxChange={this.onComboboxChange}
          onCalciteComboboxClose={this.onComboboxClose}
          onCalciteComboboxOpen={this.onComboboxOpen}
          open={this.open}
          overlayPositioning={this.overlayPositioning}
          scale={this.scale}
          selectionMode="single"
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={this.setComboboxRef}
        >
          {this.timeZoneGroups.map((group) => {
            const selected = this.selectedTimeZoneGroup === group;
            const label = group.offsetLabel;
            const value = group.offsetValue;

            return (
              <calcite-combobox-item
                key={label}
                selected={selected}
                textLabel={label}
                value={`${value}`}
              />
            );
          })}
        </calcite-combobox>
        <HiddenFormInputSlot component={this} />
      </Host>
    );
  }
}
