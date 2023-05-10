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
  Watch
} from "@stencil/core";
import { connectLabel, disconnectLabel, LabelableComponent } from "../../utils/label";
import { InteractiveComponent } from "../../utils/interactive";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  SupportedLocales
} from "../../utils/locale";
import { BasicTimeZoneGroup, TimeZoneGroup } from "./interfaces";
import { Scale } from "../interfaces";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { InputTimeZoneMessages } from "./assets/input-time-zone/t9n";
import { generateTimeZoneGroups, getUserTimeZoneOffset, isBasicTimeZoneGroup } from "./utils";

@Component({
  tag: "calcite-input-time-zone",
  styleUrl: "input-time-zone.scss",
  assetsDirs: ["assets"],
  shadow: true
})
export class InputTimeZone
  implements InteractiveComponent, LabelableComponent, LocalizedComponent, T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element()
  el: HTMLCalciteInputTimeZoneElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  @Prop({ reflect: true })
  disabled = false;

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

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Prop({ mutable: true })
  value: number | null = null;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async setFocus(): Promise<void> {
    await this.comboboxEl.setFocus();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event({ cancelable: false })
  calciteInputTimeZoneChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  private comboboxEl: HTMLCalciteComboboxElement;

  @State() defaultMessages: InputTimeZoneMessages;

  @State()
  effectiveLocale: SupportedLocales = "";

  @Watch("effectiveLocale")
  effectiveLocaleWatcher(): void {
    updateMessages(this, this.effectiveLocale);
  }

  labelEl: HTMLCalciteLabelElement;

  private selectedTimeZoneGroup: TimeZoneGroup | BasicTimeZoneGroup;

  private timeZoneGroups: TimeZoneGroup[] | BasicTimeZoneGroup[];

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

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLabel(this);
    connectLocalized(this);
    connectMessages(this);
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);

    const timeZoneGroups = await generateTimeZoneGroups(this.effectiveLocale, this.messages);
    this.timeZoneGroups = timeZoneGroups;
    const offsetToMatch = this.value ?? getUserTimeZoneOffset();
    this.selectedTimeZoneGroup = timeZoneGroups.find(
      ({ offsetValue }) => offsetValue === offsetToMatch
    );
    this.value = this.selectedTimeZoneGroup.offsetValue;
  }

  render(): VNode {
    return (
      <Host>
        <calcite-combobox
          disabled={this.disabled}
          label={this.messages.chooseTimeZone}
          onCalciteComboboxChange={(event) => {
            event.stopPropagation();
            const selected = this.timeZoneGroups.find(
              ({ offsetValue }) => event.target.value === offsetValue.toString()
            );

            this.value = selected.offsetValue;
            this.selectedTimeZoneGroup = selected;
            this.calciteInputTimeZoneChange.emit();
          }}
          scale={this.scale}
          selectionMode="single"
          // eslint-disable-next-line react/jsx-sort-props
          ref={this.setComboboxRef}
        >
          {this.timeZoneGroups.map((group) => {
            const selected = this.selectedTimeZoneGroup === group;
            const label = isBasicTimeZoneGroup(group) ? group.offsetLabel : group.offsetGroupLabel;
            const value = group.offsetValue;

            return (
              <calcite-combobox-item
                key={label}
                selected={selected}
                textLabel={label}
                value={value}
              />
            );
          })}
        </calcite-combobox>
      </Host>
    );
  }
}
